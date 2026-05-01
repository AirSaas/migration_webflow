import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { LEGAL_BY_SLUG } from "@/data/legal-pages";

const SLUG = "cookies";
const PAGE = LEGAL_BY_SLUG[SLUG];

export const metadata: Metadata = {
  title: `${PAGE.title} | AirSaas`,
  description:
    "Politique de cookies AirSaas — types de cookies utilisés, finalités, durée de conservation et préférences utilisateur.",
};

export default function CookiesRoute() {
  return <LegalPage page={PAGE} />;
}
