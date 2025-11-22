"use client";

import { useSvgEditorContext } from "../contexts/svg-editor-context";
import { CropPanel } from "./crop-panel";
import { PropertiesPanel } from "./properties-panel";
import { PanelProps, PanelTitleProps } from ".";

type RightPanelProps = {
  headingLevel?: PanelTitleProps["as"];
} & PanelProps;

export function RightPanel({ headingLevel = "h2", ...props }: RightPanelProps) {
  const { isCropMode } = useSvgEditorContext();

  if (isCropMode) {
    return <CropPanel headingLevel={headingLevel} {...props} />;
  }

  return <PropertiesPanel headingLevel={headingLevel} {...props} />;
}
