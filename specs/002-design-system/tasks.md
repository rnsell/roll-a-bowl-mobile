# Tasks: Design System

**Input**: Design documents from `/specs/002-design-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/component-api.md

**Tests**: Not gated. No test tasks generated (spec states "encouraged, not gated").

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the design-system directory that houses all new components

- [x] T001 Create `design-system/` directory at repository root

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Theme definition, shared types, and theme hook that ALL design system components depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 [P] Define color palette (11 tokens x light/dark), font families (`body`, `mono`), and full type scale (Heading/Paragraph/Label/Caption x 4 sizes) in `design-system/theme.ts` per data-model.md
- [x] T003 [P] Create shared TypeScript interfaces (`SpacingProps`, `BorderProps`, `LayoutProps`, `BoxProps`, `TextFamilyProps`) and implement `resolveSpacingStyle()` pure function with precedence rules (specific > axis > general) in `design-system/types.ts` per contracts/component-api.md
- [x] T004 Implement `useTheme()` hook that reads `useColorScheme()` from `@/components/useColorScheme` and returns resolved `{ colors, fonts, colorScheme }` object in `design-system/useTheme.ts` per contracts/component-api.md

**Checkpoint**: Theme infrastructure ready — component implementation can now begin

---

## Phase 3: User Story 1 — Build Screens with Layout Components (Priority: P1) MVP

**Goal**: Provide Box (column default) and Row (row default) layout primitives with Tailwind-style spacing props, border props, and flex layout props

**Independent Test**: Render a screen using Box and Row with various spacing/border props; visually confirm layout matches expected spacing, alignment, and border appearance

### Implementation for User Story 1

- [x] T005 [P] [US1] Implement Box component as a View wrapper with column flex direction default, consuming `resolveSpacingStyle()` for spacing props, accepting border/layout/backgroundColor/style props in `design-system/Box.tsx`
- [x] T006 [P] [US1] Implement Row component as a View wrapper with row flex direction and nowrap defaults, sharing the same prop interface as Box in `design-system/Row.tsx`

**Checkpoint**: Box and Row render with correct spacing, borders, flex layout, and theme-aware backgroundColor. Both components share spacing resolution from types.ts.

---

## Phase 4: User Story 2 — Display Text with Consistent Typography (Priority: P2)

**Goal**: Provide Caption, Heading, Label, and Paragraph text component families with compound size variants (Small, Regular, Large, XLarge) using predefined type scale values

**Independent Test**: Render all 16 text variants (4 families x 4 sizes); verify font size, weight, and line height match data-model.md type scale; confirm theme color and font family are applied

### Implementation for User Story 2

- [x] T007 [US2] Implement `createTextFamily()` factory function that accepts a type scale config (4 size variants with fontSize/lineHeight + a fontWeight) and returns a compound component object `{ Small, Regular, Large, XLarge }` where each is a React component accepting `TextFamilyProps` in `design-system/createTextFamily.ts`
- [x] T008 [P] [US2] Create Heading text family using `createTextFamily()` with bold/700 weight and Heading type scale from data-model.md in `design-system/Heading.tsx`
- [x] T009 [P] [US2] Create Paragraph text family using `createTextFamily()` with regular/400 weight and Paragraph type scale from data-model.md in `design-system/Paragraph.tsx`
- [x] T010 [P] [US2] Create Label text family using `createTextFamily()` with semibold/600 weight and Label type scale from data-model.md in `design-system/Label.tsx`
- [x] T011 [P] [US2] Create Caption text family using `createTextFamily()` with regular/400 weight and Caption type scale from data-model.md in `design-system/Caption.tsx`

**Checkpoint**: All 16 text variants render with correct font size, weight, line height. Text inherits theme color and font family. Explicit color prop overrides theme default. Accessibility font scaling respected (no `allowFontScaling={false}`).

---

## Phase 5: User Story 3 — Apply Consistent Theming Across Components (Priority: P3)

**Goal**: Assemble the design system barrel export and migrate all 4 placeholder screens to prove end-to-end theming consistency across layout and text components in light and dark mode

**Independent Test**: Switch device between light/dark mode; confirm all migrated screens adapt colors automatically. Modify a theme token value; confirm all components reflect the change.

### Implementation for User Story 3

- [x] T012 [US3] Create barrel export re-exporting Box, Row, Heading, Paragraph, Label, Caption, useTheme, and all public types in `design-system/index.ts`
- [x] T013 [P] [US3] Migrate Recipes screen: replace `@/components/Themed` imports with `@/design-system` Box and Heading/Paragraph components, remove StyleSheet, use spacing props in `app/(tabs)/index.tsx`
- [x] T014 [P] [US3] Migrate Meal Plan screen: replace `@/components/Themed` imports with `@/design-system` Box and Heading/Paragraph components, remove StyleSheet, use spacing props in `app/(tabs)/meal-plan.tsx`
- [x] T015 [P] [US3] Migrate Grocery List screen: replace `@/components/Themed` imports with `@/design-system` Box and Heading/Paragraph components, remove StyleSheet, use spacing props in `app/(tabs)/grocery-list.tsx`
- [x] T016 [P] [US3] Migrate Settings screen: replace `@/components/Themed` imports with `@/design-system` Box and Heading/Paragraph components, remove StyleSheet, use spacing props in `app/(tabs)/settings.tsx`

**Checkpoint**: All 4 screens use design system components. No `@/components/Themed` imports remain in migrated screens. Screens render identically to pre-migration in both light and dark mode. Existing Themed.tsx and Colors.ts remain available for non-migrated files (e.g., modal.tsx).

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify the entire design system compiles and functions correctly

- [x] T017 [P] Verify TypeScript compilation passes with zero errors via `npx tsc --noEmit`
- [x] T018 [P] Run quickstart.md validation checklist (all 10 checks)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 (needs types.ts and useTheme.ts)
- **US2 (Phase 4)**: Depends on Phase 2 (needs theme.ts type scale and useTheme.ts)
- **US3 (Phase 5)**: Depends on Phase 3 AND Phase 4 (barrel exports all components; migrations use them)
- **Polish (Phase 6)**: Depends on Phase 5

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — no dependency on other stories
- **US2 (P2)**: Can start after Foundational — no dependency on US1 (can run in parallel with US1)
- **US3 (P3)**: Depends on US1 AND US2 completion (barrel export + migrations need all components)

### Within Each User Story

- US1: T005 and T006 are parallel (different files, same dependencies)
- US2: T007 first (factory), then T008–T011 in parallel (all use factory, different files)
- US3: T012 first (barrel), then T013–T016 in parallel (different screen files)

### Parallel Opportunities

```text
Phase 2:  T002 ──┐
          T003 ──┼── all parallel (different files)
                 │
          T004 ──┘ (depends on T002 for theme import)

Phase 3:  T005 ──┐── parallel (Box and Row are independent files)
          T006 ──┘

Phase 4:  T007 ──→ T008 ──┐
                   T009 ──┼── all parallel after factory
                   T010 ──┤
                   T011 ──┘

Phase 5:  T012 ──→ T013 ──┐
                   T014 ──┼── all parallel after barrel
                   T015 ──┤
                   T016 ──┘

Phase 6:  T017 ──┐── parallel
          T018 ──┘
```

**Note**: US1 (Phase 3) and US2 (Phase 4) can execute in parallel since neither depends on the other — only on Foundational (Phase 2).

---

## Parallel Example: User Story 1

```bash
# After Foundational phase completes, launch Box and Row in parallel:
Task: "Implement Box component in design-system/Box.tsx"
Task: "Implement Row component in design-system/Row.tsx"
```

## Parallel Example: User Story 2

```bash
# After createTextFamily factory is complete, launch all 4 families in parallel:
Task: "Create Heading text family in design-system/Heading.tsx"
Task: "Create Paragraph text family in design-system/Paragraph.tsx"
Task: "Create Label text family in design-system/Label.tsx"
Task: "Create Caption text family in design-system/Caption.tsx"
```

## Parallel Example: Cross-Story

```bash
# After Foundational phase completes, US1 and US2 can start simultaneously:
# Stream 1 (US1): T005, T006
# Stream 2 (US2): T007 → T008, T009, T010, T011
# Then US3 after both streams complete: T012 → T013, T014, T015, T016
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (theme, types, useTheme)
3. Complete Phase 3: US1 (Box, Row)
4. **STOP and VALIDATE**: Render a test screen with Box/Row and spacing props
5. Layout primitives are usable — foundation in place

### Incremental Delivery

1. Setup + Foundational → Theme infrastructure ready
2. Add US1 (Box, Row) → Layout primitives available → Validate
3. Add US2 (text families) → Typography system complete → Validate
4. Add US3 (barrel + migrations) → Full design system integrated → Validate
5. Polish → TypeScript + quickstart checks → Feature complete

### Single Developer Strategy

Recommended execution order (sequential):

1. T001 → T002, T003 (parallel) → T004
2. T005, T006 (parallel)
3. T007 → T008, T009, T010, T011 (parallel)
4. T012 → T013, T014, T015, T016 (parallel)
5. T017, T018 (parallel)

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story
- No new dependencies required — all components use React Native core (View, Text, StyleSheet)
- Existing `components/Themed.tsx` and `constants/Colors.ts` are kept for backwards compatibility
- Migrated screens replace `@/components/Themed` imports with `@/design-system`
- All text components respect accessibility font scaling by default (React Native Text default behavior)
