import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
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
    cvProfile: l10n,
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

export const categories = [
  "econometria",
  "riesgo",
  "geoespacial",
  "datos",
  "ia",
  "bi",
  "politica",
] as const;
const category = z.enum(categories);
const link = z.object({
  kind: z.enum(["repo", "demo", "report", "story", "video", "post"]),
  url: z.url(),
});

const projects = defineCollection({
  // One Markdown file per language: src/content/projects/{es,en}/<slug>.md
  loader: glob({ pattern: "{es,en}/*.md", base: "src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      question: z.string().min(1),
      result: z.object({ value: z.string().min(1), label: z.string().min(1) }),
      metrics: z
        .array(z.object({ value: z.string().min(1), label: z.string().min(1) }))
        .default([]),
      stack: z.array(z.string()).min(1),
      cover: image(),
      coverAlt: z.string().min(1),
      year: z.number().int(),
      order: z.number().int(),
      context: z.string().min(1),
      categories: z.array(category).min(1),
      links: z.array(link).min(1),
    }),
});

const archive = defineCollection({
  loader: file("src/data/archive.yaml"),
  schema: z.object({
    title: l10n,
    summary: l10n,
    metric: z.string().optional(),
    year: z.number().int(),
    context: l10n,
    categories: z.array(category).min(1),
    stack: z.array(z.string()).min(1),
    links: z.array(link).min(1),
  }),
});

export const credentialCategories = [
  "econometrics",
  "impact",
  "data-eng",
  "ds-ml",
  "bi",
  "finance",
  "languages",
  "academic",
  "other",
] as const;

const credentials = defineCollection({
  loader: file("src/data/credentials.yaml"),
  schema: ({ image }) =>
    z.object({
      category: z.enum(credentialCategories),
      title: l10n,
      issuer: z.string(),
      date: yearMonth,
      start: yearMonth.optional(),
      hours: z.number().positive().optional(),
      grade: z.string().optional(),
      items: z.array(l10n).optional(),
      highlight: z.boolean().default(false),
      scholarship: z.boolean().default(false),
      verify: z.url().optional(),
      note: l10n.optional(),
      thumb: image(),
    }),
});

const events = defineCollection({
  loader: file("src/data/events.yaml"),
  schema: ({ image }) =>
    z.object({
      kind: z.enum(["hackathon", "datathon", "challenge", "sport"]),
      title: l10n,
      organizer: z.string(),
      date: yearMonth,
      start: yearMonth.optional(),
      result: l10n,
      summary: l10n,
      note: l10n.optional(),
      finalist: z.boolean().default(false),
      latest: z.boolean().default(false),
      link: z.url().optional(),
      thumb: image(),
    }),
});

const studies = defineCollection({
  loader: file("src/data/studies.yaml"),
  schema: z.object({
    title: l10n,
    org: z.string(),
    period: l10n,
    start: yearMonth.optional(),
    end: yearMonth.optional(),
  }),
});

const papers = defineCollection({
  loader: file("src/data/papers.yaml"),
  schema: z.object({
    classified: z.boolean().default(false),
    topic: l10n,
    title: l10n.optional(),
    stages: z
      .array(z.enum(["question", "data", "estimation", "draft", "submitted", "published"]))
      .min(1),
    pdf: z.string().optional(),
    bibtex: z.string().optional(),
    doi: z.string().optional(),
  }),
});

export const collections = {
  profile,
  experience,
  skills,
  education,
  projects,
  archive,
  credentials,
  events,
  studies,
  papers,
};
