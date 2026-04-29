import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { LEGAL_BY_SLUG } from "@/data/legal-pages";

const SLUG = "mentions-legales";
const PAGE = LEGAL_BY_SLUG[SLUG];

export const metadata: Metadata = {
  title: `${PAGE.title} | AirSaas`,
  description:
    "Mentions légales AirSaas — éditeur, hébergeur, propriété intellectuelle.",
};

export default function MentionsLegalesRoute() {
  return <LegalPage page={PAGE} />;
}
