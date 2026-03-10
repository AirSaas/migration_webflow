export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "FeatureRow — Design Exploration",
  robots: { index: false, follow: false },
};

const SAMPLE = {
  heading: "Partagez simplement les roadmaps à toute l'organisation",
  description:
    "Une roadmap, ça bouge, ça vit, c'est un élément clé pour aligner le top management en continu. Avec AirSaas, plus besoin de faire des PowerPoints à rallonge : l'information est centralisée, partageable et sympa à visualiser.",
  image: "/assets/images/Portfolio project timeline view.webp",
  imageAlt: "Portfolio timeline",
};

const SAMPLE_REVERSED = {
  heading: "Un capacity planning par équipe simple et actionnable",
  description:
    "Visualisez en un clin d'oeil si vous êtes dans les clous... ou dans les choux. Grâce à cette vue vous avez les bases d'une discussion pragmatique pour prendre les décisions.",
  image: "/assets/images/Capacity screen.webp",
  imageAlt: "Écran capacitaire par équipe",
};

function VariantLabel({ name, description }: { name: string; description: string }) {
  return (
    <div className="border-b-2 border-primary bg-primary/5 px-6 py-4">
      <Container>
        <code className="text-lg font-bold text-primary">{name}</code>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </Container>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VARIANT A — Current (baseline)
   Plain text on white, no visual weight
   ───────────────────────────────────────────── */
function VariantA({ reversed = false }: { reversed?: boolean }) {
  const data = reversed ? SAMPLE_REVERSED : SAMPLE;
  return (
    <section className="py-16">
      <Container>
        <div className={`flex items-center gap-16 ${reversed ? "flex-col-reverse md:flex-row-reverse" : "flex-col md:flex-row"}`}>
          <div className="flex-1">
            <h3 className="text-[1.5rem] font-semibold leading-[2rem]">{data.heading}</h3>
            <div className="mt-4 text-[17px] leading-[23px] text-text-secondary">{data.description}</div>
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px]">
              <Image src={data.image} alt={data.imageAlt} fill className="object-contain" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   VARIANT B — Card-style with subtle bg + shadow on image
   Text side has accent left border, image in elevated card
   ───────────────────────────────────────────── */
function VariantB({ reversed = false }: { reversed?: boolean }) {
  const data = reversed ? SAMPLE_REVERSED : SAMPLE;
  return (
    <section className={reversed ? "bg-bg-alt py-16" : "py-16"}>
      <Container>
        <div className={`flex items-center gap-12 ${reversed ? "flex-col-reverse md:flex-row-reverse" : "flex-col md:flex-row"}`}>
          <div className="flex-1">
            <div className="border-l-[3px] border-primary pl-6">
              <h3 className="text-[1.5rem] font-bold leading-[2rem] text-foreground">{data.heading}</h3>
              <p className="mt-4 text-[17px] leading-[27px] text-text-secondary">{data.description}</p>
            </div>
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
              <Image src={data.image} alt={data.imageAlt} fill className="object-contain" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   VARIANT C — Badge + bolder heading, image with gradient overlay
   More "landing page" feel with a colored badge above heading
   ───────────────────────────────────────────── */
function VariantC({ reversed = false }: { reversed?: boolean }) {
  const data = reversed ? SAMPLE_REVERSED : SAMPLE;
  const badge = reversed ? "CAPACITAIRE" : "ROADMAP";
  return (
    <section className="py-16">
      <Container>
        <div className={`flex items-center gap-12 ${reversed ? "flex-col-reverse md:flex-row-reverse" : "flex-col md:flex-row"}`}>
          <div className="flex-1">
            <span className="mb-3 inline-block rounded-full bg-primary-10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
              {badge}
            </span>
            <h3 className="text-[1.75rem] font-bold leading-[2.25rem] text-foreground">{data.heading}</h3>
            <p className="mt-4 text-[17px] leading-[27px] text-text-secondary">{data.description}</p>
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary-5 to-bg-alt p-4">
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-border shadow-md">
                <Image src={data.image} alt={data.imageAlt} fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   VARIANT D — Full-width card approach
   Entire row is a rounded card with bg, text is bolder,
   image sits inside with a subtle inset shadow
   ───────────────────────────────────────────── */
function VariantD({ reversed = false }: { reversed?: boolean }) {
  const data = reversed ? SAMPLE_REVERSED : SAMPLE;
  return (
    <section className="py-8">
      <Container>
        <div className={`flex items-center gap-12 rounded-2xl ${reversed ? "bg-bg-lavender" : "bg-bg-alt"} p-8 md:p-12 ${reversed ? "flex-col-reverse md:flex-row-reverse" : "flex-col md:flex-row"}`}>
          <div className="flex-1">
            <h3 className="text-[1.75rem] font-bold leading-[2.25rem] text-foreground">{data.heading}</h3>
            <p className="mt-4 text-[17px] leading-[27px] text-text-secondary">{data.description}</p>
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/50 bg-white shadow-xl">
              <Image src={data.image} alt={data.imageAlt} fill className="object-contain" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function FeatureRowExplorePage() {
  return (
    <div>
      <div className="bg-foreground py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold">FeatureRow — Design Exploration</h1>
          <p className="mt-2 text-white/70">4 variantes pour comparer. Chaque variante montre normal + reversed.</p>
        </Container>
      </div>

      <VariantLabel name="A — Current (baseline)" description="Texte simple gris, pas de background, pas de bordure sur l'image" />
      <VariantA />
      <VariantA reversed />

      <VariantLabel name="B — Accent border + elevated image" description="Barre verticale primary sur le texte, image dans une card avec shadow" />
      <VariantB />
      <VariantB reversed />

      <VariantLabel name="C — Badge + gradient frame" description="Badge coloré au-dessus du heading, image dans un cadre gradient subtle" />
      <VariantC />
      <VariantC reversed />

      <VariantLabel name="D — Full card container" description="Toute la row dans une card arrondie avec background, image en elevated white" />
      <VariantD />
      <VariantD reversed />
    </div>
  );
}
