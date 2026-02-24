# Research: Design System

**Date**: 2026-02-23
**Feature**: 002-design-system

## Overview

The spec is well-defined from the clarification session. No NEEDS
CLARIFICATION markers remain. This research documents the
architectural decisions informed by the existing codebase and React
Native best practices.

## Decision Log

### D1: Theme distribution — hook vs Context provider

**Decision**: Use a `useTheme()` hook backed by `useColorScheme()`.
No new Context provider.

**Rationale**: The existing app detects light/dark mode via
`useColorScheme()` (already has native and web variants). The theme
is a deterministic mapping from color scheme → color palette. A pure
hook that computes `theme.colors[colorScheme]` is the simplest
approach. Adding a Context provider is only needed if runtime theme
switching (beyond system setting) is required — which is out of
scope per the spec.

**Alternatives considered**:
- React Context `ThemeProvider` wrapping the app — rejected per
  YAGNI. Would add a provider layer, context object, and consumer
  hook for no functional benefit when the only input is the system
  color scheme, which `useColorScheme` already provides reactively.
- Static imports (theme.light / theme.dark) without a hook —
  rejected because components wouldn't re-render on system theme
  change.

### D2: Component file organization

**Decision**: Top-level `design-system/` directory with barrel
`index.ts` export. Import path: `@/design-system`.

**Rationale**: Separating from `components/` establishes the design
system as a cohesive module. The `@/` path alias (configured in
tsconfig.json) already supports this. A barrel export keeps consumer
imports clean: `import { Box, Heading } from '@/design-system'`.

**Alternatives considered**:
- Nested under `components/design-system/` — rejected; adds
  unnecessary nesting depth. The design system is a peer concern
  to `components/`, not a sub-module.
- Individual imports from each file — rejected; barrel export is
  standard practice and reduces import noise.

### D3: Compound component implementation

**Decision**: Factory function `createTextFamily(config)` returns
an object with `Small`, `Regular`, `Large`, `XLarge` properties,
each being a React component.

**Rationale**: All 4 text families (Caption, Heading, Label,
Paragraph) share identical variant structure. Only the type scale
config differs (font size, weight, line height per variant). A
factory eliminates duplication while keeping each family's file
simple — just the config + factory call.

**Alternatives considered**:
- Higher-order component (HOC) pattern — rejected; HOCs are
  harder to type correctly in TypeScript and don't enable the
  compound `<Heading.Regular>` syntax as cleanly.
- Single generic `<Typography variant="heading" size="regular">`
  — rejected; the spec requires compound component syntax
  (`<Heading.Regular>`), not a variant prop.

### D4: Spacing prop resolution strategy

**Decision**: Pure function `resolveSpacingStyle(props)` extracts
spacing shorthand props and returns a flat RN style object.
Precedence: specific (pt, pb, pl, pr) > axis (px, py) > general (p).
Same for margin.

**Rationale**: The precedence rule matches Tailwind CSS behavior
(FR-008) and CSS specificity intuition. Both Box and Row share this
function (2 concrete consumers). Pure function = easy to unit test.

**Alternatives considered**:
- Inline resolution in each component — rejected; duplicates
  logic across Box and Row.
- StyleSheet.create at component level — rejected; spacing values
  are dynamic (prop-driven), so StyleSheet.create offers no
  caching benefit.

### D5: Backwards compatibility strategy

**Decision**: Keep `components/Themed.tsx` and `constants/Colors.ts`
intact. New design system lives in `design-system/`. Migrated
screens import from `@/design-system` instead. Old files remain for
any non-migrated code (e.g., `modal.tsx`).

**Rationale**: Avoids breaking existing imports in files not being
migrated in this feature. Clean migration path — each screen can
be migrated independently.

**Alternatives considered**:
- Delete Themed.tsx and Colors.ts, update all imports — rejected;
  `modal.tsx` and potentially other files still reference them.
  Full cleanup is a separate follow-up task.
- Re-export design system from Themed.tsx — rejected; creates
  confusing import indirection.
