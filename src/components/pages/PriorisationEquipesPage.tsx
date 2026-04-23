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

const IMG = "/assets/pages/produit/priorisation-par-equipes";

const faqItems = [
  {
    question: "Comment « forcer » un directeur à prioriser ?",
    answer:
      "Si le projet n'a pas de priorisation, il n'apparaît pas comme priorisé par le métier dans la roadmap. Ça aide :)",
  },
  {
    question: "Comment priorise-t-on les projets en transverse ?",
    answer:
      "Trois choses : que chaque responsable priorise ses besoins, qu'une définition commune du vital soit partagée, et un estimatif temps homme + gain potentiel par projet. Cette fonctionnalité s'occupe du premier point.",
  },
  {
    question: "Si on repriorise en cours de route, comment ça se passe ?",
    answer:
      "Tout est transparent. Vous pouvez reprioriser en expliquant à tout le monde les raisons, et les participants reçoivent automatiquement la nouvelle priorité.",
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
    imageSrc: `${IMG}/66422d1e8363fb3be7ec829c_Presentation-cadrage-slide.webp`,
    imageAlt: "Reporting projet AirSaas",
    title: "Découvrez enfin le plaisir du reporting projet",
    description:
      "Essentiel pour créer de l'adhésion et s'assurer que les projets ne dérapent pas.",
    href: "/fr/produit/reporting-projet",
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
    imageAlt: "Traduction DeepL dans AirSaas",
    title: "Le rapport flash désormais en multilingue",
    description:
      "Présenter ses projets dans les organisations multilingues, enfin simple.",
    href: "/fr/produit/traduction-one-click-avec-deepl",
  },
];

export default function PriorisationEquipesPage() {
  return (
    <div className="w-full">
      <Hero
        navItems={SITE_NAV_ITEMS}
        navCtaLabel={SITE_NAV_CTA.label}
        navCtaHref={SITE_NAV_CTA.href}
        loginLabel={SITE_NAV_LOGIN.label}
        loginHref={SITE_NAV_LOGIN.href}
        topTag={{ label: "Priorisation par équipes", variant: "muted" }}
        title="La priorisation des projets,"
        titleHighlight="par équipe en demande"
        subtitle="Lorsqu'en Codir il faut prioriser 125 projets du portfolio, remplir la roadmap se fait en fonction de celui qui parle le plus fort ou le plus copain avec le DG. Changez de méthode."
        primaryCta={{ label: "Je veux une démo", href: "/fr/meetings-pages" }}
        imageSrc={`${IMG}/663d07b7eeea99ee02f71c97_Prioritization-per-team-ppt.webp`}
        imageAlt="Vue de priorisation par équipe dans AirSaas"
      />

      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          tag="Parti pris"
          titleHighlight="La manière la plus simple"
          title="d'y voir clair"
          subtitle="Réduisez la complexité en demandant à chaque responsable d'équipe de prioriser de son côté. Impossible de mettre 5 projets en Top 1 : chaque projet a une priorité unique de 1 à 100."
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Ownership équipe"
          titleHighlight="Chaque équipe"
          title="définit ses prios"
          subtitle="Les responsables priorisent parmi les projets dont leur équipe est à l'origine. Deux projets ne peuvent pas avoir la même priorité. Une fois prêts, ils valident leur choix."
          imageSrc={`${IMG}/663d07a346b12e77e37ddd72_Prioritization-per-team-ppt-d-d.webp`}
          imageAlt="Drag and drop de priorisation par équipe"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Alignement"
          titleHighlight="Soyez notifié"
          title="quand les priorités changent"
          subtitle="Gardez vos équipes alignées sur ce qui est prioritaire. Lorsqu'une priorité change, toute personne participant aux projets reçoit l'information automatiquement."
          imageSrc={`${IMG}/663d07e315eb20b766f71fb9_Prioritization-per-team-notification.webp`}
          imageAlt="Notification de changement de priorité"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Roadmap éclairée"
          titleHighlight="Organisez la roadmap"
          title="de façon éclairée"
          subtitle="Affichez la priorité de chaque projet validée par l'équipe en demande. Couplée aux autres données de priorisation (budget, criticité, etc.), elle permet des choix éclairés."
          imageSrc={`${IMG}/6646051756191ce3dc501429_Portfolio-project-priority.webp`}
          imageAlt="Vue portfolio avec priorités par projet"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={600}>
        <FaqFrame
          title="Vos questions"
          titleHighlight="sur la priorisation AirSaas"
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
            description="Découvrez la priorisation par équipe en action."
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
