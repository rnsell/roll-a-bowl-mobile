import { graphql } from '../generated';

export const GetRecipes = graphql(`
  query GetRecipes {
    recipes {
      id
      name
      slug
      ingredientCount
      createdAt
      updatedAt
    }
  }
`);
