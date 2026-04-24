import { LpNavbar } from "@/components/library-design/layout/LpNavbar";
import { LpFooter } from "@/components/library-design/layout/LpFooter";

/**
 * Landing-page layout wrapper. Wraps every /lp/* route with the minimal
 * LpNavbar + LpFooter. Strings are hardcoded French here because all LPs
 * are FR-only for now; when a LP needs to support more locales, switch to
 * `useTranslations()` from next-intl.
 */
export default function LpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LpNavbar
        logoAlt="AirSaas"
        logoHref="/fr"
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />
      <main>{children}</main>
      <LpFooter
        logoAlt="AirSaas"
        logoHref="/fr"
        copyrightText="© 2025 AirSaas · Mentions légales · Confidentialité"
        copyrightHref="/fr/mentions-legales"
        madeWithText="Made with love in France"
        localeFlag={<span aria-label="France">🇫🇷</span>}
      />
    </>
  );
}
