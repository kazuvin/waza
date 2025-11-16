import type { ReactNode } from "react";

type RightPanelProps = {
  title: string;
  children: ReactNode;
};

export function RightPanel({ title, children }: RightPanelProps) {
  return (
    <div className="bg-card/80 border-border flex h-3/4 flex-col overflow-hidden rounded-2xl border backdrop-blur-2xl">
      <div className="border-border shrink-0 border-b p-3">
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>

      <div className="overflow-y-auto px-3">{children}</div>
    </div>
  );
}
