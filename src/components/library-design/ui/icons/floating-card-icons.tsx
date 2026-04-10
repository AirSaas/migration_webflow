import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import { BullseyeArrowIcon, SuitcaseIcon, CalendarDayIcon } from "@/components/library-design/ui/icons/illustration-icons";

export function BullseyeIcon() {
  return (
    <IconIllustration variant="light" size="sm">
      <BullseyeArrowIcon />
    </IconIllustration>
  );
}

export function BriefcaseIcon() {
  return (
    <IconIllustration variant="light" size="sm">
      <SuitcaseIcon />
    </IconIllustration>
  );
}

export function CalendarIcon() {
  return (
    <IconIllustration variant="light" size="sm">
      <CalendarDayIcon />
    </IconIllustration>
  );
}
