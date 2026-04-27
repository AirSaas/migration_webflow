import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageV2 from "@/components/pages/LandingPageV2";
import { PAGES, PAGES_BY_SLUG } from "@/data/landings-v2/produit";

type RouteParams = { locale: string; slug: string };

export function generateStaticParams() {
  return PAGES.map((p) => ({ locale: "fr", slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES_BY_SLUG[slug];
  if (!page) return {};
  return { title: page.meta.title, description: page.meta.description };
}

export default async function ProduitRoute({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const page = PAGES_BY_SLUG[slug];
  if (!page) notFound();
  return <LandingPageV2 page={page} />;
}
