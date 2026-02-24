# Feature Specification: Design System

**Feature Branch**: `002-design-system`
**Created**: 2026-02-23
**Status**: Draft
**Input**: User description: "Add a design system with layout components (Box, Row), text components (Caption, Heading, Label, Paragraph) with size variants, Tailwind-style spacing props, and central theming for fonts and colors"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Build Screens with Layout Components (Priority: P1)

A developer building a screen uses Box and Row components to
structure content. Box provides a general-purpose container with
configurable padding, margin, and border styling. Row arranges its
children horizontally. Both components accept shorthand spacing
props (px, py, mx, my, etc.) so the developer can quickly control
layout without writing custom styles.

**Why this priority**: Layout components are the foundation of
every screen. Without them, text components and theming have no
structural context. All other UI work depends on predictable
layout primitives.

**Independent Test**: Can be tested by rendering a screen that
uses Box and Row with various spacing and border props, then
visually confirming the layout matches the expected spacing,
alignment, and border appearance.

**Acceptance Scenarios**:

1. **Given** a developer imports Box, **When** they render it with
   `px={16}` and `py={8}`, **Then** the component renders with 16
   units of horizontal padding and 8 units of vertical padding.
2. **Given** a developer imports Row, **When** they place three
   child elements inside it, **Then** the children are arranged
   horizontally in a single row.
3. **Given** a developer sets `border={1}` and `borderColor`
   on a Box, **When** the component renders, **Then** a visible
   border appears with the specified color and width.
4. **Given** a developer sets `m={16}` on a Box, **When** the
   component renders, **Then** 16 units of margin are applied on
   all sides.
5. **Given** the app is in dark mode, **When** a Box renders with
   a theme-aware `backgroundColor` prop, **Then** the background
   color adapts to the dark theme palette.

---

### User Story 2 - Display Text with Consistent Typography (Priority: P2)

A developer displays text using the design system's text
components: Caption, Heading, Label, and Paragraph. Each text
component exposes size variants (Small, Regular, Large, XLarge)
accessed via compound component syntax (e.g., `<Heading.Regular>`).
Font sizes, weights, and line heights are predefined per variant so
all text across the app maintains typographic consistency.

**Why this priority**: Typography is essential to the user
experience but depends on the theming foundation established with
layout components. Text components consume theme values for font
family and color.

**Independent Test**: Can be tested by rendering each text
component at every size variant and verifying the rendered font
size, weight, and line height match the design system's type scale.

**Acceptance Scenarios**:

1. **Given** a developer writes `<Heading.Regular>`, **When** the
   component renders, **Then** it displays text at the Regular
   heading size with the heading font weight.
2. **Given** a developer writes `<Caption.Small>`, **When** the
   component renders, **Then** it displays text at the smallest
   caption size with appropriate styling.
3. **Given** all four text components (Caption, Heading, Label,
   Paragraph), **When** each is rendered at all four sizes (Small,
   Regular, Large, XLarge), **Then** all 16 combinations render
   with distinct, consistently increasing font sizes.
4. **Given** the app switches between light and dark mode, **When**
   text components render, **Then** the text color adapts to the
   active theme without any developer override.
5. **Given** a developer passes a `color` prop to a text
   component, **When** it renders, **Then** the specified color
   overrides the theme default.

---

### User Story 3 - Apply Consistent Theming Across Components (Priority: P3)

A developer relies on a central theme definition that provides
colors, font families, and spacing scales. Layout and text
components automatically consume theme values so the entire app
maintains visual consistency. When the theme is updated in one
place, all components reflect the change.

**Why this priority**: Theming ties the system together but is
most valuable after the individual components (layout and text)
exist and can consume theme values.

**Independent Test**: Can be tested by modifying a theme value
(e.g., primary color) and verifying that all components using
that token update accordingly without per-component changes.

**Acceptance Scenarios**:

1. **Given** the theme defines a set of named colors, **When** a
   Box uses a theme color for its background, **Then** it renders
   with the correct color from the active theme (light or dark).
2. **Given** the theme defines font families, **When** any text
   component renders, **Then** it uses the theme's configured font
   family.
3. **Given** a theme value is changed (e.g., primary color
   updated), **When** the app re-renders, **Then** all components
   referencing that token reflect the new value.
4. **Given** the device switches between light and dark mode,
   **When** any design system component renders, **Then** it uses
   the correct color palette for the active mode.

---

### Edge Cases

- What happens when conflicting spacing props are provided (e.g.,
  both `p` and `px` on the same component)? More specific props
  (px, py) MUST override the general prop (p).
- What happens when a text component receives no children? It MUST
  render nothing (no empty space or crash).
- What happens when an invalid size variant is accessed (e.g.,
  `<Heading.Medium>`)? The system MUST produce a clear development
  error or fall back to Regular.
- What happens when both a theme color and an explicit color prop
  are provided? The explicit prop MUST take precedence.
- What happens on devices with accessibility font scaling enabled?
  Text components MUST respect the system's font scale setting.

## Requirements *(mandatory)*

### Functional Requirements

**Layout Components (Box & Row)**:

- **FR-001**: The system MUST provide a Box component that renders
  a rectangular container accepting child elements.
- **FR-002**: The system MUST provide a Row component that arranges
  its children in a horizontal layout.
- **FR-003**: Both Box and Row MUST accept shorthand spacing props
  using Tailwind-inspired naming: `p`, `px`, `py`, `pt`, `pb`,
  `pl`, `pr` for padding and `m`, `mx`, `my`, `mt`, `mb`, `ml`,
  `mr` for margin. Values are numeric (points).
- **FR-004**: Both Box and Row MUST accept border-related props:
  `border` (width), `borderColor`, `borderRadius`,
  `borderTopWidth`, `borderBottomWidth`, `borderLeftWidth`,
  `borderRightWidth`.
- **FR-005**: Both Box and Row MUST accept a `backgroundColor`
  prop.
- **FR-006**: Both Box and Row MUST accept `flex`, `alignItems`,
  `justifyContent`, `flexWrap`, `gap`, `width`, and `height` props
  for layout control.
- **FR-007**: Row MUST default its flex direction to horizontal
  (row) with no wrapping. Box MUST default to vertical (column).
  Wrapping behavior can be opted into via the `flexWrap` prop.
- **FR-008**: When both a general prop and a specific directional
  prop are set (e.g., `p={8}` and `px={16}`), the specific prop
  MUST take precedence for its axis.

**Text Components (Caption, Heading, Label, Paragraph)**:

- **FR-009**: The system MUST provide four text component families:
  Caption, Heading, Label, and Paragraph.
- **FR-010**: Each text component family MUST expose four size
  variants: Small, Regular, Large, and XLarge, accessed via
  compound component syntax (e.g., `<Heading.Regular>`,
  `<Caption.XLarge>`).
- **FR-011**: Each size variant within a text family MUST have a
  predefined font size, font weight, and line height that scales
  consistently (Small < Regular < Large < XLarge). Each family MUST
  use a distinct default font weight: Heading=bold,
  Label=semibold, Paragraph=regular, Caption=regular. Weight is
  constant across size variants within a family.
- **FR-012**: All text components MUST inherit the theme's default
  text color and font family.
- **FR-013**: All text components MUST accept a `color` prop that
  overrides the theme default.
- **FR-014**: All text components MUST accept a `textAlign` prop.
- **FR-015**: Text components MUST respect the device's
  accessibility font scaling setting.

**Theming**:

- **FR-016**: The system MUST provide a central theme definition
  that includes: a named color palette (with light and dark mode
  variants), font family definitions, and a type scale (font sizes
  per text component and variant).
- **FR-017**: All design system components MUST automatically
  adapt to light and dark mode based on the device's system
  setting.
- **FR-018**: Theme values MUST be accessible to all design system
  components without requiring manual prop passing on every usage.
- **FR-019**: The existing theme system (Colors.ts and Themed.tsx)
  MUST be superseded or extended by the new design system theme.
- **FR-020**: The four existing placeholder screens (Recipes, Meal
  Plan, Grocery List, Settings) MUST be migrated to use the new
  Box and text components as part of this feature. Old Themed.tsx
  imports in those screens MUST be replaced.

### Key Entities

- **Theme**: Central configuration defining colors (light/dark
  palettes), font families, and the type scale. Single source of
  truth for visual styling.
- **Color Palette**: Named color tokens with distinct values for
  light and dark modes. Required tokens: background, text, primary,
  secondary, accent, border, muted, card, success, error, warning.
- **Type Scale**: Mapping of each text component family (Caption,
  Heading, Label, Paragraph) to its four size variants (Small,
  Regular, Large, XLarge), each with font size, weight, and line
  height.

### Assumptions

- Spacing values are in density-independent points (the default
  React Native unit), not pixels or rems.
- The compound component pattern (`<Heading.Regular>`) is the
  required API. Alternative patterns (e.g., size prop) are not
  in scope.
- The design system replaces and extends the existing Themed.tsx
  components. The four placeholder screens will be migrated to use
  new design system components as part of this feature. Themed.tsx
  will be kept available but no longer imported by migrated screens.
- No animation or transition props are in scope for layout
  components.
- The type scale values (specific font sizes, weights, line
  heights) will be defined during implementation planning. The spec
  requires they exist and scale consistently, not their exact
  values.
- The SpaceMono font already loaded in the project may be used as
  one of the theme font families, but the default body font will
  be the system font.

## Clarifications

### Session 2026-02-23

- Q: Should existing placeholder screens be migrated to use the new design system components as part of this feature? → A: Yes — migrate the 4 placeholder screens to use new Box and text components; keep Themed.tsx available but replace its imports in migrated screens.
- Q: What named color tokens should the palette include? → A: Extended set (11 tokens): background, text, primary, secondary, accent, border, muted, card, success, error, warning.
- Q: Should different text families have different default font weights? → A: Yes — Heading=bold, Label=semibold, Paragraph=regular, Caption=regular. Weight is constant across size variants within a family.
- Q: Should Row wrap children by default when they exceed available width? → A: No wrap by default — children overflow. Wrapping available via explicit `flexWrap` prop.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of design system components (Box, Row, Caption,
  Heading, Label, Paragraph) render correctly in both light and
  dark mode without manual color overrides.
- **SC-002**: All 16 text component + size variant combinations
  (4 families x 4 sizes) render with visually distinct,
  consistently increasing font sizes.
- **SC-003**: A developer can build a new screen layout using only
  Box, Row, and text components without writing any inline style
  objects for spacing, borders, or typography.
- **SC-004**: Changing a single theme color token updates all
  components that reference it across the entire app.
- **SC-005**: Text components respect the device's accessibility
  font scale setting, scaling proportionally when the user
  increases their preferred text size.
