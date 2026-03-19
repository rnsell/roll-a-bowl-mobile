# Tasks: Recipe Creation Modal

**Input**: Design documents from `/specs/006-recipe-creation-modal/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not requested — test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies, add GraphQL operations, register modal route

- [x] T001 Install @gorhom/bottom-sheet via `npx expo install @gorhom/bottom-sheet`
- [x] T002 Add CreateRecipe mutation, SearchIngredients query, and GetMeasurements query to graphql/operations/recipes.ts following the contract in specs/006-recipe-creation-modal/contracts/recipe-creation-operations.graphql
- [x] T003 Export new operations from graphql/operations/index.ts
- [x] T004 Run GraphQL codegen to generate typed hooks (`npm run codegen`)
- [x] T005 Create modal route file app/create-recipe.tsx that renders CreateRecipeScreen, following the app/family-group.tsx pattern
- [x] T006 Register create-recipe as a modal route in app/_layout.tsx with `presentation: 'modal'`, `headerShown: true`, `title: 'New Recipe'`, and `headerBackTitle: 'Recipes'`

**Checkpoint**: Modal route is registered, GraphQL operations are available, bottom sheet library is installed

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define shared types used across all user story components

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Create IngredientEntry type in screens/recipes/types.ts with fields: ingredientId, ingredientName, measurementId, measurementAbbreviation, quantity, isOptional, preparationNote — as defined in data-model.md Local UI State section

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Create a Basic Recipe (Priority: P1) 🎯 MVP

**Goal**: User taps "+" on Recipes screen, modal opens with a scrollable form (name section only for MVP), user enters a name and taps Create, recipe is saved and modal dismisses to the recipes list.

**Independent Test**: Open modal, enter a recipe name, tap Create Recipe, verify modal dismisses and recipe appears in the list.

### Implementation for User Story 1

- [x] T008 [US1] Create CreateRecipeScreen component in screens/recipes/CreateRecipeScreen.tsx — single scrollable form (SafeAreaBox + ScrollBox) with recipe name TextInput, validation error display, and Create Recipe / Cancel header buttons. Use local useState for form state (name, isSubmitting, error). Wire CreateRecipe mutation with `refetchQueries: [GetRecipes]`. On success, dismiss modal via `router.back()`. Track dirty state and show Alert.alert discard confirmation on Cancel when form has changes.
- [x] T009 [US1] Wire the "+" button in screens/recipes/RecipesScreen.tsx to navigate to the create-recipe modal route via `router.push('/create-recipe')`

**Checkpoint**: User Story 1 is fully functional — user can create a recipe with a name and see it in the list

---

## Phase 4: User Story 2 - Add Ingredients to a Recipe (Priority: P1)

**Goal**: User can add ingredients to a recipe via a bottom sheet with search, quantity, measurement selection, and preparation notes. Ingredients appear as an ordered list in the form with remove and reorder controls.

**Independent Test**: Open modal, tap Add Ingredient, search for an ingredient, fill quantity and measurement, confirm. Verify ingredient appears in the form list. Create recipe and verify ingredient count is correct.

### Implementation for User Story 2

- [x] T010 [P] [US2] Create IngredientRow component in screens/recipes/IngredientRow.tsx — displays a single ingredient entry showing name, quantity, measurement abbreviation, preparation note, optional badge. Includes remove button, move-up/move-down reorder buttons, and optional toggle. Props interface: IngredientRowProps with entry: IngredientEntry, onRemove, onMoveUp, onMoveDown, onToggleOptional callbacks, isFirst and isLast booleans for disabling reorder buttons. Use design system components (Row, Box, Button, Label, Caption).
- [x] T011 [P] [US2] Create IngredientBottomSheet component in screens/recipes/IngredientBottomSheet.tsx — uses @gorhom/bottom-sheet with two snap points (50%, 85%). Initial state: search input with debounced (300ms) SearchIngredients useLazyQuery (min 2 chars). Results shown as a scrollable list. On ingredient selection, sheet expands to 85% showing: quantity TextInput (numeric keyboard), measurement picker (fetched via GetMeasurements useQuery with exposedOnly: true, sorted by displayOrder), preparation note TextInput (max 200 chars), optional toggle. "Add Ingredient" confirmation button at bottom. Props interface: IngredientBottomSheetProps with isOpen, onClose, onAdd (callback with IngredientEntry), existingIngredientIds (number[] for duplicate prevention). Show error if user selects a duplicate ingredient.
- [x] T012 [US2] Integrate ingredient list and bottom sheet into CreateRecipeScreen in screens/recipes/CreateRecipeScreen.tsx — add ingredients state (IngredientEntry[]), render IngredientRow list between name and instructions sections, add "Add Ingredient" Button that opens IngredientBottomSheet, wire onAdd/onRemove/onMoveUp/onMoveDown/onToggleOptional handlers, include ingredients in CreateRecipe mutation input by mapping IngredientEntry[] to CreateRecipeIngredientInput[].

**Checkpoint**: User Stories 1 AND 2 are fully functional — user can create a recipe with a name and ingredients

---

## Phase 5: User Story 3 - Write Recipe Instructions (Priority: P2)

**Goal**: User can write free-form cooking instructions in a multi-line text area within the recipe creation form.

**Independent Test**: Open modal, scroll to Instructions section, enter instructions text, create recipe, verify instructions are saved.

### Implementation for User Story 3

- [x] T013 [US3] Add instructions TextInput to CreateRecipeScreen in screens/recipes/CreateRecipeScreen.tsx — add a multi-line TextInput below the ingredients section with placeholder "Add cooking instructions...", no character limit, wire to form state, include in CreateRecipe mutation input, include in dirty state tracking.

**Checkpoint**: User Stories 1, 2, AND 3 are fully functional

---

## Phase 6: User Story 4 - Auto-Share to Family Group (Priority: P2)

**Goal**: Family group members see a visual indicator that their recipe will be shared. No additional API calls — backend handles family assignment automatically.

**Independent Test**: Log in as a family group member, open recipe creation modal, verify family sharing indicator is visible with the family group name. Log in as a non-family user, verify no indicator shown.

### Implementation for User Story 4

- [x] T014 [US4] Add family group sharing indicator to CreateRecipeScreen in screens/recipes/CreateRecipeScreen.tsx — read familyGroupName from Redux state via useAppSelector(state => state.user.profile?.familyGroupName). If present, render a Caption.Regular below the recipe name input: "This recipe will be shared with {familyGroupName}" using colors.secondary. If not present, render nothing. No additional API calls needed.

**Checkpoint**: All user stories are fully functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T015 Verify keyboard handling across the modal — ensure TextInputs properly scroll into view when keyboard opens, bottom sheet search input works with keyboard, and keyboard dismisses on scroll. Adjust ScrollBox keyboardShouldPersistTaps and KeyboardAvoidingView if needed in screens/recipes/CreateRecipeScreen.tsx and screens/recipes/IngredientBottomSheet.tsx.
- [x] T016 Run quickstart.md validation — walk through the full testing flow documented in specs/006-recipe-creation-modal/quickstart.md and verify all steps pass on both iOS and Android.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 (Phase 3) must complete before US2 (Phase 4) — US2 integrates into CreateRecipeScreen
  - US3 (Phase 5) depends on US1 — adds to CreateRecipeScreen
  - US4 (Phase 6) depends on US1 — adds to CreateRecipeScreen
  - US3 and US4 can run in parallel (both add independent sections to CreateRecipeScreen)
- **Polish (Phase 7)**: Depends on all user stories being complete

### Within Each User Story

- Components before integration
- Core implementation before refinements
- Story complete before moving to next priority

### Parallel Opportunities

- T002 and T005 can run in parallel (different files: graphql/operations/recipes.ts vs app/create-recipe.tsx)
- T010 and T011 can run in parallel (different files: IngredientRow.tsx vs IngredientBottomSheet.tsx)
- T013 (US3) and T014 (US4) can run in parallel after US1 is complete (independent additions to CreateRecipeScreen)

---

## Parallel Example: User Story 2

```bash
# Launch both ingredient components in parallel:
Task: "Create IngredientRow component in screens/recipes/IngredientRow.tsx"
Task: "Create IngredientBottomSheet component in screens/recipes/IngredientBottomSheet.tsx"

# Then integrate (depends on both above):
Task: "Integrate ingredient list and bottom sheet into CreateRecipeScreen"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T006)
2. Complete Phase 2: Foundational (T007)
3. Complete Phase 3: User Story 1 (T008–T009)
4. **STOP and VALIDATE**: Test User Story 1 independently — create a recipe with just a name
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (ingredients!)
4. Add User Story 3 + 4 (parallel) → Test independently → Deploy/Demo (full feature!)
5. Polish → Final validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
