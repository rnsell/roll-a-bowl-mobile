<!--
  Sync Impact Report
  ==================
  Version change: (none) → 1.0.0 (initial ratification)
  Modified principles: N/A (initial)
  Added sections: Core Principles (5), Tech Stack Constraints, Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no updates needed (Constitution Check section is generic)
    - .specify/templates/spec-template.md ✅ no updates needed (structure aligned)
    - .specify/templates/tasks-template.md ✅ no updates needed (phase structure compatible)
  Follow-up TODOs: none
-->

# Roll-a-Bowl Mobile Constitution

## Core Principles

### I. Mobile-First UX

The user experience MUST feel native on iOS and Android. Every screen,
interaction, and navigation pattern MUST prioritize touch-based mobile
conventions over web or desktop paradigms.

- All interactive elements MUST meet minimum 44x44pt touch targets.
- Navigation MUST use platform-native patterns (stack, tabs, modals)
  via Expo Router.
- Layouts MUST respect safe areas, notches, and dynamic island on all
  supported devices.
- Offline-tolerant UI MUST degrade gracefully when network is unavailable
  rather than showing blank screens or unhandled errors.

**Rationale**: This is a mobile app first. Users expect a polished,
native-feeling experience. Web support is secondary.

### II. Performance

Animations and transitions MUST target 60fps on mid-range devices.
The app MUST remain responsive under normal usage conditions.

- Animations MUST use React Native Reanimated worklets to run on the
  UI thread, not the JS thread.
- Heavy computations MUST NOT block the main thread. Use async patterns
  or background processing.
- Bundle size MUST be monitored; unnecessary dependencies MUST NOT be
  added without justification.
- Image assets MUST be appropriately sized and compressed for mobile.

**Rationale**: A bowling app relies on smooth visual feedback. Janky
animations break immersion and degrade the core experience.

### III. Type Safety

TypeScript strict mode is enabled and MUST remain enabled. All new code
MUST be fully typed.

- `any` type MUST NOT be used except when interfacing with untyped
  third-party libraries, and MUST be accompanied by a justifying comment.
- Function signatures MUST include explicit return types for exported
  functions and component props.
- Shared data structures MUST be defined as named types or interfaces
  in dedicated type files.
- `@ts-ignore` and `@ts-expect-error` MUST NOT be used without a
  comment explaining why and a tracking issue for resolution.

**Rationale**: Strict typing catches errors at compile time, reducing
runtime crashes on user devices where debugging is difficult.

### IV. Simplicity (YAGNI)

Build only what is needed now. Avoid abstractions, patterns, or
infrastructure that does not serve an immediate, concrete requirement.

- New abstractions MUST justify their existence by serving at least two
  concrete use cases today, not hypothetical future ones.
- Prefer inline solutions over utility files for one-off operations.
- Configuration and feature flags MUST NOT be added preemptively.
- Dependencies MUST solve a real problem; prefer Expo SDK built-ins
  over third-party packages when functionality overlaps.

**Rationale**: The project is early-stage. Premature complexity slows
iteration and obscures the codebase without delivering value.

### V. Cross-Platform Parity

Features MUST work on both iOS and Android. Web support is best-effort
and MUST NOT compromise the mobile experience.

- Platform-specific code MUST use React Native's platform file
  extensions (`.ios.ts`, `.android.ts`, `.web.ts`) or `Platform.select`.
- Features that cannot be implemented on a platform MUST degrade
  gracefully with clear user feedback, not crash.
- UI MUST be tested on both iOS and Android before a feature is
  considered complete.

**Rationale**: Expo enables cross-platform development. Maintaining
parity avoids fragmenting the user experience across platforms.

## Tech Stack Constraints

The following technology choices are locked for this project. Changes
to this section constitute a MAJOR constitution amendment.

| Layer | Choice | Locked Version |
|-------|--------|----------------|
| Framework | React Native | 0.81.x |
| Platform SDK | Expo | 54.x |
| Language | TypeScript (strict) | 5.9.x |
| Routing | Expo Router | 6.x |
| Animations | React Native Reanimated | 4.x |
| UI Primitives | React Native core + Expo modules | — |
| Package Manager | npm | — |

**Allowed additions**: Expo SDK modules, well-maintained community
libraries with >1k GitHub stars and active maintenance.

**Forbidden**: Native module development outside Expo's managed
workflow unless a critical feature absolutely requires it (requires
constitution amendment). Ejecting from Expo is prohibited without
a MAJOR version amendment.

**Testing**: Tests are encouraged, especially for critical game logic
and shared utilities. Test coverage is not gated but SHOULD be added
for any bug fix to prevent regression. Preferred tools: Jest (bundled
with Expo), React Native Testing Library.

## Governance

This constitution is the authoritative source for project-wide rules
and constraints. It supersedes ad-hoc decisions and local conventions
when conflicts arise.

- **Amendments**: Any change to this document MUST be documented with
  a version bump, rationale, and updated date. Principle additions or
  removals are MINOR or MAJOR changes respectively.
- **Versioning**: This document follows semantic versioning:
  - MAJOR: Removing or fundamentally redefining a principle, or
    unlocking a constrained technology choice.
  - MINOR: Adding a new principle or materially expanding guidance.
  - PATCH: Clarifications, typo fixes, non-semantic refinements.
- **Compliance**: All feature specs, implementation plans, and task
  lists MUST include a Constitution Check that verifies alignment with
  these principles before work begins.
- **Guidance**: For runtime development guidance (coding patterns,
  file conventions, commit practices), refer to `CLAUDE.md` at the
  project root. The constitution defines *what* and *why*; guidance
  files define *how*.

**Version**: 1.0.0 | **Ratified**: 2026-02-23 | **Last Amended**: 2026-02-23
