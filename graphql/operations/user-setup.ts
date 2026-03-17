import { graphql } from '../generated';

export const GetCurrentUserProfile = graphql(`
  query GetCurrentUserProfile {
    me {
      id
      email
      firstName
      lastName
      status
    }
  }
`);

export const GetMyFamilyGroup = graphql(`
  query GetMyFamilyGroup {
    myFamilyGroup {
      id
      name
      slug
      memberCount
      createdAt
      members {
        id
        firstName
        lastName
        email
        role
        createdAt
      }
      owner {
        id
        firstName
        lastName
        email
        role
        createdAt
      }
    }
  }
`);
