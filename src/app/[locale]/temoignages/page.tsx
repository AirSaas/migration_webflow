import type { Metadata } from "next";
import Link from "next/link";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Footer } from "@/components/library-design/sections/Footer";
import { TESTIMONIALS_HUB } from "@/data/testimonials-hub";
import { BLOG_INDEX_DATA } from "@/data/blog";

export const metadata: Metadata = {
  title: "Témoignages clients | AirSaas",
  description:
    "Découvrez comment des DSI, PMO et directions de la transformation utilisent AirSaas pour piloter leurs portefeuilles projets et programmes de transformation.",
};

export default function TemoignagesRoute() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <section className="flex flex-col items-center gap-[1.5rem] px-[1.5rem] pt-[5rem] pb-[3rem] md:px-[3rem] md:pt-[6rem] lg:px-[10rem] lg:pt-[7rem]">
        <div className="flex flex-col items-center gap-[1rem] text-center max-w-[60rem]">
          <Heading level={1} align="center">
            Témoignages clients
          </Heading>
          <Text size="md" align="center" maxWidth="50rem">
            Comment des DSI, PMO et directions de la transformation utilisent
            AirSaas pour structurer leur pilotage portefeuille projets et
            transformer leurs organisations.
          </Text>
        </div>
      </section>

      <section className="flex flex-col items-center gap-[2rem] px-[1.5rem] pb-[5rem] md:px-[3rem] md:pb-[6.25rem] lg:px-[10rem]">
        <div className="grid grid-cols-1 gap-[1.5rem] md:grid-cols-2 lg:grid-cols-3 max-w-[91.25rem] w-full">
          {TESTIMONIALS_HUB.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="flex flex-col gap-[0.75rem] rounded-[1rem] border border-border bg-white p-[1.5rem] hover:border-primary hover:shadow-md transition-all"
            >
              {card.context ? (
                <Text size="sm" className="text-text-muted">
                  {card.context}
                </Text>
              ) : null}
              <Heading level={4} align="left">
                {card.title}
              </Heading>
            </Link>
          ))}
        </div>
      </section>

      <Footer
        columns={BLOG_INDEX_DATA.footerColumns}
        copyright={BLOG_INDEX_DATA.copyright}
      />
    </main>
  );
}
