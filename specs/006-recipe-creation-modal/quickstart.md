# Quickstart: Recipe Creation Modal

## Prerequisites

- Mobile app running locally (`npx expo start`)
- Backend API running with recipe, ingredient, and measurement endpoints
- User authenticated and on the Recipes screen

## New Dependency

```bash
npx expo install @gorhom/bottom-sheet
```

Note: `@gorhom/bottom-sheet` requires `react-native-reanimated` (already installed) and `react-native-gesture-handler` (already installed via Expo).

## New Files

| File | Purpose |
|------|---------|
| `app/create-recipe.tsx` | Expo Router modal route |
| `screens/recipes/CreateRecipeScreen.tsx` | Main recipe creation form |
| `screens/recipes/IngredientBottomSheet.tsx` | Bottom sheet for ingredient search and entry |
| `screens/recipes/IngredientRow.tsx` | Ingredient list item in the form |
| `graphql/operations/recipes.ts` | Updated with CreateRecipe, SearchIngredients, GetMeasurements |

## GraphQL Codegen

After adding new operations to `graphql/operations/recipes.ts`, regenerate types:

```bash
npm run codegen
```

## Testing the Flow

1. Open the app → navigate to Recipes tab
2. Tap the "+" button in the header
3. Modal slides up with recipe creation form
4. Enter a recipe name
5. Tap "Add Ingredient" → bottom sheet slides up
6. Search for an ingredient (type 2+ characters)
7. Select ingredient → fill quantity and measurement → confirm
8. Ingredient appears in the form list
9. Optionally add instructions
10. Tap "Create Recipe"
11. Modal dismisses → recipe appears in list

## Family Group Behavior

If the authenticated user belongs to a family group:
- A banner/indicator shows in the form: "This recipe will be shared with [Family Name]"
- The backend automatically assigns `familyGroupId` — no frontend input needed
- After creation, the recipe appears in both personal and family recipe lists
