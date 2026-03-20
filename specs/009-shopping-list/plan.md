# Implementation Plan: Shopping List Management

**Branch**: `009-shopping-list` | **Date**: 2026-03-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-shopping-list/spec.md`

## Summary

Replace the mock grocery list screen with a fully functional shopping list connected to the API. Users can generate lists from their meal plan, check off items while shopping, add write-in items, remove items, and navigate between weeks. Family/personal toggle follows the same pattern as meal plans.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)
**Primary Dependencies**: React Native 0.81, Expo 54, Expo Router 6, @apollo/client 4.x, @gorhom/bottom-sheet
**Storage**: Apollo InMemoryCache (query cache), Redux store (user profile/family group state)
**Testing**: Jest + React Native Testing Library (encouraged, not gated)
**Target Platform**: iOS 15+, Android (Expo managed workflow)
**Project Type**: Mobile app
**Performance Goals**: <300ms perceived toggle latency, <5s list generation
**Constraints**: Touch targets >= 44x44pt, safe area compliance
**Scale/Scope**: Single screen rework with new components, ~15 implementation tasks

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First UX | PASS | Collapsible aisle sections, tap-to-toggle, progress bar — all native patterns. Touch targets meet 44pt. |
| II. Performance | PASS | Toggle uses optimistic UI pattern for instant feedback. Apollo cache handles data. No heavy computation. |
| III. Type Safety | PASS | GraphQL codegen provides typed operations. All new code fully typed. |
| IV. Simplicity (YAGNI) | PASS | Replaces existing mock screen. Reuses design system, existing patterns (week nav, mode toggle from meal plan). |
| V. Cross-Platform Parity | PASS | All RN primitives. No platform-specific code. |

No violations. Gate passes.

## Project Structure

### Documentation (this feature)

```text
specs/009-shopping-list/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── shopping-list-operations.graphql
└── tasks.md
```

### Source Code (repository root)

```text
graphql/operations/
└── shopping-list.ts              # All shopping list GraphQL operations (new)

screens/grocery-list/
├── GroceryListScreen.tsx         # Main screen (rewrite)
├── GroceryItem.tsx               # Item component (rewrite)
├── ProgressBar.tsx               # Progress bar (existing, keep)
├── AisleGroup.tsx                # Collapsible aisle section (new)
├── WriteInForm.tsx               # Add custom item input (new)
└── GeneratePrompt.tsx            # Empty state with generate button (new)
```

**Structure Decision**: Reworks the existing `screens/grocery-list/` directory. Replaces mock components with API-connected versions. Adds new components for aisle grouping, write-in, and generation.
