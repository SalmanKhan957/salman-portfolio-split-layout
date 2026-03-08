import { formatMonth } from "@/lib/utils";
import type { Experience } from "@/lib/types";

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="space-y-6">
      {items.map((e) => (
        <div key={`${e.company}-${e.start}`} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-base font-semibold tracking-tight text-ink-900">
              {e.title} · {e.company}
            </h3>
            <p className="text-sm text-ink-600">
              {formatMonth(e.start)} — {e.end === "Present" ? "Present" : formatMonth(e.end)}
            </p>
          </div>
          <p className="mt-1 text-sm text-ink-600">{e.location}</p>

          <ul className="mt-4 space-y-2 text-sm text-ink-700">
            {e.highlights.map((h, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" aria-hidden />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {e.neededInput?.length ? (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-semibold tracking-widest text-amber-900 uppercase">Needed input</p>
              <ul className="mt-2 space-y-1 text-sm text-amber-900/90">
                {e.neededInput.map((n, idx) => (
                  <li key={idx}>• {n}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
