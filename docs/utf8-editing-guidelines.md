# UTF-8 Editing Guidelines

This project contains Chinese labels, comments, and documentation. Treat UTF-8 safety as part of the coding standard, especially on Windows.

## Goal

Keep Chinese text readable in source files and docs while still allowing small explanatory comments where they help maintain the design system.

## Preferred Editing Method

Use `apply_patch` for normal source and Markdown edits.

`apply_patch` is preferred because it changes only the intended lines and avoids whole-file re-encoding. This is especially important for files that already contain Chinese text.

Safe examples:

```text
Use apply_patch to add or change a small comment.
Use apply_patch to edit component markup.
Use apply_patch to update Markdown sections.
```

Avoid using PowerShell full-file rewrites for text files with Chinese content.

Risky examples:

```powershell
Get-Content file.md | Set-Content file.md
(Get-Content file.astro) -replace 'old', 'new' | Set-Content file.astro
```

These commands can silently change encoding depending on the PowerShell version and defaults.

## Bulk Rewrite Rule

If a bulk rewrite is truly needed, use an explicit UTF-8 API.

Preferred Node pattern:

```js
import fs from "node:fs";

const path = "docs/example.md";
const text = fs.readFileSync(path, "utf8");
const next = text.replaceAll("old", "new");
fs.writeFileSync(path, next, "utf8");
```

Use this only for mechanical rewrites that are difficult to express safely with `apply_patch`.

## Comment Language Policy

Use English for structural CSS comments and reusable component comments.

Examples:

```css
/* Frame: fixed headbar footprint. */
/* Symbol: decorative dot grid used by chrome surfaces. */
```

Chinese comments are allowed when they explain project-specific intent that is easier for the maintainer to read in Chinese.

Examples:

```astro
<!-- 中文说明可以保留：这里是页面主舞台的入口。 -->
```

Do not add large Chinese explanations directly inside source files. Put longer reasoning in `docs/`.

## Markdown Documentation

Project documentation may be written in English or Chinese. When adding Chinese text to docs, still use `apply_patch` for normal edits.

Documentation that explains implementation workflow should live under `docs/`, not as long source comments.

Recommended docs:

```text
docs/style-token-guidelines.md
docs/astro-shell-refactor-progress.md
docs/astro-props-patterns.md
docs/utf8-editing-guidelines.md
```

## Mojibake Check

After editing files that contain Chinese text, run a quick scan for common mojibake fragments:

```powershell
rg -n -- "涓|闁|锛|绔|妗|瀵|灞|鑸|漏" src docs
```

If this returns matches, inspect the result before continuing. Some matches can be false positives, but most indicate corrupted UTF-8 or text that was decoded with the wrong encoding.

## Practical Workflow

1. Read files normally with `rg`, `Get-Content`, or editor views.
2. Make small and targeted edits with `apply_patch`.
3. Avoid PowerShell `Set-Content` unless an explicit UTF-8 encoding is guaranteed.
4. For large mechanical changes, use Node `fs.readFileSync(..., "utf8")` and `fs.writeFileSync(..., "utf8")`.
5. Run the mojibake scan when Chinese text was touched.
6. Run `npm run build` after source changes.

## Rule of Thumb

If the edit contains Chinese text, prefer a line patch over a file rewrite.

If the edit rewrites the whole file, make UTF-8 explicit.
