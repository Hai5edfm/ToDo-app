# Accessible controls, task tabs, and search layout

## Objective
Improve accessibility and focus visibility, align the search controls, remove the visible task-count heading, and replace the current filter dropdown with an accessible All/Pending/Done tab system.

## Decisions
- Remove the visible task-count heading (`You have … tasks pending`), not the `Search ToDos` label or browser document title. Keep a visually hidden “To-do list” heading for page structure.
- Keep an All tab alongside Pending and Done. All is initially selected to preserve the previous default view.
- Pending means incomplete tasks; Done means completed tasks.
- Use existing palette tokens for focus states, especially `$secondary-color`; add no new palette values.
- Preserve task creation, completion, deletion, persistence, modal, and search semantics outside the requested status-tab presentation.

## Tasks

- [x] **T1 — Add accessible names, focus states, and dialog focus management**
  - Added accessible names to icon-only controls, named dialog semantics, polite status feedback, visible `$secondary-color` focus indicators, and the requested search-row alignment.
  - Added shared dialog focus entry, Tab/Shift+Tab containment, opener restoration, and a programmatically focusable fallback for dialogs without focusable children.
  - Evidence: tests cover both dialogs, keyboard boundaries, opener restore, and empty-dialog fallback.

- [x] **T2 — Replace dropdown with All/Pending/Done tabs and remove the counter heading**
  - Added a keyboard-operable tablist with correct selected state and tab/panel relationships; removed the visible task-count heading while preserving a visually hidden page heading.
  - Evidence: tests cover initial All selection, filters, Arrow/Home/End keyboard navigation, accessible names, and heading removal.

- [x] **T3 — Verify and review scope**
  - `pnpm test`: passed, 3 test files / 17 tests.
  - `pnpm run build`: passed (TypeScript and Vite production build).
  - `git diff --check`: passed during the implementation verification.
  - Independent verification confirmed tab/panel references, named controls/dialogs, modal focus handling, and unchanged CRUD/persistence behavior. Sass `legacy-js-api` warnings remain.
  - Limitations: no browser screenshot or assistive-technology audit was run; tests cannot establish visual alignment or real screen-reader behavior.

- [x] **T4 — Reconcile the pnpm lockfile side effect**
  - pnpm generated a package-manager metadata block in `pnpm-lock.yaml`; the user explicitly chose to keep it.

## Progress and verification
- Strict TDD was confirmed by the user. Tests first failed for missing heading/tabs/names and later for dialog focus behavior; the final suite passes.
- Focus uses existing `$secondary-color` (no new color literals). The search icon/filter alignment was adjusted around the input row.
- Native review reached a medium-risk reviewing state, but the `review-reliability` host relay failed because no model is configured. STATUS reoffered the same reviewer slot; no further capture was performed. The source then changed to fix modal focus, so no native verdict/receipt applies to the final candidate.
- Native ASSESS was unassessable because untracked files require an explicit declaration; its fail-closed plan required an independent verifier, which reviewed the final candidate and ran the successful test/build commands.
- No commit or publish was performed.

## Next step
Implementation and available checks are complete. A native review of the final candidate remains unavailable until a `review-reliability` model is configured and the pending native review authority is reconciled.