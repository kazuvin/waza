"use client";

import { NumberInput } from "@/app/components/ui";
import { useSvgEditorSnapshot } from "../store";
import {
  setCropRect,
  setLockAspectRatio,
  applyCrop,
  toggleCropMode,
} from "../actions";
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

// 元のサイズ表示コンポーネント
function OriginalSizeDisplay() {
  const { originalViewBox } = useSvgEditorSnapshot();
  const originalParts = originalViewBox.split(" ").map(Number);
  const originalWidth = Math.round(originalParts[2]);
  const originalHeight = Math.round(originalParts[3]);

  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <div className="mb-2 text-xs font-medium text-gray-600">元のサイズ</div>
      <div className="font-mono text-sm font-semibold text-gray-900">
        {originalWidth} × {originalHeight} px
      </div>
    </div>
  );
}

// アスペクト比維持チェックボックス
function AspectRatioCheckbox() {
  const { lockAspectRatio } = useSvgEditorSnapshot();

  return (
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
  );
}

// 正方形ボタン
function MakeSquareButton() {
  const { cropRect } = useSvgEditorSnapshot();

  const handleMakeSquare = () => {
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
    <Button
      type="button"
      onClick={handleMakeSquare}
      variant="outline"
      size="sm"
      className="w-full"
    >
      正方形にする
    </Button>
  );
}

// クロップX座標入力
function CropXInput() {
  const { cropRect } = useSvgEditorSnapshot();

  if (!cropRect) return null;

  const handleChange = (value: number | undefined) => {
    if (value === undefined) return;
    setCropRect({ ...cropRect, x: value });
  };

  return (
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
        onChange={handleChange}
        className="mt-1"
      />
    </div>
  );
}

// クロップY座標入力
function CropYInput() {
  const { cropRect } = useSvgEditorSnapshot();

  if (!cropRect) return null;

  const handleChange = (value: number | undefined) => {
    if (value === undefined) return;
    setCropRect({ ...cropRect, y: value });
  };

  return (
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
        onChange={handleChange}
        className="mt-1"
      />
    </div>
  );
}

// クロップ幅入力
function CropWidthInput() {
  const { cropRect, lockAspectRatio } = useSvgEditorSnapshot();

  if (!cropRect) return null;

  const handleChange = (value: number | undefined) => {
    if (value === undefined) return;

    if (lockAspectRatio) {
      const aspectRatio = cropRect.width / cropRect.height;
      const newWidth = Math.max(10, value);
      const newHeight = newWidth / aspectRatio;
      setCropRect({
        ...cropRect,
        width: newWidth,
        height: newHeight,
      });
    } else {
      setCropRect({ ...cropRect, width: value });
    }
  };

  return (
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
        onChange={handleChange}
        className="mt-1"
      />
    </div>
  );
}

// クロップ高さ入力
function CropHeightInput() {
  const { cropRect, lockAspectRatio } = useSvgEditorSnapshot();

  if (!cropRect) return null;

  const handleChange = (value: number | undefined) => {
    if (value === undefined) return;

    if (lockAspectRatio) {
      const aspectRatio = cropRect.width / cropRect.height;
      const newHeight = Math.max(10, value);
      const newWidth = newHeight * aspectRatio;
      setCropRect({
        ...cropRect,
        width: newWidth,
        height: newHeight,
      });
    } else {
      setCropRect({ ...cropRect, height: value });
    }
  };

  return (
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
        onChange={handleChange}
        className="mt-1"
      />
    </div>
  );
}

// クロップサイズ表示
function CropSizeDisplay() {
  const { cropRect } = useSvgEditorSnapshot();

  if (!cropRect) return null;

  return (
    <div className="rounded bg-blue-100 p-2 text-xs text-blue-800">
      <div className="font-mono font-semibold">
        {Math.round(cropRect.width)} × {Math.round(cropRect.height)} px
      </div>
    </div>
  );
}

// クロップ範囲入力グリッド
function CropInputGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <CropXInput />
      <CropYInput />
      <CropWidthInput />
      <CropHeightInput />
    </div>
  );
}

// クロップ範囲設定の内容
function CropRectSettingsContent() {
  return (
    <>
      <AspectRatioCheckbox />
      <MakeSquareButton />
      <CropInputGrid />
      <CropSizeDisplay />
    </>
  );
}

// クロップ範囲設定の表示判定
function CropRectSettings() {
  const { cropRect } = useSvgEditorSnapshot();

  if (!cropRect) return null;

  return (
    <fieldset className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <legend className="px-2 text-sm font-semibold text-blue-900">
        クロップ範囲
      </legend>
      <CropRectSettingsContent />
    </fieldset>
  );
}

// ヘルプテキスト
function HelpText() {
  return (
    <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
      <p className="mb-2 font-medium">操作方法:</p>
      <ul className="list-disc space-y-1 pl-4">
        <li>ドラッグで範囲を選択</li>
        <li>範囲内をドラッグで移動</li>
        <li>ハンドルをドラッグでリサイズ</li>
        <li>テキスト入力で微調整</li>
      </ul>
    </div>
  );
}

// 適用ボタン
function ApplyButton() {
  const { cropRect } = useSvgEditorSnapshot();

  return (
    <Button
      type="button"
      onClick={() => applyCrop()}
      disabled={!cropRect}
      variant="default"
      className="w-full"
    >
      適用
    </Button>
  );
}

// キャンセルボタン
function CancelButton() {
  return (
    <Button
      type="button"
      onClick={() => toggleCropMode()}
      variant="outline"
      className="w-full"
    >
      キャンセル
    </Button>
  );
}

// クロップアクションボタン
function CropActions() {
  return (
    <div className="space-y-2">
      <ApplyButton />
      <CancelButton />
    </div>
  );
}

type CropPanelProps = {
  headingLevel?: PanelTitleProps["as"];
} & PanelProps;

export function CropPanel({ headingLevel = "h2", ...props }: CropPanelProps) {
  return (
    <Panel {...props}>
      <PanelHeader>
        <PanelTitle as={headingLevel}>クロップ設定</PanelTitle>
      </PanelHeader>
      <PanelContent className="space-y-6 p-3">
        <OriginalSizeDisplay />
        <CropRectSettings />
        <HelpText />
      </PanelContent>

      <PanelFooter>
        <CropActions />
      </PanelFooter>
    </Panel>
  );
}
