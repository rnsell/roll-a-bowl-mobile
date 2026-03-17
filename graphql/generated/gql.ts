/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetFamilyGroupInvitations {\n    familyGroupInvitations {\n      id\n      invitedEmail\n      status\n      expiresAt\n      createdAt\n    }\n  }\n": typeof types.GetFamilyGroupInvitationsDocument,
    "\n  query GetFamilyRecipes {\n    familyRecipes {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      contributedByUserId\n      lastModifiedByUserId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetFamilyRecipesDocument,
    "\n  query GetFamilyRecipe($slug: String!) {\n    familyRecipe(slug: $slug) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      contributedByUserId\n      lastModifiedByUserId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetFamilyRecipeDocument,
    "\n  mutation CreateFamilyGroup($input: CreateFamilyGroupInput!) {\n    createFamilyGroup(input: $input) {\n      id\n      name\n      slug\n      memberCount\n      createdAt\n    }\n  }\n": typeof types.CreateFamilyGroupDocument,
    "\n  mutation DeleteFamilyGroup {\n    deleteFamilyGroup\n  }\n": typeof types.DeleteFamilyGroupDocument,
    "\n  mutation InviteFamilyMember($input: InviteFamilyMemberInput!) {\n    inviteFamilyMember(input: $input) {\n      id\n      invitedEmail\n      status\n      expiresAt\n      createdAt\n    }\n  }\n": typeof types.InviteFamilyMemberDocument,
    "\n  mutation CancelFamilyInvitation($invitationId: Int!) {\n    cancelFamilyInvitation(invitationId: $invitationId)\n  }\n": typeof types.CancelFamilyInvitationDocument,
    "\n  mutation RemoveFamilyMember($memberId: Int!) {\n    removeFamilyMember(memberId: $memberId)\n  }\n": typeof types.RemoveFamilyMemberDocument,
    "\n  mutation LeaveFamilyGroup {\n    leaveFamilyGroup\n  }\n": typeof types.LeaveFamilyGroupDocument,
    "\n  mutation ShareRecipeToFamily($input: ShareRecipeToFamilyInput!) {\n    shareRecipeToFamily(input: $input) {\n      id\n      name\n      slug\n      contributedByUserId\n      createdAt\n    }\n  }\n": typeof types.ShareRecipeToFamilyDocument,
    "\n  mutation CreateFamilyRecipe($input: CreateFamilyRecipeInput!) {\n    createFamilyRecipe(input: $input) {\n      id\n      name\n      slug\n      contributedByUserId\n      createdAt\n    }\n  }\n": typeof types.CreateFamilyRecipeDocument,
    "\n  mutation UpdateFamilyRecipe($input: UpdateFamilyRecipeInput!) {\n    updateFamilyRecipe(input: $input) {\n      id\n      name\n      slug\n      instructions\n      lastModifiedByUserId\n      updatedAt\n    }\n  }\n": typeof types.UpdateFamilyRecipeDocument,
    "\n  mutation DeleteFamilyRecipe($slug: String!) {\n    deleteFamilyRecipe(slug: $slug)\n  }\n": typeof types.DeleteFamilyRecipeDocument,
    "\n  query GetCurrentUser {\n    user {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": typeof types.GetCurrentUserDocument,
    "\n  query GetMealPlanRange($input: MealPlanRangeInput!) {\n    mealPlanRange(input: $input) {\n      date\n      entries {\n        id\n        mealType\n        meal {\n          ... on RecipeType {\n            id\n            name\n            slug\n          }\n          ... on AdHocMealType {\n            id\n            text\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetMealPlanRangeDocument,
    "\n  query GetRecipes {\n    recipes {\n      id\n      name\n      slug\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetRecipesDocument,
    "\n  query GetCurrentUserProfile {\n    me {\n      id\n      email\n      firstName\n      lastName\n      status\n    }\n  }\n": typeof types.GetCurrentUserProfileDocument,
    "\n  query GetMyFamilyGroup {\n    myFamilyGroup {\n      id\n      name\n      slug\n      memberCount\n      createdAt\n      members {\n        id\n        firstName\n        lastName\n        email\n        role\n        createdAt\n      }\n      owner {\n        id\n        firstName\n        lastName\n        email\n        role\n        createdAt\n      }\n    }\n  }\n": typeof types.GetMyFamilyGroupDocument,
};
const documents: Documents = {
    "\n  query GetFamilyGroupInvitations {\n    familyGroupInvitations {\n      id\n      invitedEmail\n      status\n      expiresAt\n      createdAt\n    }\n  }\n": types.GetFamilyGroupInvitationsDocument,
    "\n  query GetFamilyRecipes {\n    familyRecipes {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      contributedByUserId\n      lastModifiedByUserId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetFamilyRecipesDocument,
    "\n  query GetFamilyRecipe($slug: String!) {\n    familyRecipe(slug: $slug) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      contributedByUserId\n      lastModifiedByUserId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetFamilyRecipeDocument,
    "\n  mutation CreateFamilyGroup($input: CreateFamilyGroupInput!) {\n    createFamilyGroup(input: $input) {\n      id\n      name\n      slug\n      memberCount\n      createdAt\n    }\n  }\n": types.CreateFamilyGroupDocument,
    "\n  mutation DeleteFamilyGroup {\n    deleteFamilyGroup\n  }\n": types.DeleteFamilyGroupDocument,
    "\n  mutation InviteFamilyMember($input: InviteFamilyMemberInput!) {\n    inviteFamilyMember(input: $input) {\n      id\n      invitedEmail\n      status\n      expiresAt\n      createdAt\n    }\n  }\n": types.InviteFamilyMemberDocument,
    "\n  mutation CancelFamilyInvitation($invitationId: Int!) {\n    cancelFamilyInvitation(invitationId: $invitationId)\n  }\n": types.CancelFamilyInvitationDocument,
    "\n  mutation RemoveFamilyMember($memberId: Int!) {\n    removeFamilyMember(memberId: $memberId)\n  }\n": types.RemoveFamilyMemberDocument,
    "\n  mutation LeaveFamilyGroup {\n    leaveFamilyGroup\n  }\n": types.LeaveFamilyGroupDocument,
    "\n  mutation ShareRecipeToFamily($input: ShareRecipeToFamilyInput!) {\n    shareRecipeToFamily(input: $input) {\n      id\n      name\n      slug\n      contributedByUserId\n      createdAt\n    }\n  }\n": types.ShareRecipeToFamilyDocument,
    "\n  mutation CreateFamilyRecipe($input: CreateFamilyRecipeInput!) {\n    createFamilyRecipe(input: $input) {\n      id\n      name\n      slug\n      contributedByUserId\n      createdAt\n    }\n  }\n": types.CreateFamilyRecipeDocument,
    "\n  mutation UpdateFamilyRecipe($input: UpdateFamilyRecipeInput!) {\n    updateFamilyRecipe(input: $input) {\n      id\n      name\n      slug\n      instructions\n      lastModifiedByUserId\n      updatedAt\n    }\n  }\n": types.UpdateFamilyRecipeDocument,
    "\n  mutation DeleteFamilyRecipe($slug: String!) {\n    deleteFamilyRecipe(slug: $slug)\n  }\n": types.DeleteFamilyRecipeDocument,
    "\n  query GetCurrentUser {\n    user {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  query GetMealPlanRange($input: MealPlanRangeInput!) {\n    mealPlanRange(input: $input) {\n      date\n      entries {\n        id\n        mealType\n        meal {\n          ... on RecipeType {\n            id\n            name\n            slug\n          }\n          ... on AdHocMealType {\n            id\n            text\n          }\n        }\n      }\n    }\n  }\n": types.GetMealPlanRangeDocument,
    "\n  query GetRecipes {\n    recipes {\n      id\n      name\n      slug\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetRecipesDocument,
    "\n  query GetCurrentUserProfile {\n    me {\n      id\n      email\n      firstName\n      lastName\n      status\n    }\n  }\n": types.GetCurrentUserProfileDocument,
    "\n  query GetMyFamilyGroup {\n    myFamilyGroup {\n      id\n      name\n      slug\n      memberCount\n      createdAt\n      members {\n        id\n        firstName\n        lastName\n        email\n        role\n        createdAt\n      }\n      owner {\n        id\n        firstName\n        lastName\n        email\n        role\n        createdAt\n      }\n    }\n  }\n": types.GetMyFamilyGroupDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFamilyGroupInvitations {\n    familyGroupInvitations {\n      id\n      invitedEmail\n      status\n      expiresAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetFamilyGroupInvitations {\n    familyGroupInvitations {\n      id\n      invitedEmail\n      status\n      expiresAt\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFamilyRecipes {\n    familyRecipes {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      contributedByUserId\n      lastModifiedByUserId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetFamilyRecipes {\n    familyRecipes {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      contributedByUserId\n      lastModifiedByUserId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFamilyRecipe($slug: String!) {\n    familyRecipe(slug: $slug) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      contributedByUserId\n      lastModifiedByUserId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetFamilyRecipe($slug: String!) {\n    familyRecipe(slug: $slug) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      contributedByUserId\n      lastModifiedByUserId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFamilyGroup($input: CreateFamilyGroupInput!) {\n    createFamilyGroup(input: $input) {\n      id\n      name\n      slug\n      memberCount\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFamilyGroup($input: CreateFamilyGroupInput!) {\n    createFamilyGroup(input: $input) {\n      id\n      name\n      slug\n      memberCount\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteFamilyGroup {\n    deleteFamilyGroup\n  }\n"): (typeof documents)["\n  mutation DeleteFamilyGroup {\n    deleteFamilyGroup\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InviteFamilyMember($input: InviteFamilyMemberInput!) {\n    inviteFamilyMember(input: $input) {\n      id\n      invitedEmail\n      status\n      expiresAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation InviteFamilyMember($input: InviteFamilyMemberInput!) {\n    inviteFamilyMember(input: $input) {\n      id\n      invitedEmail\n      status\n      expiresAt\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CancelFamilyInvitation($invitationId: Int!) {\n    cancelFamilyInvitation(invitationId: $invitationId)\n  }\n"): (typeof documents)["\n  mutation CancelFamilyInvitation($invitationId: Int!) {\n    cancelFamilyInvitation(invitationId: $invitationId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFamilyMember($memberId: Int!) {\n    removeFamilyMember(memberId: $memberId)\n  }\n"): (typeof documents)["\n  mutation RemoveFamilyMember($memberId: Int!) {\n    removeFamilyMember(memberId: $memberId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LeaveFamilyGroup {\n    leaveFamilyGroup\n  }\n"): (typeof documents)["\n  mutation LeaveFamilyGroup {\n    leaveFamilyGroup\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ShareRecipeToFamily($input: ShareRecipeToFamilyInput!) {\n    shareRecipeToFamily(input: $input) {\n      id\n      name\n      slug\n      contributedByUserId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation ShareRecipeToFamily($input: ShareRecipeToFamilyInput!) {\n    shareRecipeToFamily(input: $input) {\n      id\n      name\n      slug\n      contributedByUserId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFamilyRecipe($input: CreateFamilyRecipeInput!) {\n    createFamilyRecipe(input: $input) {\n      id\n      name\n      slug\n      contributedByUserId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFamilyRecipe($input: CreateFamilyRecipeInput!) {\n    createFamilyRecipe(input: $input) {\n      id\n      name\n      slug\n      contributedByUserId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateFamilyRecipe($input: UpdateFamilyRecipeInput!) {\n    updateFamilyRecipe(input: $input) {\n      id\n      name\n      slug\n      instructions\n      lastModifiedByUserId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateFamilyRecipe($input: UpdateFamilyRecipeInput!) {\n    updateFamilyRecipe(input: $input) {\n      id\n      name\n      slug\n      instructions\n      lastModifiedByUserId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteFamilyRecipe($slug: String!) {\n    deleteFamilyRecipe(slug: $slug)\n  }\n"): (typeof documents)["\n  mutation DeleteFamilyRecipe($slug: String!) {\n    deleteFamilyRecipe(slug: $slug)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUser {\n    user {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    user {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMealPlanRange($input: MealPlanRangeInput!) {\n    mealPlanRange(input: $input) {\n      date\n      entries {\n        id\n        mealType\n        meal {\n          ... on RecipeType {\n            id\n            name\n            slug\n          }\n          ... on AdHocMealType {\n            id\n            text\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMealPlanRange($input: MealPlanRangeInput!) {\n    mealPlanRange(input: $input) {\n      date\n      entries {\n        id\n        mealType\n        meal {\n          ... on RecipeType {\n            id\n            name\n            slug\n          }\n          ... on AdHocMealType {\n            id\n            text\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecipes {\n    recipes {\n      id\n      name\n      slug\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetRecipes {\n    recipes {\n      id\n      name\n      slug\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUserProfile {\n    me {\n      id\n      email\n      firstName\n      lastName\n      status\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUserProfile {\n    me {\n      id\n      email\n      firstName\n      lastName\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyFamilyGroup {\n    myFamilyGroup {\n      id\n      name\n      slug\n      memberCount\n      createdAt\n      members {\n        id\n        firstName\n        lastName\n        email\n        role\n        createdAt\n      }\n      owner {\n        id\n        firstName\n        lastName\n        email\n        role\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMyFamilyGroup {\n    myFamilyGroup {\n      id\n      name\n      slug\n      memberCount\n      createdAt\n      members {\n        id\n        firstName\n        lastName\n        email\n        role\n        createdAt\n      }\n      owner {\n        id\n        firstName\n        lastName\n        email\n        role\n        createdAt\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;