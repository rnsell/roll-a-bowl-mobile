# Implementation Plan: Mobile Family Groups

**Branch**: `005-mobile-family-groups` | **Date**: 2026-03-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-mobile-family-groups/spec.md`

## Summary

Add Family Groups to the mobile app — matching the web app's family group functionality. Introduces Redux Toolkit + redux-observable as the global state layer for cross-cutting concerns. On authenticated startup, a bootstrap epic fetches user profile and family group data into the Redux store, gating the entire app behind a loading/error screen. Family management lives on a dedicated screen pushed from Settings. Recipe browsing gains a "My Recipes" / "Family Recipes" tab toggle. All data comes from the existing GraphQL API (no backend changes).

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)
**Primary Dependencies**: React Native 0.81, Expo 54, Expo Router 6, @apollo/client 4.x, @reduxjs/toolkit, react-redux, redux-observable, rxjs
**Storage**: Redux store (in-memory, cross-cutting state), Apollo InMemoryCache (query cache), SecureStore (auth tokens)
**Testing**: Jest (bundled with Expo), React Native Testing Library
**Target Platform**: iOS + Android (Expo managed workflow)
**Project Type**: Mobile app (React Native / Expo)
**Performance Goals**: 60fps animations, setup query < 2 seconds, tab switching instant
**Constraints**: No native module development outside Expo managed workflow; offline operations fail gracefully (no optimistic mutations)
**Scale/Scope**: Max 20 family members, 500+ family recipes per group, 5 existing screens + 1 new screen + recipe tab modifications

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First UX | PASS | Family Group screen uses stack navigation via Expo Router. All interactive elements use design system Button/ContentRow (44pt+ touch targets). Bootstrap error/loading gate prevents blank screens. Safe areas respected via SafeAreaBox. |
| II. Performance | PASS | Redux store updates are synchronous (no animation jank). GraphQL queries via Apollo Client (async, off main thread). No heavy computations on JS thread. New deps (Redux Toolkit, redux-observable, rxjs) are well-maintained and necessary. |
| III. Type Safety | PASS | All Redux slices, actions, and selectors fully typed. GraphQL operations use codegen types. Typed hooks (useAppSelector, useAppDispatch). No `any` usage. |
| IV. Simplicity (YAGNI) | PASS | Redux introduced for a concrete need (cross-cutting bootstrap state). Two slices only (user, familyGroup). redux-observable for the reactive bootstrap pattern requested by user. No premature abstractions. |
| V. Cross-Platform Parity | PASS | No platform-specific code needed. All components use React Native primitives + design system. Alert.alert for confirmation dialogs works cross-platform. |

**Post-Design Re-check**: All principles satisfied. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/005-mobile-family-groups/
├── plan.md                              # This file
├── spec.md                              # Feature specification
├── research.md                          # Phase 0 research decisions
├── data-model.md                        # Phase 1 client-side data model
├── quickstart.md                        # Phase 1 implementation guide
├── contracts/
│   └── family-group-operations.graphql  # GraphQL operations contract
├── checklists/
│   └── requirements.md                  # Spec quality checklist
└── tasks.md                             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
store/
├── index.ts                        # configureStore with epicMiddleware
├── root-reducer.ts                 # combineReducers (user + familyGroup)
├── root-epic.ts                    # combineEpics
├── types.ts                        # RootState, AppDispatch exports
├── hooks.ts                        # useAppSelector, useAppDispatch
├── user/
│   ├── index.ts                    # re-exports
│   ├── user-slice.ts               # createSlice: profile, status, error
│   ├── user-types.ts               # UserProfile interface
│   └── user-epic.ts                # bootstrapUserEpic
└── family-group/
    ├── index.ts                    # re-exports
    ├── family-group-slice.ts       # createSlice: group, invitations, status
    ├── family-group-types.ts       # FamilyGroup, FamilyMember, FamilyInvitation
    └── family-group-epic.ts        # family group management epics

graphql/
└── operations/
    ├── index.ts                    # MODIFY: re-export family operations
    ├── user-setup.ts               # NEW: GetCurrentUserProfile + GetMyFamilyGroup
    └── family-group.ts             # NEW: all family group queries + mutations

components/
└── BootstrapGate.tsx               # NEW: loading/error gate for setup query

screens/
├── settings/
│   └── SettingsScreen.tsx          # MODIFY: add "Family Group" row
├── family-group/
│   ├── FamilyGroupScreen.tsx       # NEW: main family screen (create vs. details)
│   ├── CreateFamilyGroupForm.tsx   # NEW: name input + create
│   ├── FamilyGroupDetails.tsx      # NEW: group info, members, invitations
│   ├── InviteMemberForm.tsx        # NEW: email input + invite button
│   ├── PendingInvitationsList.tsx  # NEW: pending invitations with cancel
│   └── MemberRow.tsx               # NEW: member display with remove action
└── recipes/
    ├── RecipesScreen.tsx           # MODIFY: add tab toggle
    ├── RecipeCard.tsx              # MODIFY: add share-to-family action
    ├── RecipesTabs.tsx             # NEW: segmented control component
    ├── FamilyRecipeCard.tsx        # NEW: recipe card with contributor
    ├── FamilyRecipesList.tsx       # NEW: family recipes list
    └── ShareToFamilyButton.tsx     # NEW: share action component

app/
├── _layout.tsx                     # MODIFY: add Redux Provider + BootstrapGate
└── family-group.tsx                # NEW: Expo Router stack screen
```

**Structure Decision**: Mobile-only project. Follows existing conventions: screens in `screens/`, Expo Router pages in `app/`, design system in `design-system/`. New `store/` directory at root for Redux (parallel to existing `graphql/`, `screens/`, `components/`). No backend code — consumes existing API.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Redux + redux-observable (new dependencies) | User explicitly requested Redux as global store and redux-observable as middleware. Serves a concrete need: reactive bootstrap query on auth state change, cross-cutting family status available to all screens. | Context API alone cannot express the reactive epic pattern needed for setup query orchestration. Apollo reactive variables lack middleware for side effects. |
