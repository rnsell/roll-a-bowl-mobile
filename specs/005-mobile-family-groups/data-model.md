# Data Model: Mobile Family Groups

**Feature Branch**: `005-mobile-family-groups` | **Date**: 2026-03-17

This document describes the client-side data model — the Redux store shape and GraphQL types consumed by the mobile app. The server-side data model is defined in `roll-a-bowl-api/specs/019-family-groups/data-model.md`.

---

## Redux Store

### Root State

```
RootState
├── user: UserState
└── familyGroup: FamilyGroupState
```

---

### Slice: `user`

Bootstrapped on app startup when the user is authenticated. Drives all conditional UI.

| Field    | Type                                        | Description                                         |
|----------|---------------------------------------------|-----------------------------------------------------|
| profile  | UserProfile \| null                         | Populated after setup query succeeds                |
| status   | 'idle' \| 'loading' \| 'ready' \| 'error'  | Tracks bootstrap lifecycle                          |
| error    | string \| null                              | Error message if setup query fails                  |

### Type: UserProfile

| Field           | Type              | Source Query    | Description                                    |
|-----------------|-------------------|-----------------|------------------------------------------------|
| id              | number            | `me`            | User ID                                        |
| email           | string            | `me`            | User email                                     |
| firstName       | string            | `me`            | First name                                     |
| lastName        | string            | `me`            | Last name                                      |
| isPremium       | boolean           | TBD             | Premium subscription status                    |
| familyGroupId   | number \| null    | `myFamilyGroup` | Family group ID if member, null otherwise      |
| familyRole      | 'owner' \| 'member' \| null | `myFamilyGroup` | Role in family group              |
| familyGroupName | string \| null    | `myFamilyGroup` | Family group name for display                  |

**State Transitions**:
- `idle` → `loading`: Auth detected, setup query dispatched
- `loading` → `ready`: Setup query succeeded, profile populated
- `loading` → `error`: Setup query failed
- `error` → `loading`: User tapped retry
- `ready` → `idle`: User signed out (profile cleared)

---

### Slice: `familyGroup`

Fetched when user navigates to the Family Group screen. Provides detailed group data beyond what's in the user profile.

| Field       | Type                                        | Description                                     |
|-------------|---------------------------------------------|-------------------------------------------------|
| group       | FamilyGroup \| null                         | Full group details with members                 |
| invitations | FamilyInvitation[]                          | Pending invitations (owner sees all; members see own) |
| status      | 'idle' \| 'loading' \| 'ready' \| 'error'  | Fetch lifecycle                                 |
| error       | string \| null                              | Error message if fetch fails                    |

### Type: FamilyGroup

| Field       | Type             | Source Query      | Description                      |
|-------------|------------------|-------------------|----------------------------------|
| id          | number           | `myFamilyGroup`   | Group ID                         |
| name        | string           | `myFamilyGroup`   | Group display name               |
| slug        | string           | `myFamilyGroup`   | URL-safe identifier              |
| memberCount | number           | `myFamilyGroup`   | Total member count               |
| createdAt   | string           | `myFamilyGroup`   | ISO date string                  |
| members     | FamilyMember[]   | `myFamilyGroup`   | All members (via field resolver) |
| owner       | FamilyMember     | `myFamilyGroup`   | Group owner                      |

### Type: FamilyMember

| Field     | Type                      | Source          | Description                    |
|-----------|---------------------------|-----------------|--------------------------------|
| id        | number                    | `myFamilyGroup` | User ID                       |
| firstName | string                    | `myFamilyGroup` | First name                    |
| lastName  | string                    | `myFamilyGroup` | Last name                     |
| email     | string                    | `myFamilyGroup` | Email address                 |
| role      | 'OWNER' \| 'MEMBER'       | `myFamilyGroup` | Role enum                     |
| createdAt | string                    | `myFamilyGroup` | Join date                     |

### Type: FamilyInvitation

| Field        | Type                                                      | Source                     | Description           |
|--------------|-----------------------------------------------------------|----------------------------|-----------------------|
| id           | number                                                    | `familyGroupInvitations`   | Invitation ID         |
| invitedEmail | string                                                    | `familyGroupInvitations`   | Invited email address |
| status       | 'PENDING' \| 'ACCEPTED' \| 'DECLINED' \| 'EXPIRED' \| 'CANCELLED' | `familyGroupInvitations`   | Current status        |
| expiresAt    | string                                                    | `familyGroupInvitations`   | Expiry ISO date       |
| createdAt    | string                                                    | `familyGroupInvitations`   | Sent ISO date         |

---

## GraphQL Types (consumed from API)

These types already exist on the API and will be consumed via `@graphql-codegen`. The mobile app does not define its own GraphQL types — it uses the generated ones.

### FamilyRecipe (used in Recipes screen family tab)

| Field                | Type           | Description                            |
|----------------------|----------------|----------------------------------------|
| id                   | number         | Recipe ID                              |
| name                 | string         | Recipe name                            |
| slug                 | string         | URL-safe identifier                    |
| instructions         | string \| null | Cooking instructions                   |
| sourceUrl            | string \| null | Original URL if imported               |
| contributedByUserId  | number \| null | User who shared/created this recipe    |
| lastModifiedByUserId | number \| null | Last editor                            |
| createdAt            | string         | ISO date                               |
| updatedAt            | string         | ISO date                               |

### Input Types (for mutations)

| Input                    | Fields                          | Used By                  |
|--------------------------|---------------------------------|--------------------------|
| CreateFamilyGroupInput   | name: string                    | `createFamilyGroup`      |
| InviteFamilyMemberInput  | email: string                   | `inviteFamilyMember`     |
| ShareRecipeToFamilyInput | recipeSlug: string              | `shareRecipeToFamily`    |
| CreateFamilyRecipeInput  | name: string, instructions?: string | `createFamilyRecipe` |
| UpdateFamilyRecipeInput  | slug: string, name?: string, instructions?: string | `updateFamilyRecipe` |

---

## Data Flow Diagram

```
App Start (authenticated)
    │
    ├── bootstrapUserEpic dispatches setup query
    │   ├── me query ──────────────► user.profile (id, email, name)
    │   └── myFamilyGroup query ──► user.profile (familyGroupId, role, name)
    │
    └── user.status = 'ready' ──► App renders tabs
                                        │
                                        ├── Recipes tab reads user.profile.familyGroupId
                                        │   └── if present: show "Family Recipes" toggle
                                        │       └── familyRecipes query via Apollo (screen-level)
                                        │
                                        └── Settings > Family Group
                                            └── familyGroupEpic fetches detailed data
                                                ├── myFamilyGroup ──► familyGroup.group
                                                └── familyGroupInvitations ──► familyGroup.invitations
```
