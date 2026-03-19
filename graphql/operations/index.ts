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

export {
  GetMealPlanRange,
  GetFamilyMealPlanRange,
  AddRecipeToMealPlan,
  RemoveRecipeFromMealPlan,
  ClearMealSlot,
  AddAdHocMeal,
  RemoveAdHocMeal,
  UpdateAdHocMeal,
  AddRecipeToFamilyMealPlan,
  RemoveRecipeFromFamilyMealPlan,
  ClearFamilyMealSlot,
  AddFamilyAdHocMeal,
  RemoveFamilyAdHocMeal,
  UpdateFamilyAdHocMeal,
} from './meal-plan';
export { GetRecipeDetail, GetUnifiedRecipes, CreateRecipe, UpdateRecipe, AddRecipeIngredient, UpdateRecipeIngredient, RemoveRecipeIngredient, SearchIngredients, GetMeasurements } from './recipes';
export { GetCurrentUserProfile, GetMyFamilyGroup } from './user-setup';
export {
  GetFamilyGroupInvitations,
  GetFamilyRecipes,
  GetFamilyRecipe,
  CreateFamilyGroup,
  DeleteFamilyGroup,
  InviteFamilyMember,
  CancelFamilyInvitation,
  RemoveFamilyMember,
  LeaveFamilyGroup,
  ShareRecipeToFamily,
  CreateFamilyRecipe,
  UpdateFamilyRecipe,
  DeleteFamilyRecipe,
} from './family-group';
