"use client";

import type { SvgData } from "./svg-editor";

type SvgCanvasProps = {
  svgData: SvgData;
  selectedPathId: string | null;
  onSelectPath: (id: string | null) => void;
};

export function SvgCanvas({
  svgData,
  selectedPathId,
  onSelectPath,
}: SvgCanvasProps) {
  return (
    <div className="flex h-full items-center justify-center bg-gray-50 p-8">
      <svg
        width={svgData.width}
        height={svgData.height}
        viewBox={svgData.viewBox}
        className="border-2 border-gray-300 bg-white"
        role="img"
        aria-label="SVGキャンバス"
        onClick={() => onSelectPath(null)}
      >
        <title>SVG編集キャンバス</title>
        <desc>
          {svgData.paths.length > 0
            ? `${svgData.paths.length}個のパスを含むSVGキャンバス`
            : "空のSVGキャンバス"}
        </desc>

        {svgData.paths.map((path) => {
          const isSelected = path.id === selectedPathId;
          return (
            <path
              key={path.id}
              d={path.d}
              fill={path.fill}
              stroke={path.stroke}
              strokeWidth={path.strokeWidth}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onSelectPath(path.id);
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectPath(path.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`パス要素 ${path.id}`}
              aria-pressed={isSelected}
              style={{
                cursor: "pointer",
                outline: isSelected ? "2px solid #3b82f6" : "none",
                outlineOffset: "2px",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
