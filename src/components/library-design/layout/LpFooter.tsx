import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { assertMaxLength } from "@/lib/ds-validators";

/**
 * LpFooter
 *
 * @purpose    Minimal footer used on landing-page routes (/lp/*) — single-
 *             line layout with copyright link on the left, logo centered,
 *             and a "Made with love in [country]" tagline on the right.
 *             Lighter than the main site <Footer> (no multi-column menu,
 *             no newsletter) because LPs optimize for conversion.
 * @useWhen    At the bottom of any /lp/* route, via the LP layout:
 *               `src/app/[locale]/(lp)/layout.tsx`.
 * @dontUse    On marketing pages (HomePage, Produit, Solution, Équipes) —
 *             those use <Footer> with the full multi-column navigation.
 *
 * @limits
 *   - logoAlt: required
 *   - copyrightText: required, max 100 chars (locale-driven)
 *   - madeWithText: required, max 40 chars (locale-driven)
 *
 * @forbidden
 *   - Do NOT hardcode copyright / made-with strings in French — pass via next-intl
 *   - Do NOT pass className with bg / border overrides
 */

interface LpFooterProps {
  /** Logo image URL. Default "/assets/logos/airsaas-logo.svg". */
  logoSrc?: string;
  /** Required alt text for the logo. */
  logoAlt: string;
  /** Logo click destination. Default "/". */
  logoHref?: string;
  /** Copyright text — locale-driven. */
  copyrightText: string;
  /** Copyright link destination (e.g. mentions légales page). Default "#". */
  copyrightHref?: string;
  /** "Made with love in [country]" text — locale-driven. */
  madeWithText: string;
  /** Optional flag icon (ReactNode — SVG / emoji / next/image) shown after the made-with text. */
  localeFlag?: ReactNode;
  className?: string;
}

export function LpFooter({
  logoSrc = "/assets/logos/airsaas-logo.svg",
  logoAlt,
  logoHref = "/",
  copyrightText,
  copyrightHref = "#",
  madeWithText,
  localeFlag,
  className,
}: LpFooterProps) {
  assertMaxLength("LpFooter", "copyrightText", copyrightText, 100);
  assertMaxLength("LpFooter", "madeWithText", madeWithText, 40);

  return (
    <footer
      className={
        className ??
        "border-t border-secondary-10 bg-white py-[1.5rem]"
      }
    >
      <div className="mx-auto flex max-w-[91rem] flex-col items-center justify-between gap-[1rem] px-[1.5rem] md:px-[3rem] lg:px-[5rem] sm:flex-row">
        <Link
          href={copyrightHref}
          className="text-sm text-text-secondary transition-colors hover:text-primary hover:underline"
        >
          {copyrightText}
        </Link>

        <Link href={logoHref} className="shrink-0">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={100}
            height={28}
          />
        </Link>

        <div className="flex items-center gap-[0.5rem] text-sm text-text-secondary">
          <span>{madeWithText}</span>
          {localeFlag}
        </div>
      </div>
    </footer>
  );
}
