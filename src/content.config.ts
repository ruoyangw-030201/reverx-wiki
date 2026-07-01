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

const indexPage = defineCollection({
  loader: glob({
    base: "./src/content/index-page",
    pattern: "*.md",
  }),
  schema: z.object({
    section: z.enum(["world", "system", "characters", "history"]),
    gridLabel: z.string(),
    gridLayout: z.enum(["stack", "columns"]).default("stack"),
    gridClass: z.string().optional(),
    sections: z
      .array(
        z.object({
          title: z.string(),
          subtitle: z.string(),
          description: z.string().optional(),
          layout: z.enum(["default", "split"]).default("default"),
          mapKey: z.string().optional(),
          iconGroup: z.string().optional(),
          hrefs: z.array(z.string()).optional(),
        })
      )
      .default([]),
  }),
});

const worldMap = defineCollection({
  loader: glob({
    base: "./src/content/world-map",
    pattern: "*.md",
  }),
  schema: z.object({
    mapKey: z.string(),
  }),
});

const systemSpecial = defineCollection({
  loader: glob({
    base: "./src/content/system-special",
    pattern: "*.md",
  }),
  schema: z.object({
    page: z.enum(["classification", "intensity"]),
  }),
});

const document = defineCollection({
  loader: glob({
    base: "./src/content/document",
    pattern: "*.md",
  }),
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    kicker: z.string().optional(),
    description: z.string().optional(),
    returnLabel: z.string().default("回到页面"),
  }),
});

export const collections = { archive, indexPage, worldMap, systemSpecial, document };
