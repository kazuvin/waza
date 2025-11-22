"use client";

import { Input, NumberInput, Textarea } from "@/app/components/ui";
import { useSvgEditorSnapshot } from "../store";
import { updateCanvas, updatePath, deletePath } from "../actions";
import {
  Panel,
  PanelProps,
  PanelHeader,
  PanelTitle,
  PanelTitleProps,
  PanelContent,
} from ".";

// キャンバス幅設定コンポーネント
function CanvasWidthInput() {
  const { history } = useSvgEditorSnapshot();
  return (
    <div>
      <label htmlFor="canvas-width" className="block text-sm font-medium">
        幅
      </label>
      <NumberInput
        id="canvas-width"
        value={history.present.width}
        onChange={(value) => updateCanvas({ width: value || 0 })}
        className="mt-1"
        aria-label="キャンバスの幅"
      />
    </div>
  );
}

// キャンバス高さ設定コンポーネント
function CanvasHeightInput() {
  const { history } = useSvgEditorSnapshot();
  return (
    <div>
      <label htmlFor="canvas-height" className="block text-sm font-medium">
        高さ
      </label>
      <NumberInput
        id="canvas-height"
        value={history.present.height}
        onChange={(value) => updateCanvas({ height: value || 0 })}
        className="mt-1"
        aria-label="キャンバスの高さ"
      />
    </div>
  );
}

// ViewBox設定コンポーネント
function ViewBoxInput() {
  const { history } = useSvgEditorSnapshot();
  return (
    <div>
      <label htmlFor="canvas-viewbox" className="block text-sm font-medium">
        ViewBox
      </label>
      <Input
        id="canvas-viewbox"
        type="text"
        value={history.present.viewBox}
        onChange={(e) => updateCanvas({ viewBox: e.target.value })}
        className="mt-1"
        aria-label="ViewBox属性"
      />
    </div>
  );
}

// キャンバス設定セクション
function CanvasSettings() {
  return (
    <fieldset className="border-border mb-6 space-y-4 border-b pt-3 pb-6">
      <legend className="text-sm font-medium">キャンバス設定</legend>
      <CanvasWidthInput />
      <CanvasHeightInput />
      <ViewBoxInput />
    </fieldset>
  );
}

// パスd属性入力コンポーネント
function PathDInput({ pathId, d }: { pathId: string; d: string }) {
  return (
    <div>
      <label htmlFor="path-d" className="block text-sm font-medium">
        d属性（パス定義）
      </label>
      <Textarea
        id="path-d"
        value={d}
        onChange={(e) => updatePath(pathId, { d: e.target.value })}
        rows={4}
        className="mt-1 font-mono"
        aria-label="パスのd属性"
      />
    </div>
  );
}

// パス塗りつぶし色入力コンポーネント
function PathFillInput({ pathId, fill }: { pathId: string; fill: string }) {
  return (
    <div>
      <label htmlFor="path-fill" className="block text-sm font-medium">
        塗りつぶし色
      </label>
      <input
        id="path-fill"
        type="text"
        value={fill}
        onChange={(e) => updatePath(pathId, { fill: e.target.value })}
        className="mt-1 w-full rounded border px-3 py-2 text-sm"
        aria-label="塗りつぶし色"
      />
      <input
        type="color"
        value={fill === "none" ? "#000000" : fill}
        onChange={(e) => updatePath(pathId, { fill: e.target.value })}
        className="mt-2 h-10 w-full rounded border"
        aria-label="塗りつぶし色の選択"
      />
    </div>
  );
}

// パス線色入力コンポーネント
function PathStrokeInput({
  pathId,
  stroke,
}: {
  pathId: string;
  stroke: string;
}) {
  return (
    <div>
      <label htmlFor="path-stroke" className="block text-sm font-medium">
        線の色
      </label>
      <input
        id="path-stroke"
        type="text"
        value={stroke}
        onChange={(e) => updatePath(pathId, { stroke: e.target.value })}
        className="mt-1 w-full rounded border px-3 py-2 text-sm"
        aria-label="線の色"
      />
      <input
        type="color"
        value={stroke === "none" ? "#000000" : stroke}
        onChange={(e) => updatePath(pathId, { stroke: e.target.value })}
        className="mt-2 h-10 w-full rounded border"
        aria-label="線の色の選択"
      />
    </div>
  );
}

// パス線幅入力コンポーネント
function PathStrokeWidthInput({
  pathId,
  strokeWidth,
}: {
  pathId: string;
  strokeWidth: number;
}) {
  return (
    <div>
      <label htmlFor="path-stroke-width" className="block text-sm font-medium">
        線の太さ
      </label>
      <NumberInput
        id="path-stroke-width"
        value={strokeWidth}
        onChange={(value) => updatePath(pathId, { strokeWidth: value || 0 })}
        allowDecimal
        decimalPlaces={1}
        className="mt-1"
        aria-label="線の太さの値"
      />
    </div>
  );
}

// パス削除ボタンコンポーネント
function DeletePathButton({ pathId }: { pathId: string }) {
  return (
    <button
      type="button"
      onClick={() => deletePath(pathId)}
      className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
      aria-label="選択中のパスを削除"
    >
      削除
    </button>
  );
}

// パス設定セクション
function PathSettings() {
  const { history, selectedPathId } = useSvgEditorSnapshot();
  const selectedPath = history.present.paths.find(
    (p) => p.id === selectedPathId
  );

  if (!selectedPath) {
    return <p className="text-sm text-gray-500">パスを選択してください</p>;
  }

  return (
    <fieldset className="space-y-4 pb-3">
      <div className="mb-4 flex items-center justify-between">
        <legend className="text-sm font-medium">選択中のパス</legend>
        <DeletePathButton pathId={selectedPath.id} />
      </div>

      <PathDInput pathId={selectedPath.id} d={selectedPath.d} />
      <PathFillInput pathId={selectedPath.id} fill={selectedPath.fill} />
      <PathStrokeInput pathId={selectedPath.id} stroke={selectedPath.stroke} />
      <PathStrokeWidthInput
        pathId={selectedPath.id}
        strokeWidth={selectedPath.strokeWidth}
      />
    </fieldset>
  );
}

type PropertiesPanelProps = {
  headingLevel?: PanelTitleProps["as"];
} & PanelProps;

export function PropertiesPanel({
  headingLevel = "h2",
  ...props
}: PropertiesPanelProps) {
  return (
    <Panel {...props}>
      <PanelHeader>
        <PanelTitle as={headingLevel}>プロパティ</PanelTitle>
      </PanelHeader>
      <PanelContent className="p-3">
        <form
          onSubmit={(e) => e.preventDefault()}
          aria-label="プロパティフォーム"
        >
          <CanvasSettings />
          <PathSettings />
        </form>
      </PanelContent>
    </Panel>
  );
}
