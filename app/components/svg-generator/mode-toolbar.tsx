"use client";

import { ButtonGroup, ButtonGroupItem } from "@/app/components/ui";
import { useSvgEditorContext } from "./contexts/svg-editor-context";

export type ModeToolbarProps = React.ComponentProps<"div">;

export function ModeToolbar(props: ModeToolbarProps) {
  const { isCropMode, toggleCropMode } = useSvgEditorContext();

  return (
    <div {...props}>
      <ButtonGroup>
        {/* カーソルモード */}
        <ButtonGroupItem
          onClick={() => isCropMode && toggleCropMode()}
          active={!isCropMode}
          aria-label="カーソルモード"
          title="カーソルモード (V)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 3L13 8L8 9L6 14L3 3Z" fill="currentColor" />
          </svg>
          <span>カーソル</span>
        </ButtonGroupItem>

        {/* クロップモード */}
        <ButtonGroupItem
          onClick={() => !isCropMode && toggleCropMode()}
          active={isCropMode}
          aria-label="クロップモード"
          title="クロップモード (C)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 3V2H12V3H15V4H12V11H13V12H12V15H11V12H4V11H11V4H4V5H3V4H0V3H3V2H4V3H11Z"
              fill="currentColor"
            />
          </svg>
          <span>クロップ</span>
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  );
}
