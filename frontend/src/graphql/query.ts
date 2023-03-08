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

export const getUserRecords = gql`
  query getUserRecords($userId: String!) {
    records(userId: $userId) {
      id
      paymentAmount
      evaluation
    }
  }
`

export const getPlaceRecords = gql`
  query getPlaceRecords($placeId: String!) {
    records(placeId: $placeId) {
      id
      paymentAmount
      evaluation
    }
  }
`

export const getUserParticularPlaceRecords = gql`
  query getUserParticularPlaceRecords($userId: String!, $placeId: String!) {
    records(placeId: $placeId) {
      id
      paymentAmount
      evaluation
    }
  }
`
