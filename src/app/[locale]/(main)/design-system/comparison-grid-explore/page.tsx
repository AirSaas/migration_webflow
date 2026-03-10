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

/* ─── B1 — White cards + subtle borders + refined icons ─── */
function VariantB1() {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full bg-primary-10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">AVANT / APRÈS</span>
          <h2 className="text-[2rem] font-bold leading-[2.5rem]">
            Ce qui change avec <span className="text-primary">AirSaas</span>
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-crimson/10 text-sm font-bold text-crimson">✗</span>
              <h3 className="text-lg font-bold text-foreground">Sans AirSaas</h3>
            </div>
            <div className="space-y-4">
              {ROWS.map((row, i) => (
                <div key={i} className="flex items-start gap-3 border-l-2 border-crimson/20 pl-4">
                  <p className="text-[15px] leading-relaxed text-text-secondary">{row.left}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary-5 p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">✓</span>
              <h3 className="text-lg font-bold text-primary">Avec AirSaas</h3>
            </div>
            <div className="space-y-4">
              {ROWS.map((row, i) => (
                <div key={i} className="flex items-start gap-3 border-l-2 border-primary/30 pl-4">
                  <p className="text-[15px] font-medium leading-relaxed text-foreground">{row.right}</p>
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

/* ─── B2 — Lavender wrapper + white inner cards + matched rows ─── */
function VariantB2() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-2xl bg-bg-lavender p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-[2rem] font-bold leading-[2.5rem]">
              Avant / Après <span className="text-primary">AirSaas</span>
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-wider text-text-secondary">Sans AirSaas</h3>
              <div className="space-y-3">
                {ROWS.map((row, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg bg-crimson/5 p-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson/15 text-[10px] font-bold text-crimson">✗</span>
                    <p className="text-[15px] leading-relaxed text-foreground">{row.left}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-wider text-primary">Avec AirSaas</h3>
              <div className="space-y-3">
                {ROWS.map((row, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg bg-primary-5 p-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">✓</span>
                    <p className="text-sm font-medium leading-relaxed text-foreground">{row.right}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button href="#">Réservez une démo</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── B3 — Paired rows with arrow between ─── */
function VariantB3() {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full bg-primary-10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">TRANSFORMATION</span>
          <h2 className="text-[2rem] font-bold leading-[2.5rem]">
            Ce qui change avec AirSaas
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-[900px] space-y-4">
          {ROWS.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/10 text-[10px] font-bold text-crimson">✗</span>
                <p className="text-sm leading-relaxed text-text-secondary">{row.left}</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">→</div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">✓</span>
                <p className="text-sm font-medium leading-relaxed text-foreground">{row.right}</p>
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

/* ─── B4 — Asymmetric: small left (pain) + large right (solution) ─── */
function VariantB4() {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-[2rem] font-bold leading-[2.5rem]">
            Nos clients ne peuvent plus s&apos;en passer
          </h2>
          <p className="mt-3 text-[17px] text-text-secondary">Découvrez la différence AirSaas au quotidien.</p>
        </div>
        <div className="mx-auto mt-10 max-w-[900px] space-y-4">
          {ROWS.map((row, i) => (
            <div key={i} className="flex flex-col gap-0 overflow-hidden rounded-xl border border-border md:flex-row">
              <div className="flex items-center gap-3 bg-bg-alt px-5 py-4 md:w-[40%]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/10 text-[10px] font-bold text-crimson">✗</span>
                <p className="text-sm text-text-secondary line-through decoration-crimson/30">{row.left}</p>
              </div>
              <div className="flex items-center gap-3 bg-white px-5 py-4 md:w-[60%]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">✓</span>
                <p className="text-[15px] font-semibold text-foreground">{row.right}</p>
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

export default function ComparisonGridExplorePage() {
  return (
    <div>
      <div className="bg-foreground py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold">ComparisonGrid — Design Exploration</h1>
          <p className="mt-2 text-white/70">4 variations du concept &quot;cards côte à côte&quot;.</p>
        </Container>
      </div>

      <VariantLabel name="B1 — Clean cards + accent borders" description="Cartes blanches, bordure gauche colorée, badge, côté AirSaas en primary-5" />
      <VariantB1 />

      <VariantLabel name="B2 — Lavender wrapper + inner cards" description="Fond lavender, cartes blanches avec items en petites barres colorées" />
      <VariantB2 />

      <VariantLabel name="B3 — Paired rows + arrow" description="Chaque paire dans une carte, flèche primary entre avant et après" />
      <VariantB3 />

      <VariantLabel name="B4 — Asymmetric rows" description="Avant barré à gauche (40%), après bold à droite (60%), fond différencié" />
      <VariantB4 />
    </div>
  );
}
