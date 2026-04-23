import type { Metadata } from "next";
import PiPlanningPage from "@/components/pages/PiPlanningPage";

export const metadata: Metadata = {
  title: "PI Planning : la vue business qui manque à Jira | AirSaas",
  description:
    "Miro + Jira + PowerBI, ce n'est pas comme ça qu'un RTE embarque les métiers. Synchronisez Jira, parlez enfin au Comex.",
};

export default function Page() {
  return <PiPlanningPage />;
}
