---
"capsule-editor": patch
---

Cut the main-thread cost around lint passes and footer updates.

- Raise the lint delay from 75ms to 400ms. The lint pass parses the whole document synchronously (hundreds of ms on a large doc); at 75ms every typing pause queued a full lint behind the next keystroke or click.
- Drive the footer from the standard `setDiagnostics` effect instead of dispatching a second, private effect from inside the lint source — one full update cycle less per pass.
- Only re-derive the footer's current diagnostic when the selection or the diagnostics actually changed, instead of on every editor update (scroll measures, focus flips).
- Track the footer height with a ResizeObserver instead of calling `getComputedStyle` in a view plugin's update method, which forced a synchronous reflow in the middle of every update cycle.
- Require `capsule-lint@^0.7.2`, whose FreeMarker fast-path makes the lint pass itself ~3x faster on mostly-plain documents.
