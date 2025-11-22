import { proxy, useSnapshot } from "valtio";
import type { SvgData } from "./svg-editor";
import { parseSvgCode } from "./utils/svg-parser";
import {
  type HistoryState,
  createInitialHistory,
  canUndo as checkCanUndo,
  canRedo as checkCanRedo,
} from "./utils/history";

export const DEFAULT_ZOOM = 1;

export type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SvgEditorState = {
  history: HistoryState<SvgData>;
  originalViewBox: string;
  selectedPathId: string | null;
  zoom: number;
  isCropMode: boolean;
  cropRect: CropRect | null;
  lockAspectRatio: boolean;
};

const initialData = parseSvgCode("");

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

// Hooks
export function useSvgEditorSnapshot() {
  return useSnapshot(svgEditorStore);
}
