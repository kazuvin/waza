export type ButtonGroupVariant = keyof typeof variantClasses;

interface ButtonGroupVariants {
  variant: ButtonGroupVariant;
}

export const baseClasses =
  "flex items-center gap-1 rounded-2xl border p-1 backdrop-blur-2xl";

export const variantClasses = {
  default: "bg-card/80 border-white",
  solid: "bg-card border-border",
  outline: "bg-transparent border-border",
};

export function getButtonGroupClasses({
  variant,
}: ButtonGroupVariants): string {
  return `${baseClasses} ${variantClasses[variant]}`;
}
