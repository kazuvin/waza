"use client";

import { ButtonGroup } from "@/app/components/ui/button-group/button-group";
import { ButtonGroupItem } from "@/app/components/ui/button-group/button-group-item";
import { svgEditorActions, getCanUndo, getCanRedo } from "./store";

export type HistoryToolbarProps = React.ComponentProps<"div">;

export function HistoryToolbar(props: HistoryToolbarProps) {
  const canUndo = getCanUndo();
  const canRedo = getCanRedo();

  return (
    <div {...props}>
      <ButtonGroup>
        <ButtonGroupItem
          onClick={() => svgEditorActions.undo()}
          disabled={!canUndo}
          aria-label="元に戻す (Cmd+Z)"
          title="元に戻す (Cmd+Z)"
        >
          ↶
        </ButtonGroupItem>
        <ButtonGroupItem
          onClick={() => svgEditorActions.redo()}
          disabled={!canRedo}
          aria-label="やり直し (Cmd+Shift+Z)"
          title="やり直し (Cmd+Shift+Z)"
        >
          ↷
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  );
}
