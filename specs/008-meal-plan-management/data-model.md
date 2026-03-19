# Data Model: Meal Plan Management

**Feature**: 008-meal-plan-management
**Date**: 2026-03-19

## Entities

### MealPlanType (Personal - grouped by date)

| Field | Type | Description |
|-------|------|-------------|
| date | String | ISO 8601 date (YYYY-MM-DD) |
| entries | [MealPlanEntryType] | All entries for this date |

### MealPlanEntryType (Personal)

| Field | Type | Description |
|-------|------|-------------|
| id | String | Prefixed identifier ("recipe:123" or "adhoc:456") |
| date | String | ISO 8601 date |
| mealType | String | "breakfast", "lunch", "dinner", or "snacks" |
| meal | Meal (union) | The meal content (Recipe or AdHocMeal) |
| createdAt | DateTime | When the entry was created |
| updatedAt | DateTime | When the entry was last updated |

### FamilyMealPlanType (Family - grouped by date)

| Field | Type | Description |
|-------|------|-------------|
| date | String | ISO 8601 date (YYYY-MM-DD) |
| entries | [FamilyMealPlanEntryType] | All family entries for this date |

### FamilyMealPlanEntryType

| Field | Type | Description |
|-------|------|-------------|
| id | String | Prefixed identifier |
| date | String | ISO 8601 date |
| mealType | String | "breakfast", "lunch", "dinner", or "snacks" |
| meal | Meal (union) | The meal content |
| addedBy | String | Name of family member who added this entry |
| createdAt | DateTime | When the entry was created |
| updatedAt | DateTime | When the entry was last updated |

### Meal (Union Type)

Discriminated by `__typename`:

**RecipeType**:
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Recipe ID |
| name | String | Recipe name |
| slug | String | URL-friendly identifier |

**AdHocMealType**:
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Ad-hoc meal ID |
| text | String | Free-text description (max 200 chars) |

## Relationships

```
MealPlanType (1 per date)
  └── MealPlanEntryType (many per date)
        └── Meal (union: RecipeType | AdHocMealType)

FamilyMealPlanType (1 per date per family group)
  └── FamilyMealPlanEntryType (many per date)
        └── Meal (union: RecipeType | AdHocMealType)
```

## Meal Types

| Value | Display Label |
|-------|--------------|
| breakfast | Breakfast |
| lunch | Lunch |
| dinner | Dinner |
| snacks | Snacks |

## Client-Side State

| State | Location | Description |
|-------|----------|-------------|
| weekOffset | React state (MealPlanScreen) | Current week offset (0 = this week) |
| activeDayIndex | React state (MealPlanContent) | Selected day (0-6, Mon-Sun) |
| mode | React state (MealPlanScreen) | "personal" or "family" |
| familyGroupId | Redux store (user.profile) | Determines toggle visibility |
| meal plan data | Apollo cache | Cached query results by date range |
