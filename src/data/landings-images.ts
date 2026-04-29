/**
 * Real section images per landing page, extracted from Webflow HTML
 * in Supabase webflow_pages (via scripts/migrate/parse-landings.py).
 *
 * Shape:
 *   { hero: string | null, sections: string[] }
 *
 * Used by landing route templates to override the mock placeholder
 * images in src/data/{produit,solutions,equipes,lp}.tsx.
 *
 * Regenerate: python3 scripts/migrate/parse-landings.py
 */

import rawData from "./landings-images.json";

export type LandingImagesEntry = {
  hero: string | null;
  sections: string[];
};

type LandingType = "produit" | "solution" | "equipe";

const DATA = rawData as Record<LandingType, Record<string, LandingImagesEntry>>;

export function getLandingImages(
  type: LandingType,
  slug: string,
): LandingImagesEntry {
  const byType = DATA[type] || {};
  const entry = byType[slug];
  if (!entry) return { hero: null, sections: [] };
  // For solutions where hero wasn't detected (Lottie animations),
  // use the first section image as the hero.
  if (!entry.hero && entry.sections.length > 0) {
    return {
      hero: entry.sections[0],
      sections: entry.sections.slice(1),
    };
  }
  return entry;
}
