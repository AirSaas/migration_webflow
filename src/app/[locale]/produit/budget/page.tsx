import type { Metadata } from "next";
import BudgetPage from "@/components/pages/BudgetPage";

export const metadata: Metadata = {
  title: "Budget projet — Le suivi budgétaire avec AirSaas",
  description:
    "Le budget, c'est le GPS des projets du portfolio. Pilotez les dépenses planifiées, engagées et consommées, anticipez les atterrissages et partagez des vues consolidées avec le COMEX.",
};

export default function Page() {
  return <BudgetPage />;
}
