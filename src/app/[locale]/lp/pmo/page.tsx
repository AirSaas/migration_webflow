import type { Metadata } from "next";
import PmoToolPage from "@/components/pages/PmoToolPage";

export const metadata: Metadata = {
  title: "L'outil PPM pour un PMO moderne | AirSaas",
  description:
    "AirSaas c'est la solution la plus simple pour avoir une vue macro consolidée du portefeuille projet. Un PPM qui a enfin une UX au top.",
};

export default function Page() {
  return <PmoToolPage />;
}
