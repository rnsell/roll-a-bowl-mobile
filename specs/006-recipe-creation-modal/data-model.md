# Data Model: Recipe Creation Modal

This feature is frontend-only. All entities are defined by the existing backend GraphQL schema. This document maps the relevant types used by the mobile app.

## Entities (from backend schema, already generated)

### CreateRecipeInput

The mutation input for creating a recipe.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | String | Yes | Max 200 characters |
| instructions | String | No | Plain text |
| ingredients | CreateRecipeIngredientInput[] | No | Ordered list |

### CreateRecipeIngredientInput

Each ingredient entry in the recipe.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| ingredientId | Int | Yes | FK to Ingredient |
| measurementId | Int | Yes | FK to Measurement |
| quantity | Float | Yes | Decimal value |
| isOptional | Boolean | No | Defaults to false |
| preparationNote | String | No | Max 200 characters (e.g., "sifted", "chopped") |

### IngredientType (search result)

Returned by `SearchIngredients` query.

| Field | Type | Notes |
|-------|------|-------|
| id | Int | Unique identifier |
| name | String | Display name |
| isSystem | Boolean | System-provided ingredient |
| isCustom | Boolean | Tenant-created ingredient |
| category | FoodCategoryType | Category with id, name, slug |

### MeasurementGraphQlType

Returned by `GetMeasurements` query.

| Field | Type | Notes |
|-------|------|-------|
| id | Int | Unique identifier |
| name | String | Full name (e.g., "tablespoon") |
| abbreviation | String | Short form (e.g., "tbsp") |
| type | MeasurementTypeEnum | VOLUME, WEIGHT, COUNT, QUALITATIVE |
| displayOrder | Int | Sort order for UI |
| isExposed | Boolean | Whether shown to users |
| isQualitative | Boolean | e.g., "pinch", "dash" — no numeric quantity |

## Local UI State (not persisted)

### RecipeFormState

Ephemeral state managed via `useState` in the create recipe screen.

| Field | Type | Notes |
|-------|------|-------|
| name | string | Recipe name input |
| instructions | string | Instructions text input |
| ingredients | IngredientEntry[] | Ordered list of added ingredients |
| isSubmitting | boolean | Loading state during mutation |
| error | string \| null | Submission error message |

### IngredientEntry

Local representation of an ingredient added to the form.

| Field | Type | Notes |
|-------|------|-------|
| ingredientId | number | From search selection |
| ingredientName | string | For display in the list |
| measurementId | number | Selected measurement |
| measurementAbbreviation | string | For display (e.g., "cups") |
| quantity | number | User-entered amount |
| isOptional | boolean | Toggle |
| preparationNote | string | Optional freeform text |

## Relationships

```
Recipe 1──* RecipeIngredient *──1 Ingredient
                             *──1 Measurement
```

The backend manages these relationships. The mobile app sends a flat `CreateRecipeInput` with nested `CreateRecipeIngredientInput[]` and the backend creates all join records.
