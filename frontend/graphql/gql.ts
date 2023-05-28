/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation CreateUser($idToken: String!) {\n    createUser(idToken: $idToken) {\n      id\n      createAt\n      latestLoginAt\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  mutation UpdateUser($id: String!) {\n    updateUser(id: $id) {\n      id\n      createAt\n      latestLoginAt\n    }\n  }\n':
    types.UpdateUserDocument,
  '\n  mutation CreateRecord($userID: String!, $placeID: String!) {\n    createRecord(userID: $userID, placeID: $placeID) {\n      id\n      userID\n      placeID\n      visitAt\n    }\n  }\n':
    types.CreateRecordDocument,
  '\n  mutation UpdateRecord($id: String!, $paymentAmount: Int, $evaluation: Int) {\n    updateRecord(id: $id) {\n      id\n      userID\n      placeID\n      leaveAt\n      paymentAmount\n      evaluation\n    }\n  }\n':
    types.UpdateRecordDocument,
  '\n  mutation RegisterStore($id: String!, $name: String!) {\n    registerStore(id: $id, name: $name) {\n      id\n      name\n    }\n  }\n':
    types.RegisterStoreDocument,
  '\n  mutation UpdateStore($id: String!) {\n    updateStore(id: $id) {\n      id\n      name\n    }\n  }\n':
    types.UpdateStoreDocument,
  '\n  query GetAllUsers {\n    users {\n      id\n      createAt\n      latestLoginAt\n    }\n  }\n':
    types.GetAllUsersDocument,
  '\n  query GetUserRecords($userID: String!) {\n    getUserRecords(userID: $userID) {\n      id\n      paymentAmount\n      evaluation\n    }\n  }\n':
    types.GetUserRecordsDocument,
  '\n  query GetPlaceRecords($placeID: String!) {\n    getPlaceRecords(placeID: $placeID) {\n      id\n      paymentAmount\n      evaluation\n    }\n  }\n':
    types.GetPlaceRecordsDocument,
  '\n  query GetUserParticularPlaceRecords($userID: String!, $placeID: String!) {\n    getUserParticularPlaceRecords(userID: $userID, placeID: $placeID) {\n      id\n      paymentAmount\n      evaluation\n    }\n  }\n':
    types.GetUserParticularPlaceRecordsDocument,
  '\n  query GetStoreById($id: String!) {\n    getStoreById(id: $id) {\n      id\n    }\n  }\n':
    types.GetStoreByIdDocument
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateUser($idToken: String!) {\n    createUser(idToken: $idToken) {\n      id\n      createAt\n      latestLoginAt\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateUser($idToken: String!) {\n    createUser(idToken: $idToken) {\n      id\n      createAt\n      latestLoginAt\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateUser($id: String!) {\n    updateUser(id: $id) {\n      id\n      createAt\n      latestLoginAt\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateUser($id: String!) {\n    updateUser(id: $id) {\n      id\n      createAt\n      latestLoginAt\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateRecord($userID: String!, $placeID: String!) {\n    createRecord(userID: $userID, placeID: $placeID) {\n      id\n      userID\n      placeID\n      visitAt\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateRecord($userID: String!, $placeID: String!) {\n    createRecord(userID: $userID, placeID: $placeID) {\n      id\n      userID\n      placeID\n      visitAt\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateRecord($id: String!, $paymentAmount: Int, $evaluation: Int) {\n    updateRecord(id: $id) {\n      id\n      userID\n      placeID\n      leaveAt\n      paymentAmount\n      evaluation\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateRecord($id: String!, $paymentAmount: Int, $evaluation: Int) {\n    updateRecord(id: $id) {\n      id\n      userID\n      placeID\n      leaveAt\n      paymentAmount\n      evaluation\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RegisterStore($id: String!, $name: String!) {\n    registerStore(id: $id, name: $name) {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  mutation RegisterStore($id: String!, $name: String!) {\n    registerStore(id: $id, name: $name) {\n      id\n      name\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateStore($id: String!) {\n    updateStore(id: $id) {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateStore($id: String!) {\n    updateStore(id: $id) {\n      id\n      name\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllUsers {\n    users {\n      id\n      createAt\n      latestLoginAt\n    }\n  }\n'
): (typeof documents)['\n  query GetAllUsers {\n    users {\n      id\n      createAt\n      latestLoginAt\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUserRecords($userID: String!) {\n    getUserRecords(userID: $userID) {\n      id\n      paymentAmount\n      evaluation\n    }\n  }\n'
): (typeof documents)['\n  query GetUserRecords($userID: String!) {\n    getUserRecords(userID: $userID) {\n      id\n      paymentAmount\n      evaluation\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPlaceRecords($placeID: String!) {\n    getPlaceRecords(placeID: $placeID) {\n      id\n      paymentAmount\n      evaluation\n    }\n  }\n'
): (typeof documents)['\n  query GetPlaceRecords($placeID: String!) {\n    getPlaceRecords(placeID: $placeID) {\n      id\n      paymentAmount\n      evaluation\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUserParticularPlaceRecords($userID: String!, $placeID: String!) {\n    getUserParticularPlaceRecords(userID: $userID, placeID: $placeID) {\n      id\n      paymentAmount\n      evaluation\n    }\n  }\n'
): (typeof documents)['\n  query GetUserParticularPlaceRecords($userID: String!, $placeID: String!) {\n    getUserParticularPlaceRecords(userID: $userID, placeID: $placeID) {\n      id\n      paymentAmount\n      evaluation\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetStoreById($id: String!) {\n    getStoreById(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  query GetStoreById($id: String!) {\n    getStoreById(id: $id) {\n      id\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
