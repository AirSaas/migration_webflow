export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "FeatureNewsletter — Design Exploration",
  robots: { index: false, follow: false },
};

const FEATURES = [
  {
    title: "Tendance des projets vitaux",
    description:
      'Un récapitulatif de la santé des projets vitaux de votre organisation pour leur permettre de "sentir" la tendance du moment.',
  },
  {
    title: "Tendance de leurs projets à eux",
    description:
      "Un aperçu de leurs projets, ceux en amélioration et ceux en dégradation qui nécessitent leur attention. En un clic, ils peuvent accéder à la fiche projet.",
  },
  {
    title: "Projets en retard d'actualisation",
    description:
      "Un rappel des projets qui méritent d'être mis à jour. Si cette section est vide, vous êtes tranquilles !",
  },
];

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

/* ─── A — Current (baseline) ─── */
function VariantA() {
  return (
    <section className="bg-bg-alt py-20">
      <Container>
        <h3 className="text-center text-[1.5rem] font-medium leading-[2rem]">
          Une <strong className="font-bold">newsletter sponsor</strong> que votre direction va adorer
        </h3>
        <div className="mt-12 flex flex-col items-start gap-12 md:flex-row">
          <div className="relative flex-1">
            <div className="relative w-full overflow-hidden rounded-[10px] border border-border bg-white shadow-lg">
              <Image src="/assets/images/Copil -  Bilan-min.png" alt="Bilan de santé newsletter" width={600} height={500} className="h-auto w-full" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">&rarr;</div>
                <div>
                  <h4 className="text-[1rem] font-semibold">{feature.title}</h4>
                  <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── B — Card lavender + accent border sur features ─── */
function VariantB() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-2xl bg-bg-lavender p-8 md:p-12">
          <h3 className="text-[1.75rem] font-bold leading-[2.25rem]">
            Une <strong className="text-primary">newsletter sponsor</strong> que votre direction va adorer
          </h3>
          <div className="mt-10 flex flex-col items-start gap-12 md:flex-row">
            <div className="relative flex-1">
              <div className="relative w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
                <Image src="/assets/images/Copil -  Bilan-min.png" alt="Bilan de santé newsletter" width={600} height={500} className="h-auto w-full" />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-6">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="border-l-[3px] border-primary pl-5">
                  <h4 className="text-[1rem] font-bold">{feature.title}</h4>
                  <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── C — Numbered steps + elevated image, badge ─── */
function VariantC() {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full bg-primary-10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">NEWSLETTER</span>
          <h3 className="text-[1.75rem] font-bold leading-[2.25rem]">
            Une newsletter sponsor que votre direction va adorer
          </h3>
        </div>
        <div className="mt-10 flex flex-col items-start gap-12 md:flex-row">
          <div className="relative flex-1">
            <div className="relative w-full overflow-hidden rounded-xl border border-white/50 bg-white shadow-xl">
              <Image src="/assets/images/Copil -  Bilan-min.png" alt="Bilan de santé newsletter" width={600} height={500} className="h-auto w-full" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-8">
            {FEATURES.map((feature, i) => (
              <div key={feature.title} className="flex gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-[1rem] font-bold text-foreground">{feature.title}</h4>
                  <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── D — Full card bg-alt + icon accent + stronger hierarchy ─── */
function VariantD() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-2xl bg-bg-alt p-8 md:p-12">
          <div className="flex flex-col items-start gap-12 md:flex-row">
            <div className="relative flex-1">
              <div className="relative w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
                <Image src="/assets/images/Copil -  Bilan-min.png" alt="Bilan de santé newsletter" width={600} height={500} className="h-auto w-full" />
              </div>
            </div>
            <div className="flex-1">
              <span className="mb-3 inline-block rounded-full bg-primary-10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">NEWSLETTER SPONSOR</span>
              <h3 className="text-[1.75rem] font-bold leading-[2.25rem]">
                Votre direction va adorer
              </h3>
              <div className="mt-8 flex flex-col gap-5">
                {FEATURES.map((feature) => (
                  <div key={feature.title} className="rounded-xl bg-white p-5 shadow-sm">
                    <h4 className="text-[15px] font-bold text-foreground">{feature.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function FeatureNewsletterExplorePage() {
  return (
    <div>
      <div className="bg-foreground py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold">FeatureNewsletter — Design Exploration</h1>
          <p className="mt-2 text-white/70">4 variantes à comparer.</p>
        </Container>
      </div>

      <VariantLabel name="A — Current (baseline)" description="Fond gris, heading centré léger, icônes rondes flèches" />
      <VariantA />

      <VariantLabel name="B — Card lavender + accent border" description="Carte lavender englobante, heading bold, traits verticaux primary sur les features" />
      <VariantB />

      <VariantLabel name="C — Badge + numbered steps + elevated image" description="Badge centré, numéros carrés, image elevated avec shadow forte" />
      <VariantC />

      <VariantLabel name="D — Card bg-alt + feature cards" description="Carte grise, badge + heading à droite, features dans des mini-cartes blanches" />
      <VariantD />
    </div>
  );
}
