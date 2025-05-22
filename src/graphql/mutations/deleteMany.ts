import { gql } from 'apollo-boost'

export const DELETE_USERS = gql`
  mutation DeleteUsers($ids: [ID!]!) {
    deleteUsers(ids: $ids) {
      id
      name
      email
    }
  }
`
