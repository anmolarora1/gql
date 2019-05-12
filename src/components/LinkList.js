import React from 'react';
import Link from './Link';

import { createFragmentContainer, graphql } from 'react-relay';

function LinkList(props) {
  return (
    <div>
      {props.viewer.allLinks.edges.map(({ node }) => (
        <Link key={node.__id} link={node} />
      ))}
    </div>
  );
}

export default createFragmentContainer(
  LinkList,
  graphql`
    fragment LinkList_viewer on Viewer {
      allLinks(last: 100, orderBy: createdAt_DESC)
        @connection(key: "LinkList_allLinks", filters: []) {
        edges {
          node {
            ...Link_link
          }
        }
      }
    }
  `
);
