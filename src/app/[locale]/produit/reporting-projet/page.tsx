import type { Metadata } from "next";
import ReportingProjetPage from "@/components/pages/ReportingProjetPage";

export const metadata: Metadata = {
  title: "Reporting projet — Découvrez enfin le plaisir du reporting",
  description:
    "Un rapport flash homogène, généré en un clic et customisable. Exportez PowerPoint ou PDF aux couleurs de votre organisation, en multilingue via DeepL.",
};

export default function Page() {
  return <ReportingProjetPage />;
}
