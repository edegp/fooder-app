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
