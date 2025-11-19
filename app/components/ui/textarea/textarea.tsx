import { cn } from "@/lib/cn";

export type TextareaProps = React.ComponentProps<"textarea">;

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        '"flex border-input bg-background text-foreground file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring disabled:opacity-50" min-h-[80px] w-full resize-none rounded-md border px-3 py-2 text-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
