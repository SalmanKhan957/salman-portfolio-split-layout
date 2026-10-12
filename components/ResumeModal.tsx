"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Download } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

function isValidEmail(email: string) {
  // Practical validation (not RFC-perfect, but solid for gating).
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function ResumeModal({ open, onClose }: Props) {
  const [email, setEmail] = useState("");

  const valid = useMemo(() => isValidEmail(email), [email]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset when closed (keeps it clean)
  useEffect(() => {
    if (!open) setEmail("");
  }, [open]);

  if (!open) return null;

  const download = () => {
    if (!valid) return;

    // OPTIONAL: If you later add backend logging, call it here.
    // fetch("/api/resume-lead", { method: "POST", body: JSON.stringify({ email }) });

    window.open("/resume.pdf", "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* backdrop */}
      <button
        aria-label="Close resume modal"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Download Resume"
        className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-soft"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-ink-200 px-6 py-5">
          <h3 className="text-xl font-semibold text-ink-950">Download Resume</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-ink-50 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-ink-700" />
          </button>
        </div>

        {/* body */}
        <div className="px-6 py-6">
          <p className="text-sm text-ink-600">
            Enter your email to download my resume:
          </p>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="mt-4 h-12 w-full rounded-2xl border border-ink-200 bg-white px-4 text-sm text-ink-900 focus:border-ink-400 outline-none"
            inputMode="email"
            autoComplete="email"
          />

          {!email ? null : !valid ? (
            <p className="mt-2 text-xs text-red-600">
              Please enter a valid email address.
            </p>
          ) : (
            <p className="mt-2 text-xs text-ink-500">Looks good.</p>
          )}

          <button
            onClick={download}
            disabled={!valid}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-ink-950 px-5 text-sm font-semibold text-white hover:bg-ink-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Download Resume <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}