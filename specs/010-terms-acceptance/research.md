# Research: Terms & Privacy Policy Acceptance

**Feature**: 010-terms-acceptance
**Date**: 2026-03-20

## R1: API Document Model

**Decision**: The mobile API uses a single combined terms document model (no `documentType` parameter). `termsStatus` returns one set of fields: `requiresAcceptance`, `currentVersion`, `acceptedVersion`, `effectiveDate`. `acceptTerms` takes only a `version` string.

**Rationale**: The mobile API schema does not include the split terms/privacy model (feature 026 from web app). The implementation should work with the current single-document API. If the API is later updated to support split documents, the gate can be extended.

## R2: Gate Placement

**Decision**: Create a `TermsGate` wrapper component that sits between `BootstrapGate` and the main `Stack` navigator in `app/_layout.tsx`. Similar pattern to the existing `AuthGate`.

**Rationale**: The web app uses `TermsCheckWrapper` at the layout level. The mobile app should follow the same pattern — gate at the layout level ensures no screen is accessible without acceptance.

## R3: Acceptance Screen UX

**Decision**: Full-screen view with scrollable markdown content, a checkbox, and Accept/Decline buttons. No modal — a full screen replacement that blocks navigation entirely.

**Rationale**: Terms acceptance is a legal requirement. A modal can be dismissed accidentally. A full-screen view makes the requirement clear and prevents any background interaction.

## R4: Decline Behavior

**Decision**: Decline signs the user out via Clerk's `signOut()` and the existing auth flow redirects to the sign-in screen.

**Rationale**: Matches the web app pattern. The user cannot use the app without accepting terms.
