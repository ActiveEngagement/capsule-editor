---
"capsule-editor": minor
---

Navigating to a diagnostic from the editor footer no longer selects its literal text — that selection was tripping `highlightSelectionMatches()`, which lit up every other occurrence of the same text in the document (e.g. every other `</strong>`) as if they were all flagged. The current diagnostic is now marked with its own distinct highlight, and bracket-matching's highlight on the adjacent tag is suppressed while it's shown so nothing else competes for attention.
