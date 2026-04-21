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
          { name: "Primary", token: "primary", hex: "#3c51e2" },
          { name: "Primary 70", token: "primary-70", hex: "#6b7be9" },
          { name: "Primary 60", token: "primary-60", hex: "#8a97ee" },
          { name: "Primary 40", token: "primary-40", hex: "#b1b9f3" },
          { name: "Primary 20", token: "primary-20", hex: "#d1d5f5" },
          { name: "Primary 10", token: "primary-10", hex: "#e8ebfe" },
          { name: "Primary 5", token: "primary-5", hex: "#f3f3fc" },
          { name: "Primary 2", token: "primary-2", hex: "#f8f9ff" },
        ]}
      />

      <ColorGroup
        title="Secondary"
        colors={[
          { name: "Secondary", token: "secondary", hex: "#061333" },
          { name: "Secondary 70", token: "secondary-70", hex: "#50596f" },
          { name: "Secondary 50", token: "secondary-50", hex: "#8d94a3" },
          { name: "Secondary 40", token: "secondary-40", hex: "#a6aab6" },
          { name: "Secondary 20", token: "secondary-20", hex: "#d2d6dc" },
          { name: "Secondary 10", token: "secondary-10", hex: "#e5e7ea" },
          { name: "Secondary 5", token: "secondary-5", hex: "#eef1f4" },
          { name: "Secondary 2", token: "secondary-2", hex: "#fafafb" },
        ]}
      />

      <ColorGroup
        title="Text"
        colors={[
          { name: "Text h", token: "foreground", hex: "#040d22" },
          { name: "Text p", token: "text-p", hex: "#535b6f" },
          { name: "Text Secondary", token: "text-secondary", hex: "#403e49" },
          { name: "Text Muted", token: "text-muted", hex: "#63606e" },
        ]}
      />

      <ColorGroup
        title="Status & Accents"
        colors={[
          { name: "Success", token: "success", hex: "#03e26b" },
          { name: "Warning", token: "warning", hex: "#ff0a55" },
          { name: "Prevention", token: "prevention", hex: "#ffd43b" },
          { name: "Orange", token: "orange", hex: "#ff922b" },
          { name: "Terracotta", token: "terracotta", hex: "#d9480f" },
        ]}
      />

      <ColorGroup
        title="Status Variants"
        colors={[
          { name: "Success 40", token: "success-40", hex: "#94d5c1" },
          { name: "Success 20", token: "success-20", hex: "#cdf9e1" },
          { name: "Success 10", token: "success-10", hex: "#e6fcf0" },
          { name: "Warning 40", token: "warning-40", hex: "#ff8dab" },
          { name: "Warning 10", token: "warning-10", hex: "#ffe7ee" },
          { name: "Warning 5", token: "warning-5", hex: "#fff3f7" },
          { name: "Orange 70", token: "orange-70", hex: "#ffa959" },
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
