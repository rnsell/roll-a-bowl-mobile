# Tasks: Meal Plan Management

**Input**: Design documents from `/specs/008-meal-plan-management/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not requested — test tasks omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: GraphQL operations and codegen — shared by all user stories

- [x] T001 [P] Add all personal meal plan mutations (AddRecipeToMealPlan, RemoveRecipeFromMealPlan, ClearMealSlot, AddAdHocMeal, RemoveAdHocMeal, UpdateAdHocMeal) in graphql/operations/meal-plan.ts
- [x] T002 [P] Add all family meal plan mutations (AddRecipeToFamilyMealPlan, RemoveRecipeFromFamilyMealPlan, ClearFamilyMealSlot, AddFamilyAdHocMeal, RemoveFamilyAdHocMeal, UpdateFamilyAdHocMeal) in graphql/operations/meal-plan.ts
- [x] T003 Export all new operations from graphql/operations/index.ts and run codegen

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: New shared component needed by multiple user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create MealEntryRow component in screens/meal-plan/MealEntryRow.tsx — renders a single meal entry (recipe name or ad-hoc text) with a remove (X) button and optional "added by" label
- [x] T005 Create RecipePickerModal component in screens/meal-plan/RecipePickerModal.tsx — full-screen pageSheet modal with search input, scrollable recipe list, and onSelect callback per research.md R1

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — View and Navigate Weekly Meal Plan (Priority: P1) MVP

**Goal**: Users can see all 4 meal types per day and navigate between weeks

**Independent Test**: Open Meal Plan tab, verify 4 slots visible, tap day pills, navigate weeks with arrows, verify "Back to this week" appears

### Implementation for User Story 1

- [x] T006 [US1] Add snacks to MEAL_TYPES and MEAL_LABELS constants in screens/meal-plan/MealPlanScreen.tsx
- [x] T007 [US1] Replace static getWeekInfo() with weekOffset state and getWeekInfoWithOffset(offset) function in screens/meal-plan/MealPlanScreen.tsx
- [x] T008 [US1] Make chevron-left and chevron-right pressable to decrement/increment weekOffset in screens/meal-plan/MealPlanScreen.tsx
- [x] T009 [US1] Show "Back to this week" link below week label when weekOffset !== 0 in screens/meal-plan/MealPlanScreen.tsx
- [x] T010 [US1] Ensure today highlighting only applies when weekOffset === 0 in screens/meal-plan/MealPlanScreen.tsx
- [x] T011 [US1] Refetch meal plan data when weekOffset changes (update query variables) in screens/meal-plan/MealPlanScreen.tsx

**Checkpoint**: Users can view 4 meal slots per day and navigate between weeks

---

## Phase 4: User Story 2 — Add Recipe to Meal Slot (Priority: P1)

**Goal**: Users can tap a meal slot, pick a recipe, and add it to that slot

**Independent Test**: Tap empty meal slot, search for recipe in picker, select it, verify it appears in the slot

### Implementation for User Story 2

- [x] T012 [US2] Make MealSlotCard tappable — add onPress prop that passes date and mealType to parent in screens/meal-plan/MealSlotCard.tsx
- [x] T013 [US2] Add state for recipe picker visibility and target slot (date + mealType) in screens/meal-plan/MealPlanScreen.tsx
- [x] T014 [US2] Wire MealSlotCard onPress to open RecipePickerModal with target slot context in screens/meal-plan/MealPlanScreen.tsx
- [x] T015 [US2] On recipe selection, call AddRecipeToMealPlan mutation with date, mealType, and recipeSlug, then refetch in screens/meal-plan/MealPlanScreen.tsx
- [x] T016 [US2] Update MealSlotCard to show all entries (not just first) using MealEntryRow for each in screens/meal-plan/MealSlotCard.tsx

**Checkpoint**: Users can add recipes to any meal slot and see them displayed

---

## Phase 5: User Story 3 — Add Ad-Hoc Quick Meal (Priority: P2)

**Goal**: Users can add free-text meals to any slot without a saved recipe

**Independent Test**: Tap meal slot, choose quick meal option, enter text, verify it appears in slot

### Implementation for User Story 3

- [x] T017 [US3] Add "add meal" action sheet with "Add Recipe" and "Quick Meal" options — replace direct picker open on slot tap in screens/meal-plan/MealPlanScreen.tsx
- [x] T018 [US3] Create inline text input state for ad-hoc meal entry (visible when "Quick Meal" chosen) with 200 char limit in screens/meal-plan/MealPlanScreen.tsx
- [x] T019 [US3] On text submit, call AddAdHocMeal mutation with date, mealType, and text, then refetch in screens/meal-plan/MealPlanScreen.tsx

**Checkpoint**: Users can add both recipes and quick text meals to any slot

---

## Phase 6: User Story 4 — Remove Meals from Slot (Priority: P2)

**Goal**: Users can remove individual entries or clear an entire slot

**Independent Test**: Tap remove on a meal entry, verify it disappears. Clear a multi-entry slot, verify all gone.

### Implementation for User Story 4

- [x] T020 [US4] Wire MealEntryRow remove button to call RemoveRecipeFromMealPlan (for recipes) or RemoveAdHocMeal (for ad-hoc) based on entry id prefix, then refetch in screens/meal-plan/MealPlanScreen.tsx
- [x] T021 [US4] Add "Clear Slot" action to MealSlotCard for slots with entries — calls ClearMealSlot with date and mealType after confirmation alert in screens/meal-plan/MealPlanScreen.tsx

**Checkpoint**: Users can remove individual meals and clear entire slots

---

## Phase 7: User Story 5 — Edit Ad-Hoc Meal Text (Priority: P3)

**Goal**: Users can edit existing ad-hoc meal text inline

**Independent Test**: Tap edit on ad-hoc meal, change text, save, verify updated text shown

### Implementation for User Story 5

- [x] T022 [US5] Add edit mode state to MealEntryRow — tap to toggle inline TextInput for ad-hoc entries in screens/meal-plan/MealEntryRow.tsx
- [x] T023 [US5] On save, call UpdateAdHocMeal mutation with updated text, then refetch. On cancel, revert to original text in screens/meal-plan/MealPlanScreen.tsx

**Checkpoint**: Users can edit ad-hoc meal text without re-creating entries

---

## Phase 8: User Story 6 — Family Meal Plan Mode (Priority: P2)

**Goal**: Family group members see and manage the shared family meal plan by default

**Independent Test**: Toggle to family mode, verify different data loads, verify "added by" shows on entries, verify personal mode shows own plan only

### Implementation for User Story 6

- [x] T024 [US6] Route all mutation calls through mode-conditional: family mutations when mode === 'family', personal mutations when mode === 'personal' in screens/meal-plan/MealPlanScreen.tsx
- [x] T025 [US6] Update RecipePickerModal to accept mode prop — show unified recipes for personal, family recipes for family in screens/meal-plan/RecipePickerModal.tsx
- [x] T026 [US6] Ensure MealEntryRow displays addedBy when present (already partially wired via MealSlotCard) in screens/meal-plan/MealEntryRow.tsx
- [x] T027 [US6] Update ad-hoc meal mutations to use family variants (AddFamilyAdHocMeal, RemoveFamilyAdHocMeal, UpdateFamilyAdHocMeal) when in family mode in screens/meal-plan/MealPlanScreen.tsx
- [x] T028 [US6] Update clear slot to use ClearFamilyMealSlot when in family mode in screens/meal-plan/MealPlanScreen.tsx

**Checkpoint**: Family members can view and manage a shared meal plan with attribution

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T029 [P] Remove "Copy Last Week" and "Auto-Fill" placeholder buttons from screens/meal-plan/MealPlanScreen.tsx (out of scope per spec)
- [x] T030 [P] Add error handling for all mutations — show Alert.alert on failure in screens/meal-plan/MealPlanScreen.tsx
- [x] T031 Run TypeScript type check (npx tsc --noEmit) and fix any errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (codegen must complete first)
- **User Stories (Phase 3+)**: All depend on Phase 2 completion
  - US1 (view/navigate) and US2 (add recipe) are both P1 — US1 first since US2 needs slot interaction
  - US3 (ad-hoc), US4 (remove), US6 (family) are P2 — can proceed after US2
  - US5 (edit ad-hoc) is P3 — proceed after US3
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — No story dependencies
- **US2 (P1)**: Can start after Phase 2 — Benefits from US1 (snacks/navigation) but independently testable
- **US3 (P2)**: Depends on US2 (slot tap flow established)
- **US4 (P2)**: Depends on US2 (entries must exist to remove)
- **US5 (P3)**: Depends on US3 (ad-hoc entries must exist to edit)
- **US6 (P2)**: Depends on US2 (mutation routing builds on personal flow)

### Parallel Opportunities

- T001 and T002 can run in parallel (different mutation sets, same file sections)
- T004 and T005 can run in parallel (different new files)
- T006 through T011 are sequential (same file, progressive changes)
- T029 and T030 can run in parallel (different concerns)

---

## Parallel Example: Phase 1

```bash
# Launch setup tasks in parallel:
Task: "Add personal meal plan mutations in graphql/operations/meal-plan.ts"
Task: "Add family meal plan mutations in graphql/operations/meal-plan.ts"
```

## Parallel Example: Phase 2

```bash
# Launch foundational component creation in parallel:
Task: "Create MealEntryRow component in screens/meal-plan/MealEntryRow.tsx"
Task: "Create RecipePickerModal component in screens/meal-plan/RecipePickerModal.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup (GraphQL mutations + codegen)
2. Complete Phase 2: Foundational (MealEntryRow + RecipePickerModal)
3. Complete Phase 3: US1 — snacks + week navigation
4. Complete Phase 4: US2 — add recipe to slot
5. **STOP and VALIDATE**: Users can view 4 meal types, navigate weeks, and add recipes
6. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Infrastructure ready
2. US1 (view/navigate) → Meal plan is a useful calendar viewer
3. US2 (add recipe) → Core planning functionality (MVP!)
4. US3 (ad-hoc) + US4 (remove) + US6 (family) → Full management
5. US5 (edit ad-hoc) → Polish
6. Phase 9 → Cleanup

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each phase completion
- Stop at any checkpoint to validate story independently
- Family mode (US6) is designed to layer on top of personal mode with minimal changes
