import { formatMonth } from "@/lib/utils";

type EducationItem = {
  institution: string;
  program: string;
  location?: string;
  start: string;
  end: string;
  details: string[];
};

export function EducationList({ items }: { items: EducationItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((e) => (
        <div key={`${e.institution}-${e.start}`} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-base font-semibold tracking-tight text-ink-900">
              {e.program}
            </h3>
            <p className="text-sm text-ink-600">
              {String(e.start).includes("NEEDED INPUT") ? e.start : formatMonth(e.start)} —{" "}
              {String(e.end).includes("NEEDED INPUT") ? e.end : (e.end === "Present" ? "Present" : formatMonth(e.end))}
            </p>
          </div>
          <p className="mt-1 text-sm text-ink-600">{e.institution}{e.location ? ` · ${e.location}` : ""}</p>

          <ul className="mt-4 space-y-2 text-sm text-ink-700">
            {e.details.map((d, idx) => (
              <li key={idx}>• {d}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
