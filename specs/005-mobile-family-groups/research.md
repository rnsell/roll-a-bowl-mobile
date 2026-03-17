# Research: Mobile Family Groups

**Feature Branch**: `005-mobile-family-groups` | **Date**: 2026-03-17

## Decision 1: Redux + redux-observable Integration Strategy

**Decision**: Introduce Redux Toolkit + redux-observable alongside the existing Apollo Client + Context API setup. Redux owns cross-cutting global state (user profile, family status). Apollo Client continues to own GraphQL query caching for screen-specific data.

**Rationale**: The user explicitly requested Redux with redux-observable. Redux Toolkit reduces boilerplate and is the recommended Redux approach. redux-observable enables reactive side effects (e.g., dispatching the setup query on auth state change, updating store on mutation success). Apollo Client remains the right tool for screen-level data fetching (recipes list, meal plans) since it handles caching, loading states, and refetching well.

**Alternatives considered**:
- Zustand: Simpler API, but user explicitly requested Redux.
- Redux Saga: More common middleware, but user explicitly requested redux-observable.
- Apollo Client only (reactive variables): Could work for simple global state, but doesn't provide the reactive middleware pattern needed for complex side effects like setup query orchestration.

## Decision 2: Setup Query Composition

**Decision**: The mobile app's bootstrap query will combine the existing `me` query (user profile) with `myFamilyGroup` query (family group data) in a single GraphQL request using query batching or a composite document. The `me` query currently returns: id, email, firstName, lastName, fullName, status, emailVerified, lastLoginAt, createdAt, updatedAt, tenantId. It does NOT currently include premium status or family group fields.

**Rationale**: The API already has `me` and `myFamilyGroup` as separate queries. Rather than requiring backend changes to add fields to `me`, the mobile app can send both queries in a single network request. Premium status may need to be resolved via an entitlement check query (the API has `AccessCheckResult` types suggesting an entitlement system). For MVP, we can query `me` + `myFamilyGroup` together, and add premium status checking as a follow-up or via the entitlement API.

**Alternatives considered**:
- Single composite query on backend: Would require API changes; out of scope since we're consuming the existing API.
- Separate sequential queries: Slower startup; user wants data available within 2 seconds.

## Decision 3: GraphQL Operations Mapping

**Decision**: Map the existing web app GraphQL operations directly to mobile. The API is code-first (NestJS decorators), so no `.graphql` schema files exist — the schema is auto-generated. The mobile app will use `@graphql-codegen` (already set up) to generate typed operations.

**Available queries**:
- `me` → User profile
- `myFamilyGroup` → Family group with members (via field resolver)
- `myFamilyInvitations` → Pending invitations for the current user
- `familyGroupInvitations` → Pending invitations for the group (owner only)
- `familyRecipes` → All family recipes
- `familyRecipe(slug)` → Single family recipe

**Available mutations**:
- `createFamilyGroup(input)` → Create family group
- `deleteFamilyGroup` → Delete family group (owner only)
- `inviteFamilyMember(input)` → Invite by email (owner only)
- `cancelFamilyInvitation(invitationId)` → Cancel invitation (owner only)
- `removeFamilyMember(memberId)` → Remove member (owner only)
- `leaveFamilyGroup` → Leave group (non-owner only)
- `shareRecipeToFamily(input)` → Copy personal recipe to family
- `createFamilyRecipe(input)` → Create new family recipe
- `updateFamilyRecipe(input)` → Edit family recipe
- `deleteFamilyRecipe(slug)` → Soft-delete family recipe

**Rationale**: Full API parity with the web app. All operations exist and are tested on the backend.

**Alternatives considered**: None — the API surface is well-defined.

## Decision 4: Navigation Architecture

**Decision**: Family Group management lives on a dedicated screen pushed from Settings via Expo Router stack navigation. The family recipes tab lives on the existing Recipes screen as a segmented control / tab toggle. No new top-level tab.

**Rationale**: Clarified during spec phase. Keeps the tab bar clean (4 tabs) and puts family management in a logical place (Settings > Family Group). Recipe browsing stays on the Recipes screen with a tab toggle, matching the web app's UX.

**Navigation map**:
- `app/(tabs)/settings.tsx` → renders SettingsScreen with new "Family Group" row
- `app/family-group.tsx` → new stack screen for family group management (create/view/invite/manage)
- `app/(tabs)/index.tsx` (recipes) → RecipesScreen with "My Recipes" / "Family Recipes" toggle

**Alternatives considered**:
- New top-level tab: Too prominent for a feature that not all users will use.
- Modal: Doesn't support the depth of navigation needed (member list, invite form, etc.).

## Decision 5: Redux Store Shape

**Decision**: Single Redux store with two slices initially:

1. `user` slice: `{ profile: UserProfile | null, status: 'idle' | 'loading' | 'ready' | 'error', error: string | null }`
   - `UserProfile`: `{ id, email, firstName, lastName, isPremium, familyGroupId?, familyRole?, familyGroupName? }`
2. `familyGroup` slice: `{ group: FamilyGroup | null, invitations: FamilyInvitation[], status: 'idle' | 'loading' | 'ready' | 'error' }`

**Rationale**: Minimal store shape that covers the spec requirements. The `user` slice is bootstrapped on startup and drives conditional UI (family tab visibility, owner-only actions). The `familyGroup` slice holds detailed family data fetched when the user navigates to the family screen. Keeping them separate allows independent loading states.

**Alternatives considered**:
- Single combined slice: Harder to manage independent loading states for bootstrap vs. detailed family data.
- Normalized entities: Over-engineering for the current scale (max 20 members, no complex relationships).

## Decision 6: redux-observable Epic Pattern

**Decision**: Use epics for:
1. `bootstrapUserEpic`: Triggered by auth state change → executes setup query → dispatches profile loaded action
2. `familyGroupEpic`: Triggered by navigation to family screen → fetches detailed family group data
3. `familyMutationEpics`: After successful mutations (create group, invite, etc.) → dispatch store update actions

Epics will use the Apollo Client directly (not Redux actions) for GraphQL execution, then dispatch Redux actions with the results.

**Rationale**: redux-observable excels at orchestrating async flows reactively. Using Apollo Client within epics (rather than duplicating HTTP logic) leverages existing auth interceptors and error handling.

**Alternatives considered**:
- Apollo Client hooks only (no epics for queries): Would work for screen-level data but doesn't give us the reactive startup bootstrap the spec requires.
- Fetch API in epics: Would duplicate auth header logic already in Apollo Client.
