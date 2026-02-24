# Quickstart: Design System

**Feature**: 002-design-system
**Date**: 2026-02-23

## Prerequisites

- Node.js installed
- npm dependencies installed (`npm install`)
- Expo CLI available (`npx expo`)
- iOS Simulator or Android Emulator (or Expo Go on physical device)

## Run the App

```bash
npx expo start
```

Press `i` for iOS, `a` for Android, or scan the QR code with
Expo Go.

## Verify the Feature

### 1. Placeholder screens use design system components

- Navigate to each tab (Recipes, Meal Plan, Grocery List, Settings).
- Confirm each screen displays the section title and "Coming Soon"
  text.
- Verify screens look the same as before migration (no visual
  regression).

### 2. Theme colors in light mode

- Ensure the device is in light mode.
- Confirm screen backgrounds are white (#FFFFFF).
- Confirm text is dark (#1A1A1A).
- Confirm the tab bar active tint is blue (#2F95DC).

### 3. Theme colors in dark mode

- Switch the device to dark mode.
- Confirm screen backgrounds are black (#000000).
- Confirm text is light (#F5F5F5).
- Confirm the tab bar active tint adjusts for dark mode.

### 4. Typography variants render correctly

- Temporarily add all 16 text variants to a test screen (or use
  the Recipes placeholder as a scratch pad):
  - `<Heading.Small>`, `<Heading.Regular>`, `<Heading.Large>`,
    `<Heading.XLarge>`
  - Same for Paragraph, Label, Caption
- Confirm each variant renders at a visibly distinct size.
- Confirm Heading text is bold, Label is semibold, Paragraph and
  Caption are regular weight.

### 5. Box spacing props

- Render a Box with `px={24}` and `py={16}` containing colored text.
- Confirm visible horizontal padding (24pt) and vertical padding
  (16pt) around the text.
- Render a Box with `border={1}` and `borderColor` set to a visible
  color. Confirm the border appears.

### 6. Row horizontal layout

- Render a Row containing three small Box components.
- Confirm they are arranged horizontally in a single line.
- Confirm the Row does not wrap by default when children are narrow.

### 7. Prop precedence

- Render a Box with `p={8}` and `px={24}`.
- Confirm horizontal padding is 24pt (px overrides p) and vertical
  padding is 8pt (p applies).

### 8. Cross-platform check

- Run on both iOS and Android.
- Confirm all design system components render identically on both
  platforms.

### 9. Accessibility font scaling

- Increase the device text size setting (Settings > Accessibility >
  Display > Larger Text on iOS, or Settings > Display > Font Size
  on Android).
- Confirm text components scale proportionally.

### 10. TypeScript compilation

- Run `npx tsc --noEmit`.
- Confirm zero errors.

## Expected Result

All 10 checks pass. The design system provides themed layout and
text components that render correctly across platforms and themes.
