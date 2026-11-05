import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

/** A text that must exist in both languages. */
export const l10n = z.object({ es: z.string().min(1), en: z.string().min(1) });
const yearMonth = z
  .string()
  .regex(/^\d{4}-\d{2}$/, "use YYYY-MM")
  .or(z.date().transform((d) => d.toISOString().slice(0, 7)));

const headlinePart = z.object({
  text: z.string().min(1),
  style: z.enum(["plain", "accent", "italic"]),
});

const profile = defineCollection({
  loader: file("src/data/profile.yaml"),
  schema: z.object({
    kicker: l10n,
    headline: z.object({
      es: z.array(z.array(headlinePart).min(1)).min(1),
      en: z.array(z.array(headlinePart).min(1)).min(1),
    }),
    bio: l10n,
    about: z.object({
      es: z.array(z.string().min(1)).min(1),
      en: z.array(z.string().min(1)).min(1),
    }),
    interests: z.object({ es: z.array(z.string()).min(1), en: z.array(z.string()).min(1) }),
  }),
});

const experience = defineCollection({
  loader: file("src/data/experience.yaml"),
  schema: z.object({
    kind: z.enum(["work", "volunteer"]),
    role: l10n,
    org: z.string(),
    location: z.string(),
    start: yearMonth,
    end: yearMonth.nullable(),
    summary: l10n.optional(),
    metric: z.object({ value: l10n, label: l10n }).optional(),
    highlights: z.array(l10n).min(1),
    stack: z.array(z.string()).default([]),
  }),
});

const skills = defineCollection({
  loader: file("src/data/skills.yaml"),
  schema: z.object({
    order: z.number(),
    label: l10n,
    items: z.array(z.string()).min(1),
    items_en: z.array(z.string()).optional(),
  }),
});

const education = defineCollection({
  loader: file("src/data/education.yaml"),
  schema: z.object({
    kind: z.enum(["degree", "diploma"]),
    title: l10n,
    org: z.string(),
    note: l10n.optional(),
    start: yearMonth.optional(),
    end: yearMonth.optional(),
    conferred: yearMonth.optional(),
    current: z.boolean().default(false),
  }),
});

export const collections = { profile, experience, skills, education };
