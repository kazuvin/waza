"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SvgData, PathElement } from "../svg-editor";
import { useSvgEditor } from "../hooks/use-svg-editor";

type SvgEditorContextValue = {
  svgData: SvgData;
  selectedPathId: string | null;
  selectedPath: PathElement | undefined;
  setSelectedPathId: (id: string | null) => void;
  updatePath: (id: string, updates: Partial<PathElement>) => void;
  updateCanvas: (
    updates: Partial<Pick<SvgData, "width" | "height" | "viewBox">>
  ) => void;
  deletePath: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  zoomTo: (level: number) => void;
  zoomToFit: () => void;
  resetZoom: () => void;
  isCropMode: boolean;
  cropRect: { x: number; y: number; width: number; height: number } | null;
  setCropRect: (
    rect: { x: number; y: number; width: number; height: number } | null
  ) => void;
  toggleCropMode: () => void;
  applyCrop: () => void;
  originalViewBox: string;
};

const SvgEditorContext = createContext<SvgEditorContextValue | null>(null);

type SvgEditorProviderProps = {
  initialSvgCode?: string;
  children: ReactNode;
};

export function SvgEditorProvider({
  initialSvgCode,
  children,
}: SvgEditorProviderProps) {
  const editorState = useSvgEditor({ initialSvgCode });

  return (
    <SvgEditorContext.Provider value={editorState}>
      {children}
    </SvgEditorContext.Provider>
  );
}

/**
 * SvgEditorのコンテキストを取得するフック
 * SvgEditorProvider配下でのみ使用可能
 */
export function useSvgEditorContext() {
  const context = useContext(SvgEditorContext);
  if (!context) {
    throw new Error(
      "useSvgEditorContext must be used within SvgEditorProvider"
    );
  }
  return context;
}
