import { formatMonth } from "@/lib/utils";
import type { Experience } from "@/lib/types";

type EducationItem = {
  institution: string;
  program: string;
  location?: string;
  start: string;
  end: string;
};

function Range(start: string, end: string) {
  const left = formatMonth(start);
  const right = end === "Present" ? "Present" : formatMonth(end);
  return `${left} — ${right}`;
}

export function InlineExperience({ items }: { items: Experience[] }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-ink-500 uppercase">
        Experience :
      </p>

      <ul className="mt-4 space-y-4 text-sm text-ink-900">
        {items.map((e) => (
          <li key={`${e.company}-${e.start}`} className="flex gap-3">
            <span className="mt-2 h-2.5 w-2.5 rounded-sm bg-ink-900" aria-hidden />
            <div className="leading-relaxed">
              <div>
                <span className="font-semibold">{e.company}</span>: {e.title}.
              </div>
              <div className="text-ink-500">
                ({Range(e.start, e.end)})
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InlineEducation({ items }: { items: EducationItem[] }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-ink-500 uppercase">
        Education :
      </p>

      <ul className="mt-4 space-y-4 text-sm text-ink-900">
        {items.map((e) => (
          <li key={`${e.institution}-${e.start}`} className="flex gap-3">
            <span className="mt-2 h-2.5 w-2.5 rounded-sm bg-ink-900" aria-hidden />
            <div className="leading-relaxed">
              <div>
                <span className="font-semibold">{e.program}</span>
              </div>
              <div className="text-ink-700">
                {e.institution}
              </div>
              <div className="text-ink-500">
                ({Range(e.start, e.end)})
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}