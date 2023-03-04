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
  mutation CreateUser($userId: String!, $placeId: String!) {
    createUser(userId: $userId, placeId: $placeId) {
      id
      userId
      placeId
      visitAt
    }
  }
`

export const UpdateRecord = gql`
  mutation UpdateUser($id: String!, $paymentAmount: Int, $evaluation: Int) {
    updateUser(id: $id) {
      id
      userId
      placeId
      leaveAt
      paymentAmount
      evaluation
    }
  }
`
