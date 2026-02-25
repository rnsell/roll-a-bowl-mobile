# Quickstart: Clerk Authentication

**Feature**: 003-clerk-auth
**Date**: 2026-02-24

## Prerequisites

1. **Clerk account** with a project set up at [dashboard.clerk.com](https://dashboard.clerk.com)
2. **Clerk publishable key** (`pk_test_...` or `pk_live_...`)
3. **Social providers configured** in Clerk dashboard (Google, Apple) — optional for initial testing

## Environment Setup

Create `.env` in project root:

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

## Install Dependencies

```bash
npm install @clerk/clerk-expo
npx expo install expo-secure-store expo-web-browser
```

## Key Architecture Decisions

1. **ClerkProvider** wraps the entire app in `app/_layout.tsx` with SecureStore token cache
2. **Auth state routing**: Root layout checks `useAuth().isSignedIn` — shows landing screen or tabs
3. **Hosted pages**: Sign-in/sign-up/password-reset all handled by Clerk's hosted pages in an in-app browser
4. **Landing screen**: Simple screen with app branding and "Sign In" button
5. **Sign-out**: Button in Settings tab using `useClerk().signOut()`
6. **JWT display**: Recipes tab shows the Clerk session token (temporary, for verifying auth works before API integration)

## File Structure (new/modified files)

```
app/
  _layout.tsx                    # MODIFIED: Add ClerkProvider, auth state routing
  sign-in.tsx                    # NEW: Landing screen with "Sign In" button
  (tabs)/
    index.tsx                    # MODIFIED: Display JWT (temporary)
    settings.tsx                 # MODIFIED: Add sign-out button

.env                             # NEW: Clerk publishable key
```

## Development Workflow

1. Start Expo: `npx expo start`
2. Auth flow works in Expo Go (browser-based, no native build required)
3. After sign-in, verify the JWT appears on the Recipes tab

## What's Deferred (follow-up feature)

- Apollo Client for GraphQL API integration
- API middleware changes for Bearer token auth
- Replacing JWT display with actual API data

## Testing Strategy

- **Unit tests**: Auth state routing logic (signed-in vs signed-out redirects)
- **Manual testing**: Full sign-up/sign-in/sign-out flows on iOS and Android
- **Verification**: JWT visible on Recipes tab after successful auth proves token is available for future API calls
