"use client";

import { useKeyboardShortcut } from "@/app/hooks/use-keyboard-shortcut";
import {
  svgEditorActions,
  useSvgEditorSnapshot,
  getCanUndo,
  getCanRedo,
} from "./store";

export function KeyboardShortcuts() {
  const { selectedPathId, isCropMode } = useSvgEditorSnapshot();
  const canUndo = getCanUndo();
  const canRedo = getCanRedo();

  // Deleteキーでパスを削除
  useKeyboardShortcut(
    {
      key: "Delete",
      enabled: selectedPathId !== null,
    },
    () => {
      if (selectedPathId) {
        svgEditorActions.deletePath(selectedPathId);
      }
    }
  );

  // Backspaceキーでもパスを削除（macOS対応）
  useKeyboardShortcut(
    {
      key: "Backspace",
      enabled: selectedPathId !== null,
    },
    () => {
      if (selectedPathId) {
        svgEditorActions.deletePath(selectedPathId);
      }
    }
  );

  // Cmd+Z / Ctrl+Z でUndo
  useKeyboardShortcut(
    {
      key: "z",
      metaKey: true,
      ctrlKey: true,
      enabled: canUndo,
    },
    () => {
      svgEditorActions.undo();
    }
  );

  // Cmd+Shift+Z / Ctrl+Shift+Z でRedo
  useKeyboardShortcut(
    {
      key: "z",
      metaKey: true,
      ctrlKey: true,
      shiftKey: true,
      enabled: canRedo,
    },
    () => {
      svgEditorActions.redo();
    }
  );

  // Cmd+Y / Ctrl+Y でRedo（Windows/Linux向け）
  useKeyboardShortcut(
    {
      key: "y",
      metaKey: true,
      ctrlKey: true,
      enabled: canRedo,
    },
    () => {
      svgEditorActions.redo();
    }
  );

  // Vキーでカーソルモード
  useKeyboardShortcut(
    {
      key: "v",
      enabled: isCropMode,
    },
    () => {
      svgEditorActions.toggleCropMode();
    }
  );

  // Cキーでクロップモード
  useKeyboardShortcut(
    {
      key: "c",
      enabled: !isCropMode,
    },
    () => {
      svgEditorActions.toggleCropMode();
    }
  );

  return null;
}
