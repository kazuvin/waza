import { cn } from "@/lib/cn";

export type PanelProps = {
  as?: "section" | "aside";
} & React.ComponentProps<"section">;
export type PanelHeaderProps = React.ComponentProps<"header">;
export type PanelTitleProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: React.ReactNode;
};
export type PanelContentProps = React.ComponentProps<"div">;
export type PanelFooterProps = React.ComponentProps<"footer">;

export function Panel({
  as: Component = "section",
  className,
  ...props
}: PanelProps) {
  return (
    <Component
      className={cn(
        "bg-card/80 flex h-3/4 flex-col overflow-hidden rounded-2xl border border-white backdrop-blur-2xl",
        className
      )}
      {...props}
    />
  );
}

export function PanelHeader({ className, ...props }: PanelHeaderProps) {
  return (
    <header
      className={cn("border-border shrink-0 border-b p-3", className)}
      {...props}
    />
  );
}

export function PanelTitle({
  as: Component = "h2",
  className,
  children,
}: PanelTitleProps) {
  return (
    <Component className={cn("text-sm font-bold", className)}>
      {children}
    </Component>
  );
}

export function PanelContent({ className, ...props }: PanelContentProps) {
  return <div className={cn("flex-1 overflow-y-auto", className)} {...props} />;
}

export function PanelFooter({ className, ...props }: PanelFooterProps) {
  return (
    <footer
      className={cn(
        "border-border bg-background/50 shrink-0 border-t p-3",
        className
      )}
      {...props}
    />
  );
}
