import { graphql } from '../generated';

export const GetMealPlanRange = graphql(`
  query GetMealPlanRange($input: MealPlanRangeInput!) {
    mealPlanRange(input: $input) {
      date
      entries {
        id
        mealType
        meal {
          ... on RecipeType {
            id
            name
            slug
          }
          ... on AdHocMealType {
            id
            text
          }
        }
      }
    }
  }
`);
