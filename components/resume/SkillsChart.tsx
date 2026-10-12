"use client";

import { useEffect, useState } from "react";
import type { ResumeSkill } from "@/lib/types";
import { Highlight } from "@/components/resume/Highlight";

/** Greedy word wrap for SVG labels. */
function wrapLabel(name: string, max = 13): string[] {
  const lines: string[] = [];
  let cur = "";
  for (const word of name.split(" ")) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = word;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

const W = 460;
const H = 340;
const CX = W / 2;
const CY = H / 2;
const R = 105;

/**
 * Dependency-free radar chart + animated proficiency bars.
 * Only skills with a numeric `score` appear on the radar; every skill group
 * is listed with its keywords. A visually hidden table carries the data for
 * assistive technology.
 */
export function SkillsChart({ skills, query }: { skills: ResumeSkill[]; query: string }) {
  const rated = skills.filter((s) => typeof s.score === "number");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const n = rated.length;
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i: number, ratio: number) => ({
    x: CX + R * ratio * Math.cos(angle(i)),
    y: CY + R * ratio * Math.sin(angle(i))
  });
  const ring = (ratio: number) =>
    rated
      .map((_, i) => {
        const p = pt(i, ratio);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(" ");
  const polygon = rated
    .map((s, i) => {
      const p = pt(i, (s.score ?? 0) / 100);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");

  const summary = rated.map((s) => `${s.name} ${s.score}%`).join(", ");

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
      {n >= 3 ? (
        <figure className="mx-auto w-full max-w-md">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Skill radar chart: ${summary}`} className="h-auto w-full">
            {[0.25, 0.5, 0.75, 1].map((rr) => (
              <polygon key={rr} points={ring(rr)} className="fill-none stroke-ink-200" strokeWidth={1} />
            ))}
            {rated.map((s, i) => {
              const p = pt(i, 1);
              return <line key={s.name} x1={CX} y1={CY} x2={p.x} y2={p.y} className="stroke-ink-200" strokeWidth={1} />;
            })}

            <g
              style={{
                transformOrigin: `${CX}px ${CY}px`,
                transform: mounted ? "scale(1)" : "scale(0)",
                transition: "transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)"
              }}
            >
              <polygon points={polygon} className="fill-ink-900/15 stroke-ink-900" strokeWidth={2} strokeLinejoin="round" />
              {rated.map((s, i) => {
                const p = pt(i, (s.score ?? 0) / 100);
                return <circle key={s.name} cx={p.x} cy={p.y} r={3.5} className="fill-ink-900" />;
              })}
            </g>

            {rated.map((s, i) => {
              const p = pt(i, 1.2);
              const cos = Math.cos(angle(i));
              const anchor = Math.abs(cos) < 0.25 ? "middle" : cos > 0 ? "start" : "end";
              const lines = wrapLabel(s.name);
              return (
                <text
                  key={s.name}
                  x={p.x}
                  y={p.y}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  className="fill-ink-700 text-[11px] font-medium"
                >
                  {lines.map((line, li) => (
                    <tspan key={li} x={p.x} dy={li === 0 ? `${-(lines.length - 1) * 0.6}em` : "1.2em"}>
                      {line}
                    </tspan>
                  ))}
                </text>
              );
            })}
          </svg>
          <figcaption className="mt-1 text-center text-xs text-ink-500">Self-assessed proficiency by area</figcaption>
        </figure>
      ) : null}

      <div className="space-y-5">
        {skills.map((s) => (
          <div key={s.name} className="break-inside-avoid">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold text-ink-900">
                <Highlight text={s.name} query={query} />
              </h3>
              {s.level ? (
                <span className="text-xs text-ink-500">
                  {s.level}
                  {typeof s.score === "number" ? ` · ${s.score}%` : ""}
                </span>
              ) : null}
            </div>
            {typeof s.score === "number" ? (
              <div
                role="meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={s.score}
                aria-label={`${s.name} proficiency`}
                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-100"
              >
                <div
                  className="h-full rounded-full bg-ink-900 transition-[width] duration-700 ease-out print:!w-[var(--w)]"
                  style={{ width: mounted ? `${s.score}%` : "0%", ["--w" as string]: `${s.score}%` }}
                />
              </div>
            ) : null}
            <p className="mt-2 text-sm text-ink-700">
              <Highlight text={s.keywords.join(" · ")} query={query} />
            </p>
          </div>
        ))}
      </div>

      <table className="sr-only">
        <caption>Skill proficiency (self-assessed)</caption>
        <thead>
          <tr>
            <th scope="col">Area</th>
            <th scope="col">Level</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {rated.map((s) => (
            <tr key={s.name}>
              <th scope="row">{s.name}</th>
              <td>{s.level ?? "—"}</td>
              <td>{s.score}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
