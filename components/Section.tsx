import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";

export function Section({
  id,
  title,
  eyebrow,
  children,
  className,
}: {
  id?: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-16", className)}>
      <Container>
        <div className="mb-8">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-widest text-ink-500 uppercase">{eyebrow}</p>
          ) : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">{title}</h2>
        </div>
        {children}
      </Container>
    </section>
  );
}
