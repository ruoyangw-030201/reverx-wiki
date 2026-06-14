# Archive Content Collection Migration Plan

This note records the next archive content direction after the first MDX page migration. The current `.mdx` files still live under `src/pages`, so each MDX file is still a route component. The better long-term model is to move archive MDX into content collections and let dynamic Astro routes render the page shell and sections.

## Problem With Page MDX

Current page MDX files are cleaner than the old Astro pages, but they still own page composition:

- import archive layouts and section components
- choose `ArchiveDefaultLayout` or `ArchiveSecretLayout`
- place `PrimarySection` and `SecondarySection`
- import local helper components such as `ArchiveInfoCardList`

This means the content file is still partly a page template. Reducing imports with a shared MDX components map would only hide imports; it would not remove the need for pages to write section structure.

## Target Direction

Move ordinary archive text entries from route files to content entries:

```text
src/content/archive/world/ferdona/hq.mdx
src/content/archive/system/weapons.mdx
src/content/archive/characters/ornette.mdx

src/pages/world/[...slug].astro
src/pages/system/[slug].astro
src/pages/characters/[slug].astro
```

In this model:

- MDX is content data, not the route.
- Dynamic Astro pages own route generation.
- Dynamic Astro pages import `ArchiveDefaultLayout`, `ArchiveSecretLayout`, `PrimarySection`, and `SecondarySection` once.
- The route calls `render(entry)` and passes MDX component mappings through `<Content components={...} />`.
- Navigation/archive context is resolved in the route/template layer from the generated path.

The content entry should only express body content and section boundaries.

## Desired MDX Shape

Short term, content entries can still use section boundary components, but with content-facing names:

```mdx
---
section: world
layout: default
---

<Primary>
Main entry text.
</Primary>

<Secondary id="shalom-base">
Secondary section text.
</Secondary>
```

The dynamic route maps these to real components:

```astro
<Content
  components={{
    Primary: PrimarySection,
    Secondary: SecondarySection,
  }}
/>
```

The page template still wraps everything:

```astro
<ArchiveDefaultLayout archive={archive}>
  <Content components={archiveContentComponents} />
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

## Info Card Prerequisite

Several world entries still import `ArchiveInfoCardList` and define local `*InfoCards` arrays inside page MDX. This should be cleaned before the collection migration, otherwise content entries will still need implementation imports.

Current state:

- `ArchiveInfoCardList.astro` lives under `src/components/content`
- it renders `AbilityCard`, which is a character-profile component
- info-card layout rules still live inside `src/styles/content/content.css`

Target direction before collection migration:

- create a real archive info-card component boundary, not a wrapper around `AbilityCard`
- move its CSS out of `content.css` into a component CSS file
- make info-card data content-facing and stable
- decide whether info cards are:
  - frontmatter/data arrays rendered by the dynamic route, or
  - a content-facing MDX component such as `<InfoCards items={...} />`

The most collection-friendly option is to keep info-card data in frontmatter or a sidecar data field and let the route/section component render it. That would keep MDX body focused on prose. If the data is too page-specific, `<InfoCards>` can remain as a content-facing component, but it should be imported through the dynamic route `components` map, not per MDX file.

## Migration Steps

1. Finish the archive info-card component cleanup.
2. Add an archive content collection and schema.
3. Build one pilot dynamic route for a simple primary-only page.
4. Move one page from `src/pages/.../*.mdx` to `src/content/archive/.../*.mdx`.
5. Render it through `render(entry)` and `<Content components={...} />`.
6. Verify route path, navigation context, primary section, next link, and build output.
7. Pilot one page with secondary sections.
8. Pilot one page with info cards after the info-card cleanup.
9. Batch move default/secret text pages.
10. Leave special pages such as classification and intensity on dedicated Astro routes until their page-specific layouts are cleaned.

## Decisions

- This is the preferred direction over global MDX component imports.
- Do not make each content MDX file a full page template.
- Do not add a new `ArchiveTextLayout`; keep `ArchiveDefaultLayout` and `ArchiveSecretLayout` as route/template tools.
- Keep section boundaries explicit for the first collection migration.
- Only consider heading-based automatic section splitting after collection routing is stable.
