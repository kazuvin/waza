"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSvgEditor } from "../hooks/use-svg-editor";

const SvgEditorContext = createContext<ReturnType<typeof useSvgEditor> | null>(
  null
);

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
