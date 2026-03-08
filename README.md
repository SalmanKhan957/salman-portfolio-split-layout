# Salman Mubashir — Portfolio (Next.js + TypeScript + Tailwind)

Generated: 2026-03-05 (Asia/Karachi)

## Why this site works (for hiring)
- **Fast, minimal, readable** — whitespace and typography do the heavy lifting.
- **Projects-first** — case studies show engineering maturity (tradeoffs + next steps).
- **Easy updates** — edit JSON files under `content/` and you’re done.

---

## 1) Setup (local)

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## 2) Content editing (data-driven)

Edit these files:

- `content/projects.json`
- `content/experience.json`
- `content/socials.json`
- `content/site.json`
- `content/skills.json`
- `content/awards.json`
- `content/education.json`
- `content/highlights.json`

### Replace resume
Replace `public/resume.pdf` with your actual resume (keep the same filename).

---

## 3) SEO
- Metadata: `app/layout.tsx`
- OpenGraph image: `app/og/route.tsx`
- Sitemap: `app/sitemap.ts`
- Robots: `app/robots.ts`

**Important:** Update `content/site.json` → `seo.siteUrl` to your real domain. This affects canonical URLs + sitemap.

---

## 4) Deploy (Vercel recommended)

1. Push this repo to GitHub
2. Import in Vercel
3. Set the domain
4. Ensure `seo.siteUrl` matches the domain
5. Done

---

## 5) Quality Gates (quick checklist)

### Content (recruiter conversion)
- [ ] Hero headline says **what you build** (not a vague title).
- [ ] Proof strip has **real metrics** (no “optimized” fluff).
- [ ] Each project has **Problem → Solution → Results**.
- [ ] Every “NEEDED INPUT” block is resolved or intentionally removed.

### Engineering
- [ ] `npm run build` passes.
- [ ] No layout shift (fonts + images stable).
- [ ] Lighthouse: Performance **90+**, Accessibility **95+**, SEO **90+**.

### Accessibility
- [ ] Keyboard navigation works end-to-end.
- [ ] Focus styles visible.
- [ ] Reduced motion respects OS preference.

---

## 6) Optional upgrades (if you want to go from good → ridiculous)
- Add a real contact form using a server action + email provider (Resend).
- Add “Now” page with what you’re learning + what you’re building.
- Add project screenshots and architecture diagrams (SVG) for faster comprehension.


### Windows / ESM note
If your `package.json` has `"type": "module"`, PostCSS config must be ESM (`export default`) or use `.cjs`. This project uses **postcss.config.cjs**.


## Photos (split layout)
- Replace **public/headshot.png** (Hero image)
- Replace **public/about.png** (About image)
Keep filenames the same for zero-code updates.
