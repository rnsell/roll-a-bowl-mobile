# Feature Specification: Terms & Privacy Policy Acceptance

**Feature Branch**: `010-terms-acceptance`
**Created**: 2026-03-20
**Status**: Draft
**Input**: The mobile app needs to support the user accepting the terms of conditions and privacy policy in order for them to use the app.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Accept Terms on First Login (Priority: P1)

A new user signs in to the mobile app for the first time. Before they can access any app functionality, they are presented with the Terms of Service document. They must read and agree to the terms before continuing. After accepting the terms, they are immediately presented with the Privacy Policy. After accepting both documents, they proceed to the main app.

**Why this priority**: This is a legal/compliance requirement — the app cannot be used without acceptance. It gates all other functionality.

**Independent Test**: Can be tested by signing in as a new user who has never accepted terms. Verify the terms screen appears, accept, verify the privacy policy screen appears, accept, verify the user reaches the main app.

**Acceptance Scenarios**:

1. **Given** an authenticated user who has not accepted the current terms, **When** the app loads, **Then** a full-screen terms acceptance view is presented before any app content is accessible.
2. **Given** the terms acceptance view is shown, **When** the user scrolls through the document content, **Then** they can read the full terms rendered as formatted text.
3. **Given** the terms acceptance view is shown, **When** the user checks the "I have read and agree" checkbox and taps "Accept & Continue", **Then** their acceptance is recorded and they proceed to the next required document or the main app.
4. **Given** the user has accepted the terms, **When** the privacy policy is also required, **Then** the privacy policy acceptance view is presented immediately after.
5. **Given** the user has accepted both terms and privacy policy, **When** the flow completes, **Then** the user is taken to the main app and does not see the acceptance views again until the documents are updated.

---

### User Story 2 - Accept Updated Terms (Priority: P1)

An existing user who previously accepted the terms launches the app after the terms or privacy policy have been updated to a new version. They are presented with the updated document and must accept it before continuing to use the app.

**Why this priority**: Legal compliance requires re-acceptance when terms change. Without this, the app would allow usage under outdated terms.

**Independent Test**: Can be tested by having a user with an accepted terms version, then updating the current terms version on the server, and verifying the acceptance flow is triggered on next app load.

**Acceptance Scenarios**:

1. **Given** a user who previously accepted version "2026-01-01" of the terms, **When** the current terms version is now "2026-03-15", **Then** the terms acceptance view is presented on app load.
2. **Given** only the privacy policy has been updated, **When** the user opens the app, **Then** only the privacy policy acceptance view is shown (terms acceptance is skipped).
3. **Given** the user accepts the updated document, **When** they return to the app later, **Then** they are not prompted again until the next version change.

---

### User Story 3 - Decline Terms (Priority: P2)

A user is presented with terms or the privacy policy and chooses to decline. They are signed out of the app and returned to the sign-in screen. They cannot use the app without accepting.

**Why this priority**: Users must have an exit path if they disagree with the terms. Declining must not leave them in a broken state.

**Independent Test**: Can be tested by tapping "Decline" on the terms screen and verifying the user is signed out and returned to the sign-in screen.

**Acceptance Scenarios**:

1. **Given** the terms acceptance view is shown, **When** the user taps "Decline", **Then** they are signed out and returned to the sign-in screen.
2. **Given** the user declined and signs in again, **When** the app loads, **Then** the terms acceptance view is presented again.

---

### User Story 4 - View Terms from Settings (Priority: P3)

An authenticated user who has already accepted terms can view the current terms of service and privacy policy from the app's settings screen. This is an informational view only — no accept/decline buttons.

**Why this priority**: Users should be able to reference the terms they agreed to at any time. This is a common legal UX expectation.

**Independent Test**: Can be tested by navigating to Settings and tapping a "Terms of Service" or "Privacy Policy" link to view the document.

**Acceptance Scenarios**:

1. **Given** a user on the settings screen, **When** they tap "Terms of Service", **Then** the current terms document is displayed in a read-only view.
2. **Given** a user on the settings screen, **When** they tap "Privacy Policy", **Then** the current privacy policy document is displayed in a read-only view.

---

### Edge Cases

- What happens when no terms are configured on the server? The app proceeds without showing the acceptance flow (terms are not required). This allows development before legal content is finalized.
- What happens if the user loses connectivity while accepting? An error is shown and the acceptance is not recorded. The user remains on the acceptance screen and can retry.
- What happens if the user force-closes the app during the acceptance flow? On next launch, the acceptance check runs again and the flow resumes from where they left off.
- What happens if the accept mutation fails due to a version mismatch (stale version)? An error is shown and the screen refreshes to load the current version.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST check the user's terms and privacy policy acceptance status after authentication, before granting access to app functionality.
- **FR-002**: System MUST present the Terms of Service document first, followed by the Privacy Policy, if both require acceptance.
- **FR-003**: The acceptance view MUST display the document content as formatted text (markdown rendered).
- **FR-004**: The acceptance view MUST include a checkbox ("I have read and agree to the [document name]") that must be checked before the accept button is enabled.
- **FR-005**: The acceptance view MUST include an "Accept & Continue" button (disabled until checkbox is checked) and a "Decline" button.
- **FR-006**: Tapping "Accept & Continue" MUST record the user's acceptance with the server, including the document version.
- **FR-007**: Tapping "Decline" MUST sign the user out and return them to the sign-in screen.
- **FR-008**: The acceptance flow MUST be skipped if no terms or privacy policy are configured on the server (both have no current version).
- **FR-009**: The acceptance flow MUST be triggered when the current version of either document differs from the user's last accepted version.
- **FR-010**: After successful acceptance of all required documents, the user MUST proceed to the main app without additional prompts.
- **FR-011**: Users MUST be able to view the current Terms of Service and Privacy Policy from the settings screen in a read-only format.
- **FR-012**: The acceptance gate MUST block all app navigation until acceptance is complete — no background access to any screen.

### Key Entities

- **Terms Status**: A combined status indicating whether the user needs to accept the current Terms of Service and/or Privacy Policy. Includes the current version, the user's accepted version, and a flag for each document.
- **Terms Document**: The content of a specific version of a legal document (Terms of Service or Privacy Policy). Contains the version identifier, content (markdown), and effective date.
- **Terms Acceptance**: An immutable record of a user accepting a specific version of a document. Includes the version, acceptance timestamp, and audit data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of authenticated users are presented with the acceptance flow before accessing app features when terms require acceptance.
- **SC-002**: Users can read and accept both documents in under 60 seconds (excluding reading time).
- **SC-003**: Declining terms signs the user out within 2 seconds and returns them to the sign-in screen.
- **SC-004**: Updated terms trigger the acceptance flow for all existing users on their next app session.
- **SC-005**: The settings-based document viewer loads and displays content within 3 seconds.

## Assumptions

- The API already supports all required queries and mutations for terms status checking and acceptance recording.
- Two document types are supported: "terms" (Terms of Service) and "privacy_policy" (Privacy Policy).
- Document content is stored as markdown on the server and rendered on the client.
- The acceptance gate integrates at the app layout level, similar to the existing authentication gate.
- The existing `MarkdownContent` design system component can render terms document content.
- Admin management of terms versions is out of scope for the mobile app (handled via the web admin panel).
