"use client";

import { Input, NumberInput, Textarea } from "@/app/components/ui";
import { useSvgEditorContext } from "../contexts/svg-editor-context";
import {
  Panel,
  PanelProps,
  PanelHeader,
  PanelTitle,
  PanelTitleProps,
  PanelContent,
} from ".";

type PropertiesPanelProps = {
  headingLevel?: PanelTitleProps["as"];
} & PanelProps;

export function PropertiesPanel({
  headingLevel = "h2",
  ...props
}: PropertiesPanelProps) {
  const {
    svgData,
    selectedPath,
    selectedPathId,
    updatePath,
    updateCanvas,
    deletePath,
  } = useSvgEditorContext();
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
          {/* キャンバス設定 */}
          <fieldset className="border-border mb-6 space-y-4 border-b pt-3 pb-6">
            <legend className="text-sm font-medium">キャンバス設定</legend>

            <div>
              <label
                htmlFor="canvas-width"
                className="block text-sm font-medium"
              >
                幅
              </label>
              <NumberInput
                id="canvas-width"
                value={svgData.width}
                onChange={(value) => updateCanvas({ width: value || 0 })}
                className="mt-1"
                aria-label="キャンバスの幅"
              />
            </div>

            <div>
              <label
                htmlFor="canvas-height"
                className="block text-sm font-medium"
              >
                高さ
              </label>
              <NumberInput
                id="canvas-height"
                value={svgData.height}
                onChange={(value) => updateCanvas({ height: value || 0 })}
                className="mt-1"
                aria-label="キャンバスの高さ"
              />
            </div>

            <div>
              <label
                htmlFor="canvas-viewbox"
                className="block text-sm font-medium"
              >
                ViewBox
              </label>
              <Input
                id="canvas-viewbox"
                type="text"
                value={svgData.viewBox}
                onChange={(e) => updateCanvas({ viewBox: e.target.value })}
                className="mt-1"
                aria-label="ViewBox属性"
              />
            </div>
          </fieldset>

          {/* パス設定 */}
          {selectedPath ? (
            <fieldset className="space-y-4 pb-3">
              <div className="mb-4 flex items-center justify-between">
                <legend className="text-sm font-medium">選択中のパス</legend>
                {selectedPathId && (
                  <button
                    type="button"
                    onClick={() => deletePath(selectedPathId)}
                    className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                    aria-label="選択中のパスを削除"
                  >
                    削除
                  </button>
                )}
              </div>

              <div>
                <label htmlFor="path-d" className="block text-sm font-medium">
                  d属性（パス定義）
                </label>
                <Textarea
                  id="path-d"
                  value={selectedPath.d}
                  onChange={(e) =>
                    updatePath(selectedPath.id, { d: e.target.value })
                  }
                  rows={4}
                  className="mt-1 font-mono"
                  aria-label="パスのd属性"
                />
              </div>

              <div>
                <label
                  htmlFor="path-fill"
                  className="block text-sm font-medium"
                >
                  塗りつぶし色
                </label>
                <input
                  id="path-fill"
                  type="text"
                  value={selectedPath.fill}
                  onChange={(e) =>
                    updatePath(selectedPath.id, { fill: e.target.value })
                  }
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  aria-label="塗りつぶし色"
                />
                <input
                  type="color"
                  value={
                    selectedPath.fill === "none" ? "#000000" : selectedPath.fill
                  }
                  onChange={(e) =>
                    updatePath(selectedPath.id, { fill: e.target.value })
                  }
                  className="mt-2 h-10 w-full rounded border"
                  aria-label="塗りつぶし色の選択"
                />
              </div>

              <div>
                <label
                  htmlFor="path-stroke"
                  className="block text-sm font-medium"
                >
                  線の色
                </label>
                <input
                  id="path-stroke"
                  type="text"
                  value={selectedPath.stroke}
                  onChange={(e) =>
                    updatePath(selectedPath.id, { stroke: e.target.value })
                  }
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  aria-label="線の色"
                />
                <input
                  type="color"
                  value={
                    selectedPath.stroke === "none"
                      ? "#000000"
                      : selectedPath.stroke
                  }
                  onChange={(e) =>
                    updatePath(selectedPath.id, { stroke: e.target.value })
                  }
                  className="mt-2 h-10 w-full rounded border"
                  aria-label="線の色の選択"
                />
              </div>

              <div>
                <label
                  htmlFor="path-stroke-width"
                  className="block text-sm font-medium"
                >
                  線の太さ
                </label>
                <NumberInput
                  id="path-stroke-width"
                  value={selectedPath.strokeWidth}
                  onChange={(value) =>
                    updatePath(selectedPath.id, {
                      strokeWidth: value || 0,
                    })
                  }
                  allowDecimal
                  decimalPlaces={1}
                  className="mt-1"
                  aria-label="線の太さの値"
                />
              </div>
            </fieldset>
          ) : (
            <p className="text-sm text-gray-500">パスを選択してください</p>
          )}
        </form>
      </PanelContent>
    </Panel>
  );
}
