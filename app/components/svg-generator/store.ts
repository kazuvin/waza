import { proxy, useSnapshot } from "valtio";
import type { SvgData, PathElement } from "./svg-editor";
import { parseSvgCode } from "./utils/svg-parser";
import {
  type HistoryState,
  addHistory,
  undo,
  redo,
  createInitialHistory,
  canUndo as checkCanUndo,
  canRedo as checkCanRedo,
} from "./utils/history";

const ZOOM_LEVELS = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4, 5];
const DEFAULT_ZOOM = 1;

export type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type SvgEditorState = {
  history: HistoryState<SvgData>;
  originalViewBox: string;
  selectedPathId: string | null;
  zoom: number;
  isCropMode: boolean;
  cropRect: CropRect | null;
  lockAspectRatio: boolean;
};

// 初期データ
const initialData = parseSvgCode("");

// ストア
export const svgEditorStore = proxy<SvgEditorState>({
  history: createInitialHistory(initialData),
  originalViewBox: initialData.viewBox,
  selectedPathId: null,
  zoom: DEFAULT_ZOOM,
  isCropMode: false,
  cropRect: null,
  lockAspectRatio: false,
});

// Computed values
export const getSvgData = () => svgEditorStore.history.present;
export const getSelectedPath = () =>
  svgEditorStore.history.present.paths.find(
    (p) => p.id === svgEditorStore.selectedPathId
  );
export const getCanUndo = () => checkCanUndo(svgEditorStore.history);
export const getCanRedo = () => checkCanRedo(svgEditorStore.history);

// Actions
export const svgEditorActions = {
  initialize(initialSvgCode: string) {
    const data = parseSvgCode(initialSvgCode);
    svgEditorStore.history = createInitialHistory(data);
    svgEditorStore.originalViewBox = data.viewBox;
    svgEditorStore.selectedPathId = null;
    svgEditorStore.zoom = DEFAULT_ZOOM;
    svgEditorStore.isCropMode = false;
    svgEditorStore.cropRect = null;
    svgEditorStore.lockAspectRatio = false;
  },

  setSelectedPathId(id: string | null) {
    svgEditorStore.selectedPathId = id;
  },

  updatePath(id: string, updates: Partial<PathElement>) {
    const newState: SvgData = {
      ...svgEditorStore.history.present,
      paths: svgEditorStore.history.present.paths.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    };
    svgEditorStore.history = addHistory(svgEditorStore.history, newState);
  },

  updateCanvas(updates: Partial<Pick<SvgData, "width" | "height" | "viewBox">>) {
    const newState: SvgData = {
      ...svgEditorStore.history.present,
      ...updates,
    };
    svgEditorStore.history = addHistory(svgEditorStore.history, newState);
  },

  deletePath(id: string) {
    const newState: SvgData = {
      ...svgEditorStore.history.present,
      paths: svgEditorStore.history.present.paths.filter((p) => p.id !== id),
    };
    svgEditorStore.history = addHistory(svgEditorStore.history, newState);
    if (svgEditorStore.selectedPathId === id) {
      svgEditorStore.selectedPathId = null;
    }
  },

  undo() {
    svgEditorStore.history = undo(svgEditorStore.history);
  },

  redo() {
    svgEditorStore.history = redo(svgEditorStore.history);
  },

  zoomIn() {
    const currentIndex = ZOOM_LEVELS.findIndex(
      (level) => level >= svgEditorStore.zoom
    );
    const nextIndex = Math.min(currentIndex + 1, ZOOM_LEVELS.length - 1);
    svgEditorStore.zoom = ZOOM_LEVELS[nextIndex];
  },

  zoomOut() {
    const currentIndex = ZOOM_LEVELS.findIndex(
      (level) => level >= svgEditorStore.zoom
    );
    const prevIndex = Math.max(currentIndex - 1, 0);
    svgEditorStore.zoom = ZOOM_LEVELS[prevIndex];
  },

  zoomTo(level: number) {
    svgEditorStore.zoom = Math.max(0.1, Math.min(5, level));
  },

  zoomToFit() {
    svgEditorStore.zoom = DEFAULT_ZOOM;
  },

  resetZoom() {
    svgEditorStore.zoom = DEFAULT_ZOOM;
  },

  setCropRect(rect: CropRect | null) {
    svgEditorStore.cropRect = rect;
  },

  toggleCropMode() {
    const newCropMode = !svgEditorStore.isCropMode;
    svgEditorStore.isCropMode = newCropMode;
    svgEditorStore.lockAspectRatio = false;

    if (newCropMode) {
      svgEditorStore.selectedPathId = null;

      if (
        svgEditorStore.history.present.viewBox !== svgEditorStore.originalViewBox
      ) {
        const viewBoxParts = svgEditorStore.history.present.viewBox
          .split(" ")
          .map(Number);
        const [x, y, width, height] = viewBoxParts;
        svgEditorStore.cropRect = { x, y, width, height };
      } else {
        svgEditorStore.cropRect = null;
      }
    } else {
      svgEditorStore.cropRect = null;
    }
  },

  applyCrop() {
    if (!svgEditorStore.cropRect) return;

    const newViewBox = `${svgEditorStore.cropRect.x} ${svgEditorStore.cropRect.y} ${svgEditorStore.cropRect.width} ${svgEditorStore.cropRect.height}`;
    svgEditorActions.updateCanvas({ viewBox: newViewBox });

    svgEditorStore.isCropMode = false;
    svgEditorStore.cropRect = null;
  },

  setLockAspectRatio(lock: boolean) {
    svgEditorStore.lockAspectRatio = lock;
  },
};

// Hooks
export function useSvgEditorSnapshot() {
  return useSnapshot(svgEditorStore);
}
