"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button/button";
import { useSvgEditorContext } from "./contexts/svg-editor-context";

type EditorToolbarProps = {
  onSave: () => void;
};

const ZOOM_PRESETS = [
  { value: 0.25, label: "25%" },
  { value: 0.5, label: "50%" },
  { value: 0.75, label: "75%" },
  { value: 1, label: "100%" },
  { value: 1.25, label: "125%" },
  { value: 1.5, label: "150%" },
  { value: 2, label: "200%" },
  { value: 3, label: "300%" },
  { value: 4, label: "400%" },
];

export function EditorToolbar({ onSave }: EditorToolbarProps) {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    zoom,
    zoomIn,
    zoomOut,
    zoomTo,
    isCropMode,
    cropRect,
    toggleCropMode,
    applyCrop,
    svgData,
    originalViewBox,
  } = useSvgEditorContext();

  const [isZoomInputFocused, setIsZoomInputFocused] = useState(false);
  const [zoomInputValue, setZoomInputValue] = useState(
    Math.round(zoom * 100).toString()
  );

  // zoomが変更されたら入力値も更新（フォーカス中は除く）
  if (!isZoomInputFocused) {
    const newValue = Math.round(zoom * 100).toString();
    if (zoomInputValue !== newValue) {
      setZoomInputValue(newValue);
    }
  }

  const handleZoomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomInputValue(e.target.value);
  };

  const handleZoomInputBlur = () => {
    setIsZoomInputFocused(false);
    const value = parseInt(zoomInputValue, 10);
    if (!isNaN(value) && value > 0) {
      zoomTo(value / 100);
    } else {
      setZoomInputValue(Math.round(zoom * 100).toString());
    }
  };

  const handleZoomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <header
      role="banner"
      aria-label="エディターツールバー"
      className="flex items-center gap-4 border-b p-4"
    >
      <h1 className="text-lg font-semibold">SVGエディター</h1>

      {/* ズームコントロール */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={zoomOut}
          variant="outline"
          size="sm"
          aria-label="ズームアウト"
          title="ズームアウト"
        >
          -
        </Button>

        <div className="flex items-center gap-1">
          <input
            type="text"
            value={zoomInputValue}
            onChange={handleZoomInputChange}
            onFocus={() => setIsZoomInputFocused(true)}
            onBlur={handleZoomInputBlur}
            onKeyDown={handleZoomInputKeyDown}
            className="w-14 rounded border px-2 py-1 text-center text-sm"
            aria-label="ズームレベル (Cmd/Ctrl+Scroll または ピンチジェスチャー)"
            title="Cmd/Ctrl+Scroll または ピンチジェスチャーでズーム"
          />
          <span className="text-sm text-gray-600">%</span>
        </div>

        <Button
          type="button"
          onClick={zoomIn}
          variant="outline"
          size="sm"
          aria-label="ズームイン"
          title="ズームイン"
        >
          +
        </Button>

        <select
          value={zoom}
          onChange={(e) => zoomTo(parseFloat(e.target.value))}
          className="rounded border px-2 py-1 text-sm"
          aria-label="ズームプリセット"
        >
          {ZOOM_PRESETS.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      <div className="ml-auto flex gap-2">
        {/* クロップモード中の追加UI */}
        {isCropMode && (
          <div className="flex items-center gap-4 rounded bg-blue-50 px-3 py-1.5 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">全体:</span>
              <span className="font-mono text-gray-900">
                {(() => {
                  const originalParts = originalViewBox.split(" ").map(Number);
                  return `${Math.round(originalParts[2])} × ${Math.round(originalParts[3])}`;
                })()}
              </span>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              <span className="font-medium text-green-700">現在:</span>
              <span className="font-mono text-green-800">
                {(() => {
                  const viewBoxParts = svgData.viewBox.split(" ").map(Number);
                  return `${Math.round(viewBoxParts[2])} × ${Math.round(viewBoxParts[3])}`;
                })()}
              </span>
            </div>
            {cropRect && (
              <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
                <span className="font-medium text-blue-700">新しいクロップ:</span>
                <span className="font-mono text-blue-900">
                  {Math.round(cropRect.width)} × {Math.round(cropRect.height)}
                </span>
                <span className="text-xs text-gray-500">
                  (x: {Math.round(cropRect.x)}, y: {Math.round(cropRect.y)})
                </span>
              </div>
            )}
            {!cropRect && (
              <span className="text-gray-600">
                ドラッグして新しいクロップ範囲を選択
              </span>
            )}
          </div>
        )}

        <Button
          type="button"
          onClick={undo}
          disabled={!canUndo || isCropMode}
          variant="outline"
          size="sm"
          aria-label="元に戻す (Cmd+Z)"
          title="元に戻す (Cmd+Z)"
        >
          Undo
        </Button>

        <Button
          type="button"
          onClick={redo}
          disabled={!canRedo || isCropMode}
          variant="outline"
          size="sm"
          aria-label="やり直し (Cmd+Shift+Z)"
          title="やり直し (Cmd+Shift+Z)"
        >
          Redo
        </Button>

        {/* クロップボタン */}
        {!isCropMode ? (
          <Button
            type="button"
            onClick={toggleCropMode}
            variant="outline"
            size="sm"
            aria-label="クロップ"
            title="クロップ"
          >
            クロップ
          </Button>
        ) : (
          <>
            <Button
              type="button"
              onClick={applyCrop}
              disabled={!cropRect}
              variant="default"
              size="sm"
              aria-label="クロップを適用"
              title="クロップを適用"
            >
              適用
            </Button>
            <Button
              type="button"
              onClick={toggleCropMode}
              variant="outline"
              size="sm"
              aria-label="キャンセル"
              title="キャンセル"
            >
              キャンセル
            </Button>
          </>
        )}

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
