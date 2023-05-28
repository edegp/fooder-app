import { gql } from 'graphql-tag'

export const CreateUser = gql`
  mutation CreateUser($idToken: String!) {
    createUser(idToken: $idToken) {
      id
      createAt
      latestLoginAt
    }
  }
`

export const UpdateUser = gql`
  mutation UpdateUser($id: String!) {
    updateUser(id: $id) {
      id
      createAt
      latestLoginAt
    }
  }
`

export const CreateRecord = gql`
  mutation CreateRecord($userID: String!, $placeID: String!) {
    createRecord(userID: $userID, placeID: $placeID) {
      id
      userID
      placeID
      visitAt
    }
  }
`

export const UpdateRecord = gql`
  mutation UpdateRecord($id: String!, $paymentAmount: Int, $evaluation: Int) {
    updateRecord(id: $id) {
      id
      userID
      placeID
      leaveAt
      paymentAmount
      evaluation
    }
  }
`

export const RegisterStore = gql`
  mutation RegisterStore($id: String!, $name: String!) {
    registerStore(id: $id, name: $name) {
      id
      name
    }
  }
`

export const UpdateStore = gql`
  mutation UpdateStore($id: String!) {
    updateStore(id: $id) {
      id
      name
    }
  }
`
