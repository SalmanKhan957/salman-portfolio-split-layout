import { Badge } from "@/components/Badge";
import { HIGHLIGHTS } from "@/lib/content";

export function ProofStrip() {
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      {HIGHLIGHTS.map((p) => (
        <Badge key={p.label}>
          <span className="text-ink-900">{p.label}</span>
          <span className="ml-2 text-ink-500">• {p.note}</span>
        </Badge>
      ))}
    </div>
  );
}
