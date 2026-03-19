# Implementation Plan: Meal Plan Management

**Branch**: `008-meal-plan-management` | **Date**: 2026-03-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-meal-plan-management/spec.md`

## Summary

Add full meal plan management to the mobile app: week navigation, adding recipes via a picker modal, ad-hoc quick meals, removing/editing entries, snacks support, and family/personal mode toggle. The API already supports all required queries and mutations — this feature is purely mobile UI and GraphQL operation wiring.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)
**Primary Dependencies**: React Native 0.81, Expo 54, Expo Router 6, @apollo/client 4.x, @gorhom/bottom-sheet
**Storage**: Apollo InMemoryCache (query cache), Redux store (user profile/family group state)
**Testing**: Jest + React Native Testing Library (encouraged, not gated)
**Target Platform**: iOS 15+, Android (Expo managed workflow)
**Project Type**: Mobile app
**Performance Goals**: 60fps animations, <1s week navigation
**Constraints**: Touch targets >= 44x44pt, safe area compliance, offline-tolerant degradation
**Scale/Scope**: Single screen with modals/sheets, ~12 implementation tasks

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First UX | PASS | All interactions use native patterns (stack, tabs, modals, bottom sheets). Touch targets meet 44pt minimum. Safe area handled by SafeAreaBox. |
| II. Performance | PASS | No heavy computation. Week navigation uses simple date math. Apollo cache handles data. No animations beyond standard RN transitions. |
| III. Type Safety | PASS | All new code will be fully typed. GraphQL codegen provides typed operations. No `any` usage planned. |
| IV. Simplicity (YAGNI) | PASS | Builds on existing screen/components. No new abstractions — reuses design system, existing patterns. Copy Last Week / Auto-Fill explicitly out of scope. |
| V. Cross-Platform Parity | PASS | All components use cross-platform RN primitives. No platform-specific code needed. |

No violations. Gate passes.

## Project Structure

### Documentation (this feature)

```text
specs/008-meal-plan-management/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── meal-plan-operations.graphql
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
graphql/operations/
└── meal-plan.ts                    # All meal plan GraphQL operations

screens/meal-plan/
├── MealPlanScreen.tsx              # Main screen (existing, enhanced)
├── DayPill.tsx                     # Day selector pill (existing)
├── MealSlotCard.tsx                # Meal slot card (existing, enhanced)
├── MealEntryRow.tsx                # Individual meal entry within a slot (new)
└── RecipePickerModal.tsx           # Recipe search & select modal (new)
```

**Structure Decision**: Extends the existing `screens/meal-plan/` directory. No new routes needed — meal management happens via modals and inline interactions on the existing Meal Plan tab screen.
