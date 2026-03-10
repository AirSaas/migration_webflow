export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "HowItWorks — Design Exploration",
  robots: { index: false, follow: false },
};

const STEPS = [
  { title: "Démo personnalisée", description: "30 min pour comprendre vos enjeux et vous montrer la plateforme en action." },
  { title: "Configuration", description: "On paramètre pour votre contexte : projets, équipes, workflows." },
  { title: "Déploiement", description: "Opérationnel en 2 semaines avec formation incluse." },
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
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-[2rem] font-semibold">Comment ça marche ?</h2>
          <p className="mt-3 text-[17px] text-text-secondary">Un déploiement en douceur, sans big bang.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">{i + 1}</div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── B — Cards with left accent + connector line ─── */
function VariantB() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary-10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">DÉPLOIEMENT</span>
          <h2 className="text-[2rem] font-bold">Comment ça marche ?</h2>
          <p className="mt-3 text-[17px] text-text-secondary">Un déploiement en douceur, sans big bang.</p>
        </div>
        <div className="mx-auto max-w-[800px] space-y-6">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">{i + 1}</div>
                {i < STEPS.length - 1 && <div className="mt-2 h-full w-0.5 bg-primary/20" />}
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── C — Horizontal cards with lavender bg ─── */
function VariantC() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-2xl bg-bg-lavender p-8 md:p-12">
          <div className="mb-10 text-center">
            <h2 className="text-[2rem] font-bold">3 étapes pour démarrer</h2>
            <p className="mt-3 text-[17px] text-text-secondary">Un déploiement en douceur, sans big bang.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{i + 1}</div>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── D — Bold numbers + accent border per card ─── */
function VariantD() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-[2rem] font-bold">Comment ça marche ?</h2>
          <p className="mt-3 text-[17px] text-text-secondary">Un déploiement en douceur, sans big bang.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="border-t-[3px] border-primary bg-bg-alt rounded-xl p-6">
              <span className="text-[2.5rem] font-extrabold text-primary/20">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function HowItWorksExplorePage() {
  return (
    <div>
      <div className="bg-foreground py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold">HowItWorks — Design Exploration</h1>
          <p className="mt-2 text-white/70">4 variantes à comparer.</p>
        </Container>
      </div>

      <VariantLabel name="A — Current (baseline)" description="Cercles numérotés primary, texte centré sous chaque cercle" />
      <VariantA />

      <VariantLabel name="B — Timeline verticale + carrés" description="Numéros carrés, connecteur vertical, layout en liste" />
      <VariantB />

      <VariantLabel name="C — Cards blanches sur fond lavender" description="Carte lavender englobante, steps dans des cartes blanches" />
      <VariantC />

      <VariantLabel name="D — Gros numéros + top border" description="Numéros XL transparents, bordure primary en haut, fond gris" />
      <VariantD />
    </div>
  );
}
