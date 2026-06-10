# Archive Content Frame Refactor Plan

This note records the current agreement for the archive default page and the later content-frame cleanup. It is intentionally narrower than `astro-shell-refactor-progress.md`.

## Current State

`ArchiveDefaultLayout.astro` is the archive default page shell consumer. It composes `ChromeLayout`, `ScrollDecor`, page-level archive data, and chooses the default frame path for normal archive pages. Custom archive pages still keep the old compatibility path for now.

`ArchiveDefaultFrame.astro` currently composes the default archive content area:

- `EntryHeading`, including its optional control slot
- optional desktop `YearSwitchButton`, composed into the heading control slot
- `ContentFrame`
- temporary mobile year switch slot inside `ContentFrame`

`EntryHeading.astro` is a generic heading primitive. It owns the heading row, the original heading stack, and the optional trailing control slot. It does not import or know about `YearSwitchButton`.

`YearSwitchButton.astro` is an archive component. It owns the year label/menu UI and may optionally switch page-level display mode through `pageMode`. The mode semantics are page-generic, even though only character archive pages are currently wired to use spoiler mode.

`default-layout.css` currently exists as a transition file. It should only contain archive default outer-placement rules while the content frame is still being cleaned:

- default frame wrapper behavior
- temporary heading-to-content-frame spacing hacks

`default-layout.css` should not own the internals of the heading row, desktop/mobile year switch visibility, or the year switch visual states. Those live with `EntryHeading`, `year-switch.css`, and `RefreshIcon`.

The remaining temporary year-switch coupling is mobile placement:

- desktop switch is attached to `EntryHeading` through the control slot
- mobile switch is still placed through `ContentFrame`'s `mobile-before-body` slot
- `year-switch.css` still contains selectors for `.content-frame-mobile-before-body`
- `ArchiveDefaultFrame.astro` still renders separate desktop/mobile switch instances

These leftovers should wait until content-frame mobile layout and boundary cleanup are complete.

The heading-to-content-frame negative or special spacing is not a final responsibility of the heading or year switch. It exists because the old content-frame visual boundary and layout boundary do not yet match.

`ContentFrame.astro` is currently the content-frame composition entry. It decides whether to include the icon frame, left/right decor, gallery interaction, mobile-before-body slot, and next link.

`ContentFrameBox.astro` is currently too heavy. It renders the box, but it also owns content-frame layers and placement slots:

- decor underlay
- paper
- line frame
- measure/icon layer
- mobile-before-body layer
- body layer
- interaction layer
- next link placement

## Intended Final Boundaries

`ArchiveDefaultLayout.astro` should stay responsible for archive page shell data and page-level composition.

`ArchiveDefaultFrame.astro` should stay responsible for archive default content composition:

- heading area
- optional page/year switch placement at the archive level
- one `ContentFrame` entry

It should not know how icon frames, decor layers, interaction layers, or content-frame paper geometry are drawn.

`default-layout.css` should not become a permanent large layout module. After content-frame cleanup, it should either keep only a small archive default wrapper responsibility or disappear into the component styles that actually own the relevant layout.

`ContentFrame.astro` should be the only content-frame internal composition and layout entry. It should combine:

- decor
- icon frame
- mobile control slot
- `ContentFrameBox`
- gallery interaction
- next link

Do not add a permanent `ContentFrameShell` or `ContentFrameLayout` layer if it only duplicates `ContentFrame`. A temporary shell is acceptable only as an intermediate extraction while reducing `ContentFrameBox.astro`; it should either be folded back into `ContentFrame.astro` or prove a distinct responsibility before it remains.

`ContentFrameBox.astro` should become a narrow frame renderer:

- draw the paper or simple surface
- draw the gold/blue/russet frame lines
- expose a body slot
- avoid knowing about icon frame, decor, gallery, character pages, year switch, or archive page state

## Refactor Order

1. Keep the current `ArchiveDefaultFrame.astro` structure stable while cleaning `ContentFrameBox.astro`.

   The current `EntryHeading` control slot plus mobile year switch slot is acceptable as a temporary bridge. Do not expand `default-layout.css` unless it is needed to preserve the current page shape.

2. Move content-frame internal layer ownership out of `ContentFrameBox.astro`.

   The first target is to make `ContentFrameBox.astro` stop owning placement for icon/decor/interaction/mobile-control layers. Those layers belong to `ContentFrame.astro`.

3. Keep `ContentFrame.astro` as the single composition entry.

   If an intermediate shell file is created during extraction, treat it as temporary. The desired final shape is `ContentFrame.astro` plus a simpler `ContentFrameBox.astro`, not three overlapping layers.

4. Split CSS by responsibility after the component boundary is clear.

   Expected direction:

   - `content-frame.css`: content-frame composition, layers, icon/decor/mobile/interaction placement
   - `content-frame-box.css`: paper, line frame, body slot, simple/ornate box rendering
   - `default-layout.css`: only archive default outer placement, and ideally less over time

5. Remove page/domain selectors from generic content-frame CSS.

   Rules such as character-page selectors inside `content-frame.css` should move toward explicit variants or toward the character content component. The content frame should know about structural variants like `figure`, not business identities like `characters`.

6. Revisit `YearSwitchButton` mobile placement.

   Once `ContentFrame` exposes a cleaner mobile control boundary, remove the remaining `.content-frame-mobile-before-body` dependency from `year-switch.css` and reconsider whether `ArchiveDefaultFrame.astro` still needs separate desktop/mobile switch instances.

7. Revisit `default-layout.css`.

   After `ContentFrame` exposes a stable real layout boundary, remove temporary heading-to-content-frame spacing hacks. If the file no longer has a real layout responsibility, delete it or replace it with a smaller heading-row component stylesheet.

## Decisions To Preserve

- Do not split an `is-character` content-frame component just because character pages have special colors or card treatments. Those belong to later content/profile/card components.
- Treat `figure` as a structural content-frame variant, not as a character-only concept.
- Keep mobile year switch behavior stable for now: desktop year switch is in the `EntryHeading` control slot; mobile year switch remains inside the content frame at the current visual position until content-frame mobile layout is cleaned.
- Do not let decorative visual overhang push the whole chrome stage left or right. Visual layers may overflow internally, but the stage position should remain fixed.
- Avoid letting `default-layout.css` become the new place where old content-frame placement hacks accumulate.
