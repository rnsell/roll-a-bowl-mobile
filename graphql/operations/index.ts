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

export { GetMealPlanRange } from './meal-plan';
export { GetRecipes } from './recipes';
