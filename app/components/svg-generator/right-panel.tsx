import type { ReactNode } from "react";

type RightPanelProps = {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function RightPanel({ title, children, footer }: RightPanelProps) {
  return (
    <div className="bg-card/80 border-border flex h-3/4 flex-col overflow-hidden rounded-2xl border backdrop-blur-2xl">
      <div className="border-border shrink-0 border-b p-3">
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-3">{children}</div>

      {footer && (
        <div className="border-border bg-background/50 shrink-0 border-t p-3">
          {footer}
        </div>
      )}
    </div>
  );
}
