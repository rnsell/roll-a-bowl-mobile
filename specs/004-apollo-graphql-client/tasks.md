# Tasks: Apollo GraphQL Client with Codegen

**Input**: Design documents from `/specs/004-apollo-graphql-client/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install all dependencies needed for Apollo Client and GraphQL codegen

- [x] T001 Install runtime dependencies `@apollo/client` and `graphql` via `bun expo install @apollo/client graphql`
- [x] T002 Install dev dependencies `@graphql-codegen/cli` and `@graphql-codegen/client-preset` via `bun add -d @graphql-codegen/cli @graphql-codegen/client-preset`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: API URL configuration that both the Apollo Client (US1) and codegen verification (US2) depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Add `apiUrl` entry to config schema in `config/schema.ts` with envKey `EXPO_PUBLIC_API_URL`, required: true, pattern `/^https?:\/\//`, description "API base URL"
- [x] T004 [P] Add `EXPO_PUBLIC_API_URL` to `readEnv()` in `config/config.ts`
- [x] T005 [P] Add `EXPO_PUBLIC_API_URL` to `.env.example`

**Checkpoint**: Config module validates API URL — `tsc --noEmit` passes

---

## Phase 3: User Story 1 — Authenticated GraphQL Requests (Priority: P1) 🎯 MVP

**Goal**: A signed-in user can make GraphQL requests that automatically include their auth token. Auth failures trigger sign-out.

**Independent Test**: Sign in → app loads → GraphQL requests include `Authorization: Bearer <token>` header → 401 responses trigger redirect to sign-in.

### Implementation for User Story 1

- [x] T006 [US1] Create `graphql/client.tsx` with Apollo Client factory: auth link (reads token via `getToken()` from `@/auth`, sets `Authorization: Bearer` header), error link (detects 401 network errors, calls `signOut()`), HTTP link (`${config.apiUrl}/graphql`), `InMemoryCache`, and a `GraphQLProvider` component that wraps `ApolloProvider` and accepts children. The provider must use `useAuth()` so it renders inside `AuthProvider`.
- [x] T007 [US1] Create barrel export at `graphql/index.ts` exporting `GraphQLProvider` from `./client`
- [x] T008 [US1] Update `app/_layout.tsx` to wrap `AuthGate` with `GraphQLProvider` inside `AuthProvider`. Provider hierarchy: `ThemeProvider → AuthProvider → GraphQLProvider → AuthGate → Stack`.
- [x] T009 [US1] Verify `tsc --noEmit` passes and app starts without errors

**Checkpoint**: Apollo Client is wired up with auth headers. Every GraphQL request from any screen will automatically include the Bearer token.

---

## Phase 4: User Story 2 — Type-Safe GraphQL Operations (Priority: P2)

**Goal**: Developers run a single codegen command and get fully typed document nodes from the API's GraphQL schema, using the same codegen toolchain as the API.

**Independent Test**: Run `bun run codegen` → `graphql/generated/` directory is created with typed schema and document nodes → `tsc --noEmit` passes → accessing a non-existent field in a typed query produces a compile-time error.

### Implementation for User Story 2

- [x] T010 [US2] Create `codegen.ts` at project root with: schema source `roll-a-bowl-api/src/schema.gql`, documents glob `graphql/operations/**/*.ts`, output `./graphql/generated/`, preset `client`, config `useTypeImports: true`, `enumsAsTypes: true`, scalar mappings (`DateTime: 'string'`, `Date: 'string'`, `JSON: 'Record<string, any>'`), `ignoreNoDocuments: true`.
- [x] T011 [US2] Add `"codegen": "graphql-codegen --config codegen.ts"` script to `package.json`
- [x] T012 [US2] Create initial smoke-test operation in `graphql/operations/index.ts` using a simple query available on the API schema (e.g. a recipe list query or `__typename` query) with `graphql()` tagged template from the generated module
- [x] T013 [US2] Run `bun run codegen` to generate `graphql/generated/` directory and commit the output
- [x] T014 [US2] Verify `tsc --noEmit` passes with generated types and typed document nodes are importable

**Checkpoint**: Codegen matches API's toolchain. Generated types provide full compile-time safety for all operations.

---

## Phase 5: User Story 3 — Developer Workflow for Adding New Operations (Priority: P3)

**Goal**: A developer can add a new GraphQL query or mutation in `graphql/operations/`, run `bun run codegen`, and immediately use the fully typed result in a component.

**Independent Test**: Add a new query file in `graphql/operations/`, run `bun run codegen`, import and use the typed document node in a component, confirm TypeScript provides full type checking and autocompletion.

### Implementation for User Story 3

- [x] T015 [US3] Add a second operation file `graphql/operations/recipes.ts` with a typed query (e.g. `GetRecipes`) to demonstrate the add-operation workflow
- [x] T016 [US3] Run `bun run codegen` and verify the new operation's typed document node appears in `graphql/generated/`
- [x] T017 [US3] Update `app/(tabs)/index.tsx` to use the typed `GetRecipes` query via `useQuery` from `@apollo/client`, replacing the static JWT display with actual data from the API (or displaying both for now)

**Checkpoint**: End-to-end developer workflow validated. Adding a new operation is: write query → run codegen → import typed hook.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup and final verification

- [x] T018 Remove `console.log('[Auth] Redirect URI:', redirectUri)` from `app/sign-in.tsx`
- [x] T019 [P] Remove `console.log('[Auth] JWT:', t)` from `app/(tabs)/index.tsx`
- [x] T020 Run `tsc --noEmit` to verify final build passes with all changes
- [x] T021 Validate quickstart.md instructions match actual file paths and commands in `specs/004-apollo-graphql-client/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational (Phase 2) — does NOT depend on US2
- **US2 (Phase 4)**: Depends on Foundational (Phase 2) — does NOT depend on US1
- **US3 (Phase 5)**: Depends on US1 (Phase 3) + US2 (Phase 4) — needs both client and codegen
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — independent of other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) — independent of US1; **can run in parallel with US1**
- **User Story 3 (P3)**: Depends on both US1 and US2 — needs Apollo Client (US1) and codegen (US2) to demonstrate the full workflow

### Within Each User Story

- Config before client code
- Client before provider wiring
- Codegen config before running codegen
- Generated output before importing typed operations

### Parallel Opportunities

- T004 and T005 can run in parallel (different files, both in Phase 2)
- US1 (Phase 3) and US2 (Phase 4) can run in parallel after Phase 2 completes
- T018 and T019 can run in parallel (different files, both cleanup)

---

## Parallel Example: US1 + US2 After Foundation

```bash
# After Phase 2 completes, these two stories can proceed in parallel:

# Stream A (US1): Apollo Client setup
Task: T006 "Create graphql/client.tsx with auth/error links"
Task: T007 "Create graphql/index.ts barrel export"
Task: T008 "Wire GraphQLProvider into app/_layout.tsx"
Task: T009 "Verify tsc passes"

# Stream B (US2): Codegen setup — can run simultaneously
Task: T010 "Create codegen.ts config"
Task: T011 "Add codegen script to package.json"
Task: T012 "Create initial operation in graphql/operations/index.ts"
Task: T013 "Run codegen and commit generated output"
Task: T014 "Verify tsc passes with generated types"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (install deps)
2. Complete Phase 2: Foundational (config)
3. Complete Phase 3: User Story 1 (Apollo Client + auth)
4. **STOP and VALIDATE**: Authenticated GraphQL requests work
5. Proceed to US2 for type safety

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1: Authenticated client → Can make API calls (MVP!)
3. US2: Codegen → All queries are type-safe
4. US3: Workflow demo → Full developer experience validated
5. Polish → Cleanup debug logs, final verification

### Parallel Team Strategy

With multiple developers after Phase 2:
- Developer A: US1 (Apollo Client + auth link + provider)
- Developer B: US2 (codegen config + initial operation + run codegen)
- Then together: US3 (integrate typed operations into a real screen)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US1 and US2 are independently testable and can be built in parallel
- US3 integrates both and serves as the end-to-end validation
- Generated code in `graphql/generated/` is committed to git (matching API pattern)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
