import { graphql } from '../generated';

// ── Queries ──────────────────────────────────────────────────────────

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

export const GetFamilyMealPlanRange = graphql(`
  query GetFamilyMealPlanRange($input: FamilyMealPlanRangeInput!) {
    familyMealPlanRange(input: $input) {
      date
      entries {
        id
        mealType
        addedBy
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

// ── Personal Mutations ───────────────────────────────────────────────

export const AddRecipeToMealPlan = graphql(`
  mutation AddRecipeToMealPlan($input: AddRecipeToMealPlanInput!) {
    addRecipeToMealPlan(input: $input) {
      id
      mealType
      meal {
        ... on RecipeType { id, name, slug }
      }
    }
  }
`);

export const RemoveRecipeFromMealPlan = graphql(`
  mutation RemoveRecipeFromMealPlan($input: RemoveRecipeFromMealPlanInput!) {
    removeRecipeFromMealPlan(input: $input)
  }
`);

export const ClearMealSlot = graphql(`
  mutation ClearMealSlot($input: ClearMealSlotInput!) {
    clearMealSlot(input: $input)
  }
`);

export const AddAdHocMeal = graphql(`
  mutation AddAdHocMeal($input: AddAdHocMealInput!) {
    addAdHocMeal(input: $input) {
      id
      mealType
      meal {
        ... on AdHocMealType { id, text }
      }
    }
  }
`);

export const RemoveAdHocMeal = graphql(`
  mutation RemoveAdHocMeal($input: RemoveAdHocMealInput!) {
    removeAdHocMeal(input: $input)
  }
`);

export const UpdateAdHocMeal = graphql(`
  mutation UpdateAdHocMeal($input: UpdateAdHocMealInput!) {
    updateAdHocMeal(input: $input) {
      id
      mealType
      meal {
        ... on AdHocMealType { id, text }
      }
    }
  }
`);

// ── Family Mutations ─────────────────────────────────────────────────

export const AddRecipeToFamilyMealPlan = graphql(`
  mutation AddRecipeToFamilyMealPlan($input: AddRecipeToFamilyMealPlanInput!) {
    addRecipeToFamilyMealPlan(input: $input) {
      id
      mealType
      addedBy
      meal {
        ... on RecipeType { id, name, slug }
      }
    }
  }
`);

export const RemoveRecipeFromFamilyMealPlan = graphql(`
  mutation RemoveRecipeFromFamilyMealPlan($input: RemoveRecipeFromFamilyMealPlanInput!) {
    removeRecipeFromFamilyMealPlan(input: $input)
  }
`);

export const ClearFamilyMealSlot = graphql(`
  mutation ClearFamilyMealSlot($input: ClearFamilyMealSlotInput!) {
    clearFamilyMealSlot(input: $input)
  }
`);

export const AddFamilyAdHocMeal = graphql(`
  mutation AddFamilyAdHocMeal($input: AddFamilyAdHocMealInput!) {
    addFamilyAdHocMeal(input: $input) {
      id
      mealType
      addedBy
      meal {
        ... on AdHocMealType { id, text }
      }
    }
  }
`);

export const RemoveFamilyAdHocMeal = graphql(`
  mutation RemoveFamilyAdHocMeal($input: RemoveFamilyAdHocMealInput!) {
    removeFamilyAdHocMeal(input: $input)
  }
`);

export const UpdateFamilyAdHocMeal = graphql(`
  mutation UpdateFamilyAdHocMeal($input: UpdateFamilyAdHocMealInput!) {
    updateFamilyAdHocMeal(input: $input) {
      id
      mealType
      addedBy
      meal {
        ... on AdHocMealType { id, text }
      }
    }
  }
`);
