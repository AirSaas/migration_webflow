export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "BenefitsGrid — Design Exploration",
  robots: { index: false, follow: false },
};

const ITEMS = [
  { title: "Simplicité", description: "Prise en main en 30 minutes, sans formation complexe." },
  { title: "Visibilité", description: "Dashboard temps réel pour le COMEX et les équipes." },
  { title: "Alignement", description: "DSI et métiers sur la même page, enfin." },
  { title: "ROI", description: "Résultats mesurables en 3 mois." },
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
        <div className="mb-12 text-center">
          <h2 className="text-[2rem] font-bold leading-[2.5rem]">Pourquoi nous choisir ?</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.title} className="rounded-[10px] border border-border bg-white p-6">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── B — Icon top + accent border left ─── */
function VariantB() {
  const icons = ["⚡", "👁", "🤝", "📈"];
  return (
    <section className="py-16">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-[2rem] font-bold leading-[2.5rem]">Pourquoi nous choisir ?</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <div key={item.title} className="border-l-[3px] border-primary bg-bg-alt rounded-r-xl p-6">
              <span className="text-2xl">{icons[i]}</span>
              <h3 className="mt-3 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── C — Lavender bg + white cards + primary number ─── */
function VariantC() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-2xl bg-bg-lavender p-8 md:p-12">
          <div className="mb-10 text-center">
            <h2 className="text-[2rem] font-bold leading-[2.5rem]">Pourquoi nous choisir ?</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ITEMS.map((item, i) => (
              <div key={item.title} className="rounded-xl bg-white p-6 shadow-sm">
                <span className="text-[2rem] font-extrabold text-primary/20">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── D — Centered icon circle + minimal ─── */
function VariantD() {
  const icons = ["⚡", "👁", "🤝", "📈"];
  return (
    <section className="py-16">
      <Container>
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary-10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">AVANTAGES</span>
          <h2 className="text-[2rem] font-bold leading-[2.5rem]">Pourquoi nous choisir ?</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-10 text-2xl">
                {icons[i]}
              </div>
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function BenefitsGridExplorePage() {
  return (
    <div>
      <div className="bg-foreground py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold">BenefitsGrid — Design Exploration</h1>
          <p className="mt-2 text-white/70">4 variantes à comparer.</p>
        </Container>
      </div>

      <VariantLabel name="A — Current (baseline)" description="Cartes blanches simples avec bordure, texte à gauche" />
      <VariantA />

      <VariantLabel name="B — Accent border left + emoji + fond gris" description="Barre primary à gauche, emoji en icône, fond bg-alt" />
      <VariantB />

      <VariantLabel name="C — Card lavender + numéros XL" description="Fond lavender englobant, cartes blanches, grands numéros transparents" />
      <VariantC />

      <VariantLabel name="D — Icônes centrées + badge" description="Badge en haut, icônes dans des carrés arrondis primary-10, centré" />
      <VariantD />
    </div>
  );
}
