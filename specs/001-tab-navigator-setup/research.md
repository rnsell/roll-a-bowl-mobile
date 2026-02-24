# Research: Tab Navigator Setup

**Date**: 2026-02-23
**Feature**: 001-tab-navigator-setup

## Overview

This feature has no unknowns requiring research. The existing codebase
already demonstrates the exact pattern needed (Expo Router file-based
tabs with FontAwesome icons and themed components). This document
records the decisions made from inspecting the existing code.

## Decision Log

### D1: Tab routing approach

**Decision**: Use Expo Router file-based routing with the existing
`(tabs)/` route group pattern.

**Rationale**: The project already uses this pattern for its 2-tab
template. Expo Router 6 treats each `.tsx` file in `(tabs)/` as a tab
screen. The `_layout.tsx` inside the group configures the tab bar. No
alternative approach is warranted.

**Alternatives considered**:
- React Navigation `createBottomTabNavigator` directly — rejected
  because Expo Router wraps this and provides file-based routing, which
  the project already uses.

### D2: Icon library

**Decision**: Continue using `@expo/vector-icons/FontAwesome` with the
existing `TabBarIcon` helper pattern from the template.

**Rationale**: Already installed and loaded in the root layout
(`FontAwesome.font` is loaded via `useFonts`). No additional dependency
needed.

**Alternatives considered**:
- Ionicons or MaterialIcons — rejected; FontAwesome is already loaded
  and has suitable icons for all four tabs.
- Custom SVG icons — rejected per YAGNI; FontAwesome icons are
  sufficient for placeholder screens.

### D3: Placeholder screen pattern

**Decision**: Each placeholder screen uses the existing `Themed.tsx`
`Text` and `View` components with centered layout showing the section
name and a "Coming Soon" subtitle.

**Rationale**: Matches the existing template screen pattern. Reuses
theme-aware components for automatic dark/light mode support. Minimal
code, easy to replace later.

**Alternatives considered**:
- Shared `PlaceholderScreen` component with a `title` prop — rejected
  per YAGNI. Four simple screens with nearly identical but independent
  content is preferable to a premature abstraction. Each screen will
  diverge significantly in future features.

### D4: File naming for tab screens

**Decision**: Use `index.tsx` for Recipes (default tab), `meal-plan.tsx`,
`grocery-list.tsx`, and `settings.tsx`.

**Rationale**: Expo Router uses the filename as the route segment.
`index.tsx` maps to `/` (the default route within the tab group),
making Recipes the default tab on launch (FR-006). Kebab-case filenames
follow React Native community conventions.

**Alternatives considered**:
- `recipes.tsx` instead of `index.tsx` — rejected because `index.tsx`
  is the Expo Router convention for the default route in a group. Using
  it for Recipes ensures it loads first without extra configuration.

### D5: Cleanup of template files

**Decision**: Delete `app/(tabs)/two.tsx` and `components/EditScreenInfo.tsx`.

**Rationale**: `two.tsx` is the old second tab, fully replaced.
`EditScreenInfo.tsx` is a template-only developer guidance component
not referenced by any new screen. Keeping dead code violates Simplicity
(YAGNI).

**Alternatives considered**:
- Keep `EditScreenInfo.tsx` for potential reuse — rejected; it displays
  Expo template instructions that are not relevant to this project.
