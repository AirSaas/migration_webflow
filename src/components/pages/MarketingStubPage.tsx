import Link from "next/link";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Footer } from "@/components/library-design/sections/Footer";
import { BLOG_INDEX_DATA } from "@/data/blog";
import type { MarketingStub } from "@/data/marketing-stubs";

/**
 * MarketingStubPage — minimal template for marketing landings not yet
 * rebuilt with full DS sections. Renders Hero (H1 + intro) + bullet
 * checklist + outbound CTA to the live page + a related rebuild link.
 *
 * Used by /fr/{les-integrations,les-nouveautes-produit,quarter-plan,
 * microsoft-teams-airsaas,pourquoi-airsaas}. Will be replaced by the
 * canonical Hero/FeatureFrame composition once each page is properly
 * rebuilt in Phase 7.4 follow-up.
 */
export default function MarketingStubPage({ stub }: { stub: MarketingStub }) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <section className="flex flex-col items-center gap-[2rem] px-[1.5rem] pt-[5rem] pb-[5rem] md:px-[3rem] md:pt-[6rem] md:pb-[6.25rem] lg:px-[10rem]">
        <div className="flex flex-col items-center gap-[1.5rem] text-center max-w-[60rem]">
          <Heading level={1} align="center">
            {stub.h1}
          </Heading>
          <Text size="lg" align="center" maxWidth="50rem">
            {stub.intro}
          </Text>
        </div>

        {stub.bullets && stub.bullets.length > 0 ? (
          <div className="flex flex-col gap-[1rem] max-w-[40rem] w-full bg-primary-2 rounded-[1rem] p-[2rem] md:p-[2.5rem]">
            <ul className="flex flex-col gap-[0.75rem] list-none p-0 m-0">
              {stub.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-[0.75rem]">
                  <span
                    aria-hidden="true"
                    className="mt-[0.4rem] inline-block w-[0.5rem] h-[0.5rem] rounded-full bg-primary shrink-0"
                  />
                  <Text size="md" align="left">
                    {b}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-col items-center gap-[1rem]">
          <a
            href={stub.liveUrl}
            className="inline-flex items-center justify-center px-[2rem] py-[1rem] bg-primary text-white font-semibold rounded-[0.5rem] hover:opacity-90 transition-opacity"
          >
            Voir la page complète sur airsaas.io
          </a>
          {stub.relatedHref ? (
            <Link
              href={stub.relatedHref}
              className="text-primary underline hover:opacity-80"
            >
              {stub.relatedLabel || "Découvrir AirSaas"} →
            </Link>
          ) : null}
        </div>
      </section>

      <Footer
        columns={BLOG_INDEX_DATA.footerColumns}
        copyright={BLOG_INDEX_DATA.copyright}
      />
    </main>
  );
}
