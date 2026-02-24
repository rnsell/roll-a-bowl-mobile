# Component API Contracts: Design System

**Date**: 2026-02-23
**Feature**: 002-design-system

These contracts define the public API surface for each design system
component. All props are optional unless marked (required).

## Box

Container component. Default flex direction: column.

```text
Props:
  children?: ReactNode

  // Spacing (Tailwind-inspired shorthand)
  p?: number        // padding all sides
  px?: number       // padding horizontal
  py?: number       // padding vertical
  pt?: number       // padding top
  pb?: number       // padding bottom
  pl?: number       // padding left
  pr?: number       // padding right
  m?: number        // margin all sides
  mx?: number       // margin horizontal
  my?: number       // margin vertical
  mt?: number       // margin top
  mb?: number       // margin bottom
  ml?: number       // margin left
  mr?: number       // margin right

  // Border
  border?: number         // borderWidth
  borderColor?: string
  borderRadius?: number
  borderTopWidth?: number
  borderBottomWidth?: number
  borderLeftWidth?: number
  borderRightWidth?: number

  // Layout
  flex?: number
  alignItems?: FlexAlignType
  justifyContent?: FlexJustifyType
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  gap?: number
  width?: DimensionValue
  height?: DimensionValue

  // Appearance
  backgroundColor?: string

  // Pass-through
  style?: ViewStyle       // merged last (lowest precedence)
```

**Defaults**: `flexDirection: 'column'`

---

## Row

Horizontal layout component. Default flex direction: row, no wrap.

```text
Props:
  (identical to Box)
```

**Defaults**: `flexDirection: 'row'`, `flexWrap: 'nowrap'`

---

## Text Component Families

Each family (Caption, Heading, Label, Paragraph) exposes 4 size
variant sub-components.

### Access pattern

```text
<Heading.Small>   <Heading.Regular>   <Heading.Large>   <Heading.XLarge>
<Paragraph.Small> <Paragraph.Regular> <Paragraph.Large> <Paragraph.XLarge>
<Label.Small>     <Label.Regular>     <Label.Large>     <Label.XLarge>
<Caption.Small>   <Caption.Regular>   <Caption.Large>   <Caption.XLarge>
```

### Shared text props (all variants)

```text
Props:
  children?: ReactNode

  // Appearance
  color?: string          // overrides theme text color
  textAlign?: 'auto' | 'left' | 'center' | 'right' | 'justify'

  // Pass-through
  style?: TextStyle       // merged last (lowest precedence)
  numberOfLines?: number  // RN text truncation
```

**Defaults**: color from theme `text` token, font family from
theme `body` font, font size/weight/lineHeight from type scale.

---

## useTheme Hook

```text
function useTheme(): {
  colors: {
    background: string
    text: string
    primary: string
    secondary: string
    accent: string
    border: string
    muted: string
    card: string
    success: string
    error: string
    warning: string
  }
  fonts: {
    body: string | undefined
    mono: string
  }
  colorScheme: 'light' | 'dark'
}
```

Returns the resolved theme for the current color scheme. Components
call this hook internally; developers can also call it directly to
access theme values in custom components.
