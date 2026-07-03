# [2.0.0-beta.69](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.68...v2.0.0-beta.69) (2026-04-07)

## 3.3.1

### Patch Changes

- [#29](https://github.com/ActiveEngagement/capsule-editor/pull/29) [`2429a32`](https://github.com/ActiveEngagement/capsule-editor/commit/2429a324538cd769ba471153b210ef00c4f55992) Thanks [@actengage](https://github.com/actengage)! - Cut the main-thread cost around lint passes and footer updates.

  - Raise the lint delay from 75ms to 400ms. The lint pass parses the whole document synchronously (hundreds of ms on a large doc); at 75ms every typing pause queued a full lint behind the next keystroke or click.
  - Drive the footer from the standard `setDiagnostics` effect instead of dispatching a second, private effect from inside the lint source — one full update cycle less per pass.
  - Only re-derive the footer's current diagnostic when the selection or the diagnostics actually changed, instead of on every editor update (scroll measures, focus flips).
  - Track the footer height with a ResizeObserver instead of calling `getComputedStyle` in a view plugin's update method, which forced a synchronous reflow in the middle of every update cycle.
  - Require `capsule-lint@^0.7.2`, whose FreeMarker fast-path makes the lint pass itself ~3x faster on mostly-plain documents.

## 3.3.0

### Minor Changes

- [#27](https://github.com/ActiveEngagement/capsule-editor/pull/27) [`5b7a8c1`](https://github.com/ActiveEngagement/capsule-editor/commit/5b7a8c145bdb87c7ac3745598a54e9b1d86890b5) Thanks [@actengage](https://github.com/actengage)! - Add FreeMarker (FTL) syntax highlighting.

  FreeMarker constructs embedded in the HTML — `${...}`/`#{...}` interpolations, `<#...>`/`</#...>` directives, `<@...>` macro calls, and `<#-- --#>` comments — are now highlighted on top of the HTML grammar (enabled automatically unless `plainText` is set). Colors track the active light/dark theme. Requires `capsule-lint@^0.7.1`, whose grammar now recognizes these constructs so they no longer produce spurious lint errors.

  Also includes two editor fixes:

  - Guard the footer-height plugin so it only rebuilds its content attributes when the measured height actually changes, avoiding a layout feedback loop that forced a synchronous reflow on every update.
  - Destroy the `EditorView` on unmount so it no longer leaks its scroll/resize listeners and observers (which degraded scroll/repaint performance and could crash the lint gutter while measuring stale DOM).

## 3.2.0

### Minor Changes

- [#25](https://github.com/ActiveEngagement/capsule-editor/pull/25) [`12962c8`](https://github.com/ActiveEngagement/capsule-editor/commit/12962c8e1bd036aa560b9e036cb9fd0c334ee30f) Thanks [@actengage](https://github.com/actengage)! - Expose every child slot at the top level of `<Editor>` and type all component slots with `defineSlots`.

  - All `EditorToolbar` and `EditorFooter` slots can now be overridden directly from `<Editor>` — including the new footer `action-button` slot — each forwarding its child slot props merged with the editor context (`errors`, `filename`, `content`). Child slot defaults (e.g. the built-in Save button and "Fix Errors" UI) are preserved when a slot is not overridden.
  - The footer `action-button` slot now receives `currentDiagnostic` and `onClickAction` props, so consumers can fully replace the fix-actions UI while reusing the built-in click behavior.
  - Add a "Make Unsubscribe Link" fix action for the `valid-path-format` rule that replaces a `%…%` placeholder `href` value with `${Gears.unsubscribe()}`.
  - Fix the footer `save-button` slot binding the wrong value to `save-button-label`, and emit the diagnostics array (not a `Ref`) from `update:modelValue`.

### Patch Changes

- [#24](https://github.com/ActiveEngagement/capsule-editor/pull/24) [`cbed869`](https://github.com/ActiveEngagement/capsule-editor/commit/cbed869d8a913141e5ea345f4c55c5baaef1e4d8) Thanks [@actengage](https://github.com/actengage)! - Tighten @codemirror peer dependency minimums (state ^6.7.0, view ^6.43.3, lint ^6.9.7) to prevent pnpm from resolving multiple instances of the same package, which caused "Unrecognized extension value" instanceof errors at runtime.

## 3.1.6

### Patch Changes

- [#22](https://github.com/ActiveEngagement/capsule-editor/pull/22) [`73ac496`](https://github.com/ActiveEngagement/capsule-editor/commit/73ac49602d492df18d5689793019025645741ddd) Thanks [@actengage](https://github.com/actengage)! - Tighten footer padding and counter width in EditorFooter.

## 3.1.5

### Patch Changes

- [#20](https://github.com/ActiveEngagement/capsule-editor/pull/20) [`b592327`](https://github.com/ActiveEngagement/capsule-editor/commit/b5923272af7937c870504a182f3003fc9b263922) Thanks [@actengage](https://github.com/actengage)! - Add editor action for `no-closing-void-tags` lint rule introduced in capsule-lint v0.6.4. Simple void elements (`br`, `hr`, `wbr`) offer a "Replace with Opening Tag" action; attribute-bearing void elements (`img`, `input`, `meta`, `link`, etc.) offer a "Remove Tag" action.

## 3.1.4

### Patch Changes

- [#18](https://github.com/ActiveEngagement/capsule-editor/pull/18) [`bc2fdd3`](https://github.com/ActiveEngagement/capsule-editor/commit/bc2fdd3385538fe29292a11b672f9c8706546299) Thanks [@actengage](https://github.com/actengage)! - Honor the `extensions` prop. It was declared but never applied to the editor's `EditorView` config, so consumer-supplied extensions were silently ignored. They're now spread into the config with precedence over the editor's defaults, allowing built-ins to be reconfigured (e.g. docking the search panel to the top via `search({ top: true })`).

## 3.1.3

### Patch Changes

- [#16](https://github.com/ActiveEngagement/capsule-editor/pull/16) [`732aac0`](https://github.com/ActiveEngagement/capsule-editor/commit/732aac0865d684abc8ccce58b9f4619017dd6677) Thanks [@actengage](https://github.com/actengage)! - Bump `capsule-lint` peer dependency to `^0.6.3`.

## 3.1.2

### Patch Changes

- [#14](https://github.com/ActiveEngagement/capsule-editor/pull/14) [`760a466`](https://github.com/ActiveEngagement/capsule-editor/commit/760a466f7cdee919ecae8a1ccc50246a66dc2d6d) Thanks [@actengage](https://github.com/actengage)! - Fix unresolvable `<btn>` component in EditorFooter

  The save button in `EditorFooter` used `<btn>` which is not a registered Vue component, causing a `[Vue warn]: Failed to resolve component: btn` console warning. Changed to the native `<button>` element.

## 3.1.1

### Patch Changes

- [`1b522b7`](https://github.com/ActiveEngagement/capsule-editor/commit/1b522b7c86861b768da9bdc799cf42c91f5e95fd) Thanks [@Andrew-Knt](https://github.com/Andrew-Knt)! - add more padding-y to EditorFooter

## 3.1.0

### Minor Changes

- [#11](https://github.com/ActiveEngagement/capsule-editor/pull/11) [`24eb296`](https://github.com/ActiveEngagement/capsule-editor/commit/24eb2964c143e8d352fb28c8fd9ba96e52ff8b1a) Thanks [@actengage](https://github.com/actengage)! - Add plainText prop for plain-text email editing mode

  - New `plainText` prop on `<Editor>` disables HTML linting and syntax highlighting when `true`
  - Passes `{ htmlLinting: false }` to capsule-lint so FreeMarker errors still surface but HTML-specific errors (spec-char-escape, tag-pair, etc.) are suppressed
  - Skips the CodeMirror HTML language extension in plain-text mode to avoid HTML-specific autocomplete and folding
  - Bumps `capsule-lint` peer dependency requirement to `^0.6.0`

## 3.0.0

### Major Changes

- [`a3dd0ba`](https://github.com/ActiveEngagement/capsule-editor/commit/a3dd0baca200abbb376131d6b5a66fd72dac37a0) - Upgrade to Tailwind CSS v4 with new configuration format

### Features

- enable OIDC provenance for npm publish ([21d9f6a](https://github.com/ActiveEngagement/capsule-editor/commit/21d9f6a19efa48acc9c2798df51a370fa7d18087))

### BREAKING CHANGES

- upgrade to Tailwind CSS v4 and semantic-release v25

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

# [2.0.0-beta.68](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.67...v2.0.0-beta.68) (2026-04-07)

### Bug Fixes

- remove registry-url and enable provenance for OIDC publish ([3cef350](https://github.com/ActiveEngagement/capsule-editor/commit/3cef350db141d403c184b742a9f34309203b883a))

# [2.0.0-beta.67](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.66...v2.0.0-beta.67) (2026-04-07)

### Bug Fixes

- add packageManager field for pnpm/action-setup@v4 ([56559ee](https://github.com/ActiveEngagement/capsule-editor/commit/56559eeb919ab6ed7dfdafcf445b2332fb3f2ca0))
- consolidate release workflows for npm trusted publisher OIDC ([e803337](https://github.com/ActiveEngagement/capsule-editor/commit/e803337c9053e738458fea253b93dba1ed95e9cc))

### Features

- restructure release pipeline for npm trusted publisher OIDC ([82ec97c](https://github.com/ActiveEngagement/capsule-editor/commit/82ec97c01682af2ff8cbb32a3bb96172191bc807))

### BREAKING CHANGES

- upgraded to Tailwind CSS v4 with new configuration format

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

# [2.0.0-beta.66](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.65...v2.0.0-beta.66) (2025-07-16)

### Bug Fixes

- fix entity replace with greater than symbols ([39dc5d4](https://github.com/ActiveEngagement/capsule-editor/commit/39dc5d4cd151c86b4359ec711f96173896bd74d9))

# [2.0.0-beta.65](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.64...v2.0.0-beta.65) (2025-07-16)

### Bug Fixes

- fix issue with closing tag pairs ([ae4f517](https://github.com/ActiveEngagement/capsule-editor/commit/ae4f517132d94e2896ac2e6e163d79c65f8dc9ac))

# [2.0.0-beta.64](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.63...v2.0.0-beta.64) (2024-12-04)

### Bug Fixes

- fixed some minor JS errors with btn-dropdown ([3cf4295](https://github.com/ActiveEngagement/capsule-editor/commit/3cf42952c62d3fba7f9870c0da4a0a51ee2c4971))

# [2.0.0-beta.63](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.62...v2.0.0-beta.63) (2024-12-02)

### Bug Fixes

- fix issues with remove tag and close tag not working properly ([65d4465](https://github.com/ActiveEngagement/capsule-editor/commit/65d4465c39b0dfd214f464e1db1295f745d2f4ab))

# [2.0.0-beta.62](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.61...v2.0.0-beta.62) (2024-11-20)

### Bug Fixes

- updated capsule-lint to latest version ([b96ffab](https://github.com/ActiveEngagement/capsule-editor/commit/b96ffabd0f4f5d112cc9dc8a4c8d757affed4183))

# [2.0.0-beta.61](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.60...v2.0.0-beta.61) (2024-10-09)

### Bug Fixes

- add auto closing html tags ([3bcf554](https://github.com/ActiveEngagement/capsule-editor/commit/3bcf554c9c3078be589aa8ee648c855a6296aee7))

# [2.0.0-beta.60](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.59...v2.0.0-beta.60) (2024-10-09)

### Bug Fixes

- fixed styles for autocomplete tooltips ([ae10966](https://github.com/ActiveEngagement/capsule-editor/commit/ae109669cf5b50f191732c81954d5ef54295ad12))

# [2.0.0-beta.59](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.58...v2.0.0-beta.59) (2024-10-09)

### Bug Fixes

- added ability to add extensions and define the indent size ([eb84328](https://github.com/ActiveEngagement/capsule-editor/commit/eb843281f4b56006d274642af67b10bfe8e98312))
- updated theme colors for focussed selections ([18f3bde](https://github.com/ActiveEngagement/capsule-editor/commit/18f3bde1133fdcb7a34f7fe6ff147abf3d0383df))

# [2.0.0-beta.58](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.57...v2.0.0-beta.58) (2024-09-18)

### Bug Fixes

- updated capsule-lint and fixed an issue with the lint plugin ([b8a61f3](https://github.com/ActiveEngagement/capsule-editor/commit/b8a61f3e5ed165f42b72c8d6d11dc708cfb26cdb))

# [2.0.0-beta.57](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.56...v2.0.0-beta.57) (2024-09-16)

### Bug Fixes

- add initialize method to defineExpose ([d76f4af](https://github.com/ActiveEngagement/capsule-editor/commit/d76f4afc58836b472e6db27e8975329e485a91f8))

# [2.0.0-beta.56](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.55...v2.0.0-beta.56) (2024-09-13)

### Bug Fixes

- another attempt to fix exposing issue ([a8290c9](https://github.com/ActiveEngagement/capsule-editor/commit/a8290c983a12c3cfdeb709c7c045412dea332c32))

# [2.0.0-beta.55](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.54...v2.0.0-beta.55) (2024-09-13)

### Bug Fixes

- testing removing defineExpose as it might have broke something ([5fcb906](https://github.com/ActiveEngagement/capsule-editor/commit/5fcb9063bbb4f22e113a155b91ec48c1e6818c59))

# [2.0.0-beta.54](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.53...v2.0.0-beta.54) (2024-09-13)

### Bug Fixes

- pnpm integrity issues ([f93a87d](https://github.com/ActiveEngagement/capsule-editor/commit/f93a87d79600936f6ec2da9cb67f02d3c3f2ce6f))

### Features

- added ability event to get the selection, set the selection, and focus on the editor ([825150d](https://github.com/ActiveEngagement/capsule-editor/commit/825150dbbb4a68668041f9f0bdfa49a27a26fad2))

# [2.0.0-beta.53](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.52...v2.0.0-beta.53) (2024-07-23)

### Bug Fixes

- fixed issue with component not instantiating the editor correctly ([1fab8ef](https://github.com/ActiveEngagement/capsule-editor/commit/1fab8ef4522a0823b21a7eb9650d2ea1ea7ad469))

# [2.0.0-beta.52](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.51...v2.0.0-beta.52) (2024-06-21)

### Bug Fixes

- optimized blur/focus ([412af1e](https://github.com/ActiveEngagement/capsule-editor/commit/412af1e02c4cddcaf919ec08ffb4efbb442ee252))

# [2.0.0-beta.51](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.50...v2.0.0-beta.51) (2024-06-20)

### Bug Fixes

- improved fix in last commit ([fcd2270](https://github.com/ActiveEngagement/capsule-editor/commit/fcd2270d475652d64c9dc3a892f0a115d5f56fcf))

# [2.0.0-beta.50](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.49...v2.0.0-beta.50) (2024-06-20)

### Bug Fixes

- fix js error ([586e2a2](https://github.com/ActiveEngagement/capsule-editor/commit/586e2a21fc8bd9a9f73dd0991567ea25e7b4d887))

# [2.0.0-beta.49](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.48...v2.0.0-beta.49) (2024-06-20)

### Bug Fixes

- added focus/blur ([8e0deb8](https://github.com/ActiveEngagement/capsule-editor/commit/8e0deb82f0e6aa732396e7d30bb7a2dcb7545644))

# [2.0.0-beta.48](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.47...v2.0.0-beta.48) (2024-06-13)

### Bug Fixes

- fixed issue with footer throwing JS errors ([f0d8737](https://github.com/ActiveEngagement/capsule-editor/commit/f0d87378a2a1a99587cf5ede71b2292310ab4f6a))

# [2.0.0-beta.47](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.46...v2.0.0-beta.47) (2024-06-13)

### Bug Fixes

- fixed typescript issue ([7deaa71](https://github.com/ActiveEngagement/capsule-editor/commit/7deaa71e0d6acf6bab16c05a17bf144456a7dbe0))

# [2.0.0-beta.46](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.45...v2.0.0-beta.46) (2024-06-13)

### Bug Fixes

- added ability to override default lint rules ([77b250d](https://github.com/ActiveEngagement/capsule-editor/commit/77b250d27415a1dfc1699c924709c4d2b6d0410d))

# [2.0.0-beta.45](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.44...v2.0.0-beta.45) (2024-06-12)

### Bug Fixes

- updated npm ([c8555d9](https://github.com/ActiveEngagement/capsule-editor/commit/c8555d963cb7d4c566d0a67618ba52e34d9a0f55))

# [2.0.0-beta.44](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.43...v2.0.0-beta.44) (2024-06-12)

### Bug Fixes

- updated npm packages ([a550aa8](https://github.com/ActiveEngagement/capsule-editor/commit/a550aa84e8056d0191cf9d99af7aeec4d831405d))

# [2.0.0-beta.43](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.42...v2.0.0-beta.43) (2024-06-11)

### Bug Fixes

- pnpm update ([4d4a2ef](https://github.com/ActiveEngagement/capsule-editor/commit/4d4a2eff51628c74110c99195d656000fae2fb55))

# [2.0.0-beta.42](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.41...v2.0.0-beta.42) (2024-05-31)

### Bug Fixes

- updated capsule-lint to latest ([e6998d5](https://github.com/ActiveEngagement/capsule-editor/commit/e6998d5f48874dcfb60d6b130d3c9a9200f3a9ec))

# [2.0.0-beta.41](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.40...v2.0.0-beta.41) (2024-05-30)

### Bug Fixes

- added type="button" to EditorFooter buttons ([e6b7d60](https://github.com/ActiveEngagement/capsule-editor/commit/e6b7d60914cd7f48b545d67e5b2169544bdda5ae))

# [2.0.0-beta.40](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.39...v2.0.0-beta.40) (2024-05-29)

### Bug Fixes

- more peer dep issues ([27d6552](https://github.com/ActiveEngagement/capsule-editor/commit/27d6552bedfb71715ba829323c100c973c1ceb6c))

# [2.0.0-beta.39](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.38...v2.0.0-beta.39) (2024-05-29)

### Bug Fixes

- revert back to all peer deps ([415745f](https://github.com/ActiveEngagement/capsule-editor/commit/415745ffcf5fbd11d977cd38db0f4bf79930fd6c))

# [2.0.0-beta.38](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.37...v2.0.0-beta.38) (2024-05-29)

### Bug Fixes

- more fixes to peer deps ([1b6cf5f](https://github.com/ActiveEngagement/capsule-editor/commit/1b6cf5f53027721da8d05631c09b83eaabe38b63))

# [2.0.0-beta.37](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.36...v2.0.0-beta.37) (2024-05-29)

### Bug Fixes

- more fixes to peer deps ([c7b7c22](https://github.com/ActiveEngagement/capsule-editor/commit/c7b7c22baad8e0e1e956107db83f10eaba97d7c8))

# [2.0.0-beta.36](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.35...v2.0.0-beta.36) (2024-05-28)

### Bug Fixes

- fixed issue with peer dependencies ([57c8e69](https://github.com/ActiveEngagement/capsule-editor/commit/57c8e6964b11a2e020f5c065d122cf2f849016a3))

# [2.0.0-beta.35](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.34...v2.0.0-beta.35) (2024-05-17)

### Bug Fixes

- updating capsule lint ([5c424ff](https://github.com/ActiveEngagement/capsule-editor/commit/5c424ff85e2d477948e6cba4587cbd199d4886c0))

# [2.0.0-beta.34](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.33...v2.0.0-beta.34) (2024-05-16)

### Bug Fixes

- improved change callback to only change when the editor is changed by the user ([6fff903](https://github.com/ActiveEngagement/capsule-editor/commit/6fff9034d80d6074d2dc095f0a29e7c2f4f8a6a3))

# [2.0.0-beta.33](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.32...v2.0.0-beta.33) (2024-05-13)

### Bug Fixes

- fix issue with missing open tags showing a close tag button ([c38bf21](https://github.com/ActiveEngagement/capsule-editor/commit/c38bf211af02f99360b35ef80cdec1aec1e4d227))

# [2.0.0-beta.32](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.31...v2.0.0-beta.32) (2024-05-01)

### Bug Fixes

- typescript definitions ([f1eadbd](https://github.com/ActiveEngagement/capsule-editor/commit/f1eadbd4846995a41c21349ce93d7c9b7fe06f28))

# [2.0.0-beta.31](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.30...v2.0.0-beta.31) (2024-04-15)

### Bug Fixes

- fix issue with select all in safari ([2734e25](https://github.com/ActiveEngagement/capsule-editor/commit/2734e255b098df55afbb04f43d6042bfce52f40d))

# [2.0.0-beta.30](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.29...v2.0.0-beta.30) (2024-04-15)

### Bug Fixes

- issues with linting and fixing closing tags ([b36a54e](https://github.com/ActiveEngagement/capsule-editor/commit/b36a54ed72c09a51812b375f1b990b7c154bcf30))

# [2.0.0-beta.29](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.28...v2.0.0-beta.29) (2024-01-30)

### Bug Fixes

- removed footer animations ([64759de](https://github.com/ActiveEngagement/capsule-editor/commit/64759dea005e2ece89ec380934172b083040caeb))
- updated lock file ([6dafe99](https://github.com/ActiveEngagement/capsule-editor/commit/6dafe994dba1736dd4e3e55b207860e40299ef2a))

# [2.0.0-beta.28](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.27...v2.0.0-beta.28) (2023-12-21)

### Bug Fixes

- issues with tag-pair auto fix not working ([9abbd4d](https://github.com/ActiveEngagement/capsule-editor/commit/9abbd4d0f47130711b0e78b435464744006667c9))
- lint improvements ([d8098d0](https://github.com/ActiveEngagement/capsule-editor/commit/d8098d0eb8427cd8c598b97e11a5209945816d14))

### Features

- added ability to automatically fix html entities inside of attributes ([d81d474](https://github.com/ActiveEngagement/capsule-editor/commit/d81d4740e713a497b93bff341a740cd031d302e9))
- added ability to automatically remove invalid html children ([09e0505](https://github.com/ActiveEngagement/capsule-editor/commit/09e0505cb829fbc4430f2a5e504ed98955689add))

# [2.0.0-beta.27](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.26...v2.0.0-beta.27) (2023-10-30)

### Bug Fixes

- issue with closing tag pairs ([33c7bcb](https://github.com/ActiveEngagement/capsule-editor/commit/33c7bcb8a77bab505237d05073864ea34d454313))

# [2.0.0-beta.26](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.25...v2.0.0-beta.26) (2023-10-09)

### Bug Fixes

- updated package.json ([c25cac1](https://github.com/ActiveEngagement/capsule-editor/commit/c25cac175a49dad3d6ab43d02916a1a0d41c6340))

# [2.0.0-beta.25](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.24...v2.0.0-beta.25) (2023-10-07)

### Features

- added search/replace keybindings ([5198acd](https://github.com/ActiveEngagement/capsule-editor/commit/5198acd0d9851caece25ef69d0076438e2cf6ca9))

# [2.0.0-beta.24](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.23...v2.0.0-beta.24) (2023-10-05)

### Bug Fixes

- editor scroll issue ([d1d60f3](https://github.com/ActiveEngagement/capsule-editor/commit/d1d60f3d3f699f374de1e3086f7d7ccc3d61b143))

# [2.0.0-beta.23](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.22...v2.0.0-beta.23) (2023-10-03)

### Features

- added scroll past end so footer never will hide content ([b535aac](https://github.com/ActiveEngagement/capsule-editor/commit/b535aac98e54f5795beb91b548b83a5851bcc87c))

# [2.0.0-beta.22](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.21...v2.0.0-beta.22) (2023-10-03)

### Features

- added line numbers and errors to gutters ([13fa69b](https://github.com/ActiveEngagement/capsule-editor/commit/13fa69b058e9343cdf27ece2a4b25fc719850f1f))

# [2.0.0-beta.21](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2023-09-29)

### Bug Fixes

- css issues ([e5ad012](https://github.com/ActiveEngagement/capsule-editor/commit/e5ad01247a49852826155999573dbcfb6c5f40f3))

# [2.0.0-beta.20](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2023-09-29)

### Bug Fixes

- css updates ([a09ec37](https://github.com/ActiveEngagement/capsule-editor/commit/a09ec3763866893e65b1d0c068e574a4713717f5))

# [2.0.0-beta.19](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2023-09-29)

### Bug Fixes

- css updates ([25f9ecf](https://github.com/ActiveEngagement/capsule-editor/commit/25f9ecf1f2abf4560cfa9835f5d2c670c479a9a5))

# [2.0.0-beta.18](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2023-09-29)

### Bug Fixes

- css updates ([61bac23](https://github.com/ActiveEngagement/capsule-editor/commit/61bac23647ba598245f3638f89f517da3f688a23))

# [2.0.0-beta.17](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2023-09-28)

### Bug Fixes

- updated capsule-lint minimum version ([f91bdbc](https://github.com/ActiveEngagement/capsule-editor/commit/f91bdbc9671987ce24f46d17783df08c34f3eba4))

# [2.0.0-beta.16](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2023-09-12)

### Bug Fixes

- added padding bottom to editor ([d317fe5](https://github.com/ActiveEngagement/capsule-editor/commit/d317fe54ac8f31a4b643adc26ec8908d61c9d0eb))

# [2.0.0-beta.15](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2023-09-11)

### Bug Fixes

- more template changes ([557b4d4](https://github.com/ActiveEngagement/capsule-editor/commit/557b4d45db2bffa18c4c0a874020363c9e065144))

# [2.0.0-beta.14](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2023-09-11)

### Bug Fixes

- more editor css issues ([3ba3e49](https://github.com/ActiveEngagement/capsule-editor/commit/3ba3e49265fca375885270965bb00084f829409f))

# [2.0.0-beta.13](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2023-09-11)

### Bug Fixes

- css issue ([4e45bb9](https://github.com/ActiveEngagement/capsule-editor/commit/4e45bb9e87cefe561a7693473cea594d23066296))

# [2.0.0-beta.12](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2023-09-11)

### Bug Fixes

- attempting to use peer deps instead for [@codemirror](https://github.com/codemirror) ([9f354b5](https://github.com/ActiveEngagement/capsule-editor/commit/9f354b5e189ede7dad8e00e9de59936bfd88a81d))

# [2.0.0-beta.11](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2023-09-11)

### Bug Fixes

- updated capsule lint ([c743c45](https://github.com/ActiveEngagement/capsule-editor/commit/c743c453bc5812e199fae539fef59a043fe8c4b7))

# [2.0.0-beta.10](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2023-09-11)

### Bug Fixes

- removed outline from focus ([bfcfed7](https://github.com/ActiveEngagement/capsule-editor/commit/bfcfed77795786a466690e1273e6d5351e0345ee))

# [2.0.0-beta.9](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2023-09-11)

### Bug Fixes

- optimized last release ([e83cea9](https://github.com/ActiveEngagement/capsule-editor/commit/e83cea91654017e37a2a8bb618bb6c98670bd6ab))

# [2.0.0-beta.8](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2023-09-11)

### Bug Fixes

- export name and js issues ([3267940](https://github.com/ActiveEngagement/capsule-editor/commit/3267940e0ea3cb8d4e8ec102360010b522d0a47b))

### Features

- added ability to change theme and watch for theme prop changes ([84d3fab](https://github.com/ActiveEngagement/capsule-editor/commit/84d3fabab4ec026f68140c789b8b9d979cd3578c))

# [2.0.0-beta.7](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2023-09-10)

### Bug Fixes

- remove css, must use Tailwind to compile css ([6ad407e](https://github.com/ActiveEngagement/capsule-editor/commit/6ad407e2dd212c2b36fdf064045fdf9b747b1d0d))

# [2.0.0-beta.6](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2023-08-15)

### Bug Fixes

- issue with tag-pair not working ([83db6fb](https://github.com/ActiveEngagement/capsule-editor/commit/83db6fb9c9d54c5a2fa80238f51546e474c4f855))

# [2.0.0-beta.5](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2023-08-15)

### Bug Fixes

- version ([f43bf86](https://github.com/ActiveEngagement/capsule-editor/commit/f43bf8680d21751ad727d8c8cf87adf4550c76aa))

# [2.0.0-beta.4](https://github.com/ActiveEngagement/capsule-editor/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2023-08-15)

### Bug Fixes

- fixed version ([3647827](https://github.com/ActiveEngagement/capsule-editor/commit/36478272e5cffd5eb51dbc1d095d7e95ed39fbcd))

### Features

- added beta release ([531339f](https://github.com/ActiveEngagement/capsule-editor/commit/531339f68da6b3bd6c48fa63cbf654d1a4d8f368))
