"use client";

import { ControlTether, DraggablePoint, SvgGrid } from "@/components/svg-canvas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";
import { getClipPathValue, getFillPathD, getPathD } from "./geometry";
import { useClipPathEditor } from "./context";

const AXIS_TICKS = [0, 25, 50, 75, 100];

export const START_POINT_COLOR = "var(--color-success-primary)";
export const END_POINT_COLOR = "var(--color-destructive)";
export const CONTROL_POINT_COLOR = "var(--color-info-primary)";

export function ClipPathEditorCanvas({ className }: React.ComponentProps<"div">) {
  const { state, dispatch, svgRef } = useClipPathEditor();
  const pathD = getPathD(state);
  const fillPathD = getFillPathD(state);
  const snapStep = state.snapToGrid ? 5 : undefined;
  const setDragging = (isDragging: boolean) => dispatch({ type: "set-dragging", isDragging });

  return (
    <div className={cn("isolate w-full ps-6 font-mono text-[10px]/none font-normal", className)}>
      <div className="relative mx-auto block aspect-square w-full">
        <div className="absolute top-6 right-0 bottom-0 left-0">
          <svg viewBox="0 0 100 100" className="block size-full overflow-visible" style={{ touchAction: "none" }} ref={svgRef}>
            <SvgGrid intervals={AXIS_TICKS} showGrid showDots />
            <path d={fillPathD} fill={state.color} strokeWidth={0.5} />
            <path d={pathD} className="fill-transparent stroke-border" strokeWidth={0.5} strokeLinecap="round" />
            {state.curveMode !== "line" ? (
              <>
                <ControlTether fromPoint={state.start} toPoint={state.control1} />
                {state.curveMode === "quadratic" ? (
                  <ControlTether fromPoint={state.control1} toPoint={state.end} />
                ) : (
                  <ControlTether fromPoint={state.control2} toPoint={state.end} />
                )}
              </>
            ) : null}
            <DraggablePoint
              svgRef={svgRef}
              label="Start point"
              x={state.start.x}
              y={state.start.y}
              color={START_POINT_COLOR}
              shape="square"
              snapStep={snapStep}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              onPositionChange={(point) => dispatch({ type: "set-start", point })}
            />
            {state.curveMode !== "line" ? (
              <DraggablePoint
                svgRef={svgRef}
                label={state.curveMode === "cubic" ? "Control point 1" : "Control point"}
                x={state.control1.x}
                y={state.control1.y}
                color={state.curveMode === "cubic" ? START_POINT_COLOR : CONTROL_POINT_COLOR}
                inverted
                snapStep={snapStep}
                onDragStart={() => setDragging(true)}
                onDragEnd={() => setDragging(false)}
                onPositionChange={(point) => dispatch({ type: "set-control1", point })}
              />
            ) : null}
            {state.curveMode === "cubic" ? (
              <DraggablePoint
                svgRef={svgRef}
                label="Control point 2"
                x={state.control2.x}
                y={state.control2.y}
                color={END_POINT_COLOR}
                inverted
                snapStep={snapStep}
                onDragStart={() => setDragging(true)}
                onDragEnd={() => setDragging(false)}
                onPositionChange={(point) => dispatch({ type: "set-control2", point })}
              />
            ) : null}
            <DraggablePoint
              svgRef={svgRef}
              label="End point"
              x={state.end.x}
              y={state.end.y}
              color={END_POINT_COLOR}
              shape="square"
              snapStep={snapStep}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              onPositionChange={(point) => dispatch({ type: "set-end", point })}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ClipPathEditorDemo({ className }: React.ComponentProps<"div">) {
  const { state } = useClipPathEditor();
  const clipPathValue = getClipPathValue(state);

  return (
    <div className={cn("flex gap-0 bg-background px-5 pt-2", className)}>
      <Button variant="ghost" className="relative rounded-b-none bg-card drop-shadow-xs">
        <div
          style={{ clipPath: clipPathValue, width: state.shapeSize, height: state.shapeSize, left: -state.shapeSize }}
          className="pointer-events-none absolute bottom-0 bg-inherit"
          aria-hidden
        />
        Button
        <div
          style={{ clipPath: clipPathValue, width: state.shapeSize, height: state.shapeSize, right: -state.shapeSize }}
          className="absolute bottom-0 rotate-y-180 bg-inherit"
          aria-hidden
        />
      </Button>
      <Button variant="ghost">Tab 2</Button>
      <Button variant="ghost">Tab 3</Button>
    </div>
  );
}
