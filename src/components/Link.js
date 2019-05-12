import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

function Link(props) {
  return (
    <div>
      <div>
        {props.link.description} ({props.link.url})
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
    }
  `
);
