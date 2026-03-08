"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { ResumeModal } from "@/components/ResumeModal";

type Ctx = { openResume: () => void };

const ResumeGateContext = createContext<Ctx | null>(null);

export function ResumeGateProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({ openResume: () => setOpen(true) }),
    []
  );

  return (
    <ResumeGateContext.Provider value={value}>
      {children}
      <ResumeModal open={open} onClose={() => setOpen(false)} />
    </ResumeGateContext.Provider>
  );
}

export function useResumeGate() {
  const ctx = useContext(ResumeGateContext);
  if (!ctx) throw new Error("useResumeGate must be used inside ResumeGateProvider");
  return ctx;
}