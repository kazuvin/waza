"use client";

import { useKeyboardShortcut } from "@/app/hooks/use-keyboard-shortcut";
import { useSvgEditorSnapshot, getCanUndo, getCanRedo } from "./store";
import { deletePath, undoAction, redoAction, toggleCropMode } from "./actions";

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
        deletePath(selectedPathId);
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
        deletePath(selectedPathId);
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
      undoAction();
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
      redoAction();
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
      redoAction();
    }
  );

  // Vキーでカーソルモード
  useKeyboardShortcut(
    {
      key: "v",
      enabled: isCropMode,
    },
    () => {
      toggleCropMode();
    }
  );

  // Cキーでクロップモード
  useKeyboardShortcut(
    {
      key: "c",
      enabled: !isCropMode,
    },
    () => {
      toggleCropMode();
    }
  );

  return null;
}
