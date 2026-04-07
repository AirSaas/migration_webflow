export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { ChallengeDesignSystem } from "@/components/_legacy/challenge-ds/ChallengeDesignSystem";

export const metadata: Metadata = {
  title: "Challenge DS — Design exploration (internal)",
  robots: { index: false, follow: false },
};

export default async function ChallengeDesignSystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ChallengeDesignSystem locale={locale} />;
}
