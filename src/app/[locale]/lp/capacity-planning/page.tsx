import type { Metadata } from "next";
import CapacityPlanningPage from "@/components/pages/CapacityPlanningPage";

export const metadata: Metadata = {
  title: "Capacity Planning simplifié | AirSaas",
  description:
    "Vos équipes sont surchargées ? AirSaas vous donne une vue capacitaire claire et actionnable. Quarter Plan, T-shirt sizing, scénarios IA. Opérationnel en 1 mois.",
};

export default function Page() {
  return <CapacityPlanningPage />;
}
