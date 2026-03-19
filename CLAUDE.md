# roll-a-bowl-mobile Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-23

## Active Technologies
- TypeScript 5.9 (strict mode) + React Native 0.81, Expo 54, Expo Router 6, (002-design-system)
- TypeScript 5.9 (strict mode) + `@clerk/clerk-expo`, `expo-secure-store`, `expo-web-browser`, `expo-auth-session`, `expo-apple-authentication`, `@apollo/client`, `graphql` (003-clerk-auth)
- SecureStore (encrypted device keychain) for token persistence; PostgreSQL via API (003-clerk-auth)
- TypeScript 5.9 (strict mode) + `@apollo/client`, `graphql`, `@graphql-codegen/cli`, `@graphql-codegen/client-preset` (004-apollo-graphql-client)
- SecureStore (tokens), Apollo InMemoryCache (query cache) (004-apollo-graphql-client)
- TypeScript 5.9 (strict mode) + React Native 0.81, Expo 54, Expo Router 6, @apollo/client 4.x, @reduxjs/toolkit, react-redux, redux-observable, rxjs (005-mobile-family-groups)
- Redux store (in-memory, cross-cutting state), Apollo InMemoryCache (query cache), SecureStore (auth tokens) (005-mobile-family-groups)
- TypeScript 5.9 (strict mode) + React Native 0.81, Expo 54, Expo Router 6, @apollo/client 4.x, @gorhom/bottom-sheet (new) (006-recipe-creation-modal)
- Apollo InMemoryCache (query cache), local React state (ephemeral form data) (006-recipe-creation-modal)

- TypeScript 5.9 (strict mode) + Expo 54, Expo Router 6, React Native 0.81, (001-tab-navigator-setup)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.9 (strict mode): Follow standard conventions

## Recent Changes
- 006-recipe-creation-modal: Added TypeScript 5.9 (strict mode) + React Native 0.81, Expo 54, Expo Router 6, @apollo/client 4.x, @gorhom/bottom-sheet (new)
- 005-mobile-family-groups: Added TypeScript 5.9 (strict mode) + React Native 0.81, Expo 54, Expo Router 6, @apollo/client 4.x, @reduxjs/toolkit, react-redux, redux-observable, rxjs
- 004-apollo-graphql-client: Added TypeScript 5.9 (strict mode) + `@apollo/client`, `graphql`, `@graphql-codegen/cli`, `@graphql-codegen/client-preset`


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
