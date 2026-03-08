"use client";

import { Button } from "@/components/Button";
import { useResumeGate } from "@/components/ResumeGate";

export function HeroActions() {
  const { openResume } = useResumeGate();

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button
        href="#"
        variant="primary" // ✅ black button
        onClick={(e) => {
          e.preventDefault();
          openResume(); // ✅ opens modal
        }}
      >
        Download Resume
      </Button>
    </div>
  );
}