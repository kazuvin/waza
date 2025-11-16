import { useEffect, useRef } from "react";

type UsePinchZoomOptions = {
  /** 現在のズームレベル */
  currentZoom: number;
  /** ズームレベルを変更する関数 */
  onZoomChange: (newZoom: number) => void;
  /** 最小ズームレベル (デフォルト: 0.1) */
  minZoom?: number;
  /** 最大ズームレベル (デフォルト: 5) */
  maxZoom?: number;
  /** ズーム感度 (デフォルト: 0.002) */
  sensitivity?: number;
  /** 有効化フラグ (デフォルト: true) */
  enabled?: boolean;
};

/**
 * トラックパッドのピンチジェスチャーとマウスホイール+Cmd/Ctrlでズームを制御するカスタムフック
 *
 * @example
 * ```tsx
 * const containerRef = usePinchZoom({
 *   currentZoom: zoom,
 *   onZoomChange: setZoom,
 * });
 *
 * return <div ref={containerRef}>...</div>
 * ```
 */
export function usePinchZoom({
  currentZoom,
  onZoomChange,
  minZoom = 0.1,
  maxZoom = 5,
  sensitivity = 0.002,
  enabled = true,
}: UsePinchZoomOptions) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Cmd/Ctrl + Wheel または トラックパッドのピンチジェスチャー
      // ピンチジェスチャーは ctrlKey: true として検出される
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();

        // deltaYの値に基づいてズーム
        // マイナス = ズームイン、プラス = ズームアウト
        const delta = -e.deltaY * sensitivity;
        const newZoom = currentZoom * (1 + delta);

        // 範囲内にクランプ
        const clampedZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
        onZoomChange(clampedZoom);
      }
    };

    // passive: false を指定してpreventDefaultを有効化
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [currentZoom, onZoomChange, minZoom, maxZoom, sensitivity, enabled]);

  return containerRef;
}
