# Contract: GraphQL Client API

**Feature**: 004-apollo-graphql-client
**Date**: 2026-02-24

## Overview

This contract defines how components in the mobile app interact with the GraphQL client layer. It is an internal contract — no external consumers exist.

## Provider Contract

The `ApolloProvider` MUST wrap all authenticated screens. It is placed inside `AuthProvider` in `app/_layout.tsx` so the auth token is available to the Apollo link chain.

```
ThemeProvider
  └── AuthProvider
        └── ApolloProvider        ← new
              └── AuthGate
                    └── Stack (screens)
```

## Usage Contract

Components use Apollo Client's standard hooks with typed document nodes from codegen:

```ts
import { useQuery } from '@apollo/client';
import { graphql } from '@/graphql/generated';

const MyQuery = graphql(`
  query GetRecipes {
    recipes { id title }
  }
`);

function MyComponent() {
  const { data, loading, error } = useQuery(MyQuery);
  // data is fully typed: { recipes: { id: string; title: string }[] }
}
```

## Auth Header Contract

Every GraphQL request includes:

```
Authorization: Bearer <access_token>
```

The token is read from SecureStore via the auth context's `getToken()`. If no token exists, the request proceeds without the header (the auth gate prevents authenticated screens from rendering without a token, so this is a safety fallback).

## Error Handling Contract

| HTTP Status | Behavior |
|-------------|----------|
| 401 | Clear session, redirect to sign-in |
| Network error | Apollo returns `error` object; component decides how to display |
| GraphQL errors (200 with errors) | Apollo returns both `data` and `error`; component handles |

## Codegen Contract

| Concern | Value |
|---------|-------|
| Tool | `@graphql-codegen/cli` v6 |
| Preset | `client` |
| Schema source | `roll-a-bowl-api/src/schema.gql` (symlink) |
| Operations glob | `graphql/operations/**/*.ts` |
| Output | `graphql/generated/` |
| Script | `bun run codegen` |
