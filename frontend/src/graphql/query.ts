import { gql } from 'graphql-tag'

export const getAllUsers = gql`
  query getAllUsers {
    users {
      id
      createAt
      latestLoginAt
    }
  }
`
