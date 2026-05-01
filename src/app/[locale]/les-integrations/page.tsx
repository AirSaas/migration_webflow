import type { Metadata } from "next";
import MarketingStubPage from "@/components/pages/MarketingStubPage";
import { MARKETING_STUBS_BY_SLUG } from "@/data/marketing-stubs";

const STUB = MARKETING_STUBS_BY_SLUG["les-integrations"];

export const metadata: Metadata = {
  title: STUB.title,
  description: STUB.intro,
};

export default function Route() {
  return <MarketingStubPage stub={STUB} />;
}
