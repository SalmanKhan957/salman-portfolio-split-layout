import Link from "next/link";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group block rounded-2xl border border-ink-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ink-300"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-ink-900 group-hover:text-ink-900">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-ink-600">{project.oneLiner}</p>
        </div>
        <Badge className="shrink-0">{project.period}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Badge key={t} className="bg-ink-50">
            {t}
          </Badge>
        ))}
      </div>

      <p className="mt-4 text-sm font-medium text-ink-900">{project.proof}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((s) => (
          <span key={s} className="text-xs text-ink-500">
            {s}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm text-ink-700 group-hover:text-ink-900 transition">
        View case study →
      </p>
    </Link>
  );
}
