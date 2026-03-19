# Feature Specification: Meal Plan Management

**Feature Branch**: `008-meal-plan-management`
**Created**: 2026-03-19
**Status**: Draft
**Input**: Meal planning management for the roll-a-bowl mobile app with week navigation, adding/removing meals, recipe picker, ad-hoc meals, and family/personal mode support.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View and Navigate Weekly Meal Plan (Priority: P1)

A user opens the Meal Plan tab and sees the current week's meals laid out by day. Each day shows four meal slots: Breakfast, Lunch, Dinner, and Snacks. The current day is visually highlighted. The user can tap day pills to switch between days and use navigation arrows to move between weeks. A "Back to this week" shortcut appears when viewing a different week.

**Why this priority**: The meal plan is read-only without this — users need to see and navigate their plan before they can manage it.

**Independent Test**: Can be fully tested by opening the Meal Plan tab, tapping different days, and navigating weeks. Delivers value as a meal calendar viewer.

**Acceptance Scenarios**:

1. **Given** a user on the Meal Plan tab, **When** the screen loads, **Then** the current week (Mon-Sun) is displayed with today's day pill highlighted and its meal slots visible.
2. **Given** a user viewing the current week, **When** they tap a different day pill, **Then** the meal slots update to show that day's meals.
3. **Given** a user viewing the current week, **When** they tap the forward arrow, **Then** next week's dates and meals are displayed.
4. **Given** a user viewing a week other than the current one, **When** they tap "Back to this week", **Then** the view returns to the current week with today selected.
5. **Given** a day with scheduled meals, **When** viewing the day pills row, **Then** a progress dot indicator appears on that day.

---

### User Story 2 - Add Recipe to Meal Slot (Priority: P1)

A user taps an empty meal slot (or the + button on a filled slot) to open a recipe picker. The picker shows a searchable list of their recipes. The user selects a recipe and it is added to that meal slot for that day.

**Why this priority**: Adding meals is the core action — without it, the meal plan is purely a viewer.

**Independent Test**: Can be tested by tapping a meal slot, searching for a recipe, selecting it, and verifying it appears in the slot.

**Acceptance Scenarios**:

1. **Given** a user taps an empty meal slot, **When** the recipe picker opens, **Then** a searchable list of available recipes is displayed.
2. **Given** the recipe picker is open, **When** the user types in the search field, **Then** the list filters to matching recipes in real time.
3. **Given** the user selects a recipe, **When** they confirm the selection, **Then** the recipe appears in the meal slot and the picker closes.
4. **Given** a meal slot already has a recipe, **When** the user adds another recipe, **Then** both recipes appear in the slot (multiple entries per slot allowed).

---

### User Story 3 - Add Ad-Hoc Quick Meal (Priority: P2)

A user wants to plan a meal that isn't a saved recipe (e.g., "Leftovers" or "Eating out"). They can enter a free-text meal description (up to 200 characters) for any meal slot.

**Why this priority**: Provides flexibility for unplanned meals without requiring a full recipe — high-frequency use case.

**Independent Test**: Can be tested by tapping a meal slot, entering free text, saving, and verifying the text appears in the slot.

**Acceptance Scenarios**:

1. **Given** a user is adding a meal, **When** they choose the ad-hoc option, **Then** a text input appears for entering a meal description.
2. **Given** the text input is shown, **When** the user enters text and saves, **Then** the ad-hoc meal appears in the slot.
3. **Given** the user enters text exceeding 200 characters, **When** they try to save, **Then** the input is limited to 200 characters.

---

### User Story 4 - Remove Meals from Slot (Priority: P2)

A user can remove individual recipes or ad-hoc meals from a meal slot. They can also clear an entire slot at once.

**Why this priority**: Users need to correct mistakes and adjust their plans — essential for plan management.

**Independent Test**: Can be tested by removing a meal from a slot and verifying it disappears.

**Acceptance Scenarios**:

1. **Given** a meal slot contains a recipe, **When** the user taps the remove action on that recipe, **Then** the recipe is removed from the slot.
2. **Given** a meal slot contains an ad-hoc meal, **When** the user taps the remove action, **Then** the ad-hoc meal is removed.
3. **Given** a meal slot contains multiple items, **When** the user clears the entire slot, **Then** all items are removed.

---

### User Story 5 - Edit Ad-Hoc Meal Text (Priority: P3)

A user can edit the text of an existing ad-hoc meal entry without removing and re-adding it.

**Why this priority**: Quality-of-life improvement — saves time when correcting typos or updating meal descriptions.

**Independent Test**: Can be tested by tapping edit on an ad-hoc meal, changing the text, saving, and verifying the updated text.

**Acceptance Scenarios**:

1. **Given** a meal slot contains an ad-hoc meal, **When** the user taps edit, **Then** the text becomes editable inline.
2. **Given** the user is editing an ad-hoc meal, **When** they save changes, **Then** the updated text is displayed.
3. **Given** the user is editing an ad-hoc meal, **When** they cancel, **Then** the original text remains unchanged.

---

### User Story 6 - Family Meal Plan Mode (Priority: P2)

A user who belongs to a family group can toggle between "Family" and "Personal" meal plan views. Family mode is the default. In family mode, each meal entry shows who added it. Users without a family group see only the personal plan with no toggle.

**Why this priority**: Family coordination is a core use case — families need a shared meal plan to avoid duplicate grocery shopping and meal conflicts.

**Independent Test**: Can be tested by toggling between modes and verifying different data loads, and by checking that family entries show the "added by" attribution.

**Acceptance Scenarios**:

1. **Given** a user with a family group, **When** they open Meal Plan, **Then** the family plan is shown by default with a toggle visible.
2. **Given** the family toggle is visible, **When** the user switches to "Personal", **Then** only their personal meal plan entries are shown.
3. **Given** family mode is active, **When** viewing a meal entry, **Then** the name of the family member who added it is displayed.
4. **Given** a user without a family group, **When** they open Meal Plan, **Then** the personal plan is shown with no toggle.

---

### Edge Cases

- What happens when a recipe is deleted after being added to a meal plan? The meal plan entry should still display gracefully (show recipe name or a fallback label).
- What happens when navigating to a week with no meals? Empty meal slots are shown for all four meal types with placeholder "Tap to add a meal" text.
- What happens when the user loses network connectivity while adding a meal? An error message is shown and the meal is not added. The user can retry.
- What happens when a family member adds a meal while another is viewing the plan? The data refreshes on the next query or screen focus.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display 4 meal slots per day: Breakfast, Lunch, Dinner, and Snacks.
- **FR-002**: System MUST allow users to navigate between weeks using forward/back arrows.
- **FR-003**: System MUST visually highlight today's date in the day pill row.
- **FR-004**: System MUST show a "Back to this week" shortcut when viewing a week other than the current one.
- **FR-005**: System MUST show progress dot indicators on day pills that have at least one meal entry.
- **FR-006**: System MUST allow users to add a recipe to a specific meal slot via a searchable recipe picker.
- **FR-007**: System MUST allow users to add a free-text ad-hoc meal (up to 200 characters) to any meal slot.
- **FR-008**: System MUST allow multiple meal entries per slot per day.
- **FR-009**: System MUST allow users to remove individual recipes or ad-hoc meals from a slot.
- **FR-010**: System MUST allow users to clear an entire meal slot at once.
- **FR-011**: System MUST allow users to edit the text of existing ad-hoc meals inline.
- **FR-012**: System MUST show a Family/Personal toggle when the user belongs to a family group.
- **FR-013**: System MUST default to family mode when a toggle is present.
- **FR-014**: System MUST hide the toggle and show only personal plan when the user has no family group.
- **FR-015**: System MUST display "added by [member name]" on meal entries in family mode.
- **FR-016**: Recipe picker MUST support real-time search filtering by recipe name.
- **FR-017**: System MUST use family recipes (deduplicated across members) when in family mode.

### Key Entities

- **Meal Plan Day**: A date with a collection of meal entries grouped by meal type (breakfast, lunch, dinner, snacks).
- **Meal Plan Entry**: A single item in a meal slot — either a recipe reference or an ad-hoc text meal. Includes metadata: date, meal type, creation time.
- **Family Meal Plan Entry**: Extends meal plan entry with attribution (who added it).
- **Meal (Union)**: Either a Recipe (with name, slug, id) or an Ad-Hoc Meal (with free text).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can add a recipe to a meal slot in under 15 seconds (open picker, search, select, confirm).
- **SC-002**: Users can navigate between weeks with no perceived delay (under 1 second to load a new week's data).
- **SC-003**: All four meal types (breakfast, lunch, dinner, snacks) are visible and functional for every day.
- **SC-004**: Family members can see each other's meal plan contributions in real time (on next screen focus or data refresh).
- **SC-005**: Users can manage (add, edit, remove) meals across past and future weeks without restriction.

## Assumptions

- The API already supports all required queries and mutations for both personal and family meal plans.
- Recipe picker uses the same recipe data source as the unified recipe list (personal recipes in personal mode, family recipes in family mode).
- Week boundaries are Monday through Sunday, matching the existing mobile app convention.
- The "Copy Last Week" and "Auto-Fill" buttons visible in the current UI are out of scope for this feature.
