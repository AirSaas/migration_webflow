import type { Metadata } from "next";
import AutomatiserComProjetPage from "@/components/pages/AutomatiserComProjetPage";

export const metadata: Metadata = {
  title: "Email bilan de santé — Automatisez la com projet",
  description:
    "Bien communiquer c'est 50% du succès. L'email bilan de santé partage juste le bon niveau d'information, automatiquement, une fois par semaine aux sponsors.",
};

export default function Page() {
  return <AutomatiserComProjetPage />;
}
