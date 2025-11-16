"use client";

import { useState, useRef } from "react";
import { useSvgEditorContext } from "./contexts/svg-editor-context";
import { usePinchZoom } from "./hooks/use-pinch-zoom";

export function SvgCanvas() {
  const {
    svgData,
    selectedPathId,
    isCropMode,
    cropRect,
    originalViewBox,
    lockAspectRatio,
    zoom,
    setSelectedPathId,
    zoomTo,
    setCropRect,
  } = useSvgEditorContext();

  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [isMovingCrop, setIsMovingCrop] = useState(false);
  const [initialCropRect, setInitialCropRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

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

  // クロップ範囲内のマウスダウン（移動用）
  const handleCropRectMouseDown = (e: React.MouseEvent) => {
    if (!cropRect) return;
    e.stopPropagation();

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    setIsMovingCrop(true);
    setDragStart(coords);
    setInitialCropRect(cropRect);
    setIsDragging(true);
  };

  // リサイズハンドルのマウスダウン
  const handleResizeMouseDown = (e: React.MouseEvent, handle: string) => {
    if (!cropRect) return;
    e.stopPropagation();

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    setResizeHandle(handle);
    setDragStart(coords);
    setInitialCropRect(cropRect);
    setIsDragging(true);
  };

  // クロップ選択のドラッグハンドラ
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isCropMode) return;

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    setDragStart(coords);
    setIsDragging(true);
    setResizeHandle(null);
    setCropRect(null);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isCropMode || !isDragging || !dragStart) return;

    const coords = getSvgCoordinates(e.clientX, e.clientY);

    // クロップ範囲の移動中の場合
    if (isMovingCrop && initialCropRect) {
      const dx = coords.x - dragStart.x;
      const dy = coords.y - dragStart.y;

      setCropRect({
        x: initialCropRect.x + dx,
        y: initialCropRect.y + dy,
        width: initialCropRect.width,
        height: initialCropRect.height,
      });
    }
    // リサイズ中の場合
    else if (resizeHandle && initialCropRect) {
      const dx = coords.x - dragStart.x;
      const dy = coords.y - dragStart.y;
      const newRect = { ...initialCropRect };

      // アスペクト比維持モードの場合
      if (lockAspectRatio) {
        const aspectRatio = initialCropRect.width / initialCropRect.height;

        switch (resizeHandle) {
          case "nw": // 左上
            // 対角線方向の変化量の平均を使用
            const avgDeltaNW = (dx + dy) / 2;
            newRect.width = initialCropRect.width - avgDeltaNW;
            newRect.height = newRect.width / aspectRatio;
            newRect.x =
              initialCropRect.x + (initialCropRect.width - newRect.width);
            newRect.y =
              initialCropRect.y + (initialCropRect.height - newRect.height);
            break;
          case "ne": // 右上
            const avgDeltaNE = (dx - dy) / 2;
            newRect.width = initialCropRect.width + avgDeltaNE;
            newRect.height = newRect.width / aspectRatio;
            newRect.y =
              initialCropRect.y + (initialCropRect.height - newRect.height);
            break;
          case "se": // 右下
            const avgDeltaSE = (dx + dy) / 2;
            newRect.width = initialCropRect.width + avgDeltaSE;
            newRect.height = newRect.width / aspectRatio;
            break;
          case "sw": // 左下
            const avgDeltaSW = (-dx + dy) / 2;
            newRect.width = initialCropRect.width + avgDeltaSW;
            newRect.height = newRect.width / aspectRatio;
            newRect.x =
              initialCropRect.x + (initialCropRect.width - newRect.width);
            break;
        }
      } else {
        // アスペクト比維持なしの通常リサイズ
        switch (resizeHandle) {
          case "nw": // 左上
            newRect.x = initialCropRect.x + dx;
            newRect.y = initialCropRect.y + dy;
            newRect.width = initialCropRect.width - dx;
            newRect.height = initialCropRect.height - dy;
            break;
          case "n": // 上
            newRect.y = initialCropRect.y + dy;
            newRect.height = initialCropRect.height - dy;
            break;
          case "ne": // 右上
            newRect.y = initialCropRect.y + dy;
            newRect.width = initialCropRect.width + dx;
            newRect.height = initialCropRect.height - dy;
            break;
          case "e": // 右
            newRect.width = initialCropRect.width + dx;
            break;
          case "se": // 右下
            newRect.width = initialCropRect.width + dx;
            newRect.height = initialCropRect.height + dy;
            break;
          case "s": // 下
            newRect.height = initialCropRect.height + dy;
            break;
          case "sw": // 左下
            newRect.x = initialCropRect.x + dx;
            newRect.width = initialCropRect.width - dx;
            newRect.height = initialCropRect.height + dy;
            break;
          case "w": // 左
            newRect.x = initialCropRect.x + dx;
            newRect.width = initialCropRect.width - dx;
            break;
        }
      }

      // 最小サイズを保証
      if (newRect.width < 10) {
        newRect.width = 10;
        if (lockAspectRatio) {
          newRect.height =
            10 / (initialCropRect.width / initialCropRect.height);
        }
        if (resizeHandle.includes("w")) {
          newRect.x = initialCropRect.x + initialCropRect.width - 10;
        }
      }
      if (newRect.height < 10) {
        newRect.height = 10;
        if (lockAspectRatio) {
          newRect.width = 10 * (initialCropRect.width / initialCropRect.height);
        }
        if (resizeHandle.includes("n")) {
          newRect.y = initialCropRect.y + initialCropRect.height - 10;
        }
      }

      setCropRect(newRect);
    } else {
      // 新規作成の場合
      const x = Math.min(dragStart.x, coords.x);
      const y = Math.min(dragStart.y, coords.y);
      const width = Math.abs(coords.x - dragStart.x);
      const height = Math.abs(coords.y - dragStart.y);

      setCropRect({ x, y, width, height });
    }
  };

  const handleMouseUp = () => {
    if (!isCropMode) return;
    setIsDragging(false);
    setDragStart(null);
    setResizeHandle(null);
    setIsMovingCrop(false);
    setInitialCropRect(null);
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
                  outline:
                    isSelected && !isCropMode ? "2px solid #3b82f6" : "none",
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

                  {/* クロップ範囲内のドラッグ可能エリア */}
                  <rect
                    x={cropRect.x}
                    y={cropRect.y}
                    width={cropRect.width}
                    height={cropRect.height}
                    fill="transparent"
                    style={{
                      cursor: isDragging && isMovingCrop ? "grabbing" : "grab",
                    }}
                    onMouseDown={handleCropRectMouseDown}
                  />

                  {/* リサイズハンドル */}
                  {(() => {
                    const handleSize = 8 / zoom;
                    // アスペクト比維持モードでは四隅のみ、それ以外は全8方向
                    const handles = lockAspectRatio
                      ? [
                          {
                            id: "nw",
                            x: cropRect.x,
                            y: cropRect.y,
                            cursor: "nwse-resize",
                          },
                          {
                            id: "ne",
                            x: cropRect.x + cropRect.width,
                            y: cropRect.y,
                            cursor: "nesw-resize",
                          },
                          {
                            id: "se",
                            x: cropRect.x + cropRect.width,
                            y: cropRect.y + cropRect.height,
                            cursor: "nwse-resize",
                          },
                          {
                            id: "sw",
                            x: cropRect.x,
                            y: cropRect.y + cropRect.height,
                            cursor: "nesw-resize",
                          },
                        ]
                      : [
                          {
                            id: "nw",
                            x: cropRect.x,
                            y: cropRect.y,
                            cursor: "nwse-resize",
                          },
                          {
                            id: "n",
                            x: cropRect.x + cropRect.width / 2,
                            y: cropRect.y,
                            cursor: "ns-resize",
                          },
                          {
                            id: "ne",
                            x: cropRect.x + cropRect.width,
                            y: cropRect.y,
                            cursor: "nesw-resize",
                          },
                          {
                            id: "e",
                            x: cropRect.x + cropRect.width,
                            y: cropRect.y + cropRect.height / 2,
                            cursor: "ew-resize",
                          },
                          {
                            id: "se",
                            x: cropRect.x + cropRect.width,
                            y: cropRect.y + cropRect.height,
                            cursor: "nwse-resize",
                          },
                          {
                            id: "s",
                            x: cropRect.x + cropRect.width / 2,
                            y: cropRect.y + cropRect.height,
                            cursor: "ns-resize",
                          },
                          {
                            id: "sw",
                            x: cropRect.x,
                            y: cropRect.y + cropRect.height,
                            cursor: "nesw-resize",
                          },
                          {
                            id: "w",
                            x: cropRect.x,
                            y: cropRect.y + cropRect.height / 2,
                            cursor: "ew-resize",
                          },
                        ];

                    return handles.map((handle) => (
                      <rect
                        key={handle.id}
                        x={handle.x - handleSize / 2}
                        y={handle.y - handleSize / 2}
                        width={handleSize}
                        height={handleSize}
                        fill="white"
                        stroke="#3b82f6"
                        strokeWidth={1.5 / zoom}
                        style={{ cursor: handle.cursor }}
                        onMouseDown={(e) => handleResizeMouseDown(e, handle.id)}
                      />
                    ));
                  })()}
                </>
              )}
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
