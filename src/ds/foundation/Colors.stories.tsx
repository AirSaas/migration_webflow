import type { Meta, StoryObj } from "@storybook/nextjs-vite";

function ColorSwatch({ name, token, hex }: { name: string; token: string; hex: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-[133px] h-[70px] rounded-lg border border-gray-200"
        style={{ backgroundColor: hex }}
      />
      <span className="text-xs font-medium text-foreground">{name}</span>
      <span className="text-[10px] text-text-muted font-mono">{hex}</span>
      <span className="text-[10px] text-text-muted font-mono">{token}</span>
    </div>
  );
}

function ColorGroup({ title, colors }: { title: string; colors: { name: string; token: string; hex: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <div className="flex flex-wrap gap-6">
        {colors.map((c) => (
          <ColorSwatch key={c.token} {...c} />
        ))}
      </div>
    </div>
  );
}

function ColorsPage() {
  return (
    <div className="flex flex-col gap-12 p-10">
      <h1 className="text-3xl font-extrabold text-foreground">Colors</h1>

      <ColorGroup
        title="Primary"
        colors={[
          { name: "Primary", token: "primary", hex: "#3a51e2" },
          { name: "Primary 70", token: "primary-70", hex: "#6b7be9" },
          { name: "Primary 60", token: "primary-60", hex: "#8a97ee" },
          { name: "Primary 20", token: "primary-20", hex: "#d1d5f5" },
          { name: "Primary 10", token: "primary-10", hex: "#e8eafc" },
          { name: "Primary 5", token: "primary-5", hex: "#f3f3fc" },
          { name: "Primary 2", token: "primary-2", hex: "#f8f9ff" },
        ]}
      />

      <ColorGroup
        title="Secondary (Text)"
        colors={[
          { name: "Foreground", token: "foreground", hex: "#041230" },
          { name: "Text Secondary", token: "text-secondary", hex: "#403e49" },
          { name: "Text Blog", token: "text-blog", hex: "#404249" },
          { name: "Text Muted", token: "text-muted", hex: "#63606e" },
        ]}
      />

      <ColorGroup
        title="Functional"
        colors={[
          { name: "Green", token: "green", hex: "#5ec045" },
          { name: "Crimson", token: "crimson", hex: "#f11444" },
          { name: "Orange", token: "orange", hex: "#e58d05" },
          { name: "Sky Blue", token: "sky-blue", hex: "#2db5e6" },
          { name: "Royal Blue", token: "royal-blue", hex: "#475ce9" },
          { name: "Orchid", token: "orchid", hex: "#b75dda" },
          { name: "Turquoise", token: "turquoise", hex: "#0fd6de" },
          { name: "Medium Blue", token: "medium-blue", hex: "#13397a" },
        ]}
      />

      <ColorGroup
        title="Backgrounds"
        colors={[
          { name: "Background", token: "background", hex: "#ffffff" },
          { name: "Bg Alt", token: "bg-alt", hex: "#f7f7f8" },
          { name: "Bg Light", token: "bg-light", hex: "#fafafc" },
          { name: "Bg Lavender", token: "bg-lavender", hex: "#f2f4ff" },
          { name: "Bg Seashell", token: "bg-seashell", hex: "#fef6ef" },
          { name: "Bg Warning", token: "bg-warning", hex: "#fff6d8" },
        ]}
      />

      <ColorGroup
        title="Borders & Misc"
        colors={[
          { name: "Border", token: "border", hex: "#e5e7ea" },
          { name: "Footer Bg", token: "footer-bg", hex: "#3a51e2" },
        ]}
      />

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-foreground">Gradients</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-[200px] h-[70px] rounded-lg"
              style={{
                backgroundImage:
                  "var(--gradient-dark-to-primary)",
              }}
            />
            <span className="text-xs font-medium">Dark to Primary</span>
            <span className="text-[10px] text-text-muted font-mono">
              gradient: dark-to-primary
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-[200px] h-[70px] rounded-lg"
              style={{
                backgroundImage:
                  "var(--gradient-primary)",
              }}
            />
            <span className="text-xs font-medium">Primary</span>
            <span className="text-[10px] text-text-muted font-mono">
              gradient: primary
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-[200px] h-[70px] rounded-lg"
              style={{
                backgroundImage:
                  "var(--gradient-hero-bg)",
              }}
            />
            <span className="text-xs font-medium">Hero / CTA Background</span>
            <span className="text-[10px] text-text-muted font-mono">
              GradientBackground variant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Foundation/Colors",
  component: ColorsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ColorsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
