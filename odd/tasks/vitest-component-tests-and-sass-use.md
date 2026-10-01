# Vitest component tests and Sass module migration

## Objective
Add a Vitest + React Testing Library test setup for the existing ToDo app, cover its current user-facing component and hook behavior, and replace deprecated Sass `@import` usage with `@use` without changing runtime behavior.

## Problem and rationale
The project had no test runner or component tests. Its Sass partial imports resolved, but the successful baseline build emitted Dart Sass deprecation warnings for all six `@import` statements. The user confirmed strict TDD is enabled and selected pnpm as the package manager; existing npm lockfile and other pre-existing user changes must be preserved.

## Scope
- Add Vitest, React Testing Library, and required DOM/test setup using pnpm.
- Add focused behavior tests for the current ToDo hook and interactive UI flows/components.
- Migrate the six Sass imports to Sass `@use`, preserving existing variable behavior.
- Do not change application behavior to resolve unrelated observed quirks.

## Constraints and decisions
- Package manager: pnpm, explicitly selected by the user. Update the pnpm lockfile as needed; leave `package-lock.json`, `.gitignore`, and other unrelated/pre-existing changes untouched.
- TDD mode: strict TDD enabled, confirmed by the user. Source: user's explicit confirmation in this conversation. Exact test runner: `pnpm test`, configured to invoke `vitest run`.
- Sass migration: use an explicit `as *` namespace to preserve current variable references.
- Tests characterize current behavior; no unrelated behavior changes or brittle decorative-icon snapshots.
- No commit or publish unless the user explicitly asks.

## Tasks

- [x] **T1 — Set up Vitest and React Testing Library**
  - Configured Vite-compatible Vitest 0.34, jsdom, React Testing Library, matchers, setup, and the `pnpm test` script.
  - Checks: `pnpm test` passed; production build passed after resolving the authorized Node types pin.

- [x] **T2 — Cover current ToDo behavior with unit/component tests**
  - Added deterministic characterization tests for hook storage/state behavior and app flows: task creation, completion, removal confirmation/cancel, search, filters, modal visibility, and empty/no-result feedback.
  - Evidence: `pnpm test` passed 2 files / 10 tests; no application behavior changes.

- [x] **T3 — Migrate Sass imports to modules**
  - Replaced all six `@import` sites with `@use` and preserved variable references via `as *`.
  - Evidence: build and test pass; neither output contains Sass `@import` deprecation warnings. Sass still emits separate `legacy-js-api` warnings.

- [x] **T4 — Resolve TypeScript / Node type incompatibility**
  - Following explicit user authorization, pinned `@types/node` to 18.11.9, compatible with the project's TypeScript 4.9.5.
  - Evidence: `pnpm run build` passed after the pin.

## Progress and verification
- Completed implementation and checks. The user-authorized dependency commands were:
  - `pnpm add --save-dev vitest@0.34.6 jsdom@22.1.0 @testing-library/react@14.3.1 @testing-library/user-event@14.6.1 @testing-library/jest-dom@6.6.4 --ignore-scripts`
  - `pnpm add --save-dev @types/node@18.11.9 --ignore-scripts`
- Final worker and parent spot-check evidence:
  - `pnpm test`: passed, 2 test files / 10 tests.
  - `pnpm run build`: passed (exit 0).
  - Sass `@import` deprecation warnings are gone; distinct Sass `legacy-js-api` warnings remain.
- Existing user changes were preserved: `.gitignore` was not edited by this work; pre-existing `pnpm-workspace.yaml` and `package-lock.json` were left untouched. The selected pnpm lockfile was updated for the test dependencies.
- Native review inspect identified the pre-existing `.gitignore` modification in the ambient workspace candidate. No START was issued: the candidate would mix that unrelated change and was not a work-unit commit or PR slice. No review receipt was produced.
- No commit or publish was performed.

## Next step
Implementation is complete. If a native review is desired, first prepare a clean work-unit commit or PR slice that excludes the pre-existing `.gitignore` change, then inspect that candidate under the native review flow.