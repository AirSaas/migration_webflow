import type { Metadata } from "next";

interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: { url: string };
}

export function buildMetadata(seo: SeoData | undefined, defaults: { title: string; description: string }): Metadata {
  return {
    title: seo?.metaTitle || defaults.title,
    description: seo?.metaDescription || defaults.description,
    openGraph: seo?.ogImage
      ? { images: [{ url: seo.ogImage.url }] }
      : undefined,
  };
}
