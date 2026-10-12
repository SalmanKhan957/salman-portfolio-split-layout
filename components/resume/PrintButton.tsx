"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-900 transition hover:bg-ink-50"
    >
      <Printer aria-hidden className="h-4 w-4" />
      Print / Save as PDF
    </button>
  );
}
