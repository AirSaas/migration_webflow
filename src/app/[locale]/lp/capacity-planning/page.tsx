import type { Metadata } from "next";
import CapacityPlanningPage from "@/components/pages/CapacityPlanningPage";

export const metadata: Metadata = {
  title: "Capacity planning | AirSaas — Enfin un outil simple et actionnable",
  description:
    'Un capacity planning macro par équipe et par trimestre. Dites "non" avec des données, pas au feeling. Opérationnel en 1 mois.',
};

export default function Page() {
  return <CapacityPlanningPage />;
}
