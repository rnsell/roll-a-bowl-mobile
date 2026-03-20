# Implementation Plan: Terms & Privacy Policy Acceptance

**Branch**: `010-terms-acceptance` | **Date**: 2026-03-20 | **Spec**: [spec.md](./spec.md)

## Summary

Gate mobile app access behind terms acceptance. Authenticated users must accept the current terms before accessing any app functionality. The API uses a single combined terms document model (Terms of Service includes Privacy Policy). Integrates as a wrapper between the auth gate and the main app content.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)
**Primary Dependencies**: React Native 0.81, Expo 54, Expo Router 6, @apollo/client 4.x
**Storage**: Apollo InMemoryCache (terms status cached)
**Target Platform**: iOS 15+, Android (Expo managed workflow)
**Project Type**: Mobile app
**Constraints**: Terms gate must block all navigation. Decline must sign out.

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First UX | PASS | Full-screen acceptance view with scrollable content, checkbox, native buttons. |
| II. Performance | PASS | Single query to check status. No heavy computation. |
| III. Type Safety | PASS | GraphQL codegen provides typed operations. |
| IV. Simplicity (YAGNI) | PASS | Single gate component + acceptance screen. Reuses MarkdownContent for rendering. |
| V. Cross-Platform Parity | PASS | All RN primitives. |

## Project Structure

```text
graphql/operations/
└── terms.ts                      # Terms GraphQL operations (new)

components/
└── TermsGate.tsx                 # Wrapper that gates app access (new)

screens/terms/
├── TermsAcceptanceScreen.tsx     # Full-screen acceptance view (new)
└── TermsViewerScreen.tsx         # Read-only viewer from settings (new)

app/
└── terms.tsx                     # Route for settings viewer (new)
```

**Note**: The mobile API uses a single combined terms document (no separate documentType parameter). The acceptance flow handles one document only. If the API is updated to split terms/privacy, the gate can be extended to show two sequential screens.
