# Research: Meal Plan Management

**Feature**: 008-meal-plan-management
**Date**: 2026-03-19

## R1: Recipe Picker UX Pattern

**Decision**: Full-screen modal using React Native `Modal` component with `presentationStyle="pageSheet"`.

**Rationale**: Consistent with the existing `MeasurementPicker` pattern in the app. Page sheet modals are the standard iOS pattern for selection flows. Provides sufficient screen real estate for search + scrollable list. Bottom sheets were considered but are better suited for shorter lists — the recipe list could be lengthy.

**Alternatives considered**:
- Bottom sheet (@gorhom/bottom-sheet): Good for short lists but recipes may need full screen scrolling. Would require snap points management.
- Navigation push (new screen): Adds routing complexity for what is a transient selection. Doesn't feel like a navigation step.

## R2: Adding Meals — Entry Point UX

**Decision**: Tapping a meal slot card opens an action sheet or bottom sheet with two options: "Add Recipe" (opens recipe picker) and "Quick Meal" (shows text input). For empty slots, the card itself is the tap target. For filled slots, a "+" button appears.

**Rationale**: Two distinct entry types (recipe vs ad-hoc) need clear differentiation. An intermediate choice avoids cluttering the slot card with multiple buttons. The web app uses separate buttons per slot — mobile needs a more touch-friendly consolidated approach.

**Alternatives considered**:
- Direct recipe picker (skip choice): Would not provide ad-hoc meal option without a separate UI element.
- Tab-based picker (recipes tab + quick meal tab): More complex UI for a simple choice.

## R3: Multiple Entries Per Slot Display

**Decision**: Expand the `MealSlotCard` to render a list of entries when multiple exist. Each entry is a `MealEntryRow` component with the meal name and a remove (X) button. The slot card header shows the meal type label and an "add" button.

**Rationale**: The API supports multiple entries per slot. The web app renders all entries per slot as a list. The mobile card pattern naturally extends to contain multiple rows with the Card component's built-in dividers.

**Alternatives considered**:
- Show only first entry with "and N more" badge: Hides information. Users need to see all planned meals.
- Horizontal scroll of entries: Unusual pattern for a meal list. Vertical is more natural.

## R4: Week Navigation State

**Decision**: Use a `weekOffset` integer state (0 = current week, +1 = next week, -1 = last week). Calculate week dates from the offset. Refetch data when offset changes.

**Rationale**: Simple, stateless approach matching the web app pattern. No need to persist which week the user was viewing — always starts on current week. The offset maps cleanly to the existing `getWeekInfo()` helper with a parameter.

**Alternatives considered**:
- Store absolute start date: Slightly more flexible but unnecessary complexity for week-by-week navigation.
- Swipe gesture for week change: Nice UX enhancement but not needed for MVP. Can be added later.

## R5: Family vs Personal Mutation Routing

**Decision**: The mode state (`'personal' | 'family'`) is passed down to components that perform mutations. Each mutation call site uses a conditional to pick the personal or family variant. No abstraction layer — just inline conditionals.

**Rationale**: YAGNI (Constitution Principle IV). There are only ~6 mutation call sites. An abstraction layer (strategy pattern, hook factory) would add complexity for minimal benefit. The personal and family mutations have slightly different input shapes (slug vs recipeId), making a generic abstraction awkward.

**Alternatives considered**:
- Generic `useMealPlanMutation` hook that switches internally: Over-engineering for 6 call sites. Input types differ between personal/family.
- Context provider with mode: The mode is already a simple state in MealPlanScreen. No need for additional context.

## R6: Refetch Strategy After Mutations

**Decision**: Use Apollo's `refetchQueries` option on each mutation to refetch the current week's meal plan data. The refetch query matches the active mode (personal or family) and current week's date range.

**Rationale**: Simple and reliable. The meal plan data set is small (7 days of entries). Full refetch is cheap and guarantees consistency. Optimistic updates were considered but add complexity for marginal UX gain on a non-latency-sensitive screen.

**Alternatives considered**:
- Optimistic updates: Complex to implement correctly with union types and multiple entries per slot. Risk of stale UI on error rollback.
- Manual cache updates: Fragile and error-prone with the nested data structure (days → entries → meal union).
