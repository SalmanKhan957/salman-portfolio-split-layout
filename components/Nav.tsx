"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Awards", href: "/#awards" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
      {links.map((l) => {
        const isActive = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "rounded-full px-3 py-2 text-sm text-ink-600 hover:text-ink-900 hover:bg-ink-50 transition",
              isActive && "text-ink-900 bg-ink-50"
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
