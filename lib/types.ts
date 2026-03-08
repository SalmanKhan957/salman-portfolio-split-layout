export type Social = { label: string; href: string };

export type Experience = {
  company: string;
  title: string;
  location?: string;
  start: string; // YYYY-MM
  end: string | "Present";
  highlights: string[];
  neededInput?: string[];
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
