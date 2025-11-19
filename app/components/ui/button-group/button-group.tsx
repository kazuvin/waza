import * as React from "react";
import { cn } from "@/lib/cn";
import {
  getButtonGroupClasses,
  type ButtonGroupVariant,
} from "./variants";

export interface ButtonGroupProps extends React.ComponentProps<"div"> {
  variant?: ButtonGroupVariant;
}

function ButtonGroup({
  className,
  variant = "default",
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={cn(getButtonGroupClasses({ variant }), className)}
      role="group"
      {...props}
    >
      {children}
    </div>
  );
}

export { ButtonGroup };
