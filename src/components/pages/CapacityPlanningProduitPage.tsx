"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { RelatedSolutionsFrame } from "@/components/library-design/sections/RelatedSolutionsFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import {
  SITE_NAV_ITEMS,
  SITE_NAV_CTA,
  SITE_NAV_LOGIN,
  SITE_FOOTER_COLUMNS,
  SITE_FOOTER_COPYRIGHT,
} from "@/data/site-chrome";

const IMG = "/assets/pages/produit/capacity-planning";

const faqItems = [
  {
    question: "Comment prioriser si j'ai des compétences différentes dans mon équipe ?",
    answer:
      "Tout l'enjeu est de bien découper les équipes en regroupant les personnes aux compétences homogènes (marketing data, sécurité IT, IT data, etc.).",
  },
  {
    question: "Les t-shirt sizing sont-ils personnalisables ?",
    answer:
      "Oui ! Et si vous avez une idée plus précise du temps nécessaire pour un livrable, vous pouvez aussi l'écrire directement.",
  },
  {
    question: "Comment fixer la temporalité (trimestre, mois, PI) ?",
    answer:
      "À vous de choisir. Ce qui marche bien : le trimestre, car on se cale sur la temporalité de l'organisation (finance, commerciale).",
  },
  {
    question: "Et les projets qui dépassent cette temporalité ?",
    answer:
      "Ils sont répartis sur plusieurs trimestres, avec une estimation par période. La vue capacitaire agrège le tout automatiquement.",
  },
];

const relatedSolutions = [
  {
    imageSrc: `${IMG}/66422d1e8363fb3be7ec829c_Presentation-cadrage-slide.webp`,
    imageAlt: "Aperçu du reporting projet AirSaas",
    title: "Découvrez enfin le plaisir du reporting projet",
    description:
      "Le reporting essentiel pour créer de l'adhésion et s'assurer que les projets ne dérapent pas.",
    href: "/fr/produit/reporting-projet",
  },
  {
    imageSrc: `${IMG}/6646284da53aa7e6aca6d77b_Control-tower-email-FR--screen-.webp`,
    imageAlt: "Email bilan de santé AirSaas",
    title: "Email « bilan de santé » : automatisez la com projet",
    description:
      "Le bon niveau d'info, automatiquement, une fois par semaine.",
    href: "/fr/produit/automatiser-la-com-projet",
  },
  {
    imageSrc: `${IMG}/663cc3639d8f5c910c1cb133_Prioritization-per-team-ppt.webp`,
    imageAlt: "Priorisation par équipes AirSaas",
    title: "Priorisation par équipes",
    description:
      "Chaque responsable priorise ses projets. Fini les Top 1 à 5 projets.",
    href: "/fr/produit/priorisation-par-equipes",
  },
  {
    imageSrc: `${IMG}/6633a76d5f19bfbf5c45d7d4_langue_profile.webp`,
    imageAlt: "Traduction one-click avec DeepL",
    title: "Le rapport flash désormais en multilingue",
    description:
      "Présenter ses projets dans les organisations multilingues, enfin simple.",
    href: "/fr/produit/traduction-one-click-avec-deepl",
  },
];

export default function CapacityPlanningProduitPage() {
  return (
    <div className="w-full">
      <Hero
        navItems={SITE_NAV_ITEMS}
        navCtaLabel={SITE_NAV_CTA.label}
        navCtaHref={SITE_NAV_CTA.href}
        loginLabel={SITE_NAV_LOGIN.label}
        loginHref={SITE_NAV_LOGIN.href}
        topTag={{ label: "Capacitaire", variant: "muted" }}
        title="Pouvons-nous réellement"
        titleHighlight="faire ces projets ?"
        subtitle="Grâce à la vue Capacitaire, vous aurez les bases d'une discussion pragmatique pour répondre à la question : est-on capable de faire les projets prévus cette année, ce semestre, ce trimestre ?"
        primaryCta={{ label: "Je veux une démo", href: "/fr/meetings-pages" }}
        secondaryCta={{ label: "Voir la landing", href: "/fr/lp/capacity-planning" }}
        imageSrc={`${IMG}/66334ee7bcfcb0aa45802537_Capacity-screen.webp`}
        imageAlt="Vue capacitaire d'une équipe dans AirSaas"
      />

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Les questions qu'on se pose"
          titleHighlight="Une réponse"
          title="à toutes vos questions"
          subtitle="N'avancez plus « au feeling ». La vue Capacitaire vous aide à répondre à ces questions, par équipe et sur l'ensemble de votre organisation."
          checklist={[
            "Pourrait-on faire plus de projets le prochain trimestre ?",
            "Doit-on recruter ?",
            "Quelle surcharge acceptons-nous d'avoir ?",
          ]}
          imageSrc={`${IMG}/67973435cf37dd18cddcdffa_Page-Scenarios-FR.webp`}
          imageAlt="Page scénarios capacitaires dans AirSaas"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Mise en place"
          titleHighlight="Rapide à mettre en place,"
          title="simple à maintenir"
          subtitle="Mettre en place un capacitaire est souvent chronophage, et le maintenir dans le temps mission impossible. Notre parti pris : capacitaire macro, au trimestre, par équipe. Approximativement juste plutôt que précisément faux."
          imageSrc={`${IMG}/66334dad60affe8f9f6cf3db_Screen-marketing-temps.webp`}
          imageAlt="Vue marketing-temps du capacitaire AirSaas"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Scénarios"
          titleHighlight="Trouvez le scénario"
          title="qui fonctionne"
          subtitle="Agencez les projets et visualisez l'impact sur les équipes jusqu'à trouver le scénario que toutes sont en capacité de mener à bien."
          imageSrc={`${IMG}/663cc3639d8f5c910c1cb133_Prioritization-per-team-ppt.webp`}
          imageAlt="Scénarios de priorisation par équipe"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Estimation"
          titleHighlight="Taille de t-shirt"
          title="à l'échelle du livrable"
          subtitle="Pas besoin de rentrer dans le détail micro. Une taille de t-shirt à l'échelle du livrable suffit pour avoir une bonne estimation du temps nécessaire."
          imageSrc={`${IMG}/6787bda3d16737c6ddb82fd5_Modal---Livrable.webp`}
          imageAlt="Modal d'estimation de livrable par taille de t-shirt"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Temporalité"
          titleHighlight="À l'échelle de temps"
          title="qui fait sens"
          subtitle="Semaine, mois, trimestre, semestre, PI : choisissez la temporalité la plus proche de votre organisation. Le trimestre s'aligne généralement avec les cycles finance et commercial."
          imageSrc={`${IMG}/66334d9cdc63af6332011de0_Dropdown_temps.webp`}
          imageAlt="Dropdown de sélection de la temporalité"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          tag="Vue simple et actionnable"
          titleHighlight="Dans les clous"
          title="ou dans les choux ?"
          subtitle="Visualisez en un clin d'œil si vos équipes peuvent tenir le scénario. La base d'une discussion pragmatique pour prendre les décisions."
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={600}>
        <FaqFrame
          title="Vos questions"
          titleHighlight="sur le capacitaire AirSaas"
          items={faqItems}
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <RelatedSolutionsFrame
          tag="Nos solutions"
          titleHighlight="Allez plus loin"
          title="avec les autres fonctionnalités AirSaas"
          columns={4}
          solutions={relatedSolutions}
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Vous voulez l'essayer ?"
          subtitle="Discutons-en et bénéficiez d'une démo sur mesure."
        >
          <CardCta
            title="Réserver une démo"
            description="30 minutes pour voir le capacitaire en action."
            ctaLabel="Je veux une démo"
            ctaHref="/fr/meetings-pages"
            className="flex-1"
          />
          <CardCta
            title="Voir la landing capacity"
            description="Tout le détail du capacity planning par AirSaas."
            ctaLabel="Découvrir"
            ctaHref="/fr/lp/capacity-planning"
            className="flex-1"
          />
        </CtaFrame>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer
          columns={SITE_FOOTER_COLUMNS}
          copyright={SITE_FOOTER_COPYRIGHT}
          copyrightIcon={<span aria-label="Français">🇫🇷</span>}
        />
      </AnimateOnScroll>
    </div>
  );
}
