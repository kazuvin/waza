import * as React from "react";
import { cn } from "@/lib/cn";

export interface ButtonGroupItemProps
  extends React.ComponentProps<"button"> {
  active?: boolean;
}

function ButtonGroupItem({
  className,
  active = false,
  children,
  ...props
}: ButtonGroupItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/20 text-primary"
          : "hover:bg-card/20 text-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { ButtonGroupItem };
