"use client";

import { useSvgEditorContext } from "./contexts/svg-editor-context";
import type { PathElement } from "./svg-editor";

export function PathList() {
  const { svgData, selectedPathId, setSelectedPathId } = useSvgEditorContext();

  const handlePathClick = (pathId: string) => {
    setSelectedPathId(pathId);
  };

  const getPathPreview = (path: PathElement) => {
    // パスのdを短縮して表示
    const dPreview =
      path.d.length > 30 ? `${path.d.substring(0, 30)}...` : path.d;
    return dPreview;
  };

  return (
    <div className="border-border bg-card rounded-2xl border">
      <div className="border-border border-b p-3">
        <h2 className="text-sm font-semibold">パス一覧</h2>
        <p className="text-xs text-gray-500">{svgData.paths.length}個のパス</p>
      </div>

      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 240px)" }}
      >
        {svgData.paths.map((path, index) => (
          <div
            key={path.id}
            onClick={() => handlePathClick(path.id)}
            className={`border-border cursor-pointer border-b p-3 transition-colors hover:bg-gray-100 ${
              selectedPathId === path.id
                ? "border-l-4 border-l-blue-500 bg-blue-50"
                : "border-l-4 border-l-transparent"
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">
                パス {index + 1}
              </span>
              {selectedPathId === path.id && (
                <span className="rounded bg-blue-500 py-0.5 text-xs text-white">
                  選択中
                </span>
              )}
            </div>

            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-4 w-4 rounded border border-gray-300"
                style={{ backgroundColor: path.fill }}
                title={`fill: ${path.fill}`}
              />
              <span className="text-xs text-gray-600">{path.fill}</span>
            </div>

            {path.stroke && path.stroke !== "none" && (
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded border"
                  style={{ backgroundColor: path.stroke }}
                  title={`stroke: ${path.stroke}`}
                />
                <span className="text-xs text-gray-600">
                  {path.stroke} ({path.strokeWidth}px)
                </span>
              </div>
            )}

            <div className="font-mono text-xs text-gray-400">
              {getPathPreview(path)}
            </div>
          </div>
        ))}
      </div>

      {svgData.paths.length === 0 && (
        <div className="flex h-32 items-center justify-center text-sm text-gray-400">
          パスがありません
        </div>
      )}
    </div>
  );
}
