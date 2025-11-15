import { Button } from "@/app/components/ui/button/button";
import type { EditorMode } from "./lp-editor";

type EditorToolbarProps = {
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
  onSave?: () => void;
  onPublish?: () => void;
};

export function EditorToolbar({
  mode,
  onModeChange,
  onSave,
  onPublish,
}: EditorToolbarProps) {
  return (
    <div className="bg-background border-border sticky top-0 z-50 border-b">
      <div className="flex h-16 items-center justify-between px-12">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">LP Editor</h1>
          <div
            className="bg-muted inline-flex rounded-lg p-1"
            role="tablist"
            aria-label="Editor mode"
          >
            <button
              role="tab"
              aria-selected={mode === "view"}
              aria-controls="editor-content"
              onClick={() => onModeChange("view")}
              className={`focus-visible:ring-ring rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                mode === "view"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              }`}
            >
              View Mode
            </button>
            <button
              role="tab"
              aria-selected={mode === "edit"}
              aria-controls="editor-content"
              onClick={() => onModeChange("edit")}
              className={`focus-visible:ring-ring rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                mode === "edit"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              }`}
            >
              Edit Mode
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="default" onClick={onSave}>
            Save Draft
          </Button>
          <Button variant="default" size="default" onClick={onPublish}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
