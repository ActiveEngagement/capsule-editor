---
"capsule-editor": minor
---

Expose every child slot at the top level of `<Editor>` and type all component slots with `defineSlots`.

- All `EditorToolbar` and `EditorFooter` slots can now be overridden directly from `<Editor>` — including the new footer `action-button` slot — each forwarding its child slot props merged with the editor context (`errors`, `filename`, `content`). Child slot defaults (e.g. the built-in Save button and "Fix Errors" UI) are preserved when a slot is not overridden.
- The footer `action-button` slot now receives `currentDiagnostic` and `onClickAction` props, so consumers can fully replace the fix-actions UI while reusing the built-in click behavior.
- Add a "Make Unsubscribe Link" fix action for the `valid-path-format` rule that replaces a `%…%` placeholder `href` value with `${Gears.unsubscribe()}`.
- Fix the footer `save-button` slot binding the wrong value to `save-button-label`, and emit the diagnostics array (not a `Ref`) from `update:modelValue`.
