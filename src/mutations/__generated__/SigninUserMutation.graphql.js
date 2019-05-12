/**
 * @flow
 * @relayHash 9206cd2a4a2e94e145ed1c7905138d2f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SigninUserInput = {|
  email?: ?AUTH_PROVIDER_EMAIL,
  clientMutationId: string,
|};
export type AUTH_PROVIDER_EMAIL = {|
  email: string,
  password: string,
|};
export type SigninUserMutationVariables = {|
  input: SigninUserInput
|};
export type SigninUserMutationResponse = {|
  +signinUser: {|
    +token: ?string,
    +user: ?{|
      +id: string
    |},
  |}
|};
export type SigninUserMutation = {|
  variables: SigninUserMutationVariables,
  response: SigninUserMutationResponse,
|};
*/


/*
mutation SigninUserMutation(
  $input: SigninUserInput!
) {
  signinUser(input: $input) {
    token
    user {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SigninUserInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "signinUser",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SigninPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "token",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SigninUserMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SigninUserMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "SigninUserMutation",
    "id": null,
    "text": "mutation SigninUserMutation(\n  $input: SigninUserInput!\n) {\n  signinUser(input: $input) {\n    token\n    user {\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4eb18390a3b5e3b08a457b75e3b9df65';
module.exports = node;
