import type { SvgData, PathElement } from "./svg-editor";
import { svgEditorStore, DEFAULT_ZOOM, type CropRect } from "./store";
import { parseSvgCode } from "./utils/svg-parser";
import { addHistory, undo, redo, createInitialHistory } from "./utils/history";

const ZOOM_LEVELS = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4, 5];

// Initialize
export function initialize(initialSvgCode: string) {
  const data = parseSvgCode(initialSvgCode);
  svgEditorStore.history = createInitialHistory(data);
  svgEditorStore.originalViewBox = data.viewBox;
  svgEditorStore.selectedPathId = null;
  svgEditorStore.zoom = DEFAULT_ZOOM;
  svgEditorStore.isCropMode = false;
  svgEditorStore.cropRect = null;
  svgEditorStore.lockAspectRatio = false;
}

// Selection
export function setSelectedPathId(id: string | null) {
  svgEditorStore.selectedPathId = id;
}

// Path operations
export function updatePath(id: string, updates: Partial<PathElement>) {
  const newState: SvgData = {
    ...svgEditorStore.history.present,
    paths: svgEditorStore.history.present.paths.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    ),
  };
  svgEditorStore.history = addHistory(svgEditorStore.history, newState);
}

export function deletePath(id: string) {
  const newState: SvgData = {
    ...svgEditorStore.history.present,
    paths: svgEditorStore.history.present.paths.filter((p) => p.id !== id),
  };
  svgEditorStore.history = addHistory(svgEditorStore.history, newState);
  if (svgEditorStore.selectedPathId === id) {
    svgEditorStore.selectedPathId = null;
  }
}

// Canvas operations
export function updateCanvas(
  updates: Partial<Pick<SvgData, "width" | "height" | "viewBox">>
) {
  const newState: SvgData = {
    ...svgEditorStore.history.present,
    ...updates,
  };
  svgEditorStore.history = addHistory(svgEditorStore.history, newState);
}

// History operations
export function undoAction() {
  svgEditorStore.history = undo(svgEditorStore.history);
}

export function redoAction() {
  svgEditorStore.history = redo(svgEditorStore.history);
}

// Zoom operations
export function zoomIn() {
  const currentIndex = ZOOM_LEVELS.findIndex(
    (level) => level >= svgEditorStore.zoom
  );
  const nextIndex = Math.min(currentIndex + 1, ZOOM_LEVELS.length - 1);
  svgEditorStore.zoom = ZOOM_LEVELS[nextIndex];
}

export function zoomOut() {
  const currentIndex = ZOOM_LEVELS.findIndex(
    (level) => level >= svgEditorStore.zoom
  );
  const prevIndex = Math.max(currentIndex - 1, 0);
  svgEditorStore.zoom = ZOOM_LEVELS[prevIndex];
}

export function zoomTo(level: number) {
  svgEditorStore.zoom = Math.max(0.1, Math.min(5, level));
}

export function zoomToFit() {
  svgEditorStore.zoom = DEFAULT_ZOOM;
}

export function resetZoom() {
  svgEditorStore.zoom = DEFAULT_ZOOM;
}

// Crop operations
export function setCropRect(rect: CropRect | null) {
  svgEditorStore.cropRect = rect;
}

export function toggleCropMode() {
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
}

export function applyCrop() {
  if (!svgEditorStore.cropRect) return;

  const newViewBox = `${svgEditorStore.cropRect.x} ${svgEditorStore.cropRect.y} ${svgEditorStore.cropRect.width} ${svgEditorStore.cropRect.height}`;
  updateCanvas({ viewBox: newViewBox });

  svgEditorStore.isCropMode = false;
  svgEditorStore.cropRect = null;
}

export function setLockAspectRatio(lock: boolean) {
  svgEditorStore.lockAspectRatio = lock;
}
