# World Map Refactor Progress

This document records the current world-map cleanup state and the layout boundaries that should be preserved in later work.

## Current State

The world-map page is now split into three clearer layers:

- Page layout: `src/styles/world-map/world-map-layout.css`
- Map unit: `src/components/world-map/WorldMapUnit.astro` and `src/styles/world-map/world-map-unit.css`
- Reusable actions: `ActiveArrowButton` and `RegionCard`

The page still uses `ChromeLayout`, but it does not use the default chrome endbar position. `ChromeLayout` renders the first screen with headbar/sidebar/stage, and `WorldMapCover` renders the second screen with the map unit plus `ChromeEndbar`.

## Page Layout Boundary

`world-map/world-map-layout.css` owns page-scale composition:

- two-screen desktop flow
- first-screen scroll marker layer
- second-screen map cover
- map unit slot spacing
- mobile document-flow behavior
- endbar placement inside the second screen

The map unit slot is responsible for the distance between the map unit and the endbar. On mobile, the visible gap below the map comes from both `world-map-cover-unit-slot` padding and the rotated viewport reserve used by the map unit.

`layout.css` should not own map image sizing, region/card internals, label styling, or SVG interaction details.

## Intro Panel Boundary

`WorldMapIntroPanel` is now intentionally thin. It composes:

- `ContentFrame`
- one `PrimarySection`
- no local content box clone
- no old outset/heading/content-box compatibility code

The intro panel only keeps its section wrapper height rule. Content-frame spacing and box geometry should continue to come from the reusable content-frame layer.

## Map Unit Boundary

`WorldMapUnit` now treats the map as a single SVG coordinate system:

- the base map image is an SVG `<image>`
- regions are SVG paths
- state/country/city labels are SVG text
- city marker and label can be grouped inside one link
- `foreignObject` is used only for the region card overlay
- the blue hint text is SVG text

This removed the old mixed HTML/SVG positioning system, including:

- CSS percentage label positioning
- `world-map-stage`
- `world-map-rotation-frame`
- separate absolute HTML label layer
- duplicated region-card markup inside the map unit
- manual desktop map aspect-ratio calculations

The remaining mobile rotation is a CSS transform on `.world-map-panel`. `.world-map-map-viewport` provides the document-flow reserve for the rotated map, while `.world-map-panel` is absolute and does not contribute layout height.

## Visual Frame Rule

The map visual frame belongs to `.world-map-canvas`, not `.world-map-panel`.

Reason:

- `.world-map-panel` is the placement/rotation container and can fill the available slot.
- `.world-map-canvas` is the actual map surface after SVG contain sizing.

Putting border, background, shadow, and padding on the panel makes the frame describe the slot instead of the map. Putting them on the canvas keeps the frame attached to the rendered map.

## Region Card Boundary

`RegionCard` lives under `src/components/actions` with local CSS in `src/styles/actions/region-card.css`.

The map unit should only tune it through component variables:

- card dimensions
- padding
- icon size
- label sizes
- frame offset

The card uses `frame-decor`. Because `.frame-decor.is-gold` has higher specificity than `.region-card`, region-card-specific frame colors must be set through `.region-card.frame-decor.is-gold` or through host variables with equal/higher specificity.

The card animation is applied to the SVG `foreignObject` wrapper. Animating the XHTML card inside `foreignObject` was unreliable, while animating the SVG wrapper is currently working.

For future SVG-layer animation, avoid CSS individual transform properties such as `translate` directly on SVG `<text>`. Prefer animating an SVG wrapper element with `transform`, `transform-box`, and `transform-origin`, or use script-driven SVG attribute updates when the motion must be exact. If the animated item is really UI rather than map geometry, consider moving it outside the SVG as an HTML action overlay.

## Interaction Script

`src/scripts/worldMapUnit.js` owns:

- region hover/focus behavior
- mobile two-tap navigation behavior
- mobile selection clearing when tapping non-interactive map areas
- region card positioning/content updates
- related city-label highlighting
- responsive SVG label coordinates
- listener cleanup through `AbortController`

Clickable city marker and text are grouped under `.world-map-city-link`. The script toggles `is-region-active` on the link, and CSS styles the child SVG text from that link state.

`mobileX`, `mobileY`, `mobileLabelOffsetX`, and `mobileLabelOffsetY` are now live data. If future map data changes these values, the script applies them on mobile and restores desktop coordinates when the viewport changes.

## Current Remaining Notes

No structural blocker remains in the world-map split.

Future work can stay visual/data-focused:

- tune mobile map scale and bottom spacing if the current reserve feels too loose
- tune region-card dimensions per viewport
- decide whether the hint text should remain inside the SVG or become a separate action later
- keep checking clickable region/city behavior after map data changes

Avoid reintroducing container layers unless a layer has a real job:

- page/layout layer places screens and endbar
- unit slot gives the map page spacing
- viewport reserves rotated map space
- panel places/rotates the SVG
- canvas is the actual map surface
- SVG layers own map coordinates
- action components own reusable UI pieces
