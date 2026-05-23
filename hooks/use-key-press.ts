"use client";

import { useEffect, useRef } from "react";

export type KeyPressOptions = {
  /** ⌘ on macOS, Win key on Windows/Linux. */
  meta?: boolean;
  /** Control key. */
  ctrl?: boolean;
  /** Cross-platform Cmd-or-Ctrl modifier. Use this for shortcuts like "⌘/Ctrl+K". */
  mod?: boolean;
  shift?: boolean;
  alt?: boolean;
  /** Whether to call `event.preventDefault()` when the shortcut matches. @default true */
  preventDefault?: boolean;
  /** Disable the listener without unmounting the consumer. @default true */
  enabled?: boolean;
  /** Target to attach the listener to. @default window */
  target?: EventTarget | null;
  /** @default "keydown" */
  event?: "keydown" | "keyup" | "keypress";
};

/**
 * Listen for a keyboard shortcut and invoke a handler when matched.
 *
 * @example
 * useKeyPress("/", () => setOpen((o) => !o), { mod: true });
 * useKeyPress(["Escape"], () => setOpen(false));
 */
export function useKeyPress(key: string | readonly string[], handler: (event: KeyboardEvent) => void, options: KeyPressOptions = {}): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const keysHash = (Array.isArray(key) ? key : [key as string]).map((k) => k.toLowerCase()).join("|");

  const {
    meta = false,
    ctrl = false,
    mod = false,
    shift = false,
    alt = false,
    preventDefault = true,
    enabled = true,
    target,
    event = "keydown",
  } = options;

  useEffect(() => {
    if (!enabled) return;
    const targetEl = target ?? (typeof window === "undefined" ? null : window);
    if (!targetEl) return;

    const keys = new Set(keysHash.split("|"));

    function onKey(e: Event) {
      const ke = e as KeyboardEvent;
      if (!keys.has(ke.key.toLowerCase())) return;
      if (mod ? !(ke.metaKey || ke.ctrlKey) : meta !== ke.metaKey || ctrl !== ke.ctrlKey) return;
      if (shift !== ke.shiftKey) return;
      if (alt !== ke.altKey) return;
      if (preventDefault) ke.preventDefault();
      handlerRef.current(ke);
    }

    targetEl.addEventListener(event, onKey);
    return () => targetEl.removeEventListener(event, onKey);
  }, [keysHash, meta, ctrl, mod, shift, alt, preventDefault, enabled, target, event]);
}
