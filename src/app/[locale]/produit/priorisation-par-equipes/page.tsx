import type { Metadata } from "next";
import PriorisationEquipesPage from "@/components/pages/PriorisationEquipesPage";

export const metadata: Metadata = {
  title: "Priorisation par équipes — AirSaas",
  description:
    "Chaque responsable priorise ses projets de 1 à 100. Fini les Top 1 à 5 projets. Alignez vos équipes et organisez la roadmap de façon éclairée.",
};

export default function Page() {
  return <PriorisationEquipesPage />;
}
