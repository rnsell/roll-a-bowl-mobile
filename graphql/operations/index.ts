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
