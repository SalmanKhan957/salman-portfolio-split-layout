import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function Button({ href, children, variant = "primary", className, external, onClick }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none";
  const styles =
    variant === "primary"
      ? "bg-ink-900 text-white hover:bg-ink-800"
      : "border border-ink-200 bg-white text-ink-900 hover:bg-ink-50";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={cn(base, styles, className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={cn(base, styles, className)}>
      {children}
    </Link>
  );
}