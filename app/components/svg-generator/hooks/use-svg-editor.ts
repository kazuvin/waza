import { useReducer, useState } from "react";
import type { SvgData, PathElement } from "../svg-editor";
import { parseSvgCode } from "../utils/svg-parser";
import {
  type HistoryState,
  addHistory,
  undo,
  redo,
  createInitialHistory,
  canUndo,
  canRedo,
} from "../utils/history";
import { useKeyboardShortcut } from "@/app/hooks/use-keyboard-shortcut";

type UseSvgEditorProps = {
  initialSvgCode?: string;
};

// アクションタイプの定義
type SvgEditorAction =
  | { type: "UPDATE_PATH"; id: string; updates: Partial<PathElement> }
  | {
      type: "UPDATE_CANVAS";
      updates: Partial<Pick<SvgData, "width" | "height" | "viewBox">>;
    }
  | { type: "DELETE_PATH"; id: string }
  | { type: "UNDO" }
  | { type: "REDO" };

// Reducerの実装
function svgEditorReducer(
  state: HistoryState<SvgData>,
  action: SvgEditorAction
): HistoryState<SvgData> {
  switch (action.type) {
    case "UPDATE_PATH": {
      const newState: SvgData = {
        ...state.present,
        paths: state.present.paths.map((p) =>
          p.id === action.id ? { ...p, ...action.updates } : p
        ),
      };
      return addHistory(state, newState);
    }

    case "UPDATE_CANVAS": {
      const newState: SvgData = {
        ...state.present,
        ...action.updates,
      };
      return addHistory(state, newState);
    }

    case "DELETE_PATH": {
      const newState: SvgData = {
        ...state.present,
        paths: state.present.paths.filter((p) => p.id !== action.id),
      };
      return addHistory(state, newState);
    }

    case "UNDO":
      return undo(state);

    case "REDO":
      return redo(state);

    default:
      return state;
  }
}

// ズームレベルのプリセット
const ZOOM_LEVELS = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4, 5];
const DEFAULT_ZOOM = 1;

export function useSvgEditor({ initialSvgCode = "" }: UseSvgEditorProps) {
  // 初期データを取得
  const initialData = parseSvgCode(initialSvgCode);

  // 元のviewBoxを保持（クロップモード時に全体を表示するため）
  const [originalViewBox] = useState(initialData.viewBox);

  // useReducerで履歴管理
  const [history, dispatch] = useReducer(
    svgEditorReducer,
    createInitialHistory(initialData)
  );

  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [isCropMode, setIsCropMode] = useState(false);
  const [cropRect, setCropRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [lockAspectRatio, setLockAspectRatio] = useState(false);

  // 現在のSVGデータ
  const svgData = history.present;
  const selectedPath = svgData.paths.find((p) => p.id === selectedPathId);

  // アクション関数
  const updatePath = (id: string, updates: Partial<PathElement>) => {
    dispatch({ type: "UPDATE_PATH", id, updates });
  };

  const updateCanvas = (
    updates: Partial<Pick<SvgData, "width" | "height" | "viewBox">>
  ) => {
    dispatch({ type: "UPDATE_CANVAS", updates });
  };

  const deletePath = (id: string) => {
    dispatch({ type: "DELETE_PATH", id });
    // 削除したパスが選択されていた場合、選択を解除
    if (selectedPathId === id) {
      setSelectedPathId(null);
    }
  };

  const undoAction = () => {
    dispatch({ type: "UNDO" });
  };

  const redoAction = () => {
    dispatch({ type: "REDO" });
  };

  // ズーム操作
  const zoomIn = () => {
    const currentIndex = ZOOM_LEVELS.findIndex((level) => level >= zoom);
    const nextIndex = Math.min(currentIndex + 1, ZOOM_LEVELS.length - 1);
    setZoom(ZOOM_LEVELS[nextIndex]);
  };

  const zoomOut = () => {
    const currentIndex = ZOOM_LEVELS.findIndex((level) => level >= zoom);
    const prevIndex = Math.max(currentIndex - 1, 0);
    setZoom(ZOOM_LEVELS[prevIndex]);
  };

  const zoomTo = (level: number) => {
    const clampedZoom = Math.max(0.1, Math.min(5, level));
    setZoom(clampedZoom);
  };

  const zoomToFit = () => {
    // フィット機能は後でキャンバスサイズに基づいて実装可能
    setZoom(DEFAULT_ZOOM);
  };

  const resetZoom = () => {
    setZoom(DEFAULT_ZOOM);
  };

  // クロップ操作
  const toggleCropMode = () => {
    const newCropMode = !isCropMode;
    setIsCropMode(newCropMode);
    setLockAspectRatio(false);

    if (newCropMode) {
      // クロップモードに入る時
      setSelectedPathId(null); // 選択を解除

      // 元のviewBoxと現在のviewBoxを比較
      // 異なる場合は既にクロップされているので、現在の範囲を初期値とする
      if (svgData.viewBox !== originalViewBox) {
        const viewBoxParts = svgData.viewBox.split(" ").map(Number);
        const [x, y, width, height] = viewBoxParts;
        setCropRect({ x, y, width, height });
      } else {
        // 元のviewBoxと同じ場合は、ユーザーがドラッグで作成する
        setCropRect(null);
      }
    } else {
      // クロップモード終了時
      setCropRect(null);
    }
  };

  const applyCrop = () => {
    if (!cropRect) return;

    // viewBoxを更新
    const newViewBox = `${cropRect.x} ${cropRect.y} ${cropRect.width} ${cropRect.height}`;
    updateCanvas({
      viewBox: newViewBox,
    });

    // クロップモードを終了
    setIsCropMode(false);
    setCropRect(null);
  };

  // キーボードショートカットの設定
  // Deleteキーでパスを削除
  useKeyboardShortcut(
    {
      key: "Delete",
      enabled: selectedPathId !== null,
    },
    () => {
      if (selectedPathId) {
        deletePath(selectedPathId);
      }
    }
  );

  // Backspaceキーでもパスを削除（macOS対応）
  useKeyboardShortcut(
    {
      key: "Backspace",
      enabled: selectedPathId !== null,
    },
    () => {
      if (selectedPathId) {
        deletePath(selectedPathId);
      }
    }
  );

  // Cmd+Z / Ctrl+Z でUndo
  useKeyboardShortcut(
    {
      key: "z",
      metaKey: true,
      ctrlKey: true,
      enabled: canUndo(history),
    },
    () => {
      undoAction();
    }
  );

  // Cmd+Shift+Z / Ctrl+Shift+Z でRedo
  useKeyboardShortcut(
    {
      key: "z",
      metaKey: true,
      ctrlKey: true,
      shiftKey: true,
      enabled: canRedo(history),
    },
    () => {
      redoAction();
    }
  );

  // Cmd+Y / Ctrl+Y でRedo（Windows/Linux向け）
  useKeyboardShortcut(
    {
      key: "y",
      metaKey: true,
      ctrlKey: true,
      enabled: canRedo(history),
    },
    () => {
      redoAction();
    }
  );

  // Vキーでカーソルモード
  useKeyboardShortcut(
    {
      key: "v",
      enabled: isCropMode,
    },
    () => {
      toggleCropMode();
    }
  );

  // Cキーでクロップモード
  useKeyboardShortcut(
    {
      key: "c",
      enabled: !isCropMode,
    },
    () => {
      toggleCropMode();
    }
  );

  return {
    svgData,
    selectedPathId,
    selectedPath,
    setSelectedPathId,
    updatePath,
    updateCanvas,
    deletePath,
    undo: undoAction,
    redo: redoAction,
    canUndo: canUndo(history),
    canRedo: canRedo(history),
    zoom,
    zoomIn,
    zoomOut,
    zoomTo,
    zoomToFit,
    resetZoom,
    isCropMode,
    cropRect,
    setCropRect,
    toggleCropMode,
    applyCrop,
    originalViewBox,
    lockAspectRatio,
    setLockAspectRatio,
  };
}
