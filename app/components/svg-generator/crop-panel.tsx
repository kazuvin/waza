"use client";

import { useSvgEditorContext } from "./contexts/svg-editor-context";
import { RightPanel } from "./right-panel";
import { Button } from "@/app/components/ui/button/button";

export function CropPanel() {
  const {
    svgData,
    originalViewBox,
    cropRect,
    setCropRect,
    applyCrop,
    toggleCropMode,
    lockAspectRatio,
    setLockAspectRatio,
  } = useSvgEditorContext();

  // 元のviewBoxのサイズを取得
  const originalParts = originalViewBox.split(" ").map(Number);
  const originalWidth = Math.round(originalParts[2]);
  const originalHeight = Math.round(originalParts[3]);

  // クロップ範囲の値を更新
  const handleCropChange = (
    field: "x" | "y" | "width" | "height",
    value: string
  ) => {
    if (!cropRect) return;

    const numValue = Number(value);
    if (isNaN(numValue)) return;

    // アスペクト比を維持する場合
    if (lockAspectRatio && (field === "width" || field === "height")) {
      const aspectRatio = cropRect.width / cropRect.height;

      if (field === "width") {
        const newWidth = Math.max(10, numValue);
        const newHeight = newWidth / aspectRatio;
        setCropRect({
          ...cropRect,
          width: newWidth,
          height: newHeight,
        });
      } else {
        const newHeight = Math.max(10, numValue);
        const newWidth = newHeight * aspectRatio;
        setCropRect({
          ...cropRect,
          width: newWidth,
          height: newHeight,
        });
      }
    } else {
      setCropRect({
        ...cropRect,
        [field]: numValue,
      });
    }
  };

  // 正方形にする
  const makeSquare = () => {
    if (!cropRect) return;

    const size = Math.min(cropRect.width, cropRect.height);
    setCropRect({
      ...cropRect,
      width: size,
      height: size,
    });
    setLockAspectRatio(true);
  };

  return (
    <RightPanel title="クロップ設定">
      <div className="space-y-6 py-3">
        {/* サイズ情報 */}
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="mb-2 text-xs font-medium text-gray-600">
            元のサイズ
          </div>
          <div className="font-mono text-sm font-semibold text-gray-900">
            {originalWidth} × {originalHeight} px
          </div>
        </div>

        {/* クロップ範囲入力 */}
        {cropRect ? (
          <fieldset className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <legend className="px-2 text-sm font-semibold text-blue-900">
              クロップ範囲
            </legend>

            {/* アスペクト比維持チェックボックス */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="lock-aspect-ratio"
                checked={lockAspectRatio}
                onChange={(e) => setLockAspectRatio(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label
                htmlFor="lock-aspect-ratio"
                className="text-sm font-medium text-gray-700"
              >
                アスペクト比を維持
              </label>
            </div>

            {/* 正方形ボタン */}
            <Button
              type="button"
              onClick={makeSquare}
              variant="outline"
              size="sm"
              className="w-full"
            >
              正方形にする
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="crop-x"
                  className="block text-xs font-medium text-gray-700"
                >
                  X座標
                </label>
                <input
                  id="crop-x"
                  type="number"
                  value={Math.round(cropRect.x)}
                  onChange={(e) => handleCropChange("x", e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                  step="1"
                />
              </div>

              <div>
                <label
                  htmlFor="crop-y"
                  className="block text-xs font-medium text-gray-700"
                >
                  Y座標
                </label>
                <input
                  id="crop-y"
                  type="number"
                  value={Math.round(cropRect.y)}
                  onChange={(e) => handleCropChange("y", e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                  step="1"
                />
              </div>

              <div>
                <label
                  htmlFor="crop-width"
                  className="block text-xs font-medium text-gray-700"
                >
                  幅
                </label>
                <input
                  id="crop-width"
                  type="number"
                  value={Math.round(cropRect.width)}
                  onChange={(e) => handleCropChange("width", e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                  min="10"
                  step="1"
                />
              </div>

              <div>
                <label
                  htmlFor="crop-height"
                  className="block text-xs font-medium text-gray-700"
                >
                  高さ
                </label>
                <input
                  id="crop-height"
                  type="number"
                  value={Math.round(cropRect.height)}
                  onChange={(e) => handleCropChange("height", e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                  min="10"
                  step="1"
                />
              </div>
            </div>

            <div className="rounded bg-blue-100 p-2 text-xs text-blue-800">
              <div className="font-mono font-semibold">
                {Math.round(cropRect.width)} × {Math.round(cropRect.height)} px
              </div>
            </div>
          </fieldset>
        ) : null}

        {/* アクションボタン */}
        <div className="space-y-2 pt-2">
          <Button
            type="button"
            onClick={applyCrop}
            disabled={!cropRect}
            variant="default"
            className="w-full"
          >
            適用
          </Button>
          <Button
            type="button"
            onClick={toggleCropMode}
            variant="outline"
            className="w-full"
          >
            キャンセル
          </Button>
        </div>

        {/* ヘルプテキスト */}
        <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
          <p className="mb-2 font-medium">操作方法:</p>
          <ul className="space-y-1 pl-4 list-disc">
            <li>ドラッグで範囲を選択</li>
            <li>範囲内をドラッグで移動</li>
            <li>ハンドルをドラッグでリサイズ</li>
            <li>テキスト入力で微調整</li>
          </ul>
        </div>
      </div>
    </RightPanel>
  );
}
