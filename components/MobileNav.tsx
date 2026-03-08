"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Awards", href: "/#awards" },
  { label: "Contact", href: "/#contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-full p-2 hover:bg-ink-50 transition"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-sm">
          <div className="mx-auto mt-4 w-full max-w-md rounded-2xl border border-ink-200 bg-white shadow-soft">
            <div className="flex items-center justify-between px-4 py-3 border-b border-ink-100">
              <p className="text-sm font-semibold">Menu</p>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-ink-50 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm text-ink-700 hover:bg-ink-50 hover:text-ink-900 transition"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
