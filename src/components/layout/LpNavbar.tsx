import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function LpNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/fr" className="shrink-0">
            <Image
              src="/assets/logos/airsaas-logo.svg"
              alt="AirSaas"
              width={120}
              height={32}
              priority
            />
          </Link>

          <Link
            href="/fr/meetings-pages"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Réserver une démo &rarr;
          </Link>
        </nav>
      </Container>
    </header>
  );
}
