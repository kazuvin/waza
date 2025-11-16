import { useEffect, useRef } from "react";

export type ScrollIntoViewOptions = {
  /** スクロールの動作 (デフォルト: "smooth") */
  behavior?: ScrollBehavior;
  /** 垂直方向の配置 (デフォルト: "nearest") */
  block?: ScrollLogicalPosition;
  /** 水平方向の配置 (デフォルト: "nearest") */
  inline?: ScrollLogicalPosition;
};

/**
 * 要素を自動的にスクロール表示範囲内に移動させるカスタムフック
 *
 * @example
 * ```tsx
 * const [selectedId, setSelectedId] = useState<string | null>(null);
 * const ref = useScrollIntoView(selectedId);
 *
 * return (
 *   <div>
 *     {items.map(item => (
 *       <div
 *         key={item.id}
 *         ref={item.id === selectedId ? ref : null}
 *       >
 *         {item.name}
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useScrollIntoView<T = HTMLElement>(
  dependency: unknown,
  options?: ScrollIntoViewOptions
) {
  const ref = useRef<T>(null);
  const {
    behavior = "smooth",
    block = "nearest",
    inline = "nearest",
  } = options || {};

  useEffect(() => {
    if (ref.current && dependency !== null && dependency !== undefined) {
      (ref.current as unknown as Element).scrollIntoView({
        behavior,
        block,
        inline,
      });
    }
  }, [dependency, behavior, block, inline]);

  return ref;
}
