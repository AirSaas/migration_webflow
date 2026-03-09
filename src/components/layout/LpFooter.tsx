import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function LpFooter() {
  return (
    <footer className="border-t border-border bg-white py-6">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href="/fr/mentions-legales"
            className="text-sm text-text-secondary hover:underline"
          >
            &copy; 2025 AirSaas &middot; Mentions légales &middot; Confidentialité
          </Link>

          <Link href="/fr" className="shrink-0">
            <Image
              src="/assets/logos/airsaas-logo.svg"
              alt="AirSaas"
              width={100}
              height={28}
            />
          </Link>

          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>Made with love in France</span>
            <Image
              src="/assets/icons/flag-fr.svg"
              alt="France"
              width={20}
              height={14}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
