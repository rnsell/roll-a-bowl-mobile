# Implementation Plan: Tab Navigator Setup

**Branch**: `001-tab-navigator-setup` | **Date**: 2026-02-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-tab-navigator-setup/spec.md`

## Summary

Replace the default Expo template's 2-tab layout with a 4-tab bottom
navigator for Recipes, Meal Plan, Grocery List, and Settings. Each tab
renders a themed placeholder screen. The existing tab files (`index.tsx`,
`two.tsx`) are replaced; the root layout, modal screen, theme system,
and color constants are preserved and reused.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)
**Primary Dependencies**: Expo 54, Expo Router 6, React Native 0.81,
  React Navigation 7, @expo/vector-icons (FontAwesome)
**Storage**: N/A (no persistence in this feature)
**Testing**: Jest + React Native Testing Library (encouraged, not gated)
**Target Platform**: iOS, Android (web best-effort)
**Project Type**: Mobile app (Expo managed workflow)
**Performance Goals**: 60fps tab transitions, <1s navigation response
**Constraints**: Must stay within Expo managed workflow; no native
  modules outside Expo SDK
**Scale/Scope**: 4 placeholder screens, 1 tab layout file, cleanup of
  2 old template files and 1 unused component

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Mobile-First UX | PASS | Bottom tab bar uses platform-native patterns via Expo Router `<Tabs>`. Safe area respected via `react-native-safe-area-context`. Touch targets use default tab bar sizing (meets 44pt minimum). |
| II. Performance | PASS | Tab navigation is native (no JS-thread animation). Placeholder screens are static views — zero computation. No new dependencies added. |
| III. Type Safety | PASS | All new components will be fully typed TypeScript. Explicit return types on exported components. Props interfaces defined for any shared helpers. |
| IV. Simplicity (YAGNI) | PASS | Minimal placeholder screens with no abstractions. Reuses existing `Themed.tsx` components and `Colors.ts`. No new utilities, helpers, or configuration. |
| V. Cross-Platform Parity | PASS | Expo Router tabs work identically on iOS, Android, and web. No platform-specific code needed. FontAwesome icons render cross-platform. |
| Tech Stack | PASS | No new dependencies. Uses only locked stack: Expo Router, FontAwesome, React Native core. |

No violations. Complexity Tracking section not applicable.

## Project Structure

### Documentation (this feature)

```text
specs/001-tab-navigator-setup/
├── plan.md              # This file
├── research.md          # Phase 0 output (minimal — no unknowns)
├── quickstart.md        # Phase 1 output (verification steps)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/
├── _layout.tsx              # KEEP — root layout (Stack navigator, fonts, theme)
├── (tabs)/
│   ├── _layout.tsx          # MODIFY — replace 2-tab config with 4-tab config
│   ├── index.tsx            # REPLACE — becomes Recipes screen (default tab)
│   ├── meal-plan.tsx        # NEW — Meal Plan placeholder screen
│   ├── grocery-list.tsx     # NEW — Grocery List placeholder screen
│   └── settings.tsx         # NEW — Settings placeholder screen
├── modal.tsx                # KEEP — may be useful for future features
├── +not-found.tsx           # KEEP — 404 fallback
└── +html.tsx                # KEEP — web HTML config

components/
├── Themed.tsx               # KEEP — used by all placeholder screens
├── EditScreenInfo.tsx       # DELETE — Expo template component, no longer referenced
├── ExternalLink.tsx         # KEEP — may be useful for future features
├── StyledText.tsx           # KEEP — may be useful for future features
├── useColorScheme.ts        # KEEP — used by tab layout
├── useColorScheme.web.ts    # KEEP — web variant
├── useClientOnlyValue.ts    # KEEP — used by tab layout
└── useClientOnlyValue.web.ts # KEEP — web variant

constants/
└── Colors.ts                # KEEP — used by tab layout and themed components

app/(tabs)/two.tsx           # DELETE — replaced by new tab screens
```

**Structure Decision**: Expo Router file-based routing. The `(tabs)/`
directory defines the tab group. Each `.tsx` file in it becomes a tab
screen. The `_layout.tsx` inside `(tabs)/` configures the tab bar. This
follows the existing project convention exactly.

**Files modified**: 1 (`app/(tabs)/_layout.tsx`)
**Files created**: 3 (`meal-plan.tsx`, `grocery-list.tsx`, `settings.tsx`)
**Files deleted**: 2 (`app/(tabs)/two.tsx`, `components/EditScreenInfo.tsx`)
**Files replaced**: 1 (`app/(tabs)/index.tsx` — content replaced, file kept)

## Icon Mapping

| Tab | FontAwesome Icon | Rationale |
|-----|-----------------|-----------|
| Recipes | `book` | Represents a recipe book/cookbook |
| Meal Plan | `calendar` | Represents planning/scheduling |
| Grocery List | `shopping-cart` | Represents shopping |
| Settings | `cog` | Universal settings icon |
