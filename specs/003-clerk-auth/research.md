# Research: Clerk Authentication

**Feature**: 003-clerk-auth
**Date**: 2026-02-24

## R1: Clerk Expo SDK Integration

**Decision**: Use `@clerk/clerk-expo` with `expo-secure-store` for token caching.

**Rationale**: This is the official Clerk package for Expo. It provides the `ClerkProvider`, auth state hooks (`useAuth`, `useClerk`), and integrates natively with Expo Router. Session tokens are persisted to encrypted device storage via SecureStore.

**Key packages (this feature)**:
- `@clerk/clerk-expo` (~2.19.x) — core Clerk provider + hooks
- `expo-secure-store` — encrypted token persistence (iOS Keychain, Android EncryptedSharedPreferences)
- `expo-web-browser` — opens Clerk's hosted pages in an in-app browser

**Deferred packages (follow-up feature)**:
- `@apollo/client` + `graphql` — GraphQL client for API integration

**Alternatives considered**:
- Building custom native auth screens with Clerk hooks (`useSignIn`, `useSignUp`): Rejected — more effort, user prefers hosted pages approach.
- Building auth from scratch with API OAuth flow: Rejected — poor UX, complex token management.

## R2: Clerk Hosted Pages for Mobile

**Decision**: Use Clerk's hosted sign-in/sign-up pages opened via `expo-web-browser` instead of building custom native auth screens.

**Rationale**: Clerk provides hosted pages at `https://accounts.<your-domain>.clerk.accounts.dev/sign-in` (and `/sign-up`). These pages handle all auth UI including email/password, social providers, email verification, and password reset. Opening them in an in-app browser provides a complete auth flow with zero custom screens.

**How it works**:
1. App detects unauthenticated state via `useAuth().isSignedIn`
2. User taps "Sign In" on a minimal landing screen
3. App opens Clerk's hosted page via `WebBrowser.openAuthSessionAsync()`
4. User completes auth on Clerk's hosted page
5. Clerk redirects back to the app via deep link (app scheme)
6. `@clerk/clerk-expo` picks up the session token automatically
7. `useAuth().isSignedIn` becomes `true`, app navigates to tabs

**Key details**:
- The redirect URL uses the app's scheme (e.g., `rollabowlmobiletmp://`)
- `expo-web-browser` handles the browser lifecycle (open/close)
- Clerk's hosted pages are customizable via the Clerk dashboard (colors, logo, etc.)
- All auth methods configured in Clerk dashboard are automatically available

**Alternatives considered**:
- Custom native screens with `useSignIn`/`useSignUp` hooks: Works but significantly more code and maintenance. Every auth feature (MFA, social login, password rules) must be manually implemented.
- WebView embedded in app: Rejected — worse UX than in-app browser, cookie/session issues.

## R3: Mobile Auth Strategy (Direct Clerk vs API OAuth)

**Decision**: Mobile app authenticates directly with Clerk using hosted pages, then uses Clerk session tokens as Bearer tokens when calling the API.

**Rationale**: The existing API uses a browser-based OAuth redirect flow with encrypted session cookies designed for the web app. The mobile app takes a simpler path: authenticate with Clerk directly (hosted pages), get a session token, and pass it as a Bearer header to the API.

**API changes required**: The API's `ClerkAuthMiddleware` needs to accept `Authorization: Bearer` tokens in addition to session cookies. The `@clerk/backend` package (already installed) can verify Clerk session JWTs.

**Alternatives considered**:
- Using the API's existing `/api/auth/login` OAuth flow: Rejected — designed for browsers with cookies, doesn't map well to mobile.
- Having the API issue its own JWTs after Clerk auth: Rejected — unnecessary complexity, Clerk tokens are already JWTs.

## R4: API Bearer Token Authentication

**Decision**: Extend the existing `ClerkAuthMiddleware` to also check for `Authorization: Bearer` headers and verify Clerk session JWTs.

**Rationale**: The middleware currently only checks session cookies. For mobile, it should check Bearer tokens first, fall back to cookies. The `@clerk/backend` package can verify Clerk-issued session tokens using `verifyToken()`. The middleware populates the same `req.authUserId` fields, so GraphQL resolvers need zero changes.

**Implementation approach**:
1. Check for `Authorization: Bearer` header before checking cookies
2. Verify the JWT using `@clerk/backend`'s `verifyToken()` with the Clerk secret key
3. Extract `sub` (Clerk user ID) from the verified token
4. Look up the local user by `clerkUserId` (auto-create if needed)
5. Populate `req.authUserId` — same as the cookie path

**Alternatives considered**:
- Separate middleware for mobile: Rejected — duplicates logic.
- API-issued JWTs: Rejected — unnecessary layer.

## R5: Auth-Gated Routing Pattern

**Decision**: Use Expo Router route groups with `useAuth()` checks in the root layout. Unauthenticated users see a landing screen; authenticated users see tabs.

**Rationale**: Since all auth UI is handled by Clerk's hosted pages (in a browser), the app only needs two states: a landing screen and the authenticated tabs. No `(auth)` route group with multiple screens is needed.

**Route structure**:
```
app/
  _layout.tsx          # ClerkProvider + auth state routing
  sign-in.tsx          # Landing screen with "Sign In" button
  (tabs)/
    _layout.tsx        # Existing tab navigator (unchanged)
    index.tsx          # Recipes
    meal-plan.tsx
    grocery-list.tsx
    settings.tsx       # Add sign-out button
```

**Alternatives considered**:
- `(auth)` route group with sign-in/sign-up/forgot-password screens: Not needed — hosted pages handle all of that.

## R6: Session Persistence

**Decision**: Use `@clerk/clerk-expo/token-cache` (pre-built SecureStore integration).

**Rationale**: Clerk provides a ready-made `tokenCache` export that wraps `expo-secure-store`. Passing it to `<ClerkProvider tokenCache={tokenCache}>` enables automatic session persistence across app restarts. No custom code needed.

**Alternatives considered**:
- Custom `tokenCache`: Unnecessary.
- AsyncStorage: Rejected — not encrypted.

## R7: GraphQL Client for Mobile (DEFERRED)

**Decision**: Deferred to follow-up feature. This feature focuses on getting auth working and proving the token is available.

**Rationale**: API integration (Apollo Client, Bearer token middleware) depends on a working auth flow first. This feature will display the JWT on the Recipes tab to verify the token is obtainable via `useAuth().getToken()`. A follow-up feature will add Apollo Client with the Bearer auth link and update the API middleware.

**When needed**: Use `@apollo/client` with an auth link that calls `useAuth().getToken()` and attaches it as `Authorization: Bearer <token>`.
