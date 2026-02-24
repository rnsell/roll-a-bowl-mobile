---
description: "Task list for Tab Navigator Setup feature implementation"
---

# Tasks: Tab Navigator Setup

**Input**: Design documents from `/specs/001-tab-navigator-setup/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Tests**: Not requested in feature specification. No test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Expo Router mobile app**: `app/` for screens/routes, `components/` for reusable UI, `constants/` for shared values

---

## Phase 1: Setup (Cleanup & Preparation)

**Purpose**: Remove old Expo template files that are replaced by the new tab structure

- [x] T001 Delete old template tab screen at `app/(tabs)/two.tsx`
- [x] T002 Delete unused template component at `components/EditScreenInfo.tsx`

**Checkpoint**: Old template artifacts removed. Project ready for new tab structure.

---

## Phase 2: User Story 1 - Navigate Between App Sections (Priority: P1) MVP

**Goal**: Replace the 2-tab Expo template with a 4-tab bottom navigator (Recipes, Meal Plan, Grocery List, Settings) where each tab displays a themed placeholder screen.

**Independent Test**: Open the app, confirm 4 tabs visible in the tab bar. Tap each tab and verify it navigates to the correct placeholder screen showing the section name and "Coming Soon" message. Confirm Recipes is the default tab on launch.

### Implementation for User Story 1

- [x] T003 [P] [US1] Replace content of `app/(tabs)/index.tsx` with Recipes placeholder screen — centered layout using `Text` and `View` from `@/components/Themed`, displaying title "Recipes" and subtitle "Coming Soon"
- [x] T004 [P] [US1] Create Meal Plan placeholder screen at `app/(tabs)/meal-plan.tsx` — same pattern as Recipes: centered themed layout with title "Meal Plan" and subtitle "Coming Soon"
- [x] T005 [P] [US1] Create Grocery List placeholder screen at `app/(tabs)/grocery-list.tsx` — same pattern as Recipes: centered themed layout with title "Grocery List" and subtitle "Coming Soon"
- [x] T006 [P] [US1] Create Settings placeholder screen at `app/(tabs)/settings.tsx` — same pattern as Recipes: centered themed layout with title "Settings" and subtitle "Coming Soon"
- [x] T007 [US1] Update `app/(tabs)/_layout.tsx` to configure 4-tab navigator — define `Tabs.Screen` entries for `index` (title: "Recipes", icon: `book`), `meal-plan` (title: "Meal Plan", icon: `calendar`), `grocery-list` (title: "Grocery List", icon: `shopping-cart`), `settings` (title: "Settings", icon: `cog`). Remove old Tab One/Two screen entries and the modal link header button. Keep the existing `TabBarIcon` helper using FontAwesome.

**Checkpoint**: App launches with 4-tab navigator. Tapping each tab shows the correct placeholder screen. Recipes is selected by default. Tab bar is visible on all screens.

---

## Phase 3: User Story 2 - Identify Current Section (Priority: P2)

**Goal**: Ensure the active tab is visually distinct from inactive tabs so users always know which section they are viewing.

**Independent Test**: Tap each tab in sequence. Confirm the tapped tab's icon and label change to the active color while all other tabs show the inactive color. Verify in both light and dark mode.

### Implementation for User Story 2

- [x] T008 [US2] Configure explicit active and inactive tab styling in `app/(tabs)/_layout.tsx` — set `tabBarActiveTintColor` from `Colors[colorScheme].tint` and add `tabBarInactiveTintColor` using `Colors[colorScheme].tabIconDefault` in `screenOptions` to ensure clear visual contrast between active and inactive tabs

**Checkpoint**: Active tab is visually distinct (different color for icon and label) from the three inactive tabs. Styling adapts correctly when switching between light and dark mode.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation across platforms and themes

- [x] T009 Run quickstart.md validation at `specs/001-tab-navigator-setup/quickstart.md` — verify all 6 checks pass (tab bar visible, navigation works, placeholder content correct, safe area respected, cross-platform check, dark mode)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 2)**: Depends on Phase 1 (old files must be removed first to avoid route conflicts)
- **User Story 2 (Phase 3)**: Depends on Phase 2 (tab layout must exist before styling it)
- **Polish (Phase 4)**: Depends on Phase 2 and Phase 3

### Within User Story 1

- T003, T004, T005, T006 are all [P] — they create independent files and can run in parallel
- T007 depends on T003–T006 (the layout references screen files by name; all screens should exist first)

### Within User Story 2

- T008 modifies the same file as T007 (`_layout.tsx`) — must run after T007

### Parallel Opportunities

- T001 and T002 can run in parallel (deleting independent files)
- T003, T004, T005, T006 can all run in parallel (creating independent screen files)

---

## Parallel Example: User Story 1

```bash
# Launch all placeholder screen tasks together:
Task: "Replace content of app/(tabs)/index.tsx with Recipes placeholder"
Task: "Create Meal Plan placeholder at app/(tabs)/meal-plan.tsx"
Task: "Create Grocery List placeholder at app/(tabs)/grocery-list.tsx"
Task: "Create Settings placeholder at app/(tabs)/settings.tsx"

# Then after all screens exist:
Task: "Update app/(tabs)/_layout.tsx with 4-tab config"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (delete old files)
2. Complete Phase 2: User Story 1 (create screens + update layout)
3. **STOP and VALIDATE**: Open app, verify 4 tabs work
4. App is functional with basic tab navigation

### Full Feature

1. Complete Setup → old files removed
2. Complete US1 → 4-tab navigation working
3. Complete US2 → active/inactive styling polished
4. Run quickstart.md validation → feature complete

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No test tasks included (tests not requested in spec)
- No data-model.md or contracts/ — feature has no data entities or external interfaces
- All placeholder screens follow the same pattern but are kept as independent files (per research decision D3: no shared PlaceholderScreen abstraction)
- Commit after each phase or logical group
