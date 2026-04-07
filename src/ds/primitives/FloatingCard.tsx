import { cn } from "@/ds/utils";
import { BullseyeIcon } from "@/ds/primitives/icons/floating-card-icons";

interface FloatingCardProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function PlaceholderContent({ icon }: { icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[0.888rem] p-[0.9375rem]">
      <div className="flex h-[3.198rem] w-[3.198rem] shrink-0 items-center justify-center rounded-[0.888rem] bg-primary-5">
        {icon ?? <BullseyeIcon />}
      </div>
      <div className="flex w-[7.9375rem] flex-col gap-[0.5625rem]">
        <div className="h-[0.6875rem] w-full rounded-full bg-border" />
        <div className="h-[0.6875rem] w-[5rem] rounded-full bg-bg-alt" />
      </div>
    </div>
  );
}

export function FloatingCard({ children, icon, className, style }: FloatingCardProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-white rounded-[1.2435rem] shadow-[0px_5.685px_34.108px_0px_rgba(0,0,0,0.08)]",
        className,
      )}
      style={style}
    >
      {children ?? <PlaceholderContent icon={icon} />}
    </div>
  );
}
