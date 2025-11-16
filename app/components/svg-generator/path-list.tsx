"use client";

import { useKeyboardShortcut } from "@/app/hooks/use-keyboard-shortcut";
import { useScrollIntoView } from "@/app/hooks/use-scroll-into-view";
import { useSvgEditorContext } from "./contexts/svg-editor-context";
import type { PathElement } from "./svg-editor";

export function PathList() {
  const { svgData, selectedPathId, setSelectedPathId } = useSvgEditorContext();
  const selectedItemRef = useScrollIntoView<HTMLDivElement>(selectedPathId);

  const handlePathClick = (pathId: string) => {
    setSelectedPathId(pathId);
  };

  const getPathPreview = (path: PathElement) => {
    // パスのdを短縮して表示
    const dPreview =
      path.d.length > 30 ? `${path.d.substring(0, 30)}...` : path.d;
    return dPreview;
  };

  // 下矢印: 次のパスを選択（末尾で先頭に循環）
  useKeyboardShortcut({ key: "ArrowDown" }, () => {
    if (svgData.paths.length === 0) return;

    const currentIndex = svgData.paths.findIndex(
      (p) => p.id === selectedPathId
    );

    if (currentIndex === -1) {
      // 何も選択されていない場合は最初のパスを選択
      setSelectedPathId(svgData.paths[0].id);
    } else if (currentIndex === svgData.paths.length - 1) {
      // 末尾の場合は先頭に戻る
      setSelectedPathId(svgData.paths[0].id);
    } else {
      setSelectedPathId(svgData.paths[currentIndex + 1].id);
    }
  });

  // 上矢印: 前のパスを選択（先頭で末尾に循環）
  useKeyboardShortcut({ key: "ArrowUp" }, () => {
    if (svgData.paths.length === 0) return;

    const currentIndex = svgData.paths.findIndex(
      (p) => p.id === selectedPathId
    );

    if (currentIndex === -1) {
      // 何も選択されていない場合は最後のパスを選択
      setSelectedPathId(svgData.paths[svgData.paths.length - 1].id);
    } else if (currentIndex === 0) {
      // 先頭の場合は末尾に移動
      setSelectedPathId(svgData.paths[svgData.paths.length - 1].id);
    } else {
      setSelectedPathId(svgData.paths[currentIndex - 1].id);
    }
  });

  return (
    <div className="border-border bg-card/80 rounded-2xl border backdrop-blur-2xl">
      <div className="border-border border-b p-3">
        <h2 className="text-sm font-semibold">パス一覧</h2>
        <p className="text-xs text-gray-500">{svgData.paths.length}個のパス</p>
      </div>

      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 240px)" }}
      >
        {svgData.paths.map((path, index) => {
          const isSelected = selectedPathId === path.id;
          return (
            <div
              key={path.id}
              ref={isSelected ? selectedItemRef : null}
              onClick={() => handlePathClick(path.id)}
              className={`border-border cursor-pointer border-b p-3 transition-colors hover:bg-gray-100 ${
                isSelected
                  ? "border-l-4 border-l-blue-500 bg-blue-50"
                  : "border-l-4 border-l-transparent"
              }`}
            >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">
                パス {index + 1}
              </span>
              {isSelected && (
                <span className="rounded bg-blue-500 p-0.5 text-xs text-white">
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
          );
        })}
      </div>

      {svgData.paths.length === 0 && (
        <div className="flex h-32 items-center justify-center text-sm text-gray-400">
          パスがありません
        </div>
      )}
    </div>
  );
}
