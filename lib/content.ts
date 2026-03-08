import site from "@/content/site.json";
import socials from "@/content/socials.json";
import projects from "@/content/projects.json";
import experience from "@/content/experience.json";
import awards from "@/content/awards.json";
import skills from "@/content/skills.json";
import education from "@/content/education.json";
import highlights from "@/content/highlights.json";

import type { Site, Social, Project, Experience } from "@/lib/types";

export const SITE = site as Site;
export const SOCIALS = socials as Social[];
export const PROJECTS = projects as Project[];
export const EXPERIENCE = experience as Experience[];
export const AWARDS = awards as { title: string; date: string; details: string[] }[];
export const SKILLS = skills as Record<string, string[]>;
export const EDUCATION = education as { institution: string; program: string; location?: string; start: string; end: string; details: string[] }[];
export const HIGHLIGHTS = highlights as { label: string; note: string; type?: string }[];
