import type { Metadata } from "next";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Footer } from "@/components/library-design/sections/Footer";
import { BLOG_INDEX_DATA } from "@/data/blog";

export const metadata: Metadata = {
  title: "Réservez votre démo AirSaas",
  description:
    "Réservez une démo personnalisée d'AirSaas avec notre équipe — 30 minutes pour découvrir la solution et répondre à vos questions.",
};

const BENEFITS = [
  "Une démo personnalisée à votre contexte (DSI, PMO, transformation)",
  "30 minutes pour découvrir AirSaas en action sur des cas réels",
  "Une discussion franche sur vos enjeux portefeuille projet",
  "Pas d'engagement, pas de carte bancaire",
];

const BOOKING_URL = "https://www.airsaas.io/fr/meetings-pages";

export default function MeetingsPagesRoute() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <section className="flex flex-col items-center gap-[2rem] px-[1.5rem] pt-[5rem] pb-[5rem] md:px-[3rem] md:pt-[6rem] md:pb-[6.25rem] lg:px-[10rem]">
        <div className="flex flex-col items-center gap-[1.5rem] text-center max-w-[60rem]">
          <Heading level={1} align="center">
            Réservez votre démo
          </Heading>
          <Text size="lg" align="center" maxWidth="50rem">
            30 minutes avec notre équipe pour découvrir comment AirSaas peut
            structurer votre pilotage portefeuille projet — sans engagement.
          </Text>
        </div>

        <div className="flex flex-col gap-[1rem] max-w-[40rem] w-full bg-primary-2 rounded-[1rem] p-[2rem] md:p-[2.5rem]">
          <Heading level={3} align="left">
            Au programme
          </Heading>
          <ul className="flex flex-col gap-[0.75rem] list-none p-0 m-0">
            {BENEFITS.map((b, i) => (
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

        <div className="flex flex-col items-center gap-[1rem]">
          <a
            href={BOOKING_URL}
            className="inline-flex items-center justify-center px-[2rem] py-[1rem] bg-primary text-white font-semibold rounded-[0.5rem] hover:opacity-90 transition-opacity"
          >
            Réserver un créneau
          </a>
          <Text size="sm" align="center" className="text-text-muted">
            Vous serez redirigé vers notre calendrier de réservation.
          </Text>
        </div>
      </section>

      <Footer
        columns={BLOG_INDEX_DATA.footerColumns}
        copyright={BLOG_INDEX_DATA.copyright}
      />
    </main>
  );
}
