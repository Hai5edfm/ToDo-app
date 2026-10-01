# ToDo UI visual polish

## Objective
Improve the existing ToDo app's visual hierarchy and interaction polish without changing its color palette or behavior; add subtle motion and slightly round the dialogs.

## Scope and rationale
The current interface is functional but uses basic spacing, fixed-size dialogs, and sparse interaction states. This change refines layout, spacing, proportions, surfaces, and control feedback; adds restrained entry/hover animations; and gives both dialogs a modest radius.

## Constraints and decisions
- Preserve every existing color value and color-bearing declaration. Do not edit `src/styles/_variables.scss`, SVG/icon JSX colors, or existing Sass color declarations.
- New color-bearing styling may only reuse existing color tokens or `currentColor`; introduce no new palette values.
- Keep the work CSS-only: no component logic, DOM structure, copy, or application behavior changes.
- Respect `prefers-reduced-motion`; animations are subtle, nonessential, and do not block interactions.
- Keep dialogs usable on narrow viewports and preserve their existing content/controls.
- TDD mode remains strict (user-confirmed); exact regression runner is `pnpm test`, with `pnpm run build` for stylesheet/compiler integration. No brittle source-string tests were added for visual properties.
- Do not commit or publish without explicit user request. Preserve all pre-existing worktree changes.

## Tasks

- [x] **T1 — Refine layout and component interaction styling**
  - Improved visual rhythm and alignment for the app shell, task list/cards, search/filter controls, and primary task actions through spacing, sizing, shape, and transitions.
  - Added visible keyboard focus and restrained hover/active feedback while keeping the existing palette; focus outlines use `currentColor`.
  - Evidence: scoped diff review found no changed existing color declarations; no JSX or behavior changes.

- [x] **T2 — Polish modal layout and motion**
  - Gave add/remove dialogs a modest radius and responsive width constraints; added a subtle overlay/dialog entrance animation.
  - Added `prefers-reduced-motion` overrides that reduce/disable authored animations, transitions, and hover movement.
  - Evidence: `pnpm run build` passes and all changed styles remain within authorized surfaces.

- [x] **T3 — Verify visual-only change**
  - `pnpm test`: passed, 2 test files / 10 tests.
  - `pnpm run build`: passed in writer validation and parent spot-check (exit 0).
  - `git diff --check`: passed.
  - Scoped diff review confirmed existing color-bearing declarations/values are unchanged; only a `currentColor` focus outline and transitions referencing existing color states were added. No JSX, behavior, dependencies, or palette values changed.

## Progress and verification
- Implementation is complete across the 12 authorized Sass files: global layout, both modal styles, filter button, task card/list, search/filter controls, and add/complete/close/remove actions.
- Sass continues to report the existing separate `legacy-js-api` deprecation warning. No Sass `@import` warning was present.
- No browser screenshot/manual visual review was available; existing Vitest/jsdom tests do not validate rendered layout or actual browser motion.
- Native review inspect could not be started: the ambient workspace candidate includes the pre-existing `.gitignore` change and earlier uncommitted feature changes, so it is not an isolated work-unit commit or PR slice. No review receipt was produced.
- Existing user changes were preserved. No commit or publish was performed.

## Next step
The CSS implementation and regression checks are complete. Review the UI in a browser for subjective visual tuning; if native review is desired, first prepare an isolated commit or PR slice that excludes unrelated changes.