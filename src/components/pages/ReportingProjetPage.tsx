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

const IMG = "/assets/pages/produit/reporting-projet";

const faqItems = [
  {
    question: "Puis-je customiser le reporting ?",
    answer:
      "Oui. Le rapport flash est personnalisable avec vos couleurs et votre logo. Vous pouvez ensuite choisir les éléments que vous voulez montrer.",
  },
  {
    question: "Peut-on traduire le rapport flash automatiquement ?",
    answer:
      "Oui. AirSaas utilise l'API de DeepL pour une traduction de qualité avec un niveau de sécurité au top.",
  },
  {
    question: "Comment ajouter risques et décisions dans le reporting ?",
    answer:
      "Les chefs de projet ou Product Owners font remonter les décisions dans les comptes-rendus de réunion depuis AirSaas. Elles sont automatiquement ajoutées au rapport flash — vous pouvez bien sûr les enlever en un clic.",
  },
];

const relatedSolutions = [
  {
    imageSrc: `${IMG}/66334ee7bcfcb0aa45802537_Capacity-screen.webp`,
    imageAlt: "Vue capacitaire AirSaas",
    title: "Capacity planning : pouvons-nous faire ces projets ?",
    description:
      "La vue capacitaire pour savoir ce qu'il est possible de faire, trimestre par trimestre.",
    href: "/fr/produit/capacity-planning",
  },
  {
    imageSrc: `${IMG}/663cc3639d8f5c910c1cb133_Prioritization-per-team-ppt.webp`,
    imageAlt: "Priorisation par équipe AirSaas",
    title: "Priorisation par équipes",
    description:
      "Chaque responsable priorise ses projets. Fini les Top 1 à 5 projets.",
    href: "/fr/produit/priorisation-par-equipes",
  },
  {
    imageSrc: `${IMG}/6646284da53aa7e6aca6d77b_Control-tower-email-FR--screen-.webp`,
    imageAlt: "Email bilan de santé AirSaas",
    title: "Email « bilan de santé » : automatisez la com projet",
    description:
      "50% du succès c'est bien communiquer. Le bon niveau d'info, automatiquement.",
    href: "/fr/produit/automatiser-la-com-projet",
  },
  {
    imageSrc: `${IMG}/6633a76d5f19bfbf5c45d7d4_langue_profile.webp`,
    imageAlt: "Traduction DeepL",
    title: "Le rapport flash désormais en multilingue",
    description:
      "Présenter ses projets dans les organisations multilingues, enfin simple.",
    href: "/fr/produit/traduction-one-click-avec-deepl",
  },
];

export default function ReportingProjetPage() {
  return (
    <div className="w-full">
      <Hero
        navItems={SITE_NAV_ITEMS}
        navCtaLabel={SITE_NAV_CTA.label}
        navCtaHref={SITE_NAV_CTA.href}
        loginLabel={SITE_NAV_LOGIN.label}
        loginHref={SITE_NAV_LOGIN.href}
        topTag={{ label: "Reporting projet", variant: "muted" }}
        title="Découvrez enfin"
        titleHighlight="le plaisir du reporting projet"
        subtitle="Le reporting projet est essentiel — mais vécu comme une corvée par ceux qui le produisent, jamais lu par ceux qui le reçoivent. Découvrez comment AirSaas a craqué le problème."
        primaryCta={{ label: "Je veux une démo", href: "/fr/meetings-pages" }}
        imageSrc={`${IMG}/66422c2062f8e4b86c4a3030_Presentation-cadrage-slide.webp`}
        imageAlt="Aperçu d'une slide de rapport flash dans AirSaas"
      />

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Prenons de la hauteur"
          titleHighlight="Les 3 raisons"
          title="pour lesquelles le reporting ne marche pas"
          subtitle="Un bon reporting doit être homogène, clair et rapide à produire. Le vôtre coche ces trois cases ?"
          checklist={[
            "Pas le bon niveau d'abstraction : trop précis ou trop macro",
            "Trop chronophage : 3 jours par mois à consolider",
            "Chacun son format : illisible d'un projet à l'autre",
          ]}
          imageSrc={`${IMG}/664601436288365bdf5ec9bf_Presentation-Execution-screen.webp`}
          imageAlt="Vue exécution d'un rapport projet"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Fiche projet"
          titleHighlight="Une fiche projet"
          title="homogène"
          subtitle="Les fiches récapitulent le cadrage (gains attendus, personnes impliquées, timeline des jalons) et l'exécution (progression, décisions, risques). Même format pour tous les projets."
          imageSrc={`${IMG}/664602d0797ac9294687de0e_Portfolio--bt-presentation.webp`}
          imageAlt="Fiche projet homogène dans AirSaas"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="En 1 clic"
          titleHighlight="Un reporting généré"
          title="en un clic"
          subtitle="Générez le rapport flash aux couleurs de votre organisation, exportable PowerPoint ou PDF. Autant de temps gagné pour vous focaliser sur le coaching de vos chefs de projet."
          imageSrc={`${IMG}/66422c2062f8e4b86c4a3030_Presentation-cadrage-slide.webp`}
          imageAlt="Export PowerPoint d'un rapport flash"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Customisable"
          titleHighlight="Un reporting"
          title="customisable"
          subtitle="Faites passer les bons messages : épinglez les décisions à afficher, les points d'attention à aborder, les comptes-rendus des dernières réunions, les points succès de l'équipe."
          imageSrc={`${IMG}/6645c08a054447c12df6647a_modale-activation-reminder.webp`}
          imageAlt="Modale d'activation des rappels de mise à jour"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          tag="Plus de pêche aux infos"
          titleHighlight="Un deal simple"
          title="avec vos chefs de projet"
          subtitle='« Ce projet doit être à jour toutes les 2 semaines, le jeudi. » AirSaas envoie les rappels de mise à jour et vous donne accès aux écrans de contrôle.'
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={600}>
        <FaqFrame
          title="Vos questions"
          titleHighlight="sur le reporting AirSaas"
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
            description="30 minutes pour découvrir le reporting qui change tout."
            ctaLabel="Je veux une démo"
            ctaHref="/fr/meetings-pages"
            className="flex-1"
          />
          <CardCta
            title="Parler à un expert"
            description="Un besoin précis ? Échangez avec notre équipe PPM."
            ctaLabel="Nous contacter"
            ctaHref="/fr/meetings-pages"
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
