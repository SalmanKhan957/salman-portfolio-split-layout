export type Social = { label: string; href: string };

export type Experience = {
  company: string;
  title: string;
  location?: string;
  url?: string;
  start: string; // YYYY-MM
  end: string | "Present";
  highlights: string[];
  neededInput?: string[];
};

/* ---------- JSON Resume (content/resume.json) ---------- */

export type ResumeProfile = { network: string; username?: string; url: string };

export type ResumeBasics = {
  name: string;
  label: string;
  headline: string;
  email: string;
  phone?: string;
  url: string;
  summary: string;
  location: { city: string; region?: string; countryCode: string; label: string };
  profiles: ResumeProfile[];
};

export type ResumeWork = {
  name: string;
  position: string;
  slug?: string; // links to /projects/[slug] when a case study exists
  url?: string;
  location?: string;
  startDate: string; // YYYY-MM
  endDate: string | null; // null = Present
  summary?: string;
  highlights: string[];
  keywords?: string[];
};

export type ResumeEducation = {
  institution: string;
  url?: string;
  area: string;
  studyType: string;
  location?: string;
  startDate: string;
  endDate: string;
  score?: string;
  courses?: string[];
};

export type ResumeAward = { title: string; date: string; awarder: string; summary?: string };

export type ResumeSkill = {
  name: string;
  level?: string;
  score?: number; // 0–100, self-assessed; drives the radar chart
  keywords: string[];
};

export type ResumeLanguage = { language: string; fluency: string };

export type ResumeProject = {
  name: string;
  slug?: string; // links to /projects/[slug] when a case study exists
  url?: string;
  type?: string;
  startDate: string;
  endDate: string | null;
  description?: string;
  highlights: string[];
  keywords?: string[];
};

export type Resume = {
  meta: {
    version: string;
    source?: string;
    pdf: string;
    pdfFilename: string;
    privacy: { showPhone: boolean };
    verify?: string[];
  };
  basics: ResumeBasics;
  work: ResumeWork[];
  education: ResumeEducation[];
  awards: ResumeAward[];
  skills: ResumeSkill[];
  languages: ResumeLanguage[];
  projects: ResumeProject[];
  certificates: { name: string; date?: string; issuer?: string; url?: string }[];
  publications: { name: string; publisher?: string; releaseDate?: string; url?: string; summary?: string }[];
  references: { name: string; reference: string }[];
};

export type ProjectLink = { label: string; href: string };

export type ProjectCaseStudy = {
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  keyDecisions: string[];
  results: string[];
  links: ProjectLink[];
  improveNext: string[];
  neededInput?: string[];
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  tags: string[];
  proof: string;
  oneLiner: string;
  stack: string[];
  caseStudy: ProjectCaseStudy;
};

export type Site = {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  headline: string;
  summary: string;
  images?: {
    hero?: string;
    about?: string;
  };
  seo: {
    siteUrl: string;
    title: string;
    description: string;
    ogImage: string;
  };
};
