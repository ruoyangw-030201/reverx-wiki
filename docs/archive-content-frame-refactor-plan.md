# Archive Content Frame Refactor Plan

This note records the current archive content-frame boundary after the default/custom merge and the first MDX page migration.

## Current State

`ArchiveShellLayout.astro` is the archive page shell:

- `ChromeLayout`
- `ScrollDecor`
- archive page classes and page mode
- character `ImageGallery` after-stage rendering
- default slot passthrough

It can optionally expose the legacy `.archive-content-area` wrapper for special pages that do not use `ContentFrame`.

`ArchiveDefaultLayout.astro` is the standard archive text-entry layout. Here "default" means any archive page whose main content is one or more standard content-frame sections. It composes:

- `ArchiveShellLayout`
- one `ContentFrame`
- page-provided `PrimarySection` / `SecondarySection` children

`ArchiveSecretLayout.astro` is the archive secret text-entry layout. It is parallel to `ArchiveDefaultLayout`, but fixes shell/content variants to secret mode:

- `ArchiveShellLayout` with secret surface, hero, scroll decor, and page class
- one `ContentFrame` with secret next-link mode
- page-provided `PrimarySection variant="secret"` / `SecondarySection variant="secret"` children

`ArchiveDefaultFrame.astro`, `default-layout.css`, `ArchiveLayout.astro`, the old `SecretLayout.astro`, and `secret.css` have been removed.

Ordinary archive text pages are currently `.mdx` route files under `src/pages`. They explicitly compose:

- `ArchiveDefaultLayout` or `ArchiveSecretLayout`
- one `PrimarySection`
- optional `SecondarySection` children

These pages no longer pass `archive={archive}` or call `getArchiveEntryContext()` directly. `PrimarySection` and `SecondarySection` can resolve archive context from the current path.

Special pages still use page-specific Astro routes:

- `src/pages/system/classification.astro`
- `src/pages/system/intensity.astro`

## Content Frame Boundary

`ContentFrame.astro` is the single content-frame composition entry. It owns:

- underlay decor placement
- the main one-column section grid
- flow placement for the final next-link button
- secret decor hiding through `.content-frame.is-secret`

`PrimarySection.astro` is the first archive entry section. It owns:

- primary `EntryHeading`
- optional year switch flow item
- desktop icon-frame overlay placement
- mobile icon-frame flow placement
- one `ContentBox`

`SecondarySection.astro` is the repeated section wrapper after the primary section. It owns:

- optional `EntryHeading`
- desktop icon-frame overlay placement
- mobile icon-frame flow placement
- one `ContentBox`

`ContentBox.astro` is the box renderer. It owns:

- paper/surface background
- russet/gold/blue decorative lines
- optional side glyph
- body and text slots
- `simple` and `secret` variants

`IconFrame.astro` owns the icon frame drawing and action layer. `IconDisplayPanel.astro` owns the icon/image display variants:

- `single`
- `multiple`
- `figure`

`figure` is a structural display variant, not a character-only visual variant. Secret mode is a visual variant.

## Current MDX Status

The first MDX migration is complete for ordinary default/secret text pages, excluding special pages. Current MDX pages still live under `src/pages`, so each file is still a route component. This means they still import layout/section/content helpers when needed.

This is an intermediate state. The better long-term direction is recorded in `docs/archive-content-collection-migration-plan.md`: move archive MDX to content collections and let dynamic Astro routes own layouts and section mappings.

## Remaining Work

- Clean `ArchiveInfoCardList` and info-card CSS before moving world entries to content collections.
- Move ordinary archive text MDX from `src/pages` to `src/content/archive`.
- Add dynamic Astro routes for world/system/character archive entries.
- Keep classification and intensity on `ArchiveShellLayout` until their page-specific content-area rules are cleaned.
- Revisit `src/styles/archive/layout.css` after classification/intensity and index/world-map usage are separated.

## Decisions To Preserve

- Archive entry data is resolved through `getArchiveEntryContext()`, but route/content templates should own that resolution.
- Headings belong inside `PrimarySection` / `SecondarySection`, not outside `ContentFrame`.
- `ArchiveShellLayout` is the archive shell.
- `ArchiveDefaultLayout` is the standard archive text-entry layout: shell plus one `ContentFrame`.
- `ArchiveSecretLayout` is the standard secret text-entry layout: secret shell plus one secret `ContentFrame`.
- Do not recreate a default/custom layout fork for ordinary archive pages.
- Decorative overhang must not push the chrome stage horizontally.
