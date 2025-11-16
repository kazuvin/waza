"use client";

import { useSvgEditorContext } from "./contexts/svg-editor-context";

export function ModeToolbar() {
  const { isCropMode, toggleCropMode } = useSvgEditorContext();

  return (
    <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
      <div className="border-border bg-card/80 flex items-center gap-1 rounded-2xl border p-1 backdrop-blur-2xl">
        {/* カーソルモード */}
        <button
          type="button"
          onClick={() => isCropMode && toggleCropMode()}
          className={`flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            !isCropMode
              ? "bg-primary/20 text-primary"
              : "hover:bg-card/20 text-gray-700"
          }`}
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
        </button>

        {/* クロップモード */}
        <button
          type="button"
          onClick={() => !isCropMode && toggleCropMode()}
          className={`flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            isCropMode
              ? "bg-primary/20 text-primary"
              : "hover:bg-card/20 text-gray-700"
          }`}
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
        </button>
      </div>
    </div>
  );
}
