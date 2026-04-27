"use client";

import { CodeBlock } from "@/components/code-block";
import { ColorSwatchGroup, type ColorSwatch } from "@/components/color-swatch-group";
import { InfoTip } from "@/components/info-tip";
import { NumberSlider } from "@/components/number-slider";
import { ControlTether, DraggablePoint, SvgGrid } from "@/components/svg-canvas";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleIcon, CollapsiblePanel, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGrid, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
  IconArrowBackUp,
  IconBoxAlignBottomLeftFilled,
  IconBoxAlignBottomRightFilled,
  IconBoxAlignTopLeftFilled,
  IconBoxAlignTopRightFilled,
  IconLine,
  IconRestore,
  IconVectorBezier2,
  IconVectorSpline,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Tooltip, TooltipContent, TooltipGroup, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type Point = { x: number; y: number };

type CurveMode = "line" | "quadratic" | "cubic";

type ClipPathEditorState = {
  start: Point;
  end: Point;
  control1: Point;
  control2: Point;
  curveMode: CurveMode;
  cornerPreset: CornerPresetKey | "custom";
  color: string;
  shapeSize: number;
  snapToGrid: boolean;
  isDragging: boolean;
};

type ClipPathEditorAction =
  | { type: "set-start"; point: Point }
  | { type: "set-end"; point: Point }
  | { type: "set-control1"; point: Point }
  | { type: "set-control2"; point: Point }
  | { type: "set-curve-mode"; mode: CurveMode }
  | { type: "set-preset"; preset: CornerPresetKey }
  | { type: "set-color"; color: string }
  | { type: "set-size"; size: number }
  | { type: "set-snap-to-grid"; snapToGrid: boolean }
  | { type: "set-dragging"; isDragging: boolean }
  | { type: "reset" };

type CornerPresetKey = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNER_PRESETS: Record<
  CornerPresetKey,
  {
    start: Point;
    end: Point;
    control1: Point;
    label: string;
    icon: React.ReactNode;
  }
> = {
  "top-left": {
    start: { x: 0, y: 0 },
    end: { x: 100, y: 100 },
    control1: { x: 100, y: 0 },
    label: "Top left",
    icon: <IconBoxAlignTopLeftFilled className="size-5" stroke={1.5} />,
  },
  "top-right": {
    start: { x: 100, y: 0 },
    end: { x: 0, y: 100 },
    control1: { x: 0, y: 0 },
    label: "Top right",
    icon: <IconBoxAlignTopRightFilled className="size-5" stroke={1.5} />,
  },
  "bottom-left": {
    start: { x: 0, y: 100 },
    end: { x: 100, y: 0 },
    control1: { x: 100, y: 100 },
    label: "Bottom left",
    icon: <IconBoxAlignBottomLeftFilled className="size-5" stroke={1.5} />,
  },
  "bottom-right": {
    start: { x: 100, y: 100 },
    end: { x: 0, y: 0 },
    control1: { x: 0, y: 100 },
    label: "Bottom right",
    icon: <IconBoxAlignBottomRightFilled className="size-5" stroke={1.5} />,
  },
};

const DEFAULT_STATE: ClipPathEditorState = {
  start: { x: 0, y: 100 },
  end: { x: 100, y: 0 },
  control1: { x: 100, y: 100 },
  control2: { x: 100, y: 100 },
  curveMode: "quadratic",
  cornerPreset: "bottom-left",
  color: "var(--muted)",
  shapeSize: 8,
  snapToGrid: false,
  isDragging: false,
};

const SWATCHES: ColorSwatch[] = [
  { value: "var(--primary)", label: "Primary", color: "var(--primary)" },
  {
    value: "var(--background)",
    label: "Background",
    color: "var(--background)",
  },
  { value: "var(--card)", label: "Card", color: "var(--card)" },
  { value: "var(--popover)", label: "Popover", color: "var(--popover)" },
  { value: "var(--secondary)", label: "Secondary", color: "var(--secondary)" },
  { value: "var(--muted)", label: "Muted", color: "var(--muted)" },
  { value: "var(--accent)", label: "Accent", color: "var(--accent)" },
  {
    value: "var(--destructive)",
    label: "Destructive",
    color: "var(--destructive)",
  },
];

const AXIS_TICKS = [0, 25, 50, 75, 100];
export const START_POINT_COLOR = "var(--color-success-primary)";
export const END_POINT_COLOR = "var(--color-destructive)";
export const CONTROL_POINT_COLOR = "var(--color-info-primary)";
export const CONTROL_POINT_COLOR_2 = "var(--color-muted-foreground)";

const SLIDER_LAYOUT_SPRING = {
  type: "spring" as const,
  visualDuration: 0.3,
  bounce: 0,
};

const SLIDER_ENTER_EXIT = {
  duration: 0.15,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatPercent(value: number) {
  return `${Math.round(value * 100) / 100}%`;
}

function formatPoint(point: Point) {
  return `${formatPercent(point.x)} ${formatPercent(point.y)}`;
}

function getTailwindBackgroundClass(color: string) {
  const tokenMatch = color.match(/^var\(--([a-z0-9-]+)\)$/i);
  if (tokenMatch?.[1]) {
    return `bg-${tokenMatch[1]}`;
  }

  const normalized = color.trim().replace(/\s+/g, "_");
  return `bg-[${normalized}]`;
}

function getTailwindSizeClass(sizeInPx: number) {
  const pxToSize = new Map<number, string>([
    [0, "0"],
    [2, "0.5"],
    [4, "1"],
    [6, "1.5"],
    [8, "2"],
    [10, "2.5"],
    [12, "3"],
    [14, "3.5"],
    [16, "4"],
    [20, "5"],
    [24, "6"],
    [28, "7"],
    [32, "8"],
  ]);

  const token = pxToSize.get(sizeInPx);
  return token ? `size-${token}` : `size-[${sizeInPx}px]`;
}

function getPresetPointsForMode(preset: CornerPresetKey, mode: CurveMode) {
  const base = CORNER_PRESETS[preset];
  const mid = 50;

  if (mode === "cubic") {
    const isBottomPreset = preset.startsWith("bottom");
    return {
      start: base.start,
      end: base.end,
      control1: isBottomPreset ? { x: mid, y: base.start.y } : { x: base.start.x, y: mid },
      control2: isBottomPreset ? { x: mid, y: base.end.y } : { x: base.end.x, y: mid },
    };
  }

  if (mode === "quadratic") {
    return {
      start: base.start,
      end: base.end,
      control1: base.control1,
      control2: base.control1,
    };
  }

  return {
    start: base.start,
    end: base.end,
    control1: base.control1,
    control2: base.control1,
  };
}

function isPointEqual(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y;
}

function clipPathEditorReducer(state: ClipPathEditorState, action: ClipPathEditorAction): ClipPathEditorState {
  switch (action.type) {
    case "set-start":
      return { ...state, start: action.point, cornerPreset: "custom" };
    case "set-end":
      return { ...state, end: action.point, cornerPreset: "custom" };
    case "set-control1":
      return { ...state, control1: action.point, cornerPreset: "custom" };
    case "set-control2":
      return { ...state, control2: action.point, cornerPreset: "custom" };
    case "set-curve-mode":
      if (state.cornerPreset === "custom") {
        return { ...state, curveMode: action.mode };
      }

      // Keep the selected preset “live” when switching curve modes.
      // This ensures Line/Cubic support presets and the selection remains valid.
      if (state.cornerPreset in CORNER_PRESETS) {
        const preset = CORNER_PRESETS[state.cornerPreset];
        const mid = 50;

        if (action.mode === "cubic") {
          const isBottomPreset = state.cornerPreset.startsWith("bottom");
          return {
            ...state,
            curveMode: action.mode,
            start: preset.start,
            end: preset.end,
            // Cubic presets:
            // - bottom presets: lock control points on X=50, with Y matching the endpoints
            // - top presets: lock control points on Y=50, with X matching the endpoints
            control1: isBottomPreset ? { x: mid, y: preset.start.y } : { x: preset.start.x, y: mid },
            control2: isBottomPreset ? { x: mid, y: preset.end.y } : { x: preset.end.x, y: mid },
          };
        }

        if (action.mode === "quadratic") {
          return {
            ...state,
            curveMode: action.mode,
            start: preset.start,
            end: preset.end,
            control1: preset.control1,
            control2: preset.control1,
          };
        }

        // line: controls aren't used, but keep them stable.
        return {
          ...state,
          curveMode: action.mode,
          start: preset.start,
          end: preset.end,
          control1: preset.control1,
          control2: preset.control1,
        };
      }

      return { ...state, curveMode: action.mode };
    case "set-preset": {
      const preset = CORNER_PRESETS[action.preset];
      const mid = 50;

      if (state.curveMode === "cubic") {
        const isBottomPreset = action.preset.startsWith("bottom");
        return {
          ...state,
          start: preset.start,
          end: preset.end,
          control1: isBottomPreset ? { x: mid, y: preset.start.y } : { x: preset.start.x, y: mid },
          control2: isBottomPreset ? { x: mid, y: preset.end.y } : { x: preset.end.x, y: mid },
          cornerPreset: action.preset,
        };
      }

      if (state.curveMode === "quadratic") {
        return {
          ...state,
          start: preset.start,
          end: preset.end,
          control1: preset.control1,
          control2: preset.control1,
          cornerPreset: action.preset,
        };
      }

      // line: controls aren't used, but keep them stable.
      return {
        ...state,
        start: preset.start,
        end: preset.end,
        control1: preset.control1,
        control2: preset.control1,
        cornerPreset: action.preset,
      };
    }
    case "set-color":
      return { ...state, color: action.color };
    case "set-size":
      return { ...state, shapeSize: clamp(action.size, 1, 32) };
    case "set-snap-to-grid":
      return { ...state, snapToGrid: action.snapToGrid };
    case "set-dragging":
      return { ...state, isDragging: action.isDragging };
    case "reset":
      return DEFAULT_STATE;
    default:
      return state;
  }
}

function PointSliders({
  id,
  label,
  color,
  point,
  snapToGrid,
  disabled,
  onChange,
  className,
  variant = "endpoint",
}: {
  id: string;
  label: string;
  color: string;
  point: Point;
  snapToGrid: boolean;
  disabled?: boolean;
  onChange: (point: Point) => void;
  className?: string;
  variant?: "endpoint" | "control";
}) {
  const sliderStep = snapToGrid ? 5 : 1;
  const isControl = variant === "control";

  return (
    <FieldSet className={cn(className, "gap-1")}>
      <FieldLegend className="flex items-center gap-2 text-sm">
        <span
          className={cn(
            "inline-block size-2 outline outline-(--point-color)",
            isControl ? "rounded-full bg-transparent" : "rounded-px bg-(--point-color) outline-background"
          )}
          style={{ "--point-color": color } as React.CSSProperties}
          aria-hidden
        />
        {label}
      </FieldLegend>
      <FieldGroup className={cn("ms-1 gap-1 border-s", isControl && "border-dashed")} style={{ borderColor: color }}>
        <NumberSlider
          id={`${id}-x`}
          label="X"
          min={0}
          max={100}
          step={sliderStep}
          value={point.x}
          onValueChange={(x) => onChange({ ...point, x })}
          format="percent"
          aria-label={`${label} x`}
          className="ps-3 **:data-[slot=number-field]:max-w-60 [&_label]:text-xs [&_label]:leading-none [&_label]:font-normal"
          disabled={disabled}
        />
        <NumberSlider
          id={`${id}-y`}
          label="Y"
          min={0}
          max={100}
          step={sliderStep}
          value={point.y}
          onValueChange={(y) => onChange({ ...point, y })}
          format="percent"
          aria-label={`${label} y`}
          className="ps-3 **:data-[slot=number-field]:max-w-60 [&_label]:text-xs [&_label]:leading-none [&_label]:font-normal"
          disabled={disabled}
        />
      </FieldGroup>
    </FieldSet>
  );
}

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <Tooltip>
      <TooltipProvider delay={0}>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon-sm" className="hover:[&>svg]:-rotate-90 active:[&>svg]:animate-spin" />
          }
          onClick={onReset}
        >
          <IconRestore className="rotate-45 transition-[transform,rotate] delay-100 duration-150 ease-in-out" />
        </TooltipTrigger>
        <TooltipContent side="left">Reset</TooltipContent>
      </TooltipProvider>
    </Tooltip>
  );
}

type ClipPathEditorContextValue = {
  state: ClipPathEditorState;
  dispatch: React.Dispatch<ClipPathEditorAction>;
  svgRef: React.RefObject<SVGSVGElement | null>;
};

const ClipPathEditorContext = React.createContext<ClipPathEditorContextValue | null>(null);

function useClipPathEditorContext() {
  const context = React.useContext(ClipPathEditorContext);
  if (!context) {
    throw new Error("ClipPathEditor compound components must be used within <ClipPathEditor>.");
  }
  return context;
}

function useDerivedValues(state: ClipPathEditorState) {
  const pathD = React.useMemo(() => {
    switch (state.curveMode) {
      case "line":
        return `M ${state.start.x} ${state.start.y} L ${state.end.x} ${state.end.y}`;
      case "quadratic":
        return `M ${state.start.x} ${state.start.y} Q ${state.control1.x} ${state.control1.y} ${state.end.x} ${state.end.y}`;
      case "cubic":
        return `M ${state.start.x} ${state.start.y} C ${state.control1.x} ${state.control1.y} ${state.control2.x} ${state.control2.y} ${state.end.x} ${state.end.y}`;
      default:
        return `M ${state.start.x} ${state.start.y} Q ${state.control1.x} ${state.control1.y} ${state.end.x} ${state.end.y}`;
    }
  }, [
    state.curveMode,
    state.start.x,
    state.start.y,
    state.end.x,
    state.end.y,
    state.control1.x,
    state.control1.y,
    state.control2.x,
    state.control2.y,
  ]);

  const fillPathD = React.useMemo(() => {
    switch (state.curveMode) {
      case "line":
        return `M ${state.start.x} ${state.start.y} L ${state.end.x} ${state.end.y} L ${state.end.x} ${state.start.y} L ${state.start.x} ${state.start.y} Z`;
      case "quadratic":
        return `M ${state.start.x} ${state.start.y} Q ${state.control1.x} ${state.control1.y} ${state.end.x} ${state.end.y} L ${state.end.x} ${state.start.y} L ${state.start.x} ${state.start.y} Z`;
      case "cubic":
        return `M ${state.start.x} ${state.start.y} C ${state.control1.x} ${state.control1.y} ${state.control2.x} ${state.control2.y} ${state.end.x} ${state.end.y} L ${state.end.x} ${state.start.y} L ${state.start.x} ${state.start.y} Z`;
      default:
        return `M ${state.start.x} ${state.start.y} Q ${state.control1.x} ${state.control1.y} ${state.end.x} ${state.end.y} L ${state.end.x} ${state.start.y} L ${state.start.x} ${state.start.y} Z`;
    }
  }, [
    state.curveMode,
    state.start.x,
    state.start.y,
    state.end.x,
    state.end.y,
    state.control1.x,
    state.control1.y,
    state.control2.x,
    state.control2.y,
  ]);

  const clipPathValue = React.useMemo(() => {
    const common = `vline to ${formatPercent(state.start.y)},hline to ${formatPercent(state.start.x)}`;
    switch (state.curveMode) {
      case "line":
        return `shape(from ${formatPoint(state.start)},line to ${formatPoint(state.end)},${common})`;
      case "quadratic":
        return `shape(from ${formatPoint(state.start)},curve to ${formatPoint(state.end)} with ${formatPoint(state.control1)},${common})`;
      case "cubic":
        return `shape(from ${formatPoint(state.start)},curve to ${formatPoint(state.end)} with ${formatPoint(state.control1)}/${formatPoint(state.control2)},${common})`;
      default:
        return `shape(from ${formatPoint(state.start)},curve to ${formatPoint(state.end)} with ${formatPoint(state.control1)},${common})`;
    }
  }, [state.curveMode, state.start, state.end, state.control1, state.control2]);

  return { pathD, fillPathD, clipPathValue };
}

export function ClipPathEditor({ children, className }: React.ComponentProps<"div">) {
  const [state, dispatch] = React.useReducer(clipPathEditorReducer, DEFAULT_STATE);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const value = React.useMemo<ClipPathEditorContextValue>(() => ({ state, dispatch, svgRef }), [state]);

  return (
    <ClipPathEditorContext.Provider value={value}>
      <div className={cn("grid gap-4", className)}>{children}</div>
    </ClipPathEditorContext.Provider>
  );
}

export function ClipPathEditorResetControl() {
  const { dispatch } = useClipPathEditorContext();

  return <ResetButton onReset={() => dispatch({ type: "reset" })} />;
}

export function ClipPathEditorSnapControl({ className }: { className?: string }) {
  const { state, dispatch } = useClipPathEditorContext();
  const snapToGrid = state.snapToGrid === true;

  return (
    <Field orientation="horizontal" className={cn("gap-2", className)}>
      <Label htmlFor="snap-to-grid" className="text-sm/none">
        Snap to grid
      </Label>
      <InfoTip
        help
        description="Make handles and sliders snap to 5% increments when dragging. Does not affect number fields."
        className="-my-1"
      />
      <Switch
        size="sm"
        id="snap-to-grid"
        checked={snapToGrid}
        onCheckedChange={(checked) =>
          dispatch({
            type: "set-snap-to-grid",
            snapToGrid: checked === true,
          })
        }
      />
    </Field>
  );
}

export function ClipPathEditorCanvas({ className }: React.ComponentProps<"div">) {
  const { state, dispatch, svgRef } = useClipPathEditorContext();
  const { pathD, fillPathD } = useDerivedValues(state);
  const snapToGrid = state.snapToGrid === true;

  return (
    <div className={cn("isolate w-full ps-6 font-mono text-[10px]/none font-normal", className)}>
      <div className="relative mx-auto block aspect-square w-full">
        {/* <AxisLabels ticks={AXIS_TICKS} axis="x" className="inset-x-3" />
        <AxisLabels ticks={AXIS_TICKS} axis="y" className="top-6 -left-6 pt-6" /> */}
        <div className="absolute top-6 right-0 bottom-0 left-0">
          <svg
            viewBox="0 0 100 100"
            className="block size-full overflow-visible"
            style={{ touchAction: "none" }}
            ref={svgRef}
          >
            <SvgGrid intervals={AXIS_TICKS} showGrid={true} showDots={true} />
            {/* Layer 2: Clipped shape */}
            <path d={fillPathD} fill={state.color} strokeWidth={0.5} />
            {/* Layer 3: Clipped stroke (separate layer) */}
            <path d={pathD} className="fill-transparent stroke-border" strokeWidth={0.5} strokeLinecap="round" />
            {state.curveMode !== "line" ? (
              <>
                <ControlTether fromPoint={state.start} toPoint={state.control1} />
                {state.curveMode === "quadratic" ? (
                  <ControlTether fromPoint={state.control1} toPoint={state.end} />
                ) : (
                  <>
                    <ControlTether fromPoint={state.control2} toPoint={state.end} />
                  </>
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
              snapStep={snapToGrid ? 5 : undefined}
              onDragStart={() => dispatch({ type: "set-dragging", isDragging: true })}
              onDragEnd={() => dispatch({ type: "set-dragging", isDragging: false })}
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
                snapStep={snapToGrid ? 5 : undefined}
                onDragStart={() => dispatch({ type: "set-dragging", isDragging: true })}
                onDragEnd={() => dispatch({ type: "set-dragging", isDragging: false })}
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
                snapStep={snapToGrid ? 5 : undefined}
                onDragStart={() => dispatch({ type: "set-dragging", isDragging: true })}
                onDragEnd={() => dispatch({ type: "set-dragging", isDragging: false })}
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
              snapStep={snapToGrid ? 5 : undefined}
              onDragStart={() => dispatch({ type: "set-dragging", isDragging: true })}
              onDragEnd={() => dispatch({ type: "set-dragging", isDragging: false })}
              onPositionChange={(point) => dispatch({ type: "set-end", point })}
            />
          </svg>
          {/* <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 block size-full overflow-visible"
            aria-hidden="true"
          >
          </svg> */}
          {/* <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            className="absolute inset-0 block size-full overflow-visible"
            role="img"
            aria-label="Interactive clip-path curve editor canvas"
            style={{ touchAction: "none" }}
          >
            <path
              d={pathD}
              className="fill-none stroke-border"
              strokeWidth={1}
              strokeLinecap="round"
              // vectorEffect="non-scaling-stroke"
            />
            {state.curveMode !== "line" ? (
              <>
                <ControlTether fromPoint={state.start} toPoint={state.control1} />
                {state.curveMode === "quadratic" ? (
                  <ControlTether fromPoint={state.control1} toPoint={state.end} />
                ) : (
                  <>
                    <ControlTether fromPoint={state.control2} toPoint={state.end} />
                  </>
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
              snapStep={snapToGrid ? 5 : undefined}
              onDragStart={() => dispatch({ type: "set-dragging", isDragging: true })}
              onDragEnd={() => dispatch({ type: "set-dragging", isDragging: false })}
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
                snapStep={snapToGrid ? 5 : undefined}
                onDragStart={() => dispatch({ type: "set-dragging", isDragging: true })}
                onDragEnd={() => dispatch({ type: "set-dragging", isDragging: false })}
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
                snapStep={snapToGrid ? 5 : undefined}
                onDragStart={() => dispatch({ type: "set-dragging", isDragging: true })}
                onDragEnd={() => dispatch({ type: "set-dragging", isDragging: false })}
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
              snapStep={snapToGrid ? 5 : undefined}
              onDragStart={() => dispatch({ type: "set-dragging", isDragging: true })}
              onDragEnd={() => dispatch({ type: "set-dragging", isDragging: false })}
              onPositionChange={(point) => dispatch({ type: "set-end", point })}
            />
          </svg> */}
        </div>
      </div>
    </div>
  );
}

export function ClipPathEditorDemo({ className }: React.ComponentProps<"div">) {
  const { state } = useClipPathEditorContext();
  const { clipPathValue } = useDerivedValues(state);

  return (
    <div className={cn("flex gap-0 bg-background px-5 pt-2", className)}>
      <Button variant="ghost" className="relative rounded-b-none bg-card drop-shadow-xs">
        <div
          style={{
            clipPath: clipPathValue,
            width: state.shapeSize,
            height: state.shapeSize,
            left: -state.shapeSize,
          }}
          className="pointer-events-none absolute bottom-0 bg-inherit"
          aria-hidden
        />
        Button
        <div
          style={{
            clipPath: clipPathValue,
            width: state.shapeSize,
            height: state.shapeSize,
            right: -state.shapeSize,
          }}
          className="absolute bottom-0 rotate-y-180 bg-inherit"
          aria-hidden
        />
      </Button>
      <Button variant="ghost">Tab 2</Button>
      <Button variant="ghost">Tab 3</Button>
    </div>
  );
}

/** Default stacked preview: canvas, snap, then tab demo. Compose `ClipPathEditorCanvas` and `ClipPathEditorDemo` separately for custom layouts. */
export function ClipPathEditorPreview({ className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <ClipPathEditorCanvas />
      <ClipPathEditorSnapControl />
      <ClipPathEditorDemo />
    </div>
  );
}

export function ClipPathEditorSettings({ className }: React.ComponentProps<"div">) {
  const { state, dispatch } = useClipPathEditorContext();
  const initialPreset: CornerPresetKey = state.cornerPreset === "custom" ? "bottom-left" : state.cornerPreset;
  const [lastSelectedPreset, setLastSelectedPreset] = React.useState<CornerPresetKey>(initialPreset);

  React.useEffect(() => {
    if (state.cornerPreset !== "custom") {
      setLastSelectedPreset(state.cornerPreset as CornerPresetKey);
    }
  }, [state.cornerPreset]);

  const isPresetModified = React.useMemo(() => {
    const presetPoints = getPresetPointsForMode(lastSelectedPreset, state.curveMode);
    const isStartMatch = isPointEqual(state.start, presetPoints.start);
    const isEndMatch = isPointEqual(state.end, presetPoints.end);
    const isControl1Match = isPointEqual(state.control1, presetPoints.control1);
    const isControl2Match = isPointEqual(state.control2, presetPoints.control2);

    if (state.curveMode === "line") {
      return !(isStartMatch && isEndMatch);
    }
    if (state.curveMode === "quadratic") {
      return !(isStartMatch && isEndMatch && isControl1Match);
    }
    return !(isStartMatch && isEndMatch && isControl1Match && isControl2Match);
  }, [lastSelectedPreset, state.control1, state.control2, state.curveMode, state.end, state.start]);
  const presetValue = React.useMemo(() => {
    if (state.cornerPreset !== "custom") return [state.cornerPreset];
    return isPresetModified ? [] : [lastSelectedPreset];
  }, [isPresetModified, lastSelectedPreset, state.cornerPreset]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-2 items-stretch gap-x-4">
        <Field orientation="vertical" className="h-full min-h-0">
          <Label>Origin</Label>
          <div className="flex min-h-0 flex-1 flex-col">
            <TooltipGroup side="bottom">
              <ToggleGrid
                columns={2}
                spacing={0.5}
                value={presetValue}
                variant="elevated"
                onValueChange={(next) => {
                  const value = Array.isArray(next) ? next[0] : undefined;
                  if (!value) return;
                  if (value in CORNER_PRESETS) {
                    setLastSelectedPreset(value as CornerPresetKey);
                    dispatch({
                      type: "set-preset",
                      preset: value as CornerPresetKey,
                    });
                  }
                }}
                size="sm"
                aria-label="Choose origin preset"
                className="h-full min-h-0 w-full flex-1 grid-rows-2 rounded-xl"
              >
                {(Object.keys(CORNER_PRESETS) as CornerPresetKey[]).map((presetKey) => (
                  <div key={presetKey} className="relative h-full min-h-0">
                    <TooltipTrigger
                      tooltip={CORNER_PRESETS[presetKey].label}
                      render={
                        <ToggleGroupItem
                          value={presetKey}
                          aria-label={CORNER_PRESETS[presetKey].label}
                          shape="default"
                          className={cn(
                            "h-full min-h-0 w-full",
                            presetKey === lastSelectedPreset ? "bg-card/50 dark:bg-popover/50" : ""
                          )}
                        />
                      }
                    >
                      {CORNER_PRESETS[presetKey].icon}
                    </TooltipTrigger>
                    {isPresetModified && presetKey === lastSelectedPreset ? (
                      <IconArrowBackUp
                        className="absolute top-1 right-1.5 z-10 size-3 text-foreground/64"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    ) : null}
                  </div>
                ))}
              </ToggleGrid>
            </TooltipGroup>
          </div>
        </Field>

        <div className="flex flex-col items-center gap-2">
          <Field orientation="vertical">
            <Label htmlFor="curve-mode">Type</Label>
            <TooltipGroup>
              <ToggleGrid
                columns={3}
                id="curve-mode"
                value={[state.curveMode]}
                onValueChange={(next) => {
                  const mode = Array.isArray(next) ? next[0] : next;
                  if (!mode) return;
                  if (mode === "line" || mode === "quadratic" || mode === "cubic") {
                    dispatch({ type: "set-curve-mode", mode });
                  }
                }}
                spacing={0.5}
                size="sm"
                variant="elevated"
                aria-label="Curve mode"
                className="w-fit"
              >
                <TooltipTrigger tooltip="Linear path" render={<ToggleGroupItem value="line" />}>
                  <IconLine />
                </TooltipTrigger>
                <TooltipTrigger tooltip="Quadratic bézier curve" render={<ToggleGroupItem value="quadratic" />}>
                  <IconVectorSpline />
                </TooltipTrigger>
                <TooltipTrigger tooltip="Cubic bézier curve" render={<ToggleGroupItem value="cubic" />}>
                  <IconVectorBezier2 />
                </TooltipTrigger>
              </ToggleGrid>
            </TooltipGroup>
          </Field>
          <ClipPathEditorSnapControl className="my-auto" />
        </div>
      </div>
    </div>
  );
}

export function ClipPathEditorAdvanced({ className }: React.ComponentProps<"div">) {
  const { state, dispatch } = useClipPathEditorContext();

  return (
    <Collapsible defaultOpen={false} className={cn("w-full", className)}>
      <Card variant="muted">
        <CardHeader>
          <CardTitle className="w-full">
            <CollapsibleTrigger className="flex w-full items-center justify-between gap-1 text-muted-foreground hover:text-foreground data-panel-open:text-foreground">
              Advanced
              {/* <IconChevronDown className="size-5 opacity-50 transition-all duration-100 ease-out group-hover/collapsible-trigger:opacity-100 in-data-panel-open:rotate-180" /> */}
              <CollapsibleIcon />
            </CollapsibleTrigger>
          </CardTitle>
          {/* <CardDescription className="text-xs">Manually set the point coordinates</CardDescription> */}
        </CardHeader>

        <CollapsiblePanel className="overflow-visible px-1">
          <CardContent className="transition-[height]">
            <motion.div
              id="clip-path-editor-advanced"
              className="relative"
              initial={false}
              layout
              animate={{ height: "auto" }}
              transition={{ height: SLIDER_LAYOUT_SPRING }}
              // style={{ overflow: "hidden" }}
            >
              <FieldGroup className="relative grid gap-3" id="fieldset-points">
                <motion.div layout key="start-point" transition={{ layout: SLIDER_LAYOUT_SPRING }}>
                  <PointSliders
                    id="start-point"
                    label="Start point"
                    color={START_POINT_COLOR}
                    point={state.start}
                    snapToGrid={state.snapToGrid}
                    onChange={(point) => dispatch({ type: "set-start", point })}
                  />
                </motion.div>

                <AnimatePresence initial={false} mode="popLayout">
                  {state.curveMode !== "line" ? (
                    <motion.div
                      key="control-1"
                      layout
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{
                        layout: SLIDER_LAYOUT_SPRING,
                        opacity: SLIDER_ENTER_EXIT,
                        y: SLIDER_ENTER_EXIT,
                        scale: SLIDER_ENTER_EXIT,
                      }}
                      style={{ transformOrigin: "top" }}
                    >
                      <PointSliders
                        id="control-point-1"
                        label="Control point"
                        color={state.curveMode === "cubic" ? START_POINT_COLOR : CONTROL_POINT_COLOR}
                        variant="control"
                        point={state.control1}
                        snapToGrid={state.snapToGrid}
                        onChange={(point) => dispatch({ type: "set-control1", point })}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <motion.div layout key="end-point" transition={{ layout: SLIDER_LAYOUT_SPRING }}>
                  <PointSliders
                    id="end-point"
                    label="End point"
                    color={END_POINT_COLOR}
                    point={state.end}
                    snapToGrid={state.snapToGrid}
                    onChange={(point) => dispatch({ type: "set-end", point })}
                  />
                </motion.div>

                <AnimatePresence initial={false} mode="wait">
                  {state.curveMode === "cubic" ? (
                    <motion.div
                      key="control-2"
                      layout
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{
                        layout: SLIDER_LAYOUT_SPRING,
                        opacity: SLIDER_ENTER_EXIT,
                        y: SLIDER_ENTER_EXIT,
                        scale: SLIDER_ENTER_EXIT,
                      }}
                      style={{ transformOrigin: "top" }}
                    >
                      <PointSliders
                        id="control-point-2"
                        label="Control point 2"
                        color={END_POINT_COLOR}
                        variant="control"
                        point={state.control2}
                        snapToGrid={state.snapToGrid}
                        onChange={(point) => dispatch({ type: "set-control2", point })}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </FieldGroup>
            </motion.div>
          </CardContent>
        </CollapsiblePanel>
      </Card>
    </Collapsible>
  );
}

export function ClipPathEditorStyle({ className }: React.ComponentProps<"div">) {
  const { state, dispatch } = useClipPathEditorContext();

  return (
    <div className={cn("grid gap-4", className)}>
      <Field className="grid gap-2">
        <FieldLabel className="text-sm">Fill</FieldLabel>
        <ColorSwatchGroup
          colors={SWATCHES}
          value={state.color}
          onValueChange={(color) => dispatch({ type: "set-color", color })}
        />
      </Field>

      <NumberSlider
        id="clip-path-editor-size"
        label="Size"
        unit="px"
        min={8}
        max={32}
        step={1}
        value={Math.round(state.shapeSize)}
        onValueChange={(size) => dispatch({ type: "set-size", size })}
        format={{ maximumFractionDigits: 0 }}
        labelAction={
          <InfoTip
            help
            description="Size only affects the code output dimensions. The preview always fills its container."
            className="-my-1"
          />
        }
      />
    </div>
  );
}

/** Single column: settings then style. Prefer `ClipPathEditorSettings` + `ClipPathEditorStyle` in separate cards when layout calls for it. */
export function ClipPathEditorControls({ className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <ClipPathEditorSettings />
      <ClipPathEditorSnapControl />
      <FieldSeparator />
      <ClipPathEditorStyle />
    </div>
  );
}

export function ClipPathEditorOutput({ className }: React.ComponentProps<"div">) {
  const { state } = useClipPathEditorContext();
  const [committedState, setCommittedState] = React.useState(state);
  React.useEffect(() => {
    if (!state.isDragging) {
      setCommittedState(state);
    }
  }, [state]);
  const { pathD, clipPathValue } = useDerivedValues(committedState);
  const [activeTab, setActiveTab] = React.useState<"tailwind" | "svg" | "css">("tailwind");
  const activeOutput = React.useMemo(() => {
    switch (activeTab) {
      case "css":
        return {
          code: `span {\n  width: ${committedState.shapeSize}px;\n  height: ${committedState.shapeSize}px;\n  background-color: ${committedState.color};\n  clip-path: ${clipPathValue};\n}`,
          filename: "clip-path.css",
          language: "css" as const,
        };
      case "svg":
        return {
          code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="${committedState.color}">\n  <path d="${pathD}" />\n</svg>`,
          filename: "path.svg",
          language: "html" as const,
        };
      case "tailwind":
      default:
        return {
          code: `<div className="${getTailwindBackgroundClass(committedState.color)} ${getTailwindSizeClass(committedState.shapeSize)} [clip-path:${clipPathValue.replace(/\s+/g, "_")}]" />`,
          filename: "tailwind",
          language: "ts" as const,
        };
    }
  }, [activeTab, clipPathValue, committedState.color, committedState.shapeSize, pathD]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(next) => {
        if (next === "tailwind" || next === "svg" || next === "css") {
          setActiveTab(next);
        }
      }}
      className={cn("w-full", className)}
    >
      <TabsList variant="line">
        <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
        <TabsTrigger value="svg">SVG</TabsTrigger>
        <TabsTrigger value="css">CSS</TabsTrigger>
      </TabsList>
      <TabsContent value={activeTab} className="mt-2">
        <CodeBlock
          code={activeOutput.code}
          filename={activeOutput.filename}
          language={activeOutput.language}
          lineNumbers={activeTab === "tailwind"}
          selectAll={activeTab === "svg"}
          isUpdating={state.isDragging}
        />
      </TabsContent>
    </Tabs>
  );
}
