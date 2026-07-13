---
"capsule-editor": patch
---

Widen the `capsule-lint` peer dependency to `^0.9.0`. capsule-lint 0.9.0
validates inline `style` attributes and `<style>` blocks with PostCSS; the API
the editor consumes (`lint`/`parse`) is unchanged, but the `^0.8.0` range
excludes 0.9.0 under the 0.x caret rule, producing an unmet-peer warning for
consumers on the new lint.
