"use client";

import { Measurer } from "mesurer";
import { useEffect } from "react";

/**
 * Strips mesurer's `@layer base` (Tailwind preflight) from its injected
 * stylesheet so reset rules like `border: 0 solid` don't clobber the app's
 * border tokens.  Theme vars and utility classes are left intact so the
 * overlay UI renders normally.
 */
export function DevMeasurer() {
  useEffect(() => {
    const el = document.getElementById("mesurer-styles") as HTMLStyleElement | null;
    if (!el?.textContent) return;

    const original = el.textContent;
    el.textContent = original.replace(/@layer base\s*\{[\s\S]*?\n\}/, "");

    return () => {
      el.textContent = original;
    };
  }, []);

  return <Measurer />;
}
