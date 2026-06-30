# ReverX Wiki

ReverX Wiki is an Astro static site for the ReverX archive. It combines a custom chrome shell, archive content frames, content collection entries, character profiles, world maps, and special system pages.

## Requirements

- Node.js `>=22.12.0`
- npm

## Commands

Run commands from the project root:

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Show Astro CLI help |

## Current Architecture

The site is organized around explicit layers:

```text
layout -> shell/frame -> component -> content data
```

Important folders:

```text
src/layouts/                 Page shells and archive layouts
src/components/chrome/        Shared navigation chrome
src/components/content-frame/ Archive frame, sections, content boxes, icon frames
src/components/content/       Reusable content pieces such as cards, notes, hidden text, weapon cards
src/components/characters/    Character profile composition
src/components/primitives/    Small visual primitives
src/content/archive/          Content collection entries for world, system, and characters
src/content/document/         Markdown entries for standalone document/legal pages
src/data/                     Navigation, maps, copy, galleries, and data transforms
src/styles/                   Layered component CSS
public/                       Static images, icons, symbols, and weapon art
docs/                         Refactor notes and maintenance guidance
```

## Archive Content

Ordinary archive entries now live in the Astro content collection:

```text
src/content/archive/world/...
src/content/archive/system/...
src/content/archive/characters/...
```

Dynamic routes render these entries:

```text
src/pages/world/[...slug].astro
src/pages/system/[slug].astro
src/pages/characters/[slug].astro
```

World and system entries are rendered by `ArchiveContentRenderer.astro`.
Character entries are rendered by `CharacterProfile.astro` after normalization through `characterProfileTransforms.js`.

Special visual pages still have dedicated routes:

```text
src/pages/system/classification.astro
src/pages/system/intensity.astro
src/pages/world/ferdona/index.astro
src/pages/world/hespera/index.astro
```

The old classification and intensity visual implementations are archived under
`legacy/system-special-pages-old/`. Their active routes currently keep only the
archive shell/stage identity for a future rebuild.

## Document Pages

Standalone document pages use `src/layouts/DocumentLayout.astro`, Markdown entries in `src/content/document/`, and document routes such as `src/pages/document/[slug].astro`. This keeps legal/document prose out of Astro page templates and avoids depending on archive layout CSS. The copyright page now lives at `/document/copyright/`.

## Content Components

Reusable content pieces include:

- `ContentCard.astro` and `ContentCardGrid.astro`
- `NoteSection.astro`
- `HiddenText.astro`
- `WeaponCard.astro`
- `LittleTable.astro`

Character weapon card art is declared directly in character content entries with:

```yaml
artwork: /weapon/example.png
```

Weapon art assets live in `public/weapon/`.

## Styling Notes

- Global tokens live in `src/styles/global.css`.
- Component geometry and visual behavior should stay close to the component CSS.
- The old archive compatibility stylesheet has been retired to `legacy/archive-layout.css`; active archive pages should not import it.
- Avoid reintroducing a single mixed `content.css`; content styles are split by component.

## Editing Notes

This project contains Chinese source text. Preserve UTF-8 exactly.

- Prefer `apply_patch` for manual edits.
- Avoid PowerShell `Set-Content` for UTF-8 source files.
- Do not trust PowerShell `Get-Content` display when Chinese appears garbled; use `rg` or Node UTF-8 reads to verify actual file content.
- See `docs/utf8-editing-guidelines.md` before bulk editing Chinese text.

## Useful Docs

- `docs/astro-shell-refactor-progress.md`
- `docs/archive-content-frame-refactor-plan.md`
- `docs/archive-content-collection-migration-plan.md`
- `docs/utf8-editing-guidelines.md`
