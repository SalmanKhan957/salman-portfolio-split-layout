# Salman Mubashir — Portfolio (Next.js + TypeScript + Tailwind)

Generated: 2026-03-05 (Asia/Karachi) · Resume page added: 2026-10-13

## Why this site works (for hiring)
- **Fast, minimal, readable** — whitespace and typography do the heavy lifting.
- **Projects-first** — case studies show engineering maturity (tradeoffs + next steps).
- **Interactive resume** — `/resume` is searchable, filterable, printable, and ships the PDF.
- **Easy updates** — edit JSON files under `content/` and you’re done.

---

## 1) Setup (local)

```bash
npm install
npm run dev
```

Open http://localhost:3000 (resume at http://localhost:3000/resume).

---

## 2) Content editing (data-driven)

| File | Drives |
| --- | --- |
| `content/resume.json` | **Single source of truth for CV data** (JSON Resume schema): basics, work, education, awards, skills, languages, projects. Feeds `/resume`, the home-page Experience / Education / Skills / Awards sections, and the Person JSON-LD. |
| `content/projects.json` | Case studies (`/projects/[slug]`). A resume project links to its case study when `projects[].slug` in `resume.json` matches a slug here. |
| `content/site.json` | Site name, role, location, SEO (`seo.siteUrl` is the canonical domain). |
| `content/socials.json` | Footer links. |
| `content/highlights.json` | Proof-strip badges on the hero. |

### `content/resume.json` notes
- Dates are `YYYY-MM`. `endDate: null` means **Present**.
- `skills[].score` (0–100) drives the radar chart and meters. These are self-assessed; omit `score` to drop a group from the chart.
- `work[].keywords` and `projects[].keywords` become the technology filter chips.
- `meta.privacy.showPhone` controls whether the phone number renders on the page (default `false`; the PDF still contains it).
- `meta.verify` lists fields that were inferred during extraction and should be double-checked.

### Replace the resume PDF
1. Overwrite `public/resume.pdf` (keep the filename).
2. Bump `meta.version` in `content/resume.json` (shown in the print footer).
3. Update the JSON sections to match the new PDF.

### Photos (split layout)
- Replace `public/dp.png` (Hero image) and `public/about.png` (About image). Keep filenames the same.

---

## 3) Resume page (`/resume`)
- **Sticky section nav** with active-section highlighting.
- **Keyword search** across roles, projects and skills, with `<mark>` highlighting and a live result count.
- **Technology filter chips** (click a chip on any entry or in the toolbar).
- **Collapsible timeline entries** — keyboard operable (`aria-expanded` / `aria-controls`); “Expand all / Collapse all”.
- **Skills radar + meters** — dependency-free SVG, with an sr-only data table.
- **Download CV (PDF)** and **Print / Save as PDF** (print CSS forces every entry open and strips site chrome).
- **Dark mode** toggle in the header; the choice persists in `localStorage` (`theme`) and otherwise follows the OS.

---

## 4) SEO
- Metadata: `app/layout.tsx`, `app/resume/page.tsx` (canonical, Open Graph, Twitter).
- Structured data: Person JSON-LD in `app/layout.tsx`; ProfilePage + Person (occupations, alumniOf, awards, knowsAbout) in `app/resume/page.tsx`.
- OpenGraph image: `app/og/route.tsx`
- Sitemap: `app/sitemap.ts` (includes `/resume`)
- Robots: `app/robots.ts`

**Important:** `content/site.json` → `seo.siteUrl` must match the real domain. It drives canonical URLs, the sitemap and JSON-LD ids.

---

## 5) Quality gates

```bash
npm run lint          # ESLint (next/core-web-vitals)
npx tsc --noEmit      # Type check
npm run build         # Production build (also type-checks)
```

Accessibility / performance (needs a browser; run against `npm run start`):

```bash
# Lighthouse (Chrome required)
npx lighthouse http://localhost:3000/resume --only-categories=accessibility,performance,seo,best-practices --view

# axe-core CLI (downloads a Chrome driver on first run)
npx @axe-core/cli http://localhost:3000/resume
```

### Checklist
- [ ] Hero headline says **what you build** (not a vague title).
- [ ] Proof strip has **real metrics**.
- [ ] Each project has **Problem → Solution → Results**.
- [ ] `content/resume.json` → `meta.verify` items reviewed.
- [ ] `npm run build` passes.
- [ ] Lighthouse: Performance **90+**, Accessibility **95+**, SEO **90+**.
- [ ] Keyboard navigation works end-to-end (skip link, nav, resume toggles, chips, theme toggle).
- [ ] Reduced motion respects OS preference.
- [ ] Print preview of `/resume` fits on two A4 pages.

---

## 6) Deploy

### Vercel (recommended — supports the `/api/contact` route and the edge `/og` image)
1. Push this repo to GitHub.
2. Import in Vercel (framework preset: Next.js; no extra settings).
3. Add environment variables: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. Set the domain and make sure `seo.siteUrl` matches it.

### Netlify
1. Build command `npm run build`, publish directory `.next`.
2. Netlify’s Next.js runtime is detected automatically (`@netlify/plugin-nextjs`); it serves the API route and the edge OG image.
3. Add the same three environment variables under Site settings → Environment variables.

### GitHub Pages
Not suitable without changes: this site has a server route (`/api/contact`) and an edge route (`/og`). To go fully static, remove those two routes, set `output: "export"` in `next.config.mjs`, replace the contact form with the `mailto:` link, and publish the `out/` folder.

---

## 7) Contact form
`components/ContactBlock.tsx` posts to `app/api/contact/route.ts`, which sends via Resend when `RESEND_API_KEY` is set. Without the key the API returns a clear error and the `mailto:` / WhatsApp / LinkedIn links still work. To use Formspree or a Netlify Function instead, point the `fetch("/api/contact")` call at the new endpoint; nothing else changes.

### Windows / ESM note
`package.json` has `"type": "module"`, so PostCSS config is `postcss.config.cjs`.
