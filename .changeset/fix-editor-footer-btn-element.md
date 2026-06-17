---
"capsule-editor": patch
---

Fix unresolvable `<btn>` component in EditorFooter

The save button in `EditorFooter` used `<btn>` which is not a registered Vue component, causing a `[Vue warn]: Failed to resolve component: btn` console warning. Changed to the native `<button>` element.
