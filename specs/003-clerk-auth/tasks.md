# Tasks: Clerk Authentication

**Input**: Design documents from `/specs/003-clerk-auth/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not requested. No test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install Clerk dependencies and configure environment

- [x] T001 Install Clerk and Expo dependencies: `npm install @clerk/clerk-expo` and `npx expo install expo-secure-store expo-web-browser`
- [x] T002 Create `.env` file at project root with `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here` placeholder
- [x] T003 Add `.env` to `.gitignore` (currently only `.env*.local` is ignored)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Wire up ClerkProvider and auth-gated routing in the root layout. MUST be complete before any user story can work.

**Context**: The existing `app/_layout.tsx` has a `RootLayout` (font loading, splash screen) and `RootLayoutNav` (ThemeProvider + Stack). ClerkProvider must wrap everything. Auth routing must check `useAuth().isSignedIn` and conditionally render the sign-in screen or tabs.

- [x] T004 Modify `app/_layout.tsx` to wrap `RootLayoutNav` content in `<ClerkProvider>` with `tokenCache` from `@clerk/clerk-expo/token-cache` and `publishableKey` from `process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`. The ClerkProvider must be inside ThemeProvider (so auth screens get theming) but outside the Stack navigator.
- [x] T005 Add auth-gated routing in `app/_layout.tsx`: Inside the ClerkProvider, use `useAuth()` to check `isLoaded` and `isSignedIn`. While Clerk is loading (`!isLoaded`), return null (splash screen still visible). When loaded: if `isSignedIn` is false, render the `sign-in` screen in the Stack; if true, render the `(tabs)` screen. Register `sign-in` as a Stack.Screen alongside the existing `(tabs)` screen. Set `initialRouteName` based on auth state.

**Checkpoint**: App loads, Clerk initializes, and always shows the sign-in screen (since no sign-in.tsx exists yet, it may error — that's expected).

---

## Phase 3: User Story 1 & 2 - Sign Up / Sign In (Priority: P1) 🎯 MVP

**Goal**: Unauthenticated users see a landing screen, tap "Sign In", complete auth on Clerk's hosted page, and return to the app with a visible JWT on the Recipes tab.

**Independent Test**: Open app fresh → see landing screen → tap "Sign In" → complete sign-up or sign-in on Clerk's hosted page → browser closes → see tabs with JWT displayed on Recipes screen.

**Note**: US1 (sign-up) and US2 (sign-in) share the same implementation — Clerk's hosted page handles both. The landing screen opens the same URL; Clerk's UI lets the user choose sign-up or sign-in.

### Implementation

- [x] T006 [P] [US1] Create `app/sign-in.tsx` as the landing screen. Use design system components (`Box`, `Heading`, `Paragraph`). Display app name/branding centered on screen. Add a "Sign In" button (use `Pressable` from React Native) styled with `colors.primary` from `useTheme()`. On press, call `expo-web-browser`'s `WebBrowser.openBrowserAsync()` to open the Clerk hosted sign-in URL. The URL pattern is `https://<clerk-frontend-api>/sign-in` — use Clerk's `useClerk()` hook to get the `buildUrlWithAuth()` or construct from the publishable key domain. Alternatively, use `useSSO()` or Clerk's `handleRedirectCallback` pattern per Clerk Expo docs. Ensure the screen respects safe areas and supports light/dark mode via the design system.
- [x] T007 [P] [US1] Modify `app/(tabs)/index.tsx` (Recipes screen) to display the Clerk session JWT. Import `useAuth` from `@clerk/clerk-expo`. Call `const { getToken } = useAuth()` and use a `useEffect` + state to fetch the token via `getToken()` on mount. Display the token string in a scrollable `Paragraph.Small` or similar component below the existing heading. Truncate or wrap the JWT so it's visible but doesn't break the layout. This is temporary — for verifying the auth token is available.
- [x] T008 [US1] Wire up the auth redirect callback. After the user completes auth on Clerk's hosted page, the browser redirects back to the app via the `rollabowlmobiletmp://` scheme. Ensure `app/_layout.tsx` handles this by using `expo-web-browser`'s `WebBrowser.maybeCompleteAuthSession()` at the top level (or in sign-in.tsx). Verify that `useAuth().isSignedIn` updates to `true` after the browser callback, which triggers the root layout to switch from sign-in screen to tabs.

**Checkpoint**: Full sign-up/sign-in flow works. User sees landing screen → taps Sign In → completes auth in browser → returns to app → sees Recipes tab with JWT displayed.

---

## Phase 4: User Story 3 - Persistent Session (Priority: P1)

**Goal**: Users who have already signed in should skip the landing screen on app restart.

**Independent Test**: Sign in → force close app → reopen → should go directly to tabs (no landing screen).

**Note**: This is inherently provided by Phase 2's ClerkProvider + tokenCache setup. No additional code is needed — the `tokenCache` from `@clerk/clerk-expo/token-cache` persists the session JWT to SecureStore, and on next launch, `useAuth().isSignedIn` returns `true` immediately after loading.

- [x] T009 [US3] Verify persistent session works end-to-end. Ensure `tokenCache` is correctly passed to `ClerkProvider` in `app/_layout.tsx` (done in T004). Test by signing in, force-closing the app, and reopening — the auth routing from T005 should skip the landing screen and go directly to tabs. If the session is not persisting, debug the `tokenCache` integration (ensure `expo-secure-store` is properly installed and linked).

**Checkpoint**: Session survives app restart. User goes directly to tabs without re-authenticating.

---

## Phase 5: User Story 4 - Sign Out (Priority: P2)

**Goal**: Signed-in users can sign out from the Settings tab and are returned to the landing screen.

**Independent Test**: Navigate to Settings → tap "Sign Out" → landing screen appears → cannot access tabs.

- [x] T010 [US4] Modify `app/(tabs)/settings.tsx` to add a sign-out button. Import `useClerk` from `@clerk/clerk-expo`. Get `signOut` from `useClerk()`. Add a `Pressable` button labeled "Sign Out" styled with the design system (e.g., `colors.error` for destructive action styling, or `colors.secondary`). On press, call `await signOut()`. The root layout's auth routing (T005) will automatically detect `isSignedIn` becoming `false` and redirect to the sign-in screen. Place the button below the existing "Coming Soon" content or replace it.

**Checkpoint**: Sign-out works. User taps button → returns to landing screen → must sign in again to access tabs.

---

## Phase 6: User Story 5 - Password Reset (Priority: P2)

**Goal**: Users can reset their password via Clerk's hosted page.

**Note**: This requires ZERO mobile code. Password reset is fully handled by Clerk's hosted sign-in page (the "Forgot password?" link on Clerk's UI). The same "Sign In" button from the landing screen opens Clerk's hosted page, which includes the password reset flow.

- [x] T011 [US5] Verify password reset works on Clerk's hosted page. No code changes needed. Manual test: tap "Sign In" → on Clerk's hosted page, tap "Forgot password?" → complete the reset flow → sign in with new password → verify JWT appears on Recipes tab.

**Checkpoint**: Password reset works via Clerk's hosted UI with no mobile code changes.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Edge case handling, cleanup, and verification

- [x] T012 Handle browser dismissal gracefully in `app/sign-in.tsx`. If the user dismisses the in-app browser without completing auth (e.g., swipes it away), ensure no errors are thrown and the user remains on the landing screen. Check the return value of `WebBrowser.openBrowserAsync()` or `openAuthSessionAsync()` — if the result type is `dismiss` or `cancel`, do nothing.
- [x] T013 Add a loading state to `app/_layout.tsx` for when Clerk is initializing (`!isLoaded`). Currently T005 returns `null` during loading. Consider keeping the splash screen visible until Clerk is loaded (SplashScreen is already prevented from auto-hiding in the existing code). Ensure `SplashScreen.hideAsync()` is called after both fonts AND Clerk are loaded.
- [x] T014 Verify the `.env` file with a real Clerk publishable key works. Replace the placeholder in `.env` with an actual `pk_test_...` key from the Clerk dashboard and run the full flow end-to-end: launch app → landing screen → sign in → JWT visible → sign out → landing screen → persistent session on restart.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (packages installed)
- **US1/US2 (Phase 3)**: Depends on Phase 2 (ClerkProvider + auth routing)
- **US3 (Phase 4)**: Depends on Phase 2 (tokenCache) + Phase 3 (need to sign in first to test persistence)
- **US4 (Phase 5)**: Depends on Phase 2 (auth routing) + Phase 3 (need to be signed in to sign out)
- **US5 (Phase 6)**: Depends on Phase 3 (landing screen with Sign In button exists)
- **Polish (Phase 7)**: Depends on Phase 3 (sign-in.tsx exists)

### Within Phase 3 (US1/US2)

```
T006 (sign-in.tsx) ──┐
                      ├──→ T008 (wire redirect callback)
T007 (JWT display) ──┘
```

T006 and T007 can run in parallel (different files). T008 depends on T006 (sign-in.tsx must exist).

### Parallel Opportunities

- **Phase 1**: T002 and T003 can run in parallel after T001
- **Phase 3**: T006 and T007 are parallelizable [P] — different files, no dependencies
- **Phase 5 + Phase 6**: T010 and T011 can run in parallel (different files, no shared dependencies)
- **Phase 7**: T012 and T013 can run in parallel (different files)

---

## Implementation Strategy

### MVP First (Phase 1 → 2 → 3)

1. Complete Phase 1: Install deps, create .env
2. Complete Phase 2: ClerkProvider + auth routing in _layout.tsx
3. Complete Phase 3: Landing screen + JWT display
4. **STOP and VALIDATE**: Sign in works, JWT visible on Recipes tab
5. This alone proves the auth plumbing works end-to-end

### Incremental Delivery

1. Setup + Foundational → ClerkProvider wired up
2. US1/US2 (sign in/up) → Auth works, JWT visible (MVP!)
3. US3 (persistent session) → Verify restart behavior
4. US4 (sign out) → Full auth lifecycle
5. US5 (password reset) → Verify hosted page flow
6. Polish → Edge cases, loading states

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US1 and US2 share implementation (Clerk's hosted page handles both sign-up and sign-in)
- US3 is inherently provided by ClerkProvider + tokenCache (no extra code)
- US5 requires zero mobile code (Clerk's hosted page handles password reset)
- The app scheme for deep link redirects is `rollabowlmobiletmp` (from app.json)
- All auth screens use the existing design system (`Box`, `Heading`, `Paragraph`, `useTheme`)
- API integration (Apollo Client, Bearer token middleware) is explicitly deferred to a follow-up feature
