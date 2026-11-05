import { type CollectionEntry, getCollection } from "astro:content";
import type { Locale } from "../i18n/locales";

export type Project = CollectionEntry<"projects">;

/** "es/huella-minera" → "huella-minera" */
export const projectSlug = (entry: Project): string => entry.id.split("/").slice(1).join("/");

export async function getProjects(lang: Locale): Promise<Project[]> {
  const all = await getCollection("projects", (entry) => entry.id.startsWith(`${lang}/`));
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const projectCode = (order: number): string => `P-${String(order).padStart(2, "0")}`;
