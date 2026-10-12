"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Highlight } from "@/components/resume/Highlight";
import { isoDate } from "@/lib/resume";
import { cn, formatMonth } from "@/lib/utils";

export type TimelineEntryProps = {
  id: string;
  title: string;
  org?: string;
  orgHref?: string;
  start: string; // YYYY-MM
  end: string | null; // null = Present
  location?: string;
  summary?: string;
  highlights: string[];
  keywords: string[];
  expanded: boolean;
  onToggle: (id: string) => void;
  query: string;
  activeSkill: string | null;
  onSkillClick: (k: string) => void;
  footer?: React.ReactNode;
};

/**
 * Collapsible timeline entry. The body stays in the DOM and collapses via a
 * grid-template-rows transition; `visibility: hidden` removes collapsed
 * content from the tab order and the accessibility tree. Print CSS forces
 * every entry open.
 */
export function TimelineEntry({
  id,
  title,
  org,
  orgHref,
  start,
  end,
  location,
  summary,
  highlights,
  keywords,
  expanded,
  onToggle,
  query,
  activeSkill,
  onSkillClick,
  footer
}: TimelineEntryProps) {
  const bodyId = `${id}-body`;

  return (
    <article id={id} className="relative break-inside-avoid rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
      {/* timeline dot */}
      <span aria-hidden className="absolute -left-[1.3rem] top-7 hidden h-3 w-3 rounded-full border-2 border-white bg-ink-900 sm:block" />

      <h3 className="text-base font-semibold tracking-tight text-ink-900">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={() => onToggle(id)}
          className="flex w-full items-start gap-2 rounded-lg text-left print:pointer-events-none"
        >
          <ChevronDown
            aria-hidden
            className={cn("mt-1 h-4 w-4 shrink-0 text-ink-500 transition-transform print:hidden", expanded && "rotate-180")}
          />
          <span>
            <Highlight text={title} query={query} />
          </span>
        </button>
      </h3>

      <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 pl-6 text-sm text-ink-600 print:pl-0">
        {org ? (
          orgHref ? (
            <a
              href={orgHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-ink-800 underline-offset-4 hover:underline"
            >
              <Highlight text={org} query={query} />
              <ExternalLink aria-hidden className="h-3 w-3 print:hidden" />
            </a>
          ) : (
            <span className="font-medium text-ink-800">
              <Highlight text={org} query={query} />
            </span>
          )
        ) : null}
        {org ? <span aria-hidden>·</span> : null}
        <span>
          <time dateTime={isoDate(start)}>{formatMonth(start)}</time>
          {" — "}
          {end ? <time dateTime={isoDate(end)}>{formatMonth(end)}</time> : <span>Present</span>}
        </span>
        {location ? (
          <>
            <span aria-hidden>·</span>
            <span>{location}</span>
          </>
        ) : null}
      </p>

      <div
        id={bodyId}
        className={cn(
          "resume-entry-body grid transition-[grid-template-rows] duration-300 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className={cn("min-h-0 overflow-hidden transition-[visibility] duration-300", expanded ? "visible" : "invisible")}>
          {summary ? (
            <p className="mt-3 pl-6 text-sm italic text-ink-600 print:pl-0">
              <Highlight text={summary} query={query} />
            </p>
          ) : null}

          <ul className="mt-3 space-y-2 pl-6 text-sm text-ink-700 print:pl-0">
            {highlights.map((h, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" aria-hidden />
                <span>
                  <Highlight text={h} query={query} />
                </span>
              </li>
            ))}
          </ul>

          {keywords.length ? (
            <ul className="mt-4 flex flex-wrap gap-2 pl-6 print:pl-0" aria-label="Technologies">
              {keywords.map((k) => {
                const on = activeSkill === k;
                return (
                  <li key={k}>
                    <button
                      type="button"
                      onClick={() => onSkillClick(k)}
                      aria-pressed={on}
                      title={on ? `Clear filter ${k}` : `Filter by ${k}`}
                      className="rounded-full print:pointer-events-none"
                    >
                      <Badge className={cn("bg-ink-50", on && "border-ink-900 bg-ink-900 text-white")}>
                        <Highlight text={k} query={query} />
                      </Badge>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {footer ? <div className="mt-4 pl-6 print:pl-0">{footer}</div> : null}
        </div>
      </div>
    </article>
  );
}
