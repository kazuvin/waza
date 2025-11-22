"use client";

import { ButtonGroup } from "@/app/components/ui/button-group/button-group";
import { ButtonGroupItem } from "@/app/components/ui/button-group/button-group-item";
import { useSvgEditorContext } from "./contexts/svg-editor-context";

export type ZoomToolbarProps = React.ComponentProps<"div">;

export function ZoomToolbar(props: ZoomToolbarProps) {
  const { zoom, zoomIn, zoomOut } = useSvgEditorContext();

  const zoomPercent = `${Math.round(zoom * 100)}%`;

  return (
    <div {...props}>
      <ButtonGroup>
        <ButtonGroupItem
          onClick={zoomOut}
          aria-label="ズームアウト"
          title="ズームアウト"
        >
          −
        </ButtonGroupItem>
        <ButtonGroupItem aria-label={`現在のズーム: ${zoomPercent}`}>
          {zoomPercent}
        </ButtonGroupItem>
        <ButtonGroupItem
          onClick={zoomIn}
          aria-label="ズームイン"
          title="ズームイン"
        >
          +
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  );
}
