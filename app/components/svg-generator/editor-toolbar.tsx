"use client";

import { Button } from "@/app/components/ui/button/button";
import { useSvgEditorContext } from "./contexts/svg-editor-context";

type EditorToolbarProps = {
  onSave: () => void;
};

export function EditorToolbar({ onSave }: EditorToolbarProps) {
  const { isCropMode } = useSvgEditorContext();

  return (
    <header
      role="banner"
      aria-label="エディターツールバー"
      className="flex items-center gap-4 border-b p-4"
    >
      <h1 className="text-lg font-semibold">SVGエディター</h1>

      <div className="ml-auto flex gap-2">
        <Button
          type="button"
          onClick={onSave}
          disabled={isCropMode}
          variant="default"
          size="sm"
          aria-label="保存"
        >
          保存
        </Button>
      </div>
    </header>
  );
}
