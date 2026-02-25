# Implementation Plan: Apollo GraphQL Client with Codegen

**Branch**: `004-apollo-graphql-client` | **Date**: 2026-02-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-apollo-graphql-client/spec.md`

## Summary

Set up Apollo Client with authenticated requests and `@graphql-codegen/cli` (matching the API's `client` preset) so the mobile app can make type-safe GraphQL queries against the backend. The auth link reads the OAuth access token from SecureStore and attaches it as a Bearer header. Codegen reads the schema from the symlinked API directory.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)
**Primary Dependencies**: `@apollo/client`, `graphql`, `@graphql-codegen/cli`, `@graphql-codegen/client-preset`
**Storage**: SecureStore (tokens), Apollo InMemoryCache (query cache)
**Testing**: Manual verification — `tsc --noEmit`, codegen runs, authenticated query succeeds
**Target Platform**: iOS, Android (React Native 0.81, Expo 54)
**Project Type**: Mobile app
**Performance Goals**: N/A (infrastructure layer)
**Constraints**: Must use same codegen toolchain as API (`@graphql-codegen/cli` v6 + `client` preset)
**Scale/Scope**: Single GraphQL endpoint, ~50 operations expected over time

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First UX | Pass | Apollo Client is a background service. Error/loading states delegated to components. |
| II. Performance | Pass | Apollo's InMemoryCache reduces network requests. No UI thread blocking. |
| III. Type Safety | Pass | Codegen produces `TypedDocumentNode` — full compile-time type safety for all operations. |
| IV. Simplicity (YAGNI) | Pass | Using the same codegen as the API (no new abstractions). Apollo Client is the standard choice for GraphQL in React Native. Dependency justified by spec requirement. |
| V. Cross-Platform Parity | Pass | Apollo Client works identically on iOS, Android, and web. No platform-specific code needed. |

**Post-Phase 1 re-check**: All gates still pass. No new abstractions introduced beyond what the spec requires.

## Project Structure

### Documentation (this feature)

```text
specs/004-apollo-graphql-client/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── graphql-client-api.md
└── tasks.md                     # Created by /speckit.tasks
```

### Source Code (repository root)

```text
graphql/
├── codegen.ts                   # Codegen configuration (mirrors API pattern)
├── client.tsx                   # Apollo Client factory with auth/error links
├── operations/                  # Developer-authored queries and mutations
│   └── index.ts                 # Initial smoke-test operation
└── generated/                   # Codegen output (committed to git)
    ├── index.ts
    ├── gql.ts
    ├── graphql.ts
    └── fragment-masking.ts

config/
├── schema.ts                    # Add apiUrl entry
└── config.ts                    # Add EXPO_PUBLIC_API_URL to readEnv()

app/
└── _layout.tsx                  # Wrap with ApolloProvider inside AuthProvider
```

**Structure Decision**: The `graphql/` directory sits at the project root alongside `config/` and `auth/`, following the existing flat module pattern. No nested `src/` directory — the project doesn't use one.

## Implementation Steps

### Step 1: Install Dependencies

```bash
bun expo install @apollo/client graphql
bun add -d @graphql-codegen/cli @graphql-codegen/client-preset @graphql-typescript/eslint-plugin
```

`@apollo/client` and `graphql` are runtime deps. Codegen packages are dev-only.

### Step 2: Add API URL to Config Module

Add `apiUrl` to `config/schema.ts`:
- envKey: `EXPO_PUBLIC_API_URL`
- required: true
- pattern: `/^https?:\/\//`
- description: "API base URL"

Add `EXPO_PUBLIC_API_URL` line to `readEnv()` in `config/config.ts`.

Update `.env.example` with the new var.

### Step 3: Create Codegen Configuration

Create `codegen.ts` at project root mirroring the API's config:

- Schema: `roll-a-bowl-api/src/schema.gql` (symlink)
- Documents: `graphql/operations/**/*.ts`
- Output: `graphql/generated/`
- Preset: `client`
- Config: `useTypeImports: true`, `enumsAsTypes: true`, scalar mappings

Add `"codegen"` script to `package.json`: `"graphql-codegen --config codegen.ts"`

### Step 4: Create Initial Operation

Create `graphql/operations/index.ts` with a simple smoke-test query (e.g. a `__typename` query or a basic query available on the schema) to verify codegen produces output.

Run `bun run codegen` to generate `graphql/generated/`.

### Step 5: Create Apollo Client with Auth Link

Create `graphql/client.tsx`:

1. **Auth link**: Async — reads token from SecureStore, sets `Authorization: Bearer` header.
2. **Error link**: On 401 network error, calls `signOut()` from auth context.
3. **HTTP link**: `${config.apiUrl}/graphql`.
4. **Chain**: `authLink.concat(errorLink).concat(httpLink)`
5. **Cache**: `new InMemoryCache()`
6. Export a `GraphQLProvider` component that wraps `ApolloProvider` and accepts `children`.

The provider needs access to the auth context (`useAuth`) to get `getToken` and `signOut`, so it must be a component (not a plain function creating a client) rendered inside `AuthProvider`.

### Step 6: Wire ApolloProvider into App Layout

Update `app/_layout.tsx`:

```
AuthProvider
  └── GraphQLProvider        ← new, inside AuthProvider
        └── AuthGate
```

The `GraphQLProvider` only renders `ApolloProvider` when the user is signed in (it can read `isSignedIn` from auth context). When not signed in, no Apollo Client exists (no wasted connections).

### Step 7: Verify End-to-End

1. `tsc --noEmit` passes
2. `bun run codegen` succeeds and generates files
3. App starts without errors
4. (Manual) Sign in → navigate to a screen using a query → data returned with auth header

## Complexity Tracking

No constitution violations to justify. All additions are directly required by the spec.
