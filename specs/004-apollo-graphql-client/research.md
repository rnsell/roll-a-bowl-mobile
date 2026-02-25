# Research: Apollo GraphQL Client with Codegen

**Feature**: 004-apollo-graphql-client
**Date**: 2026-02-24

## Decision: Schema Source for Codegen

**Decision**: Use the local `schema.gql` file from the symlinked API directory (`roll-a-bowl-api/src/schema.gql`).

**Rationale**: The API is symlinked into the mobile project at `roll-a-bowl-api/`. Using the local file means codegen works without a running API server, which is critical for CI and offline development. The API auto-generates `schema.gql` from NestJS GraphQL decorators, so it's always in sync with the running server.

**Alternatives considered**:
- Introspection endpoint (`http://localhost:3000/graphql`) — requires running API server, adds a network dependency to the codegen step. Rejected.
- Copy schema into mobile repo — creates drift risk. Rejected.

## Decision: Codegen Configuration

**Decision**: Mirror the API's `@graphql-codegen/cli` v6 setup with the `client` preset, matching scalar mappings and TypeScript options.

**Rationale**: The user explicitly requested using the same codegen system. Matching config ensures types are identical on both sides of the stack.

**Configuration to mirror from API**:
- Preset: `client`
- `useTypeImports: true`
- `enumsAsTypes: true`
- Scalars: `DateTime: 'string'`, `Date: 'string'`, `JSON: 'Record<string, any>'`

**Alternatives considered**:
- Custom plugins (e.g., `typescript-react-apollo` for hook generation) — adds complexity. The `client` preset with `TypedDocumentNode` works with Apollo Client's `useQuery`/`useMutation` directly. Rejected.

## Decision: Generated Code Git Strategy

**Decision**: Commit generated code to git (matching the API's pattern).

**Rationale**: The API commits its generated types in `lib/graphql/generated/`. Following the same convention keeps the workflow consistent. It also means `tsc --noEmit` works in CI without a codegen step.

**Alternatives considered**:
- Gitignore generated code, run codegen in CI — adds a CI step and means types aren't available for local `tsc` checks without running codegen first. Rejected for this stage.

## Decision: Apollo Client Auth Link

**Decision**: Use Apollo Link chain with an auth link that reads the token from SecureStore and attaches it as a `Bearer` header. An error link detects HTTP 401 responses and calls `signOut()`.

**Rationale**: The existing `auth/auth-context.tsx` stores the OAuth access token in SecureStore. Apollo's link chain is the standard way to inject headers and handle errors globally.

**Design**:
- `authLink`: Reads token from SecureStore via `getToken()`, sets `Authorization: Bearer <token>` header.
- `errorLink`: On network error with status 401, calls `signOut()` to clear tokens and trigger redirect to sign-in (via AuthGate in `_layout.tsx`).
- `httpLink`: Points to `${config.apiUrl}/graphql`.
- Chain: `authLink → errorLink → httpLink`

**Alternatives considered**:
- Passing token via Apollo Client `defaultOptions` — doesn't support async token retrieval. Rejected.
- Using `@apollo/client`'s `setContext` — this IS the authLink approach, just named differently. Aligned.

## Decision: API URL Configuration

**Decision**: Add `EXPO_PUBLIC_API_URL` environment variable to the config module.

**Rationale**: The GraphQL endpoint URL varies between development (`http://localhost:3000`) and production. Adding it to the existing typed config module (`config/schema.ts`) provides validation and type safety, consistent with how Clerk vars are managed.

## Decision: Operations File Organization

**Decision**: Store operations in `graphql/operations/` as `.ts` files using `gql` tagged template literals.

**Rationale**: Matches the API's pattern where operations are TypeScript files with `gql` tags. The `client` preset scans these files and generates typed document nodes.

**Structure**:
```
graphql/
├── operations/    # Developer-authored queries/mutations
├── generated/     # Codegen output (committed)
└── client.tsx     # Apollo Client setup with auth
```
