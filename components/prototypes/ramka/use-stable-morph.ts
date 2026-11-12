"use client";

import { useCallback, useEffect, useRef, type MouseEvent } from "react";

// Keep hover/focus transforms from moving the snapshot's source after the
// pointer leaves it for the dialog. Freeze the whole pile: a different image
// may become the return target while the gallery is open.
export function useStableMorph() {
  const restoreRef = useRef<(() => void) | null>(null);
  const release = useCallback(() => {
    restoreRef.current?.();
    restoreRef.current = null;
  }, []);

  useEffect(() => release, [release]);

  const capture = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!(event.target instanceof Element) || !event.target.closest("[data-morph-card]")) return;
      release();
      const cards = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("[data-morph-card]"));
      // Read every transform before writing styles so the pile is one snapshot.
      const snapshots = cards.map((card) => {
        const style = getComputedStyle(card);
        return {
          card,
          transform: style.transform,
          zIndex: style.zIndex,
          previousTransform: card.style.transform,
          previousTransition: card.style.transition,
          previousZIndex: card.style.zIndex,
        };
      });
      snapshots.forEach(({ card, transform, zIndex }) => {
        card.style.transition = "none";
        card.style.transform = transform;
        card.style.zIndex = zIndex;
      });
      restoreRef.current = () =>
        snapshots.forEach(({ card, previousTransform, previousTransition, previousZIndex }) => {
          card.style.transition = previousTransition;
          card.style.transform = previousTransform;
          card.style.zIndex = previousZIndex;
        });
    },
    [release]
  );

  const complete = useCallback(
    (open: boolean) => {
      if (!open) release();
    },
    [release]
  );
  return { capture, complete };
}
