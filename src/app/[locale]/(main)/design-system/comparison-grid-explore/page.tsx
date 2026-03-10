export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "ComparisonGrid — Design Exploration",
  robots: { index: false, follow: false },
};

const ROWS = [
  { left: "Reporting manuel avec PowerPoint", right: "Reporting automatique en un clic" },
  { left: "Pilotage à l'aveugle", right: "Visibilité en temps réel" },
  { left: "Priorités floues et changeantes", right: "Priorisation objective et partagée" },
  { left: "Réunions interminables", right: "Points flash de 15 minutes" },
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
    <section className="py-20">
      <Container>
        <h2 className="text-center text-[2.5rem] font-semibold leading-[3rem]">
          Nos clients ne peuvent plus imaginer leurs vies sans <strong className="font-extrabold text-primary">AirSaas</strong>
        </h2>
        <div className="mt-12 overflow-hidden rounded-[10px] border border-border">
          <div className="grid grid-cols-2 border-b border-border bg-bg-alt">
            <div className="p-4 text-center font-semibold">Sans AirSaas</div>
            <div className="p-4 text-center font-semibold">Avec AirSaas</div>
          </div>
          {ROWS.map((row, i) => (
            <div key={i} className="grid grid-cols-2 border-b border-border last:border-b-0">
              <div className="flex items-start gap-3 border-r border-border p-5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/10 text-xs font-bold text-crimson">{i + 1}</span>
                <p className="text-[15px] leading-[22px]">{row.left}</p>
              </div>
              <div className="flex items-start gap-3 p-5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10 text-xs font-bold text-green">{i + 1}</span>
                <p className="text-[15px] leading-[22px]">{row.right}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="#">Réservez une démo</Button>
        </div>
      </Container>
    </section>
  );
}

/* ─── B — Cards side by side with icons ─── */
function VariantB() {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-center text-[2rem] font-bold leading-[2.5rem]">
          Avant / Après <span className="text-primary">AirSaas</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-crimson/20 bg-crimson/5 p-8">
            <h3 className="mb-6 text-center text-lg font-bold text-crimson">Sans AirSaas</h3>
            <div className="space-y-4">
              {ROWS.map((row, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/10 text-xs font-bold text-crimson">✗</span>
                  <p className="text-[15px] leading-relaxed text-foreground">{row.left}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-green/20 bg-green/5 p-8">
            <h3 className="mb-6 text-center text-lg font-bold text-green">Avec AirSaas</h3>
            <div className="space-y-4">
              {ROWS.map((row, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10 text-xs font-bold text-green">✓</span>
                  <p className="text-[15px] leading-relaxed text-foreground">{row.right}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button href="#">Réservez une démo</Button>
        </div>
      </Container>
    </section>
  );
}

/* ─── C — Alternating rows with strong color coding ─── */
function VariantC() {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-center text-[2rem] font-bold leading-[2.5rem]">
          Le changement en <span className="text-primary">un coup d&apos;oeil</span>
        </h2>
        <div className="mx-auto mt-12 max-w-[900px] space-y-4">
          {ROWS.map((row, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-border md:flex-row">
              <div className="flex flex-1 items-center gap-3 border-b border-border bg-crimson/5 p-5 md:border-b-0 md:border-r">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-crimson text-xs font-bold text-white">✗</span>
                <p className="text-[15px] text-foreground">{row.left}</p>
              </div>
              <div className="flex flex-1 items-center gap-3 bg-green/5 p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green text-xs font-bold text-white">✓</span>
                <p className="text-[15px] font-medium text-foreground">{row.right}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="#">Réservez une démo</Button>
        </div>
      </Container>
    </section>
  );
}

/* ─── D — Lavender card + arrow transition ─── */
function VariantD() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-2xl bg-bg-lavender p-8 md:p-12">
          <h2 className="text-center text-[2rem] font-bold leading-[2.5rem]">
            Nos clients ne peuvent plus s&apos;en passer
          </h2>
          <div className="mx-auto mt-10 max-w-[800px] space-y-5">
            {ROWS.map((row, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
                <span className="shrink-0 text-sm text-crimson line-through">{row.left}</span>
                <span className="shrink-0 text-xl text-primary">→</span>
                <span className="text-sm font-semibold text-foreground">{row.right}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="#">Réservez une démo</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function ComparisonGridExplorePage() {
  return (
    <div>
      <div className="bg-foreground py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold">ComparisonGrid — Design Exploration</h1>
          <p className="mt-2 text-white/70">4 variantes à comparer.</p>
        </Container>
      </div>

      <VariantLabel name="A — Current (baseline)" description="Tableau 2 colonnes, numéros rouge/vert, bordures fines" />
      <VariantA />

      <VariantLabel name="B — Cards côte à côte" description="Deux cartes colorées (rouge/vert) avec icônes ✗/✓" />
      <VariantB />

      <VariantLabel name="C — Rows alternées" description="Chaque ligne est une carte avec avant/après côte à côte, icônes carrées" />
      <VariantC />

      <VariantLabel name="D — Card lavender + barré → nouveau" description="Carte lavender, texte barré rouge → texte vert avec flèche" />
      <VariantD />
    </div>
  );
}
