import type { Metadata } from "next";
import PpmPage from "@/components/pages/PpmPage";

export const metadata: Metadata = {
  title: "PPM nouvelle génération | AirSaas",
  description:
    "Un PPM avec une UX au top ? Ça existe. Brief projet assisté par IA, flash report en 1 clic, roadmap partageable, vue macro consolidée. L'outil PPM que votre équipe va vraiment adopter.",
};

export default function Page() {
  return <PpmPage />;
}
