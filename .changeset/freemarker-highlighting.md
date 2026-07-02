---
"capsule-editor": minor
---

Add FreeMarker (FTL) syntax highlighting.

FreeMarker constructs embedded in the HTML — `${...}`/`#{...}` interpolations, `<#...>`/`</#...>` directives, `<@...>` macro calls, and `<#-- --#>` comments — are now highlighted on top of the HTML grammar (enabled automatically unless `plainText` is set). Colors track the active light/dark theme. Requires `capsule-lint@^0.7.1`, whose grammar now recognizes these constructs so they no longer produce spurious lint errors.

Also includes two editor fixes:

- Guard the footer-height plugin so it only rebuilds its content attributes when the measured height actually changes, avoiding a layout feedback loop that forced a synchronous reflow on every update.
- Destroy the `EditorView` on unmount so it no longer leaks its scroll/resize listeners and observers (which degraded scroll/repaint performance and could crash the lint gutter while measuring stale DOM).
