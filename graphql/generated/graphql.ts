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

export type AddFamilyAdHocMealInput = {
  /** Date of the meal (ISO 8601 format: YYYY-MM-DD) */
  date: Scalars['String']['input'];
  /** Type of meal (breakfast, lunch, dinner, or snacks) */
  mealType: Scalars['String']['input'];
  /** Free-text description of the meal (1-200 characters) */
  text: Scalars['String']['input'];
};

export type AddFamilyShoppingListItemInput = {
  familyShoppingListId: Scalars['Int']['input'];
  ingredientId?: InputMaybe<Scalars['Int']['input']>;
  measurementId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Float']['input']>;
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

export type AddRecipeToFamilyMealPlanInput = {
  /** Date of the meal (ISO 8601 format: YYYY-MM-DD) */
  date: Scalars['String']['input'];
  /** Type of meal (breakfast, lunch, dinner, or snacks) */
  mealType: Scalars['String']['input'];
  /** ID of the recipe to add */
  recipeId: Scalars['Int']['input'];
};

export type AddRecipeToMealPlanInput = {
  date: Scalars['String']['input'];
  mealType: Scalars['String']['input'];
  recipeSlug: Scalars['String']['input'];
};

export type AddShoppingListItemInput = {
  ingredientId?: InputMaybe<Scalars['Int']['input']>;
  measurementId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Float']['input']>;
  shoppingListId: Scalars['Int']['input'];
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

/** Shopping list items grouped by aisle, sorted by aisle sort order */
export type AisleGroupType = {
  __typename?: 'AisleGroupType';
  /** The aisle for this group */
  aisle: AisleType;
  /** Whether all items in this group are checked off */
  allChecked: Scalars['Boolean']['output'];
  /** Items in this aisle group */
  items: Array<ShoppingListItemType>;
};

/** A physical grocery store aisle/section */
export type AisleType = {
  __typename?: 'AisleType';
  /** Unique identifier */
  id: Scalars['Int']['output'];
  /** Display name (e.g., "Produce", "Dairy & Eggs") */
  name: Scalars['String']['output'];
  /** URL-safe identifier */
  slug: Scalars['String']['output'];
  /** Display order in shopping list */
  sortOrder: Scalars['Int']['output'];
};

export type ClearFamilyMealSlotInput = {
  /** Date of the meal slot (ISO 8601 format: YYYY-MM-DD) */
  date: Scalars['String']['input'];
  /** Type of meal (breakfast, lunch, dinner, or snacks) */
  mealType: Scalars['String']['input'];
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

export type CreateFamilyGroupInput = {
  name: Scalars['String']['input'];
};

export type CreateFamilyRecipeInput = {
  instructions?: InputMaybe<Scalars['String']['input']>;
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

/** Family shopping list items grouped by aisle, sorted by aisle sort order */
export type FamilyAisleGroupType = {
  __typename?: 'FamilyAisleGroupType';
  /** The aisle for this group */
  aisle: AisleType;
  /** Whether all items in this group are checked off */
  allChecked: Scalars['Boolean']['output'];
  /** Items in this aisle group */
  items: Array<FamilyShoppingListItemType>;
};

export type FamilyGroupType = {
  __typename?: 'FamilyGroupType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  memberCount: Scalars['Int']['output'];
  members: Array<FamilyMemberType>;
  name: Scalars['String']['output'];
  owner: FamilyMemberType;
  slug: Scalars['String']['output'];
};

export type FamilyInvitationType = {
  __typename?: 'FamilyInvitationType';
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  invitedEmail: Scalars['String']['output'];
  status: InvitationStatus;
};

/** A meal scheduled on the family meal plan for a specific date and meal type (can be a recipe or ad hoc meal) */
export type FamilyMealPlanEntryType = {
  __typename?: 'FamilyMealPlanEntryType';
  /** Name of the family member who added this entry (e.g. "Jane Smith") */
  addedBy: Scalars['String']['output'];
  /** Timestamp when entry was created */
  createdAt: Scalars['DateTime']['output'];
  /** Date of the family meal plan entry (ISO 8601 format: YYYY-MM-DD) */
  date: Scalars['String']['output'];
  /** Unique identifier for the family meal plan entry (prefixed: "recipe:123" or "adhoc:456") */
  id: Scalars['String']['output'];
  /** The meal data - use __typename to discriminate between RecipeType and AdHocMealType */
  meal: Meal;
  /** Type of meal (breakfast, lunch, dinner, or snacks) */
  mealType: Scalars['String']['output'];
  /** Timestamp when entry was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type FamilyMealPlanInput = {
  /** Date to query (ISO 8601 format: YYYY-MM-DD) */
  date: Scalars['String']['input'];
};

export type FamilyMealPlanRangeInput = {
  /** End date (inclusive, ISO 8601 format: YYYY-MM-DD) */
  endDateInclusive: Scalars['String']['input'];
  /** Start date (inclusive, ISO 8601 format: YYYY-MM-DD) */
  startDateInclusive: Scalars['String']['input'];
};

/** Family meal plan entries grouped by date */
export type FamilyMealPlanType = {
  __typename?: 'FamilyMealPlanType';
  /** Date for this family meal plan (ISO 8601 format: YYYY-MM-DD) */
  date: Scalars['String']['output'];
  /** All family meal plan entries for this date (may be empty if no meals scheduled) */
  entries: Array<FamilyMealPlanEntryType>;
};

export type FamilyMemberType = {
  __typename?: 'FamilyMemberType';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  role: FamilyRole;
};

export type FamilyRecipeType = {
  __typename?: 'FamilyRecipeType';
  contributedByUserId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  lastModifiedByUserId?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  sourceUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

/** Role of a user within a family group */
export type FamilyRole =
  | 'MEMBER'
  | 'OWNER';

/** Source of a family shopping list item */
export type FamilyShoppingListItemSource =
  | 'GENERATED'
  | 'WRITE_IN';

/** An individual item on a family shopping list */
export type FamilyShoppingListItemType = {
  __typename?: 'FamilyShoppingListItemType';
  aisle?: Maybe<AisleType>;
  /** When the item was checked off (null = unchecked) */
  checkedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier */
  id: Scalars['Int']['output'];
  ingredient?: Maybe<IngredientType>;
  /** Whether the item is currently checked off */
  isChecked: Scalars['Boolean']['output'];
  measurement?: Maybe<MeasurementGraphQlType>;
  /** Display name of the item */
  name: Scalars['String']['output'];
  /** Quantity needed */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** Sort order within aisle group */
  sortOrder: Scalars['Int']['output'];
  /** Whether this item was auto-generated or written in */
  source: FamilyShoppingListItemSource;
};

/** A grocery shopping list for a family group date range */
export type FamilyShoppingListType = {
  __typename?: 'FamilyShoppingListType';
  /** Items grouped by grocery store aisle */
  aisleGroups: Array<FamilyAisleGroupType>;
  /** When the list was created */
  createdAt: Scalars['DateTime']['output'];
  /** End date of the meal plan range (YYYY-MM-DD) */
  endDate: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['Int']['output'];
  /** All items on this shopping list */
  items: Array<FamilyShoppingListItemType>;
  /** Start date of the meal plan range (YYYY-MM-DD) */
  startDate: Scalars['String']['output'];
  /** When the list was last updated */
  updatedAt: Scalars['DateTime']['output'];
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

export type GenerateFamilyShoppingListInput = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export type GenerateShoppingListInput = {
  endDate: Scalars['String']['input'];
  /** Source meal plan for ingredient aggregation. Defaults to PERSONAL. */
  source?: InputMaybe<ShoppingListSource>;
  startDate: Scalars['String']['input'];
};

export type GetFamilyShoppingListInput = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

/** Optional filters for measurements query */
export type GetMeasurementsInput = {
  /** If true, only return measurements exposed in UI dropdowns */
  exposedOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by measurement type (volume, weight, count, qualitative) */
  type?: InputMaybe<MeasurementTypeEnum>;
};

export type GetShoppingListInput = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export type ImportRecipeUrlInput = {
  /** The URL to fetch and extract a recipe from. Must be a valid http/https URL. */
  url: Scalars['String']['input'];
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

/** Status of a family group invitation */
export type InvitationStatus =
  | 'ACCEPTED'
  | 'CANCELLED'
  | 'DECLINED'
  | 'EXPIRED'
  | 'PENDING';

export type InviteFamilyMemberInput = {
  email: Scalars['String']['input'];
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
  acceptFamilyInvitation: FamilyGroupType;
  /** Accept the current terms version. Creates an immutable acceptance record. */
  acceptTerms: TermsAcceptanceType;
  /** Add an ad hoc meal (free-text) to a specific meal slot. Multiple ad hoc meals can be added to the same slot. */
  addAdHocMeal: MealPlanEntryType;
  /** Add an ad hoc meal (free-text) to a specific family meal slot. Multiple ad hoc meals can be added to the same slot. */
  addFamilyAdHocMeal: FamilyMealPlanEntryType;
  /** Add a write-in item to a family shopping list. */
  addFamilyShoppingListItem: FamilyShoppingListItemType;
  addRecipeIngredient: RecipeIngredientType;
  /** Add a recipe to a specific family meal slot. Returns error if recipe already scheduled in that slot. */
  addRecipeToFamilyMealPlan: FamilyMealPlanEntryType;
  /** Add a recipe to a specific meal slot. Returns error if recipe already scheduled in that slot. */
  addRecipeToMealPlan: MealPlanEntryType;
  /** Add a write-in item to a shopping list. */
  addShoppingListItem: ShoppingListItemType;
  /** Create a new terms version. */
  adminCreateTermsVersion: AdminTermsVersion;
  /** Delete a terms version. Only allowed if version has no user acceptances. */
  adminDeleteTermsVersion: Scalars['Boolean']['output'];
  /** Update an existing terms version. Only allowed if version has no user acceptances. */
  adminUpdateTermsVersion: AdminTermsVersion;
  cancelFamilyInvitation: Scalars['Boolean']['output'];
  /** Remove all entries (recipes and ad hoc meals) from a specific family meal slot. Returns count of entries removed. */
  clearFamilyMealSlot: Scalars['Int']['output'];
  /** Remove all recipes from a specific meal slot. Returns count of entries removed. */
  clearMealSlot: Scalars['Int']['output'];
  /** Create a custom ingredient (user-private) */
  createCustomIngredient: IngredientType;
  createFamilyGroup: FamilyGroupType;
  createFamilyRecipe: FamilyRecipeType;
  createRecipe: RecipeType;
  /** Create a new terms version (admin). Version must be unique. */
  createTermsVersion: TermsVersion;
  declineFamilyInvitation: Scalars['Boolean']['output'];
  /** Delete a custom ingredient (user-owned only) */
  deleteCustomIngredient: Scalars['Boolean']['output'];
  deleteFamilyGroup: Scalars['Boolean']['output'];
  deleteFamilyRecipe: Scalars['Boolean']['output'];
  deleteRecipe: Scalars['Boolean']['output'];
  /** Generate a family shopping list from family meal plan entries within a date range. */
  generateFamilyShoppingList: FamilyShoppingListType;
  /** Generate a shopping list from meal plan entries within a date range. */
  generateShoppingList: ShoppingListType;
  importRecipeFromUrl: RecipeType;
  inviteFamilyMember: FamilyInvitationType;
  leaveFamilyGroup: Scalars['Boolean']['output'];
  /** Regenerate a family shopping list, replacing generated items with current meal plan data. */
  regenerateFamilyShoppingList: FamilyShoppingListType;
  /** Regenerate an existing shopping list, resetting all items. */
  regenerateShoppingList: ShoppingListType;
  /** Remove an ad hoc meal from the meal plan. Returns true if removed, false if not found. */
  removeAdHocMeal: Scalars['Boolean']['output'];
  /** Remove a family ad hoc meal from the meal plan. Returns true if removed, false if not found. */
  removeFamilyAdHocMeal: Scalars['Boolean']['output'];
  removeFamilyMember: Scalars['Boolean']['output'];
  /** Remove an item from the family shopping list. */
  removeFamilyShoppingListItem: Scalars['Boolean']['output'];
  /** Remove a specific recipe from a family meal slot. Returns true if removed, false if not found. */
  removeRecipeFromFamilyMealPlan: Scalars['Boolean']['output'];
  /** Remove a specific recipe from a meal slot. Returns true if removed, false if not found. */
  removeRecipeFromMealPlan: Scalars['Boolean']['output'];
  removeRecipeIngredient: Scalars['Boolean']['output'];
  /** Remove an item from the shopping list. */
  removeShoppingListItem: Scalars['Boolean']['output'];
  reorderRecipeIngredients: Array<RecipeIngredientType>;
  /** Revoke access for a connected MCP application */
  revokeConnectedApp: RevokeConnectedAppResult;
  shareRecipeToFamily: FamilyRecipeType;
  /** Toggle check state on a family shopping list item. */
  toggleFamilyShoppingListItem: FamilyShoppingListItemType;
  toggleRecipeFamilyStatus: RecipeType;
  /** Toggle check state on a shopping list item. */
  toggleShoppingListItem: ShoppingListItemType;
  /** Update an ad hoc meal text. Returns the updated meal plan entry. */
  updateAdHocMeal: MealPlanEntryType;
  /** Update a family ad hoc meal text. Returns the updated family meal plan entry. */
  updateFamilyAdHocMeal: FamilyMealPlanEntryType;
  updateFamilyRecipe: FamilyRecipeType;
  updateRecipe: RecipeType;
  updateRecipeIngredient: RecipeIngredientType;
  /** Update an existing terms version (admin). */
  updateTermsVersion: TermsVersion;
};


export type MutationAcceptFamilyInvitationArgs = {
  invitationId: Scalars['Int']['input'];
};


export type MutationAcceptTermsArgs = {
  version: Scalars['String']['input'];
};


export type MutationAddAdHocMealArgs = {
  input: AddAdHocMealInput;
};


export type MutationAddFamilyAdHocMealArgs = {
  input: AddFamilyAdHocMealInput;
};


export type MutationAddFamilyShoppingListItemArgs = {
  input: AddFamilyShoppingListItemInput;
};


export type MutationAddRecipeIngredientArgs = {
  input: AddRecipeIngredientInput;
};


export type MutationAddRecipeToFamilyMealPlanArgs = {
  input: AddRecipeToFamilyMealPlanInput;
};


export type MutationAddRecipeToMealPlanArgs = {
  input: AddRecipeToMealPlanInput;
};


export type MutationAddShoppingListItemArgs = {
  input: AddShoppingListItemInput;
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


export type MutationCancelFamilyInvitationArgs = {
  invitationId: Scalars['Int']['input'];
};


export type MutationClearFamilyMealSlotArgs = {
  input: ClearFamilyMealSlotInput;
};


export type MutationClearMealSlotArgs = {
  input: ClearMealSlotInput;
};


export type MutationCreateCustomIngredientArgs = {
  input: CreateCustomIngredientInput;
};


export type MutationCreateFamilyGroupArgs = {
  input: CreateFamilyGroupInput;
};


export type MutationCreateFamilyRecipeArgs = {
  input: CreateFamilyRecipeInput;
};


export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput;
};


export type MutationCreateTermsVersionArgs = {
  content: Scalars['String']['input'];
  effectiveDate: Scalars['String']['input'];
  version: Scalars['String']['input'];
};


export type MutationDeclineFamilyInvitationArgs = {
  invitationId: Scalars['Int']['input'];
};


export type MutationDeleteCustomIngredientArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteFamilyRecipeArgs = {
  slug: Scalars['String']['input'];
};


export type MutationDeleteRecipeArgs = {
  slug: Scalars['String']['input'];
};


export type MutationGenerateFamilyShoppingListArgs = {
  input: GenerateFamilyShoppingListInput;
};


export type MutationGenerateShoppingListArgs = {
  input: GenerateShoppingListInput;
};


export type MutationImportRecipeFromUrlArgs = {
  input: ImportRecipeUrlInput;
};


export type MutationInviteFamilyMemberArgs = {
  input: InviteFamilyMemberInput;
};


export type MutationRegenerateFamilyShoppingListArgs = {
  input: RegenerateFamilyShoppingListInput;
};


export type MutationRegenerateShoppingListArgs = {
  input: RegenerateShoppingListInput;
};


export type MutationRemoveAdHocMealArgs = {
  input: RemoveAdHocMealInput;
};


export type MutationRemoveFamilyAdHocMealArgs = {
  input: RemoveFamilyAdHocMealInput;
};


export type MutationRemoveFamilyMemberArgs = {
  memberId: Scalars['Int']['input'];
};


export type MutationRemoveFamilyShoppingListItemArgs = {
  input: RemoveFamilyShoppingListItemInput;
};


export type MutationRemoveRecipeFromFamilyMealPlanArgs = {
  input: RemoveRecipeFromFamilyMealPlanInput;
};


export type MutationRemoveRecipeFromMealPlanArgs = {
  input: RemoveRecipeFromMealPlanInput;
};


export type MutationRemoveRecipeIngredientArgs = {
  input: RemoveRecipeIngredientInput;
};


export type MutationRemoveShoppingListItemArgs = {
  input: RemoveShoppingListItemInput;
};


export type MutationReorderRecipeIngredientsArgs = {
  input: ReorderRecipeIngredientsInput;
};


export type MutationRevokeConnectedAppArgs = {
  authorizationId: Scalars['Int']['input'];
};


export type MutationShareRecipeToFamilyArgs = {
  input: ShareRecipeToFamilyInput;
};


export type MutationToggleFamilyShoppingListItemArgs = {
  input: ToggleFamilyShoppingListItemInput;
};


export type MutationToggleRecipeFamilyStatusArgs = {
  input: ToggleFamilyStatusInput;
};


export type MutationToggleShoppingListItemArgs = {
  input: ToggleShoppingListItemInput;
};


export type MutationUpdateAdHocMealArgs = {
  input: UpdateAdHocMealInput;
};


export type MutationUpdateFamilyAdHocMealArgs = {
  input: UpdateFamilyAdHocMealInput;
};


export type MutationUpdateFamilyRecipeArgs = {
  input: UpdateFamilyRecipeInput;
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
  /** Get all aisles for the current tenant, ordered by sort order. */
  aisles: Array<AisleType>;
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
  familyGroupInvitations: Array<FamilyInvitationType>;
  /** Get all family meal plan entries for a specific date (includes both recipes and ad hoc meals with addedBy attribution) */
  familyMealPlan: Array<FamilyMealPlanEntryType>;
  /** Get family meal plan entries for a date range (up to 60 days), grouped by date. Returns all dates in range, including empty days. Includes both recipes and ad hoc meals with addedBy attribution. */
  familyMealPlanRange: Array<FamilyMealPlanType>;
  familyRecipe?: Maybe<FamilyRecipeType>;
  familyRecipes: Array<FamilyRecipeType>;
  /** Get family shopping list for a date range. Returns null if none exists. */
  familyShoppingList?: Maybe<FamilyShoppingListType>;
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
  myFamilyGroup?: Maybe<FamilyGroupType>;
  myFamilyInvitations: Array<FamilyInvitationType>;
  /** Get the current user's terms acceptance history, most recent first. */
  myTermsAcceptance: Array<TermsAcceptanceType>;
  recipe?: Maybe<RecipeType>;
  recipeIngredients: Array<RecipeIngredientType>;
  recipes: Array<RecipeType>;
  /** Search ingredients by name with optional category filter */
  searchIngredients: IngredientSearchResult;
  /** Get shopping list for a date range. Returns null if none exists. */
  shoppingList?: Maybe<ShoppingListType>;
  /** Check if the current user needs to accept terms. Returns acceptance status. */
  termsStatus: TermsStatusType;
  unifiedRecipes: Array<RecipeType>;
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


export type QueryFamilyMealPlanArgs = {
  input: FamilyMealPlanInput;
};


export type QueryFamilyMealPlanRangeArgs = {
  input: FamilyMealPlanRangeInput;
};


export type QueryFamilyRecipeArgs = {
  slug: Scalars['String']['input'];
};


export type QueryFamilyShoppingListArgs = {
  input: GetFamilyShoppingListInput;
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


export type QueryShoppingListArgs = {
  input: GetShoppingListInput;
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
  contributedByUserId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  /** Count of ingredients in this recipe */
  ingredientCount: Scalars['Int']['output'];
  /** Ingredients for this recipe in display order */
  ingredients: Array<RecipeIngredientType>;
  instructions?: Maybe<Scalars['String']['output']>;
  isFamilyRecipe: Scalars['Boolean']['output'];
  isOwnedByCurrentUser: Scalars['Boolean']['output'];
  lastModifiedByUserId?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  sourceUrl?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type RegenerateFamilyShoppingListInput = {
  familyShoppingListId: Scalars['Int']['input'];
};

export type RegenerateShoppingListInput = {
  shoppingListId: Scalars['Int']['input'];
};

export type RemoveAdHocMealInput = {
  /** ID of the ad hoc meal to remove */
  adHocMealId: Scalars['Int']['input'];
};

export type RemoveFamilyAdHocMealInput = {
  /** ID of the family ad hoc meal to remove */
  adHocMealId: Scalars['Int']['input'];
};

export type RemoveFamilyShoppingListItemInput = {
  itemId: Scalars['Int']['input'];
};

export type RemoveRecipeFromFamilyMealPlanInput = {
  /** Date of the meal (ISO 8601 format: YYYY-MM-DD) */
  date: Scalars['String']['input'];
  /** Type of meal (breakfast, lunch, dinner, or snacks) */
  mealType: Scalars['String']['input'];
  /** ID of the recipe to remove */
  recipeId: Scalars['Int']['input'];
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

export type RemoveShoppingListItemInput = {
  itemId: Scalars['Int']['input'];
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

export type ShareRecipeToFamilyInput = {
  recipeSlug: Scalars['String']['input'];
};

/** Source of a shopping list item */
export type ShoppingListItemSource =
  | 'GENERATED'
  | 'WRITE_IN';

/** An individual item on a shopping list */
export type ShoppingListItemType = {
  __typename?: 'ShoppingListItemType';
  aisle?: Maybe<AisleType>;
  /** When the item was checked off (null = unchecked) */
  checkedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier */
  id: Scalars['Int']['output'];
  ingredient?: Maybe<IngredientType>;
  /** Whether the item is currently checked off */
  isChecked: Scalars['Boolean']['output'];
  measurement?: Maybe<MeasurementGraphQlType>;
  /** Display name of the item */
  name: Scalars['String']['output'];
  /** Quantity needed */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** Sort order within aisle group */
  sortOrder: Scalars['Int']['output'];
  /** Whether this item was auto-generated or written in */
  source: ShoppingListItemSource;
};

/** Source meal plan for shopping list generation */
export type ShoppingListSource =
  | 'FAMILY'
  | 'PERSONAL';

/** A grocery shopping list for a date range */
export type ShoppingListType = {
  __typename?: 'ShoppingListType';
  /** Items grouped by grocery store aisle */
  aisleGroups: Array<AisleGroupType>;
  /** When the list was created */
  createdAt: Scalars['DateTime']['output'];
  /** End date of the meal plan range (YYYY-MM-DD) */
  endDate: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['Int']['output'];
  /** All items on this shopping list */
  items: Array<ShoppingListItemType>;
  /** Start date of the meal plan range (YYYY-MM-DD) */
  startDate: Scalars['String']['output'];
  /** When the list was last updated */
  updatedAt: Scalars['DateTime']['output'];
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

export type ToggleFamilyShoppingListItemInput = {
  itemId: Scalars['Int']['input'];
};

export type ToggleFamilyStatusInput = {
  slug: Scalars['String']['input'];
};

export type ToggleShoppingListItemInput = {
  itemId: Scalars['Int']['input'];
};

export type UpdateAdHocMealInput = {
  /** ID of the ad hoc meal to update */
  adHocMealId: Scalars['Int']['input'];
  /** New free-text description of the meal (1-200 characters) */
  text: Scalars['String']['input'];
};

export type UpdateFamilyAdHocMealInput = {
  /** ID of the family ad hoc meal to update */
  adHocMealId: Scalars['Int']['input'];
  /** New free-text description of the meal (1-200 characters) */
  text: Scalars['String']['input'];
};

export type UpdateFamilyRecipeInput = {
  instructions?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
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
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
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

export type GetFamilyGroupInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFamilyGroupInvitationsQuery = { __typename?: 'Query', familyGroupInvitations: Array<{ __typename?: 'FamilyInvitationType', id: number, invitedEmail: string, status: InvitationStatus, expiresAt: string, createdAt: string }> };

export type GetFamilyRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFamilyRecipesQuery = { __typename?: 'Query', familyRecipes: Array<{ __typename?: 'FamilyRecipeType', id: number, name: string, slug: string, instructions?: string | null, sourceUrl?: string | null, contributedByUserId?: number | null, lastModifiedByUserId?: number | null, createdAt: string, updatedAt: string }> };

export type GetFamilyRecipeQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetFamilyRecipeQuery = { __typename?: 'Query', familyRecipe?: { __typename?: 'FamilyRecipeType', id: number, name: string, slug: string, instructions?: string | null, sourceUrl?: string | null, contributedByUserId?: number | null, lastModifiedByUserId?: number | null, createdAt: string, updatedAt: string } | null };

export type CreateFamilyGroupMutationVariables = Exact<{
  input: CreateFamilyGroupInput;
}>;


export type CreateFamilyGroupMutation = { __typename?: 'Mutation', createFamilyGroup: { __typename?: 'FamilyGroupType', id: number, name: string, slug: string, memberCount: number, createdAt: string } };

export type DeleteFamilyGroupMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteFamilyGroupMutation = { __typename?: 'Mutation', deleteFamilyGroup: boolean };

export type InviteFamilyMemberMutationVariables = Exact<{
  input: InviteFamilyMemberInput;
}>;


export type InviteFamilyMemberMutation = { __typename?: 'Mutation', inviteFamilyMember: { __typename?: 'FamilyInvitationType', id: number, invitedEmail: string, status: InvitationStatus, expiresAt: string, createdAt: string } };

export type CancelFamilyInvitationMutationVariables = Exact<{
  invitationId: Scalars['Int']['input'];
}>;


export type CancelFamilyInvitationMutation = { __typename?: 'Mutation', cancelFamilyInvitation: boolean };

export type RemoveFamilyMemberMutationVariables = Exact<{
  memberId: Scalars['Int']['input'];
}>;


export type RemoveFamilyMemberMutation = { __typename?: 'Mutation', removeFamilyMember: boolean };

export type LeaveFamilyGroupMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveFamilyGroupMutation = { __typename?: 'Mutation', leaveFamilyGroup: boolean };

export type ShareRecipeToFamilyMutationVariables = Exact<{
  input: ShareRecipeToFamilyInput;
}>;


export type ShareRecipeToFamilyMutation = { __typename?: 'Mutation', shareRecipeToFamily: { __typename?: 'FamilyRecipeType', id: number, name: string, slug: string, contributedByUserId?: number | null, createdAt: string } };

export type CreateFamilyRecipeMutationVariables = Exact<{
  input: CreateFamilyRecipeInput;
}>;


export type CreateFamilyRecipeMutation = { __typename?: 'Mutation', createFamilyRecipe: { __typename?: 'FamilyRecipeType', id: number, name: string, slug: string, contributedByUserId?: number | null, createdAt: string } };

export type UpdateFamilyRecipeMutationVariables = Exact<{
  input: UpdateFamilyRecipeInput;
}>;


export type UpdateFamilyRecipeMutation = { __typename?: 'Mutation', updateFamilyRecipe: { __typename?: 'FamilyRecipeType', id: number, name: string, slug: string, instructions?: string | null, lastModifiedByUserId?: number | null, updatedAt: string } };

export type DeleteFamilyRecipeMutationVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type DeleteFamilyRecipeMutation = { __typename?: 'Mutation', deleteFamilyRecipe: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', user?: { __typename?: 'UserProfile', id: number, firstName: string, lastName: string, email: string } | null };

export type GetMealPlanRangeQueryVariables = Exact<{
  input: MealPlanRangeInput;
}>;


export type GetMealPlanRangeQuery = { __typename?: 'Query', mealPlanRange: Array<{ __typename?: 'MealPlanType', date: string, entries: Array<{ __typename?: 'MealPlanEntryType', id: string, mealType: string, meal:
        | { __typename?: 'AdHocMealType', id: number, text: string }
        | { __typename?: 'RecipeType', id: number, name: string, slug: string }
       }> }> };

export type GetRecipeDetailQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetRecipeDetailQuery = { __typename?: 'Query', recipe?: { __typename?: 'RecipeType', id: number, name: string, slug: string, instructions?: string | null, sourceUrl?: string | null, isFamilyRecipe: boolean, isOwnedByCurrentUser: boolean, ingredientCount: number, createdAt: string, updatedAt: string, ingredients: Array<{ __typename?: 'RecipeIngredientType', id: number, quantity: number, displayText: string, sortOrder: number, isOptional: boolean, preparationNote?: string | null, ingredient: { __typename?: 'IngredientType', id: number, name: string }, measurement: { __typename?: 'MeasurementGraphQLType', id: number, abbreviation: string, type: MeasurementTypeEnum } }> } | null };

export type AddRecipeIngredientMutationVariables = Exact<{
  input: AddRecipeIngredientInput;
}>;


export type AddRecipeIngredientMutation = { __typename?: 'Mutation', addRecipeIngredient: { __typename?: 'RecipeIngredientType', id: number, quantity: number, displayText: string, sortOrder: number, isOptional: boolean, preparationNote?: string | null, ingredient: { __typename?: 'IngredientType', id: number, name: string }, measurement: { __typename?: 'MeasurementGraphQLType', id: number, abbreviation: string, type: MeasurementTypeEnum } } };

export type UpdateRecipeIngredientMutationVariables = Exact<{
  input: UpdateRecipeIngredientInput;
}>;


export type UpdateRecipeIngredientMutation = { __typename?: 'Mutation', updateRecipeIngredient: { __typename?: 'RecipeIngredientType', id: number, quantity: number, displayText: string, sortOrder: number, isOptional: boolean, preparationNote?: string | null, ingredient: { __typename?: 'IngredientType', id: number, name: string }, measurement: { __typename?: 'MeasurementGraphQLType', id: number, abbreviation: string, type: MeasurementTypeEnum } } };

export type RemoveRecipeIngredientMutationVariables = Exact<{
  input: RemoveRecipeIngredientInput;
}>;


export type RemoveRecipeIngredientMutation = { __typename?: 'Mutation', removeRecipeIngredient: boolean };

export type UpdateRecipeMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  input: UpdateRecipeInput;
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updateRecipe: { __typename?: 'RecipeType', id: number, name: string, slug: string, instructions?: string | null, sourceUrl?: string | null, ingredientCount: number, createdAt: string, updatedAt: string } };

export type GetUnifiedRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnifiedRecipesQuery = { __typename?: 'Query', unifiedRecipes: Array<{ __typename?: 'RecipeType', id: number, name: string, slug: string, isFamilyRecipe: boolean, isOwnedByCurrentUser: boolean, ingredientCount: number, createdAt: string, updatedAt: string }> };

export type CreateRecipeMutationVariables = Exact<{
  input: CreateRecipeInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'RecipeType', id: number, name: string, slug: string, instructions?: string | null, ingredientCount: number, createdAt: string, updatedAt: string } };

export type SearchIngredientsQueryVariables = Exact<{
  input: SearchIngredientsInput;
}>;


export type SearchIngredientsQuery = { __typename?: 'Query', searchIngredients: { __typename?: 'IngredientSearchResult', totalCount: number, ingredients: Array<{ __typename?: 'IngredientType', id: number, name: string, isSystem: boolean, isCustom: boolean, category: { __typename?: 'FoodCategoryType', id: number, name: string, slug: string } }> } };

export type GetMeasurementsQueryVariables = Exact<{
  input?: InputMaybe<GetMeasurementsInput>;
}>;


export type GetMeasurementsQuery = { __typename?: 'Query', measurements: Array<{ __typename?: 'MeasurementGraphQLType', id: number, name: string, abbreviation: string, type: MeasurementTypeEnum, displayOrder: number, isExposed: boolean, isQualitative: boolean }> };

export type GetCurrentUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserProfileQuery = { __typename?: 'Query', me?: { __typename?: 'UserProfile', id: number, email: string, firstName: string, lastName: string, status: UserStatus } | null };

export type GetMyFamilyGroupQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFamilyGroupQuery = { __typename?: 'Query', myFamilyGroup?: { __typename?: 'FamilyGroupType', id: number, name: string, slug: string, memberCount: number, createdAt: string, members: Array<{ __typename?: 'FamilyMemberType', id: number, firstName: string, lastName: string, email: string, role: FamilyRole, createdAt: string }>, owner: { __typename?: 'FamilyMemberType', id: number, firstName: string, lastName: string, email: string, role: FamilyRole, createdAt: string } } | null };


export const GetFamilyGroupInvitationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFamilyGroupInvitations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"familyGroupInvitations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitedEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetFamilyGroupInvitationsQuery, GetFamilyGroupInvitationsQueryVariables>;
export const GetFamilyRecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFamilyRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"familyRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"contributedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetFamilyRecipesQuery, GetFamilyRecipesQueryVariables>;
export const GetFamilyRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFamilyRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"familyRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"contributedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetFamilyRecipeQuery, GetFamilyRecipeQueryVariables>;
export const CreateFamilyGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFamilyGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFamilyGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFamilyGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"memberCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateFamilyGroupMutation, CreateFamilyGroupMutationVariables>;
export const DeleteFamilyGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFamilyGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFamilyGroup"}}]}}]} as unknown as DocumentNode<DeleteFamilyGroupMutation, DeleteFamilyGroupMutationVariables>;
export const InviteFamilyMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteFamilyMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InviteFamilyMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteFamilyMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitedEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<InviteFamilyMemberMutation, InviteFamilyMemberMutationVariables>;
export const CancelFamilyInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelFamilyInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelFamilyInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invitationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitationId"}}}]}]}}]} as unknown as DocumentNode<CancelFamilyInvitationMutation, CancelFamilyInvitationMutationVariables>;
export const RemoveFamilyMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFamilyMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFamilyMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"memberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberId"}}}]}]}}]} as unknown as DocumentNode<RemoveFamilyMemberMutation, RemoveFamilyMemberMutationVariables>;
export const LeaveFamilyGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveFamilyGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveFamilyGroup"}}]}}]} as unknown as DocumentNode<LeaveFamilyGroupMutation, LeaveFamilyGroupMutationVariables>;
export const ShareRecipeToFamilyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ShareRecipeToFamily"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ShareRecipeToFamilyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shareRecipeToFamily"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"contributedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ShareRecipeToFamilyMutation, ShareRecipeToFamilyMutationVariables>;
export const CreateFamilyRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFamilyRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFamilyRecipeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFamilyRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"contributedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateFamilyRecipeMutation, CreateFamilyRecipeMutationVariables>;
export const UpdateFamilyRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFamilyRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFamilyRecipeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFamilyRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateFamilyRecipeMutation, UpdateFamilyRecipeMutationVariables>;
export const DeleteFamilyRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFamilyRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFamilyRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}]}}]} as unknown as DocumentNode<DeleteFamilyRecipeMutation, DeleteFamilyRecipeMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetMealPlanRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMealPlanRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MealPlanRangeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPlanRange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mealType"}},{"kind":"Field","name":{"kind":"Name","value":"meal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdHocMealType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMealPlanRangeQuery, GetMealPlanRangeQueryVariables>;
export const GetRecipeDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecipeDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isFamilyRecipe"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnedByCurrentUser"}},{"kind":"Field","name":{"kind":"Name","value":"ingredientCount"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"displayText"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isOptional"}},{"kind":"Field","name":{"kind":"Name","value":"preparationNote"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"measurement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetRecipeDetailQuery, GetRecipeDetailQueryVariables>;
export const AddRecipeIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddRecipeIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddRecipeIngredientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addRecipeIngredient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"displayText"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isOptional"}},{"kind":"Field","name":{"kind":"Name","value":"preparationNote"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"measurement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<AddRecipeIngredientMutation, AddRecipeIngredientMutationVariables>;
export const UpdateRecipeIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecipeIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRecipeIngredientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecipeIngredient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"displayText"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isOptional"}},{"kind":"Field","name":{"kind":"Name","value":"preparationNote"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"measurement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeIngredientMutation, UpdateRecipeIngredientMutationVariables>;
export const RemoveRecipeIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRecipeIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveRecipeIngredientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRecipeIngredient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RemoveRecipeIngredientMutation, RemoveRecipeIngredientMutationVariables>;
export const UpdateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRecipeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"ingredientCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const GetUnifiedRecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnifiedRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unifiedRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"isFamilyRecipe"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnedByCurrentUser"}},{"kind":"Field","name":{"kind":"Name","value":"ingredientCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUnifiedRecipesQuery, GetUnifiedRecipesQueryVariables>;
export const CreateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRecipeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"ingredientCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const SearchIngredientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchIngredients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchIngredientsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchIngredients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isSystem"}},{"kind":"Field","name":{"kind":"Name","value":"isCustom"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<SearchIngredientsQuery, SearchIngredientsQueryVariables>;
export const GetMeasurementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMeasurements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetMeasurementsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measurements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isExposed"}},{"kind":"Field","name":{"kind":"Name","value":"isQualitative"}}]}}]}}]} as unknown as DocumentNode<GetMeasurementsQuery, GetMeasurementsQueryVariables>;
export const GetCurrentUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserProfileQuery, GetCurrentUserProfileQueryVariables>;
export const GetMyFamilyGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyFamilyGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myFamilyGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"memberCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyFamilyGroupQuery, GetMyFamilyGroupQueryVariables>;