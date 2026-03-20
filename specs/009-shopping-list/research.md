# Research: Shopping List Management

**Feature**: 009-shopping-list
**Date**: 2026-03-19

## R1: Collapsible Aisle Sections UX

**Decision**: Use React Native `Pressable` header + `Box` with conditional render for collapse. No animation library needed — simple show/hide with a chevron rotation indicator.

**Rationale**: Matches the simplicity principle. Aisle sections are a flat list of items under a header. Animated collapse (Reanimated layout animations) adds complexity for marginal UX gain. The web app uses simple show/hide.

**Alternatives considered**:
- Accordion component library: Over-engineering for a simple expand/collapse.
- Reanimated layout animations: Nice but unnecessary for MVP.

## R2: Optimistic Toggle for Check-Off

**Decision**: Use Apollo's optimistic response for toggle mutations. Update the cache immediately on tap, revert on error.

**Rationale**: SC-002 requires <300ms perceived latency. Network round-trips average 100-500ms. Optimistic UI ensures instant visual feedback. The toggle mutation is idempotent (toggles checkedAt) so optimistic updates are safe.

**Alternatives considered**:
- Wait for server response: Too slow for in-store use. Users tap items rapidly.
- Local state only with batch sync: Complex state management. Apollo's optimistic response handles this natively.

## R3: Week Navigation Reuse

**Decision**: Reuse the same week navigation pattern from `MealPlanScreen` — `weekOffset` state with `getWeekInfo(offset)` helper, chevron arrows, "Back to this week" link.

**Rationale**: Consistent UX across tabs. Users learn the pattern once. The helper function is already proven.

**Alternatives considered**:
- Date picker: Over-complicated for week-based navigation.
- Horizontal swipe: Nice enhancement but not MVP.

## R4: Generate vs Display State

**Decision**: Query the shopping list for the current week on screen load. If `null` is returned (no list exists), show the `GeneratePrompt` component. If a list exists, show the items. This is a simple conditional render based on query result.

**Rationale**: The API returns `null` when no list exists for the date range. No special state machine needed — just check the query result.

**Alternatives considered**:
- Always generate on load: Wasteful — regeneration destroys check states.
- Local "has generated" flag: Unnecessary when the API already tells us.

## R5: Family Mode Mutation Routing

**Decision**: Same pattern as meal plan — inline conditionals at each mutation call site to pick personal or family variant. No abstraction layer.

**Rationale**: YAGNI. ~6 mutation call sites. Personal and family mutations have identical input shapes for shopping lists (unlike meal plan where slug vs recipeId differed).

**Alternatives considered**:
- Generic hook: Over-engineering for 6 call sites with identical shapes.

## R6: Write-In Item Aisle Assignment

**Decision**: Write-in items are added without an aisle (the API assigns them to "Other" or based on ingredient match). The mobile app does not need to handle aisle assignment — the server does it.

**Rationale**: The API's `addShoppingListItem` mutation resolves the aisle server-side. The mobile app just sends the item name and optional quantity/measurement.

**Alternatives considered**:
- Client-side aisle picker: Unnecessary complexity. Server handles it.
