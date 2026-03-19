# Quickstart: Meal Plan Management

**Feature**: 008-meal-plan-management
**Date**: 2026-03-19

## Prerequisites

- Node.js, bun, Expo CLI installed
- roll-a-bowl-mobile repo cloned
- Branch `008-meal-plan-management` checked out
- API running locally or accessible at configured URL

## Setup

```bash
# Install dependencies
bun install

# Generate GraphQL types after adding new operations
npm run codegen

# Start development
npx expo start --dev-client
```

## Key Files to Modify

| File | Purpose |
|------|---------|
| `graphql/operations/meal-plan.ts` | Add all personal + family mutations |
| `graphql/operations/index.ts` | Export new operations |
| `screens/meal-plan/MealPlanScreen.tsx` | Week navigation, snacks, slot tap handlers |
| `screens/meal-plan/MealSlotCard.tsx` | Multiple entries display, remove action |
| `screens/meal-plan/MealEntryRow.tsx` | New: individual entry with remove/edit |
| `screens/meal-plan/RecipePickerModal.tsx` | New: recipe search and selection |

## Key Patterns

### Adding a GraphQL mutation

```typescript
// In graphql/operations/meal-plan.ts
export const AddRecipeToMealPlan = graphql(`
  mutation AddRecipeToMealPlan($input: AddRecipeToMealPlanInput!) {
    addRecipeToMealPlan(input: $input) {
      id
      mealType
      meal { ... on RecipeType { id, name, slug } }
    }
  }
`);
```

### Using a mutation with refetch

```typescript
const [addRecipe] = useMutation(AddRecipeToMealPlan, {
  refetchQueries: [{ query: GetMealPlanRange, variables: { input: { ... } } }],
});
```

### Family/personal conditional

```typescript
const mode = ...; // 'personal' | 'family'
if (mode === 'family') {
  await addRecipeToFamily({ variables: { input: { recipeId, date, mealType } } });
} else {
  await addRecipeToPersonal({ variables: { input: { recipeSlug, date, mealType } } });
}
```

## Testing

```bash
# Type check
npx tsc --noEmit

# Run tests (if applicable)
npm test
```

## Design System Components Used

- `Card` (with title prop for meal type labels)
- `Row`, `Box` (layout)
- `Icon` (plus, times, chevron-left, chevron-right, search)
- `Label`, `Paragraph`, `Caption` (typography)
- `Button` (actions)
- `SafeAreaBox`, `ScrollBox` (screen wrappers)
