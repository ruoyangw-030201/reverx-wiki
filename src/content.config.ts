import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const archive = defineCollection({
  loader: glob({
    base: "./src/content/archive",
    pattern: "**/*.md",
  }),
  schema: z.object({
    section: z.enum(["world", "system", "characters"]),
    layout: z.enum(["default", "secret"]).default("default"),
    character: z
      .object({
        normalProfile: z.any(),
        spoilerProfile: z.any(),
      })
      .optional(),
    archive: z.any().optional(),
  }),
});

export const collections = { archive };
