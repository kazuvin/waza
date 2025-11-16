"use client";

import { useSvgEditorContext } from "./contexts/svg-editor-context";
import { usePinchZoom } from "./hooks/use-pinch-zoom";

export function SvgCanvas() {
  const { svgData, selectedPathId, setSelectedPathId, zoom, zoomTo } =
    useSvgEditorContext();

  const containerRef = usePinchZoom({
    currentZoom: zoom,
    onZoomChange: zoomTo,
  });

  return (
    <div
      ref={containerRef}
      className="grid size-full place-items-center overflow-auto bg-gray-50 p-8"
    >
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center",
          transition: "transform 0.2s ease-out",
        }}
      >
        <svg
          width={svgData.width}
          height={svgData.height}
          viewBox={svgData.viewBox}
          className="border-2 border-gray-100"
          style={{
            background: `
              linear-gradient(45deg, #eee 25%, transparent 25%),
              linear-gradient(-45deg, #eee 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #eee 75%),
              linear-gradient(-45deg, transparent 75%, #eee 75%)
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
          }}
          role="img"
          aria-label="SVGキャンバス"
          onClick={() => setSelectedPathId(null)}
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
                  setSelectedPathId(path.id);
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
    </div>
  );
}
