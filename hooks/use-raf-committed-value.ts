"use client";

import * as React from "react";

export function useRafCommittedValue<T>(value: T, paused = false) {
  const [committedValue, setCommittedValue] = React.useState(value);

  React.useEffect(() => {
    if (paused) return;
    const frame = window.requestAnimationFrame(() => setCommittedValue(value));
    return () => window.cancelAnimationFrame(frame);
  }, [paused, value]);

  return committedValue;
}
