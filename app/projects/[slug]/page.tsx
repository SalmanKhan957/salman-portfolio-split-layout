import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, SITE } from "@/lib/content";
import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.oneLiner,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: `${p.title} — ${SITE.name}`,
      description: p.oneLiner,
      url: `/projects/${p.slug}`,
      images: [{ url: "/og", width: 1200, height: 630, alt: `${p.title} — case study` }]
    }
  };
}

function NeededInput({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <p className="text-xs font-semibold tracking-widest text-amber-900 uppercase">Needed input</p>
      <ul className="mt-2 space-y-1 text-sm text-amber-900/90">
        {items.map((i, idx) => (
          <li key={idx}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectPage({ params }: { params: Params }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return notFound();

  const cs = p.caseStudy;

  return (
    <div className="py-14">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-ink-600 uppercase">Case study</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink-950">{p.title}</h1>
            <p className="mt-2 text-sm text-ink-700">{p.oneLiner}</p>
          </div>
          <Badge>{p.period}</Badge>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Badge key={t} className="bg-ink-50">{t}</Badge>
          ))}
        </div>

        <div className="mt-10 grid gap-8">
          <section>
            <h2 className="text-xl font-semibold text-ink-950">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">{cs.overview}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-950">Problem</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">{cs.problem}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-950">Solution</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">{cs.solution}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-950">Architecture</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              {cs.architecture.map((a, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" aria-hidden />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-950">Tech stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {cs.techStack.map((s) => (
                <Badge key={s} className="bg-ink-50">{s}</Badge>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-950">Key engineering decisions</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              {cs.keyDecisions.map((d, idx) => (
                <li key={idx}>• {d}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-950">Results</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              {cs.results.map((r, idx) => (
                <li key={idx}>• {r}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-950">Links</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {cs.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href.startsWith("NEEDED INPUT") ? "#" : l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-ink-700 hover:text-ink-900 underline underline-offset-4 decoration-ink-200 hover:decoration-ink-400"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-950">What I’d improve next</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              {cs.improveNext.map((x, idx) => (
                <li key={idx}>• {x}</li>
              ))}
            </ul>
          </section>

          <NeededInput items={cs.neededInput} />

          <div className="pt-6">
            <Link className="text-sm text-ink-700 hover:text-ink-900 underline underline-offset-4" href="/#projects">
              ← Back to projects
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
