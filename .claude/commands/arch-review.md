---
description: Review code for architectural pattern violations — design system usage, prop-driven styling, component prop objects, and Suspense patterns.
---

## User Input

```text
$ARGUMENTS
```

Consider the user input before proceeding. The user may specify:
- Specific file paths to review
- A directory to review
- A glob pattern like `screens/**/*.tsx`
- Nothing (review recently modified files via git status)

## Goal

Identify architectural pattern violations by comparing implementation against the project's mobile architecture standards. This is a read-only analysis that produces a structured report.

## Constraints

- STRICTLY READ-ONLY: Do not modify any files
- Design system components and props are the authoritative styling mechanism
- Output a structured Markdown report

## Execution Steps

### Step 1: Load Architecture Patterns

Read CLAUDE.md and `design-system/index.ts` to extract the authoritative patterns:

**Design System Components:**
- **Layout**: `Box`, `Row`, `SafeAreaBox`, `ScrollBox`, `Card`, `ContentRow` — MUST be used instead of raw `View`
- **Text**: `Heading`, `Paragraph`, `Label`, `Caption` (each with `.Small`, `.Regular`, `.Large`, `.XLarge` variants) — MUST be used instead of raw `Text`
- **Interactive**: `Button` — MUST be used instead of raw `TouchableOpacity`/`Pressable`
- **Theme**: `useTheme()` hook — MUST be used for colors instead of hardcoded values

**Prop-Driven Styling:**
- Read `design-system/types.ts` to understand available props
- Spacing props (`p`, `px`, `py`, `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr`, `pt`, `pb`, `pl`, `pr`, `gap`) MUST be used over `style` objects for spacing
- Layout props (`flex`, `alignItems`, `justifyContent`, `flexGrow`, `flexShrink`, `flexWrap`, `overflow`) MUST be used over `style` objects
- Appearance props (`backgroundColor`, `borderRadius`, `width`, `height`, `border`, `borderColor`) MUST be used over `style` objects
- `style` prop is acceptable ONLY for properties without prop equivalents (`transform`, `opacity`, `position`, `zIndex`, `shadow*`)

**Component Conventions:**
- Components with more than 3 props MUST define a named props type/interface
- Function components MUST have typed parameters (no `any`, no untyped destructuring)

**Suspense Patterns:**
- `useSuspenseQuery` MUST be in a child component, wrapped by `<Suspense>` in the parent
- `<Suspense>` boundaries MUST have a `fallback` prop
- The query call and `<Suspense>` boundary MUST NOT be in the same component

### Step 2: Identify Files to Review

If user provided paths: review those files.
If no input: find modified files via `git diff --name-only HEAD~1` and `git diff --name-only` (unstaged).

Filter to `.tsx` and `.ts` files under `screens/`, `components/`, and `app/`.

**Exempt from review:**
- Files under `design-system/` (the design system itself)
- Test/spec files
- Generated files (e.g., `graphql/generated/`)

If no files match, report "No reviewable files found" and exit.

### Step 3: Run Detection Passes

For each file in the review set, check for the following violations:

#### A. Design System Usage

- **DS-IMPORT**: File imports `View`, `Text`, `TouchableOpacity`, or `Pressable` from `react-native` when a design system equivalent exists (`Box`, `Row`, `Heading`, `Paragraph`, `Label`, `Caption`, `Button`).
- **DS-MISSING**: File creates layout containers using raw `View` instead of `Box`/`Row`/`SafeAreaBox`/`ScrollBox`.
- **DS-TEXT**: File uses raw `Text` from `react-native` instead of the typed text components (`Heading`, `Paragraph`, `Label`, `Caption`).
- **DS-THEME**: File uses hardcoded color values (hex codes, `rgb()`, named colors) instead of `useTheme()` color tokens. Exception: colors used within design system files themselves.

#### B. Props Over Style Objects

- **STYLE-OBJ**: Component uses inline `style={{ }}` objects for properties that are available as component props (spacing: `p`, `px`, `py`, `m`, `mx`, `my`, etc.; layout: `flex`, `alignItems`, `justifyContent`, `gap`, `flexGrow`; appearance: `backgroundColor`, `borderRadius`, `width`, `height`).
- **STYLE-SPREAD**: File creates `StyleSheet.create()` blocks for styles that could be expressed as design system props. Flag when the stylesheet defines padding, margin, flex, or alignment styles applied to `Box`/`Row` components.
- **STYLE-INLINE-OK**: Do NOT flag `style` prop usage for properties that have no prop equivalent (e.g., `transform`, `opacity`, `position`, `zIndex`, `shadowColor`). These are acceptable.

#### C. Component Prop Objects

- **PROPS-INLINE**: Component accepts more than 3 individual props without a defined props type/interface. Every component should have a named props type (e.g., `type RecipeCardProps = { ... }` or `interface RecipeCardProps { ... }`).
- **PROPS-ANY**: Props typed as `any` or untyped function components (missing return type or parameter types).
- **PROPS-DESTRUCTURE**: Component function signature uses inline destructuring without a named type. Prefer `function Foo(props: FooProps)` or `function Foo({ x, y }: FooProps)` over untyped destructuring.

#### D. Suspense Patterns

- **SUSPENSE-MISSING**: Component uses `useSuspenseQuery` but no ancestor in the same file wraps it in a `<Suspense>` boundary. The component using `useSuspenseQuery` should be a child component rendered inside a `<Suspense>` wrapper in the parent/screen component.
- **SUSPENSE-FALLBACK**: `<Suspense>` boundary has no `fallback` prop, or fallback is `null` without explicit justification.
- **SUSPENSE-GRANULARITY**: A single `<Suspense>` boundary wraps multiple independent data-fetching components that could load independently. Recommend separate boundaries for independent queries.
- **SUSPENSE-SPLIT**: The `useSuspenseQuery` call and the `<Suspense>` boundary are in the same component (they should be split — the query in a child, the boundary in the parent).

### Step 4: Severity Assignment

- **CRITICAL**: Using raw `View`/`Text` imports when design system components exist; `useSuspenseQuery` without any `Suspense` boundary; props typed as `any`.
- **HIGH**: Inline style objects for props that exist on design system components; missing component props type; `Suspense` and query in same component.
- **MEDIUM**: `StyleSheet.create` for prop-equivalent styles; hardcoded colors outside design system; missing Suspense fallback.
- **LOW**: Style prop used for non-prop-equivalent CSS properties (acceptable but worth noting if excessive); minor prop naming suggestions.

### Step 5: Produce Report

Output a Markdown report:

```
## Architecture Review Report

**Files reviewed:** N
**Violations found:** N (Critical: N, High: N, Medium: N, Low: N)

### Findings

| # | Rule | Severity | File:Line | Description | Suggested Fix |
|---|------|----------|-----------|-------------|---------------|

### Summary by Category

| Category | Violations |
|----------|------------|
| Design System Usage | N |
| Props over Styles | N |
| Component Prop Objects | N |
| Suspense Patterns | N |

### Recommendations

(Prioritized list of the top issues to address)
```

If zero violations: output a clean report confirming compliance.

### Step 6: Offer Next Steps

- If CRITICAL issues: Block merge until resolved
- If HIGH issues: Should fix before merge
- If only MEDIUM/LOW: Safe to merge with follow-up

Ask: "Would you like me to fix the Critical/High issues?" Do NOT apply fixes automatically.

## Operating Principles

- **NEVER modify files** (read-only analysis)
- **Be pragmatic**: Only flag real violations, not edge cases or acceptable patterns
- **Context matters**: A `style` prop is fine for properties without prop equivalents — don't over-flag
- **Design system files are exempt**: Don't flag the design system itself for using raw RN primitives
- **Test files are exempt**: Don't flag test/spec files for architecture violations
- **Limit to 50 findings**: Aggregate overflow into a summary count

## Context

$ARGUMENTS
