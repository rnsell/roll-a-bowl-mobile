# Feature Specification: Mobile Family Groups

**Feature Branch**: `005-mobile-family-groups`
**Created**: 2026-03-17
**Status**: Draft
**Input**: User description: "Family plans exist in the web app. The family plan functionality needs added to the mobile app. The status of a family plan should be kept in a global store. On start up assuming a user is authenticated the store should get populated. Lets assume that store is redux. lets use redux-observable as the middleware. A set up query needs established to fetch global user data such as premium status etc. For now lets not worry about accepting an invite from an email but simply on creating a family plan, inviting others and matching most functionality of the api and ux from the web app"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Bootstrap Global User State on Login (Priority: P1)

When a user launches the app and is already authenticated, the app fetches their global profile data — including premium status, family group membership, and family role — and stores it in a centralized Redux store. This data is available to all screens immediately without re-fetching.

**Why this priority**: Every other feature in this spec depends on knowing the user's family group status and role. Without bootstrapping this data on startup, the app cannot determine what to show.

**Independent Test**: Can be fully tested by logging in, verifying the Redux store is populated with user profile data (premium status, family group membership), and confirming this data is accessible from any screen.

**Acceptance Scenarios**:

1. **Given** an authenticated user who belongs to a family group, **When** the app starts, **Then** the global store is populated with their family group ID, family role (owner or member), and premium status.
2. **Given** an authenticated user who does not belong to a family group, **When** the app starts, **Then** the global store reflects that they have no family group membership.
3. **Given** a user who is not authenticated, **When** the app starts, **Then** the global store is not populated and no setup query is made.
4. **Given** the setup query fails (network error), **When** the app starts, **Then** the app displays a full-screen error state with a retry button and does not allow navigation to any other screen until the query succeeds.

---

### User Story 2 - Create a Family Group (Priority: P1)

A user who does not belong to a family group wants to create one. They tap the "Family Group" row in the Settings screen, which pushes a dedicated Family Group screen. From there, they enter a family name and become the owner. The global store updates immediately to reflect their new ownership.

**Why this priority**: Creating a family group is the foundational action. Without it, no other family feature can function.

**Independent Test**: Can be tested by creating a family group, verifying it appears in the global store, and confirming the user is shown as the owner.

**Acceptance Scenarios**:

1. **Given** an authenticated user with no family group, **When** they create a family group with a valid name, **Then** the group is created, the user becomes the owner, and the global store updates.
2. **Given** an authenticated user, **When** they attempt to create a family group with an empty name, **Then** a validation error is displayed.
3. **Given** a user who already belongs to a family group, **When** they attempt to create another, **Then** the system prevents creation and informs them they already belong to one.

---

### User Story 3 - View Family Group and Members (Priority: P1)

A family group member wants to see their family group details — the group name, the list of current members (with roles), and any pending invitations. This view is the hub for all family management.

**Why this priority**: Viewing the family group and its members is essential context for every other family action (inviting, removing, managing recipes).

**Independent Test**: Can be tested by navigating to the family group screen and verifying the group name, member list with roles, and pending invitations are displayed.

**Acceptance Scenarios**:

1. **Given** a user who is a member of a family group, **When** they navigate to the family section, **Then** they see the group name, all members with their roles, and pending invitations.
2. **Given** a user who is not a member of any family group, **When** they navigate to the family section, **Then** they see an option to create a family group.
3. **Given** a family group with pending invitations, **When** the owner views the family section, **Then** they see the invited email addresses and their pending status.

---

### User Story 4 - Invite Family Members (Priority: P1)

A family group owner wants to invite other users to join their family by entering an email address. The invitation is tracked as pending in the system. The owner can see who has been invited.

**Why this priority**: A family group with only one person has no collaborative value. Invitations are essential to making the feature useful.

**Independent Test**: Can be tested by sending an invitation, verifying it appears as pending in the family group view.

**Acceptance Scenarios**:

1. **Given** a family group owner, **When** they invite a valid email address, **Then** a pending invitation is created and appears in the family group view.
2. **Given** a family group owner, **When** they invite an email that is already a member of the family, **Then** an error indicates the person is already a member.
3. **Given** a family group owner, **When** they invite an email that already has a pending invitation, **Then** an error indicates an invitation is already pending.
4. **Given** a family group that has 20 members, **When** the owner tries to invite another, **Then** the system prevents the invitation and shows a member limit message.

---

### User Story 5 - Cancel Pending Invitations (Priority: P2)

A family group owner wants to cancel a pending invitation that hasn't been accepted yet.

**Why this priority**: Invitation management allows owners to correct mistakes or revoke invitations, but the core invite flow is sufficient for initial use.

**Independent Test**: Can be tested by sending an invitation, cancelling it, and verifying it no longer appears as pending.

**Acceptance Scenarios**:

1. **Given** a family group owner with pending invitations, **When** they cancel an invitation, **Then** the invitation is removed from the pending list.
2. **Given** a cancelled invitation, **When** the invited user later tries to accept it, **Then** the system informs them the invitation is no longer valid.

---

### User Story 6 - Browse Family Recipes (Priority: P2)

A family member wants to browse the shared family recipe library. The recipes screen provides a tab or toggle to switch between "My Recipes" and "Family Recipes." The family library shows all recipes shared by any family member, with attribution showing who contributed each one.

**Why this priority**: Viewing shared recipes is the core value proposition of family groups. Depends on family group existing and being populated in the store.

**Independent Test**: Can be tested by having two family members each add a recipe to the family library, then verifying both members can see both recipes with proper attribution.

**Acceptance Scenarios**:

1. **Given** a user who is a member of a family group, **When** they navigate to the recipes screen, **Then** they see a tab or toggle to switch between personal and family recipes.
2. **Given** a user viewing the family recipes tab, **When** recipes exist in the family library, **Then** each recipe shows the name of the family member who contributed it.
3. **Given** a user who is not a member of any family group, **When** they view the recipes screen, **Then** the family recipes tab is hidden or disabled with a prompt to create/join a family.

---

### User Story 7 - Share a Personal Recipe to the Family Library (Priority: P2)

A family member wants to share one of their personal recipes with the family. Sharing creates an independent copy in the family library. The original personal recipe remains unchanged.

**Why this priority**: This is how the family cookbook grows. Depends on both the recipe list and family group being in place.

**Independent Test**: Can be tested by sharing a personal recipe, verifying it appears in the family library for all members, and confirming the personal copy remains independent.

**Acceptance Scenarios**:

1. **Given** a family member viewing their personal recipes, **When** they share a recipe to the family library, **Then** a copy appears in the family library visible to all members.
2. **Given** a family member who shared a recipe, **When** they later edit the personal version, **Then** the family copy remains unchanged.
3. **Given** a family member, **When** they share a recipe that already exists in the family library (by name), **Then** the system creates the copy (duplicates are allowed since they may differ in content).

---

### User Story 8 - Edit and Delete Family Recipes (Priority: P3)

Any family member can edit or delete recipes in the family library. The system tracks who last modified a recipe. Deleting a family recipe soft-deletes it.

**Why this priority**: Collaborative editing transforms the family library from static to living. Depends on family recipes existing.

**Independent Test**: Can be tested by having one member edit a family recipe and verifying another member sees the updated version with attribution.

**Acceptance Scenarios**:

1. **Given** a family member viewing a family recipe, **When** they edit the recipe, **Then** the changes are saved and visible to all family members.
2. **Given** a family recipe that was edited, **When** any family member views it, **Then** they see who last modified it.
3. **Given** a family member viewing a family recipe, **When** they delete the recipe, **Then** it is removed from the family library for all members.

---

### User Story 9 - Remove Members and Leave Family (Priority: P3)

A family group owner can remove members. Any non-owner member can voluntarily leave. When a member is removed or leaves, their contributed family recipes remain in the library.

**Why this priority**: Membership management is important for long-term use but not needed for initial adoption.

**Independent Test**: Can be tested by removing a member, verifying they no longer see family recipes, while their contributed recipes remain.

**Acceptance Scenarios**:

1. **Given** a family group owner, **When** they remove a member, **Then** the member loses access to the family library but their contributed recipes remain.
2. **Given** a non-owner family member, **When** they choose to leave, **Then** they lose access to the family library but their contributed recipes remain.
3. **Given** a family group owner, **When** they attempt to remove themselves, **Then** the system prevents this and suggests deleting the family group instead.

---

### User Story 10 - Delete Family Group (Priority: P3)

A family group owner can delete the entire family group. All members lose access and all family recipes are removed.

**Why this priority**: Cleanup functionality needed for long-term management, not initial adoption.

**Independent Test**: Can be tested by deleting a family group and verifying all members revert to having no family group in the global store.

**Acceptance Scenarios**:

1. **Given** a family group owner, **When** they delete the family group, **Then** all members lose access, the group is removed, and all global stores update.
2. **Given** a family group owner, **When** they initiate deletion, **Then** they are shown a confirmation dialog before the action proceeds.

---

### Edge Cases

- What happens when the setup query returns stale family group data (e.g., user was removed from a family between sessions)? The store reflects the server's current state; if a subsequent family operation fails, the store refreshes.
- What happens when a user creates a family group while offline? The action fails with a network error; the app does not optimistically create the group.
- What happens if two family members edit the same family recipe simultaneously? Last-write-wins — the most recent save overwrites the previous one.
- What happens when the global store is populated but the user signs out? The store is cleared on sign-out.
- What happens when a family group owner deletes their account? Ownership transfers to the longest-standing member. If no other members exist, the family group is deleted. (Handled server-side.)
- What happens if the family group has only the owner and no other members? The owner can still use the family library, invite members, or delete the group.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST introduce a centralized global store with reactive middleware as the state layer for cross-cutting concerns in the mobile app.
- **FR-002**: System MUST execute a setup query on app startup (when authenticated) that fetches user profile data including premium status, family group membership, and family role.
- **FR-003**: System MUST populate the global store with the setup query results and make this data available to all screens. If the setup query fails, the app MUST display a full-screen error with retry and block all navigation until the query succeeds.
- **FR-004**: System MUST clear the global store when the user signs out.
- **FR-005**: System MUST allow authenticated users to create a family group with a name (1-100 characters).
- **FR-006**: System MUST enforce a limit of one family group membership per user.
- **FR-007**: System MUST allow family group owners to invite users by email address.
- **FR-008**: System MUST create pending invitations that are visible in the family group view.
- **FR-009**: System MUST prevent duplicate pending invitations to the same email for the same family group.
- **FR-010**: System MUST allow family group owners to cancel pending invitations.
- **FR-011**: System MUST allow all family members to view all recipes in the family library.
- **FR-012**: System MUST display a tab or toggle on the recipes screen to switch between personal and family recipes.
- **FR-013**: System MUST allow family members to share (copy) personal recipes to the family library, including associated ingredients.
- **FR-014**: System MUST keep personal recipes and family recipe copies independent.
- **FR-015**: System MUST allow any family member to edit any recipe in the family library.
- **FR-016**: System MUST track and display the contributor and last modifier of each family recipe.
- **FR-017**: System MUST allow any family member to delete family recipes (soft-delete).
- **FR-018**: System MUST allow family group owners to remove members from the family.
- **FR-019**: System MUST allow non-owner members to voluntarily leave a family group.
- **FR-020**: System MUST preserve family recipes when a contributing member is removed or leaves.
- **FR-021**: System MUST allow family group owners to delete the entire family group.
- **FR-022**: System MUST enforce a maximum of 20 members per family group.
- **FR-023**: System MUST show recipe attribution (who contributed/shared each recipe) in the family library view.
- **FR-024**: System MUST update the global store reactively when family group state changes (creation, deletion, membership changes).
- **FR-025**: System MUST hide or disable the family recipes tab for users who do not belong to a family group.

### Key Entities

- **User Profile (Global Store)**: The authenticated user's profile data bootstrapped on app startup. Contains: premium status (boolean), family group ID (nullable), family role (owner or member, nullable), and family group name (nullable). Kept in sync with server state. Additional fields may be added incrementally as future features require them.
- **Family Group**: A named shared recipe space. Has an owner, a name, members, and a creation date. Each user can belong to at most one.
- **Family Invitation**: A pending invitation to join a family group. Contains the invited email, status (pending, accepted, declined, expired, cancelled), and the inviting user.
- **Family Recipe**: A recipe scoped to the family library rather than a personal collection. Tracks the original contributor and last modifier. Structurally identical to a personal recipe but belongs to the family group.
- **Family Member**: A user who belongs to a family group, with a role of either owner or member.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Authenticated users see their family group status reflected in the app within 2 seconds of launch.
- **SC-002**: Users can create a family group and invite their first member in under 2 minutes.
- **SC-003**: Family members can switch between personal and family recipe views in a single tap.
- **SC-004**: A newly shared recipe appears in the family library immediately for the sharing user and on next refresh for other members.
- **SC-005**: Users can distinguish between personal and family recipes without confusion — the tab/toggle is the primary navigation mechanism.
- **SC-006**: The family recipe library supports at least 500 recipes per family group without noticeable performance degradation on mobile.
- **SC-007**: Global store data remains consistent with server state — signing out fully clears family group data.

## Clarifications

### Session 2026-03-17

- Q: What is the navigation structure for family management? → A: Dedicated Family Group screen pushed from a row in the Settings screen (Settings > Family Group).
- Q: What global data does the setup query fetch beyond family status? → A: Premium status + family group data (membership, role, group name) — minimal bootstrap. Additional fields added incrementally as needed.
- Q: If the setup query fails, should the entire app be blocked or just family features? → A: Block entire app — show full-screen error with retry. Setup data is considered critical for all screens.

## Assumptions

- The web app's family group API (GraphQL) already exists and is fully functional. The mobile app consumes the same API — no new backend work is required.
- Redux and redux-observable are being introduced for the first time in the mobile app. The current app uses React Context and Apollo Client for state management. Redux will serve as the global store for cross-cutting concerns (user profile, family status), while Apollo Client continues to handle GraphQL query caching for screen-specific data.
- The setup query is a single GraphQL query that returns: premium status and family group data (membership, role, group name). This query may need to be created or extended on the API side. Additional profile fields can be added incrementally as future features require them.
- Accepting an invitation from an email link/deep link is out of scope for this iteration. Invitations are sent but acceptance happens via the web app or a future mobile feature.
- Family group names must be unique within a tenant (enforced server-side).
- Ingredient data is included when copying a recipe to the family library (handled by the existing API).
- Meal plan and shopping list integration with family recipes is deferred to a future iteration.
- The family management UI is a dedicated screen pushed from a "Family Group" row in the Settings screen. This screen contains group creation, member list, invitation management, and group settings.
