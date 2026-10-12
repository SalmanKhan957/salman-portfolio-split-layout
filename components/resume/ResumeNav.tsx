"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type NavSection = { id: string; label: string };

/** Sticky in-page navigation; highlights the section currently in view. */
export function ResumeNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      // A thin horizontal band just below the sticky header + nav.
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Resume sections"
      className="sticky top-20 z-30 -mx-5 border-b border-ink-100 bg-white/85 px-5 backdrop-blur print:hidden sm:-mx-7 sm:px-7"
    >
      <ul className="flex gap-1 overflow-x-auto py-2 text-sm">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block whitespace-nowrap rounded-full px-3 py-1.5 text-ink-600 transition hover:bg-ink-50 hover:text-ink-900",
                  isActive && "bg-ink-900 text-white hover:bg-ink-800 hover:text-white"
                )}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
