import { cn } from "@/lib/cn";
import { StyleConfig } from "./schemas";
import {
  DisplayMapping,
  FlexDirectionMapping,
  AlignItemsMapping,
  JustifyContentMapping,
  GridColsMapping,
  ColSpanMapping,
  RowSpanMapping,
  PaddingMapping,
  PaddingXMapping,
  PaddingYMapping,
  MarginMapping,
  MarginXMapping,
  MarginYMapping,
  GapMapping,
  BorderWidthMapping,
  BorderRadiusMapping,
  FontSizeMapping,
  FontWeightMapping,
  TextAlignMapping,
  AnimationMapping,
  TransitionMapping,
} from "./style-constants";

/**
 * StyleConfigをTailwind CSSクラス名に変換（マッピングベース）
 */
export function styleConfigToClassName(config?: StyleConfig): string {
  if (!config) return "";

  const classes: string[] = [];

  // レイアウト
  if (config.display && config.display in DisplayMapping) {
    classes.push(DisplayMapping[config.display as keyof typeof DisplayMapping]);
  }

  if (config.flexDirection && config.flexDirection in FlexDirectionMapping) {
    classes.push(FlexDirectionMapping[config.flexDirection as keyof typeof FlexDirectionMapping]);
  }

  if (config.alignItems && config.alignItems in AlignItemsMapping) {
    classes.push(AlignItemsMapping[config.alignItems as keyof typeof AlignItemsMapping]);
  }

  if (config.justifyContent && config.justifyContent in JustifyContentMapping) {
    classes.push(JustifyContentMapping[config.justifyContent as keyof typeof JustifyContentMapping]);
  }

  // グリッド
  if (config.gridCols && config.gridCols in GridColsMapping) {
    classes.push(GridColsMapping[config.gridCols as keyof typeof GridColsMapping]);
  }

  if (config.colSpan && config.colSpan in ColSpanMapping) {
    classes.push(ColSpanMapping[config.colSpan as keyof typeof ColSpanMapping]);
  }

  if (config.rowSpan && config.rowSpan in RowSpanMapping) {
    classes.push(RowSpanMapping[config.rowSpan as keyof typeof RowSpanMapping]);
  }

  // スペーシング
  if (config.padding && config.padding in PaddingMapping) {
    classes.push(PaddingMapping[config.padding as keyof typeof PaddingMapping]);
  }

  if (config.paddingX && config.paddingX in PaddingXMapping) {
    classes.push(PaddingXMapping[config.paddingX as keyof typeof PaddingXMapping]);
  }

  if (config.paddingY && config.paddingY in PaddingYMapping) {
    classes.push(PaddingYMapping[config.paddingY as keyof typeof PaddingYMapping]);
  }

  if (config.margin && config.margin in MarginMapping) {
    classes.push(MarginMapping[config.margin as keyof typeof MarginMapping]);
  }

  if (config.marginX && config.marginX in MarginXMapping) {
    classes.push(MarginXMapping[config.marginX as keyof typeof MarginXMapping]);
  }

  if (config.marginY && config.marginY in MarginYMapping) {
    classes.push(MarginYMapping[config.marginY as keyof typeof MarginYMapping]);
  }

  if (config.gap && config.gap in GapMapping) {
    classes.push(GapMapping[config.gap as keyof typeof GapMapping]);
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
  if (config.borderWidth && config.borderWidth in BorderWidthMapping) {
    classes.push(BorderWidthMapping[config.borderWidth as keyof typeof BorderWidthMapping]);
  }

  if (config.borderRadius && config.borderRadius in BorderRadiusMapping) {
    classes.push(BorderRadiusMapping[config.borderRadius as keyof typeof BorderRadiusMapping]);
  }

  // タイポグラフィ
  if (config.fontSize && config.fontSize in FontSizeMapping) {
    classes.push(FontSizeMapping[config.fontSize as keyof typeof FontSizeMapping]);
  }

  if (config.fontWeight && config.fontWeight in FontWeightMapping) {
    classes.push(FontWeightMapping[config.fontWeight as keyof typeof FontWeightMapping]);
  }

  if (config.textAlign && config.textAlign in TextAlignMapping) {
    classes.push(TextAlignMapping[config.textAlign as keyof typeof TextAlignMapping]);
  }

  // サイズ
  if (config.width) {
    classes.push(config.width.startsWith("w-") ? config.width : `w-${config.width}`);
  }

  if (config.height) {
    classes.push(config.height.startsWith("h-") ? config.height : `h-${config.height}`);
  }

  // アニメーション
  if (config.animation && config.animation in AnimationMapping) {
    const animationClass = AnimationMapping[config.animation as keyof typeof AnimationMapping];
    if (animationClass) classes.push(animationClass);
  }

  if (config.transition && config.transition in TransitionMapping) {
    const transitionClass = TransitionMapping[config.transition as keyof typeof TransitionMapping];
    if (transitionClass) classes.push(transitionClass);
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
