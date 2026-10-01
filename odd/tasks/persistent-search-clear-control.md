# Preserve search across tabs and add clear control

## Objective
Keep the active search query and matching results when switching All/Pending/Done tabs, make the Search icon black, and add a conditional X control immediately to its left that clears the query.

## Decisions
- Search text is shared React state; tab selection changes only the status filter and composes with the current query.
- Clearing the query clears only search text and preserves the selected tab, so results show all tasks in that status.
- The X clear button appears only for a non-empty query and has an accessible name; the existing Search ToDos label and status tabs remain.
- Place the X immediately to the left of the Search icon within the input, following the user's wording; render the Search icon black.

## Tasks

- [x] **T1 — Preserve search across status changes and clearing**
  - Centralized query state in the hook/App; status handlers preserve it. Clearing the query does not select a different tab.
  - Evidence: tests verify the input and matching results persist across All/Pending/Done and clearing shows the selected status's full task set.

- [x] **T2 — Add the conditional clear icon and black Search icon**
  - Added an accessible X button visible only for a non-empty query, immediately left of Search; changed the Search icon to black.
  - Evidence: tests cover conditional visibility, accessible name, clear behavior, input focus retention, tab preservation, and icon color.

- [x] **T3 — Verify the complete change**
  - `pnpm test`: passed, 3 test files / 22 tests.
  - `pnpm run build`: passed; TypeScript and Vite production build completed (66 modules transformed).
  - Independent verification found no issues in query persistence, filter composition, clear focus behavior, or prior accessibility/modal behavior.
  - Sass `legacy-js-api` deprecation warnings remain.

## Progress and verification
- Strict TDD RED evidence: 4 failures before implementation covered query reset, absent clear control, clearing without preserving the tab, and control/color assertions. Final tests pass.
- Search query state is controlled by `useToDos`, and status methods no longer clear it. Search results are composed with the selected status.
- The X clear button reuses `CrossIcon`, appears only with a query, and returns focus to the input after clearing.
- Existing worktree contains prior authorized accessibility/search/modal changes. The user-approved pnpm lock metadata was preserved; this task added no dependency or lockfile changes.
- Native ASSESS was unassessable because untracked files require an explicit declaration. Its fail-closed plan required an independent verifier; the final verifier ran tests/build and found no issues.
- Native review remains unavailable: the configured `review-reliability` relay has no model assigned, and pending review authority is bound to an earlier snapshot. No native verdict/receipt applies to the final candidate.
- No commit or publish was performed.

## Next step
Implementation and checks are complete. If native review is desired, configure the reviewer model and reconcile the pending review authority before starting a review of the final candidate.