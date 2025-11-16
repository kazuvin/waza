"use client";

import { useState, useRef } from "react";
import { useSvgEditorContext } from "./contexts/svg-editor-context";
import { usePinchZoom } from "./hooks/use-pinch-zoom";

export function SvgCanvas() {
  const {
    svgData,
    selectedPathId,
    setSelectedPathId,
    zoom,
    zoomTo,
    isCropMode,
    cropRect,
    setCropRect,
    originalViewBox,
  } = useSvgEditorContext();

  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );

  // クロップモード時は元のviewBoxを表示、通常モードは現在のviewBoxを使用
  const displayViewBox = isCropMode ? originalViewBox : svgData.viewBox;

  const containerRef = usePinchZoom({
    currentZoom: zoom,
    onZoomChange: zoomTo,
  });

  // SVG座標系への変換
  const getSvgCoordinates = (clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };

    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;

    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  };

  // クロップ選択のドラッグハンドラ
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isCropMode) return;

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    setDragStart(coords);
    setIsDragging(true);
    setCropRect(null);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isCropMode || !isDragging || !dragStart) return;

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    const x = Math.min(dragStart.x, coords.x);
    const y = Math.min(dragStart.y, coords.y);
    const width = Math.abs(coords.x - dragStart.x);
    const height = Math.abs(coords.y - dragStart.y);

    setCropRect({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isCropMode) return;
    setIsDragging(false);
    setDragStart(null);
  };

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
          ref={svgRef}
          width={svgData.width}
          height={svgData.height}
          viewBox={displayViewBox}
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
            cursor: isCropMode ? "crosshair" : "default",
          }}
          role="img"
          aria-label="SVGキャンバス"
          onClick={() => !isCropMode && setSelectedPathId(null)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
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
                  if (!isCropMode) {
                    e.stopPropagation();
                    setSelectedPathId(path.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`パス要素 ${path.id}`}
                aria-pressed={isSelected}
                style={{
                  cursor: isCropMode ? "crosshair" : "pointer",
                  outline: isSelected && !isCropMode ? "2px solid #3b82f6" : "none",
                  outlineOffset: "2px",
                  pointerEvents: isCropMode ? "none" : "auto",
                }}
              />
            );
          })}

          {/* クロップモード時の表示 */}
          {isCropMode && (
            <>
              {/* 現在のviewBox範囲を表示 */}
              {(() => {
                const viewBoxParts = svgData.viewBox.split(" ").map(Number);
                const [vbX, vbY, vbWidth, vbHeight] = viewBoxParts;
                return (
                  <rect
                    x={vbX}
                    y={vbY}
                    width={vbWidth}
                    height={vbHeight}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth={2 / zoom}
                    strokeDasharray={`${8 / zoom} ${4 / zoom}`}
                    pointerEvents="none"
                  />
                );
              })()}

              {/* 新しいクロップ選択範囲 */}
              {cropRect && (
                <>
                  {/* 暗いオーバーレイ */}
                  <defs>
                    <mask id="crop-mask">
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="white"
                      />
                      <rect
                        x={cropRect.x}
                        y={cropRect.y}
                        width={cropRect.width}
                        height={cropRect.height}
                        fill="black"
                      />
                    </mask>
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="black"
                    opacity="0.5"
                    mask="url(#crop-mask)"
                    pointerEvents="none"
                  />
                  {/* クロップ選択枠 */}
                  <rect
                    x={cropRect.x}
                    y={cropRect.y}
                    width={cropRect.width}
                    height={cropRect.height}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={2 / zoom}
                    strokeDasharray={`${4 / zoom} ${4 / zoom}`}
                    pointerEvents="none"
                  />
                </>
              )}
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
