import type { Metadata } from "next";
import { PROJECTS, SITE } from "@/lib/content";
import { Container } from "@/components/Container";
import { ProjectFilters } from "@/components/ProjectFilters";

export const metadata: Metadata = {
  title: "Projects",
  description: SITE.seo.description,
  alternates: { canonical: "/projects" }
};

export default function ProjectsPage() {
  return (
    <div className="py-14">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight text-ink-950">Projects</h1>
        <p className="mt-3 max-w-3xl text-sm text-ink-700">
          Case studies with a simple structure: <strong>problem → approach → impact</strong>.
        </p>
        <div className="mt-8">
          <ProjectFilters projects={PROJECTS} />
        </div>
      </Container>
    </div>
  );
}
