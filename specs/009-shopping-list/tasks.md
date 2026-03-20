# Tasks: Shopping List Management

**Input**: Design documents from `/specs/009-shopping-list/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested — test tasks omitted.

**Organization**: Tasks grouped by user story for independent implementation.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: GraphQL operations and codegen

- [x] T001 Add all personal shopping list operations (GetShoppingList, GenerateShoppingList, RegenerateShoppingList, ToggleShoppingListItem, AddShoppingListItem, RemoveShoppingListItem) in graphql/operations/shopping-list.ts
- [x] T002 [P] Add all family shopping list operations (GetFamilyShoppingList, GenerateFamilyShoppingList, RegenerateFamilyShoppingList, ToggleFamilyShoppingListItem, AddFamilyShoppingListItem, RemoveFamilyShoppingListItem) in graphql/operations/shopping-list.ts
- [x] T003 [P] Add GetAisles query in graphql/operations/shopping-list.ts
- [x] T004 Export all new operations from graphql/operations/index.ts and run codegen

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: New shared components needed by multiple user stories

- [x] T005 [P] Create AisleGroup component in screens/grocery-list/AisleGroup.tsx — collapsible section with aisle name header, chevron toggle, "X/Y checked" badge, and children items
- [x] T006 [P] Create GeneratePrompt component in screens/grocery-list/GeneratePrompt.tsx — empty state with message and "Generate Shopping List" button
- [x] T007 [P] Create WriteInForm component in screens/grocery-list/WriteInForm.tsx — text input with submit button for adding custom items
- [x] T008 Rewrite GroceryItem component in screens/grocery-list/GroceryItem.tsx — checkbox toggle with name, quantity, measurement display, remove button, strikethrough when checked

**Checkpoint**: Foundation ready

---

## Phase 3: User Story 1 — Generate Shopping List from Meal Plan (Priority: P1) MVP

**Goal**: Users can generate a shopping list from their meal plan

**Independent Test**: Open Grocery List tab, tap Generate, verify ingredients from meal plan appear grouped by aisle

### Implementation

- [x] T009 [US1] Rewrite GroceryListScreen to query GetShoppingList for current week — show GeneratePrompt if null, show aisle groups if list exists in screens/grocery-list/GroceryListScreen.tsx
- [x] T010 [US1] Wire GeneratePrompt button to call GenerateShoppingList mutation with current week dates, then refetch in screens/grocery-list/GroceryListScreen.tsx
- [x] T011 [US1] Render aisleGroups from query data using AisleGroup component with GroceryItem children in screens/grocery-list/GroceryListScreen.tsx

**Checkpoint**: Users can generate and view a shopping list

---

## Phase 4: User Story 2 — Check Off Items While Shopping (Priority: P1)

**Goal**: Users can toggle items checked/unchecked with immediate feedback

**Independent Test**: Tap item, verify checkmark + strikethrough appears instantly, progress bar updates

### Implementation

- [x] T012 [US2] Wire GroceryItem tap to call ToggleShoppingListItem mutation with optimistic response for instant UI update in screens/grocery-list/GroceryListScreen.tsx
- [x] T013 [US2] Update ProgressBar to calculate checked/total from real aisleGroups data (replace mock) in screens/grocery-list/GroceryListScreen.tsx
- [x] T014 [US2] Show allChecked visual indicator on AisleGroup header when all items in aisle are checked in screens/grocery-list/AisleGroup.tsx

**Checkpoint**: Users can check off items with instant feedback and see progress

---

## Phase 5: User Story 3 — Navigate Weeks and Regenerate (Priority: P2)

**Goal**: Users can navigate weeks and regenerate from updated meal plans

**Independent Test**: Navigate to next week, generate list, go back, regenerate current week

### Implementation

- [x] T015 [US3] Add weekOffset state and week navigation (chevrons + "Back to this week") to GroceryListScreen, matching meal plan pattern in screens/grocery-list/GroceryListScreen.tsx
- [x] T016 [US3] Add "Regenerate" button (visible when list exists) that shows confirmation alert then calls RegenerateShoppingList mutation in screens/grocery-list/GroceryListScreen.tsx

**Checkpoint**: Users can navigate weeks and regenerate lists

---

## Phase 6: User Story 4 — Add Custom Write-In Items (Priority: P2)

**Goal**: Users can add items not from recipes

**Independent Test**: Tap add, type item name, submit, verify it appears in list

### Implementation

- [x] T017 [US4] Wire WriteInForm submit to call AddShoppingListItem mutation with item name, then refetch in screens/grocery-list/GroceryListScreen.tsx

**Checkpoint**: Users can add custom items

---

## Phase 7: User Story 5 — Remove Items (Priority: P2)

**Goal**: Users can remove any item from the list

**Independent Test**: Tap remove on item, verify it disappears, progress updates

### Implementation

- [x] T018 [US5] Wire GroceryItem remove button to call RemoveShoppingListItem mutation, then refetch in screens/grocery-list/GroceryListScreen.tsx

**Checkpoint**: Users can remove items

---

## Phase 8: User Story 6 — Family Shopping List Mode (Priority: P2)

**Goal**: Family members share a synchronized shopping list

**Independent Test**: Toggle to family mode, generate list from family meal plan, verify shared state

### Implementation

- [x] T019 [US6] Add Family/Personal mode toggle to GroceryListScreen (same pattern as meal plan) in screens/grocery-list/GroceryListScreen.tsx
- [x] T020 [US6] Route all queries and mutations through mode conditional — family variants when mode === 'family' in screens/grocery-list/GroceryListScreen.tsx
- [x] T021 [US6] Ensure GeneratePrompt, WriteInForm, and item actions all use correct mode mutations in screens/grocery-list/GroceryListScreen.tsx

**Checkpoint**: Family members can view and manage a shared shopping list

---

## Phase 9: Polish & Cross-Cutting Concerns

- [x] T022 [P] Add error handling (Alert.alert) for all mutations in screens/grocery-list/GroceryListScreen.tsx
- [x] T023 [P] Remove all mock/hardcoded data from screens/grocery-list/ files
- [x] T024 Run TypeScript type check (npx tsc --noEmit) and fix any errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1
- **User Stories (Phase 3+)**: All depend on Phase 2
  - US1 (generate) first — provides content for all other stories
  - US2 (toggle) after US1
  - US3 (week nav), US4 (write-in), US5 (remove) after US2
  - US6 (family) after US1+US2
- **Polish (Phase 9)**: After all stories

### Parallel Opportunities

- T001, T002, T003 can run in parallel (different operation sets)
- T005, T006, T007 can run in parallel (different new files)
- T022, T023 can run in parallel (different concerns)

---

## Implementation Strategy

### MVP First (US1 + US2)

1. Phase 1: Setup → codegen
2. Phase 2: Foundational → new components
3. Phase 3: US1 → generate and display list
4. Phase 4: US2 → check off items
5. **STOP**: Users can generate a list and shop with it

### Incremental Delivery

1. US1 + US2 → Functional shopping list (MVP)
2. US3 → Week navigation + regenerate
3. US4 + US5 → Write-ins + remove
4. US6 → Family mode
5. Phase 9 → Cleanup
