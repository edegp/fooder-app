import { gql } from 'graphql-tag'

export const GetAllUsers = gql`
  query GetAllUsers {
    users {
      id
      createAt
      latestLoginAt
    }
  }
`

export const GetUserRecords = gql`
  query GetUserRecords($userID: String!) {
    getUserRecords(userID: $userID) {
      id
      paymentAmount
      evaluation
    }
  }
`

export const GetPlaceRecords = gql`
  query GetPlaceRecords($placeID: String!) {
    getPlaceRecords(placeID: $placeID) {
      id
      paymentAmount
      evaluation
    }
  }
`

export const GetUserParticularPlaceRecords = gql`
  query GetUserParticularPlaceRecords($userID: String!, $placeID: String!) {
    getUserParticularPlaceRecords(userID: $userID, placeID: $placeID) {
      id
      paymentAmount
      evaluation
    }
  }
`

export const GetStoreById = gql`
  query GetStoreById($id: String!) {
    getStoreById(id: $id) {
      id
    }
  }
`
