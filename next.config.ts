import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "uploads-ssl.webflow.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  async redirects() {
    return [
      // =============================================
      // Webflow legacy → rebuild paths
      // (catches internal links inside parsed Webflow content + external
      //  inbound traffic from the old site structure)
      // =============================================
      {
        // Webflow had a slug `rapport-flash` that the rebuild renamed to
        // `flash-report-projet`. Override the generic /fr/solution/:slug
        // catch-all for this specific slug.
        source: "/fr/solution/rapport-flash",
        destination: "/fr/solutions/flash-report-projet",
        permanent: true,
      },
      {
        // Webflow used /fr/solution/X (singular). Rebuild lives under
        // /fr/solutions/X (plural) — fixes ~280 internal nav links.
        source: "/fr/solution/:slug",
        destination: "/fr/solutions/:slug",
        permanent: true,
      },
      {
        // Webflow blog articles lived at /gestion-de-projet/{slug} (no
        // locale prefix). Rebuild canonical is /fr/blog/{slug}.
        source: "/gestion-de-projet/:slug",
        destination: "/fr/blog/:slug",
        permanent: true,
      },
      {
        // Some inline links use the locale-prefixed legacy form.
        source: "/fr/gestion-de-projet/:slug",
        destination: "/fr/blog/:slug",
        permanent: true,
      },
      {
        // Empty blog category (podcast hub) → main articles index until
        // dedicated category page is rebuilt in Phase 7.
        source: "/fr/blog/podcast",
        destination: "/fr/blog/articles",
        permanent: true,
      },
      {
        // Same for nouveautes category.
        source: "/fr/blog/nouveautes",
        destination: "/fr/blog/articles",
        permanent: true,
      },
      {
        // Live site canonical is /fr/legal/cookies — match it here so
        // inbound links from old footers continue to work.
        source: "/fr/cookies",
        destination: "/fr/legal/cookies",
        permanent: true,
      },
      {
        // /fr/conditions and /fr/confidentialite were never live but are
        // referenced from footers in the parsed content. Redirect them to
        // mentions-legales (canonical legal hub) until dedicated pages ship.
        source: "/fr/conditions",
        destination: "/fr/mentions-legales",
        permanent: true,
      },
      {
        source: "/fr/confidentialite",
        destination: "/fr/mentions-legales",
        permanent: true,
      },
      {
        // /fr/alternative/sciforma was referenced from nav but never had a
        // live page. Redirect to the main PPM landing until a proper
        // comparison page ships.
        source: "/fr/alternative/sciforma",
        destination: "/fr/lp/ppm",
        permanent: true,
      },
      {
        source: "/fr/alternative/planview",
        destination: "/fr/lp/ppm",
        permanent: true,
      },

      // =============================================
      // Blog URL cleanup (supprimer les -2 et -3)
      // =============================================
      { source: "/blog-2", destination: "/blog", permanent: true },
      {
        source: "/blog-3/les-articles",
        destination: "/blog/articles",
        permanent: true,
      },
      {
        source: "/blog-3/cio-revolution",
        destination: "/blog/cio-revolution",
        permanent: true,
      },
      {
        source: "/blog-3/good-morning-cio",
        destination: "/blog/good-morning-cio",
        permanent: true,
      },

      // =============================================
      // Collections supprimées → home
      // =============================================
      { source: "/startups/:slug", destination: "/", permanent: true },
      { source: "/eti-pme/:slug", destination: "/", permanent: true },
      { source: "/jobs/:path*", destination: "/", permanent: true },
      { source: "/startup-category/:slug", destination: "/", permanent: true },
      { source: "/categories-jobs/:slug", destination: "/", permanent: true },
      { source: "/tribune-ceo/:slug", destination: "/", permanent: true },
      { source: "/tribune-ceo-en/:slug", destination: "/", permanent: true },
      { source: "/sujets/:slug", destination: "/", permanent: true },
      {
        source: "/podcasts-categories/:slug",
        destination: "/",
        permanent: true,
      },
      { source: "/quotes/:slug", destination: "/", permanent: true },
      { source: "/post/:slug", destination: "/", permanent: true },
      {
        source: "/thomass-newsletters/:slug",
        destination: "/",
        permanent: true,
      },

      // =============================================
      // Speakers → podcast hub (data only, pas de pages)
      // =============================================
      {
        source: "/podcasts-speakers/:slug",
        destination: "/blog/cio-revolution",
        permanent: true,
      },

      // =============================================
      // Pages statiques legacy → home
      // =============================================
      { source: "/scouting-on-demand", destination: "/", permanent: true },
      {
        source: "/innovation-veille-technologique",
        destination: "/",
        permanent: true,
      },
      {
        source: "/transformation-digitale-solutions",
        destination: "/",
        permanent: true,
      },
      { source: "/nextwebinar", destination: "/", permanent: true },
      { source: "/nextwebinar-ok", destination: "/", permanent: true },
      { source: "/dsi-form", destination: "/", permanent: true },
      { source: "/transfo-quotes", destination: "/", permanent: true },
      { source: "/strategic", destination: "/", permanent: true },
      {
        source: "/workshop-manifeste-gouvernance",
        destination: "/",
        permanent: true,
      },
      {
        source: "/workshop-manifeste-gouvernance-ok",
        destination: "/",
        permanent: true,
      },
      {
        source: "/workshop-manifeste-gouvernance-copy2",
        destination: "/",
        permanent: true,
      },
      { source: "/workshops", destination: "/", permanent: true },
      { source: "/startup", destination: "/", permanent: true },
      { source: "/jobs", destination: "/", permanent: true },
      {
        source: "/secteur/facility-management",
        destination: "/",
        permanent: true,
      },
      {
        source: "/secteur/industrie-transformation-digitale",
        destination: "/",
        permanent: true,
      },
      {
        source: "/secteur/logistique-transformation-digitale",
        destination: "/",
        permanent: true,
      },
      {
        source: "/secteur/retail-retech-transformation-digitale",
        destination: "/",
        permanent: true,
      },
      {
        source: "/secteur/proptech-smarbuilding",
        destination: "/",
        permanent: true,
      },
      {
        source: "/secteur/par-ou-commencer",
        destination: "/",
        permanent: true,
      },

      // =============================================
      // Événements → hubs
      // =============================================
      {
        source: "/ceo-diner-landing",
        destination: "/ceo-dinner",
        permanent: true,
      },
      {
        source: "/ceo-dinner/ceo-diner-landing-1st",
        destination: "/ceo-dinner/edition-1",
        permanent: true,
      },
      {
        source: "/ceo-dinner/ceo-diner-landing-2nd",
        destination: "/ceo-dinner/edition-2",
        permanent: true,
      },
      {
        source: "/ceo-dinner/ceo-diner-landing-3rd",
        destination: "/ceo-dinner/edition-3",
        permanent: true,
      },
      {
        source: "/bootcamp-airsaas-expert",
        destination: "/bootcamp",
        permanent: true,
      },
      {
        source: "/bootcamp-airsaas-expert-:slug",
        destination: "/bootcamp",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
