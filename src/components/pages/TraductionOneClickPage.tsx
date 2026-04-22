"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { CheckList } from "@/components/library-design/ui/CheckList";
import { Quote } from "@/components/library-design/ui/Quote";
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

/* ------------------------------------------------------------------ */
/*  Composition                                                        */
/* ------------------------------------------------------------------ */

export default function TraductionOneClickPage() {
  return (
    <div className="w-full">
      {/* 1. Hero — dark variant with illustration */}
      <Hero
        variant="dark"
        navItems={navItems}
        navCtaLabel="Demander une démo"
        navCtaHref="#"
        loginLabel="Login"
        loginHref="#"
        topTag={{ label: "Traduction one-click avec DeepL", variant: "muted" }}
        title="Le rapport flash désormais en"
        titleHighlight="multilingue sur AirSaas"
        subtitle="Présenter simplement ses projets, ses programmes et son portefeuille, c'est toujours un casse-tête dans les organisations multilingues. Un établissement aux US ? Votre maison mère en Allemagne ? Marre de passer des heures à sécuriser des traductions en amont de vos réunions ?"
        primaryCta={{ label: "Je veux une démo", href: "#" }}
        imageSrc="/assets/images/traduction-one-click-avec-deepl/hero-copil-deepl-illustration.webp"
        imageAlt="Interface AirSaas avec traduction multilingue Deepl"
      />

      {/* 2. Usage du rapport flash — stacked rich-text with bullet list */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          titleHighlight="Le rapport flash"
          title="désormais en multilingue sur AirSaas"
          richContent={
            <>
              <CheckList
                items={[
                  "Aligner toute une audience sur le sujet dont nous parlons.",
                  "Rappeler les ordres de grandeur d'un projet et les équipes à bord.",
                  "Donner du contexte temporel grâce aux jalons clés.",
                  "Engager la conversation sur l'essentiel, l'information de la santé, les décisions à prendre ou les points d'attention à partager.",
                ]}
              />
              <p>
                C&apos;est l&apos;usage d&apos;un rapport flash projet ou
                programme dans AirSaas. Découvrez la puissance de la
                traduction one-click intégrée avec <strong>Deepl</strong>.
              </p>
            </>
          }
        />
      </AnimateOnScroll>

      {/* 3. Value proposition — stacked rich-text FeatureFrame */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          title="Vos chefs de projets et PO"
          titleHighlight="vont adorer"
          titleHighlightAtEnd
          richContent={
            <>
              <p>
                Le bon pilotage s&apos;appuie sur des cadrages précis, des
                remontées de risques contextualisées et des soumissions
                d&apos;arbitrages éclairés. Quand toute l&apos;énergie mise
                dans la construction d&apos;un reporting de qualité est
                alourdie par le temps nécessaire à traduire et à maintenir
                des PowerPoints, vous n&apos;aidez pas vos équipes.
              </p>
              <Quote>
                La nuance et la précision sont plus simples à exprimer dans
                son langage maternel.
              </Quote>
              <p>Voici comment nous le concrétisons.</p>
            </>
          }
        />
      </AnimateOnScroll>

      {/* 3. Feature — Plateforme multilingue à la maille utilisateur */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Plateforme multilingue"
          title="à la maille utilisateur"
          subtitle="Dans AirSaas, chacun choisit sa langue d'utilisation de la solution. Anglais, Français et toute autre langue sur demande."
          imageSrc="/assets/images/traduction-one-click-avec-deepl/feature-langue-profile.webp"
          imageAlt="Sélecteur de langue dans le profil utilisateur AirSaas"
        />
      </AnimateOnScroll>

      {/* 4. Feature — Écrivez dans votre langue maternelle */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Écrivez dans votre langue maternelle,"
          title="on s'occupe du reste"
          subtitle="Écrivez tous vos contenus (compte-rendus, décisions à prendre, points d'attention, etc.) dans votre langue maternelle. AirSaas s'occupe de la traduction one-click pour vos collègues, en s'appuyant sur Deepl."
          imageSrc="/assets/images/traduction-one-click-avec-deepl/feature-post-deepl-illustration.webp"
          imageAlt="Bouton Traduire en français sur un commentaire de projet"
        />
      </AnimateOnScroll>

      {/* 5. Feature rich-text — Une autre langue vous changerait la vie ? */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          imageSize="compact"
          titleHighlight="Une autre langue"
          title="vous changerait la vie ?"
          richContent={
            <>
              <p>
                Notre intégration avec <strong>Deepl</strong>, solution leader
                de la traduction, nous permet d&apos;étudier vos besoins
                spécifiques rapidement.
              </p>
              <p>
                Le mode rapport flash vous permet de construire en quelques
                clics le support de votre meeting. À vos couleurs et dans la
                langue du meeting à venir !
              </p>
            </>
          }
          imageSrc="/assets/images/traduction-one-click-avec-deepl/feature-deepl-illustration.webp"
          imageAlt="Connexion AirSaas-Deepl avec menu de traduction multilingue"
        />
      </AnimateOnScroll>

      {/* 6. En bref — stacked rich-text section */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          title="En bref ..."
          richContent={
            <>
              <p>
                Engager une démarche de transformation durable, c&apos;est
                s&apos;attaquer à tous les irritants qui pèsent sur celle-ci.
                L&apos;animation de réunion et de rituels projets de qualité,
                en restant frugal sur le temps de reporting, c&apos;est la
                base.
              </p>
              <p>
                Découvrir comment AirSaas construit avec ses clients et avec
                des top experts la solution de pilotage de portefeuille projet
                adorée par celles et ceux qui veulent changer la donne.
              </p>
            </>
          }
        />
      </AnimateOnScroll>

      {/* 8. CTA — Vous voulez l'essayer ? */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Vous voulez l'essayer ?"
          subtitle="Discutons-en et bénéficiez d'une démo sur mesure"
        >
          <div style={{ gridColumn: "1 / -1", width: "70%", margin: "0 auto" }}>
            <CardCta
              title="Je veux une démo"
              description="Découvrez comment AirSaas vous accompagne dans vos projets multilingues grâce à la traduction one-click avec Deepl."
              ctaLabel="Je veux une démo"
              className="w-full"
            />
          </div>
        </CtaFrame>
      </AnimateOnScroll>

      {/* 9. Footer */}
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
