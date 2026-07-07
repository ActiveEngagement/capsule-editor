---
"capsule-editor": patch
---

Fixed a crash where jumping to a diagnostic far away in a large document could throw inside CodeMirror's gutter plugin (`domPos.nextSibling` on `null`), permanently disabling all gutters (line numbers, fold, lint) for the rest of that editor's life. The editor now detects the crash and transparently rebuilds the view, and a patch to `@codemirror/view` stops the gutter's internal DOM diff from throwing when its element pool runs out of real children.
