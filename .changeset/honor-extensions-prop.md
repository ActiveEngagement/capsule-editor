---
"capsule-editor": patch
---

Honor the `extensions` prop. It was declared but never applied to the editor's `EditorView` config, so consumer-supplied extensions were silently ignored. They're now spread into the config with precedence over the editor's defaults, allowing built-ins to be reconfigured (e.g. docking the search panel to the top via `search({ top: true })`).
