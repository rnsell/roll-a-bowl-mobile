# Tasks: Terms & Privacy Policy Acceptance

**Input**: Design documents from `/specs/010-terms-acceptance/`
**Tests**: Not requested.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup

- [x] T001 Add GraphQL operations (GetTermsStatus, GetCurrentTerms, AcceptTerms) in graphql/operations/terms.ts
- [x] T002 Export operations from graphql/operations/index.ts and run codegen

---

## Phase 2: Foundational

- [x] T003 Create TermsAcceptanceScreen component in screens/terms/TermsAcceptanceScreen.tsx — full-screen view with scrollable markdown content, checkbox, Accept/Decline buttons
- [x] T004 Create TermsGate wrapper component in components/TermsGate.tsx — queries termsStatus, shows TermsAcceptanceScreen if requiresAcceptance, renders children otherwise

---

## Phase 3: User Story 1 — Accept Terms on First Login (P1) MVP

- [x] T005 [US1] Integrate TermsGate into app/_layout.tsx — wrap inside BootstrapGate, before the main Stack navigator
- [x] T006 [US1] Wire AcceptTerms mutation in TermsAcceptanceScreen — on accept, call mutation with currentVersion, refetch termsStatus
- [x] T007 [US1] Wire Decline button to sign user out via Clerk signOut() in TermsAcceptanceScreen

**Checkpoint**: New users see terms, can accept or decline

---

## Phase 4: User Story 2 — Accept Updated Terms (P1)

- [x] T008 [US2] Ensure TermsGate re-checks termsStatus on app focus (refetch on screen focus or use cache-and-network fetch policy) in components/TermsGate.tsx

**Checkpoint**: Updated terms trigger acceptance flow for existing users

---

## Phase 5: User Story 3 — Decline Terms (P2)

Already implemented in T007. No additional tasks.

---

## Phase 6: User Story 4 — View Terms from Settings (P3)

- [x] T009 [US4] Create TermsViewerScreen in screens/terms/TermsViewerScreen.tsx — read-only scrollable view of current terms document
- [x] T010 [US4] Create route at app/terms.tsx that renders TermsViewerScreen
- [x] T011 [US4] Add route registration in app/_layout.tsx for the terms viewer screen

**Checkpoint**: Users can view terms from settings

---

## Phase 7: Polish

- [x] T012 Add error handling for all mutations (Alert.alert on failure)
- [x] T013 Run TypeScript type check (npx tsc --noEmit) and fix errors

---

## Dependencies

- Phase 1 → Phase 2 → Phase 3 (sequential)
- Phase 4 after Phase 3
- Phase 6 independent of Phase 3-4
- Phase 7 after all
