import type { Metadata } from "next";
import CapacityPlanningProduitPage from "@/components/pages/CapacityPlanningProduitPage";

export const metadata: Metadata = {
  title: "Capacity planning — Pouvons-nous vraiment faire ces projets ?",
  description:
    "La vue Capacitaire d'AirSaas : une discussion pragmatique pour savoir si vous êtes capable de faire les projets prévus, par équipe et par trimestre.",
};

export default function Page() {
  return <CapacityPlanningProduitPage />;
}
