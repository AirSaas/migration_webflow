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

const IMG = "/assets/pages/produit/automatiser-la-com-projet";

const faqItems = [
  {
    question: "L'email bilan de santé est-il obligatoire pour tous les sponsors ?",
    answer:
      "Non, chaque sponsor peut être ajouté ou retiré à la main. L'email part le lundi matin uniquement aux sponsors actifs sur les projets.",
  },
  {
    question: "Puis-je personnaliser le contenu de l'email ?",
    answer:
      "Oui. Vous pouvez activer ou désactiver les sections (tendance des projets vitaux, projets en retard, etc.) depuis la configuration du bilan de santé.",
  },
  {
    question: "Les sponsors peuvent-ils accéder au détail d'un projet depuis l'email ?",
    answer:
      "Oui, en un clic : chaque projet affiché dans l'email contient un lien direct vers sa fiche dans AirSaas.",
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
      "Le reporting essentiel pour créer de l'adhésion et éviter les dérapages.",
    href: "/fr/produit/reporting-projet",
  },
  {
    imageSrc: `${IMG}/663cc3639d8f5c910c1cb133_Prioritization-per-team-ppt.webp`,
    imageAlt: "Priorisation par équipe",
    title: "Priorisation par équipes",
    description:
      "Chaque responsable priorise ses projets. Fini les Top 1 à 5 projets.",
    href: "/fr/produit/priorisation-par-equipes",
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

export default function AutomatiserComProjetPage() {
  return (
    <div className="w-full">
      <Hero
        navItems={SITE_NAV_ITEMS}
        navCtaLabel={SITE_NAV_CTA.label}
        navCtaHref={SITE_NAV_CTA.href}
        loginLabel={SITE_NAV_LOGIN.label}
        loginHref={SITE_NAV_LOGIN.href}
        topTag={{ label: "Communication projet", variant: "muted" }}
        title="Email « bilan de santé » :"
        titleHighlight="automatisez la com projet"
        subtitle="Bien communiquer c'est 50% du succès de vos projets. Mais ça prend un temps fou. L'email bilan de santé partage juste le bon niveau d'information, automatiquement, une fois par semaine."
        primaryCta={{ label: "Je veux une démo", href: "/fr/meetings-pages" }}
        imageSrc={`${IMG}/664b24837fe62a131250a50c_3413e379b45a09d99b27d62ecb0a20c7_Control-tower-email-FR--screen-.webp`}
        imageAlt="Aperçu de l'email bilan de santé d'AirSaas"
      />

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Sponsors"
          titleHighlight="Ajoutez les sponsors"
          title="sur vos projets"
          subtitle="Ajoutez les sponsors sur vos projets et ils recevront le bilan de santé de tous leurs projets, le lundi matin par email. Aussi simple que ça."
          imageSrc={`${IMG}/6645f73c0195b1d0919ff025_Block---people-involved-screen.webp`}
          imageAlt="Ajout de personnes impliquées sur un projet"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Récap synthétique"
          titleHighlight="Un récap complet"
          title="et synthétique"
          subtitle="Le bilan de santé couvre trois volets essentiels pour permettre aux sponsors de sentir la tendance et d'agir au bon moment."
          checklist={[
            "Tendance des projets vitaux de l'organisation",
            "Tendance de leurs propres projets",
            "Projets en retard d'actualisation",
          ]}
          imageSrc={`${IMG}/66543b6b307a64952dc9c936_Control-tower-email-FR-1.png`}
          imageAlt="Email bilan de santé — vue d'ensemble"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Tendance vitale"
          titleHighlight="Tendance"
          title="des projets vitaux"
          subtitle="Un récapitulatif de la santé des projets vitaux de votre organisation pour leur permettre de « sentir » la tendance du moment."
          imageSrc={`${IMG}/66543b6bd015108e78239180_Control-tower-email-FR-2.png`}
          imageAlt="Tendance des projets vitaux dans l'email"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Leurs projets"
          titleHighlight="Tendance"
          title="de leurs projets à eux"
          subtitle="Un aperçu de leurs projets, ceux en amélioration et ceux en dégradation qui nécessitent leur attention. En un clic, ils accèdent à la fiche projet."
          imageSrc={`${IMG}/66543b6bfecf8fe772bb2c52_Control-tower-email-FR-3.png`}
          imageAlt="Projets à l'attention du sponsor"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          tag="Retards"
          titleHighlight="Projets"
          title="en retard d'actualisation"
          subtitle="Un rappel des projets qui méritent d'être mis à jour. Si cette section est vide, vous êtes tranquille. Recevez l'email bilan de santé tous les lundis matin."
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={600}>
        <FaqFrame
          title="Vos questions"
          titleHighlight="sur le bilan de santé"
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
            description="30 minutes pour voir l'email bilan de santé en action."
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
