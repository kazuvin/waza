import * as React from "react";
import { cn } from "@/lib/cn";

export interface ButtonGroupItemProps
  extends React.ComponentProps<"button"> {
  active?: boolean;
}

function ButtonGroupItem({
  className,
  active = false,
  disabled = false,
  children,
  ...props
}: ButtonGroupItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
        disabled
          ? "cursor-not-allowed text-gray-300"
          : active
            ? "cursor-pointer bg-primary/20 text-primary"
            : "cursor-pointer text-gray-700 hover:bg-card/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { ButtonGroupItem };
