# Archive Content Frame Refactor Plan

This note records the current archive content-frame boundary after the default/custom merge and the archive content collection migration.

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

Ordinary archive text pages now live as content collection entries under `src/content/archive`. Dynamic route files compose:

- `ArchiveDefaultLayout` or `ArchiveSecretLayout`
- one `PrimarySection`
- optional `SecondarySection` children

World/system entries are rendered through `ArchiveContentRenderer.astro`. Character entries are rendered through `CharacterProfile.astro` from normalized frontmatter data. `PrimarySection` and `SecondarySection` still receive archive context from the route/template layer.

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

## Current Content Status

The content collection migration is complete for ordinary world, system, and character archive text entries. The content layer now has reusable component boundaries for:

- prose text
- hidden text
- note sections
- content card grids
- content cards
- weapon cards
- little tables

## Remaining Work

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
