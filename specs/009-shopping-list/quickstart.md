# Quickstart: Shopping List Management

**Feature**: 009-shopping-list
**Date**: 2026-03-19

## Prerequisites

- Node.js, bun, Expo CLI installed
- roll-a-bowl-mobile repo cloned
- Branch `009-shopping-list` checked out
- API running locally or accessible at configured URL
- Meal plan with recipes scheduled (for list generation testing)

## Setup

```bash
bun install
npm run codegen
npx expo start --dev-client
```

## Key Files

| File | Purpose |
|------|---------|
| `graphql/operations/shopping-list.ts` | All personal + family queries and mutations |
| `graphql/operations/index.ts` | Export new operations |
| `screens/grocery-list/GroceryListScreen.tsx` | Main screen (rewrite) |
| `screens/grocery-list/GroceryItem.tsx` | Item with toggle/remove (rewrite) |
| `screens/grocery-list/ProgressBar.tsx` | Progress bar (existing, keep) |
| `screens/grocery-list/AisleGroup.tsx` | Collapsible aisle section (new) |
| `screens/grocery-list/WriteInForm.tsx` | Add custom item (new) |
| `screens/grocery-list/GeneratePrompt.tsx` | Empty state generate button (new) |

## Key Patterns

### Querying with null check for generation state
```typescript
const { data } = useSuspenseQuery(GetShoppingList, {
  variables: { input: { startDate, endDate } },
});
// data.shoppingList is null if no list exists → show GeneratePrompt
// data.shoppingList has aisleGroups if list exists → show items
```

### Optimistic toggle
```typescript
const [toggle] = useMutation(ToggleShoppingListItem, {
  optimisticResponse: {
    toggleShoppingListItem: {
      __typename: 'ShoppingListItemType',
      id: itemId,
      isChecked: !currentChecked,
      checkedAt: currentChecked ? null : new Date().toISOString(),
    },
  },
});
```

## Testing

```bash
npx tsc --noEmit
npm test
```
