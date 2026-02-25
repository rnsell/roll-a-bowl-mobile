import { graphql } from '../generated';

export const GetCurrentUser = graphql(`
  query GetCurrentUser {
    user {
      id
      firstName
      lastName
      email
    }
  }
`);
