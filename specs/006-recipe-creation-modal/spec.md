# Feature Specification: Recipe Creation Modal

**Feature Branch**: `006-recipe-creation-modal`
**Created**: 2026-03-17
**Status**: Draft
**Input**: User description: "The ability to add recipes exists in the web app. The latest spec in the web app folder describes how family recipes work. The goal is to create the modals for creating a recipe. If a user has a family plan the recipe is created and shared. A modal screen should pop up to collect all the necessary info similar to the web app for creating a recipe."

## Clarifications

### Session 2026-03-18

- Q: How should the ingredient addition sub-flow work on mobile? → A: Bottom sheet — a half-screen sheet slides up for ingredient search, then expands for quantity/measurement entry.
- Q: After successful recipe creation, where does the user land? → A: Recipes list — modal dismisses and list refreshes with new recipe visible.
- Q: How should the form sections (name, ingredients, instructions) be organized? → A: Single scrollable view — all sections in one continuous scroll, no stepped wizard.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create a Basic Recipe (Priority: P1)

A user taps the "+" button on the Recipes screen. A full-screen modal slides up presenting a single scrollable form with sections for name, ingredients, and instructions. The user fills in the form and taps "Create Recipe." The recipe is saved, the modal dismisses, and the user returns to the recipes list where the new recipe is visible.

**Why this priority**: Recipe creation is the core feature — without it, the "+" button has no function and users cannot add content to the app.

**Independent Test**: Can be fully tested by opening the modal, filling in a recipe name and at least one ingredient, tapping Create, and verifying the recipe appears in the recipe list.

**Acceptance Scenarios**:

1. **Given** a user is on the Recipes screen, **When** they tap the "+" button, **Then** a full-screen modal slides up with a recipe creation form.
2. **Given** the modal is open, **When** the user enters a recipe name and taps "Create Recipe," **Then** the recipe is saved and the modal dismisses.
3. **Given** the modal is open, **When** the user taps "Cancel" or the close button, **Then** the modal dismisses without saving.
4. **Given** the modal is open and the user has entered data, **When** they attempt to dismiss, **Then** they are prompted to confirm discarding changes.

---

### User Story 2 - Add Ingredients to a Recipe (Priority: P1)

While creating a recipe, the user can search for ingredients from the shared ingredient database, select them, and specify quantity, measurement unit, and optional preparation notes. Ingredients appear in an ordered list that the user can reorder and remove from.

**Why this priority**: Ingredients are the most critical part of a recipe — a recipe without ingredients has minimal value.

**Independent Test**: Can be tested by searching for an ingredient, adding it with a quantity and measurement, verifying it appears in the ingredient list, and confirming it is saved with the recipe.

**Acceptance Scenarios**:

1. **Given** the user is in the recipe creation modal, **When** they tap "Add Ingredient," **Then** a bottom sheet slides up with a search input for finding ingredients by name.
2. **Given** the ingredient search is active, **When** the user types at least 2 characters, **Then** matching ingredients from the database appear as suggestions.
3. **Given** the user selects an ingredient, **When** they fill in quantity and measurement, **Then** the ingredient is added to the recipe's ingredient list.
4. **Given** an ingredient is in the list, **When** the user taps remove, **Then** the ingredient is removed from the list.
5. **Given** the user tries to add a duplicate ingredient, **When** the ingredient already exists in the list, **Then** the system prevents the duplicate and notifies the user.

---

### User Story 3 - Write Recipe Instructions (Priority: P2)

The user can write free-form cooking instructions in a text area within the recipe creation modal. Instructions are stored as plain text.

**Why this priority**: Instructions complete the recipe but are not strictly required — some users may add a recipe with just a name and ingredients, adding instructions later.

**Independent Test**: Can be tested by entering instructions text, creating the recipe, and verifying instructions are saved and displayed on the recipe detail view.

**Acceptance Scenarios**:

1. **Given** the user is in the recipe creation modal, **When** they scroll to the Instructions section, **Then** a multi-line text input is available.
2. **Given** the user has entered instructions, **When** they create the recipe, **Then** the instructions are saved and visible on the recipe detail screen.

---

### User Story 4 - Auto-Share to Family Group (Priority: P2)

When a user who belongs to a family group creates a recipe, the recipe is automatically shared with their family group. The user sees a visual indicator confirming the recipe will be shared. Users without a family group create personal-only recipes with no family indicator shown.

**Why this priority**: Family sharing is the key differentiator for family plan users, but the creation flow works identically — the backend handles the family assignment automatically.

**Independent Test**: Can be tested by creating a recipe as a family group member, then verifying the recipe appears in the family recipes list for other family members.

**Acceptance Scenarios**:

1. **Given** the user belongs to a family group, **When** they open the recipe creation modal, **Then** a visual indicator shows that the recipe will be shared with their family group.
2. **Given** the user belongs to a family group, **When** they create a recipe, **Then** the recipe is automatically assigned to the family group by the backend.
3. **Given** the user does not belong to a family group, **When** they open the recipe creation modal, **Then** no family sharing indicator is shown.
4. **Given** the user does not belong to a family group, **When** they create a recipe, **Then** the recipe is created as a personal recipe only.

---

### Edge Cases

- What happens when the user submits a recipe with no name? The system shows a validation error requiring a name.
- What happens when the user submits with an extremely long recipe name? The name is limited to 200 characters with validation feedback.
- What happens when the ingredient search returns no results? A "No ingredients found" message appears.
- What happens when the network request to create a recipe fails? The user sees an error message and can retry without losing entered data.
- What happens when the user backgrounds the app while the modal is open? Entered data persists when they return.
- What happens when the user has no ingredients added? The recipe is still creatable with just a name.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST present a full-screen modal with a single scrollable form (name, ingredients, instructions sections) when the user taps the "+" button on the Recipes screen.
- **FR-002**: System MUST collect a recipe name (required, max 200 characters).
- **FR-003**: System MUST present ingredient search in a bottom sheet that slides up when the user taps "Add Ingredient," allowing search with a minimum of 2 characters.
- **FR-004**: System MUST allow users to add ingredients with quantity (optional, decimal), measurement unit (from predefined list), and preparation note (optional, max 200 characters).
- **FR-005**: System MUST allow users to mark ingredients as optional.
- **FR-006**: System MUST prevent duplicate ingredients in a single recipe.
- **FR-007**: System MUST allow users to remove ingredients from the list.
- **FR-008**: System MUST allow users to reorder ingredients in the list.
- **FR-009**: System MUST provide a multi-line text input for recipe instructions (optional).
- **FR-010**: System MUST show a confirmation prompt when the user attempts to dismiss the modal with unsaved changes.
- **FR-011**: System MUST show a visual indicator when the recipe will be auto-shared to a family group.
- **FR-012**: System MUST display validation errors for missing required fields before submission.
- **FR-013**: System MUST show a loading state during recipe creation and prevent duplicate submissions.
- **FR-014**: System MUST dismiss the modal and return the user to the recipes list, which refreshes to show the newly created recipe.
- **FR-015**: System MUST preserve entered data if the creation request fails, allowing the user to retry.

### Key Entities

- **Recipe**: A user-created recipe with a name, optional instructions, and an ordered list of ingredients. Belongs to a user and optionally to a family group.
- **Recipe Ingredient**: A join between a recipe and an ingredient from the shared database, with quantity, measurement unit, preparation note, optional flag, and display order.
- **Ingredient**: A shared database item representing a food ingredient (searched by name).
- **Measurement**: A unit of measurement for ingredient quantities (cups, tablespoons, ounces, grams, etc.).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create a recipe with a name and at least one ingredient in under 90 seconds.
- **SC-002**: Ingredient search returns results within 1 second of the user stopping typing.
- **SC-003**: 95% of recipe creation attempts complete successfully on the first try (no errors requiring retry).
- **SC-004**: The modal form preserves all entered data if a network error occurs during submission.
- **SC-005**: Users who belong to a family group see their created recipes appear in the family recipe list immediately after creation.

## Assumptions

- The backend `CreateRecipe` mutation already exists and accepts name, instructions, and an ingredients array. When a family group member creates a recipe, the backend automatically assigns it to the family group.
- The ingredient database and measurement units are already available via existing GraphQL queries from the web app backend.
- The mobile app uses Expo Router's modal presentation for full-screen modals.
- Ingredient reordering uses a simple move-up/move-down pattern rather than drag-and-drop, which is more appropriate for mobile touch interactions.
