import { graphql } from '../generated';

export const GetRecipeDetail = graphql(`
  query GetRecipeDetail($slug: String!) {
    recipe(slug: $slug) {
      id
      name
      slug
      instructions
      sourceUrl
      isFamilyRecipe
      isOwnedByCurrentUser
      ingredientCount
      ingredients {
        id
        quantity
        displayText
        sortOrder
        isOptional
        preparationNote
        ingredient {
          id
          name
        }
        measurement {
          id
          abbreviation
          type
        }
      }
      createdAt
      updatedAt
    }
  }
`);

export const AddRecipeIngredient = graphql(`
  mutation AddRecipeIngredient($input: AddRecipeIngredientInput!) {
    addRecipeIngredient(input: $input) {
      id
      quantity
      displayText
      sortOrder
      isOptional
      preparationNote
      ingredient {
        id
        name
      }
      measurement {
        id
        abbreviation
        type
      }
    }
  }
`);

export const UpdateRecipeIngredient = graphql(`
  mutation UpdateRecipeIngredient($input: UpdateRecipeIngredientInput!) {
    updateRecipeIngredient(input: $input) {
      id
      quantity
      displayText
      sortOrder
      isOptional
      preparationNote
      ingredient {
        id
        name
      }
      measurement {
        id
        abbreviation
        type
      }
    }
  }
`);

export const RemoveRecipeIngredient = graphql(`
  mutation RemoveRecipeIngredient($input: RemoveRecipeIngredientInput!) {
    removeRecipeIngredient(input: $input)
  }
`);

export const UpdateRecipe = graphql(`
  mutation UpdateRecipe($slug: String!, $input: UpdateRecipeInput!) {
    updateRecipe(slug: $slug, input: $input) {
      id
      name
      slug
      instructions
      sourceUrl
      ingredientCount
      createdAt
      updatedAt
    }
  }
`);

export const GetUnifiedRecipes = graphql(`
  query GetUnifiedRecipes {
    unifiedRecipes {
      id
      name
      slug
      isFamilyRecipe
      isOwnedByCurrentUser
      ingredientCount
      createdAt
      updatedAt
    }
  }
`);

export const CreateRecipe = graphql(`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
      name
      slug
      instructions
      ingredientCount
      createdAt
      updatedAt
    }
  }
`);

export const SearchIngredients = graphql(`
  query SearchIngredients($input: SearchIngredientsInput!) {
    searchIngredients(input: $input) {
      ingredients {
        id
        name
        isSystem
        isCustom
        category {
          id
          name
          slug
        }
      }
      totalCount
    }
  }
`);

export const GetMeasurements = graphql(`
  query GetMeasurements($input: GetMeasurementsInput) {
    measurements(input: $input) {
      id
      name
      abbreviation
      type
      displayOrder
      isExposed
      isQualitative
    }
  }
`);
