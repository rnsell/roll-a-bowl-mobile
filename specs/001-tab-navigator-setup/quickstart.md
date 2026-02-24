# Quickstart: Tab Navigator Setup

**Feature**: 001-tab-navigator-setup
**Date**: 2026-02-23

## Prerequisites

- Node.js installed
- npm dependencies installed (`npm install`)
- Expo CLI available (`npx expo`)
- iOS Simulator or Android Emulator configured (or physical device
  with Expo Go)

## Run the App

```bash
npx expo start
```

Then press `i` for iOS Simulator, `a` for Android Emulator, or scan
the QR code with Expo Go on a physical device.

## Verify the Feature

### 1. Tab bar visible on launch

- Open the app.
- Confirm a bottom tab bar appears with exactly four tabs:
  **Recipes**, **Meal Plan**, **Grocery List**, **Settings**.
- Confirm **Recipes** is the active (highlighted) tab by default.

### 2. Tab navigation works

- Tap each tab in sequence: Meal Plan, Grocery List, Settings, Recipes.
- Confirm each tap immediately shows that tab's placeholder screen.
- Confirm the active tab's icon and label change color to indicate
  it is selected.

### 3. Placeholder content correct

- On each tab screen, confirm:
  - The section name is displayed (e.g., "Recipes", "Meal Plan").
  - A "Coming Soon" message (or similar) is visible.
  - The screen uses the correct theme (matches system light/dark mode).

### 4. Safe area respected

- On a device with a notch or home indicator (e.g., iPhone with
  Dynamic Island, Android with gesture navigation):
  - Confirm the tab bar is not obscured by the home indicator.
  - Confirm the screen content does not overlap the status bar or
    notch area.

### 5. Cross-platform check

- Run on both iOS and Android.
- Confirm identical tab layout, icons, labels, and navigation behavior
  on both platforms.

### 6. Dark mode

- Toggle the device to dark mode (Settings > Display).
- Confirm the tab bar, active/inactive colors, and placeholder screen
  backgrounds all adapt to the dark theme.

## Expected Result

All six checks pass. The app displays a functional 4-tab navigator
with themed placeholder screens ready for future feature implementation.
