"use client";

type EditorToolbarProps = {
  onSave: () => void;
};

export function EditorToolbar({ onSave }: EditorToolbarProps) {
  return (
    <header
      role="banner"
      aria-label="エディターツールバー"
      className="flex items-center gap-4 border-b p-4"
    >
      <h1 className="text-lg font-semibold">SVGエディター</h1>

      <div className="ml-auto flex gap-2">
        <button
          type="button"
          onClick={onSave}
          aria-label="保存"
          className="rounded px-3 py-2 text-sm"
        >
          保存
        </button>
      </div>
    </header>
  );
}
