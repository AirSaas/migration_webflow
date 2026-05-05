import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeatureFrame } from "./FeatureFrame";

/**
 * Rich-text variants of the FeatureFrame — smaller illustration (~40%) and a
 * prose-styled text column that supports multi-paragraph content, bold, italic,
 * headings, lists, and links.
 */
const meta = {
  title: "Sections/Features Sections/FeatureFrame/Rich Text",
  component: FeatureFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FeatureFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageRight: Story = {
  args: {
    imagePosition: "right",
    imageSize: "compact",
    title: "Highlight the feelings of your teams",
    richContent: (
      <>
        <p>
          Including project progress metrics in your reporting is not enough. To
          involve everyone strongly in your projects, highlight in your
          presentations the points of attention or the successes encountered,
          according to what your management team, your project managers, or even
          your end users tell you about them.{" "}
          <strong>Because together, we go further.</strong>
        </p>
        <p>
          Give each stakeholder a voice: collect qualitative feedback from the
          field, cross-reference it with your KPIs, and turn your steering
          committees into <em>real decision-making moments</em>.
        </p>
        <h4>What you can measure</h4>
        <ul>
          <li>Perceived progress vs. actual progress on each milestone.</li>
          <li>Blockers identified by business teams and by IT.</li>
          <li>Sentiment over time — are you gaining or losing momentum?</li>
        </ul>
        <p>
          <a href="#">See how AirSaaS structures team feedback →</a>
        </p>
      </>
    ),
    imageSrc:
      "https://placehold.co/800x600/f3f3fc/3a51e2?text=Illustration",
    imageAlt: "Feelings illustration",
    imageBgColor: "var(--color-primary-5)",
  },
};

export const ImageLeft: Story = {
  args: {
    imagePosition: "left",
    imageSize: "compact",
    title: "Align IT and Business around the same roadmap",
    richContent: (
      <>
        <p>
          Portfolio governance is not a reporting exercise. It's a continuous
          conversation between the teams who{" "}
          <strong>build the product</strong> and the teams who{" "}
          <strong>run the business</strong>. AirSaaS gives you a single canvas
          to run that conversation — with the right level of detail for each
          audience.
        </p>
        <h4>Two perspectives, one source of truth</h4>
        <ul>
          <li>
            <strong>Business view</strong> — outcomes, OKRs, capacity, risks.
          </li>
          <li>
            <strong>IT view</strong> — dependencies, releases, tech debt,
            resourcing.
          </li>
        </ul>
        <p>
          No more dueling spreadsheets. No more "which version is the real one?"
          — everyone reads from the same roadmap, in their own language.
        </p>
      </>
    ),
    imageSrc:
      "https://placehold.co/800x600/fffbeb/e58d05?text=Illustration",
    imageAlt: "Alignment illustration",
    imageBgColor: "#fffbeb",
  },
};

export const NarrowImageRight: Story = {
  args: {
    imagePosition: "right",
    imageSize: "narrow",
    titleHighlight: "Aller au-delà",
    title: "des chiffres",
    description:
      "Ne vous focalisez pas uniquement sur les métriques-clés liées à vos projets. Les chiffres parlent autant que les retours des équipes elles-mêmes. Dédiez toujours un temps de parole aux différents responsables, ou incluez à vos présentations des verbatims pour mobiliser l'attention des décideurs.",
    imageSrc:
      "https://placehold.co/600x800/e8ebfe/3c51e2?text=Narrow+%7E33%25",
    imageAlt: "Narrow illustration",
  },
};

export const NarrowImageLeft: Story = {
  args: {
    imagePosition: "left",
    imageSize: "narrow",
    titleHighlight: "Inviter",
    title: "les bonnes personnes",
    description:
      "Invitez uniquement les personnes qui peuvent prendre des décisions et qui permettent d'éclairer le processus décisionnel. Vous pouvez ainsi focaliser l'attention sur l'essentiel : les sponsors, les gestionnaires de projet à risque, et le Codir si nécessaire.",
    imageSrc:
      "https://placehold.co/600x800/e8ebfe/3c51e2?text=Narrow+%7E33%25",
    imageAlt: "Narrow illustration",
  },
};

/**
 * Composite-image pattern — ONE fused image + multi-arrow text.
 *
 * Mirrors the live home page section "Une newsletter sponsor que votre
 * direction va adorer" (and the same pattern repeats on multiple Solution /
 * Produit pages: "Un récap' complet et synthétique", etc.).
 *
 * Two non-negotiable rules for this pattern:
 *
 * 1. **ONE composite/fused image** — not 2 or 3 separate images stacked.
 *    The asset file should be named with a `-composite.png` suffix to
 *    signal it's the fused version (e.g. `newsletter-sponsor-composite.png`).
 *    The image shows the ENTIRE artifact (the email card with KPIs +
 *    project table, the dashboard with all panels, etc.).
 *
 * 2. **`richContent` with 3 H5 + paragraph blocks**, each H5 prefixed by an
 *    ASCII arrow (`→` if `imagePosition="right"`, `←` if `imagePosition="left"`).
 *    Each arrow + heading + paragraph describes ONE part of the composite
 *    image. The arrows visually point from the text toward the image.
 *
 * Audit 2026-05-04 finding: the rebuild agent split this pattern into 2-3
 * separate `<FeatureFrame>` blocks each with its own image — destroying the
 * "one fused asset + multi-pointer text" relationship the live design
 * relies on. This story is the copy-paste reference.
 */
export const CompositeImageWithArrowedText: Story = {
  args: {
    imagePosition: "right",
    titleHighlight: "Une newsletter sponsor",
    title: "que votre direction va adorer",
    richContent: (
      <>
        <h5>→ Tendance des projets vitaux</h5>
        <p>
          Un récapitulatif de la santé des projets vitaux de votre
          organisation pour leur permettre de &ldquo;sentir&rdquo; la
          tendance du moment.
        </p>
        <h5>→ Tendance de leurs projets à eux</h5>
        <p>
          Un aperçu de leurs projets, ceux en amélioration et ceux en
          dégradation qui nécessitent leur attention. En un clic, ils
          peuvent accéder à la fiche projet.
        </p>
        <h5>→ Projets en retard d&apos;actualisation</h5>
        <p>
          Un rappel des projets qui méritent d&apos;être mis à jour. Si
          cette section est vide, vous êtes tranquilles !
        </p>
      </>
    ),
    imageSrc:
      "https://placehold.co/900x700/f3f3fc/3a51e2?text=Composite+image%0A%28fused+KPIs+%2B+project+table%29",
    imageAlt: "Composite — KPIs + project trend table fused into one image",
  },
};

/**
 * Editorial section with graphic illustration — canonical pattern.
 *
 * Mirrors the live live `/solution/gestion-portefeuille-projet` section
 * "Diminuez la frustration entre les métiers et l'IT" (audit finding
 * `[4.2.a]`) which uses a small schematic graphic + 3 paragraphs of
 * narrative text. Use `imageSize="narrow"` (33% image / 67% text) for
 * THIS pattern, NOT the `default` (60% image) which over-emphasizes the
 * illustration vs the text.
 *
 * Decision rule:
 * - `imageSize="default"` → product screenshot, image is the focal point
 * - `imageSize="compact"` → balanced screenshot + text
 * - `imageSize="narrow"` → editorial graphic illustration + multi-paragraph
 *    text. Text carries the message, image is supporting.
 */
export const EditorialIllustration: Story = {
  args: {
    imagePosition: "right",
    imageSize: "narrow",
    title: "Diminuez la frustration entre les métiers et l'IT",
    richContent: (
      <>
        <p>
          Vos équipes se plaignent du manque d&apos;engagement des métiers
          sur les projets demandés. Et du côté des métiers, la frustration
          se ressent sur les retards et la non-prise en compte de leurs
          demandes.
        </p>
        <p>
          AirSaas propose une structure commune à suivre pour la mise en
          place d&apos;un projet. La vue dashboard permet une compréhension
          partagée des contraintes de développement et une prise de décision
          collégiale par l&apos;organe de gouvernance.
        </p>
        <p>
          L&apos;outil place le collaboratif au premier plan et permet de
          faire remonter les problèmes rencontrés, les succès du parcours,
          partager les compte-rendus de réunions, etc. pour impliquer les
          équipes autour d&apos;un intérêt commun.
        </p>
      </>
    ),
    imageSrc:
      "https://placehold.co/600x800/e8eafc/3c51e2?text=Schéma+métiers↔IT",
    imageAlt: "Schéma illustratif de la collaboration entre métiers et IT",
  },
};
