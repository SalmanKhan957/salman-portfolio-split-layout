import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMonth(ym: string) {
  // ym: YYYY-MM
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  return d.toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}
