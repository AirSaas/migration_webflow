export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { DesignSystemV2 } from "@/components/_legacy/design-system-v2/DesignSystemV2";

export const metadata: Metadata = {
  title: "Design System V2 — Design exploration (internal)",
  robots: { index: false, follow: false },
};

export default async function DesignSystemV2Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <DesignSystemV2 locale={locale} />;
}
