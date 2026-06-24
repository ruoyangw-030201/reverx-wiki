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
- Chrome UI copy is sourced from `src/data/chromeText.js`.

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
- WorldMap, Home, and Index remain custom visual stages.
- Index grid and `IndexIconCard` still need a full component boundary cleanup.

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
3. Continue index/world-map visual architecture cleanup.
