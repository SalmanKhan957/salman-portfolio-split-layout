"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { Badge } from "@/components/Badge";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.tags.includes(active));
  }, [active, projects]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className="rounded-full"
            aria-pressed={active === t}
          >
            <Badge className={active === t ? "border-ink-900 text-ink-900" : ""}>{t}</Badge>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
