import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconRowFrame } from "./IconRowFrame";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import {
  ArrowsRotateIcon,
  AtomIcon,
  DollyIcon,
  ClipboardCheckIcon,
  FlagCheckeredIcon,
  FilePenIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

function Icon({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  return (
    <IconIllustration variant={variant} size="lg">
      {children}
    </IconIllustration>
  );
}

const meta = {
  title: "Sections/Value Proposition Sections/ValuePropositionFrame/Icons",
  component: IconRowFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof IconRowFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * "Icons" layout — the icons are the visual protagonists.
 * A row of design-system icons (duotone + drop-shadow + ellipse base)
 * arranged in a gentle zigzag pattern, each labelled with a single term.
 */
export const Default: Story = {
  args: {
    singleTitle: "AirSaas : l'outil PPM nouvelle génération",
    subtitle:
      "La transformation de votre entreprise mérite un outil PPM qui vous aide à dépasser les problèmes les plus fréquents en gestion de portefeuille.",
    items: [
      { icon: <Icon><ArrowsRotateIcon /></Icon>, label: "Quarter Plan" },
      { icon: <Icon><AtomIcon /></Icon>, label: "Portfolio" },
      { icon: <Icon><DollyIcon /></Icon>, label: "Capacitaire" },
      { icon: <Icon><ClipboardCheckIcon /></Icon>, label: "Priorisation" },
      { icon: <Icon><FlagCheckeredIcon /></Icon>, label: "Roadmap" },
      { icon: <Icon><FilePenIcon /></Icon>, label: "Reporting" },
    ],
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    singleTitle: "AirSaas : l'outil PPM nouvelle génération",
    subtitle:
      "La transformation de votre entreprise mérite un outil PPM qui vous aide à dépasser les problèmes les plus fréquents en gestion de portefeuille.",
    items: [
      { icon: <Icon variant="light"><ArrowsRotateIcon color="white" /></Icon>, label: "Quarter Plan" },
      { icon: <Icon variant="light"><AtomIcon color="white" /></Icon>, label: "Portfolio" },
      { icon: <Icon variant="light"><DollyIcon color="white" /></Icon>, label: "Capacitaire" },
      { icon: <Icon variant="light"><ClipboardCheckIcon color="white" /></Icon>, label: "Priorisation" },
      { icon: <Icon variant="light"><FlagCheckeredIcon color="white" /></Icon>, label: "Roadmap" },
      { icon: <Icon variant="light"><FilePenIcon color="white" /></Icon>, label: "Reporting" },
    ],
  },
};
