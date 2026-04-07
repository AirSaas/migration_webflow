import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AirSaas — Capacity Planning simplifié",
  description:
    "AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire non avec des données, pas au feeling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
