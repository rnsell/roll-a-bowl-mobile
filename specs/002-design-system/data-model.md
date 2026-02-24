# Data Model: Design System

**Date**: 2026-02-23
**Feature**: 002-design-system

## Color Palette

11 named tokens, each with light and dark mode values.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| background | `#FFFFFF` | `#000000` | Screen/container backgrounds |
| text | `#1A1A1A` | `#F5F5F5` | Default text color |
| primary | `#2F95DC` | `#5BB5F0` | Primary actions, active tab tint |
| secondary | `#6C757D` | `#ADB5BD` | Secondary text, supporting UI |
| accent | `#FF6B35` | `#FF8C5A` | Highlights, badges, emphasis |
| border | `#E0E0E0` | `#333333` | Dividers, component borders |
| muted | `#F5F5F5` | `#1A1A1A` | Subtle backgrounds, disabled states |
| card | `#FFFFFF` | `#1C1C1E` | Card/surface backgrounds |
| success | `#28A745` | `#48D068` | Success indicators |
| error | `#DC3545` | `#FF6B6B` | Error messages, destructive actions |
| warning | `#FFC107` | `#FFD54F` | Warning indicators |

**Notes**:
- Light mode `primary` (#2F95DC) matches the existing `tintColorLight`
  from Colors.ts for visual continuity.
- Tab bar active/inactive tint colors will reference `primary` and
  `secondary` tokens respectively (or remain configured separately
  in the tab layout).

## Font Families

| Token | Value | Usage |
|-------|-------|-------|
| body | System default | All text components by default |
| mono | `SpaceMono` | Code/monospace contexts (already loaded) |

**Notes**:
- React Native defaults to the system font (San Francisco on iOS,
  Roboto on Android) when no fontFamily is specified. This is the
  `body` font.
- `SpaceMono` is already loaded in `app/_layout.tsx` via `useFonts`.

## Type Scale

Each text family has 4 size variants. Font weight is constant within
a family (per clarification). Line height uses a ~1.4x multiplier
for readability.

### Heading (weight: bold / 700)

| Variant | Font Size | Line Height |
|---------|-----------|-------------|
| Small | 20 | 28 |
| Regular | 24 | 32 |
| Large | 30 | 38 |
| XLarge | 34 | 42 |

### Paragraph (weight: regular / 400)

| Variant | Font Size | Line Height |
|---------|-----------|-------------|
| Small | 14 | 20 |
| Regular | 16 | 24 |
| Large | 18 | 26 |
| XLarge | 20 | 28 |

### Label (weight: semibold / 600)

| Variant | Font Size | Line Height |
|---------|-----------|-------------|
| Small | 12 | 16 |
| Regular | 14 | 20 |
| Large | 16 | 22 |
| XLarge | 18 | 24 |

### Caption (weight: regular / 400)

| Variant | Font Size | Line Height |
|---------|-----------|-------------|
| Small | 10 | 14 |
| Regular | 12 | 16 |
| Large | 14 | 20 |
| XLarge | 16 | 22 |

**Design rationale**:
- Heading sizes (20–34) aligned with iOS HIG large title range.
- Paragraph Regular (16) is the standard mobile body text size.
- Label is between Paragraph and Caption — suitable for form labels,
  button text, and UI annotations.
- Caption is the smallest family — suitable for timestamps, footnotes,
  and metadata.
- Each family's sizes are distinct and non-overlapping at the Regular
  variant: Caption.Regular(12) < Label.Regular(14) <
  Paragraph.Regular(16) < Heading.Regular(24).
- All sizes respect accessibility font scaling (FR-015) because
  React Native Text allows system scaling by default.

## Spacing Props Interface

Shared by Box and Row components.

### Padding props

| Prop | Maps to | Precedence |
|------|---------|------------|
| p | paddingTop, paddingBottom, paddingLeft, paddingRight | Base |
| px | paddingLeft, paddingRight | Overrides p horizontal |
| py | paddingTop, paddingBottom | Overrides p vertical |
| pt | paddingTop | Overrides py, p |
| pb | paddingBottom | Overrides py, p |
| pl | paddingLeft | Overrides px, p |
| pr | paddingRight | Overrides px, p |

### Margin props

| Prop | Maps to | Precedence |
|------|---------|------------|
| m | marginTop, marginBottom, marginLeft, marginRight | Base |
| mx | marginLeft, marginRight | Overrides m horizontal |
| my | marginTop, marginBottom | Overrides m vertical |
| mt | marginTop | Overrides my, m |
| mb | marginBottom | Overrides my, m |
| ml | marginLeft | Overrides mx, m |
| mr | marginRight | Overrides mx, m |

**Resolution order**: Start with general (p/m), overlay axis (px/py,
mx/my), then overlay specific (pt/pb/pl/pr, mt/mb/ml/mr). Later
values win if defined.
