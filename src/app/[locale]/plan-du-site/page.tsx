import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { LEGAL_BY_SLUG } from "@/data/legal-pages";

const SLUG = "plan-du-site";
const PAGE = LEGAL_BY_SLUG[SLUG];

export const metadata: Metadata = {
  title: `${PAGE.title} | AirSaas`,
  description:
    "Plan du site AirSaas — accédez à toutes les pages : solutions, équipes, intégrations, blog.",
};

export default function PlanDuSiteRoute() {
  return (
    <LegalPage
      page={PAGE}
      subtitle="Toutes les pages d'AirSaas, organisées par grand thème."
    />
  );
}
