import { GC_AUTH_TOKEN } from './constants';
const { Environment, Network, RecordSource, Store } = require('relay-runtime');

// 2
const store = new Store(new RecordSource());

export const fetchQuery = (operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/cjvaj4qg51imo01121u66h657', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
};

const network = Network.create((operation, variables) => {
  // 4
  return fetch('https://api.graph.cool/relay/v1/cjvaj4qg51imo01121u66h657', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
});

// 5
const environment = new Environment({
  network,
  store
});

// 6
export default environment;
