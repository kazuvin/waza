"use client";

import { ButtonGroup } from "@/app/components/ui/button-group/button-group";
import { ButtonGroupItem } from "@/app/components/ui/button-group/button-group-item";
import { useSvgEditorContext } from "./contexts/svg-editor-context";

export type HistoryToolbarProps = React.ComponentProps<"div">;

export function HistoryToolbar(props: HistoryToolbarProps) {
  const { canUndo, canRedo, isCropMode, undo, redo } = useSvgEditorContext();

  return (
    <div {...props}>
      <ButtonGroup>
        <ButtonGroupItem
          onClick={undo}
          disabled={!canUndo || isCropMode}
          aria-label="元に戻す (Cmd+Z)"
          title="元に戻す (Cmd+Z)"
        >
          ↶
        </ButtonGroupItem>
        <ButtonGroupItem
          onClick={redo}
          disabled={!canRedo || isCropMode}
          aria-label="やり直し (Cmd+Shift+Z)"
          title="やり直し (Cmd+Shift+Z)"
        >
          ↷
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  );
}
