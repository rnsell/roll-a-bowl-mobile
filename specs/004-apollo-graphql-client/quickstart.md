# Quickstart: Apollo GraphQL Client with Codegen

**Feature**: 004-apollo-graphql-client

## Prerequisites

- Node.js / Bun installed
- `roll-a-bowl-api` symlink exists at project root (pointing to the API repo)
- `.env` contains `EXPO_PUBLIC_API_URL` (e.g. `http://localhost:3000`)

## Setup

```bash
# Install dependencies (already done if on this branch)
bun install

# Run codegen to generate types from the API schema
bun run codegen
```

## Writing a New Query

1. Create a file in `graphql/operations/` (e.g. `graphql/operations/recipes.ts`):

```ts
import { graphql } from '../generated';

export const GetRecipes = graphql(`
  query GetRecipes {
    recipes {
      id
      name
      slug
    }
  }
`);
```

2. Run codegen:

```bash
bun run codegen
```

3. Use in a component:

```tsx
import { useQuery } from '@apollo/client/react';
import { GetRecipes } from '@/graphql/operations/recipes';

function RecipesList() {
  const { data, loading, error } = useQuery(GetRecipes);
  // data is fully typed
}
```

## Writing a Mutation

Same pattern — define in `graphql/operations/`, run codegen, use `useMutation`:

```ts
import { graphql } from '../generated';

export const CreateRecipe = graphql(`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
      name
      slug
    }
  }
`);
```

## Updating Types After API Schema Changes

When the API schema changes:

1. Pull the latest API code (the symlink points to it)
2. Run `bun run codegen`
3. Fix any TypeScript errors surfaced by the updated types

## Key Files

| File | Purpose |
|------|---------|
| `graphql/client.tsx` | Apollo Client setup (auth link, error handling) |
| `graphql/operations/` | Your queries and mutations |
| `graphql/generated/` | Auto-generated types (committed to git) |
| `codegen.ts` | Codegen configuration |
| `config/schema.ts` | API URL env var definition |
