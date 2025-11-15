import { cn } from "@/lib/cn";
import { StyleConfig } from "./schemas";

/**
 * StyleConfigをTailwind CSSクラス名に変換
 */
export function styleConfigToClassName(config?: StyleConfig): string {
  if (!config) return "";

  const classes: string[] = [];

  // レイアウト
  if (config.display) {
    const displayMap = {
      block: "block",
      flex: "flex",
      grid: "grid",
      "inline-block": "inline-block",
    };
    classes.push(displayMap[config.display]);
  }

  if (config.flexDirection) {
    const flexDirMap = {
      row: "flex-row",
      column: "flex-col",
    };
    classes.push(flexDirMap[config.flexDirection]);
  }

  if (config.alignItems) {
    const alignMap = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };
    classes.push(alignMap[config.alignItems]);
  }

  if (config.justifyContent) {
    const justifyMap = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    };
    classes.push(justifyMap[config.justifyContent]);
  }

  // グリッド
  if (config.gridCols) {
    classes.push(`grid-cols-${config.gridCols}`);
  }

  if (config.colSpan) {
    classes.push(`col-span-${config.colSpan}`);
  }

  if (config.rowSpan) {
    classes.push(`row-span-${config.rowSpan}`);
  }

  // スペーシング
  const spacingMap = {
    none: "0",
    sm: "2",
    md: "4",
    lg: "6",
    xl: "8",
  };

  if (config.padding) {
    classes.push(`p-${spacingMap[config.padding]}`);
  }

  if (config.margin) {
    classes.push(`m-${spacingMap[config.margin]}`);
  }

  if (config.gap) {
    classes.push(`gap-${spacingMap[config.gap]}`);
  }

  // カラー
  if (config.backgroundColor) {
    classes.push(
      config.backgroundColor.startsWith("#")
        ? `bg-[${config.backgroundColor}]`
        : `bg-${config.backgroundColor}`
    );
  }

  if (config.textColor) {
    classes.push(
      config.textColor.startsWith("#")
        ? `text-[${config.textColor}]`
        : `text-${config.textColor}`
    );
  }

  if (config.borderColor) {
    classes.push(
      config.borderColor.startsWith("#")
        ? `border-[${config.borderColor}]`
        : `border-${config.borderColor}`
    );
  }

  // ボーダー
  if (config.borderWidth !== undefined) {
    if (config.borderWidth === 0) {
      classes.push("border-0");
    } else if (config.borderWidth === 1) {
      classes.push("border");
    } else {
      classes.push(`border-${config.borderWidth}`);
    }
  }

  if (config.borderRadius) {
    const radiusMap = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };
    classes.push(radiusMap[config.borderRadius]);
  }

  // タイポグラフィ
  if (config.fontSize) {
    classes.push(`text-${config.fontSize}`);
  }

  if (config.fontWeight) {
    classes.push(`font-${config.fontWeight}`);
  }

  if (config.textAlign) {
    classes.push(`text-${config.textAlign}`);
  }

  // サイズ
  if (config.width) {
    classes.push(
      config.width.startsWith("w-") ? config.width : `w-[${config.width}]`
    );
  }

  if (config.height) {
    classes.push(
      config.height.startsWith("h-") ? config.height : `h-[${config.height}]`
    );
  }

  // アニメーション
  if (config.animation && config.animation !== "none") {
    const animationMap = {
      "fade-in": "animate-fade-in",
      "slide-up": "animate-slide-up",
      bounce: "animate-bounce",
    };
    classes.push(animationMap[config.animation]);
  }

  if (config.transition && config.transition !== "none") {
    const transitionMap = {
      all: "transition-all",
      colors: "transition-colors",
      transform: "transition-transform",
    };
    classes.push(transitionMap[config.transition]);
  }

  // カスタムクラス（最優先）
  if (config.customClasses) {
    classes.push(config.customClasses);
  }

  return cn(classes);
}

/**
 * StyleConfigとclassNameをマージしてTailwindクラス名を生成
 */
export function mergeStyles(style?: StyleConfig, className?: string): string {
  const styleClasses = styleConfigToClassName(style);
  return cn(styleClasses, className);
}
