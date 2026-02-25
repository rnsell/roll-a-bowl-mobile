# Feature Specification: Clerk Authentication

**Feature Branch**: `003-clerk-auth`
**Created**: 2026-02-24
**Status**: Draft
**Input**: User description: "Before developing features I want add clerk to auth to the app."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - New User Sign Up (Priority: P1)

A new user opens the app for the first time. Since they have no session, they see a simple landing screen with a "Sign In" button. Tapping it opens Clerk's hosted sign-up/sign-in page in an in-app browser. They create an account (email/password or social provider), and upon completion the browser closes and they are taken to the main app experience (Recipes tab).

**Why this priority**: Without account creation, no other feature can function. This is the gateway to the entire app.

**Independent Test**: Can be fully tested by opening the app fresh, tapping "Sign In", completing sign-up on Clerk's hosted page, and verifying the user lands on the main app tabs with an active session.

**Acceptance Scenarios**:

1. **Given** a user with no account opens the app, **When** they tap "Sign In" and complete sign-up on Clerk's hosted page, **Then** the browser closes and they are taken to the main app showing their session token.
2. **Given** a user with no account opens the app, **When** they use a social provider (Google or Apple) on Clerk's hosted page, **Then** the flow completes and they are taken to the main app showing their session token.
3. **Given** a user dismisses the browser without completing sign-up, **When** they return to the app, **Then** they remain on the landing screen and can try again.

---

### User Story 2 - Returning User Sign In (Priority: P1)

A returning user opens the app and sees the landing screen. They tap "Sign In", which opens Clerk's hosted sign-in page. After entering credentials, the browser closes and they are taken to the main app.

**Why this priority**: Equally critical as sign-up; returning users must be able to access their data.

**Independent Test**: Can be fully tested by signing in on Clerk's hosted page and verifying access to the main tabs.

**Acceptance Scenarios**:

1. **Given** a user with an existing account opens the app, **When** they sign in via Clerk's hosted page, **Then** the browser closes and they are taken to the main app showing their session token.
2. **Given** a user enters incorrect credentials on Clerk's hosted page, **When** they submit, **Then** Clerk's hosted page displays the error and they can retry.

---

### User Story 3 - Persistent Session (Priority: P1)

A user who has previously signed in closes the app and reopens it later. They should be automatically signed in without needing to re-authenticate, as long as their session is still valid.

**Why this priority**: Session persistence is essential for mobile app usability. Requiring sign-in on every app open would make the app unusable.

**Independent Test**: Can be fully tested by signing in, force-closing the app, reopening it, and verifying the user lands directly on the Recipes tab without seeing the landing screen.

**Acceptance Scenarios**:

1. **Given** a user is signed in and closes the app, **When** they reopen the app, **Then** they are taken directly to the main app without seeing the landing screen.
2. **Given** a user's session has expired or been revoked, **When** they reopen the app, **Then** they see the landing screen with the "Sign In" button.

---

### User Story 4 - Sign Out (Priority: P2)

A signed-in user navigates to the Settings tab and taps a sign-out option. They are signed out and returned to the landing screen.

**Why this priority**: Users must be able to sign out for security and account-switching purposes, but it's less critical than sign-in flows.

**Independent Test**: Can be fully tested by navigating to Settings, tapping sign out, and verifying the user is returned to the landing screen and cannot access protected tabs.

**Acceptance Scenarios**:

1. **Given** a signed-in user is on the Settings tab, **When** they tap "Sign Out", **Then** they are signed out and see the landing screen.
2. **Given** a user has signed out, **When** they try to navigate to any tab, **Then** they are redirected to the landing screen.

---

### User Story 5 - Password Reset (Priority: P2)

A user who has forgotten their password taps "Sign In" on the landing screen, and on Clerk's hosted page taps "Forgot password". The entire reset flow is handled by Clerk's hosted UI.

**Why this priority**: Important for account recovery but handled entirely by Clerk's hosted pages — no mobile-side implementation needed.

**Independent Test**: Can be fully tested by navigating to Clerk's hosted page, using the forgot password flow, and verifying sign-in works with the new password.

**Acceptance Scenarios**:

1. **Given** a user is on Clerk's hosted sign-in page, **When** they use the forgot password flow, **Then** they can reset their password and sign in with the new one.

---

### Edge Cases

- What happens when the device has no internet connection during sign-in? The in-app browser will show its own error. When the user dismisses the browser, they return to the landing screen and can retry.
- What happens when Clerk's hosted page authentication is cancelled midway (user dismisses browser)? The user should be returned to the landing screen without errors.
- What happens when a user's account is deleted or disabled externally? On next app open, they should see the landing screen with the "Sign In" button.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST require authentication before granting access to any app tab (Recipes, Meal Plan, Grocery List, Settings).
- **FR-002**: System MUST delegate all sign-up, sign-in, and password reset UI to Clerk's hosted pages opened in an in-app browser.
- **FR-003**: System MUST persist user sessions across app restarts so returning users are not required to re-authenticate.
- **FR-004**: System MUST provide a sign-out option accessible from the Settings tab.
- **FR-005**: System MUST display a landing screen with a "Sign In" button when no active session exists.
- **FR-006**: System MUST redirect unauthenticated users to the landing screen when they attempt to access protected content.
- **FR-007**: System MUST gracefully handle browser dismissal without completing authentication (return to landing screen, no errors).
- **FR-008**: System MUST display the Clerk session JWT on the Recipes tab after successful authentication (temporary, for integration verification).

### Key Entities

- **User**: Represents an authenticated person using the app. Key attributes: unique identifier, email address, display name, authentication method (email or social provider), account creation date.
- **Session**: Represents an active authenticated session. Key attributes: associated user, creation time, expiration status, device association.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete sign-up (email or social) in under 90 seconds (includes browser open/close).
- **SC-002**: Users can sign in with existing credentials in under 30 seconds (includes browser open/close).
- **SC-003**: Returning users with a valid session see the main app within 3 seconds of opening the app (no landing screen).
- **SC-004**: 100% of unauthenticated access attempts are redirected to the landing screen.
- **SC-005**: Browser dismissal without completing auth always returns to landing screen without errors.

## Assumptions

- Clerk is the chosen authentication provider, configured and managed externally via the Clerk dashboard.
- All sign-up, sign-in, password reset, and email verification UI is provided by Clerk's hosted pages.
- The app does not build custom authentication screens — it only needs a landing screen with a "Sign In" button.
- All existing app tabs (Recipes, Meal Plan, Grocery List, Settings) are protected routes requiring authentication.
- Session management (token refresh, expiration) is handled by Clerk's built-in mechanisms.
- Social provider configuration (Google, Apple) is managed in the Clerk dashboard.
