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

const IMG = "/assets/pages/produit/traduction-one-click-avec-deepl";

const faqItems = [
  {
    question: "Quelles langues sont disponibles ?",
    answer:
      "Toutes les langues supportées par DeepL (31 langues dont anglais, allemand, espagnol, italien, japonais, portugais, etc.). La traduction est disponible en un clic dans le rapport flash.",
  },
  {
    question: "La traduction est-elle fiable pour des contenus confidentiels ?",
    answer:
      "Oui. L'intégration DeepL utilise l'API Pro avec une politique zero data retention — les contenus traduits ne sont pas conservés après la requête.",
  },
  {
    question: "Puis-je modifier la traduction après génération ?",
    answer:
      "Oui. Chaque bloc traduit est éditable dans AirSaas : vous pouvez affiner le vocabulaire métier ou ajuster le ton avant l'export PowerPoint ou PDF.",
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
    imageSrc: `${IMG}/6646284da53aa7e6aca6d77b_Control-tower-email-FR--screen-.webp`,
    imageAlt: "Email bilan de santé AirSaas",
    title: "Email « bilan de santé » : automatisez la com projet",
    description:
      "50% du succès c'est bien communiquer. Le bon niveau d'info, automatiquement.",
    href: "/fr/produit/automatiser-la-com-projet",
  },
  {
    imageSrc: `${IMG}/663cc3639d8f5c910c1cb133_Prioritization-per-team-ppt.webp`,
    imageAlt: "Priorisation par équipe",
    title: "Priorisation par équipes",
    description:
      "Chaque responsable priorise ses projets. Fini les Top 1 à 5 projets.",
    href: "/fr/produit/priorisation-par-equipes",
  },
];

export default function TraductionOneClickPage() {
  return (
    <div className="w-full">
      <Hero
        variant="dark"
        navItems={SITE_NAV_ITEMS}
        navCtaLabel={SITE_NAV_CTA.label}
        navCtaHref={SITE_NAV_CTA.href}
        loginLabel={SITE_NAV_LOGIN.label}
        loginHref={SITE_NAV_LOGIN.href}
        topTag={{ label: "Traduction one-click", variant: "muted" }}
        title="Le rapport flash désormais"
        titleHighlight="en multilingue"
        subtitle="Présenter ses projets dans les organisations multilingues, c'était un casse-tête. Un établissement aux US ? Votre maison mère en Allemagne ? Traduction one-click intégrée avec DeepL."
        primaryCta={{ label: "Je veux une démo", href: "/fr/meetings-pages" }}
        imageSrc={`${IMG}/66339df65cf2a6c1d863cf5f_copil-deepl-illustration.webp`}
        imageAlt="Illustration traduction DeepL dans un COPIL"
      />

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Rapport flash multilingue"
          titleHighlight="Aligner toute une audience"
          title="sur le bon niveau d'information"
          subtitle="C'est l'usage du rapport flash projet ou programme dans AirSaas. Découvrez la puissance de la traduction one-click intégrée avec DeepL."
          checklist={[
            "Aligner toute une audience sur le sujet en cours",
            "Rappeler les ordres de grandeur et les équipes à bord",
            "Donner du contexte temporel via les jalons clés",
            "Engager la conversation sur l'essentiel (santé, décisions, points d'attention)",
          ]}
          imageSrc={`${IMG}/6639e095d5f0439995046338_deepl-illustration.webp`}
          imageAlt="Illustration de la traduction automatique DeepL"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Chefs de projet et PO"
          titleHighlight="Vos chefs de projet"
          title="vont adorer"
          titleHighlightAtEnd={false}
          subtitle="Le bon pilotage s'appuie sur des cadrages précis, des remontées de risques contextualisées et des arbitrages éclairés. Inutile d'alourdir tout ça avec le temps de traduction de PowerPoints."
          imageSrc={`${IMG}/6633a76d5f19bfbf5c45d7d4_langue_profile.webp`}
          imageAlt="Sélecteur de langue sur un profil AirSaas"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Post-réunion"
          titleHighlight="Des comptes-rendus"
          title="immédiatement diffusables"
          subtitle="Une fois le copil terminé, le rapport peut être partagé dans toutes les langues utiles — sans friction, sans temps mort entre la décision et sa communication."
          imageSrc={`${IMG}/6646003be55efbd36750d4e9_post-deepl-illustration.webp`}
          imageAlt="Illustration post-DeepL"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={600}>
        <FaqFrame
          title="Vos questions"
          titleHighlight="sur la traduction DeepL"
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
            description="30 minutes pour voir la traduction DeepL en action."
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
