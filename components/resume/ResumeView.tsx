"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Resume } from "@/lib/types";
import {
  filterableKeywords,
  matchesQuery,
  matchesSkill,
  projectToEntry,
  workToEntry,
  type SearchableEntry
} from "@/lib/resume";
import { formatMonth } from "@/lib/utils";
import { ResumeNav, type NavSection } from "@/components/resume/ResumeNav";
import { ResumeToolbar } from "@/components/resume/ResumeToolbar";
import { TimelineEntry } from "@/components/resume/TimelineEntry";
import { SkillsChart } from "@/components/resume/SkillsChart";
import { Highlight } from "@/components/resume/Highlight";

type Props = {
  resume: Resume;
  /** slug → case-study title, for "Read the case study" links. */
  caseStudies: Record<string, string>;
};

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={`${id}-heading`} className="text-xl font-semibold tracking-tight text-ink-950 sm:text-2xl">
      {children}
    </h2>
  );
}

function Empty({ what }: { what: string }) {
  return <p className="mt-4 text-sm text-ink-500">No {what} match the current search or filter.</p>;
}

export function ResumeView({ resume, caseStudies }: Props) {
  const [query, setQuery] = useState("");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    resume.work.forEach((_, i) => (init[`work-${i}`] = true));
    resume.projects.forEach((_, i) => (init[`project-${i}`] = i === 0));
    return init;
  });

  const workEntries = useMemo(() => resume.work.map(workToEntry), [resume.work]);
  const projectEntries = useMemo(() => resume.projects.map(projectToEntry), [resume.projects]);
  const skillChips = useMemo(() => filterableKeywords(resume), [resume]);

  const filtering = Boolean(query.trim() || activeSkill);
  const isVisible = useCallback(
    (e: SearchableEntry) => matchesQuery(e, query) && matchesSkill(e, activeSkill),
    [query, activeSkill]
  );
  const visibleWork = workEntries.filter(isVisible);
  const visibleProjects = projectEntries.filter(isVisible);
  const totalCount = workEntries.length + projectEntries.length;
  const resultCount = visibleWork.length + visibleProjects.length;

  // While filtering, matching entries auto-expand so hits are visible.
  const isExpanded = (id: string) => (filtering ? true : Boolean(expanded[id]));
  const toggle = useCallback((id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] })), []);
  const setAll = (value: boolean) =>
    setExpanded(Object.fromEntries([...workEntries, ...projectEntries].map((e) => [e.id, value])));
  const toggleSkill = useCallback((k: string) => setActiveSkill((cur) => (cur === k ? null : k)), []);

  const sections = useMemo<NavSection[]>(() => {
    const list: NavSection[] = [
      { id: "summary", label: "Summary" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "education", label: "Education" }
    ];
    if (resume.awards.length) list.push({ id: "awards", label: "Awards" });
    if (resume.certificates.length) list.push({ id: "certificates", label: "Certificates" });
    if (resume.publications.length) list.push({ id: "publications", label: "Publications" });
    if (resume.languages.length) list.push({ id: "languages", label: "Languages" });
    return list;
  }, [resume]);

  const sectionCls = "scroll-mt-40 break-inside-avoid";

  return (
    <div className="mt-8">
      <ResumeNav sections={sections} />

      <div className="mt-6">
        <ResumeToolbar
          query={query}
          onQuery={setQuery}
          skills={skillChips}
          activeSkill={activeSkill}
          onSkill={setActiveSkill}
          resultCount={resultCount}
          totalCount={totalCount}
          onExpandAll={() => setAll(true)}
          onCollapseAll={() => setAll(false)}
        />
      </div>

      <div className="mt-12 space-y-14">
        {/* Summary */}
        <section id="summary" aria-labelledby="summary-heading" className={sectionCls}>
          <SectionHeading id="summary">Summary</SectionHeading>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-700 sm:text-base">
            <Highlight text={resume.basics.summary} query={query} />
          </p>
        </section>

        {/* Experience */}
        <section id="experience" aria-labelledby="experience-heading" className={sectionCls}>
          <SectionHeading id="experience">Experience</SectionHeading>
          {visibleWork.length ? (
            <ol className="relative mt-6 space-y-5 sm:ml-4 sm:border-l sm:border-ink-200 sm:pl-6">
              {resume.work.map((w, i) => {
                const entry = workEntries[i];
                if (!isVisible(entry)) return null;
                return (
                  <li key={entry.id}>
                    <TimelineEntry
                      id={entry.id}
                      title={w.position}
                      org={w.name}
                      orgHref={w.url || undefined}
                      start={w.startDate}
                      end={w.endDate}
                      location={w.location}
                      highlights={w.highlights}
                      keywords={w.keywords ?? []}
                      expanded={isExpanded(entry.id)}
                      onToggle={toggle}
                      query={query}
                      activeSkill={activeSkill}
                      onSkillClick={toggleSkill}
                    />
                  </li>
                );
              })}
            </ol>
          ) : (
            <Empty what="roles" />
          )}
        </section>

        {/* Projects */}
        <section id="projects" aria-labelledby="projects-heading" className={sectionCls}>
          <SectionHeading id="projects">Projects</SectionHeading>
          {visibleProjects.length ? (
            <ol className="relative mt-6 space-y-5 sm:ml-4 sm:border-l sm:border-ink-200 sm:pl-6">
              {resume.projects.map((p, i) => {
                const entry = projectEntries[i];
                if (!isVisible(entry)) return null;
                const caseStudy = p.slug && caseStudies[p.slug] ? `/projects/${p.slug}` : null;
                const footer =
                  caseStudy || p.url ? (
                    <div className="flex flex-wrap gap-4 text-sm">
                      {caseStudy ? (
                        <Link
                          href={caseStudy}
                          className="text-ink-700 underline decoration-ink-200 underline-offset-4 hover:text-ink-900 hover:decoration-ink-400"
                        >
                          Read the case study →
                        </Link>
                      ) : null}
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-ink-700 underline decoration-ink-200 underline-offset-4 hover:text-ink-900 hover:decoration-ink-400"
                        >
                          Live <ExternalLink aria-hidden className="h-3 w-3 print:hidden" />
                        </a>
                      ) : null}
                    </div>
                  ) : undefined;
                return (
                  <li key={entry.id}>
                    <TimelineEntry
                      id={entry.id}
                      title={p.name}
                      org={p.type}
                      start={p.startDate}
                      end={p.endDate}
                      summary={p.description}
                      highlights={p.highlights}
                      keywords={p.keywords ?? []}
                      expanded={isExpanded(entry.id)}
                      onToggle={toggle}
                      query={query}
                      activeSkill={activeSkill}
                      onSkillClick={toggleSkill}
                      footer={footer}
                    />
                  </li>
                );
              })}
            </ol>
          ) : (
            <Empty what="projects" />
          )}
        </section>

        {/* Skills */}
        <section id="skills" aria-labelledby="skills-heading" className={sectionCls}>
          <SectionHeading id="skills">Skills</SectionHeading>
          <div className="mt-6">
            <SkillsChart skills={resume.skills} query={query} />
          </div>
        </section>

        {/* Education */}
        <section id="education" aria-labelledby="education-heading" className={sectionCls}>
          <SectionHeading id="education">Education</SectionHeading>
          <ul className="mt-6 space-y-4">
            {resume.education.map((e) => (
              <li key={`${e.institution}-${e.startDate}`} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-tight text-ink-900">
                    {e.studyType} {e.area}
                  </h3>
                  <p className="text-sm text-ink-600">
                    {formatMonth(e.startDate)} — {formatMonth(e.endDate)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-ink-600">
                  {e.url ? (
                    <a href={e.url} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                      {e.institution}
                    </a>
                  ) : (
                    e.institution
                  )}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
                {e.score ? <p className="mt-3 text-sm font-medium text-ink-900">{e.score}</p> : null}
                {e.courses?.length ? (
                  <p className="mt-2 text-sm text-ink-700">Coursework: {e.courses.join(", ")}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        {/* Awards */}
        {resume.awards.length ? (
          <section id="awards" aria-labelledby="awards-heading" className={sectionCls}>
            <SectionHeading id="awards">Honors & Awards</SectionHeading>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {resume.awards.map((a) => (
                <li key={`${a.title}-${a.date}`} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold tracking-tight text-ink-900">{a.title}</h3>
                    <p className="text-sm text-ink-600">{formatMonth(a.date)}</p>
                  </div>
                  <p className="mt-1 text-sm text-ink-600">{a.awarder}</p>
                  {a.summary ? <p className="mt-3 text-sm text-ink-700">{a.summary}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Certificates */}
        {resume.certificates.length ? (
          <section id="certificates" aria-labelledby="certificates-heading" className={sectionCls}>
            <SectionHeading id="certificates">Certificates</SectionHeading>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              {resume.certificates.map((c) => (
                <li key={c.name}>
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noreferrer" className="font-medium text-ink-900 underline-offset-4 hover:underline">
                      {c.name}
                    </a>
                  ) : (
                    <span className="font-medium text-ink-900">{c.name}</span>
                  )}
                  {c.issuer ? ` · ${c.issuer}` : ""}
                  {c.date ? ` · ${formatMonth(c.date)}` : ""}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Publications */}
        {resume.publications.length ? (
          <section id="publications" aria-labelledby="publications-heading" className={sectionCls}>
            <SectionHeading id="publications">Publications</SectionHeading>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              {resume.publications.map((p) => (
                <li key={p.name}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer" className="font-medium text-ink-900 underline-offset-4 hover:underline">
                      {p.name}
                    </a>
                  ) : (
                    <span className="font-medium text-ink-900">{p.name}</span>
                  )}
                  {p.publisher ? ` · ${p.publisher}` : ""}
                  {p.releaseDate ? ` · ${formatMonth(p.releaseDate)}` : ""}
                  {p.summary ? <p className="mt-1">{p.summary}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Languages */}
        {resume.languages.length ? (
          <section id="languages" aria-labelledby="languages-heading" className={sectionCls}>
            <SectionHeading id="languages">Languages</SectionHeading>
            <ul className="mt-4 flex flex-wrap gap-3 text-sm text-ink-700">
              {resume.languages.map((l) => (
                <li key={l.language} className="rounded-full border border-ink-200 bg-white px-4 py-2">
                  <span className="font-medium text-ink-900">{l.language}</span> · {l.fluency}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Contact CTA */}
        <section aria-label="Get in touch" className="rounded-3xl border border-ink-200 bg-ink-50 p-7 print:hidden">
          <h2 className="text-xl font-semibold tracking-tight text-ink-950">Want the full picture?</h2>
          <p className="mt-2 max-w-xl text-sm text-ink-700">
            Download the PDF above, or reach out directly. Every message gets a reply.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${resume.basics.email}`}
              className="inline-flex items-center justify-center rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
            >
              Email {resume.basics.email}
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-900 transition hover:bg-ink-50"
            >
              Contact form
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
