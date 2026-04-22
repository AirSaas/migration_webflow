"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const navItems = [
  { label: "Solutions", hasDropdown: true },
  { label: "Produit", hasDropdown: true },
  { label: "Ressources", hasDropdown: true },
  { label: "Témoignages", href: "#" },
  { label: "Intégrations", href: "#" },
  { label: "Nouveautés", href: "#" },
  { label: "Le Quarter Plan", href: "#" },
  { label: "Intégration teams", href: "#" },
];

const footerColumns = [
  {
    title: "Entreprise",
    links: [
      { label: "Pourquoi AirSaas ?" },
      { label: "Cookies" },
      { label: "Conditions d'utilisation" },
      { label: "Mentions légales" },
      { label: "Charte de confidentialité" },
      { label: "Kit média" },
      { label: "API AirSaas" },
      { label: "Plan du site" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Newsletter des DSI" },
      { label: "Newsletter des Pro. de la Transfo." },
      { label: "Le blog d'AirSaas" },
      { label: "Podcast CIO Révolution" },
      { label: "La conduite de projet" },
      { label: "Portfolio project Management" },
      { label: "Le comité de pilotage" },
      { label: "Témoignages clients" },
      { label: "Évènements" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Management de portefeuille projet" },
      { label: "Flash report automatisé" },
      { label: "Outil PPM" },
      { label: "Outil de pilotage projet" },
      { label: "Plan stratégique" },
      { label: "Portfolio management" },
      { label: "Revue de portefeuille" },
      { label: "Tableau de bord portefeuille de projet" },
      { label: "Tableau de bord DSI" },
    ],
  },
  {
    title: "Le Quarter Plan & les cadres méthodologiques",
    links: [
      { label: "AirSaas, le Quarter Plan et l'effectuation : piloter l'incertitude" },
    ],
    sections: [
      {
        title: "Alternative à",
        links: [
          { label: "Sciforma" },
          { label: "Planview Portfolio" },
        ],
      },
    ],
  },
];

const faqItems = [
  {
    question: "Comment je peux « forcer » un directeur à prioriser ?",
    answer:
      "C'est assez simple : si le projet n'a pas de priorisation, il n'apparait pas comme priorisé par le métier dans la roadmap. Ça aide :)",
  },
  {
    question:
      "Chaque directeur peut prioriser ses projets, mais comment priorise-t-on les projets en transverse ?",
    answer:
      "Pour pouvoir prioriser en transverse il faut trois choses. Que chaque responsable priorise ses besoins. Que la définition de ce qui est vital pour l'organisation soit partagée entre tous. D'un estimatif du temps homme et du gain potentiel de chaque projet. Cette fonctionnalité s'occupe du premier point.",
  },
  {
    question: "Si on repriorise en cours de route comment ça se passe ?",
    answer:
      "Pas de souci : tout est transparent. Vous pouvez reprioriser en expliquant à tout le monde les raisons.",
  },
];

/* ------------------------------------------------------------------ */
/*  Composition                                                        */
/* ------------------------------------------------------------------ */

export default function PriorisationEquipesPage() {
  return (
    <div className="w-full">
      {/* 1. Hero — dark variant (colored) */}
      <Hero
        variant="dark"
        navItems={navItems}
        navCtaLabel="Demander une démo"
        navCtaHref="#"
        loginLabel="Login"
        loginHref="#"
        topTag={{ label: "Priorisation par équipes", variant: "muted" }}
        title="La priorisation des projets,"
        titleHighlight="par équipe en demande"
        subtitle="Lorsqu'en Codir il faut prioriser les 125 projets du portfolio, c'est un peu dur de s'y retrouver. Tout le monde y va de ses projets « urgentissimes », et remplir la roadmap des prochains trimestres se fait finalement en fonction de celui qui parle le plus fort ou celui le plus copain avec le DG."
        primaryCta={{ label: "Je veux une démo", href: "#" }}
        imageSrc="/assets/images/priorisation-par-equipes/hero-prioritization-ppt.webp"
        imageAlt="Interface de priorisation AirSaas"
      />

      {/* 2. Main value proposition — stacked FeatureFrame */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          titleHighlight="La manière la plus simple"
          title="d'y voir clair"
          subtitle="Réduisez la complexité en demandant à chaque responsable d'équipe de prioriser de son côté. Impossible de mettre 5 projets en Top 1 : chacun a une priorité de 1 à 100 pour enfin savoir ce qui est vraiment prioritaire."
        />
      </AnimateOnScroll>

      {/* 3. Feature — Chaque équipe définit ses prios */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Chaque équipe"
          title="définie ses prios"
          subtitle="Demandez aux responsables de prioriser parmi les projets dont son équipe est à l'origine. Deux projets ne peuvent pas avoir la même priorité. Une fois prêts, ils valident leur choix."
          imageSrc="/assets/images/priorisation-par-equipes/feature-prioritization-dnd.webp"
          imageAlt="Interface de priorisation par drag and drop"
        />
      </AnimateOnScroll>

      {/* 4. Feature — Soyez notifié lorsque les priorités changent */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Soyez notifié"
          title="lorsque les priorités changent"
          subtitle="Gardez vos équipes alignées sur ce qui est prioritaire. Lorsqu'une priorité change, toute personne participant aux projets reçoit l'information."
          imageSrc="/assets/images/priorisation-par-equipes/feature-prioritization-notification.webp"
          imageAlt="Notifications de changement de priorités"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      {/* 5. Feature — Organisez la roadmap */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Organisez la roadmap"
          title="de façon éclairée"
          subtitle="Sur vos portfolios, affichez la priorité de chaque projet validée par l'équipe en demande. Cette information, couplée aux autres données de priorisation (budget, criticité, etc.) vous permet de faire des choix éclairés."
          imageSrc="/assets/images/priorisation-par-equipes/feature-portfolio-project-priority.webp"
          imageAlt="Vue portfolio des priorités"
        />
      </AnimateOnScroll>

      {/* 6. CTA — Vous voulez l'essayer ? */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Vous voulez l'essayer ?"
          subtitle="Discutons-en et bénéficiez d'une démo sur mesure"
        >
          <div style={{ gridColumn: "1 / -1", width: "70%", margin: "0 auto" }}>
            <CardCta
              title="Je veux une démo"
              description="Découvrez comment AirSaas peut transformer la priorisation de vos projets en quelques minutes."
              ctaLabel="Je veux une démo"
              className="w-full"
            />
          </div>
        </CtaFrame>
      </AnimateOnScroll>

      {/* 7. FAQ */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FaqFrame
          title="Vos questions"
          titleHighlight="sur la priorisation AirSaas"
          items={faqItems}
        />
      </AnimateOnScroll>

      {/* 8. Footer */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer
          columns={footerColumns}
          copyright="Made with love in France | © 2025 AirSaas · Mentions légales · Confidentialité"
          copyrightIcon={<span aria-label="Français">🇫🇷</span>}
        />
      </AnimateOnScroll>
    </div>
  );
}
