import { SITE, PROJECTS, EXPERIENCE, AWARDS, SKILLS, EDUCATION } from "@/lib/content";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ProofStrip } from "@/components/ProofStrip";
import { ImageCard } from "@/components/ImageCard";
import { InlineEducation, InlineExperience } from "@/components/InlineLists";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/Motion";
import { Timeline } from "@/components/Timeline";
import { EducationList } from "@/components/EducationList";
import { ContactBlock } from "@/components/ContactBlock";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroActions } from "@/components/HeroActions";

export default function Page() {
  return (
    <div>
      <section id="home" className="border-b border-ink-100 bg-gradient-to-b from-white to-ink-50/40 py-16 sm:py-20">
  <Container>
    <FadeIn>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
            {SITE.name.split(" ")[0]}
            <br />
            {SITE.name.split(" ").slice(1).join(" ")}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700">
            <span className="font-semibold text-ink-900">AI Engineer</span> — I turn data into intelligent products that ship, scale, and create measurable impact.
          </p>

          <div className="mt-10 flex items-center gap-3">
            <a
              href="/#about"
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm text-ink-700 shadow-sm hover:bg-ink-50 transition"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-ink-900 text-white">↓</span>
              Scroll Down
            </a>
          </div>

          <ProofStrip />

          <HeroActions />


        </div>

        <div className="flex justify-center md:justify-end">
          <ImageCard
            src={SITE.images?.hero ?? "/headshot.png"}
            alt={`${SITE.name} headshot`}
            priority
          />
        </div>
      </div>
    </FadeIn>
  </Container>
</section>

      
      
      <Section id="about" eyebrow="About" title="About Me.">
  <div className="grid gap-10 md:grid-cols-2 md:items-start">
    <div className="flex justify-center md:justify-start">
      <ImageCard
        src={SITE.images?.about ?? SITE.images?.hero ?? "/about.png"}
        alt={`${SITE.name} portrait`}
      />
    </div>

    <div className="space-y-6">
      <div className="max-w-xl space-y-4 text-sm leading-relaxed text-ink-700">
      <p>
        I build <strong>intelligent systems</strong> across <strong>Computer Vision</strong> and <strong>NLP</strong>, and I’m comfortable owning the full path from{" "}
        <strong>data → model → API → product</strong>.
      </p>
      <p>
        I bring <strong>2 years of AI development</strong> experience and a portfolio of shipped work across AI systems,
        automation pipelines and applications. Outside of engineering, I reset through{" "}
        <strong>travelling</strong> and <strong>sports</strong>.
      </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <InlineExperience items={EXPERIENCE} />
        <InlineEducation items={EDUCATION} />
      </div>


    </div>
  </div>
</Section>

      <Section id="projects"
 eyebrow="Work" title="Projects (case studies)">
        <FadeIn>
          <p className="mb-6 max-w-3xl text-sm text-ink-700">
            Each case study is structured:
            <strong> problem → approach → impact</strong>, with <strong>tradeoffs</strong> and <strong>next improvements</strong>.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </FadeIn>
      </Section>

      
      <Section id="skills" eyebrow="Toolbox" title="Skills & tooling">
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(SKILLS).map(([k, items]) => (
            <div key={k} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
              <h3 className="text-sm font-semibold text-ink-900">{k.toUpperCase()}</h3>
              <p className="mt-2 text-sm text-ink-700">{items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="awards" eyebrow="Recognition" title="Awards">
        <div className="grid gap-4">
          {AWARDS.map((a) => (
            <div key={a.title} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-ink-900">{a.title}</h3>
                <p className="text-sm text-ink-600">{a.date}</p>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-ink-700">
                {a.details.map((d, idx) => (
                  <li key={idx}>• {d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Next step" title="Contact">
        <ContactBlock />
      </Section>
    </div>
  );
}
