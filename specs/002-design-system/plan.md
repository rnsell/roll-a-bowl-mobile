# Implementation Plan: Design System

**Branch**: `002-design-system` | **Date**: 2026-02-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-design-system/spec.md`

## Summary

Add a design system providing layout primitives (Box, Row) with
Tailwind-style spacing props, text component families (Caption,
Heading, Label, Paragraph) with compound size variants
(`<Heading.Regular>`), and a central theme with 11 named color
tokens (light/dark), font families, and a type scale. Migrate the
4 existing placeholder screens to use the new components. The
existing `Themed.tsx` and `Colors.ts` are superseded by the new
theme but kept for backwards compatibility.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)
**Primary Dependencies**: React Native 0.81, Expo 54, Expo Router 6,
  @expo/vector-icons (FontAwesome), React Navigation 7
**Storage**: N/A
**Testing**: Jest + React Native Testing Library (encouraged, not gated)
**Target Platform**: iOS, Android (web best-effort)
**Project Type**: Mobile app (Expo managed workflow)
**Performance Goals**: 60fps transitions, no JS-thread blocking
**Constraints**: No new dependencies; Expo managed workflow only;
  no native modules outside Expo SDK
**Scale/Scope**: 6 components (Box, Row, Caption, Heading, Label,
  Paragraph), 1 theme definition, 4 screen migrations, type
  definitions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Mobile-First UX | PASS | Layout components use React Native View primitives with safe area awareness inherited from the root layout. Box/Row follow RN flexbox conventions natively. |
| II. Performance | PASS | Components are thin wrappers around RN View/Text — no JS-thread computation. Style resolution uses a pure function (prop→style object) with no side effects. No new dependencies added. |
| III. Type Safety | PASS | All component props defined as named TypeScript interfaces. Theme color tokens typed as string literal union. Compound component pattern typed via namespace exports. Explicit return types on all exported functions. |
| IV. Simplicity (YAGNI) | PASS | Box and Row serve all 4 placeholder screens plus every future screen (2+ use cases each). Theme replaces existing Colors.ts which already exists. No utility abstractions beyond the prop→style resolver needed for FR-003/FR-008. Compound text components are the required API — not premature abstraction. |
| V. Cross-Platform Parity | PASS | All components built on RN core primitives (View, Text) which are cross-platform by default. useColorScheme hook already has platform-specific files. No platform-specific code needed in design system. |
| Tech Stack | PASS | No new dependencies. Uses only React Native core (View, Text, StyleSheet), existing useColorScheme hook, and TypeScript. |

No violations. Complexity Tracking section not applicable.

## Project Structure

### Documentation (this feature)

```text
specs/002-design-system/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (theme/type scale definition)
├── quickstart.md        # Phase 1 output (verification steps)
├── contracts/
│   └── component-api.md # Component prop contracts
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
design-system/
├── theme.ts             # NEW — color palette (11 tokens x light/dark),
│                        #   font families, type scale definition
├── useTheme.ts          # NEW — hook to access current theme colors
├── types.ts             # NEW — shared TypeScript interfaces for
│                        #   spacing props, border props, text props
├── Box.tsx              # NEW — layout container (column default)
├── Row.tsx              # NEW — horizontal layout (row default)
├── Caption.tsx          # NEW — Caption text family (compound component)
├── Heading.tsx          # NEW — Heading text family (compound component)
├── Label.tsx            # NEW — Label text family (compound component)
├── Paragraph.tsx        # NEW — Paragraph text family (compound component)
├── createTextFamily.ts  # NEW — factory for compound text components
└── index.ts             # NEW — barrel export for all components

app/
├── _layout.tsx          # KEEP — no changes needed (ThemeProvider
│                        #   from React Navigation already wraps app)
├── (tabs)/
│   ├── _layout.tsx      # KEEP — no changes needed
│   ├── index.tsx        # MODIFY — migrate to Box + Heading + Paragraph
│   ├── meal-plan.tsx    # MODIFY — migrate to Box + Heading + Paragraph
│   ├── grocery-list.tsx # MODIFY — migrate to Box + Heading + Paragraph
│   └── settings.tsx     # MODIFY — migrate to Box + Heading + Paragraph

components/
├── Themed.tsx           # KEEP — backwards compatibility (not imported
│                        #   by migrated screens)
├── useColorScheme.ts    # KEEP — consumed by design-system/useTheme.ts
├── useColorScheme.web.ts # KEEP — web variant
└── ...                  # KEEP — other existing components unchanged

constants/
└── Colors.ts            # KEEP — backwards compatibility (superseded
                         #   by design-system/theme.ts)
```

**Structure Decision**: Design system lives in a top-level
`design-system/` directory (not under `components/`) to establish it
as a standalone module with clear boundaries. The barrel `index.ts`
provides a single import path: `@/design-system`. Existing
`components/` and `constants/` directories remain untouched for
backwards compatibility.

## Design Decisions

### D1: Theme distribution mechanism

**Decision**: A `useTheme()` hook that reads the current color scheme
via the existing `useColorScheme()` hook and returns the resolved
color palette from the theme definition.

**Rationale**: The app already uses `useColorScheme()` for theme
detection. A hook is the simplest distribution mechanism — no
additional Context provider needed because the theme is a pure
function of color scheme. Adding a React Context provider would be
premature (YAGNI) since there's no runtime theme switching beyond
system light/dark mode.

**Alternative rejected**: React Context ThemeProvider — would require
wrapping the app in another provider and adds complexity with no
benefit when the only variable is light/dark, which `useColorScheme`
already handles.

### D2: Compound text component pattern

**Decision**: Use a factory function `createTextFamily()` that
generates a compound component object with `Small`, `Regular`,
`Large`, `XLarge` properties. Each text family file calls this
factory with its specific type scale configuration.

**Rationale**: The 4 text families share identical structure (4 size
variants, same props interface, same theme integration). A factory
avoids duplicating the variant logic 4 times. The factory serves
4 concrete use cases today (not hypothetical), satisfying YAGNI.

**Alternative rejected**: 4 fully independent component files each
with 4 inline sub-components — rejected because it would duplicate
~80 lines of identical prop resolution and theme integration logic
across 4 files.

### D3: Spacing prop resolution

**Decision**: A pure function `resolveSpacingStyle()` in `types.ts`
that converts shorthand props (p, px, py, m, mx, my, etc.) to a
React Native style object. Specific props override general props
(FR-008).

**Rationale**: Both Box and Row need the same prop resolution logic.
A single shared function satisfies both components (2 use cases)
and keeps the resolution logic testable in isolation.

### D4: Color palette values

**Decision**: Extend the existing Colors.ts light/dark pattern with
11 named tokens. Light mode uses a clean neutral palette; dark mode
uses inverted equivalents. Specific hex values defined in
data-model.md.

### D5: Type scale values

**Decision**: Use a standard mobile type scale based on iOS Human
Interface Guidelines ranges. Heading sizes range 20–34pt, Paragraph
12–20pt, Label 12–18pt, Caption 10–16pt. Specific values defined
in data-model.md.

## Icon Mapping

N/A — this feature does not add or modify icons.
