"use client";

import { NumberInput } from "@/app/components/ui";
import { svgEditorActions, useSvgEditorSnapshot } from "../store";
import {
  Panel,
  PanelProps,
  PanelHeader,
  PanelTitle,
  PanelTitleProps,
  PanelContent,
  PanelFooter,
} from ".";
import { Button } from "@/app/components/ui/button/button";

type CropPanelProps = {
  headingLevel?: PanelTitleProps["as"];
} & PanelProps;

export function CropPanel({ headingLevel = "h2", ...props }: CropPanelProps) {
  const { originalViewBox, cropRect, lockAspectRatio } =
    useSvgEditorSnapshot();

  // 元のviewBoxのサイズを取得
  const originalParts = originalViewBox.split(" ").map(Number);
  const originalWidth = Math.round(originalParts[2]);
  const originalHeight = Math.round(originalParts[3]);

  // クロップ範囲の値を更新
  const handleCropChange = (
    field: "x" | "y" | "width" | "height",
    value: number | undefined
  ) => {
    if (!cropRect || value === undefined) return;

    // アスペクト比を維持する場合
    if (lockAspectRatio && (field === "width" || field === "height")) {
      const aspectRatio = cropRect.width / cropRect.height;

      if (field === "width") {
        const newWidth = Math.max(10, value);
        const newHeight = newWidth / aspectRatio;
        svgEditorActions.setCropRect({
          ...cropRect,
          width: newWidth,
          height: newHeight,
        });
      } else {
        const newHeight = Math.max(10, value);
        const newWidth = newHeight * aspectRatio;
        svgEditorActions.setCropRect({
          ...cropRect,
          width: newWidth,
          height: newHeight,
        });
      }
    } else {
      svgEditorActions.setCropRect({
        ...cropRect,
        [field]: value,
      });
    }
  };

  // 正方形にする
  const makeSquare = () => {
    if (!cropRect) return;

    const size = Math.min(cropRect.width, cropRect.height);
    svgEditorActions.setCropRect({
      ...cropRect,
      width: size,
      height: size,
    });
    svgEditorActions.setLockAspectRatio(true);
  };

  return (
    <Panel {...props}>
      <PanelHeader>
        <PanelTitle as={headingLevel}>クロップ設定</PanelTitle>
      </PanelHeader>
      <PanelContent className="space-y-6 p-3">
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
                onChange={(e) => svgEditorActions.setLockAspectRatio(e.target.checked)}
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
                <NumberInput
                  id="crop-x"
                  value={Math.round(cropRect.x)}
                  onChange={(value) => handleCropChange("x", value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="crop-y"
                  className="block text-xs font-medium text-gray-700"
                >
                  Y座標
                </label>
                <NumberInput
                  id="crop-y"
                  value={Math.round(cropRect.y)}
                  onChange={(value) => handleCropChange("y", value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="crop-width"
                  className="block text-xs font-medium text-gray-700"
                >
                  幅
                </label>
                <NumberInput
                  id="crop-width"
                  value={Math.round(cropRect.width)}
                  onChange={(value) => handleCropChange("width", value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="crop-height"
                  className="block text-xs font-medium text-gray-700"
                >
                  高さ
                </label>
                <NumberInput
                  id="crop-height"
                  value={Math.round(cropRect.height)}
                  onChange={(value) => handleCropChange("height", value)}
                  className="mt-1"
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

        {/* ヘルプテキスト */}
        <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
          <p className="mb-2 font-medium">操作方法:</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>ドラッグで範囲を選択</li>
            <li>範囲内をドラッグで移動</li>
            <li>ハンドルをドラッグでリサイズ</li>
            <li>テキスト入力で微調整</li>
          </ul>
        </div>
      </PanelContent>

      <PanelFooter>
        <div className="space-y-2">
          <Button
            type="button"
            onClick={() => svgEditorActions.applyCrop()}
            disabled={!cropRect}
            variant="default"
            className="w-full"
          >
            適用
          </Button>
          <Button
            type="button"
            onClick={() => svgEditorActions.toggleCropMode()}
            variant="outline"
            className="w-full"
          >
            キャンセル
          </Button>
        </div>
      </PanelFooter>
    </Panel>
  );
}
