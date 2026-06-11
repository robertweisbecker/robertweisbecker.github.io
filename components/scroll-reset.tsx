"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

/**
 * With `experimental.viewTransition` enabled, Next.js can preserve the window
 * scroll position across client navigations. This resets scroll to the top on
 * pathname change, unless the navigation targets an in-page anchor.
 */
export function ScrollReset() {
  const pathname = usePathname();

  React.useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
