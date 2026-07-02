"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type CursorPoint = {
  elementX: number;
  elementY: number;
};

export function AxisCursor() {
  const [mouse, setMouse] = React.useState<CursorPoint>({ elementX: 0, elementY: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handlePointerMove = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({
      elementX: event.clientX - rect.left,
      elementY: event.clientY - rect.top,
    });
  }, []);

  const handlePointerLeave = React.useCallback(() => {
    setMouse({ elementX: 0, elementY: 0 });
  }, []);

  const xIntersecting = mouse.elementX > 0 && mouse.elementX < 200;
  const yIntersecting = mouse.elementY > 0 && mouse.elementY < 200;
  const isIntersecting = xIntersecting && yIntersecting;

  return (
    <div className="relative overflow-clip">
      <div
        className={cn("absolute top-0 h-screen w-px -translate-x-1/2 bg-border", isIntersecting ? "opacity-100" : "opacity-0")}
        style={{
          left: `${mouse.elementX - 4}px`,
        }}
      />
      <div
        className={cn("absolute left-0 h-px w-screen -translate-y-1/2 bg-border", isIntersecting ? "opacity-100" : "opacity-0")}
        style={{
          top: `${mouse.elementY - 4}px`,
        }}
      />
      <div
        className="absolute h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 animate-caret-blink bg-primary"
        style={{
          top: `${mouse.elementY - 4}px`,
          left: `${mouse.elementX - 4}px`,
        }}
      />
      <div className="size-50 bg-info" ref={containerRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} />
    </div>
  );
}
