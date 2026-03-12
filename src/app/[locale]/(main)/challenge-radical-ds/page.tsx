export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { ChallengeRadicalDesignSystem } from "@/components/challenge-ds/ChallengeRadicalDesignSystem";

export const metadata: Metadata = {
  title: "Challenge Radical DS — Design exploration (internal)",
  robots: { index: false, follow: false },
};

export default async function ChallengeRadicalDesignSystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ChallengeRadicalDesignSystem locale={locale} />;
}
