/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
};

/** Result of checking access to a specific feature. Returns whether the current user can access the requested feature. */
export type AccessCheckResult = {
  __typename?: 'AccessCheckResult';
  /** Whether access is allowed for the current user */
  allowed: Scalars['Boolean']['output'];
  /** Feature identifier that was checked (e.g., 'admin:users', 'recipe:create') */
  feature: Scalars['String']['output'];
};

/** A free-text meal entry (data primitive for Meal union) */
export type AdHocMealType = {
  __typename?: 'AdHocMealType';
  /** Timestamp when entry was created */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier for the ad hoc meal */
  id: Scalars['Int']['output'];
  /** Free-text description of the meal */
  text: Scalars['String']['output'];
  /** Timestamp when entry was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type AddAdHocMealInput = {
  /** Date of the meal (ISO 8601 format: YYYY-MM-DD) */
  date: Scalars['String']['input'];
  /** Type of meal (breakfast, lunch, dinner, or snacks) */
  mealType: Scalars['String']['input'];
  /** Free-text description of the meal (1-200 characters) */
  text: Scalars['String']['input'];
};

/** Input for adding an ingredient to a recipe */
export type AddRecipeIngredientInput = {
  /** ID of the ingredient to add */
  ingredientId: Scalars['Int']['input'];
  /** Whether this ingredient is optional (default false) */
  isOptional?: InputMaybe<Scalars['Boolean']['input']>;
  /** ID of the measurement unit (required) */
  measurementId: Scalars['Int']['input'];
  /** Optional preparation note (max 200 characters) */
  preparationNote?: InputMaybe<Scalars['String']['input']>;
  /** Quantity of the ingredient (required) */
  quantity: Scalars['Float']['input'];
  /** ID of the recipe to add the ingredient to */
  recipeId: Scalars['Int']['input'];
};

export type AddRecipeToMealPlanInput = {
  date: Scalars['String']['input'];
  mealType: Scalars['String']['input'];
  recipeSlug: Scalars['String']['input'];
};

/** Recipe detail for admin view (read-only) */
export type AdminRecipeDetail = {
  __typename?: 'AdminRecipeDetail';
  /** Recipe creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Recipe ID */
  id: Scalars['Int']['output'];
  /** Recipe instructions in markdown format */
  instructions?: Maybe<Scalars['String']['output']>;
  /** Recipe name */
  name: Scalars['String']['output'];
};

/** Recipe summary for admin user profile */
export type AdminRecipeSummary = {
  __typename?: 'AdminRecipeSummary';
  /** Recipe creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Recipe ID */
  id: Scalars['Int']['output'];
  /** Recipe name */
  name: Scalars['String']['output'];
};

/** Terms version for admin management */
export type AdminTermsVersion = {
  __typename?: 'AdminTermsVersion';
  /** Number of users who have accepted this version */
  acceptanceCount: Scalars['Int']['output'];
  /** Markdown content of the terms */
  content: Scalars['String']['output'];
  /** Version creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** Effective date (YYYY-MM-DD) or null for unpublished/draft versions */
  effectiveDate?: Maybe<Scalars['String']['output']>;
  /** Terms version ID */
  id: Scalars['Int']['output'];
  /** Whether this version can be edited (true if acceptanceCount === 0) */
  isEditable: Scalars['Boolean']['output'];
  /** Last update timestamp (used for optimistic locking) */
  updatedAt: Scalars['DateTime']['output'];
  /** Version identifier in YYYY-MM-DD format */
  version: Scalars['String']['output'];
};

/** User summary for admin search results */
export type AdminUser = {
  __typename?: 'AdminUser';
  /** Account creation date */
  createdAt: Scalars['DateTime']['output'];
  /** User email address */
  email: Scalars['String']['output'];
  /** User first name */
  firstName: Scalars['String']['output'];
  /** User ID */
  id: Scalars['Int']['output'];
  /** Last login timestamp */
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  /** User last name */
  lastName: Scalars['String']['output'];
};

/** Full user profile for admin view */
export type AdminUserProfile = {
  __typename?: 'AdminUserProfile';
  /** Account creation date */
  createdAt: Scalars['DateTime']['output'];
  /** User email address */
  email: Scalars['String']['output'];
  /** User first name */
  firstName: Scalars['String']['output'];
  /** Whether the user has a pending terms acceptance (has not accepted latest terms) */
  hasPendingTermsAcceptance: Scalars['Boolean']['output'];
  /** User ID */
  id: Scalars['Int']['output'];
  /** Last login timestamp */
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  /** User last name */
  lastName: Scalars['String']['output'];
  /** List of user's recipes */
  recipes: Array<AdminRecipeSummary>;
  /** History of terms acceptances by this user */
  termsAcceptanceHistory: Array<TermsAcceptanceRecord>;
};

/** Paginated user search results */
export type AdminUserSearchResult = {
  __typename?: 'AdminUserSearchResult';
  /** Current page number (1-indexed) */
  page: Scalars['Int']['output'];
  /** Number of results per page */
  pageSize: Scalars['Int']['output'];
  /** Total count of matching users */
  total: Scalars['Int']['output'];
  /** List of users matching the search */
  users: Array<AdminUser>;
};

export type ClearMealSlotInput = {
  date: Scalars['String']['input'];
  mealType: Scalars['String']['input'];
};

/** A connected MCP application that has been authorized to access user data */
export type ConnectedApp = {
  __typename?: 'ConnectedApp';
  /** OAuth client ID of the application */
  clientId: Scalars['String']['output'];
  /** Human-readable name of the application */
  clientName?: Maybe<Scalars['String']['output']>;
  /** When the application was first authorized */
  firstAuthorizedAt: Scalars['DateTime']['output'];
  /** Unique identifier for this authorization */
  id: Scalars['Int']['output'];
  /** Whether this authorization is currently active (not revoked) */
  isActive: Scalars['Boolean']['output'];
  /** When the application last accessed data */
  lastUsedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Statistics about connected MCP applications */
export type ConnectedAppsStats = {
  __typename?: 'ConnectedAppsStats';
  /** Number of active (non-revoked) applications */
  active: Scalars['Int']['output'];
  /** Number of revoked applications */
  revoked: Scalars['Int']['output'];
  /** Total number of connected applications */
  total: Scalars['Int']['output'];
};

/** Input for creating a custom ingredient */
export type CreateCustomIngredientInput = {
  /** ID of the food category for this ingredient */
  categoryId: Scalars['Int']['input'];
  /** Name of the custom ingredient (1-200 characters) */
  name: Scalars['String']['input'];
};

/** Ingredient entry for creating a recipe with ingredients */
export type CreateRecipeIngredientInput = {
  /** ID of the ingredient to add */
  ingredientId: Scalars['Int']['input'];
  /** Whether this ingredient is optional (default false) */
  isOptional?: InputMaybe<Scalars['Boolean']['input']>;
  /** ID of the measurement unit */
  measurementId: Scalars['Int']['input'];
  /** Optional preparation note (max 200 characters) */
  preparationNote?: InputMaybe<Scalars['String']['input']>;
  /** Quantity of the ingredient */
  quantity: Scalars['Float']['input'];
};

export type CreateRecipeInput = {
  /** Optional ingredients to create with the recipe in a single transaction */
  ingredients?: InputMaybe<Array<CreateRecipeIngredientInput>>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** Input for creating a new terms version */
export type CreateTermsVersionInput = {
  /** Markdown content of the terms */
  content: Scalars['String']['input'];
  /** Effective date (YYYY-MM-DD) or null for unpublished */
  effectiveDate?: InputMaybe<Scalars['String']['input']>;
  /** Version identifier in YYYY-MM-DD format (must be unique) */
  version: Scalars['String']['input'];
};

/** Paginated list of food categories with pagination metadata */
export type FoodCategoryConnection = {
  __typename?: 'FoodCategoryConnection';
  /** Whether there are more items after the current page */
  hasNextPage: Scalars['Boolean']['output'];
  /** Whether there are items before the current page */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** List of food categories in the current page */
  items: Array<FoodCategoryType>;
  /** Total number of food categories matching the query */
  totalCount: Scalars['Int']['output'];
};

/** Pagination options for food categories query */
export type FoodCategoryPaginationInput = {
  /** Maximum number of categories to return (default 22, max 50) */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Number of categories to skip (default 0) */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** A category for grouping ingredients (e.g., Produce, Dairy, Meat) */
export type FoodCategoryType = {
  __typename?: 'FoodCategoryType';
  /** Unique database identifier */
  id: Scalars['Int']['output'];
  /** Get ingredients in this category */
  ingredients: Array<IngredientType>;
  /** Human-readable name (e.g., Produce, Dairy, Meat) */
  name: Scalars['String']['output'];
  /** URL-friendly identifier (e.g., produce, dairy, meat) */
  slug: Scalars['String']['output'];
  /** Display order for sorting categories in UI */
  sortOrder: Scalars['Int']['output'];
};


/** A category for grouping ingredients (e.g., Produce, Dairy, Meat) */
export type FoodCategoryTypeIngredientsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

/** Optional filters for measurements query */
export type GetMeasurementsInput = {
  /** If true, only return measurements exposed in UI dropdowns */
  exposedOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by measurement type (volume, weight, count, qualitative) */
  type?: InputMaybe<MeasurementTypeEnum>;
};

/** Search results for ingredients with matching items and total count */
export type IngredientSearchResult = {
  __typename?: 'IngredientSearchResult';
  /** List of ingredients matching the search query */
  ingredients: Array<IngredientType>;
  /** Total number of ingredients matching the search query */
  totalCount: Scalars['Int']['output'];
};

/** A cooking ingredient that can be used in recipes (system or custom) */
export type IngredientType = {
  __typename?: 'IngredientType';
  /** Food category this ingredient belongs to */
  category: FoodCategoryType;
  /** Unique database identifier */
  id: Scalars['Int']['output'];
  /** Whether this is a custom ingredient created by the current user */
  isCustom: Scalars['Boolean']['output'];
  /** Whether this is a system ingredient (tenant-level, seeded from import, read-only) */
  isSystem: Scalars['Boolean']['output'];
  /** Human-readable name (e.g., all-purpose flour, olive oil) */
  name: Scalars['String']['output'];
};

/** A meal in the meal plan - either a Recipe or an Ad Hoc Meal */
export type Meal = AdHocMealType | RecipeType;

/** A meal scheduled for a specific date and meal type (can be a recipe or ad hoc meal) */
export type MealPlanEntryType = {
  __typename?: 'MealPlanEntryType';
  /** Timestamp when entry was created */
  createdAt: Scalars['DateTime']['output'];
  /** Date of the meal plan entry (ISO 8601 format: YYYY-MM-DD) */
  date: Scalars['String']['output'];
  /** Unique identifier for the meal plan entry (prefixed: "recipe:123" or "adhoc:456") */
  id: Scalars['String']['output'];
  /** The meal data - use __typename to discriminate between RecipeType and AdHocMealType */
  meal: Meal;
  /** Type of meal (breakfast, lunch, dinner, or snacks) */
  mealType: Scalars['String']['output'];
  /** Timestamp when entry was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type MealPlanInput = {
  date: Scalars['String']['input'];
};

export type MealPlanRangeInput = {
  endDateInclusive: Scalars['String']['input'];
  startDateInclusive: Scalars['String']['input'];
};

/** Meal plan entries grouped by date */
export type MealPlanType = {
  __typename?: 'MealPlanType';
  /** Date for this meal plan (ISO 8601 format: YYYY-MM-DD) */
  date: Scalars['String']['output'];
  /** All meal plan entries for this date (may be empty if no recipes scheduled) */
  entries: Array<MealPlanEntryType>;
};

/** A unit of measurement for recipe ingredients */
export type MeasurementGraphQlType = {
  __typename?: 'MeasurementGraphQLType';
  /** Short abbreviation (e.g., cup, g, tbsp) */
  abbreviation: Scalars['String']['output'];
  /** Reference to the base unit ID for conversions (null for base units) */
  baseUnitId?: Maybe<Scalars['Int']['output']>;
  /** Conversion factor to base unit (e.g., 1 cup = 236.59 mL). Null for count/qualitative types. */
  conversionFactor?: Maybe<Scalars['Float']['output']>;
  /** Display order within the measurement type category */
  displayOrder: Scalars['Int']['output'];
  /** Unique database identifier */
  id: Scalars['Int']['output'];
  /** Whether this measurement is exposed in UI dropdowns */
  isExposed: Scalars['Boolean']['output'];
  /** Whether this is a qualitative measurement (no numeric quantity) */
  isQualitative: Scalars['Boolean']['output'];
  /** Human-readable name (e.g., Cup, Gram, Tablespoon) */
  name: Scalars['String']['output'];
  /** Whether this measurement type supports conversion (volume/weight only) */
  supportsConversion: Scalars['Boolean']['output'];
  /** Stable system identifier (e.g., CUP, GRAM, TABLESPOON) */
  systemId: Scalars['String']['output'];
  /** Category: volume, weight, count, or qualitative */
  type: MeasurementTypeEnum;
};

/** The category of measurement unit */
export type MeasurementTypeEnum =
  /** Count-based measurements (each, piece, clove, etc.) */
  | 'COUNT'
  /** Qualitative measurements without numeric quantity (pinch, dash, to taste) */
  | 'QUALITATIVE'
  /** Volume measurements (mL, tsp, cup, L, etc.) */
  | 'VOLUME'
  /** Weight measurements (g, oz, lb, kg) */
  | 'WEIGHT';

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept the current terms version. Creates an immutable acceptance record. */
  acceptTerms: TermsAcceptanceType;
  /** Add an ad hoc meal (free-text) to a specific meal slot. Multiple ad hoc meals can be added to the same slot. */
  addAdHocMeal: MealPlanEntryType;
  addRecipeIngredient: RecipeIngredientType;
  /** Add a recipe to a specific meal slot. Returns error if recipe already scheduled in that slot. */
  addRecipeToMealPlan: MealPlanEntryType;
  /** Create a new terms version. */
  adminCreateTermsVersion: AdminTermsVersion;
  /** Delete a terms version. Only allowed if version has no user acceptances. */
  adminDeleteTermsVersion: Scalars['Boolean']['output'];
  /** Update an existing terms version. Only allowed if version has no user acceptances. */
  adminUpdateTermsVersion: AdminTermsVersion;
  /** Remove all recipes from a specific meal slot. Returns count of entries removed. */
  clearMealSlot: Scalars['Int']['output'];
  /** Create a custom ingredient (user-private) */
  createCustomIngredient: IngredientType;
  createRecipe: RecipeType;
  /** Create a new terms version (admin). Version must be unique. */
  createTermsVersion: TermsVersion;
  /** Delete a custom ingredient (user-owned only) */
  deleteCustomIngredient: Scalars['Boolean']['output'];
  deleteRecipe: Scalars['Boolean']['output'];
  /** Remove an ad hoc meal from the meal plan. Returns true if removed, false if not found. */
  removeAdHocMeal: Scalars['Boolean']['output'];
  /** Remove a specific recipe from a meal slot. Returns true if removed, false if not found. */
  removeRecipeFromMealPlan: Scalars['Boolean']['output'];
  removeRecipeIngredient: Scalars['Boolean']['output'];
  reorderRecipeIngredients: Array<RecipeIngredientType>;
  /** Revoke access for a connected MCP application */
  revokeConnectedApp: RevokeConnectedAppResult;
  /** Update an ad hoc meal text. Returns the updated meal plan entry. */
  updateAdHocMeal: MealPlanEntryType;
  updateRecipe: RecipeType;
  updateRecipeIngredient: RecipeIngredientType;
  /** Update an existing terms version (admin). */
  updateTermsVersion: TermsVersion;
};


export type MutationAcceptTermsArgs = {
  version: Scalars['String']['input'];
};


export type MutationAddAdHocMealArgs = {
  input: AddAdHocMealInput;
};


export type MutationAddRecipeIngredientArgs = {
  input: AddRecipeIngredientInput;
};


export type MutationAddRecipeToMealPlanArgs = {
  input: AddRecipeToMealPlanInput;
};


export type MutationAdminCreateTermsVersionArgs = {
  input: CreateTermsVersionInput;
};


export type MutationAdminDeleteTermsVersionArgs = {
  version: Scalars['String']['input'];
};


export type MutationAdminUpdateTermsVersionArgs = {
  input: UpdateTermsVersionInput;
  version: Scalars['String']['input'];
};


export type MutationClearMealSlotArgs = {
  input: ClearMealSlotInput;
};


export type MutationCreateCustomIngredientArgs = {
  input: CreateCustomIngredientInput;
};


export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput;
};


export type MutationCreateTermsVersionArgs = {
  content: Scalars['String']['input'];
  effectiveDate: Scalars['String']['input'];
  version: Scalars['String']['input'];
};


export type MutationDeleteCustomIngredientArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRecipeArgs = {
  slug: Scalars['String']['input'];
};


export type MutationRemoveAdHocMealArgs = {
  input: RemoveAdHocMealInput;
};


export type MutationRemoveRecipeFromMealPlanArgs = {
  input: RemoveRecipeFromMealPlanInput;
};


export type MutationRemoveRecipeIngredientArgs = {
  input: RemoveRecipeIngredientInput;
};


export type MutationReorderRecipeIngredientsArgs = {
  input: ReorderRecipeIngredientsInput;
};


export type MutationRevokeConnectedAppArgs = {
  authorizationId: Scalars['Int']['input'];
};


export type MutationUpdateAdHocMealArgs = {
  input: UpdateAdHocMealInput;
};


export type MutationUpdateRecipeArgs = {
  input: UpdateRecipeInput;
  slug: Scalars['String']['input'];
};


export type MutationUpdateRecipeIngredientArgs = {
  input: UpdateRecipeIngredientInput;
};


export type MutationUpdateTermsVersionArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  effectiveDate?: InputMaybe<Scalars['String']['input']>;
  version: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Verify admin panel access. Returns true if user has admin:panel entitlement. */
  adminPanelAccess: Scalars['Boolean']['output'];
  /** Get recipe detail for admin view (read-only). Returns null if not found. */
  adminRecipeDetail?: Maybe<AdminRecipeDetail>;
  /** Search users by email (partial match) or user ID (exact match). Returns paginated results. */
  adminSearchUsers: AdminUserSearchResult;
  /** Get a specific terms version by version string. */
  adminTermsVersion?: Maybe<AdminTermsVersion>;
  /** Get all terms versions including unpublished. Returns versions ordered by effective date (unpublished first). */
  adminTermsVersions: Array<AdminTermsVersion>;
  /** Get user profile with terms acceptance history. Returns null if user not found. */
  adminUserProfile?: Maybe<AdminUserProfile>;
  /** Get all terms versions (admin). Returns all versions ordered by effective date. */
  allTermsVersions: Array<TermsVersion>;
  /** Check if the current user has access to a specific feature. Returns allowed: true/false. Throws error for unknown features. */
  checkAccess: AccessCheckResult;
  /** List all connected MCP applications for the current user */
  connectedApps: Array<ConnectedApp>;
  /** Get statistics about connected MCP applications */
  connectedAppsStats: ConnectedAppsStats;
  /** Get the current terms document. Returns null if no terms configured. */
  currentTerms?: Maybe<TermsDocument>;
  /** Get paginated list of food categories */
  foodCategories: FoodCategoryConnection;
  /** Get a single food category by slug */
  foodCategory?: Maybe<FoodCategoryType>;
  /** Get a single ingredient by ID */
  ingredient?: Maybe<IngredientType>;
  /** Get all ingredients in a specific category */
  ingredientsByCategory: Array<IngredientType>;
  me?: Maybe<UserProfile>;
  /** Get all meal plan entries for a specific date (includes both recipes and ad hoc meals) */
  mealPlan: Array<MealPlanEntryType>;
  /** Get meal plan entries for a date range (up to 60 days), grouped by date. Returns all dates in range, including empty days. Includes both recipes and ad hoc meals. */
  mealPlanRange: Array<MealPlanType>;
  /** Get a single measurement by ID */
  measurement?: Maybe<MeasurementGraphQlType>;
  /** Get a measurement by its stable system identifier (e.g., CUP, GRAM) */
  measurementBySystemId?: Maybe<MeasurementGraphQlType>;
  /** Get all measurement units, optionally filtered */
  measurements: Array<MeasurementGraphQlType>;
  /** Get the current user's terms acceptance history, most recent first. */
  myTermsAcceptance: Array<TermsAcceptanceType>;
  recipe?: Maybe<RecipeType>;
  recipeIngredients: Array<RecipeIngredientType>;
  recipes: Array<RecipeType>;
  /** Search ingredients by name with optional category filter */
  searchIngredients: IngredientSearchResult;
  /** Check if the current user needs to accept terms. Returns acceptance status. */
  termsStatus: TermsStatusType;
  user?: Maybe<UserProfile>;
};


export type QueryAdminRecipeDetailArgs = {
  recipeId: Scalars['Int']['input'];
};


export type QueryAdminSearchUsersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm: Scalars['String']['input'];
};


export type QueryAdminTermsVersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryAdminUserProfileArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryCheckAccessArgs = {
  feature: Scalars['String']['input'];
};


export type QueryConnectedAppsArgs = {
  activeOnly?: Scalars['Boolean']['input'];
};


export type QueryFoodCategoriesArgs = {
  pagination?: InputMaybe<FoodCategoryPaginationInput>;
};


export type QueryFoodCategoryArgs = {
  slug: Scalars['String']['input'];
};


export type QueryIngredientArgs = {
  id: Scalars['Int']['input'];
};


export type QueryIngredientsByCategoryArgs = {
  categoryId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMealPlanArgs = {
  input: MealPlanInput;
};


export type QueryMealPlanRangeArgs = {
  input: MealPlanRangeInput;
};


export type QueryMeasurementArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMeasurementBySystemIdArgs = {
  systemId: Scalars['String']['input'];
};


export type QueryMeasurementsArgs = {
  input?: InputMaybe<GetMeasurementsInput>;
};


export type QueryRecipeArgs = {
  slug: Scalars['String']['input'];
};


export type QueryRecipeIngredientsArgs = {
  recipeId: Scalars['Int']['input'];
};


export type QuerySearchIngredientsArgs = {
  input: SearchIngredientsInput;
};

/** An ingredient within a recipe, including quantity, measurement, and preparation details */
export type RecipeIngredientType = {
  __typename?: 'RecipeIngredientType';
  /** Formatted display text combining quantity, unit, ingredient name, and preparation note (e.g., "2 cups all-purpose flour, sifted" or "salt, to taste") */
  displayText: Scalars['String']['output'];
  /** Unique database identifier */
  id: Scalars['Int']['output'];
  ingredient: IngredientType;
  /** Whether this ingredient is optional in the recipe */
  isOptional: Scalars['Boolean']['output'];
  measurement: MeasurementGraphQlType;
  /** Preparation instructions for the ingredient (e.g., finely chopped, sifted) */
  preparationNote?: Maybe<Scalars['String']['output']>;
  /** Quantity of the ingredient (e.g., 2, 0.5) */
  quantity: Scalars['Float']['output'];
  /** Display order within the recipe ingredient list (1-based) */
  sortOrder: Scalars['Int']['output'];
};

export type RecipeType = {
  __typename?: 'RecipeType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  /** Count of ingredients in this recipe */
  ingredientCount: Scalars['Int']['output'];
  /** Ingredients for this recipe in display order */
  ingredients: Array<RecipeIngredientType>;
  instructions?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  tenantId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type RemoveAdHocMealInput = {
  /** ID of the ad hoc meal to remove */
  adHocMealId: Scalars['Int']['input'];
};

export type RemoveRecipeFromMealPlanInput = {
  date: Scalars['String']['input'];
  mealType: Scalars['String']['input'];
  recipeSlug: Scalars['String']['input'];
};

/** Input for removing an ingredient from a recipe */
export type RemoveRecipeIngredientInput = {
  /** ID of the recipe ingredient to remove */
  id: Scalars['Int']['input'];
};

/** Input for reordering ingredients within a recipe */
export type ReorderRecipeIngredientsInput = {
  /** Ordered list of recipe ingredient IDs defining the new order */
  ingredientIds: Array<Scalars['Int']['input']>;
  /** ID of the recipe containing the ingredients to reorder */
  recipeId: Scalars['Int']['input'];
};

/** Result of revoking a connected application */
export type RevokeConnectedAppResult = {
  __typename?: 'RevokeConnectedAppResult';
  /** Error message if the operation failed */
  error?: Maybe<Scalars['String']['output']>;
  /** Whether the revocation was successful (true if revoked, false if already revoked) */
  success: Scalars['Boolean']['output'];
};

/** Search parameters for finding ingredients */
export type SearchIngredientsInput = {
  /** Optional filter by food category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Maximum number of results to return (default 20, max 50) */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Search query string (minimum 2 characters) */
  query: Scalars['String']['input'];
};

/** Terms acceptance record for user profile */
export type TermsAcceptanceRecord = {
  __typename?: 'TermsAcceptanceRecord';
  /** Timestamp when the user accepted the terms */
  acceptedAt: Scalars['DateTime']['output'];
  /** Terms version that was accepted (YYYY-MM-DD format) */
  version: Scalars['String']['output'];
};

/** A record of a user's acceptance of a specific terms version */
export type TermsAcceptanceType = {
  __typename?: 'TermsAcceptanceType';
  /** When the acceptance occurred */
  acceptedAt: Scalars['DateTime']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Terms version that was accepted (YYYY-MM-DD) */
  version: Scalars['String']['output'];
};

/** The current terms document containing combined Terms of Service and Privacy Policy */
export type TermsDocument = {
  __typename?: 'TermsDocument';
  /** Markdown content of the terms */
  content: Scalars['String']['output'];
  /** Date when this version became/becomes effective */
  effectiveDate: Scalars['DateTime']['output'];
  /** Terms version in YYYY-MM-DD format */
  version: Scalars['String']['output'];
};

/** Status of the current user's terms acceptance */
export type TermsStatusType = {
  __typename?: 'TermsStatusType';
  /** Version the user has accepted (null if never accepted) */
  acceptedVersion?: Maybe<Scalars['String']['output']>;
  /** Current terms version (null if no terms configured) */
  currentVersion?: Maybe<Scalars['String']['output']>;
  /** Effective date of current terms (null if no terms configured) */
  effectiveDate?: Maybe<Scalars['DateTime']['output']>;
  /** Whether the user needs to accept terms to proceed */
  requiresAcceptance: Scalars['Boolean']['output'];
};

/** A terms of service version with its content and metadata */
export type TermsVersion = {
  __typename?: 'TermsVersion';
  /** Markdown content of the terms document */
  content: Scalars['String']['output'];
  /** When this version was created */
  createdAt: Scalars['DateTime']['output'];
  /** Date when this version becomes effective */
  effectiveDate: Scalars['DateTime']['output'];
  /** Unique identifier for the version */
  id: Scalars['Int']['output'];
  /** Version string in YYYY-MM-DD format */
  version: Scalars['String']['output'];
};

export type UpdateAdHocMealInput = {
  /** ID of the ad hoc meal to update */
  adHocMealId: Scalars['Int']['input'];
  /** New free-text description of the meal (1-200 characters) */
  text: Scalars['String']['input'];
};

/** Input for updating a recipe ingredient */
export type UpdateRecipeIngredientInput = {
  /** ID of the recipe ingredient to update */
  id: Scalars['Int']['input'];
  /** Whether this ingredient is optional */
  isOptional?: InputMaybe<Scalars['Boolean']['input']>;
  /** New measurement unit ID (optional, omit to keep current) */
  measurementId?: InputMaybe<Scalars['Int']['input']>;
  /** Optional preparation note (max 200 characters, null to clear) */
  preparationNote?: InputMaybe<Scalars['String']['input']>;
  /** New quantity value (optional, omit to keep current) */
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateRecipeInput = {
  instructions?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Input for updating an existing terms version */
export type UpdateTermsVersionInput = {
  /** New markdown content (optional) */
  content?: InputMaybe<Scalars['String']['input']>;
  /** New effective date (YYYY-MM-DD) or null for unpublished */
  effectiveDate?: InputMaybe<Scalars['String']['input']>;
  /** Expected updatedAt timestamp for optimistic locking (required) */
  expectedUpdatedAt: Scalars['DateTime']['input'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  status: UserStatus;
  tenantId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED';

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', user?: { __typename?: 'UserProfile', id: number, firstName: string, lastName: string, email: string } | null };

export type GetMealPlanRangeQueryVariables = Exact<{
  input: MealPlanRangeInput;
}>;


export type GetMealPlanRangeQuery = { __typename?: 'Query', mealPlanRange: Array<{ __typename?: 'MealPlanType', date: string, entries: Array<{ __typename?: 'MealPlanEntryType', id: string, mealType: string, meal:
        | { __typename?: 'AdHocMealType', id: number, text: string }
        | { __typename?: 'RecipeType', id: number, name: string, slug: string }
       }> }> };

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'RecipeType', id: number, name: string, slug: string, ingredientCount: number, createdAt: string, updatedAt: string }> };


export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetMealPlanRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMealPlanRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MealPlanRangeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPlanRange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mealType"}},{"kind":"Field","name":{"kind":"Name","value":"meal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdHocMealType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMealPlanRangeQuery, GetMealPlanRangeQueryVariables>;
export const GetRecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"ingredientCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetRecipesQuery, GetRecipesQueryVariables>;