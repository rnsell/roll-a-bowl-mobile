# API Authentication Contract: Mobile Client

**Feature**: 003-clerk-auth
**Date**: 2026-02-24
**Scope**: Defines how the mobile app authenticates with the roll-a-bowl API

## Authentication Method

The mobile app authenticates API requests using Clerk session tokens passed as Bearer tokens in the `Authorization` header. The token is obtained from Clerk SDK via `useAuth().getToken()`.

### Request Format

```
Authorization: Bearer <clerk-session-token>
```

### API Behavior

| Scenario | API Response |
|----------|-------------|
| Valid Bearer token, known user | Request proceeds with `userId` + `tenantId` in context |
| Valid Bearer token, unknown Clerk ID | API creates local user via `findOrCreateByClerkId`, then proceeds |
| Expired Bearer token | `401 Unauthorized` — mobile app should refresh token and retry |
| Missing Authorization header | Request proceeds as unauthenticated (resolvers may reject) |
| Malformed token | Request proceeds as unauthenticated |

### Token Validation (API-side)

The API validates the Clerk session token using `@clerk/backend`:
1. Extract token from `Authorization: Bearer <token>` header
2. Verify JWT signature using Clerk secret key (`verifyToken()`)
3. Extract `sub` claim (Clerk user ID, e.g., `user_xxx`)
4. Look up local user by `clerkUserId`
5. If no local user exists, create one using Clerk user info
6. Attach `userId` and `tenantId` to request context

## GraphQL Endpoint

**URL**: `POST /graphql`

### Headers

```
Content-Type: application/json
Authorization: Bearer <clerk-session-token>
```

### Key Queries Used by Mobile

#### Get Current User Profile

```graphql
query Me {
  me {
    id
    email
    firstName
    lastName
    status
    emailVerified
  }
}
```

**Auth required**: Yes

#### List User Recipes

```graphql
query Recipes {
  recipes {
    id
    name
    slug
    instructions
    createdAt
  }
}
```

**Auth required**: Yes

#### Get Meal Plan for Date Range

```graphql
query MealPlanRange($startDate: String!, $endDate: String!) {
  mealPlanRange(startDate: $startDate, endDate: $endDate) {
    id
    date
    mealType
    recipe {
      id
      name
      slug
    }
  }
}
```

**Auth required**: Yes

## Error Responses

| HTTP Status | GraphQL Error | Meaning | Mobile Action |
|-------------|--------------|---------|---------------|
| 200 + errors | `UNAUTHENTICATED` | Token invalid/expired | Refresh token, retry; if still fails, sign out |
| 200 + errors | `FORBIDDEN` | User lacks permission | Show error message |
| 401 | N/A | Bearer token rejected at middleware | Refresh token, retry |
| 500 | `INTERNAL_SERVER_ERROR` | Server error | Show generic error, retry |

## Changes Required on API Side

### Modified: ClerkAuthMiddleware Bearer Token Support

The existing `ClerkAuthMiddleware` currently only checks session cookies. Add Bearer token handling:

```
Priority order:
1. Check Authorization: Bearer header → verify Clerk JWT → populate request
2. If no Bearer token, fall back to existing cookie-based auth
3. If neither, continue as unauthenticated
```

### New: User auto-creation for Bearer token auth

When a valid Bearer token arrives but no local user exists for that Clerk ID:
1. Fetch user info from Clerk API using `clerkClient.users.getUser(clerkUserId)`
2. Call `findOrCreateByClerkId` with the Clerk user's email, name, etc.
3. Proceed normally
