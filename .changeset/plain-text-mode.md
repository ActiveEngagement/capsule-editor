---
"capsule-editor": minor
---

Add plainText prop for plain-text email editing mode

- New `plainText` prop on `<Editor>` disables HTML linting and syntax highlighting when `true`
- Passes `{ htmlLinting: false }` to capsule-lint so FreeMarker errors still surface but HTML-specific errors (spec-char-escape, tag-pair, etc.) are suppressed
- Skips the CodeMirror HTML language extension in plain-text mode to avoid HTML-specific autocomplete and folding
- Bumps `capsule-lint` peer dependency requirement to `^0.6.0`
