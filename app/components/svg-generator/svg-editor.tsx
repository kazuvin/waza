"use client";

import { EditorToolbar } from "./editor-toolbar";
import { PropertiesPanel } from "./properties-panel";
import { SvgCanvas } from "./svg-canvas";
import { useSvgEditor } from "./hooks/use-svg-editor";
import { generateSvgCode } from "./utils/svg-parser";

export type PathElement = {
  id: string;
  d: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
};

export type SvgData = {
  width: number;
  height: number;
  viewBox: string;
  paths: PathElement[];
};

type SvgEditorProps = {
  id: string;
  initialSvgCode?: string;
  onSave?: (svgCode: string) => void;
};

export function SvgEditor({ id, initialSvgCode = "", onSave }: SvgEditorProps) {
  const {
    svgData,
    selectedPathId,
    selectedPath,
    setSelectedPathId,
    updatePath,
    updateCanvas,
  } = useSvgEditor({ initialSvgCode });

  const handleSave = () => {
    const svgCode = generateSvgCode(svgData);
    onSave?.(svgCode);
  };

  return (
    <div className="flex h-screen flex-col">
      <EditorToolbar onSave={handleSave} />

      <div className="flex flex-1 overflow-hidden">
        <main
          className="flex-1 overflow-auto"
          role="main"
          aria-label="SVG編集キャンバス"
        >
          <SvgCanvas
            svgData={svgData}
            selectedPathId={selectedPathId}
            onSelectPath={setSelectedPathId}
          />
        </main>

        <aside
          className="w-80 overflow-y-auto border-l"
          role="complementary"
          aria-label="プロパティパネル"
        >
          <PropertiesPanel
            svgData={svgData}
            selectedPath={selectedPath}
            onUpdatePath={(updates) => {
              if (selectedPath) {
                updatePath(selectedPath.id, updates);
              }
            }}
            onUpdateCanvas={updateCanvas}
          />
        </aside>
      </div>
    </div>
  );
}
