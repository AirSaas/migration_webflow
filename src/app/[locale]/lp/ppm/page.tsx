import type { Metadata } from "next";
import PpmPage from "@/components/pages/PpmPage";

export const metadata: Metadata = {
  title: "Outil PPM nouvelle génération | AirSaas",
  description:
    "Flash report en 1 clic, roadmap COMEX partageable, scénarios IA. Découvrez le PPM que vos équipes vont vraiment adopter.",
};

export default function Page() {
  return <PpmPage />;
}
