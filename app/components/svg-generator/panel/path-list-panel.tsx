"use client";

import { useKeyboardShortcut } from "@/app/hooks/use-keyboard-shortcut";
import { useScrollIntoView } from "@/app/hooks/use-scroll-into-view";
import { svgEditorActions, useSvgEditorSnapshot } from "../store";
import type { PathElement } from "../svg-editor";
import {
  Panel,
  PanelProps,
  PanelHeader,
  PanelTitle,
  PanelTitleProps,
  PanelContent,
} from ".";

export type PathListPanelProps = {
  headingLevel?: PanelTitleProps["as"];
} & PanelProps;

export function PathListPanel({
  headingLevel = "h2",
  ...props
}: PathListPanelProps) {
  const snapshot = useSvgEditorSnapshot();
  const svgData = snapshot.history.present;
  const selectedPathId = snapshot.selectedPathId;
  const selectedItemRef = useScrollIntoView<HTMLDivElement>(selectedPathId);

  const handlePathClick = (pathId: string) => {
    svgEditorActions.setSelectedPathId(pathId);
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
      svgEditorActions.setSelectedPathId(svgData.paths[0].id);
    } else if (currentIndex === svgData.paths.length - 1) {
      // 末尾の場合は先頭に戻る
      svgEditorActions.setSelectedPathId(svgData.paths[0].id);
    } else {
      svgEditorActions.setSelectedPathId(svgData.paths[currentIndex + 1].id);
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
      svgEditorActions.setSelectedPathId(svgData.paths[svgData.paths.length - 1].id);
    } else if (currentIndex === 0) {
      // 先頭の場合は末尾に移動
      svgEditorActions.setSelectedPathId(svgData.paths[svgData.paths.length - 1].id);
    } else {
      svgEditorActions.setSelectedPathId(svgData.paths[currentIndex - 1].id);
    }
  });

  return (
    <Panel {...props}>
      <PanelHeader>
        <PanelTitle as={headingLevel}>パス一覧</PanelTitle>
        <p className="text-xs text-gray-500">{svgData.paths.length}個のパス</p>
      </PanelHeader>

      <PanelContent>
        {svgData.paths.map((path, index) => {
          const isSelected = selectedPathId === path.id;
          return (
            <div
              key={path.id}
              ref={isSelected ? selectedItemRef : null}
              onClick={() => handlePathClick(path.id)}
              className={`border-border m-1 cursor-pointer rounded-2xl border-b p-3 transition-colors ${
                isSelected ? "bg-primary/20" : "hover:bg-primary/5"
              }`}
            >
              <div className="mb-1 flex h-6 items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">
                  パス {index + 1}
                </span>
                {isSelected && (
                  <span className="bg-primary text-primary-foreground rounded p-0.5 px-1 text-xs">
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

        {svgData.paths.length === 0 && (
          <div className="flex h-32 items-center justify-center text-sm text-gray-400">
            パスがありません
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}
