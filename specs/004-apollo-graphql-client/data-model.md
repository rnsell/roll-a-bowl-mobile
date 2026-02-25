# Data Model: Apollo GraphQL Client with Codegen

**Feature**: 004-apollo-graphql-client
**Date**: 2026-02-24

## Overview

This feature is infrastructure — it does not introduce new domain entities. The "data model" here describes the configuration and runtime objects that comprise the GraphQL client layer.

## Entities

### Config Entry: `apiUrl`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| envKey | `EXPO_PUBLIC_API_URL` | Yes | Base URL of the API (e.g. `http://localhost:3000`) |
| pattern | `^https?://` | — | Must be a valid HTTP(S) URL |

Added to the existing `config/schema.ts` alongside Clerk OAuth vars.

### Apollo Client Instance

| Concern | Implementation |
|---------|---------------|
| HTTP endpoint | `${config.apiUrl}/graphql` |
| Auth | `Authorization: Bearer <token>` via auth link |
| Error handling | 401 → `signOut()` via error link |
| Cache | `InMemoryCache` (default normalized cache) |
| Provider | `ApolloProvider` wrapping app in `_layout.tsx` |

### Generated Types (from codegen)

| File | Purpose |
|------|---------|
| `graphql/generated/graphql.ts` | All TypeScript types from the API schema |
| `graphql/generated/gql.ts` | Typed document node map for operations |
| `graphql/generated/index.ts` | Barrel re-exports |
| `graphql/generated/fragment-masking.ts` | Fragment masking utilities |

### Scalar Mappings

| GraphQL Scalar | TypeScript Type |
|---------------|-----------------|
| `DateTime` | `string` |
| `Date` | `string` |
| `JSON` | `Record<string, any>` |
