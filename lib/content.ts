import site from "@/content/site.json";
import socials from "@/content/socials.json";
import projects from "@/content/projects.json";
import highlights from "@/content/highlights.json";
import resume from "@/content/resume.json";

import type { Site, Social, Project, Experience, Resume } from "@/lib/types";
import { formatMonth } from "@/lib/utils";

export const SITE = site as Site;
export const SOCIALS = socials as Social[];
export const PROJECTS = projects as Project[];
export const HIGHLIGHTS = highlights as { label: string; note: string; type?: string }[];

/** Single source of truth for CV data. Edit content/resume.json. */
export const RESUME = resume as Resume;

/* Views over RESUME used by the home page (kept for backwards compatibility). */

export const EXPERIENCE: Experience[] = RESUME.work.map((w) => ({
  company: w.name,
  title: w.position,
  location: w.location,
  url: w.url || undefined,
  start: w.startDate,
  end: w.endDate ?? "Present",
  highlights: w.highlights
}));

export const EDUCATION = RESUME.education.map((e) => ({
  institution: e.institution,
  program: `${e.studyType} ${e.area}`,
  location: e.location,
  start: e.startDate,
  end: e.endDate,
  details: e.score ? [e.score] : []
}));

export const AWARDS = RESUME.awards.map((a) => ({
  title: a.title,
  date: formatMonth(a.date),
  details: [a.awarder, a.summary].filter((x): x is string => Boolean(x))
}));

export const SKILLS: Record<string, string[]> = {
  ...Object.fromEntries(RESUME.skills.map((s) => [s.name, s.keywords])),
  Languages: RESUME.languages.map((l) => `${l.language} (${l.fluency})`)
};
