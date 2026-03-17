# Tasks: Mobile Family Groups

**Input**: Design documents from `/specs/005-mobile-family-groups/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not explicitly requested. Test tasks omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and create Redux store scaffolding

- [x] T001 Install Redux Toolkit, react-redux, redux-observable, and rxjs dependencies in package.json
- [x] T002 Create Redux store types and typed hooks in store/types.ts and store/hooks.ts
- [x] T003 Create root reducer placeholder in store/root-reducer.ts
- [x] T004 Create root epic placeholder in store/root-epic.ts
- [x] T005 Create and configure Redux store with epicMiddleware in store/index.ts
- [x] T006 Add Redux Provider to app root layout in app/_layout.tsx (wrap above existing GraphQLProvider)

**Checkpoint**: App starts with empty Redux store. Existing functionality unaffected.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: GraphQL operations and shared types that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 [P] Create user setup GraphQL operations (GetCurrentUserProfile + GetMyFamilyGroup) in graphql/operations/user-setup.ts
- [x] T008 [P] Create family group GraphQL mutations and queries in graphql/operations/family-group.ts (CreateFamilyGroup, DeleteFamilyGroup, InviteFamilyMember, CancelFamilyInvitation, RemoveFamilyMember, LeaveFamilyGroup, GetFamilyGroupInvitations, GetFamilyRecipes, GetFamilyRecipe, ShareRecipeToFamily, CreateFamilyRecipe, UpdateFamilyRecipe, DeleteFamilyRecipe)
- [x] T009 Update graphql/operations/index.ts to re-export new family group operations
- [x] T010 Run GraphQL codegen to generate typed operations (npx graphql-codegen)
- [x] T011 [P] Create user slice types (UserProfile interface) in store/user/user-types.ts
- [x] T012 [P] Create family group slice types (FamilyGroup, FamilyMember, FamilyInvitation interfaces) in store/family-group/family-group-types.ts

**Checkpoint**: All GraphQL operations defined and typed. Redux type foundations in place. `npx tsc --noEmit` passes.

---

## Phase 3: User Story 1 - Bootstrap Global User State on Login (Priority: P1) MVP

**Goal**: On authenticated app startup, fetch user profile + family group data into Redux store. Block app with full-screen loading/error until setup query succeeds.

**Independent Test**: Login → store populated with profile + family data. Sign out → store cleared. Network error → full-screen error with retry.

### Implementation for User Story 1

- [x] T013 [US1] Create user slice (profile, status, error) with actions (bootstrapStart, bootstrapSuccess, bootstrapFailure, clearUser) in store/user/user-slice.ts
- [x] T014 [US1] Create bootstrap thunk in store/user/user-epic.ts — executes GetCurrentUserProfile + GetMyFamilyGroup via Apollo Client (switched from redux-observable to createAsyncThunk for simpler Apollo Client integration)
- [x] T015 [US1] Create re-export barrel in store/user/index.ts
- [x] T016 [US1] Register user reducer in store/root-reducer.ts
- [x] T017 [US1] Create BootstrapGate component in components/BootstrapGate.tsx — reads user.status from store, renders ActivityIndicator during loading, full-screen error with retry Button on failure, children on ready
- [x] T018 [US1] Integrate BootstrapGate into app/_layout.tsx — wrap inside AuthGate, dispatch bootstrapStart when auth token available, dispatch clearUser on sign out
- [x] T019 [US1] Verify sign-out clears Redux store (dispatch clearUser in sign-out flow in screens/settings/SettingsScreen.tsx)

**Checkpoint**: Authenticated launch → loading screen → profile loaded → app renders. Network failure → error screen with retry. Sign out → store cleared.

---

## Phase 4: User Story 2 - Create a Family Group (Priority: P1)

**Goal**: Users without a family group can create one from a dedicated Family Group screen pushed from Settings. Store updates to reflect ownership.

**Independent Test**: Settings → Family Group → enter name → create → store shows familyGroupId and role=owner.

### Implementation for User Story 2

- [x] T020 [US2] Create family group slice (group, invitations, status, error) with actions in store/family-group/family-group-slice.ts
- [x] T021 [US2] Create family group thunks in store/family-group/family-group-epic.ts — createFamilyGroup, fetchFamilyGroup, inviteFamilyMember, cancelFamilyInvitation, removeFamilyMember, leaveFamilyGroup, deleteFamilyGroup
- [x] T022 [US2] Create re-export barrel in store/family-group/index.ts
- [x] T023 [US2] Register family group reducer in store/root-reducer.ts
- [x] T024 [US2] Create CreateFamilyGroupForm component in screens/family-group/CreateFamilyGroupForm.tsx — name TextInput (1-100 chars validation), create Button, error display
- [x] T025 [US2] Create FamilyGroupScreen in screens/family-group/FamilyGroupScreen.tsx — reads user.profile.familyGroupId from store, renders CreateFamilyGroupForm (no family) or FamilyGroupDetails placeholder (has family)
- [x] T026 [US2] Create Expo Router screen in app/family-group.tsx — stack screen rendering FamilyGroupScreen
- [x] T027 [US2] Add "Family Group" ContentRow to screens/settings/SettingsScreen.tsx — navigates to /family-group via router.push

**Checkpoint**: Settings → Family Group → create → store updated → screen transitions to group details view.

---

## Phase 5: User Story 3 - View Family Group and Members (Priority: P1)

**Goal**: Family group members see group name, member list with roles, and pending invitations on the Family Group screen.

**Independent Test**: Navigate to Family Group screen → see group name, members (with owner/member labels), pending invitations.

### Implementation for User Story 3

- [x] T028 [US3] Add fetchFamilyGroup thunk to store/family-group/family-group-epic.ts — fetches myFamilyGroup + familyGroupInvitations, populates group and invitations in slice
- [x] T029 [US3] Create MemberRow component in screens/family-group/MemberRow.tsx — displays member name, email, role badge (Owner/Member), using design system ContentRow and Label
- [x] T030 [US3] Create FamilyGroupDetails component in screens/family-group/FamilyGroupDetails.tsx — group name Heading, member list (MemberRow for each), pending invitations section (owner only)
- [x] T031 [US3] Update FamilyGroupScreen in screens/family-group/FamilyGroupScreen.tsx — dispatch fetchFamilyGroup on mount when user has family, render FamilyGroupDetails with data from store

**Checkpoint**: Family Group screen shows group name, all members with roles, and pending invitations for owners.

---

## Phase 6: User Story 4 - Invite Family Members (Priority: P1)

**Goal**: Family group owners can invite users by email. Pending invitations appear in the family group view.

**Independent Test**: Owner enters email → invite → invitation appears in pending list. Duplicate/already-member errors shown.

### Implementation for User Story 4

- [x] T032 [US4] Add inviteFamilyMember thunk to store/family-group/family-group-epic.ts — calls InviteFamilyMember mutation, adds new invitation to slice on success, handles error
- [x] T033 [US4] Create InviteMemberForm component in screens/family-group/InviteMemberForm.tsx — email TextInput with basic email validation, invite Button, error display
- [x] T034 [US4] Create PendingInvitationsList component in screens/family-group/PendingInvitationsList.tsx — lists pending invitations with email and cancel action
- [x] T035 [US4] Integrate InviteMemberForm and PendingInvitationsList into FamilyGroupDetails in screens/family-group/FamilyGroupDetails.tsx (owner only, conditionally rendered based on user role from store)

**Checkpoint**: Owner invites email → appears in pending list. Error messages for duplicates and member limit.

---

## Phase 7: User Story 5 - Cancel Pending Invitations (Priority: P2)

**Goal**: Family group owners can cancel pending invitations.

**Independent Test**: Owner sees pending invitation → cancel → removed from list.

### Implementation for User Story 5

- [x] T036 [US5] Add cancelFamilyInvitation thunk to store/family-group/family-group-epic.ts — calls CancelFamilyInvitation mutation, removes invitation from slice on success
- [x] T037 [US5] Add cancel action to PendingInvitationsList in screens/family-group/PendingInvitationsList.tsx — destructive Button per invitation row, dispatches cancel action

**Checkpoint**: Owner cancels invitation → removed from pending list immediately.

---

## Phase 8: User Story 6 - Browse Family Recipes (Priority: P2)

**Goal**: Recipes screen shows a tab toggle between "My Recipes" and "Family Recipes". Family tab lists recipes with contributor attribution.

**Independent Test**: User with family → Recipes screen shows toggle → tap "Family Recipes" → see family recipes with contributor names. User without family → no toggle.

### Implementation for User Story 6

- [x] T038 [US6] Create RecipesTabs segmented control component in screens/recipes/RecipesTabs.tsx — two segments ("My Recipes", "Family Recipes"), controlled active state
- [x] T039 [US6] Create FamilyRecipeCard component in screens/recipes/FamilyRecipeCard.tsx — displays recipe name, contributor name, using design system Card
- [x] T040 [US6] Create FamilyRecipesList component in screens/recipes/FamilyRecipesList.tsx — uses Apollo useQuery with GetFamilyRecipes, renders list of FamilyRecipeCard, loading and empty states
- [x] T041 [US6] Update RecipesScreen in screens/recipes/RecipesScreen.tsx — read user.profile.familyGroupId from store, conditionally render RecipesTabs, switch between recipe list and FamilyRecipesList

**Checkpoint**: Recipes screen shows toggle for family members. Family tab displays recipes with attribution. Non-members see no toggle.

---

## Phase 9: User Story 7 - Share a Personal Recipe to the Family Library (Priority: P2)

**Goal**: Family members can share personal recipes to the family library (creates independent copy).

**Independent Test**: View personal recipe → tap share → recipe appears in family tab.

### Implementation for User Story 7

- [x] T042 [US7] Create ShareToFamilyButton component in screens/recipes/ShareToFamilyButton.tsx — Button that calls ShareRecipeToFamily mutation via Apollo, shows success/error feedback
- [x] T043 [US7] Add ShareToFamilyButton to RecipeCard in screens/recipes/RecipeCard.tsx — conditionally rendered when user has a family group (from store), passes recipe slug

**Checkpoint**: Share personal recipe → appears in family recipes tab. Personal copy remains unchanged.

---

## Phase 10: User Story 8 - Edit and Delete Family Recipes (Priority: P3)

**Goal**: Any family member can edit or delete family recipes. Attribution tracks last modifier.

**Independent Test**: Edit family recipe → changes visible with updated attribution. Delete → removed from list.

### Implementation for User Story 8

- [x] T044 [US8] Add delete action to FamilyRecipeCard in screens/recipes/FamilyRecipeCard.tsx — delete triggers Alert.alert confirmation then DeleteFamilyRecipe mutation
- [x] T045 [US8] Handle DeleteFamilyRecipe mutation in screens/recipes/FamilyRecipesList.tsx via Apollo cache refetch after mutation success

**Checkpoint**: Edit family recipe → changes saved, attribution updated. Delete → confirmation → removed.

---

## Phase 11: User Story 9 - Remove Members and Leave Family (Priority: P3)

**Goal**: Owners can remove members. Non-owners can leave. Contributed recipes remain.

**Independent Test**: Owner removes member → member gone, recipes remain. Non-owner leaves → redirected to create form.

### Implementation for User Story 9

- [x] T046 [US9] Add removeFamilyMember and leaveFamilyGroup thunks to store/family-group/family-group-epic.ts
- [x] T047 [US9] Add remove Button to MemberRow in screens/family-group/MemberRow.tsx — shown only for owner (not on self), Alert.alert confirmation
- [x] T048 [US9] Add "Leave Family" Button to FamilyGroupDetails in screens/family-group/FamilyGroupDetails.tsx — shown only for non-owner members, Alert.alert confirmation

**Checkpoint**: Owner removes member → member disappears. Non-owner leaves → store cleared → create form shown.

---

## Phase 12: User Story 10 - Delete Family Group (Priority: P3)

**Goal**: Owners can delete the entire family group with confirmation.

**Independent Test**: Owner deletes group → confirmation → all members lose access → store cleared.

### Implementation for User Story 10

- [x] T049 [US10] Add deleteFamilyGroup thunk to store/family-group/family-group-epic.ts — calls DeleteFamilyGroup mutation, clears both familyGroup slice and user family fields on success
- [x] T050 [US10] Add "Delete Family Group" Button to FamilyGroupDetails in screens/family-group/FamilyGroupDetails.tsx — shown only for owner, destructive style, Alert.alert confirmation with warning text

**Checkpoint**: Owner deletes group → confirmation → store cleared → create form shown.

---

## Phase 13: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T051 [P] Verify TypeScript compilation passes with no errors (npx tsc --noEmit)
- [ ] T052 [P] Verify lint passes (npm run lint)
- [x] T053 [P] Review all loading and error states across family group screens for consistency (ActivityIndicator for loading, error messages with retry)
- [x] T054 Verify sign-out flow fully clears Redux store and resets all family state
- [ ] T055 End-to-end manual test: fresh login → create family → invite → recipes tab → share recipe → sign out → sign back in → state restored

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **US1 Bootstrap (Phase 3)**: Depends on Foundational - BLOCKS all other user stories (store must be bootstrapping before any family UI renders)
- **US2 Create Group (Phase 4)**: Depends on US1 (needs store + bootstrap gate)
- **US3 View Group (Phase 5)**: Depends on US2 (needs create to have a group to view)
- **US4 Invite Members (Phase 6)**: Depends on US3 (needs group details screen)
- **US5 Cancel Invitations (Phase 7)**: Depends on US4 (needs invitations to cancel)
- **US6 Browse Family Recipes (Phase 8)**: Depends on US1 (needs familyGroupId in store) — can run in parallel with US2-US5 if group data is seeded
- **US7 Share Recipes (Phase 9)**: Depends on US6 (needs family recipes tab)
- **US8 Edit/Delete Recipes (Phase 10)**: Depends on US6 (needs family recipes display)
- **US9 Remove/Leave (Phase 11)**: Depends on US3 (needs member list display)
- **US10 Delete Group (Phase 12)**: Depends on US3 (needs group details screen)
- **Polish (Phase 13)**: Depends on all desired user stories being complete

### User Story Dependencies

```
Phase 1 (Setup) → Phase 2 (Foundational)
    │
    └──► Phase 3 (US1: Bootstrap) ──► Phase 4 (US2: Create) ──► Phase 5 (US3: View)
                                                                       │
                                                           ┌───────────┼───────────┐
                                                           ▼           ▼           ▼
                                                   Phase 6 (US4)  Phase 11 (US9) Phase 12 (US10)
                                                       │
                                                       ▼
                                                   Phase 7 (US5)

         Phase 3 (US1) ──► Phase 8 (US6: Family Recipes)
                                    │
                              ┌─────┴─────┐
                              ▼           ▼
                       Phase 9 (US7)  Phase 10 (US8)
```

### Parallel Opportunities

- **Phase 2**: T007, T008, T011, T012 can all run in parallel (different files)
- **Phase 8-10** (US6-US8) can run in parallel with **Phases 6-7** (US4-US5) since they touch different screen directories
- **Phase 11-12** (US9-US10) can run in parallel with each other (both modify FamilyGroupDetails but different sections)
- **Phase 13**: T051, T052, T053 can run in parallel

---

## Parallel Example: Foundational Phase

```bash
# Launch all independent foundational tasks together:
Task: "Create user setup GraphQL operations in graphql/operations/user-setup.ts"
Task: "Create family group GraphQL operations in graphql/operations/family-group.ts"
Task: "Create user slice types in store/user/user-types.ts"
Task: "Create family group slice types in store/family-group/family-group-types.ts"
```

## Parallel Example: After US3 Completes

```bash
# These story phases can proceed in parallel (different screen areas):
# Stream A: Family Management
Task: "Phase 6 (US4: Invite Members)"
Task: "Phase 7 (US5: Cancel Invitations)"

# Stream B: Family Recipes
Task: "Phase 8 (US6: Browse Family Recipes)"
Task: "Phase 9 (US7: Share Recipes)"
Task: "Phase 10 (US8: Edit/Delete Recipes)"

# Stream C: Membership Management
Task: "Phase 11 (US9: Remove/Leave)"
Task: "Phase 12 (US10: Delete Group)"
```

---

## Implementation Strategy

### MVP First (User Stories 1-4)

1. Complete Phase 1: Setup (Redux scaffolding)
2. Complete Phase 2: Foundational (GraphQL ops + types)
3. Complete Phase 3: US1 Bootstrap (setup query + gate)
4. Complete Phase 4: US2 Create Group
5. Complete Phase 5: US3 View Group
6. Complete Phase 6: US4 Invite Members
7. **STOP and VALIDATE**: Core family management functional and testable
8. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Redux store operational
2. US1 Bootstrap → App gates on setup query (MVP foundation)
3. US2 + US3 + US4 → Family creation + viewing + inviting (core loop)
4. US5 → Cancel invitations (management polish)
5. US6 + US7 → Family recipes browsing + sharing (recipe value)
6. US8 → Edit/delete family recipes (recipe management)
7. US9 + US10 → Remove/leave + delete group (lifecycle management)
8. Polish → Final validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No tests generated (not explicitly requested in spec)
- All GraphQL operations consume the existing web app API — no backend changes
- Redux store updates should always go through epics for mutations (not direct dispatch from components)
- Apollo Client continues to handle screen-level query caching (family recipes list) — Redux only for cross-cutting state
- Commit after each phase completion for clean history
