import { Footer } from "@/components/library-design/sections/Footer";
import { BLOG_INDEX_DATA } from "@/data/blog";

/**
 * LandingShell
 *
 * @purpose    Shared chrome wrapper for bespoke landing pages.
 *             Wraps the page content with `<main>` + closing `<Footer>`.
 *             The Hero section (which hosts the Navbar) is composed inside
 *             children so each page controls its own hero variant
 *             (light/dark, eyebrow, halo, etc.).
 * @useWhen    Top-level wrapper of any bespoke landing page at
 *             `src/app/[locale]/{lp,produit,solutions,equipes}/{slug}/page.tsx`.
 *             1 per page.
 * @dontUse    For pages that aren't marketing landings (use the blog template
 *             or a custom layout). For embedded previews / Storybook stories
 *             (compose Footer / Hero directly).
 *
 * @forbidden
 *   - Do NOT pass className that overrides bg / min-h — the white background +
 *     min-h-screen are part of the contract.
 *   - Do NOT render multiple LandingShell per page (single root).
 *   - Do NOT hardcode footer columns inline — pull from `BLOG_INDEX_DATA`
 *     (single source of truth shared with blog).
 */

interface LandingShellProps {
  children: React.ReactNode;
}

const FOOTER_COPYRIGHT_ICON = (
  <span className="inline-flex items-center gap-[0.375rem]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/assets/icons/airsaas-icon.svg"
      alt=""
      aria-hidden="true"
      className="h-[1.25rem] w-auto"
    />
    <span aria-label="Français">🇫🇷</span>
  </span>
);

export function LandingShell({ children }: LandingShellProps) {
  // R45 audit Marisella : copyright with dynamic year.
  const year = new Date().getFullYear();
  const copyright = `© ${year} AirSaas — Made in France`;

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {children}
      <Footer
        columns={BLOG_INDEX_DATA.footerColumns}
        copyright={copyright}
        copyrightIcon={FOOTER_COPYRIGHT_ICON}
      />
    </main>
  );
}

/**
 * Shared navbar props — pass as `<Hero navItems={LANDING_NAV.items} ... />`.
 * Single source of truth for navigation across landings + blog.
 */
export const LANDING_NAV = {
  items: BLOG_INDEX_DATA.navItems,
  ctaLabel: BLOG_INDEX_DATA.navCtaLabel,
  ctaHref: BLOG_INDEX_DATA.navCtaHref,
  loginLabel: BLOG_INDEX_DATA.loginLabel,
  loginHref: BLOG_INDEX_DATA.loginHref,
} as const;
