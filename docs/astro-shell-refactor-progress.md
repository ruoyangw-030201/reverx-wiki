# Astro Shell Refactor Progress

This project is being refactored from page-level CSS accumulation toward Astro shell and component boundaries. The current strategy is: stabilize global tokens, then split reusable layout/background shells, then move fixed chrome and page content into smaller Astro components.

## Current Direction

- Use Astro static components first. Do not introduce React/Preact for layout or decorative shell work.
- Build pages as `layout -> shell/frame -> component -> content`.
- Keep global tokens for cross-site language: color, type, spacing, radius, motion, z-index, prose rhythm, and page background surfaces.
- Keep component CSS local to the component's geometry and visual behavior.

## Confirmed Complete Foundation

- Colors, fonts, font sizes, and line-height tokens have been consolidated.
- Global foundation tokens now cover shared spacing, chrome metrics, radius, motion, z-index, and prose rhythm.

## Confirmed Complete Chrome Layout

The standard reusable chrome shell is complete:

- `ChromeLayout.astro` composes the background surface, headbar, optional hero, sidebar, mobile sidebar, stage, after-stage slot, and endbar.
- `ChromeStage.astro` is intentionally thin and only marks the main stage boundary.
- `src/styles/chrome/chrome-layout.css` owns the standard sidebar/stage grid, shell gaps, responsive column switch, and page-end spacing.

This confirms the reusable shell itself, not layouts that currently consume it. `ArchiveLayout`, `SecretLayout`, WorldMap, Home, and Index still contain page-specific compatibility or custom-stage work.

## Confirmed Complete Headbar

`ChromeHeadbar` now follows the current shell rule: the chrome component owns frame placement and composition, while smaller action/primitive pieces own their internal visual behavior.

- `ChromeHeadbar.astro` composes the brand, mobile menu toggle, top navigation, dividers, search symbol, and dot-grid symbol.
- `src/styles/chrome/headbar.css` owns the full-width top frame, grid tracks, brand placement, desktop nav placement, mobile disclosure panel placement, dropdown texture, and panel reveal motion.
- `ChromeNavTab.astro` adapts `BilingualTab` for headbar navigation and adds the active hourglass marker.
- `BilingualTab.astro` owns the reusable framed bilingual action structure: Chinese label, Latin sub-label, frame decoration, and hover/focus/active state.
- `MenuToggleButton.astro` owns the reusable disclosure toggle button structure, `aria-expanded`, `aria-controls`, and button skin.
- `divider-line.css` owns reusable one-pixel divider drawing. Headbar only switches divider variables for desktop vertical lines and mobile horizontal lines.
- `symbols.css` owns decorative search and dot-grid marks. Headbar only places them in the right action slot.
- `src/data/chromeText.js` owns chrome UI copy for headbar, sidebar, and endbar. Chrome components should import copy from this file instead of hard-coding Chinese microcopy in structure files.

The current headbar is acceptable as a Figma-like assembly unit: the outer frame is explicit, the layout places the frame, and nested components can be represented as independent draggable parts. Host CSS controls placement; action and primitive CSS controls internal appearance.

## Confirmed Complete Hero

- `ChromeHero.astro` owns the full-width hero frame and accepts explicit `world`, `system`, `characters`, and `secret` variants.
- `hero.css` owns the frame, section crop values, and secret treatment without depending on archive page selectors or headbar state.
- Consuming layouts pass the hero variant explicitly. Existing crop values and visual output remain unchanged.

## Confirmed Complete Sidebar

The sidebar is now split according to navigation-tree responsibility:

- `ChromeSidebar.astro` and `sidebar.css` own the rail frame, heading, section link, group hierarchy, group states, and collapsible-group arrangement.
- `ChromeSidebarLink.astro` and `sidebar-link.css` own leaf navigation rows. Top-level and child links share one structure; child links only override hierarchy-related geometry and typography.
- Link active and current-anchor states remain local to `sidebar-link.css`; group and section-link states remain local to `sidebar.css`.
- `ChromeSidebarMobile.astro` and `sidebar-mobile.css` own the mobile disclosure wrapper and summary content styling.
- `DisclosureToggleButton.astro` owns the reusable button action used to expand and collapse sidebar groups.
- `DisclosureChevron.astro` owns the reusable visual chevron used by native disclosure summaries.
- `src/scripts/chromeSidebar.js` owns disclosure behavior, current-anchor tracking, and character sidebar mode overrides.

## Confirmed Complete Endbar

- `ChromeEndbar.astro` and `endbar.css` own the full-width bottom chrome frame and its responsive composition.
- `ChromeAuxLink.astro` and `aux-link.css` own repeatable secondary endbar links with optional divider placement.
- Endbar copy is sourced from `src/data/chromeText.js`.

## Confirmed Complete Actions And Primitives

- Actions: `BilingualTab`, `MenuToggleButton`, and `DisclosureToggleButton`.
- Component primitives: `HourglassMarker` and `DisclosureChevron`.
- CSS primitives: `frame-decor`, `divider-line`, and `symbols`.
- `frame-decor` owns only frame layers and frame color states. Text, background, and shadow states remain in host component CSS.
- `HourglassMarker` owns the reusable animated marker; chrome hosts only position and reveal it.
- `DisclosureChevron` supports explicit `is-open` and native `details[open]` states.

The reusable chrome layer is now confirmed complete: `ChromeLayout`, `ChromeStage`, Headbar, Hero, Sidebar, SidebarMobile, Endbar, and their current actions and primitives.

## Still In Progress

Do not treat these as complete reusable modules yet:

- Background components have stable boundaries, but `background-surface.css` and `scroll-decor.css` still contain archive/page-specific compatibility selectors.
- `ArchiveLayout` and archive content CSS: still contain the common archive content-stage compatibility layer, content outsets, and page variants.
- `SecretLayout`: consumes `ChromeLayout` but still has secret-specific compatibility styling.
- WorldMap: keeps its custom two-panel pager and map-specific stage.
- Home and Index layouts: remain custom visual stages.
- Index grid and `IndexIconCard`: frame decoration was partially migrated, but the complete index component/grid system is not cleaned.
- Content frame, archive heading, gallery, classification, spectrum, intensity, and character content modules remain later-stage work.

## Current Workflow

1. Review a layer for real responsibilities and redundant CSS.
2. Move reusable site-level pieces out of page-specific folders.
3. Keep public component props small and semantic.
4. Run static searches for old names and redundant values.
5. Run `npm run build`.

## Next Likely Steps

- Start with the most common archive page shape rather than a custom page.
- Identify the reusable default archive stage: entry heading, optional year switch, content frame, gallery/content slots, and page-end behavior.
- Separate the default archive stage from `ArchiveLayout` compatibility rules without changing character, spectrum, intensity, classification, secret, map, home, or index stages.
- Replace the common archive page's remaining `archive-content-area` and content-outset placement with a clearly sized stage/component boundary.
