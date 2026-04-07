import { IconIllustration } from "@/ds/primitives/IconIllustration";
import { BullseyeArrowIcon, SuitcaseIcon, CalendarDayIcon } from "@/ds/primitives/icons/illustration-icons";

export function BullseyeIcon() {
  return (
    <IconIllustration variant="dark" size="sm">
      <BullseyeArrowIcon />
    </IconIllustration>
  );
}

export function BriefcaseIcon() {
  return (
    <IconIllustration variant="dark" size="sm">
      <SuitcaseIcon />
    </IconIllustration>
  );
}

export function CalendarIcon() {
  return (
    <IconIllustration variant="dark" size="sm">
      <CalendarDayIcon />
    </IconIllustration>
  );
}
