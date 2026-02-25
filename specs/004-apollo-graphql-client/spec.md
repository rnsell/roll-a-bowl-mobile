# Feature Specification: Apollo GraphQL Client with Codegen

**Feature Branch**: `004-apollo-graphql-client`
**Created**: 2026-02-24
**Status**: Draft
**Input**: User description: "Now that an auth flow exists its time to set up apollo graphql client to interact with the api. Code gen needs to exist. Preferably the app should use the same code gen system as the api"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Authenticated GraphQL Requests (Priority: P1)

As a signed-in user, I can interact with the API through GraphQL so that the app can fetch and mutate data on my behalf. Every request automatically includes my session token so I never encounter unauthenticated errors during normal use.

**Why this priority**: Without a working, authenticated GraphQL client, no other API-driven features can be built. This is the foundational communication layer between the mobile app and the backend.

**Independent Test**: Can be fully tested by signing in, navigating to a screen that fetches data via GraphQL, and verifying the correct data is returned without authentication errors.

**Acceptance Scenarios**:

1. **Given** a signed-in user with a valid session token, **When** the app makes a GraphQL query, **Then** the request includes an `Authorization: Bearer <token>` header and the API returns the expected data.
2. **Given** a signed-in user whose token has expired or is invalid, **When** the app makes a GraphQL query, **Then** the user is redirected to sign in again.
3. **Given** a user who is not signed in, **When** the app attempts a GraphQL request, **Then** no request is made and the user remains on the sign-in screen.

---

### User Story 2 - Type-Safe GraphQL Operations (Priority: P2)

As a developer, I can write GraphQL queries and mutations with full TypeScript type safety so that I catch data-shape errors at build time rather than at runtime. The code generation system matches what the API uses, so types stay consistent across the stack.

**Why this priority**: Type safety prevents an entire class of runtime bugs and makes development faster by providing autocompletion. Sharing the same codegen approach as the API ensures consistency between what the API produces and what the mobile app consumes.

**Independent Test**: Can be verified by running the codegen command, confirming generated types match the API schema, and confirming that using incorrect field names or types produces TypeScript compilation errors.

**Acceptance Scenarios**:

1. **Given** a GraphQL schema from the API and operation documents in the mobile app, **When** the developer runs the codegen command, **Then** typed query/mutation hooks and result types are generated.
2. **Given** a generated typed query, **When** the developer uses it in a component, **Then** the response data is fully typed and accessing a non-existent field produces a compile-time error.
3. **Given** the API schema has changed, **When** the developer re-runs codegen, **Then** the generated types update to reflect the new schema and any breaking changes surface as TypeScript errors.

---

### User Story 3 - Developer Workflow for Adding New Operations (Priority: P3)

As a developer, I can add a new GraphQL query or mutation by writing the operation in a designated location and running a single command, with no manual type wiring required.

**Why this priority**: A streamlined developer workflow reduces friction when building new features and ensures consistency across the codebase.

**Independent Test**: Can be verified by writing a new GraphQL operation, running the codegen command, and confirming the typed hook is immediately available for import in a component.

**Acceptance Scenarios**:

1. **Given** a developer writes a new GraphQL query in the designated operations directory, **When** they run the codegen command, **Then** a typed hook/function for that query is generated and importable.
2. **Given** a developer writes a query with a typo in a field name, **When** they run the codegen command, **Then** the codegen reports an error indicating the field does not exist in the schema.

---

### Edge Cases

- What happens when the API is unreachable (network offline, server down)? The app should display a meaningful error state, not crash.
- What happens when the GraphQL response contains errors alongside partial data? The client should surface errors to the calling component while still providing any available data.
- What happens when codegen is run without the API schema available? The command should fail with a clear error message explaining how to provide the schema.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The mobile app MUST have a configured Apollo Client instance that sends all GraphQL requests to the API endpoint.
- **FR-002**: Every GraphQL request MUST automatically include the user's session token as an `Authorization: Bearer` header.
- **FR-003**: If a GraphQL response returns an authentication error (e.g. 401), the app MUST clear the session and redirect the user to sign in.
- **FR-004**: The mobile app MUST use `@graphql-codegen/cli` with the `client` preset — the same codegen toolchain the API uses — to generate TypeScript types from the GraphQL schema.
- **FR-005**: A single npm/bun script MUST exist to run codegen (e.g. `npm run codegen`).
- **FR-006**: Codegen MUST consume the API's GraphQL schema as its source of truth.
- **FR-007**: Generated types MUST cover all queries and mutations defined in the mobile app's operation documents.
- **FR-008**: The Apollo Client MUST be available to all screens via a React context provider in the app layout.

### Key Entities

- **Apollo Client Instance**: The configured GraphQL client with auth headers, error handling, and cache policy. Available app-wide via provider.
- **GraphQL Operations**: Developer-authored query and mutation documents that codegen uses to produce typed hooks/functions.
- **Generated Types**: TypeScript types and typed document nodes output by codegen, used by components to ensure type-safe API interactions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can write a GraphQL query and have fully typed results available in their component after running a single codegen command.
- **SC-002**: All GraphQL requests from the app include a valid authorization header without any per-request developer effort.
- **SC-003**: Authentication failures from the API result in the user being redirected to sign in within one request-response cycle.
- **SC-004**: The codegen configuration uses the same tool and preset as the API (`@graphql-codegen/cli` with `client` preset), so schema types are consistent across the stack.
- **SC-005**: The app gracefully handles network failures and API errors without crashing.

## Assumptions

- The API's GraphQL schema is available either as a local `.gql` file (via the symlinked API directory) or via introspection at a known endpoint.
- The API's codegen uses `@graphql-codegen/cli` v6 with the `client` preset, `useTypeImports: true`, and `enumsAsTypes: true`. The mobile app will mirror this configuration.
- Scalar type mappings (`DateTime` → `string`, `Date` → `string`, `JSON` → `Record<string, any>`) will match the API's codegen config.
- The mobile app will store GraphQL operation documents in a dedicated directory (e.g. `graphql/operations/`).
- Apollo Client's normalized in-memory cache is sufficient; no offline/persistent cache is required at this stage.
