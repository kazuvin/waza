"use client";

import type { PathElement, SvgData } from "./svg-editor";

type PropertiesPanelProps = {
  svgData: SvgData;
  selectedPath: PathElement | undefined;
  onUpdatePath: (updates: Partial<PathElement>) => void;
  onUpdateCanvas: (
    updates: Partial<Pick<SvgData, "width" | "height" | "viewBox">>
  ) => void;
};

export function PropertiesPanel({
  svgData,
  selectedPath,
  onUpdatePath,
  onUpdateCanvas,
}: PropertiesPanelProps) {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold">プロパティ</h2>

      <form
        onSubmit={(e) => e.preventDefault()}
        aria-label="プロパティフォーム"
      >
        {/* キャンバス設定 */}
        <fieldset className="mb-6 space-y-4 border-b pb-6">
          <legend className="mb-2 text-sm font-medium">キャンバス設定</legend>

          <div>
            <label htmlFor="canvas-width" className="block text-sm font-medium">
              幅
            </label>
            <input
              id="canvas-width"
              type="number"
              value={svgData.width}
              onChange={(e) =>
                onUpdateCanvas({ width: Number(e.target.value) })
              }
              className="mt-1 w-full rounded border px-3 py-2 text-sm"
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
            <input
              id="canvas-height"
              type="number"
              value={svgData.height}
              onChange={(e) =>
                onUpdateCanvas({ height: Number(e.target.value) })
              }
              className="mt-1 w-full rounded border px-3 py-2 text-sm"
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
            <input
              id="canvas-viewbox"
              type="text"
              value={svgData.viewBox}
              onChange={(e) => onUpdateCanvas({ viewBox: e.target.value })}
              className="mt-1 w-full rounded border px-3 py-2 text-sm"
              aria-label="ViewBox属性"
            />
          </div>
        </fieldset>

        {/* パス設定 */}
        {selectedPath ? (
          <fieldset className="space-y-4">
            <legend className="mb-2 text-sm font-medium">選択中のパス</legend>

            <div>
              <label htmlFor="path-d" className="block text-sm font-medium">
                d属性（パス定義）
              </label>
              <textarea
                id="path-d"
                value={selectedPath.d}
                onChange={(e) => onUpdatePath({ d: e.target.value })}
                rows={4}
                className="mt-1 w-full rounded border px-3 py-2 font-mono text-sm"
                aria-label="パスのd属性"
              />
            </div>

            <div>
              <label htmlFor="path-fill" className="block text-sm font-medium">
                塗りつぶし色
              </label>
              <input
                id="path-fill"
                type="text"
                value={selectedPath.fill}
                onChange={(e) => onUpdatePath({ fill: e.target.value })}
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                aria-label="塗りつぶし色"
              />
              <input
                type="color"
                value={
                  selectedPath.fill === "none" ? "#000000" : selectedPath.fill
                }
                onChange={(e) => onUpdatePath({ fill: e.target.value })}
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
                onChange={(e) => onUpdatePath({ stroke: e.target.value })}
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
                onChange={(e) => onUpdatePath({ stroke: e.target.value })}
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
              <input
                id="path-stroke-width"
                type="number"
                value={selectedPath.strokeWidth}
                onChange={(e) =>
                  onUpdatePath({ strokeWidth: Number(e.target.value) })
                }
                min="0"
                step="0.5"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                aria-label="線の太さの値"
              />
            </div>
          </fieldset>
        ) : (
          <p className="text-sm text-gray-500">パスを選択してください</p>
        )}
      </form>
    </div>
  );
}
