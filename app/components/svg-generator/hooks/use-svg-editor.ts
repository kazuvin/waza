import { useState, useMemo } from "react";
import type { SvgData, PathElement } from "../svg-editor";
import { parseSvgCode, getDefaultSvgData } from "../utils/svg-parser";

type UseSvgEditorProps = {
  initialSvgCode?: string;
};

export function useSvgEditor({ initialSvgCode = "" }: UseSvgEditorProps) {
  // 初期SVGデータをuseMemoでパース（クライアントサイドのみ）
  const initialData = useMemo(() => {
    if (typeof window === "undefined") {
      return getDefaultSvgData();
    }
    return initialSvgCode ? parseSvgCode(initialSvgCode) : getDefaultSvgData();
  }, [initialSvgCode]);

  const [svgData, setSvgData] = useState<SvgData>(initialData);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);

  const selectedPath = svgData.paths.find((p) => p.id === selectedPathId);

  const updatePath = (id: string, updates: Partial<PathElement>) => {
    setSvgData((prev) => ({
      ...prev,
      paths: prev.paths.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const updateCanvas = (
    updates: Partial<Pick<SvgData, "width" | "height" | "viewBox">>
  ) => {
    setSvgData((prev) => ({ ...prev, ...updates }));
  };

  return {
    svgData,
    selectedPathId,
    selectedPath,
    setSelectedPathId,
    updatePath,
    updateCanvas,
  };
}
