# Astro Props Patterns

This project uses plain Astro components with small, explicit prop contracts. When a prop selects a variant or maps to a CSS class, avoid indexing a fixed object directly with `Astro.props` values, because VS/TypeScript treats destructured props as possibly `any`.

## Variant Maps

Use a fixed map, derive the allowed key type from it, and narrow unknown prop values before indexing:

```astro
---
const { variant = "default" } = Astro.props;

const variantClassByName = {
  default: null,
  secret: "is-secret",
  worldMap: "is-world-map",
} as const;

type VariantName = keyof typeof variantClassByName;

function isVariantName(value: unknown): value is VariantName {
  return typeof value === "string" && value in variantClassByName;
}

const variantKey = isVariantName(variant) ? variant : "default";
const variantClass = variantClassByName[variantKey];
---
```

This keeps behavior stable: valid variants resolve to their mapped class, missing or invalid variants fall back to `default`, and TypeScript knows the object index is safe.

## Rules

- Prefer `as const` maps for finite variant sets.
- Derive the key type with `keyof typeof map`; do not duplicate string unions unless the map must satisfy an external API.
- Treat values from `Astro.props` as unknown at runtime when they index maps.
- Use a small type guard for map lookups instead of `as any`.
- Keep fallback behavior explicit, usually `"default"`.
- Do not add a variant unless it has a CSS class or behavior that is actually used.
