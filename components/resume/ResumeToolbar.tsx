"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

type Props = {
  query: string;
  onQuery: (q: string) => void;
  skills: string[];
  activeSkill: string | null;
  onSkill: (s: string | null) => void;
  resultCount: number;
  totalCount: number;
  onExpandAll: () => void;
  onCollapseAll: () => void;
};

const INITIAL_CHIPS = 14;

export function ResumeToolbar({
  query,
  onQuery,
  skills,
  activeSkill,
  onSkill,
  resultCount,
  totalCount,
  onExpandAll,
  onCollapseAll
}: Props) {
  const [showAll, setShowAll] = useState(false);
  const chips = showAll ? skills : skills.slice(0, INITIAL_CHIPS);
  const hiddenCount = skills.length - chips.length;
  const filtering = Boolean(query.trim() || activeSkill);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-4 shadow-soft print:hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search experience, projects and skills</span>
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search keywords, e.g. RAG, Shopify, Docker"
            autoComplete="off"
            className="h-11 w-full rounded-full border border-ink-200 bg-white pl-9 pr-10 text-sm text-ink-900 outline-none placeholder:text-ink-500 focus:border-ink-400"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition hover:bg-ink-50"
            >
              <X aria-hidden className="h-4 w-4 text-ink-600" />
            </button>
          ) : null}
        </label>

        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={onExpandAll}
            className="rounded-full border border-ink-200 bg-white px-3 py-2 text-ink-700 transition hover:bg-ink-50"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={onCollapseAll}
            className="rounded-full border border-ink-200 bg-white px-3 py-2 text-ink-700 transition hover:bg-ink-50"
          >
            Collapse all
          </button>
        </div>
      </div>

      <div className="mt-4">
        <p id="skill-filter-label" className="text-xs font-semibold tracking-widest text-ink-500 uppercase">
          Filter by technology
        </p>
        <div role="group" aria-labelledby="skill-filter-label" className="mt-2 flex flex-wrap gap-2">
          <button type="button" aria-pressed={activeSkill === null} onClick={() => onSkill(null)} className="rounded-full">
            <Badge className={cn(activeSkill === null && "border-ink-900 bg-ink-900 text-white")}>All</Badge>
          </button>
          {chips.map((s) => {
            const on = activeSkill === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => onSkill(on ? null : s)}
                className="rounded-full"
              >
                <Badge className={cn(on && "border-ink-900 bg-ink-900 text-white")}>{s}</Badge>
              </button>
            );
          })}
          {hiddenCount > 0 || showAll ? (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="rounded-full px-2.5 py-1 text-xs font-medium text-ink-600 underline-offset-4 hover:text-ink-900 hover:underline"
            >
              {showAll ? "Show fewer" : `+${hiddenCount} more`}
            </button>
          ) : null}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-3 text-xs text-ink-500">
        {filtering ? `Showing ${resultCount} of ${totalCount} entries` : `${totalCount} entries`}
        {activeSkill ? ` · filtered by ${activeSkill}` : ""}
      </p>
    </div>
  );
}
