# Data Model: Shopping List Management

**Feature**: 009-shopping-list
**Date**: 2026-03-19

## Entities

### ShoppingListType (Personal)

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Unique identifier |
| startDate | String | Week start date (YYYY-MM-DD) |
| endDate | String | Week end date (YYYY-MM-DD) |
| items | [ShoppingListItemType] | All items in the list |
| aisleGroups | [AisleGroupType] | Items grouped by aisle |
| createdAt | DateTime | When the list was created |
| updatedAt | DateTime | Last modification time |

### FamilyShoppingListType

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Unique identifier |
| startDate | String | Week start date |
| endDate | String | Week end date |
| items | [FamilyShoppingListItemType] | All items |
| aisleGroups | [FamilyAisleGroupType] | Items grouped by aisle |
| createdAt | DateTime | When created |
| updatedAt | DateTime | Last modified |

### ShoppingListItemType (Personal)

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Unique identifier |
| name | String | Display name (ingredient name or write-in text) |
| quantity | Float | Amount (nullable for write-ins) |
| measurement | MeasurementType | Unit of measurement (nullable) |
| aisle | AisleType | Aisle for grouping |
| source | String | "GENERATED" or "WRITE_IN" |
| isChecked | Boolean | Whether the item is checked off |
| checkedAt | DateTime | Timestamp when checked (null if unchecked) |
| sortOrder | Int | Display order within aisle |
| ingredient | IngredientType | Source ingredient (nullable for write-ins) |

### FamilyShoppingListItemType

Same fields as ShoppingListItemType.

### AisleGroupType

| Field | Type | Description |
|-------|------|-------------|
| aisle | AisleType | The aisle |
| items | [ShoppingListItemType] | Items in this aisle |
| allChecked | Boolean | True if every item in the group is checked |

### AisleType

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Unique identifier |
| name | String | Display name (e.g., "Produce", "Dairy") |
| slug | String | URL-friendly identifier |
| sortOrder | Int | Display order |

## Relationships

```
ShoppingListType (1 per user per week)
  └── AisleGroupType (1 per aisle with items)
        ├── AisleType (the aisle metadata)
        └── ShoppingListItemType (many items per aisle)

FamilyShoppingListType (1 per family group per week)
  └── FamilyAisleGroupType
        ├── AisleType
        └── FamilyShoppingListItemType
```

## Item Sources

| Value | Description |
|-------|-------------|
| GENERATED | Extracted from meal plan recipes during generation |
| WRITE_IN | Manually added by the user |

## Client-Side State

| State | Location | Description |
|-------|----------|-------------|
| weekOffset | React state | Current week offset (0 = this week) |
| mode | React state | "personal" or "family" |
| familyGroupId | Redux store | Determines toggle visibility |
| shopping list data | Apollo cache | Cached query results by date range |
| collapsed aisles | React state | Set of aisle IDs that are collapsed |
