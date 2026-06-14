# Style Token Guidelines

This document is the long-term rulebook for using the global design foundation in this Astro project. It covers colors, typography, rhythm, spacing, shared layout metrics, chrome frames, motion, stacking, icons, and baseline element rules.

## Source Of Truth

All global style tokens live in `src/styles/global.css`.

Use global tokens directly when a value is part of the site-wide design language. Use component-local variables when the name describes a role or geometry inside that component, such as:

```css
--content-box-body-padding: 42px 6% 42px 4%;
--world-map-label-font-size: clamp(9px, 0.82vw, 17px);
```

Do not recreate generic alias layers such as `--base-*`, `--color-*`, `--theme-*`, or `--font-en-condensed`.

Global tokens have two maturity levels:

- **Foundation tokens** are approved for new pages and reusable components.
- **Compatibility tokens** remain global because existing stages share them, but new work should not adopt them unless it is maintaining those stages.

## Color Palette

The base palette is locked. Do not add or change base colors without a deliberate design review.

### White

- `--white-main`: pure white highlights and paper centers.
- `--white-paper`: warm paper backgrounds and light pages.
- `--white-cool`: cool map/index paper surfaces.

### Black

- `--black-deep`: page chrome, dark panels, deepest ladder stops.
- `--black-panel-base`: cool black for sidebar, gallery panels, essence theme.
- `--black-main`: primary body text and icon captions.

### Gray

- `--gray-main`: muted UI labels and secondary neutral marks.
- `--gray-light`: pale dividers and endbar micro UI.

### Blue

- `--blue-dark`: deep ladder blues and high-intensity states.
- `--blue-main`: primary system blue, links, borders, markers.
- `--blue-light`: pale blue labels, glows, diagram highlights.

### Gold

- `--gold-dark`: russet accents, spectrum text, connector lines.
- `--gold-main`: primary gold borders, frame accents, active states.
- `--gold-light`: light gold highlights and low red ladder step.

### Red

- `--red-dark`: high danger ladder background.
- `--red-deep`: mid danger ladder background.

## RGB Channels

Every base color has a matching `--rgb-*` channel for alpha-derived colors. Keep names and values one-to-one:

```css
--blue-main: #2d5f96;
--rgb-blue-main: 45 95 150;
```

The complete mapping follows the base palette:

| Family | Base tokens | Matching channel tokens |
| --- | --- | --- |
| Black | `--black-deep`, `--black-panel-base`, `--black-main` | `--rgb-black-deep`, `--rgb-black-panel-base`, `--rgb-black-main` |
| White | `--white-main`, `--white-paper`, `--white-cool` | `--rgb-white-main`, `--rgb-white-paper`, `--rgb-white-cool` |
| Gray | `--gray-main`, `--gray-light` | `--rgb-gray-main`, `--rgb-gray-light` |
| Blue | `--blue-dark`, `--blue-main`, `--blue-light` | `--rgb-blue-dark`, `--rgb-blue-main`, `--rgb-blue-light` |
| Gold | `--gold-dark`, `--gold-main`, `--gold-light` | `--rgb-gold-dark`, `--rgb-gold-main`, `--rgb-gold-light` |
| Red | `--red-dark`, `--red-deep` | `--rgb-red-dark`, `--rgb-red-deep` |

Do not use `--rgb-*` directly in page CSS unless you are defining a new approved global derived token or a narrowly scoped component variable.

## Alpha Policy

Allowed alpha stops:

- `--alpha-strong: 0.82`
- `--alpha-border: 0.64`
- `--alpha-line: 0.42`
- `--alpha-soft: 0.28`
- `--alpha-wash: 0.12`

Do not add `solid`, `ghost`, or one-off opacity values such as `.72`, `.65`, `.55`, or `.045`. A color that should look solid should use the base color directly.

`--white-wash` is the only approved half-wash exception. It derives from `calc(var(--alpha-wash) / 2)` and exists for extremely quiet white highlights on dark interactive surfaces. Do not introduce a general `--alpha-ghost` token from it.

## Derived Colors

Use derived colors for opacity and UI roles:

- Ink: `--ink-strong`, `--ink-readable`, `--ink-muted`, `--ink-faint`
- Black surfaces: `--black-panel`, `--black-overlay`
- White surfaces: `--white-readable`, `--white-soft`, `--white-faint`, `--white-wash`
- Neutral UI: `--neutral-ui`, `--neutral-light`
- Gold: `--gold-strong`, `--gold-border`, `--gold-line`, `--gold-wash`
- Blue: `--blue-bright`, `--blue-border`, `--blue-line`, `--blue-wash`
- Russet: `--russet-line`, `--russet-text`

Use ladder tokens for step/grade diagrams instead of rebuilding step colors locally:

- Blue grade system: `--ladder-blue-border`, `--ladder-blue-border-strong`, and `--ladder-blue-[a-e]-bg-*`.
- Danger grade system: `--ladder-red-1` through `--ladder-red-7`.

Ladder tokens are reusable domain tokens. They may be consumed by future grade or intensity components, but their internal colors must continue to reference the global palette and derived colors.

Blue ladder roles:

| Grade | Tokens |
| --- | --- |
| Shared border | `--ladder-blue-border`, `--ladder-blue-border-strong` |
| E | `--ladder-blue-e-bg` |
| D | `--ladder-blue-d-bg-start`, `--ladder-blue-d-bg-end` |
| C | `--ladder-blue-c-bg-start`, `--ladder-blue-c-bg-end` |
| B | `--ladder-blue-b-bg-start`, `--ladder-blue-b-bg-end` |
| A | `--ladder-blue-a-bg-start`, `--ladder-blue-a-bg-end` |

Danger ladder roles:

| Progression | Tokens |
| --- | --- |
| Light/paper grades | `--ladder-red-1`, `--ladder-red-2` |
| Gold/russet bridge | `--ladder-red-3`, `--ladder-red-4` |
| Red danger grades | `--ladder-red-5`, `--ladder-red-6` |
| Deepest danger grade | `--ladder-red-7` |

## Choosing A Color

For text on paper:

- Primary text: `--black-main`
- Strong small text: `--ink-strong`
- Secondary text: `--ink-readable`
- Muted captions: `--ink-muted`

For text on dark panels:

- Main readable text: `--white-readable`
- Secondary text: `--white-soft`
- Faint dividers/glints: `--white-faint`
- Extremely quiet interactive highlight: `--white-wash`

For borders and frame lines:

- Standard gold frame border: `--gold-border`
- Thin gold line: `--gold-line`
- Standard blue edge: `--blue-border`
- Thin blue guide line: `--blue-line`
- Russet connector/frame edge: `--russet-line`

For soft decoration:

- Gold glow/paper wash: `--gold-wash`
- Blue glow/background wash: `--blue-wash`
- Dark overlay/shadow: `--black-overlay`

## Fonts

Global font tokens:

```css
--font-sans: "Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
--font-serif: var(--font-sans);
--font-latin: "Bebas Neue", "Oswald", "Arial Narrow", Impact, sans-serif;
```

Font token roles:

| Token | Role |
| --- | --- |
| `--font-sans` | Default Chinese UI and body stack. Multiple fonts are listed as fallbacks; the browser uses the first installed font. |
| `--font-serif` | Compatibility alias for `--font-sans`. Do not use it to imply a true serif style until a real serif stack is introduced. |
| `--font-latin` | Condensed Latin display stack for English labels, numbers, navigation marks, side marks, and decorative uppercase text. Do not use it for Chinese prose. |

## Type Scale

Use the global text scale:

```css
/* normal text */
--text-xs: 10px;
--text-sm: 12px;
--text-label: 14px;
--text-body-sm: 15px;
--text-body: 16px;
/* heading text */
--text-lead: 18px;
--text-title-sm: 20px;
--text-title: 22px;
--text-title-lg: 24px;
--text-heading: 30px;
/* decor text */
--text-display: 78px;
```

Ordinary body text, headings, buttons, nav items, captions, and cards should use fixed tokens plus media-query overrides.

The current type scale intentionally remains in `px` while the project structure is being stabilized. Do not convert individual tokens or pages to `rem` piecemeal. A future `rem` migration should update the complete scale and verify chrome, diagrams, and mobile typography together.

Type token roles:

| Token | Size | Role |
| --- | ---: | --- |
| `--text-xs` | 10px | Micro support text: headbar English tab text, active arrow helper labels, endbar micro metadata, tiny home marks, and world map region-card English labels. |
| `--text-sm` | 12px | Small structural labels: archive/world-map vertical kickers, sidebar English heading text, endbar copyright/legal text, spectrum card subtitles, character ability pseudo numbers, and compact table notes. |
| `--text-label` | 14px | Standard UI labels: archive subtitles, endbar brand text, index section descriptions and icon captions, sidebar links, gallery mobile counter/caption, world-map heading captions, and table label text. |
| `--text-body-sm` | 15px | Mobile prose and prose-like descriptions: archive/custom body text, character overview text, weapon text, map/index/secret text boxes, classification descriptions, intensity descriptions, mobile nav Chinese, and sidebar link labels. It also serves the desktop gallery caption/counter. |
| `--text-body` | 16px | Desktop prose baseline: content frames, archive descriptions, copyright body, desktop nav items, desktop card descriptions, world-map card labels, and normal readable UI copy. |
| `--text-lead` | 18px | Emphasized compact headings and controls: sidebar headings/section links, archive placeholders, note titles, spectrum overview titles/subtitles, gallery close on mobile, and intensity row titles. |
| `--text-title-sm` | 20px | Narrow small-title slot. Currently reserved for spectrum lineage titles; do not add casual body or label uses. |
| `--text-title` | 22px | Standard title/control size: copyright section headings, gallery close on desktop, spectrum card titles, intensity core titles, and danger icon marks. |
| `--text-title-lg` | 24px | Large local titles: archive secondary/mobile titles, world-map mobile H1, and intensity danger grade markers. |
| `--text-heading` | 30px | Page and diagram headings: archive primary title, world-map desktop H1, spectrum mobile class title, intensity factor/danger titles, danger table grades, and mobile operator symbols. |
| `--text-display` | 78px | Oversized decorative numerals only: index side mark number and home master side mark number. |

Use `--text-body` for desktop prose and prose-like descriptions. Use `--text-body-sm` for mobile prose and prose-like descriptions. Small labels should stay on `--text-xs`, `--text-sm`, or `--text-label` according to density; do not use body tokens just to make decorative labels bigger.

Do not write direct page text like:

```css
font-size: clamp(...);
```

Fluid text is allowed only for fixed-ratio visual components, maps, diagrams, and dense labels. Put the clamp in a named component variable at the component root:

```css
--world-map-label-font-size: clamp(9px, 0.82vw, 17px);
```

## Foundation Tokens

Use foundation tokens for repeated layout rhythm, interaction timing, and shared UI geometry. Do not create global tokens for one-off decorative positioning.

Spacing scale:

```css
--space-hair: 2px;
--space-micro: 4px;
--space-tight: 8px;
--space-small: 12px;
--space-compact: 16px;
--space-medium: 18px;
--space-large: 24px;
--space-section: 32px;
--space-shell: 42px;
--space-outset: 48px;
--space-wide: 72px;
--space-end-mobile: 64px;
--space-end: 96px;
```

`--space-section` and `--space-shell` are larger reusable component gaps. `--space-end-mobile` and `--space-end` reserve the final breathing room below a page stage. `--space-outset` and `--space-wide` remain available but should be verified against a repeated use before adoption.

Approved shared shell metrics:

```css
--layout-shell-gap: clamp(28px, 2.5vw, 42px);
--layout-shell-pad-top: 24px;
```

`--layout-shell-gap` is intentionally fluid because it controls the repeated relationship between the sidebar, main stage, and right viewport edge. `--layout-shell-pad-top` is fixed because chrome-to-stage placement should be predictable.

Compatibility and special-stage layout metrics:

```css
--layout-content-outset-x: clamp(48px, 4.586vw, 72px);
--layout-content-outset-width: clamp(58px, 5.478vw, 86px);
--layout-side-rail-width: clamp(88px, 7.643vw, 120px);
--layout-bottom-rail-height: clamp(60px, 8.889vh, 80px);
--layout-mobile-side-rail-width: clamp(42px, 12vw, 58px);
--layout-mobile-bottom-rail-height: clamp(54px, 9svh, 78px);
```

- `--layout-content-outset-*` is an Archive/content-frame compatibility system. Do not use it in a new stage; it should be retired as the default Archive stage is rebuilt.
- `--layout-*-rail-*` belongs to the special Home/Index rail composition. Do not treat it as standard ChromeLayout geometry.
- Keep map ratios, diagram coordinates, artwork crops, and home cluster geometry local to their components.

Chrome frame metrics:

```css
--chrome-headbar-height: 78px;
--chrome-headbar-height-mobile: 58px;
--chrome-hero-height: 194px;
--chrome-sidebar-width: 216px;
--chrome-sidebar-min-height: 200px;
--chrome-endbar-height: 58px;
```

Use these only for top/bottom/hero/sidebar chrome frames. These dimensions are deliberately fixed so the chrome can be assembled like explicit Figma frames: the layout places the frame, and the component owns its outer dimensions. Keep internal nav gaps, artwork crop values, and component composition variables inside the chrome CSS file.

Radius scale:

```css
--radius-sharp: 2px;
--radius-frame: 6px;
--radius-card: 7px;
--radius-pill: 999px;
--radius-circle: 50%;
```

Use `--radius-frame` for framed panels, `--radius-card` for repeated cards, `--radius-pill` for capsule marks, and `--radius-circle` for circular controls or nodes. `--radius-sharp` is currently reserved; do not use it merely to avoid writing a genuinely component-specific corner value.

Retired leading scale snapshot:

```css
--leading-none: 1;
--leading-tight: 1.1;
--leading-ui: 1.25;
--leading-body: 1.6;
--leading-readable: 1.7;
--leading-loose: 1.85;
```

This abstract `--leading-*` scale is kept here as a migration snapshot only. Do not add it back to `global.css`; new and migrated CSS should use functional line-height tokens.

Functional rhythm:

```css
--basic-line-height: 1;
--ui-line-height: 1.25;
--prose-line-height: 1.7;
--prose-paragraph-gap: var(--space-large);
--prose-paragraph-gap-tight: var(--space-small);
--prose-indent: 2em;
--card-line-height: 1.35;
```

Use `--prose-line-height` for all readable body copy, including archive/custom body text, content frames, index/secret intro boxes, copyright text, character overview/weapon text, and classification descriptions. Do not create page-specific body line-heights such as `1.55`, `1.75`, `1.8`, or `1.9`.

Use `--basic-line-height` for exact single-line UI, marks, numbers, and tightly framed visual labels that previously used `line-height: 1`. Use `--ui-line-height` for compact UI controls, captions, hints, menu labels, and short metadata that previously used `line-height: 1.25`.

Direct numeric `line-height` values are still allowed for page titles, map labels, diagrams, home/master-index visual compositions, and fixed-ratio components where text is part of the graphic layout. Those values stay local to the component.

Use `--card-line-height` for compact card descriptions and card body copy, including spectrum card descriptions, character ability descriptions, weapon cards, and intensity ability-row descriptions. Keep it separate from `--prose-line-height`; cards need a denser rhythm than long-form text.

Paragraph text should use `--prose-paragraph-gap` and `--prose-indent`. Use `--prose-paragraph-gap-tight` only for intentionally compact prose blocks; if a card needs a different rhythm, define a local component variable instead of changing the global prose rhythm.

Motion scale:

```css
--duration-fast: 160ms;
--duration-base: 180ms;
--duration-content: 220ms;
--duration-enter: 520ms;
--ease-standard: ease;
--ease-enter: cubic-bezier(0.18, 0.82, 0.28, 1);
```

Use `--duration-fast` for visibility, opacity, and direct-response map interactions; `--duration-base` for ordinary hover/focus/control state changes; `--duration-content` for content-frame and card transitions; and `--duration-enter` with `--ease-enter` only for deliberate composition entrance motion.

Z-index layers:

```css
--z-base: 0;
--z-raised: 1;
--z-content: 2;
--z-decor: 4;
--z-main: 12;
--z-sticky: 20;
--z-chrome: 30;
--z-floating: 50;
--z-popover: 80;
--z-overlay: 90;
--z-modal: 1000;
```

Local stacking contexts may still use small numeric values such as `0` to `8` for internal layering. Use global z tokens when an element competes with page chrome, overlays, fixed bars, popovers, or modals.

Layer roles:

- `--z-base`: fixed background layers.
- `--z-content` and `--z-decor`: normal stage content and local decorative layers.
- `--z-main`: the main page-stage plane above backgrounds.
- `--z-sticky` and `--z-chrome`: sticky bars, sidebar chrome, and mobile chrome panels.
- `--z-floating`, `--z-popover`, `--z-overlay`, and `--z-modal`: progressively stronger cross-page overlays.

Shared icon/action sizes:

```css
--icon-median: 38px;
--icon-median-mobile: 30px;
--icon-small: 19px;
```

Use these for repeated square action/icon frames such as menu toggles, sidebar icons, and disclosure controls. A unique illustration, diagram node, or content image should keep its size local.

## Global Element Baseline

`global.css` also owns the minimum browser-normalization layer:

- All elements use `box-sizing: border-box`.
- `html` owns smooth scrolling and the warm paper fallback background.
- `body` removes default margin, establishes the site font and primary foreground/background colors, and enables font smoothing.
- `img` and `svg` are block-level and constrained to their container width.
- Links inherit color and remove default underlines; components must add their own interaction affordance.
- Buttons inherit the surrounding font.
- Headings and paragraphs remove only their default top margin.
- Text selection uses `--gold-line`.

Do not duplicate these baseline rules in page CSS. Component CSS should add only the behavior that differs from this baseline.

## Breakpoints

Use literal breakpoint values in `@media` and `@container`; CSS custom properties are not reliable there.

- `980px`: site-wide mobile breakpoint and matching JavaScript `matchMedia` value.
- `620px`: narrow phone breakpoint.
- `720px` and `560px`: content container query breakpoints.
- `1180px+`: local tuning only for complex home, spectrum, or diagram compositions.

## Page Surfaces

Standard ChromeLayout pages should select their initial surface through `BackgroundSurface`/`ChromeLayout` instead of writing a page background directly:

| Tone | Base result |
| --- | --- |
| `white` | `--white-main` |
| `paper` | `--white-paper` |
| `cool` | `--white-cool` |
| `dark` | `--black-deep` with the approved blue/gold surface washes |

The surface component translates a semantic tone into palette tokens. Page CSS may layer scroll decoration or fixed artwork above it, but should not redefine the underlying tone system.

## New Page Checklist

1. Import existing component styles before creating a new CSS surface.
2. Select the page tone through `ChromeLayout`/`BackgroundSurface`; use base white tokens directly only for internal paper surfaces.
3. Use `--black-main` for primary text.
4. Use `--gold-border`, `--gold-line`, `--blue-border`, and `--blue-line` for frames and structure.
5. Use `--gold-wash` and `--blue-wash` sparingly for glows.
6. Use `--font-sans` for Chinese UI/body text and `--font-latin` for Latin decorative labels.
7. Use the global text scale unless the element is a map/diagram/fixed-ratio visual label.
8. Use foundation tokens for repeated spacing, radius, leading, motion, and z layers.
9. Define component-local semantic variables only when a value is reused within that component.
10. Keep component geometry local when it depends on artwork ratio, diagram coordinates, or a unique page composition.
11. Use fixed chrome frame metrics for standard shell placement; do not recreate their dimensions with local `clamp(...)`.
12. Do not adopt `--layout-content-outset-*` for new page stages. It is an Archive compatibility layer scheduled for removal.

## Audit Commands

```powershell
rg -n -- "var\(--(base|color|theme)-|--(base|color|theme)-" src
rg -n -- "--alpha-solid|--[A-Za-z0-9_-]*solid[A-Za-z0-9_-]*|ghost" src/styles src/data src/layouts
rg -n -- "font-en-condensed|blue-rich" src
rg --pcre2 -n -- "--([A-Za-z0-9_-]+):\s*var\(--\1\)" src/styles
rg -n -- "font-size:\s*clamp\(" src/styles
rg -n -g "!global.css" -- "clamp\(28px, 2\.5vw, 42px\)|180ms ease|border-radius: 7px|line-height: 1\.6" src/styles
rg -n -- "space-page-end|layout-shell-pad-right|chrome-headbar-height-narrow" src
npm run build
```

The `solid` check is token-specific. Ordinary CSS syntax like `border: 1px solid` and state classes like `.is-solid` are not color-token problems.
