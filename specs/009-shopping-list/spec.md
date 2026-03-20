# Feature Specification: Shopping List Management

**Feature Branch**: `009-shopping-list`
**Created**: 2026-03-19
**Status**: Draft
**Input**: Shopping list management for the roll-a-bowl mobile app. Replace the current mock grocery list screen with a fully functional shopping list connected to the API.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Generate Shopping List from Meal Plan (Priority: P1)

A user opens the Grocery List tab for the current week. If no shopping list exists yet, they see a prompt to generate one. Tapping "Generate Shopping List" creates a list by extracting all non-optional ingredients from recipes in their meal plan for that week. Duplicate ingredients are combined with summed quantities. The generated list appears grouped by aisle.

**Why this priority**: This is the core value proposition — turning a meal plan into an actionable shopping list. Without generation, the feature has no content.

**Independent Test**: Can be tested by scheduling recipes in a meal plan, generating the list, and verifying all expected ingredients appear with correct quantities and aisle grouping.

**Acceptance Scenarios**:

1. **Given** a user with recipes scheduled for the current week, **When** they tap "Generate Shopping List", **Then** a list is created with all non-optional ingredients grouped by aisle.
2. **Given** two recipes containing the same ingredient (e.g., 1 lb chicken + 2 lbs chicken), **When** the list is generated, **Then** the ingredient appears once with summed quantity (3 lbs chicken).
3. **Given** a user with no recipes scheduled for the current week, **When** they tap generate, **Then** the list is created but empty, with a message indicating no recipes are scheduled.
4. **Given** a shopping list already exists for the current week, **When** the user opens the Grocery List tab, **Then** the existing list is displayed without needing to regenerate.

---

### User Story 2 - Check Off Items While Shopping (Priority: P1)

A user views their shopping list grouped by aisle. Each aisle is a collapsible section showing items with checkboxes. Tapping an item toggles it checked/unchecked. Checked items show a strikethrough and reduced opacity. A progress bar at the top shows overall completion (e.g., "7 of 15 items").

**Why this priority**: Checking items off is the primary in-store interaction — the reason users open the app while shopping.

**Independent Test**: Can be tested by toggling items on a generated list and verifying the visual state changes and progress bar updates.

**Acceptance Scenarios**:

1. **Given** a generated shopping list, **When** the user views it, **Then** items are grouped by aisle in collapsible sections.
2. **Given** an unchecked item, **When** the user taps it, **Then** the item shows a checkmark, strikethrough text, and reduced opacity.
3. **Given** a checked item, **When** the user taps it again, **Then** the item returns to unchecked state.
4. **Given** some items are checked, **When** viewing the screen header, **Then** a progress bar shows "X of Y items" with the correct count and percentage.
5. **Given** an aisle section, **When** all items in it are checked, **Then** the section shows a visual indicator that it is complete.

---

### User Story 3 - Navigate Weeks and Regenerate (Priority: P2)

A user can navigate between weeks to view or generate shopping lists for different weeks. If the meal plan has changed since the list was generated, the user can regenerate to rebuild the list from the current meal plan (resetting all check states).

**Why this priority**: Meal plans change — users need to keep their shopping list in sync and plan ahead for future weeks.

**Independent Test**: Can be tested by navigating to a different week, generating a list, then modifying the meal plan and regenerating.

**Acceptance Scenarios**:

1. **Given** the user is viewing the current week, **When** they tap the forward arrow, **Then** next week's shopping list (or generate prompt) is displayed.
2. **Given** the user is viewing a different week, **When** they tap "Back to this week", **Then** the view returns to the current week.
3. **Given** a shopping list exists for the current week, **When** the user taps "Regenerate", **Then** a confirmation prompt appears warning that check states will be reset.
4. **Given** the user confirms regeneration, **When** the system rebuilds the list, **Then** all items are updated from the current meal plan and all check states are cleared.

---

### User Story 4 - Add Custom Write-In Items (Priority: P2)

A user can add items that aren't from recipes — things like "Paper towels" or "Dog food". These write-in items appear in the list alongside generated items and can be checked off and removed like any other item.

**Why this priority**: Real shopping trips include items beyond recipe ingredients. Without write-ins, users need a separate app for non-recipe items.

**Independent Test**: Can be tested by adding a write-in item and verifying it appears in the list, can be toggled, and can be removed.

**Acceptance Scenarios**:

1. **Given** a shopping list exists, **When** the user taps "Add Item", **Then** a text input appears for entering the item name.
2. **Given** the add item input is shown, **When** the user enters a name and submits, **Then** the item appears in the list.
3. **Given** a write-in item exists, **When** the user removes it, **Then** the item is deleted from the list.

---

### User Story 5 - Remove Items (Priority: P2)

A user can remove any individual item (generated or write-in) from their shopping list.

**Why this priority**: Users may already have ingredients at home or want to skip certain items.

**Independent Test**: Can be tested by removing an item and verifying it disappears from the list and the progress count updates.

**Acceptance Scenarios**:

1. **Given** a shopping list with items, **When** the user swipes or taps remove on an item, **Then** the item is removed from the list.
2. **Given** an item is removed, **When** viewing the progress bar, **Then** the total count is updated to reflect the removal.

---

### User Story 6 - Family Shopping List Mode (Priority: P2)

A user who belongs to a family group can toggle between "Family" and "Personal" shopping list views. Family mode generates from the family meal plan and is shared — all family members see the same list and check-off state. Family mode is the default when a group exists.

**Why this priority**: Families shop together. A shared list prevents duplicate purchases and ensures coordination.

**Independent Test**: Can be tested by toggling between modes and verifying different data loads, and by having two family members check items and seeing the state synchronize.

**Acceptance Scenarios**:

1. **Given** a user with a family group, **When** they open Grocery List, **Then** the family shopping list is shown by default with a toggle visible.
2. **Given** the family toggle is visible, **When** the user switches to "Personal", **Then** only their personal shopping list is shown.
3. **Given** family mode is active, **When** a family member checks an item, **Then** all family members see it as checked on their next data refresh.
4. **Given** a user without a family group, **When** they open Grocery List, **Then** the personal list is shown with no toggle.

---

### Edge Cases

- What happens when a recipe in the meal plan is deleted after the shopping list was generated? The generated items remain in the list (they were already extracted). Regeneration would exclude the deleted recipe.
- What happens when the user generates a list for a week with no scheduled meals? An empty list is created with a message suggesting they add meals to their plan first.
- What happens when the user loses connectivity while toggling an item? An error is shown and the toggle is reverted. The user can retry.
- What happens when two family members toggle the same item simultaneously? The server resolves the conflict — last write wins. The UI refreshes on next data fetch.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST generate a shopping list from the user's meal plan for a selected week date range.
- **FR-002**: Generated lists MUST extract all non-optional ingredients from scheduled recipes.
- **FR-003**: Duplicate ingredients (same ingredient + measurement) MUST be combined with summed quantities.
- **FR-004**: Items MUST be grouped by aisle in collapsible sections.
- **FR-005**: System MUST allow users to toggle items checked/unchecked with immediate visual feedback (checkmark, strikethrough, reduced opacity).
- **FR-006**: System MUST display a progress bar showing checked count vs total count.
- **FR-007**: System MUST allow users to navigate between weeks to view or generate shopping lists.
- **FR-008**: System MUST show a "Generate Shopping List" prompt when no list exists for the selected week.
- **FR-009**: System MUST allow users to regenerate a list from the current meal plan with a confirmation prompt.
- **FR-010**: Regeneration MUST reset all check states.
- **FR-011**: System MUST allow users to add custom write-in items with a name.
- **FR-012**: System MUST allow users to remove individual items (both generated and write-in).
- **FR-013**: System MUST show a Family/Personal toggle when the user belongs to a family group.
- **FR-014**: System MUST default to family mode when a toggle is present.
- **FR-015**: System MUST hide the toggle and show only personal list when the user has no family group.
- **FR-016**: Family shopping lists MUST be shared — all family members see the same list and check-off state.
- **FR-017**: System MUST show "Back to this week" shortcut when viewing a different week.

### Key Entities

- **Shopping List**: A list scoped to a user (or family group) and a week date range. Contains items. One list per user (or group) per week.
- **Shopping List Item**: An individual item on the list. Has a name, optional quantity and measurement, an aisle for grouping, a source (generated from recipe or manually added), and a checked state.
- **Aisle**: A category for grouping items (e.g., Produce, Dairy, Protein, Pantry). Has a name and sort order.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can generate a shopping list from their meal plan in under 5 seconds.
- **SC-002**: Users can check off an item with a single tap and see immediate visual feedback (under 300ms perceived latency).
- **SC-003**: All scheduled recipe ingredients appear in the generated list with correct quantities.
- **SC-004**: Family members see a synchronized shopping list — changes appear on the next screen focus or data refresh.
- **SC-005**: Users can add a custom write-in item in under 10 seconds.
- **SC-006**: The progress bar accurately reflects the current checked/total ratio at all times.

## Assumptions

- The API already supports all required queries and mutations for both personal and family shopping lists.
- Aisle data is available via a shared query and items are pre-assigned aisles based on their ingredient category.
- Week boundaries are Monday through Sunday, matching the meal plan convention.
- The existing `GroceryListScreen`, `GroceryItem`, and `ProgressBar` components will be replaced or significantly reworked.
- Items without an assigned aisle default to an "Other" or "Uncategorized" group.
