import Image from "next/image";
import Link from "next/link";
import { assertMaxLength } from "@/lib/ds-validators";

/**
 * LpNavbar
 *
 * @purpose    Minimal navbar used on landing-page routes (/lp/*) — logo on
 *             the left, single primary CTA on the right. Much lighter than
 *             the main site <Navbar> (no dropdowns, no multi-locale switcher)
 *             because LPs optimize for conversion, not navigation.
 * @useWhen    At the top of any /lp/* route, via the LP layout:
 *               `src/app/[locale]/(lp)/layout.tsx`.
 * @dontUse    On marketing pages (HomePage, Produit, Solution, Équipes) —
 *             those use <Navbar> with the full dropdown navigation.
 *
 * @limits
 *   - logoAlt: required, describes the company logo for screen readers
 *   - ctaLabel: required, max 30 chars (locale-driven via next-intl)
 *   - sticky at top by default — do not override z-index lightly
 *
 * @forbidden
 *   - Do NOT hardcode ctaLabel in French — pass via next-intl
 *   - Do NOT add menu / dropdown variants — that's what <Navbar> is for
 *   - Do NOT pass className with bg / border overrides
 */

interface LpNavbarProps {
  /** Logo image URL. Default "/assets/logos/airsaas-logo.svg". */
  logoSrc?: string;
  /** Required alt text for the logo. */
  logoAlt: string;
  /** Logo click destination. Default "/". */
  logoHref?: string;
  /** CTA button label — locale-driven, required (no default). */
  ctaLabel: string;
  /** CTA destination. Default "#". */
  ctaHref?: string;
  className?: string;
}

export function LpNavbar({
  logoSrc = "/assets/logos/airsaas-logo.svg",
  logoAlt,
  logoHref = "/",
  ctaLabel,
  ctaHref = "#",
  className,
}: LpNavbarProps) {
  assertMaxLength("LpNavbar", "ctaLabel", ctaLabel, 30);

  return (
    <header
      className={
        className ??
        "sticky top-0 z-50 border-b border-secondary-10 bg-white"
      }
    >
      <div className="mx-auto flex h-[4rem] max-w-[91rem] items-center justify-between px-[1.5rem] md:px-[3rem] lg:px-[5rem]">
        <Link href={logoHref} className="shrink-0">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={120}
            height={32}
            priority
          />
        </Link>

        <Link
          href={ctaHref}
          className="rounded-full bg-primary px-[1.5rem] py-[0.625rem] text-sm font-bold text-white transition-colors hover:bg-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}
