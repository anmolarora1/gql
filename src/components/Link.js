import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { GC_USER_ID } from '../constants';
import { timeDifferenceForDate } from '../utils';
import CreateVoteMutation from '../mutations/CreateVoteMutation';
import { fetchQuery } from '../Environment';

function Link(props) {
  const userId = localStorage.getItem(GC_USER_ID);

  const _userCanVoteOnLink = async (userId, linkId) => {
    const checkVoteQueryText = `
    query CheckVoteQuery($userId: ID!, $linkId: ID!) {
      viewer {
        allVotes(filter: {
          user: { id: $userId },
          link: { id: $linkId }
        }) {
          edges {
            node {
              id
            }
          }
        }
      }
    }`;
    const checkVoteQuery = { text: checkVoteQueryText };

    const result = await fetchQuery(checkVoteQuery, { userId, linkId });

    console.log('result ', result);

    return result.data.viewer.allVotes.edges.length === 0;
  };

  const _voteForLink = async () => {
    const userId = localStorage.getItem(GC_USER_ID);
    if (!userId) {
      console.log(`Can't vote without user ID`);
      return;
    }

    const linkId = props.link.id;

    const canUserVoteOnLink = await _userCanVoteOnLink(userId, linkId);
    if (canUserVoteOnLink) {
      CreateVoteMutation(userId, linkId);
    } else {
      console.log(`Current already voted for that link`);
    }
  };

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {userId && (
          <div className="ml1 gray f11" onClick={() => _voteForLink()}>
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {props.link.description} ({props.link.url})
        </div>
        <div className="f6 lh-copy gray">
          {props.link.votes.count} votes | by{' '}
          {props.link.postedBy ? props.link.postedBy.name : 'Unknown'}{' '}
          {timeDifferenceForDate(props.link.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default createFragmentContainer(
  Link,
  graphql`
    fragment Link_link on Link {
      id
      description
      url
      createdAt
      postedBy {
        id
        name
      }
      votes {
        count
      }
    }
  `
);
