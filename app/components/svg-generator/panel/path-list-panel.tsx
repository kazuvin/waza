"use client";

import { useKeyboardShortcut } from "@/app/hooks/use-keyboard-shortcut";
import { useScrollIntoView } from "@/app/hooks/use-scroll-into-view";
import { useSvgEditorSnapshot } from "../store";
import { setSelectedPathId } from "../actions";
import type { PathElement } from "../svg-editor";
import {
  Panel,
  PanelProps,
  PanelHeader,
  PanelTitle,
  PanelTitleProps,
  PanelContent,
} from ".";
import { RefObject } from "react";

// パスカウント表示コンポーネント
function PathCount() {
  const { history } = useSvgEditorSnapshot();
  return (
    <p className="text-xs text-gray-500">
      {history.present.paths.length}個のパス
    </p>
  );
}

// 空状態表示コンポーネント
function EmptyState() {
  return (
    <div className="flex h-32 items-center justify-center text-sm text-gray-400">
      パスがありません
    </div>
  );
}

// パスデータのプレビューコンポーネント
function PathDataPreview({ d }: { d: string }) {
  const preview = d.length > 30 ? `${d.substring(0, 30)}...` : d;
  return <div className="font-mono text-xs text-gray-400">{preview}</div>;
}

// パスヘッダーコンポーネント
function PathHeader({
  index,
  isSelected,
}: {
  index: number;
  isSelected: boolean;
}) {
  return (
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
  );
}

// カラープレビューコンポーネント
function PathColorPreview({ fill }: { fill: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <div
        className="h-4 w-4 rounded border border-gray-300"
        style={{ backgroundColor: fill }}
        title={`fill: ${fill}`}
      />
      <span className="text-xs text-gray-600">{fill}</span>
    </div>
  );
}

// ストロークプレビューコンポーネント
function PathStrokePreview({
  stroke,
  strokeWidth,
}: {
  stroke: string;
  strokeWidth: number;
}) {
  if (!stroke || stroke === "none") return null;

  return (
    <div className="mb-2 flex items-center gap-2">
      <div
        className="h-4 w-4 rounded border"
        style={{ backgroundColor: stroke }}
        title={`stroke: ${stroke}`}
      />
      <span className="text-xs text-gray-600">
        {stroke} ({strokeWidth}px)
      </span>
    </div>
  );
}

// パスリストアイテムコンポーネント
function PathListItem({
  path,
  index,
  selectedItemRef,
}: {
  path: PathElement;
  index: number;
  selectedItemRef: RefObject<HTMLDivElement | null> | null;
}) {
  const { selectedPathId } = useSvgEditorSnapshot();
  const isSelected = selectedPathId === path.id;

  const handleClick = () => {
    setSelectedPathId(path.id);
  };

  return (
    <div
      ref={isSelected ? selectedItemRef : null}
      onClick={handleClick}
      className={`border-border m-1 cursor-pointer rounded-2xl border-b p-3 transition-colors ${
        isSelected ? "bg-primary/20" : "hover:bg-primary/5"
      }`}
    >
      <PathHeader index={index} isSelected={isSelected} />
      <PathColorPreview fill={path.fill} />
      <PathStrokePreview stroke={path.stroke} strokeWidth={path.strokeWidth} />
      <PathDataPreview d={path.d} />
    </div>
  );
}

// パスリストコンポーネント
function PathList() {
  const { history, selectedPathId } = useSvgEditorSnapshot();
  const svgData = history.present;
  const selectedItemRef = useScrollIntoView<HTMLDivElement>(selectedPathId);

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
    <>
      {svgData.paths.map((path, index) => {
        const isSelected = selectedPathId === path.id;
        return (
          <PathListItem
            key={path.id}
            path={path}
            index={index}
            selectedItemRef={isSelected ? selectedItemRef : null}
          />
        );
      })}

      {svgData.paths.length === 0 && <EmptyState />}
    </>
  );
}

export type PathListPanelProps = {
  headingLevel?: PanelTitleProps["as"];
} & PanelProps;

export function PathListPanel({
  headingLevel = "h2",
  ...props
}: PathListPanelProps) {
  return (
    <Panel {...props}>
      <PanelHeader>
        <PanelTitle as={headingLevel}>パス一覧</PanelTitle>
        <PathCount />
      </PanelHeader>

      <PanelContent>
        <PathList />
      </PanelContent>
    </Panel>
  );
}
