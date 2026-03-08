import { Container } from "@/components/Container";
import { SOCIALS, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 py-10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-600">
          © {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {SOCIALS.filter(s => s.href && !s.href.startsWith("NEEDED INPUT")).map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-ink-600 hover:text-ink-900">
              {s.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
