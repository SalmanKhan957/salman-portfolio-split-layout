import type { Resume, ResumeProject, ResumeWork } from "@/lib/types";
import { formatMonth } from "@/lib/utils";

/** "2026-03" → "Mar 2026"; null/undefined end → "Present". */
export function dateRange(start: string, end?: string | null) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

/** "2026-03" → "2026-03-01" for <time dateTime> and schema.org. */
export function isoDate(ym: string) {
  return /^\d{4}-\d{2}$/.test(ym) ? `${ym}-01` : ym;
}

export type SearchableEntry = {
  id: string;
  title: string;
  subtitle: string;
  text: string; // lower-cased haystack for search
  keywords: string[];
};

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export function workToEntry(w: ResumeWork, index: number): SearchableEntry {
  return {
    id: `work-${index}`,
    title: w.position,
    subtitle: w.name,
    keywords: w.keywords ?? [],
    text: normalize(
      [w.position, w.name, w.location ?? "", w.summary ?? "", ...w.highlights, ...(w.keywords ?? [])].join(" ")
    )
  };
}

export function projectToEntry(p: ResumeProject, index: number): SearchableEntry {
  return {
    id: `project-${index}`,
    title: p.name,
    subtitle: p.type ?? "",
    keywords: p.keywords ?? [],
    text: normalize(
      [p.name, p.type ?? "", p.description ?? "", ...p.highlights, ...(p.keywords ?? [])].join(" ")
    )
  };
}

export function matchesQuery(entry: SearchableEntry, query: string) {
  const q = normalize(query);
  if (!q) return true;
  return entry.text.includes(q);
}

export function matchesSkill(entry: SearchableEntry, skill: string | null) {
  if (!skill) return true;
  const s = normalize(skill);
  return entry.keywords.some((k) => normalize(k) === s) || entry.text.includes(s);
}

/** Technology chips: every keyword tagged on at least one work or project entry. */
export function filterableKeywords(resume: Resume): string[] {
  const set = new Set<string>();
  resume.work.forEach((w) => (w.keywords ?? []).forEach((k) => set.add(k)));
  resume.projects.forEach((p) => (p.keywords ?? []).forEach((k) => set.add(k)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** Escape a string for use inside a RegExp. */
export function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
