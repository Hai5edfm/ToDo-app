# Search controls, empty state, and modal backdrop behavior

## Objective
Remove the obsolete filter icon, place the search icon inside the search input, remove the todo list's left indentation, show the active query in no-results feedback, and close modals when the backdrop is clicked.

## Decisions
- Remove only the obsolete filter icon/button from the search row; keep the functional All/Pending/Done tabs.
- Keep the search field's accessible label and current focus behavior while moving its decorative search icon into the input wrapper.
- Reset the todo list's own inline-start padding without shifting the shared search/tabs/main container.
- Render clear no-results feedback from current React query state; use distinct status-specific messages when Pending/Done tabs are empty without a query.
- A click on the overlay closes either modal only when the overlay itself is the target; clicks within dialog content must not close it.

## Tasks

- [x] **T1 — Refine the search controls and list indentation**
  - Removed the obsolete filter icon from the search row; moved the decorative search icon into the input wrapper; set the todo list `padding-inline-start: 0` without changing shared `main` spacing.
  - Evidence: App tests check the icon placement and continued presence of All/Pending/Done tabs; independent review confirmed list/main styles.

- [x] **T2 — Fix no-results feedback**
  - Passed active query explicitly from React state and removed the DOM lookup. Actual search misses render grammatical text including the query. Empty Pending/Done filters render status-specific messages rather than `No results for “”.`; empty-list feedback remains distinct.
  - Evidence: tests cover matching results, a real no-match query, empty status tabs, and the empty-list state.

- [x] **T3 — Close modals from the backdrop**
  - Added backdrop-only click handling to the shared modal portal and wired it to close the current modal.
  - Evidence: tests verify clicks inside both dialogs do not close them, backdrop clicks do, and focus returns to each opener.

- [x] **T4 — Verify the complete change**
  - `pnpm test`: passed, 3 test files / 21 tests.
  - `pnpm run build`: passed; TypeScript and Vite production build completed.
  - Independent final verification confirmed the requested behavior and existing accessible tabs/modal focus behavior. Both checks emit existing Sass `legacy-js-api` deprecation warnings.

## Progress and verification
- TDD RED evidence: three original tests failed for icon placement, no-results wording, and backdrop behavior. A follow-up independent check found empty status tabs showed an empty-query no-results message; two new tests reproduced it. All 21 tests pass after corrections.
- No dependency or lockfile edits were made during this feature; the user-approved pnpm metadata from the prior task was preserved.
- No browser-level pixel/layout check was run; CSS structure and declarations were inspected and the build passed.
- Native ASSESS was unassessable because the worktree includes untracked files that require an explicit declaration. Its fail-closed plan required an independent verifier, which reviewed the final candidate and ran the passing tests/build.
- Native review remains unavailable: the configured `review-reliability` relay has no model assigned, and the pending review authority is bound to an earlier snapshot. No native verdict/receipt applies to this final candidate.
- No commit or publish was performed.

## Next step
Implementation is complete. If native review is desired, configure the missing review model and reconcile the pending review authority before starting a review for the final candidate.