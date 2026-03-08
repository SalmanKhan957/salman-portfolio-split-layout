import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f8fafc",
          100: "#eef2f7",
          200: "#dbe3ee",
          300: "#b8c6d8",
          400: "#7f95b2",
          500: "#546d8f",
          600: "#3b4e69",
          700: "#2c3c52",
          800: "#1e2a3b",
          900: "#121a26",
          950: "#0b1018"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(17, 24, 39, 0.08)"
      }
    },
  },
  plugins: [],
} satisfies Config;
