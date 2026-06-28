# Astro Shell Refactor Progress

This project is being refactored from page-level CSS accumulation toward explicit Astro shell, frame, component, and content boundaries.

## Current Direction

- Use Astro static components for shell/layout/decor work.
- Build pages as `layout -> shell/frame -> component -> content`.
- Keep global tokens for cross-site language: color, type, spacing, radius, motion, z-index, prose rhythm, and page background surfaces.
- Keep component CSS local to component geometry and visual behavior.
- Keep page/content files focused on content, not shell composition.

## Stable Foundation

The shared foundation is stable:

- color tokens
- font and type scale tokens
- spacing tokens
- chrome metrics
- radius, motion, and z-index tokens
- prose rhythm tokens
- background surface variants

## Stable Chrome Shell

The reusable chrome shell is complete enough to treat as a stable base:

- `ChromeLayout.astro` composes background surface, headbar, optional hero, sidebar, mobile sidebar, stage, after-stage slot, and endbar.
- `ChromeStage.astro` remains intentionally thin and only marks the main stage boundary.
- `src/styles/chrome/chrome-layout.css` owns the standard sidebar/stage grid, shell gaps, responsive column switch, and page-end spacing.
- Headbar, hero, sidebar, mobile sidebar, and endbar have been split into chrome components with local CSS.
- Chrome UI copy is sourced from `src/data/chrome/text.js`.

Chrome consumers can still have custom stages. This is expected for archive special pages, world map, home, and index.

## Stable Actions And Primitives

Current reusable actions/primitives include:

- `BilingualTab`
- `MenuToggleButton`
- `DisclosureToggleButton`
- `NextLinkButton`
- `YearSwitchButton`
- `DirectionArrow`
- `FrameCornerMark`
- `FrameSideGlyph`
- `LeftDecor`
- `RightDecor`
- `frame-decor`
- `divider-line`
- `symbols`

Action components own interaction and internal visual states. Host components own placement.

## Stable Gallery Modal

The gallery layer is now split into a stable modal component boundary:

- `ImageGallery.astro` is the public gallery entry. It filters gallery image data, renders the native `<dialog>`, and imports only the modal shell CSS.
- `ImageGalleryControls.astro` owns the top control row: caption, counter, and close button. It uses a three-column grid and keeps desktop caption text centered to the viewport while mobile text returns to the caption box.
- `ImageGalleryStage.astro` owns the image stage and directly centers the active image without an extra wrapper element.
- `ImageGalleryArrowButton.astro` owns the gallery-specific previous/next buttons while continuing to reuse the `DirectionArrow` primitive.
- `src/scripts/image-gallery.js` owns gallery behavior: opening with `showModal()`, closing through native dialog `cancel`/`close`, image updates, keyboard left/right navigation, scroll locking, and focus return to the trigger.
- Each gallery component imports its own CSS file under `src/styles/gallery/`; the old aggregate `src/styles/gallery.css` has been removed.

`ImageGallery` is currently mounted through the archive shell `after-stage` slot, but its internal modal, controls, stage, arrows, styles, and behavior are gallery-owned.

## Archive State

Archive shell and content frame are now separated:

- `ArchiveShellLayout` owns archive chrome shell concerns.
- `ArchiveDefaultLayout` owns the standard text-entry content frame.
- `ArchiveSecretLayout` owns the secret text-entry content frame.
- `ContentFrame`, `PrimarySection`, `SecondarySection`, `ContentBox`, `IconFrame`, and `IconDisplayPanel` own the text-frame composition.

The old default/custom split has been removed for ordinary archive text pages.

Ordinary world, system, and character archive text pages have been migrated to the archive content collection under `src/content/archive`. Dynamic routes now own layout selection and content rendering.

Special archive pages still remain outside the standard text-frame model:

- `src/pages/system/classification.astro`
- `src/pages/system/intensity.astro`

## World Map State

World map has been split into page layout, map unit, and reusable action boundaries. The current structure and remaining notes are tracked in `docs/world-map-refactor-progress.md`.

## Index State

Index pages have completed the current cleanup pass and can be treated as a stable custom visual stage:

- `IndexLayout.astro` now uses `ChromeLayout` directly and no longer depends on archive layout or archive content-frame compatibility wrappers.
- Index composition is split into explicit boundaries: intro area, `IndexGrid`, `IndexSection`, and `IndexDecor`.
- Reusable card/list actions live under `src/components/actions`: `IconCard`, `IconList`, and `MapCard`.
- Index page copy and section metadata live in the `indexPage` content collection under `src/content/index-page`.
- World map intro copy lives in the `worldMap` content collection under `src/content/world-map`.
- Cards remain derived from navigation/world-map data instead of being duplicated in md files.
- Data helpers for content entries live under `src/data/content/entries.js`.
- Index decor, grid, layout, and section CSS are split under `src/styles/index/`.

## Document State

Standalone legal/document pages now use a small document layer instead of archive compatibility CSS:

- `DocumentLayout.astro` owns the plain document shell, background, heading, Markdown body slot, and return-link behavior.
- `src/styles/document/` owns document layout and prose rules.
- `src/content/document/` stores document copy as Markdown entries.
- `src/pages/document/[slug].astro` renders document entries such as `/document/copyright/`.
- Document pages must not import `src/styles/archive/layout.css` or use `.archive-page`.

## Stable Content Layer

The reusable archive content layer is complete enough to treat as stable:

- `prose.css` owns standard body text rhythm.
- `HiddenText.astro` owns reusable hidden/revealed inline text.
- `NoteSection.astro` owns reusable note-panel structure.
- `ContentCard.astro` and `ContentCardGrid.astro` own archive info-card rendering.
- `WeaponCard.astro` and `LittleTable.astro` own reusable weapon/card detail surfaces.
- `ArchiveContentRenderer.astro` renders world/system content collection entries.
- `CharacterProfile.astro` renders normalized character profile data.

## Still In Progress

Do not treat these as complete reusable modules yet:

- `src/styles/archive/layout.css` still contains shared archive shell/content-area compatibility rules.
- Classification and intensity still use special page-level layout/CSS.
- Home remains a custom visual stage.

## Current Workflow

1. Review a layer for real responsibilities and redundant CSS.
2. Move reusable site-level pieces out of page-specific folders.
3. Keep public component props small and semantic.
4. Preserve existing Chinese comments and UTF-8 content.
5. Run static searches for old names and redundant values.
6. Run `npm run build`.

## Next Likely Steps

1. Clean `src/styles/archive/layout.css` after classification/intensity and index/world-map usage are separated.
2. Clean classification and intensity special page layout/CSS.
3. Continue home visual architecture cleanup.
