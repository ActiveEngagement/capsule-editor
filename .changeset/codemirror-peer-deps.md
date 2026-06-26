---
"capsule-editor": patch
---

Tighten @codemirror peer dependency minimums (state ^6.7.0, view ^6.43.3, lint ^6.9.7) to prevent pnpm from resolving multiple instances of the same package, which caused "Unrecognized extension value" instanceof errors at runtime.
