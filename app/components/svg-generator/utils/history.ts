/**
 * 履歴管理のための型定義とユーティリティ
 */

export type HistoryState<T> = {
  past: T[];
  present: T;
  future: T[];
};

/**
 * 新しい状態を履歴に追加
 */
export function addHistory<T>(
  history: HistoryState<T>,
  newState: T
): HistoryState<T> {
  return {
    past: [...history.past, history.present],
    present: newState,
    future: [], // 新しい変更を加えたら未来の履歴はクリア
  };
}

/**
 * Undo: 一つ前の状態に戻る
 */
export function undo<T>(history: HistoryState<T>): HistoryState<T> {
  if (history.past.length === 0) {
    return history;
  }

  const previous = history.past[history.past.length - 1];
  const newPast = history.past.slice(0, history.past.length - 1);

  return {
    past: newPast,
    present: previous,
    future: [history.present, ...history.future],
  };
}

/**
 * Redo: 一つ先の状態に進む
 */
export function redo<T>(history: HistoryState<T>): HistoryState<T> {
  if (history.future.length === 0) {
    return history;
  }

  const next = history.future[0];
  const newFuture = history.future.slice(1);

  return {
    past: [...history.past, history.present],
    present: next,
    future: newFuture,
  };
}

/**
 * 履歴の初期状態を作成
 */
export function createInitialHistory<T>(initialState: T): HistoryState<T> {
  return {
    past: [],
    present: initialState,
    future: [],
  };
}

/**
 * Undo可能かチェック
 */
export function canUndo<T>(history: HistoryState<T>): boolean {
  return history.past.length > 0;
}

/**
 * Redo可能かチェック
 */
export function canRedo<T>(history: HistoryState<T>): boolean {
  return history.future.length > 0;
}
