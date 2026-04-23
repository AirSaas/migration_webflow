import type { Metadata } from "next";
import TraductionOneClickPage from "@/components/pages/TraductionOneClickPage";

export const metadata: Metadata = {
  title: "Traduction one-click avec DeepL — Le rapport flash en multilingue",
  description:
    "Présenter vos projets dans les organisations multilingues, c'était un casse-tête. Traduction one-click intégrée avec DeepL dans AirSaas.",
};

export default function Page() {
  return <TraductionOneClickPage />;
}
