import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700",
        className
      )}
    >
      {children}
    </span>
  );
}
