# Quickstart: Mobile Family Groups

**Feature Branch**: `005-mobile-family-groups` | **Date**: 2026-03-17

## Prerequisites

- Bun runtime installed
- Existing codebase on `005-mobile-family-groups` branch
- roll-a-bowl API running locally (family group endpoints available)
- Expo development server

## Implementation Order

Follow this order to build incrementally with testable milestones at each step.

### Step 1: Install Redux + redux-observable Dependencies

Add Redux Toolkit, react-redux, redux-observable, and rxjs to the project.

**Files to modify**:
- `package.json` — add dependencies

**Verify**: `npm install` completes, `npx tsc --noEmit` passes

### Step 2: Redux Store Setup

Create the Redux store with redux-observable middleware. Wire the store provider into the app root layout above the existing providers.

**Files to create**:
- `store/index.ts` — configureStore with epicMiddleware
- `store/root-reducer.ts` — combineReducers placeholder
- `store/root-epic.ts` — combineEpics placeholder
- `store/types.ts` — RootState, AppDispatch type exports
- `store/hooks.ts` — typed useAppSelector, useAppDispatch hooks

**Files to modify**:
- `app/_layout.tsx` — wrap with Redux Provider (above GraphQLProvider)

**Verify**: App starts, Redux DevTools show empty store (if using Flipper/React Native Debugger)

### Step 3: User Slice + Bootstrap Epic

Create the user slice with profile, status, and error fields. Create the bootstrap epic that fires on auth state change and executes the setup query (me + myFamilyGroup).

**Files to create**:
- `store/user/user-slice.ts` — createSlice with profile, status, error
- `store/user/user-types.ts` — UserProfile interface
- `store/user/user-epic.ts` — bootstrapUserEpic
- `store/user/index.ts` — re-exports

**Files to modify**:
- `store/root-reducer.ts` — add user reducer
- `store/root-epic.ts` — add bootstrapUserEpic

**GraphQL operations to add**:
- `graphql/operations/user-setup.ts` — GetCurrentUserProfile + GetMyFamilyGroup queries

**Verify**: Login → store shows user profile with family data. Sign out → store cleared. Network error → store shows error status.

### Step 4: Full-Screen Bootstrap Error / Loading Gate

Add a loading/error gate that blocks the app when the setup query is in progress or has failed. Shows a spinner during loading and a full-screen error with retry on failure.

**Files to create**:
- `components/BootstrapGate.tsx` — reads user.status from store, renders loading/error/children

**Files to modify**:
- `app/_layout.tsx` — wrap tab navigator with BootstrapGate (inside AuthGate, after Provider)

**Verify**: Kill network → app shows error screen with retry. Restore network → retry succeeds → app loads.

### Step 5: Family Group Screen (Settings Integration)

Add a "Family Group" row to the Settings screen that pushes to a new dedicated Family Group screen. The screen shows different states: no family (create form) vs. has family (group details + members).

**Files to create**:
- `app/family-group.tsx` — Expo Router stack screen
- `screens/family-group/FamilyGroupScreen.tsx` — main screen component
- `screens/family-group/CreateFamilyGroupForm.tsx` — name input + create button
- `screens/family-group/FamilyGroupDetails.tsx` — group name, member list, invitations

**Files to modify**:
- `screens/settings/SettingsScreen.tsx` — add "Family Group" ContentRow with navigation
- `app/_layout.tsx` — add family-group to Stack if using stack layout

**Verify**: Settings → tap Family Group → see create form (no family) or group details (has family).

### Step 6: Create Family Group Mutation

Wire up the create family group form to call the `createFamilyGroup` mutation. On success, update both the Redux store (user.profile.familyGroupId) and navigate to the group details view.

**Files to create**:
- `graphql/operations/family-group.ts` — CreateFamilyGroup mutation
- `store/family-group/family-group-slice.ts` — createSlice for detailed group data
- `store/family-group/family-group-types.ts` — FamilyGroup, FamilyMember, FamilyInvitation types
- `store/family-group/family-group-epic.ts` — epics for family group operations
- `store/family-group/index.ts` — re-exports

**Files to modify**:
- `screens/family-group/CreateFamilyGroupForm.tsx` — dispatch create action
- `store/root-reducer.ts` — add familyGroup reducer
- `store/root-epic.ts` — add family group epics

**Verify**: Enter name → create → store updates → screen shows group details with user as owner.

### Step 7: Invite Family Members

Add an invite form to the family group details screen (owner only). Shows a text input for email and a send button. Pending invitations appear in a list below.

**Files to create**:
- `screens/family-group/InviteMemberForm.tsx` — email input + invite button
- `screens/family-group/PendingInvitationsList.tsx` — list of pending invitations with cancel

**Files to modify**:
- `screens/family-group/FamilyGroupDetails.tsx` — add invite form + invitations list (owner only)
- `graphql/operations/family-group.ts` — add InviteFamilyMember, CancelFamilyInvitation, GetFamilyGroupInvitations

**Verify**: Owner invites email → appears in pending list. Cancel → removed from list. Non-owner doesn't see invite form.

### Step 8: Member Management (Remove + Leave)

Add remove member action for owners and leave family action for non-owners.

**Files to create**:
- `screens/family-group/MemberRow.tsx` — member display with remove button (owner only)

**Files to modify**:
- `screens/family-group/FamilyGroupDetails.tsx` — use MemberRow, add leave button for non-owners
- `graphql/operations/family-group.ts` — add RemoveFamilyMember, LeaveFamilyGroup mutations

**Verify**: Owner removes member → member disappears. Non-owner leaves → redirected to create form. Contributed recipes remain.

### Step 9: Delete Family Group

Add delete group action for owners with confirmation dialog.

**Files to modify**:
- `screens/family-group/FamilyGroupDetails.tsx` — add delete button (owner only) with Alert.alert confirmation
- `graphql/operations/family-group.ts` — add DeleteFamilyGroup mutation

**Verify**: Owner deletes → confirmation → group removed → all members' stores update → create form shown.

### Step 10: Recipes Tab Toggle (My Recipes / Family Recipes)

Add a segmented control or tab toggle to the Recipes screen. When user has a family group, show both tabs. Family tab fetches and displays family recipes with contributor attribution.

**Files to create**:
- `screens/recipes/RecipesTabs.tsx` — segmented control component
- `screens/recipes/FamilyRecipeCard.tsx` — recipe card with contributor name
- `screens/recipes/FamilyRecipesList.tsx` — family recipes list using Apollo query

**Files to modify**:
- `screens/recipes/RecipesScreen.tsx` — add tabs, conditionally show family tab based on store
- `graphql/operations/family-group.ts` — add GetFamilyRecipes query

**Verify**: User with family → sees both tabs. Tap "Family Recipes" → see family recipes with attribution. User without family → no toggle.

### Step 11: Share Recipe to Family

Add a "Share to Family" action on personal recipe cards (for users with a family group).

**Files to create**:
- `screens/recipes/ShareToFamilyButton.tsx` — button component

**Files to modify**:
- `screens/recipes/RecipeCard.tsx` — add share button (conditional on family membership)
- `graphql/operations/family-group.ts` — add ShareRecipeToFamily mutation

**Verify**: Tap share → recipe copied to family library → appears in family tab.

### Step 12: Edit and Delete Family Recipes

Add edit and delete actions on family recipe cards/detail views.

**Files to modify**:
- `screens/recipes/FamilyRecipeCard.tsx` — add edit/delete actions
- `graphql/operations/family-group.ts` — add UpdateFamilyRecipe, DeleteFamilyRecipe, GetFamilyRecipe

**Verify**: Edit family recipe → changes visible. Delete → removed from list. Attribution updated on edit.

## Verification

After all steps:

```bash
npx tsc --noEmit && npm run lint
```

Manual testing:
1. Fresh login → bootstrap loads → app accessible
2. Settings > Family Group > Create → store updates
3. Invite member → pending list shows
4. Recipes > Family tab → see shared recipes
5. Share personal recipe → appears in family tab
6. Sign out → store cleared → sign back in → state restored from server
