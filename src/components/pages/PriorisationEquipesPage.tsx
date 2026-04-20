"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { Heading } from "@/components/library-design/ui/Heading";
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
        headline="La priorisation des projets,"
        headlineGradient="par équipe en demande"
        subtitle="Lorsqu'en Codir il faut prioriser les 125 projets du portfolio, c'est un peu dur de s'y retrouver. Tout le monde y va de ses projets « urgentissimes », et remplir la roadmap des prochains trimestres se fait finalement en fonction de celui qui parle le plus fort ou celui le plus copain avec le DG."
        primaryCta={{ label: "Je veux une démo", href: "#" }}
        illustrationSrc="https://placehold.co/1457x857/3c51e2/ffffff?text=Priorisation+AirSaas"
        illustrationAlt="Interface de priorisation AirSaas"
      />

      {/* 2. Main value proposition — stacked FeatureFrame */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          titleHighlight="La manière la plus simple"
          title="d'y voir clair"
          description="Réduisez la complexité en demandant à chaque responsable d'équipe de prioriser de son côté. Impossible de mettre 5 projets en Top 1 : chacun a une priorité de 1 à 100 pour enfin savoir ce qui est vraiment prioritaire."
        />
      </AnimateOnScroll>

      {/* 3. Feature — Chaque équipe définit ses prios */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Chaque équipe"
          title="définie ses prios"
          description="Demandez aux responsables de prioriser parmi les projets dont son équipe est à l'origine. Deux projets ne peuvent pas avoir la même priorité. Une fois prêts, ils valident leur choix."
          imageSrc="https://placehold.co/1125x696/e8ebfe/3c51e2?text=Priorisation+drag+%26+drop"
          imageAlt="Interface de priorisation par drag and drop"
        />
      </AnimateOnScroll>

      {/* 4. Feature — Soyez notifié lorsque les priorités changent */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Soyez notifié"
          title="lorsque les priorités changent"
          description="Gardez vos équipes alignées sur ce qui est prioritaire. Lorsqu'une priorité change, toute personne participant aux projets reçoit l'information."
          imageSrc="https://placehold.co/1125x731/fffbeb/ff922b?text=Notifications+AirSaas"
          imageAlt="Notifications de changement de priorités"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* 5. Feature — Organisez la roadmap */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Organisez la roadmap"
          title="de façon éclairée"
          description="Sur vos portfolios, affichez la priorité de chaque projet validée par l'équipe en demande. Cette information, couplée aux autres données de priorisation (budget, criticité, etc.) vous permet de faire des choix éclairés."
          imageSrc="https://placehold.co/1125x696/e8ebfe/3c51e2?text=Portfolio+priorities+view"
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

      {/* 8. Related solutions — cross-promotion grid */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <section className="flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem] bg-primary-2">
          <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
            <Heading level={2} gradient="none" align="center">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "var(--gradient-dark-to-primary)",
                  WebkitBackgroundClip: "text",
                }}
              >
                Allez plus loin
              </span>{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                }}
              >
                avec AirSaas
              </span>
            </Heading>
            <p
              className="text-center max-w-[60rem] font-light text-foreground"
              style={{ fontSize: "1.125rem", lineHeight: 1.5 }}
            >
              Découvrez d&apos;autres fonctionnalités qui s&apos;articulent parfaitement avec la priorisation par équipes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-[1.5rem] items-stretch w-full md:grid-cols-2">
            <CardCta
              title="Capacity planning : Pouvons-nous réellement faire ces projets ?"
              description="Grâce à la vue Capacitaire, vous aurez les bases d'une discussion pragmatique pour répondre à la question : est-on capable de faire les projets prévus cette année, ce semestre, ce trimestre ?"
              ctaLabel="voir plus"
              ctaHref="#"
              className="w-full"
            />
            <CardCta
              title="Découvrez enfin le plaisir du reporting projet"
              description="Le reporting projet est essentiel pour créer de l'adhésion et s'assurer que les projets ne dérapent pas…"
              ctaLabel="voir plus"
              ctaHref="#"
              className="w-full"
            />
            <CardCta
              title="Email « bilan de santé » : Automatisez la communication projet"
              description="Bien communiquer c'est 50% du succès de vos projets. Mais ça prend un temps fou et on rentre souvent trop dans le détail. Découvrez l'email « bilan de santé » qui partage juste le bon niveau d'information, automatiquement, une fois par semaine."
              ctaLabel="voir plus"
              ctaHref="#"
              className="w-full"
            />
            <CardCta
              title="Le rapport flash désormais en multilingue dans AirSaas"
              description="Présenter simplement ses projets, ses programmes et son portefeuille, c'est toujours un casse tête dans les organisations multilingues…"
              ctaLabel="voir plus"
              ctaHref="#"
              className="w-full"
            />
          </div>
        </section>
      </AnimateOnScroll>

      {/* 9. Footer */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer columns={footerColumns} />
      </AnimateOnScroll>
    </div>
  );
}
