import Link from "next/link";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/Button";

export function Header() {
  return (
    <header className="sticky top-50 z-50 border-b border-ink-100 bg-white/80 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <MobileNav />
          <Link href="/#home" className="text-sm font-semibold tracking-tight text-ink-900">
            Salman<span className="text-ink-500"> Mubashir.</span>
          </Link>
        </div>

        <Nav />

        <div className="flex items-center gap-2">
          <Button href="/#contact" variant="primary" className="inline-flex">
            Contact
          </Button>
        </div>
      </Container>
    </header>
  );
}
