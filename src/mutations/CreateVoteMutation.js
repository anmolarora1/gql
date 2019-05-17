import { commitMutation, graphql } from 'react-relay';
import environment from '../Environment';

const mutation = graphql`
  mutation CreateVoteMutation($input: CreateVoteInput!) {
    createVote(input: $input) {
      vote {
        id
        link {
          id
          votes {
            count
          }
        }
        user {
          id
        }
      }
    }
  }
`;

export default (userId, linkId) => {
  const variables = {
    input: {
      userId,
      linkId,
      clientMutationId: ''
    }
  };
  commitMutation(environment, {
    mutation,
    variables,
    optimisticUpdater: store => {
      const link = store.get(linkId);
      const currentVoteCount = link.getLinkedRecord('votes').getValue('count');
      const newVoteCount = currentVoteCount + 1;
      link.getLinkedRecord('votes').setValue(newVoteCount, 'count');
    },
    updater: store => {
      const createVoteField = store.getRootField('createVote');
      const newVote = createVoteField.getLinkedRecord('vote');
      const updatedLink = newVote.getLinkedRecord('link');
      const newVotes = updatedLink.getLinkedRecord('votes');
      const newVoteCount = newVotes.getValue('count');

      const link = store.get(linkId);
      link.getLinkedRecord('votes').setValue(newVoteCount, 'count');
    },
    onCompleted: response => {
      console.log('response', response);
    },
    onError: err => console.error(err)
  });
};
