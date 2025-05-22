import { gql } from 'apollo-boost'

export const GET_USERS = gql`
  query GetUsers($skip: Int, $limit: Int, $filter: UsersFilterInput) {
    users(skip: $skip, limit: $limit, filter: $filter) {
      totalCount
      users {
        id
        name
        email
      }
    }
  }
`
