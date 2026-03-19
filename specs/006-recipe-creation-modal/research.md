# Research: Recipe Creation Modal

## Bottom Sheet Library

**Decision**: Use `@gorhom/bottom-sheet` for the ingredient search bottom sheet.

**Rationale**: It's the de facto standard for bottom sheets in React Native/Expo, supports gesture-driven interactions, snap points, keyboard handling, and works within modal contexts. It has 6k+ GitHub stars and active maintenance.

**Alternatives considered**:
- `react-native-modal` — doesn't provide native bottom sheet gestures
- Custom `Animated.View` — too much effort for standard UX pattern; keyboard handling is complex
- Expo Router nested modal — would require a separate route and wouldn't provide the half-sheet UX

## Modal Presentation

**Decision**: Use Expo Router's `presentation: 'modal'` for the recipe creation full-screen modal. A placeholder `modal` route already exists in `app/_layout.tsx`. Add a new `create-recipe` route.

**Rationale**: Follows the existing app navigation pattern. Expo Router handles the native modal presentation animation and gesture dismissal.

**Alternatives considered**:
- React Navigation modal — already using Expo Router which wraps it
- Custom animated overlay — unnecessary complexity

## GraphQL Operations

**Decision**: Add `CreateRecipe` mutation, `SearchIngredients` query, and `GetMeasurements` query to the mobile app's GraphQL operations.

**Rationale**: The web app already uses these exact operations against the same backend. All input/output types are already generated in the mobile app's `graphql/generated/graphql.ts`. Only the operation definitions need to be added.

**Alternatives considered**:
- REST API calls — the app is fully GraphQL-based
- Duplicating the web app's operation files — better to follow the mobile app's existing pattern in `graphql/operations/`

## State Management

**Decision**: Use local React state (`useState`) for the recipe creation form. No Redux slice needed.

**Rationale**: The form state is ephemeral (lives only while the modal is open), is not shared across screens, and doesn't need persistence. The ingredient search results come from Apollo queries with their own cache. Redux would add unnecessary complexity for throwaway state.

**Alternatives considered**:
- Redux slice for recipe creation — over-engineering for ephemeral form state (violates Constitution IV: Simplicity)
- React Hook Form — additional dependency for a straightforward form

## Ingredient Search

**Decision**: Use Apollo `useLazyQuery` with debounced input (300ms) for ingredient search. Minimum 2 characters before querying.

**Rationale**: `useLazyQuery` allows manual triggering (on user input), debouncing prevents excessive API calls, and Apollo's cache automatically deduplicates repeated searches.

**Alternatives considered**:
- `useQuery` with `skip` — works but `useLazyQuery` is more idiomatic for user-triggered searches
- Client-side filtering — requires loading all ingredients upfront; doesn't scale

## Measurements Loading

**Decision**: Fetch measurements once when the bottom sheet opens using `useQuery` with `exposedOnly: true`. Cache them for the session.

**Rationale**: Measurements are a small, stable dataset. A single fetch with Apollo caching covers all ingredient additions within the session.

**Alternatives considered**:
- Hardcoded measurement list — would drift from backend; measurements may be added/removed
- Fetch per ingredient — wasteful for a static dataset
