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

const IMG = "/assets/pages/produit/budget";

const faqItems = [
  {
    question: "Est-il possible de modifier le budget planifié ?",
    answer:
      "Oui… mais non. Une fois que le projet est validé au cadrage, la somme entrée en planifié ne change plus. Cependant, vous pouvez ajouter des nouvelles lignes de dépense si besoin. Un tag « modifié » apparaîtra alors sur la somme totale en planifié.",
  },
  {
    question: "Qu'est-ce qui est visible en vues consolidées ?",
    answer:
      "La liste des projets avec leurs détails et les dates de mise à jour, les sommes Opex et Capex, et la répartition du budget par axes analytiques.",
  },
  {
    question: "Le suivi des dépenses est-il automatisé ?",
    answer:
      "Oui, chaque ligne affiche sa date de dernière mise à jour et un indicateur de fiabilité. Les chefs de projet renseignent engagé / consommé / atterrissage, et AirSaas calcule automatiquement les totaux et les alertes.",
  },
];

const relatedSolutions = [
  {
    imageSrc: `${IMG}/66334ee7bcfcb0aa45802537_Capacity-screen.webp`,
    imageAlt: "Capture d'écran de la vue Capacity planning d'AirSaas",
    title: "Capacity planning : pouvons-nous vraiment faire ces projets ?",
    description:
      "La vue capacitaire pour savoir ce qu'il est possible de faire, trimestre par trimestre.",
    href: "/fr/produit/capacity-planning",
  },
  {
    imageSrc: `${IMG}/66422d1e8363fb3be7ec829c_Presentation-cadrage-slide.webp`,
    imageAlt: "Capture d'écran d'un reporting projet dans AirSaas",
    title: "Découvrez enfin le plaisir du reporting projet",
    description:
      "Essentiel pour créer de l'adhésion et s'assurer que les projets ne dérapent pas.",
    href: "/fr/produit/reporting-projet",
  },
  {
    imageSrc: `${IMG}/6646284da53aa7e6aca6d77b_Control-tower-email-FR--screen-.webp`,
    imageAlt: "Capture d'écran de l'email bilan de santé d'AirSaas",
    title: "Email « bilan de santé » : automatisez la com projet",
    description:
      "50% du succès c'est bien communiquer. Le bon niveau d'info, automatiquement, une fois par semaine.",
    href: "/fr/produit/automatiser-la-com-projet",
  },
  {
    imageSrc: `${IMG}/6633a76d5f19bfbf5c45d7d4_langue_profile.webp`,
    imageAlt: "Capture d'écran de la traduction one-click AirSaas",
    title: "Le rapport flash désormais en multilingue dans AirSaas",
    description:
      "Présenter ses projets dans les organisations multilingues, enfin simple.",
    href: "/fr/produit/traduction-one-click-avec-deepl",
  },
];

export default function BudgetPage() {
  return (
    <div className="w-full">
      <Hero
        navItems={SITE_NAV_ITEMS}
        navCtaLabel={SITE_NAV_CTA.label}
        navCtaHref={SITE_NAV_CTA.href}
        loginLabel={SITE_NAV_LOGIN.label}
        loginHref={SITE_NAV_LOGIN.href}
        topTag={{ label: "Budget projet", variant: "muted" }}
        title="Le suivi budgétaire"
        titleHighlight="de vos projets"
        subtitle="Le budget, c'est le GPS des projets du portfolio. Il maintient le cap, évite les dérives et témoigne de la bonne avancée de chaque projet. Gardez un œil dessus pour mieux contrôler les dépenses."
        primaryCta={{ label: "Je veux une démo", href: "/fr/meetings-pages" }}
        secondaryCta={{ label: "Voir l'outil PPM", href: "/fr/produit/capacity-planning" }}
        imageSrc={`${IMG}/66fbefc6521c27b9a3836ebc_Budget-screen.webp`}
        imageAlt="Capture d'écran de la vue budget d'un projet dans AirSaas"
      />

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Suivi budget"
          titleHighlight="Un suivi facile"
          title="sans prise de tête"
          subtitle="Une photo temps réel à chaque phase du projet pour savoir où vous en êtes. Faites votre suivi budgétaire simplement et présentez-le à vos supérieurs en quelques clics depuis AirSaas."
          ctaLabel="Voir la démo"
          ctaHref="/fr/meetings-pages"
          imageSrc={`${IMG}/66f323015aaa9b92b42e6397_ADD-EXPENSES-LINES.webp`}
          imageAlt="Ajout de lignes de dépenses CAPEX/OPEX dans AirSaas"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Rituels"
          titleHighlight="Des rituels"
          title="de suivi budgétaire puissants"
          subtitle='Brillez lors de vos points budgétaires ! Grâce au suivi des dépenses "engagées", "consommées" et "atterrissage", vous répondez à toutes les questions.'
          checklist={[
            "Quels dérapages d'ici la fin du trimestre ?",
            "Sur quel programme a-t-on encore du budget ?",
            "Comment justifier cette demande de rallonge ?",
            "Pourquoi a-t-on doublé les dépenses sur ce projet ?",
            "À combien pense-t-on atterrir d'ici la fin du semestre ?",
          ]}
          imageSrc={`${IMG}/66f401cfa1c5e13cc3adf9a3_Budget-graphics-screen.webp`}
          imageAlt="Graphiques consolidés du budget des projets dans AirSaas"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Partage"
          titleHighlight="Des vues consolidées"
          title="à partager facilement"
          subtitle="Parce que le visuel ça compte, choisissez le groupe de projets qui vous intéresse et basculez sur la vue budgétaire : une image plus parlante, facilement partageable avec les membres du COMEX."
          imageSrc={`${IMG}/66fbf0caa595317d71d53652_Teams-budget.webp`}
          imageAlt="Vue budget par équipes dans AirSaas"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Coût humain"
          titleHighlight="Le coût humain"
          title="enfin pris en compte"
          subtitle="Le poste de dépense le plus important dans les budgets. Qu'il soit interne ou externe, renseignez les TJM des équipes et découvrez le vrai coût humain de vos projets."
          imageSrc={`${IMG}/66fbf0fe7414e2b3845dbb9f_Des-indicateurs.webp`}
          imageAlt="Indicateurs de fiabilité sur les lignes de budget"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Fiabilité"
          titleHighlight="Des indicateurs"
          title="pour piloter sereinement"
          subtitle="Pour chaque ligne de dépense, la date de dernière mise à jour est visible. AirSaas propose en plus un indicateur de fiabilité pour un contrôle renforcé de vos données."
          imageSrc={`${IMG}/66fbf13616fcb88f01125d9b_Feed-budget.webp`}
          imageAlt="Fil d'activité du budget avec dépenses additionnelles"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Personnalisation"
          titleHighlight="Une personnalisation"
          title="adaptée à votre organisation"
          subtitle="Renseignez un axe analytique par dépense, consultez les graphiques consolidés par axe et découvrez les principaux postes de coûts. Les axes proposés ne suffisent pas ? Ajoutez les vôtres en un clic."
          imageSrc={`${IMG}/66f327d0f3cd55dfdb3ad2d5_Analytical-axes.webp`}
          imageAlt="Axes analytiques personnalisés pour le suivi budgétaire"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          tag="Gestion de portefeuille"
          titleHighlight="Les budgets,"
          title="thème central de la gestion de portefeuille"
          subtitle="Avec AirSaas, c'est simple de piloter les sommes, anticiper les atterrissages et répartir les axes analytiques."
          checklist={[
            "Suivre les dépenses planifiées / engagées / consommées",
            "Anticiper les atterrissages projet pour arbitrer",
            "Voir en temps réel les budgets disponibles à ré-allouer",
            "Découvrir la répartition des axes analytiques",
          ]}
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={600}>
        <FaqFrame title="Questions" titleHighlight="fréquentes" items={faqItems} />
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
            description="30 minutes pour découvrir le suivi budgétaire en action."
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
