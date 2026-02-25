# Data Model: Clerk Authentication

**Feature**: 003-clerk-auth
**Date**: 2026-02-24

## Overview

The mobile app does not own any persistent data models for authentication. All user data lives in the roll-a-bowl API's PostgreSQL database. Clerk manages identity (credentials, social accounts, email verification). The mobile app's "data model" is the in-memory auth state and the secure token cache.

## Existing API Entities (read-only from mobile perspective)

### User (API-side, already exists)

The API's `User` entity is the source of truth for user identity within the app.

| Field | Type | Description |
|-------|------|-------------|
| id | number (auto) | Local user ID, used as `userId` in all API queries |
| tenantId | number | Tenant association (single-tenant, always the same) |
| email | string | User email (unique per tenant) |
| clerkUserId | string | Clerk's `user_xxx` ID (globally unique) |
| firstName | string | Given name from Clerk profile |
| lastName | string | Family name from Clerk profile |
| status | enum | ACTIVE, INACTIVE, SUSPENDED |
| emailVerified | boolean | Whether email has been verified |
| isAdmin | boolean | Admin flag |
| lastLoginAt | timestamp | Last sign-in time |
| createdAt | timestamp | Account creation time |

**Mobile interaction**: The mobile app never creates or updates this entity directly. The API's `findOrCreateByClerkId` method handles user creation/linking when a Clerk-authenticated request arrives with a new `clerkUserId`.

### Session (mobile-side, in-memory + SecureStore)

Managed entirely by Clerk SDK. Not a database entity.

| Field | Type | Storage | Description |
|-------|------|---------|-------------|
| sessionToken | string (JWT) | SecureStore (encrypted) | Clerk session JWT, sent as Bearer token to API |
| userId | string | In-memory (from JWT) | Clerk user ID (`user_xxx`) |
| isSignedIn | boolean | In-memory | Derived from token presence/validity |

## State Transitions

### Auth State Machine

```
┌─────────────┐
│   LOADING   │  (app startup, checking SecureStore)
└──────┬──────┘
       │
       ├─── token found + valid ──→ AUTHENTICATED (show tabs)
       │
       └─── no token / invalid ──→ UNAUTHENTICATED (show landing screen)
                                        │
                                        │ user taps "Sign In" → browser opens
                                        │ completes auth on hosted page
                                        │ browser closes with token
                                        ▼
                                   AUTHENTICATED (show tabs)
                                        │
                                        │ sign-out from Settings
                                        ▼
                                   UNAUTHENTICATED (show landing screen)
```

## Validation Rules

| Rule | Source | Description |
|------|--------|-------------|
| Email format | Clerk hosted page | Validated by Clerk's hosted UI |
| Password strength | Clerk dashboard | Configured in Clerk dashboard settings |
| Email uniqueness | Clerk + API | Clerk enforces globally; API enforces per-tenant |
| Session validity | Clerk SDK | Automatic token refresh and expiration handling |
