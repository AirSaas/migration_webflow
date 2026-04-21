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
