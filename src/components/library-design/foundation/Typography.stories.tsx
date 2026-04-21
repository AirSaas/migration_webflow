import type { Meta, StoryObj } from "@storybook/nextjs-vite";

function TypoSample({
  label,
  size,
  weight,
  lineHeight,
  children,
}: {
  label: string;
  size: string;
  weight: string;
  lineHeight?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 pb-6 border-b border-gray-100">
      <span className="text-sm font-medium text-crimson">{label}</span>
      <div style={{ fontSize: size, fontWeight: weight, lineHeight: lineHeight ?? "normal" }}>
        {children}
      </div>
      <span className="text-xs text-text-muted font-mono mt-1">
        Product Sans {weight} — {size}
        {lineHeight ? ` / line-height: ${lineHeight}` : ""}
      </span>
    </div>
  );
}

function TypographyPage() {
  return (
    <div className="flex flex-col gap-10 p-10 max-w-[1200px]">
      <h1 className="text-3xl font-extrabold text-foreground">Typography</h1>

      {/* Font families */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-foreground">Font Weights</h2>
        <div className="flex flex-col gap-3">
          <p style={{ fontWeight: 300 }} className="text-xl">
            Product Sans Light (300) — Used for body text and paragraphs
          </p>
          <p style={{ fontWeight: 400 }} className="text-xl">
            Product Sans Regular (400) — Used for links and UI text
          </p>
          <p style={{ fontWeight: 700 }} className="text-xl">
            Product Sans Bold (700) — Used for H4 headings and emphasis
          </p>
          <p style={{ fontWeight: 800 }} className="text-xl">
            Product Sans ExtraBold (800) — Used for H1, H2, H3 headings
          </p>
        </div>
      </div>

      {/* Heading scale */}
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold text-foreground">Heading Scale</h2>

        <TypoSample label="H1" size="var(--text-h1)" weight="800" lineHeight="0.95">
          Product Sans Black 95px
        </TypoSample>

        <TypoSample label="H2" size="var(--text-h2)" weight="800" lineHeight="1.1">
          Product Sans Black 72px
        </TypoSample>

        <TypoSample label="H3" size="var(--text-h3)" weight="800" lineHeight="1.18">
          Product Sans Black 70px
        </TypoSample>

        <TypoSample label="H4" size="var(--text-h4)" weight="700" lineHeight="1.2">
          Product Sans Bold 40px
        </TypoSample>

        <TypoSample label="Paragraph" size="var(--text-paragraph)" weight="300" lineHeight="1.4">
          Product Sans Light 25px — AirSaas vous donne une vue capacitaire claire et actionnable.
          Enfin un outil pour dire &quot;non&quot; avec des données, pas au feeling.
        </TypoSample>

        <TypoSample label="Links" size="var(--text-paragraph)" weight="300" lineHeight="1.4">
          <span className="text-primary underline">
            Product Sans Light 25px — Link style
          </span>
        </TypoSample>
      </div>

      {/* Gradient text */}
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold text-foreground">Gradient Text</h2>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-crimson">Dark to Primary gradient</span>
          <p
            className="text-[clamp(2rem,4vw,4.5rem)] font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-dark-to-primary)",
            }}
          >
            Les chiffres qui vous feront adopter AirSaas
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-crimson">Primary gradient</span>
          <p
            className="text-[clamp(2rem,4vw,4.5rem)] font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
            }}
          >
            personne ne sait ce qu&apos;elles peuvent vraiment faire.
          </p>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Foundation/Typography",
  component: TypographyPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TypographyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
