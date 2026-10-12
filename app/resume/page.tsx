import type { Metadata } from "next";
import { RESUME, SITE, PROJECTS } from "@/lib/content";
import { isoDate } from "@/lib/resume";
import { Container } from "@/components/Container";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { ResumeView } from "@/components/resume/ResumeView";

const base = SITE.seo.siteUrl.replace(/\/$/, "");
const { basics, meta } = RESUME;
const description = `${basics.name} — ${basics.headline}. Interactive resume with experience, projects, skills, education and a downloadable PDF.`;

export const metadata: Metadata = {
  title: "Resume",
  description,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `Resume — ${basics.name}`,
    description,
    url: "/resume",
    type: "website",
    images: [{ url: "/og", width: 1200, height: 630, alt: `${basics.name} — Resume` }]
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume — ${basics.name}`,
    description,
    images: ["/og"]
  }
};

function buildJsonLd() {
  const uniq = <T,>(xs: T[]) => Array.from(new Set(xs));
  const person = {
    "@type": "Person",
    "@id": `${base}/#person`,
    name: basics.name,
    jobTitle: basics.label,
    description: basics.summary,
    email: `mailto:${basics.email}`,
    telephone: meta.privacy.showPhone ? basics.phone : undefined,
    url: base,
    image: SITE.images?.hero ? `${base}${SITE.images.hero}` : undefined,
    sameAs: basics.profiles.map((p) => p.url),
    address: {
      "@type": "PostalAddress",
      addressLocality: basics.location.city,
      addressCountry: basics.location.countryCode
    },
    worksFor: RESUME.work
      .filter((w) => !w.endDate)
      .map((w) => ({ "@type": "Organization", name: w.name, url: w.url || undefined })),
    hasOccupation: uniq(RESUME.work.map((w) => w.position)).map((name) => ({ "@type": "Occupation", name })),
    alumniOf: RESUME.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
      url: e.url || undefined
    })),
    hasCredential: RESUME.education.map((e) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: `${e.studyType} ${e.area}`,
      recognizedBy: { "@type": "EducationalOrganization", name: e.institution }
    })),
    award: RESUME.awards.map((a) => `${a.title} (${a.awarder})`),
    knowsAbout: uniq(RESUME.skills.flatMap((s) => s.keywords)),
    knowsLanguage: RESUME.languages.map((l) => l.language)
  };

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${base}/resume`,
    url: `${base}/resume`,
    name: `Resume — ${basics.name}`,
    description,
    dateModified: isoDate(meta.version),
    mainEntity: person,
    hasPart: {
      "@type": "DigitalDocument",
      name: `${basics.name} — CV (PDF)`,
      url: `${base}${meta.pdf}`,
      encodingFormat: "application/pdf"
    }
  };
}

export default function ResumePage() {
  const caseStudies = Object.fromEntries(PROJECTS.map((p) => [p.slug, p.title]));

  return (
    <div className="resume-print py-12 sm:py-14">
      <Container>
        <ResumeHeader basics={basics} meta={meta} siteUrl={base} />
        <ResumeView resume={RESUME} caseStudies={caseStudies} />
      </Container>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
    </div>
  );
}
