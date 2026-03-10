export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "FeatureBulletRow — Design Exploration",
  robots: { index: false, follow: false },
};

const SAMPLE = {
  badge: "PORTFOLIO",
  heading: "Centralisez tous vos projets",
  description: "Une vue unique pour piloter votre portefeuille de projets en temps réel.",
  bullets: ["Vue consolidée", "Indicateurs temps réel", "Alertes automatiques"],
  image: "/assets/images/Automation - integrations.webp",
  imageAlt: "Intégrations et automatisations AirSaaS",
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

/* ─── A — Current (baseline) ─── */
function VariantA() {
  return (
    <div className="py-12">
      <Container>
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="flex-1">
            <div className="mb-3 inline-block rounded-full bg-primary-10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">{SAMPLE.badge}</div>
            <h3 className="text-[1.5rem] font-semibold leading-[2rem]">{SAMPLE.heading}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">{SAMPLE.description}</p>
            <ul className="mt-5 space-y-3">
              {SAMPLE.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border shadow-sm">
              <Image src={SAMPLE.image} alt={SAMPLE.imageAlt} fill className="object-contain" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ─── B — Accent border + elevated image + bold bullets ─── */
function VariantB() {
  return (
    <div className="py-12">
      <Container>
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="flex-1">
            <div className="border-l-[3px] border-primary pl-6">
              <div className="mb-3 inline-block rounded-full bg-primary-10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">{SAMPLE.badge}</div>
              <h3 className="text-[1.75rem] font-bold leading-[2.25rem] text-foreground">{SAMPLE.heading}</h3>
              <p className="mt-4 text-[17px] leading-[27px] text-text-secondary">{SAMPLE.description}</p>
              <ul className="mt-6 space-y-3">
                {SAMPLE.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[15px] font-medium text-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
              <Image src={SAMPLE.image} alt={SAMPLE.imageAlt} fill className="object-contain" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ─── C — Card lavender + icon bullets ─── */
function VariantC() {
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-col items-center gap-12 rounded-2xl bg-bg-lavender p-8 md:flex-row md:p-12">
          <div className="flex-1">
            <div className="border-l-[3px] border-primary pl-6">
              <div className="mb-3 inline-block rounded-full bg-primary-10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">{SAMPLE.badge}</div>
              <h3 className="text-[1.75rem] font-bold leading-[2.25rem] text-foreground">{SAMPLE.heading}</h3>
              <p className="mt-4 text-[17px] leading-[27px] text-text-secondary">{SAMPLE.description}</p>
            </div>
            <ul className="mt-6 ml-6 space-y-2">
              {SAMPLE.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[15px] text-foreground">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/50 bg-white shadow-xl">
              <Image src={SAMPLE.image} alt={SAMPLE.imageAlt} fill className="object-contain" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ─── D — Bullet cards + no border left ─── */
function VariantD() {
  return (
    <div className="py-12">
      <Container>
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="flex-1">
            <div className="mb-3 inline-block rounded-full bg-primary-10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">{SAMPLE.badge}</div>
            <h3 className="text-[1.75rem] font-bold leading-[2.25rem] text-foreground">{SAMPLE.heading}</h3>
            <p className="mt-4 text-[17px] leading-[27px] text-text-secondary">{SAMPLE.description}</p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {SAMPLE.bullets.map((b) => (
                <div key={b} className="rounded-lg bg-bg-lavender p-4 text-center">
                  <span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">✓</span>
                  <span className="text-sm font-medium text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
              <Image src={SAMPLE.image} alt={SAMPLE.imageAlt} fill className="object-contain" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function FeatureBulletRowExplorePage() {
  return (
    <div>
      <div className="bg-foreground py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold">FeatureBulletRow — Design Exploration</h1>
          <p className="mt-2 text-white/70">4 variantes à comparer.</p>
        </Container>
      </div>

      <VariantLabel name="A — Current (baseline)" description="Badge + heading léger + petites coches vertes + image shadow faible" />
      <VariantA />

      <VariantLabel name="B — Accent border + bold bullets + elevated image" description="Trait bleu vertical, coches sur fond primary, image shadow-lg" />
      <VariantB />

      <VariantLabel name="C — Card lavender + dot bullets" description="Carte lavender englobante, dots primary, image elevated white" />
      <VariantC />

      <VariantLabel name="D — Bullet cards grid" description="Chaque bullet dans une mini-carte lavender, layout en grille" />
      <VariantD />
    </div>
  );
}
