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
    "\n  query GetFamilyMealPlanRange($input: FamilyMealPlanRangeInput!) {\n    familyMealPlanRange(input: $input) {\n      date\n      entries {\n        id\n        mealType\n        addedBy\n        meal {\n          ... on RecipeType {\n            id\n            name\n            slug\n          }\n          ... on AdHocMealType {\n            id\n            text\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetFamilyMealPlanRangeDocument,
    "\n  mutation AddRecipeToMealPlan($input: AddRecipeToMealPlanInput!) {\n    addRecipeToMealPlan(input: $input) {\n      id\n      mealType\n      meal {\n        ... on RecipeType { id, name, slug }\n      }\n    }\n  }\n": typeof types.AddRecipeToMealPlanDocument,
    "\n  mutation RemoveRecipeFromMealPlan($input: RemoveRecipeFromMealPlanInput!) {\n    removeRecipeFromMealPlan(input: $input)\n  }\n": typeof types.RemoveRecipeFromMealPlanDocument,
    "\n  mutation ClearMealSlot($input: ClearMealSlotInput!) {\n    clearMealSlot(input: $input)\n  }\n": typeof types.ClearMealSlotDocument,
    "\n  mutation AddAdHocMeal($input: AddAdHocMealInput!) {\n    addAdHocMeal(input: $input) {\n      id\n      mealType\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n": typeof types.AddAdHocMealDocument,
    "\n  mutation RemoveAdHocMeal($input: RemoveAdHocMealInput!) {\n    removeAdHocMeal(input: $input)\n  }\n": typeof types.RemoveAdHocMealDocument,
    "\n  mutation UpdateAdHocMeal($input: UpdateAdHocMealInput!) {\n    updateAdHocMeal(input: $input) {\n      id\n      mealType\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n": typeof types.UpdateAdHocMealDocument,
    "\n  mutation AddRecipeToFamilyMealPlan($input: AddRecipeToFamilyMealPlanInput!) {\n    addRecipeToFamilyMealPlan(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on RecipeType { id, name, slug }\n      }\n    }\n  }\n": typeof types.AddRecipeToFamilyMealPlanDocument,
    "\n  mutation RemoveRecipeFromFamilyMealPlan($input: RemoveRecipeFromFamilyMealPlanInput!) {\n    removeRecipeFromFamilyMealPlan(input: $input)\n  }\n": typeof types.RemoveRecipeFromFamilyMealPlanDocument,
    "\n  mutation ClearFamilyMealSlot($input: ClearFamilyMealSlotInput!) {\n    clearFamilyMealSlot(input: $input)\n  }\n": typeof types.ClearFamilyMealSlotDocument,
    "\n  mutation AddFamilyAdHocMeal($input: AddFamilyAdHocMealInput!) {\n    addFamilyAdHocMeal(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n": typeof types.AddFamilyAdHocMealDocument,
    "\n  mutation RemoveFamilyAdHocMeal($input: RemoveFamilyAdHocMealInput!) {\n    removeFamilyAdHocMeal(input: $input)\n  }\n": typeof types.RemoveFamilyAdHocMealDocument,
    "\n  mutation UpdateFamilyAdHocMeal($input: UpdateFamilyAdHocMealInput!) {\n    updateFamilyAdHocMeal(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n": typeof types.UpdateFamilyAdHocMealDocument,
    "\n  query GetRecipeDetail($slug: String!) {\n    recipe(slug: $slug) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      isFamilyRecipe\n      isOwnedByCurrentUser\n      ingredientCount\n      ingredients {\n        id\n        quantity\n        displayText\n        sortOrder\n        isOptional\n        preparationNote\n        ingredient {\n          id\n          name\n        }\n        measurement {\n          id\n          abbreviation\n          type\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetRecipeDetailDocument,
    "\n  mutation AddRecipeIngredient($input: AddRecipeIngredientInput!) {\n    addRecipeIngredient(input: $input) {\n      id\n      quantity\n      displayText\n      sortOrder\n      isOptional\n      preparationNote\n      ingredient {\n        id\n        name\n      }\n      measurement {\n        id\n        abbreviation\n        type\n      }\n    }\n  }\n": typeof types.AddRecipeIngredientDocument,
    "\n  mutation UpdateRecipeIngredient($input: UpdateRecipeIngredientInput!) {\n    updateRecipeIngredient(input: $input) {\n      id\n      quantity\n      displayText\n      sortOrder\n      isOptional\n      preparationNote\n      ingredient {\n        id\n        name\n      }\n      measurement {\n        id\n        abbreviation\n        type\n      }\n    }\n  }\n": typeof types.UpdateRecipeIngredientDocument,
    "\n  mutation RemoveRecipeIngredient($input: RemoveRecipeIngredientInput!) {\n    removeRecipeIngredient(input: $input)\n  }\n": typeof types.RemoveRecipeIngredientDocument,
    "\n  mutation UpdateRecipe($slug: String!, $input: UpdateRecipeInput!) {\n    updateRecipe(slug: $slug, input: $input) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateRecipeDocument,
    "\n  query GetUnifiedRecipes {\n    unifiedRecipes {\n      id\n      name\n      slug\n      isFamilyRecipe\n      isOwnedByCurrentUser\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetUnifiedRecipesDocument,
    "\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      id\n      name\n      slug\n      instructions\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateRecipeDocument,
    "\n  query SearchIngredients($input: SearchIngredientsInput!) {\n    searchIngredients(input: $input) {\n      ingredients {\n        id\n        name\n        isSystem\n        isCustom\n        category {\n          id\n          name\n          slug\n        }\n      }\n      totalCount\n    }\n  }\n": typeof types.SearchIngredientsDocument,
    "\n  query GetMeasurements($input: GetMeasurementsInput) {\n    measurements(input: $input) {\n      id\n      name\n      abbreviation\n      type\n      displayOrder\n      isExposed\n      isQualitative\n    }\n  }\n": typeof types.GetMeasurementsDocument,
    "\n  query GetAisles {\n    aisles {\n      id\n      name\n      slug\n      sortOrder\n    }\n  }\n": typeof types.GetAislesDocument,
    "\n  query GetShoppingList($input: GetShoppingListInput!) {\n    shoppingList(input: $input) {\n      id\n      startDate\n      endDate\n      aisleGroups {\n        aisle {\n          id\n          name\n          slug\n          sortOrder\n        }\n        allChecked\n        items {\n          id\n          name\n          quantity\n          measurement {\n            id\n            name\n            abbreviation\n          }\n          source\n          isChecked\n          sortOrder\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetShoppingListDocument,
    "\n  mutation GenerateShoppingList($input: GenerateShoppingListInput!) {\n    generateShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n": typeof types.GenerateShoppingListDocument,
    "\n  mutation RegenerateShoppingList($input: RegenerateShoppingListInput!) {\n    regenerateShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n": typeof types.RegenerateShoppingListDocument,
    "\n  mutation ToggleShoppingListItem($input: ToggleShoppingListItemInput!) {\n    toggleShoppingListItem(input: $input) {\n      id\n      isChecked\n      checkedAt\n    }\n  }\n": typeof types.ToggleShoppingListItemDocument,
    "\n  mutation AddShoppingListItem($input: AddShoppingListItemInput!) {\n    addShoppingListItem(input: $input) {\n      id\n      name\n      quantity\n      isChecked\n      source\n    }\n  }\n": typeof types.AddShoppingListItemDocument,
    "\n  mutation RemoveShoppingListItem($input: RemoveShoppingListItemInput!) {\n    removeShoppingListItem(input: $input)\n  }\n": typeof types.RemoveShoppingListItemDocument,
    "\n  query GetFamilyShoppingList($input: GetFamilyShoppingListInput!) {\n    familyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n      aisleGroups {\n        aisle {\n          id\n          name\n          slug\n          sortOrder\n        }\n        allChecked\n        items {\n          id\n          name\n          quantity\n          measurement {\n            id\n            name\n            abbreviation\n          }\n          source\n          isChecked\n          sortOrder\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetFamilyShoppingListDocument,
    "\n  mutation GenerateFamilyShoppingList($input: GenerateFamilyShoppingListInput!) {\n    generateFamilyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n": typeof types.GenerateFamilyShoppingListDocument,
    "\n  mutation RegenerateFamilyShoppingList($input: RegenerateFamilyShoppingListInput!) {\n    regenerateFamilyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n": typeof types.RegenerateFamilyShoppingListDocument,
    "\n  mutation ToggleFamilyShoppingListItem($input: ToggleFamilyShoppingListItemInput!) {\n    toggleFamilyShoppingListItem(input: $input) {\n      id\n      isChecked\n      checkedAt\n    }\n  }\n": typeof types.ToggleFamilyShoppingListItemDocument,
    "\n  mutation AddFamilyShoppingListItem($input: AddFamilyShoppingListItemInput!) {\n    addFamilyShoppingListItem(input: $input) {\n      id\n      name\n      quantity\n      isChecked\n      source\n    }\n  }\n": typeof types.AddFamilyShoppingListItemDocument,
    "\n  mutation RemoveFamilyShoppingListItem($input: RemoveFamilyShoppingListItemInput!) {\n    removeFamilyShoppingListItem(input: $input)\n  }\n": typeof types.RemoveFamilyShoppingListItemDocument,
    "\n  query GetTermsStatus {\n    termsStatus {\n      termsRequiresAcceptance\n      termsCurrentVersion\n      termsAcceptedVersion\n      termsEffectiveDate\n      privacyRequiresAcceptance\n      privacyCurrentVersion\n      privacyAcceptedVersion\n      privacyEffectiveDate\n    }\n  }\n": typeof types.GetTermsStatusDocument,
    "\n  query GetCurrentTerms($documentType: String!) {\n    currentTerms(documentType: $documentType) {\n      version\n      content\n      effectiveDate\n    }\n  }\n": typeof types.GetCurrentTermsDocument,
    "\n  mutation AcceptTerms($documentType: String!, $version: String!) {\n    acceptTerms(documentType: $documentType, version: $version) {\n      id\n      version\n      acceptedAt\n    }\n  }\n": typeof types.AcceptTermsDocument,
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
    "\n  query GetFamilyMealPlanRange($input: FamilyMealPlanRangeInput!) {\n    familyMealPlanRange(input: $input) {\n      date\n      entries {\n        id\n        mealType\n        addedBy\n        meal {\n          ... on RecipeType {\n            id\n            name\n            slug\n          }\n          ... on AdHocMealType {\n            id\n            text\n          }\n        }\n      }\n    }\n  }\n": types.GetFamilyMealPlanRangeDocument,
    "\n  mutation AddRecipeToMealPlan($input: AddRecipeToMealPlanInput!) {\n    addRecipeToMealPlan(input: $input) {\n      id\n      mealType\n      meal {\n        ... on RecipeType { id, name, slug }\n      }\n    }\n  }\n": types.AddRecipeToMealPlanDocument,
    "\n  mutation RemoveRecipeFromMealPlan($input: RemoveRecipeFromMealPlanInput!) {\n    removeRecipeFromMealPlan(input: $input)\n  }\n": types.RemoveRecipeFromMealPlanDocument,
    "\n  mutation ClearMealSlot($input: ClearMealSlotInput!) {\n    clearMealSlot(input: $input)\n  }\n": types.ClearMealSlotDocument,
    "\n  mutation AddAdHocMeal($input: AddAdHocMealInput!) {\n    addAdHocMeal(input: $input) {\n      id\n      mealType\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n": types.AddAdHocMealDocument,
    "\n  mutation RemoveAdHocMeal($input: RemoveAdHocMealInput!) {\n    removeAdHocMeal(input: $input)\n  }\n": types.RemoveAdHocMealDocument,
    "\n  mutation UpdateAdHocMeal($input: UpdateAdHocMealInput!) {\n    updateAdHocMeal(input: $input) {\n      id\n      mealType\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n": types.UpdateAdHocMealDocument,
    "\n  mutation AddRecipeToFamilyMealPlan($input: AddRecipeToFamilyMealPlanInput!) {\n    addRecipeToFamilyMealPlan(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on RecipeType { id, name, slug }\n      }\n    }\n  }\n": types.AddRecipeToFamilyMealPlanDocument,
    "\n  mutation RemoveRecipeFromFamilyMealPlan($input: RemoveRecipeFromFamilyMealPlanInput!) {\n    removeRecipeFromFamilyMealPlan(input: $input)\n  }\n": types.RemoveRecipeFromFamilyMealPlanDocument,
    "\n  mutation ClearFamilyMealSlot($input: ClearFamilyMealSlotInput!) {\n    clearFamilyMealSlot(input: $input)\n  }\n": types.ClearFamilyMealSlotDocument,
    "\n  mutation AddFamilyAdHocMeal($input: AddFamilyAdHocMealInput!) {\n    addFamilyAdHocMeal(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n": types.AddFamilyAdHocMealDocument,
    "\n  mutation RemoveFamilyAdHocMeal($input: RemoveFamilyAdHocMealInput!) {\n    removeFamilyAdHocMeal(input: $input)\n  }\n": types.RemoveFamilyAdHocMealDocument,
    "\n  mutation UpdateFamilyAdHocMeal($input: UpdateFamilyAdHocMealInput!) {\n    updateFamilyAdHocMeal(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n": types.UpdateFamilyAdHocMealDocument,
    "\n  query GetRecipeDetail($slug: String!) {\n    recipe(slug: $slug) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      isFamilyRecipe\n      isOwnedByCurrentUser\n      ingredientCount\n      ingredients {\n        id\n        quantity\n        displayText\n        sortOrder\n        isOptional\n        preparationNote\n        ingredient {\n          id\n          name\n        }\n        measurement {\n          id\n          abbreviation\n          type\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetRecipeDetailDocument,
    "\n  mutation AddRecipeIngredient($input: AddRecipeIngredientInput!) {\n    addRecipeIngredient(input: $input) {\n      id\n      quantity\n      displayText\n      sortOrder\n      isOptional\n      preparationNote\n      ingredient {\n        id\n        name\n      }\n      measurement {\n        id\n        abbreviation\n        type\n      }\n    }\n  }\n": types.AddRecipeIngredientDocument,
    "\n  mutation UpdateRecipeIngredient($input: UpdateRecipeIngredientInput!) {\n    updateRecipeIngredient(input: $input) {\n      id\n      quantity\n      displayText\n      sortOrder\n      isOptional\n      preparationNote\n      ingredient {\n        id\n        name\n      }\n      measurement {\n        id\n        abbreviation\n        type\n      }\n    }\n  }\n": types.UpdateRecipeIngredientDocument,
    "\n  mutation RemoveRecipeIngredient($input: RemoveRecipeIngredientInput!) {\n    removeRecipeIngredient(input: $input)\n  }\n": types.RemoveRecipeIngredientDocument,
    "\n  mutation UpdateRecipe($slug: String!, $input: UpdateRecipeInput!) {\n    updateRecipe(slug: $slug, input: $input) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateRecipeDocument,
    "\n  query GetUnifiedRecipes {\n    unifiedRecipes {\n      id\n      name\n      slug\n      isFamilyRecipe\n      isOwnedByCurrentUser\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUnifiedRecipesDocument,
    "\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      id\n      name\n      slug\n      instructions\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateRecipeDocument,
    "\n  query SearchIngredients($input: SearchIngredientsInput!) {\n    searchIngredients(input: $input) {\n      ingredients {\n        id\n        name\n        isSystem\n        isCustom\n        category {\n          id\n          name\n          slug\n        }\n      }\n      totalCount\n    }\n  }\n": types.SearchIngredientsDocument,
    "\n  query GetMeasurements($input: GetMeasurementsInput) {\n    measurements(input: $input) {\n      id\n      name\n      abbreviation\n      type\n      displayOrder\n      isExposed\n      isQualitative\n    }\n  }\n": types.GetMeasurementsDocument,
    "\n  query GetAisles {\n    aisles {\n      id\n      name\n      slug\n      sortOrder\n    }\n  }\n": types.GetAislesDocument,
    "\n  query GetShoppingList($input: GetShoppingListInput!) {\n    shoppingList(input: $input) {\n      id\n      startDate\n      endDate\n      aisleGroups {\n        aisle {\n          id\n          name\n          slug\n          sortOrder\n        }\n        allChecked\n        items {\n          id\n          name\n          quantity\n          measurement {\n            id\n            name\n            abbreviation\n          }\n          source\n          isChecked\n          sortOrder\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetShoppingListDocument,
    "\n  mutation GenerateShoppingList($input: GenerateShoppingListInput!) {\n    generateShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n": types.GenerateShoppingListDocument,
    "\n  mutation RegenerateShoppingList($input: RegenerateShoppingListInput!) {\n    regenerateShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n": types.RegenerateShoppingListDocument,
    "\n  mutation ToggleShoppingListItem($input: ToggleShoppingListItemInput!) {\n    toggleShoppingListItem(input: $input) {\n      id\n      isChecked\n      checkedAt\n    }\n  }\n": types.ToggleShoppingListItemDocument,
    "\n  mutation AddShoppingListItem($input: AddShoppingListItemInput!) {\n    addShoppingListItem(input: $input) {\n      id\n      name\n      quantity\n      isChecked\n      source\n    }\n  }\n": types.AddShoppingListItemDocument,
    "\n  mutation RemoveShoppingListItem($input: RemoveShoppingListItemInput!) {\n    removeShoppingListItem(input: $input)\n  }\n": types.RemoveShoppingListItemDocument,
    "\n  query GetFamilyShoppingList($input: GetFamilyShoppingListInput!) {\n    familyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n      aisleGroups {\n        aisle {\n          id\n          name\n          slug\n          sortOrder\n        }\n        allChecked\n        items {\n          id\n          name\n          quantity\n          measurement {\n            id\n            name\n            abbreviation\n          }\n          source\n          isChecked\n          sortOrder\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetFamilyShoppingListDocument,
    "\n  mutation GenerateFamilyShoppingList($input: GenerateFamilyShoppingListInput!) {\n    generateFamilyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n": types.GenerateFamilyShoppingListDocument,
    "\n  mutation RegenerateFamilyShoppingList($input: RegenerateFamilyShoppingListInput!) {\n    regenerateFamilyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n": types.RegenerateFamilyShoppingListDocument,
    "\n  mutation ToggleFamilyShoppingListItem($input: ToggleFamilyShoppingListItemInput!) {\n    toggleFamilyShoppingListItem(input: $input) {\n      id\n      isChecked\n      checkedAt\n    }\n  }\n": types.ToggleFamilyShoppingListItemDocument,
    "\n  mutation AddFamilyShoppingListItem($input: AddFamilyShoppingListItemInput!) {\n    addFamilyShoppingListItem(input: $input) {\n      id\n      name\n      quantity\n      isChecked\n      source\n    }\n  }\n": types.AddFamilyShoppingListItemDocument,
    "\n  mutation RemoveFamilyShoppingListItem($input: RemoveFamilyShoppingListItemInput!) {\n    removeFamilyShoppingListItem(input: $input)\n  }\n": types.RemoveFamilyShoppingListItemDocument,
    "\n  query GetTermsStatus {\n    termsStatus {\n      termsRequiresAcceptance\n      termsCurrentVersion\n      termsAcceptedVersion\n      termsEffectiveDate\n      privacyRequiresAcceptance\n      privacyCurrentVersion\n      privacyAcceptedVersion\n      privacyEffectiveDate\n    }\n  }\n": types.GetTermsStatusDocument,
    "\n  query GetCurrentTerms($documentType: String!) {\n    currentTerms(documentType: $documentType) {\n      version\n      content\n      effectiveDate\n    }\n  }\n": types.GetCurrentTermsDocument,
    "\n  mutation AcceptTerms($documentType: String!, $version: String!) {\n    acceptTerms(documentType: $documentType, version: $version) {\n      id\n      version\n      acceptedAt\n    }\n  }\n": types.AcceptTermsDocument,
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
export function graphql(source: "\n  query GetFamilyMealPlanRange($input: FamilyMealPlanRangeInput!) {\n    familyMealPlanRange(input: $input) {\n      date\n      entries {\n        id\n        mealType\n        addedBy\n        meal {\n          ... on RecipeType {\n            id\n            name\n            slug\n          }\n          ... on AdHocMealType {\n            id\n            text\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFamilyMealPlanRange($input: FamilyMealPlanRangeInput!) {\n    familyMealPlanRange(input: $input) {\n      date\n      entries {\n        id\n        mealType\n        addedBy\n        meal {\n          ... on RecipeType {\n            id\n            name\n            slug\n          }\n          ... on AdHocMealType {\n            id\n            text\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddRecipeToMealPlan($input: AddRecipeToMealPlanInput!) {\n    addRecipeToMealPlan(input: $input) {\n      id\n      mealType\n      meal {\n        ... on RecipeType { id, name, slug }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddRecipeToMealPlan($input: AddRecipeToMealPlanInput!) {\n    addRecipeToMealPlan(input: $input) {\n      id\n      mealType\n      meal {\n        ... on RecipeType { id, name, slug }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveRecipeFromMealPlan($input: RemoveRecipeFromMealPlanInput!) {\n    removeRecipeFromMealPlan(input: $input)\n  }\n"): (typeof documents)["\n  mutation RemoveRecipeFromMealPlan($input: RemoveRecipeFromMealPlanInput!) {\n    removeRecipeFromMealPlan(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClearMealSlot($input: ClearMealSlotInput!) {\n    clearMealSlot(input: $input)\n  }\n"): (typeof documents)["\n  mutation ClearMealSlot($input: ClearMealSlotInput!) {\n    clearMealSlot(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddAdHocMeal($input: AddAdHocMealInput!) {\n    addAdHocMeal(input: $input) {\n      id\n      mealType\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddAdHocMeal($input: AddAdHocMealInput!) {\n    addAdHocMeal(input: $input) {\n      id\n      mealType\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveAdHocMeal($input: RemoveAdHocMealInput!) {\n    removeAdHocMeal(input: $input)\n  }\n"): (typeof documents)["\n  mutation RemoveAdHocMeal($input: RemoveAdHocMealInput!) {\n    removeAdHocMeal(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAdHocMeal($input: UpdateAdHocMealInput!) {\n    updateAdHocMeal(input: $input) {\n      id\n      mealType\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAdHocMeal($input: UpdateAdHocMealInput!) {\n    updateAdHocMeal(input: $input) {\n      id\n      mealType\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddRecipeToFamilyMealPlan($input: AddRecipeToFamilyMealPlanInput!) {\n    addRecipeToFamilyMealPlan(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on RecipeType { id, name, slug }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddRecipeToFamilyMealPlan($input: AddRecipeToFamilyMealPlanInput!) {\n    addRecipeToFamilyMealPlan(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on RecipeType { id, name, slug }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveRecipeFromFamilyMealPlan($input: RemoveRecipeFromFamilyMealPlanInput!) {\n    removeRecipeFromFamilyMealPlan(input: $input)\n  }\n"): (typeof documents)["\n  mutation RemoveRecipeFromFamilyMealPlan($input: RemoveRecipeFromFamilyMealPlanInput!) {\n    removeRecipeFromFamilyMealPlan(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClearFamilyMealSlot($input: ClearFamilyMealSlotInput!) {\n    clearFamilyMealSlot(input: $input)\n  }\n"): (typeof documents)["\n  mutation ClearFamilyMealSlot($input: ClearFamilyMealSlotInput!) {\n    clearFamilyMealSlot(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddFamilyAdHocMeal($input: AddFamilyAdHocMealInput!) {\n    addFamilyAdHocMeal(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddFamilyAdHocMeal($input: AddFamilyAdHocMealInput!) {\n    addFamilyAdHocMeal(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFamilyAdHocMeal($input: RemoveFamilyAdHocMealInput!) {\n    removeFamilyAdHocMeal(input: $input)\n  }\n"): (typeof documents)["\n  mutation RemoveFamilyAdHocMeal($input: RemoveFamilyAdHocMealInput!) {\n    removeFamilyAdHocMeal(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateFamilyAdHocMeal($input: UpdateFamilyAdHocMealInput!) {\n    updateFamilyAdHocMeal(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateFamilyAdHocMeal($input: UpdateFamilyAdHocMealInput!) {\n    updateFamilyAdHocMeal(input: $input) {\n      id\n      mealType\n      addedBy\n      meal {\n        ... on AdHocMealType { id, text }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecipeDetail($slug: String!) {\n    recipe(slug: $slug) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      isFamilyRecipe\n      isOwnedByCurrentUser\n      ingredientCount\n      ingredients {\n        id\n        quantity\n        displayText\n        sortOrder\n        isOptional\n        preparationNote\n        ingredient {\n          id\n          name\n        }\n        measurement {\n          id\n          abbreviation\n          type\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetRecipeDetail($slug: String!) {\n    recipe(slug: $slug) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      isFamilyRecipe\n      isOwnedByCurrentUser\n      ingredientCount\n      ingredients {\n        id\n        quantity\n        displayText\n        sortOrder\n        isOptional\n        preparationNote\n        ingredient {\n          id\n          name\n        }\n        measurement {\n          id\n          abbreviation\n          type\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddRecipeIngredient($input: AddRecipeIngredientInput!) {\n    addRecipeIngredient(input: $input) {\n      id\n      quantity\n      displayText\n      sortOrder\n      isOptional\n      preparationNote\n      ingredient {\n        id\n        name\n      }\n      measurement {\n        id\n        abbreviation\n        type\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddRecipeIngredient($input: AddRecipeIngredientInput!) {\n    addRecipeIngredient(input: $input) {\n      id\n      quantity\n      displayText\n      sortOrder\n      isOptional\n      preparationNote\n      ingredient {\n        id\n        name\n      }\n      measurement {\n        id\n        abbreviation\n        type\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRecipeIngredient($input: UpdateRecipeIngredientInput!) {\n    updateRecipeIngredient(input: $input) {\n      id\n      quantity\n      displayText\n      sortOrder\n      isOptional\n      preparationNote\n      ingredient {\n        id\n        name\n      }\n      measurement {\n        id\n        abbreviation\n        type\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRecipeIngredient($input: UpdateRecipeIngredientInput!) {\n    updateRecipeIngredient(input: $input) {\n      id\n      quantity\n      displayText\n      sortOrder\n      isOptional\n      preparationNote\n      ingredient {\n        id\n        name\n      }\n      measurement {\n        id\n        abbreviation\n        type\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveRecipeIngredient($input: RemoveRecipeIngredientInput!) {\n    removeRecipeIngredient(input: $input)\n  }\n"): (typeof documents)["\n  mutation RemoveRecipeIngredient($input: RemoveRecipeIngredientInput!) {\n    removeRecipeIngredient(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRecipe($slug: String!, $input: UpdateRecipeInput!) {\n    updateRecipe(slug: $slug, input: $input) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRecipe($slug: String!, $input: UpdateRecipeInput!) {\n    updateRecipe(slug: $slug, input: $input) {\n      id\n      name\n      slug\n      instructions\n      sourceUrl\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUnifiedRecipes {\n    unifiedRecipes {\n      id\n      name\n      slug\n      isFamilyRecipe\n      isOwnedByCurrentUser\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetUnifiedRecipes {\n    unifiedRecipes {\n      id\n      name\n      slug\n      isFamilyRecipe\n      isOwnedByCurrentUser\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      id\n      name\n      slug\n      instructions\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      id\n      name\n      slug\n      instructions\n      ingredientCount\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchIngredients($input: SearchIngredientsInput!) {\n    searchIngredients(input: $input) {\n      ingredients {\n        id\n        name\n        isSystem\n        isCustom\n        category {\n          id\n          name\n          slug\n        }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query SearchIngredients($input: SearchIngredientsInput!) {\n    searchIngredients(input: $input) {\n      ingredients {\n        id\n        name\n        isSystem\n        isCustom\n        category {\n          id\n          name\n          slug\n        }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMeasurements($input: GetMeasurementsInput) {\n    measurements(input: $input) {\n      id\n      name\n      abbreviation\n      type\n      displayOrder\n      isExposed\n      isQualitative\n    }\n  }\n"): (typeof documents)["\n  query GetMeasurements($input: GetMeasurementsInput) {\n    measurements(input: $input) {\n      id\n      name\n      abbreviation\n      type\n      displayOrder\n      isExposed\n      isQualitative\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAisles {\n    aisles {\n      id\n      name\n      slug\n      sortOrder\n    }\n  }\n"): (typeof documents)["\n  query GetAisles {\n    aisles {\n      id\n      name\n      slug\n      sortOrder\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetShoppingList($input: GetShoppingListInput!) {\n    shoppingList(input: $input) {\n      id\n      startDate\n      endDate\n      aisleGroups {\n        aisle {\n          id\n          name\n          slug\n          sortOrder\n        }\n        allChecked\n        items {\n          id\n          name\n          quantity\n          measurement {\n            id\n            name\n            abbreviation\n          }\n          source\n          isChecked\n          sortOrder\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetShoppingList($input: GetShoppingListInput!) {\n    shoppingList(input: $input) {\n      id\n      startDate\n      endDate\n      aisleGroups {\n        aisle {\n          id\n          name\n          slug\n          sortOrder\n        }\n        allChecked\n        items {\n          id\n          name\n          quantity\n          measurement {\n            id\n            name\n            abbreviation\n          }\n          source\n          isChecked\n          sortOrder\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GenerateShoppingList($input: GenerateShoppingListInput!) {\n    generateShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n"): (typeof documents)["\n  mutation GenerateShoppingList($input: GenerateShoppingListInput!) {\n    generateShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegenerateShoppingList($input: RegenerateShoppingListInput!) {\n    regenerateShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n"): (typeof documents)["\n  mutation RegenerateShoppingList($input: RegenerateShoppingListInput!) {\n    regenerateShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleShoppingListItem($input: ToggleShoppingListItemInput!) {\n    toggleShoppingListItem(input: $input) {\n      id\n      isChecked\n      checkedAt\n    }\n  }\n"): (typeof documents)["\n  mutation ToggleShoppingListItem($input: ToggleShoppingListItemInput!) {\n    toggleShoppingListItem(input: $input) {\n      id\n      isChecked\n      checkedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddShoppingListItem($input: AddShoppingListItemInput!) {\n    addShoppingListItem(input: $input) {\n      id\n      name\n      quantity\n      isChecked\n      source\n    }\n  }\n"): (typeof documents)["\n  mutation AddShoppingListItem($input: AddShoppingListItemInput!) {\n    addShoppingListItem(input: $input) {\n      id\n      name\n      quantity\n      isChecked\n      source\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveShoppingListItem($input: RemoveShoppingListItemInput!) {\n    removeShoppingListItem(input: $input)\n  }\n"): (typeof documents)["\n  mutation RemoveShoppingListItem($input: RemoveShoppingListItemInput!) {\n    removeShoppingListItem(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFamilyShoppingList($input: GetFamilyShoppingListInput!) {\n    familyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n      aisleGroups {\n        aisle {\n          id\n          name\n          slug\n          sortOrder\n        }\n        allChecked\n        items {\n          id\n          name\n          quantity\n          measurement {\n            id\n            name\n            abbreviation\n          }\n          source\n          isChecked\n          sortOrder\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetFamilyShoppingList($input: GetFamilyShoppingListInput!) {\n    familyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n      aisleGroups {\n        aisle {\n          id\n          name\n          slug\n          sortOrder\n        }\n        allChecked\n        items {\n          id\n          name\n          quantity\n          measurement {\n            id\n            name\n            abbreviation\n          }\n          source\n          isChecked\n          sortOrder\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GenerateFamilyShoppingList($input: GenerateFamilyShoppingListInput!) {\n    generateFamilyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n"): (typeof documents)["\n  mutation GenerateFamilyShoppingList($input: GenerateFamilyShoppingListInput!) {\n    generateFamilyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegenerateFamilyShoppingList($input: RegenerateFamilyShoppingListInput!) {\n    regenerateFamilyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n"): (typeof documents)["\n  mutation RegenerateFamilyShoppingList($input: RegenerateFamilyShoppingListInput!) {\n    regenerateFamilyShoppingList(input: $input) {\n      id\n      startDate\n      endDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleFamilyShoppingListItem($input: ToggleFamilyShoppingListItemInput!) {\n    toggleFamilyShoppingListItem(input: $input) {\n      id\n      isChecked\n      checkedAt\n    }\n  }\n"): (typeof documents)["\n  mutation ToggleFamilyShoppingListItem($input: ToggleFamilyShoppingListItemInput!) {\n    toggleFamilyShoppingListItem(input: $input) {\n      id\n      isChecked\n      checkedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddFamilyShoppingListItem($input: AddFamilyShoppingListItemInput!) {\n    addFamilyShoppingListItem(input: $input) {\n      id\n      name\n      quantity\n      isChecked\n      source\n    }\n  }\n"): (typeof documents)["\n  mutation AddFamilyShoppingListItem($input: AddFamilyShoppingListItemInput!) {\n    addFamilyShoppingListItem(input: $input) {\n      id\n      name\n      quantity\n      isChecked\n      source\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFamilyShoppingListItem($input: RemoveFamilyShoppingListItemInput!) {\n    removeFamilyShoppingListItem(input: $input)\n  }\n"): (typeof documents)["\n  mutation RemoveFamilyShoppingListItem($input: RemoveFamilyShoppingListItemInput!) {\n    removeFamilyShoppingListItem(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTermsStatus {\n    termsStatus {\n      termsRequiresAcceptance\n      termsCurrentVersion\n      termsAcceptedVersion\n      termsEffectiveDate\n      privacyRequiresAcceptance\n      privacyCurrentVersion\n      privacyAcceptedVersion\n      privacyEffectiveDate\n    }\n  }\n"): (typeof documents)["\n  query GetTermsStatus {\n    termsStatus {\n      termsRequiresAcceptance\n      termsCurrentVersion\n      termsAcceptedVersion\n      termsEffectiveDate\n      privacyRequiresAcceptance\n      privacyCurrentVersion\n      privacyAcceptedVersion\n      privacyEffectiveDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentTerms($documentType: String!) {\n    currentTerms(documentType: $documentType) {\n      version\n      content\n      effectiveDate\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentTerms($documentType: String!) {\n    currentTerms(documentType: $documentType) {\n      version\n      content\n      effectiveDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AcceptTerms($documentType: String!, $version: String!) {\n    acceptTerms(documentType: $documentType, version: $version) {\n      id\n      version\n      acceptedAt\n    }\n  }\n"): (typeof documents)["\n  mutation AcceptTerms($documentType: String!, $version: String!) {\n    acceptTerms(documentType: $documentType, version: $version) {\n      id\n      version\n      acceptedAt\n    }\n  }\n"];
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