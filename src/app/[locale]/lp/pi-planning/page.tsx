import type { Metadata } from "next";
import PiPlanningPage from "@/components/pages/PiPlanningPage";

export const metadata: Metadata = {
  title: "PI Planning : la vue business qui manque à Jira | AirSaas",
  description:
    "Synchronisez vos features Jira, nettoyez vos données, donnez une vue claire aux métiers et au Comex. Opérationnel en 1 PI, pas en 6 mois.",
};

export default function Page() {
  return <PiPlanningPage />;
}
