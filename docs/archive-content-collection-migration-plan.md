# Archive Content Collection Migration Plan

This note records the archive content collection migration. The migration is now complete for ordinary world, system, and character archive text entries: content lives under `src/content/archive`, and dynamic Astro routes render the page shell and sections.

## Problem With Page MDX

Old page MDX files were cleaner than the old Astro pages, but they still owned page composition:

- import archive layouts and section components
- choose `ArchiveDefaultLayout` or `ArchiveSecretLayout`
- place `PrimarySection` and `SecondarySection`
- import local helper components such as the old `ArchiveInfoCardList`

This made the content file partly a page template. Reducing imports with a shared MDX components map would only have hidden imports; it would not have removed the need for pages to write section structure.

## Target Direction

Ordinary archive text entries have moved from route files to content entries:

```text
src/content/archive/world/ferdona/hq.md
src/content/archive/system/weapons.md
src/content/archive/characters/ornette.md

src/pages/world/[...slug].astro
src/pages/system/[slug].astro
src/pages/characters/[slug].astro
```

In this model:

- Markdown frontmatter is content data, not the route.
- Dynamic Astro pages own route generation.
- Dynamic Astro pages import `ArchiveDefaultLayout`, `ArchiveSecretLayout`, and content renderers once.
- World/system routes use `ArchiveContentRenderer.astro`.
- Character routes use `CharacterProfile.astro`.
- Navigation/archive context is resolved in the route/template layer from the generated path.

The content entry expresses data, body text, and section boundaries.

## Implemented Data Shape

World/system entries use frontmatter `archive.sections`:

```yaml
---
section: world
layout: default
archive:
  sections:
    - type: primary
      props:
        showIconFrame: false
      cards: []
      paragraphs:
        - Main entry text.
---
```

Character entries use frontmatter `character.normalProfile` and `character.spoilerProfile`. `characterProfileTransforms.js` normalizes repeated labels, weapon type labels, weapon icons, and little-table fields before rendering.

The page template wraps everything:

```astro
<ArchiveDefaultLayout archive={archive}>
  <ArchiveContentRenderer archive={archive} entry={entry.data} />
</ArchiveDefaultLayout>
```

Later, if wanted, this can evolve toward heading-based section splitting:

```mdx
Main entry text.

## shalom-base

Secondary section text.
```

That would require an MDX/remark transform and should not be mixed into the first content collection migration.

## Data And Routing

The dynamic route should derive the archive context from the final URL, not from each MDX page:

- route path determines archive entry
- navigation data provides title, subtitle, icon, sidebar anchors, next link, page mode switch, and galleries
- `PrimarySection` and `SecondarySection` keep using `getArchiveEntryContext()` or receive `archive` from the dynamic route

The collection schema can start thin:

- `section`: `world | system | characters`
- `layout`: `default | secret`
- optional `slug` override only if the filesystem path is not enough

Do not duplicate navigation labels in frontmatter unless the page intentionally diverges from navigation data.

## Info Card Result

The old info-card prerequisite is complete.

Current state:

- `ArchiveInfoCardList.astro` has been replaced by `ContentCardGrid.astro`.
- The old character-only `AbilityCard` dependency has been removed.
- `src/styles/content/content.css` has been removed.
- Info-card data now lives in frontmatter arrays and is rendered by `ArchiveContentRenderer.astro` or `CharacterProfile.astro`.

## Migration Result

1. Added the `archive` content collection and schema.
2. Added dynamic routes for world, system, and characters.
3. Moved ordinary world/system/character text entries to `src/content/archive`.
4. Replaced page-local info-card helpers with reusable content components.
5. Kept special pages such as classification and intensity on dedicated Astro routes.

## Decisions

- This is the preferred direction over global MDX component imports.
- Do not make each content MDX file a full page template.
- Do not add a new `ArchiveTextLayout`; keep `ArchiveDefaultLayout` and `ArchiveSecretLayout` as route/template tools.
- Keep section boundaries explicit for the first collection migration.
- Only consider heading-based automatic section splitting after collection routing is stable.
