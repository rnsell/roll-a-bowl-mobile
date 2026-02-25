# Implementation Plan: Clerk Authentication

**Branch**: `003-clerk-auth` | **Date**: 2026-02-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-clerk-auth/spec.md`

## Summary

Add Clerk-based authentication to the mobile app using Clerk's hosted pages (opened in an in-app browser). The mobile app delegates all sign-in/sign-up/password-reset UI to Clerk's hosted pages. On successful auth, the Recipes tab displays the Clerk session JWT to verify the token is available for future API integration. No custom auth screens are built. API integration (Apollo Client, Bearer token middleware) is deferred to a follow-up feature.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)
**Primary Dependencies**: `@clerk/clerk-expo`, `expo-secure-store`, `expo-web-browser`
**Storage**: SecureStore (encrypted device keychain) for token persistence
**Testing**: Jest (Expo bundled), React Native Testing Library
**Target Platform**: iOS + Android (React Native 0.81, Expo 54)
**Project Type**: Mobile app (with API integration)
**Performance Goals**: 60fps animations, <3s app launch to authenticated state
**Constraints**: Must work within Expo managed workflow
**Scale/Scope**: 1 new screen (landing), 2 modified screens (settings sign-out, recipes JWT display), root layout changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First UX | PASS | Landing screen is native. Auth UI opens in system browser (standard mobile pattern for OAuth). Sign-out is a native button in Settings. |
| II. Performance | PASS | No heavy computation. Token cache uses native SecureStore. Browser opens/closes quickly. |
| III. Type Safety | PASS | All Clerk hooks are fully typed. Apollo Client supports typed queries. |
| IV. Simplicity (YAGNI) | PASS | Hosted pages eliminate 3+ custom screens. Minimal code — just provider setup, a landing screen, and a sign-out button. API integration deferred to follow-up. |
| V. Cross-Platform Parity | PASS | In-app browser works identically on iOS and Android. Social providers configured in Clerk dashboard, not in app code. |

**Tech Stack Constraints check**:
- All new packages are well-maintained with active development
- `@clerk/clerk-expo` has >1k GitHub stars
- No native module development outside Expo managed workflow
- `expo-web-browser` and `expo-secure-store` are official Expo SDK modules

**Post-Phase 1 re-check**: PASS — No violations. API integration deferred to follow-up feature.

## Project Structure

### Documentation (this feature)

```text
specs/003-clerk-auth/
├── plan.md              # This file
├── research.md          # Phase 0: Clerk SDK research, auth strategy decisions
├── data-model.md        # Phase 1: Auth state model, API entity reference
├── quickstart.md        # Phase 1: Setup guide, dev workflow
├── contracts/
│   └── api-auth-contract.md  # Phase 1: Mobile-API auth contract
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (mobile app — this repository)

```text
app/
├── _layout.tsx                    # MODIFIED: Add ClerkProvider, auth state routing
├── sign-in.tsx                    # NEW: Landing screen with "Sign In" button
└── (tabs)/
    ├── _layout.tsx                # UNCHANGED
    ├── index.tsx                  # MODIFIED: Display JWT on Recipes screen (temp)
    ├── meal-plan.tsx              # UNCHANGED
    ├── grocery-list.tsx           # UNCHANGED
    └── settings.tsx               # MODIFIED: Add sign-out button
```

**Structure Decision**: Hosted pages approach. No `(auth)` route group needed. The app has just two states: landing screen (unauthenticated) and tabs (authenticated). The root layout switches between them based on `useAuth().isSignedIn`. API integration (Apollo Client, Bearer token middleware) deferred to follow-up feature.

### Deferred to follow-up feature

```text
lib/
└── apollo-client.ts               # Apollo Client with Clerk Bearer auth link

roll-a-bowl-api/
└── src/
    └── middleware/
        └── clerk-auth.middleware.ts   # Bearer token auth path
```

## Complexity Tracking

No constitution violations. No complexity justifications needed.
