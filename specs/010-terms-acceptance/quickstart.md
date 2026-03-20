# Quickstart: Terms & Privacy Policy Acceptance

**Feature**: 010-terms-acceptance

## Setup
```bash
bun install
npm run codegen
npx expo start --dev-client
```

## Key Files
| File | Purpose |
|------|---------|
| graphql/operations/terms.ts | GraphQL operations |
| components/TermsGate.tsx | Gate wrapper in layout |
| screens/terms/TermsAcceptanceScreen.tsx | Acceptance flow |
| screens/terms/TermsViewerScreen.tsx | Settings viewer |
| app/_layout.tsx | Integration point |
| app/terms.tsx | Settings viewer route |
