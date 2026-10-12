import type { Config } from "tailwindcss";

/**
 * Colors resolve to CSS variables declared in app/globals.css so the whole
 * palette inverts under `.dark` without per-component dark: variants.
 * `<alpha-value>` keeps opacity modifiers (bg-white/80, border-ink-900/80) working.
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: v("surface"),
        ink: {
          50: v("ink-50"),
          100: v("ink-100"),
          200: v("ink-200"),
          300: v("ink-300"),
          400: v("ink-400"),
          500: v("ink-500"),
          600: v("ink-600"),
          700: v("ink-700"),
          800: v("ink-800"),
          900: v("ink-900"),
          950: v("ink-950")
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
