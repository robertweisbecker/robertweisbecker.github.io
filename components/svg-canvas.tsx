"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion, useReducedMotion } from "motion/react";
import * as React from "react";

type Point = { x: number; y: number };

type Bounds = {
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
};

const DEFAULT_BOUNDS: Required<Bounds> = {
  minX: 0,
  maxX: 100,
  minY: 0,
  maxY: 100,
};

const KEYBOARD_STEP = 1;
const KEYBOARD_STEP_LARGE = 5;
const POINT_RADIUS = 1.5;
const HIT_RADIUS = 8;
const HIT_RADIUS_TOUCH = 14;
const POINT_SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toSvgCoordinates(svg: SVGSVGElement, clientX: number, clientY: number): Point | null {
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const transformed = point.matrixTransform(ctm.inverse());
  return { x: transformed.x, y: transformed.y };
}

function clampPoint(point: Point, bounds?: Bounds): Point {
  const safeBounds = {
    ...DEFAULT_BOUNDS,
    ...bounds,
  };

  return {
    x: clamp(point.x, safeBounds.minX, safeBounds.maxX),
    y: clamp(point.y, safeBounds.minY, safeBounds.maxY),
  };
}

type SvgGridProps = React.ComponentProps<"g"> & {
  intervals?: number[];
  showGrid?: boolean;
  showDots?: boolean;
  showLabels?: boolean;
  viewBoxSize?: number;
  lineColor?: string;
  dotColor?: string;
  labelColor?: string;
};

export function SvgGrid({
  intervals = [0, 25, 50, 75, 100],
  showGrid = true,
  showDots = false,
  showLabels = true,
  viewBoxSize = 100,
  lineColor = "color-mix(in srgb, currentColor 15%, transparent)",
  dotColor = "color-mix(in srgb, currentColor 20%, transparent)",
  labelColor = "var(--muted-foreground)",
  className,
  ...props
}: SvgGridProps) {
  const sortedIntervals = React.useMemo(() => [...new Set(intervals)].toSorted((a, b) => a - b), [intervals]);
  const dotTicks = React.useMemo(() => {
    if (sortedIntervals.length >= 2) {
      return sortedIntervals.flatMap((start, index) => {
        if (index === sortedIntervals.length - 1) return [];
        const end = sortedIntervals[index + 1];
        const segmentSize = end - start;
        if (segmentSize <= 0) return [];
        const step = segmentSize / 5;
        return Array.from({ length: 5 }, (_, dotIndex) => start + step * (dotIndex + 0.5));
      });
    }

    const fallbackStep = viewBoxSize / 20;
    return Array.from({ length: 20 }, (_, index) => fallbackStep * (index + 0.5));
  }, [sortedIntervals, viewBoxSize]);

  return (
    <g className={className} {...props}>
      {showGrid
        ? intervals.flatMap((value) => [
            <line
              key={`v-${value}`}
              x1={value}
              y1={0}
              x2={value}
              y2={viewBoxSize}
              stroke={lineColor}
              // strokeDasharray="2.5 2.5"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />,
            <line
              key={`h-${value}`}
              x1={0}
              y1={value}
              x2={viewBoxSize}
              y2={value}
              stroke={lineColor}
              // strokeDasharray="2.5 2.5"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />,
          ])
        : null}

      {showDots
        ? dotTicks.flatMap((x) =>
            dotTicks.map((y) => (
              <circle
                key={`dot-${x}-${y}`}
                cx={x}
                cy={y}
                r={0.33}
                opacity={0.5}
                fill={dotColor ?? lineColor}
                fillOpacity={dotColor ? 1 : 0.75}
              />
            ))
          )
        : null}

      {showLabels
        ? intervals.map((value) => (
            <text
              key={`x-label-${value}`}
              x={value}
              y={-3}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={labelColor}
              fontSize={2.5}
              className="font-pixel select-none"
            >
              {value}
            </text>
          ))
        : null}

      {showLabels
        ? intervals.map((value) => (
            <text
              key={`y-label-${value}`}
              x={-3}
              y={value}
              textAnchor="end"
              dominantBaseline="middle"
              fill={labelColor}
              fontSize={2.5}
              className="font-pixel select-none"
            >
              {value}
            </text>
          ))
        : null}
    </g>
  );
}

type ControlTetherProps = React.ComponentProps<"line"> & {
  fromPoint: Point;
  toPoint: Point;
};

export function ControlTether({ fromPoint, toPoint, className, ...props }: ControlTetherProps) {
  return (
    <line
      x1={fromPoint.x}
      y1={fromPoint.y}
      x2={toPoint.x}
      y2={toPoint.y}
      className={cn(className)}
      stroke="var(--input)"
      strokeDasharray="0 2.5"
      strokeDashoffset={2.5}
      strokeLinecap="round"
      strokeWidth={1}
      // vectorEffect="non-scaling-stroke"
      {...props}
    />
  );
}

type DraggablePointProps = Omit<React.ComponentProps<"circle">, "onChange"> & {
  svgRef: React.RefObject<SVGSVGElement | null>;
  x: number;
  y: number;
  label: string;
  color?: string;
  hitRadius?: number;
  snapStep?: number;
  bounds?: Bounds;
  disabled?: boolean;
  inverted?: boolean;
  shape?: "circle" | "square";
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onPositionChange: (point: Point) => void;
};

export function DraggablePoint({
  svgRef,
  x,
  y,
  label,
  color = "var(--ring)",
  hitRadius: hitRadiusProp,
  snapStep,
  bounds,
  disabled,
  inverted = false,
  shape = "circle",
  onDragStart,
  onDragEnd,
  onPositionChange,
  className,
  onKeyDown,
}: DraggablePointProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isDragging, setIsDragging] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const isCoarsePointer = useMediaQuery({ pointer: "coarse" });
  const pointerIdRef = React.useRef<number | null>(null);
  const pointRef = React.useRef<SVGCircleElement | null>(null);
  const onDragEndRef = React.useRef(onDragEnd);

  const hitRadius = hitRadiusProp ?? (isCoarsePointer ? HIT_RADIUS_TOUCH : HIT_RADIUS);

  React.useEffect(() => {
    onDragEndRef.current = onDragEnd;
  }, [onDragEnd]);

  const snapPoint = React.useCallback(
    (point: Point) => {
      if (!snapStep || snapStep <= 0) return point;
      return {
        x: Math.round(point.x / snapStep) * snapStep,
        y: Math.round(point.y / snapStep) * snapStep,
      };
    },
    [snapStep]
  );

  const updateFromClientPoint = React.useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const next = toSvgCoordinates(svg, clientX, clientY);
      if (!next) return;
      onPositionChange(snapPoint(clampPoint(next, bounds)));
    },
    [bounds, onPositionChange, snapPoint, svgRef]
  );

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<SVGCircleElement>) => {
      if (disabled) return;
      event.preventDefault();
      pointerIdRef.current = event.pointerId;
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
      onDragStart?.();
      pointRef.current?.focus({ preventScroll: true });
      updateFromClientPoint(event.clientX, event.clientY);
    },
    [disabled, onDragStart, updateFromClientPoint]
  );

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<SVGCircleElement>) => {
      if (disabled) return;
      if (pointerIdRef.current !== event.pointerId) return;
      updateFromClientPoint(event.clientX, event.clientY);
    },
    [disabled, updateFromClientPoint]
  );

  const handlePointerUp = React.useCallback(
    (event: React.PointerEvent<SVGCircleElement>) => {
      if (disabled) return;
      if (pointerIdRef.current !== event.pointerId) return;
      pointerIdRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
      setIsDragging(false);
      onDragEndRef.current?.();
    },
    [disabled]
  );

  const handleLostPointerCapture = React.useCallback(() => {
    if (disabled) return;
    pointerIdRef.current = null;
    setIsDragging(false);
    onDragEndRef.current?.();
  }, [disabled]);

  React.useEffect(() => {
    if (!isDragging) return;

    const endDrag = () => {
      pointerIdRef.current = null;
      setIsDragging(false);
      onDragEndRef.current?.();
    };

    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [isDragging]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<SVGCircleElement>) => {
      if (disabled) return;
      const step = snapStep && snapStep > 0 ? snapStep : event.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP;
      let deltaX = 0;
      let deltaY = 0;

      switch (event.key) {
        case "ArrowLeft":
          deltaX = -step;
          break;
        case "ArrowRight":
          deltaX = step;
          break;
        case "ArrowUp":
          deltaY = -step;
          break;
        case "ArrowDown":
          deltaY = step;
          break;
        default:
          onKeyDown?.(event);
          return;
      }

      event.preventDefault();
      onPositionChange(snapPoint(clampPoint({ x: x + deltaX, y: y + deltaY }, bounds)));
      onKeyDown?.(event);
    },
    [bounds, disabled, onKeyDown, onPositionChange, snapPoint, snapStep, x, y]
  );

  const transition = prefersReducedMotion ? { duration: 0 } : POINT_SPRING;
  const pointScale = isDragging ? 0.9 : isHovered ? 1.5 : 1;
  const pointR = POINT_RADIUS * pointScale;
  const haloR = isDragging ? hitRadius * 0.75 : isHovered ? POINT_RADIUS * 2.5 : POINT_RADIUS;
  const pointFill = inverted ? "var(--background)" : color;
  const pointStroke = inverted ? color : "var(--card)";
  const isSquare = shape === "square";

  return (
    <g style={{ color }}>
      {/* Hit area: invisible, handles all pointer/keyboard events */}
      <circle
        ref={pointRef}
        cx={x}
        cy={y}
        r={hitRadius}
        fill="transparent"
        stroke="none"
        className={cn(
          "outline-none",
          disabled ? "pointer-events-none cursor-not-allowed opacity-50" : isDragging ? "cursor-grabbing" : "cursor-grab",
          className
        )}
        style={{ touchAction: "none" }}
        onPointerDown={disabled ? undefined : handlePointerDown}
        onPointerMove={disabled ? undefined : handlePointerMove}
        onPointerUp={disabled ? undefined : handlePointerUp}
        onPointerCancel={disabled ? undefined : handlePointerUp}
        onLostPointerCapture={disabled ? undefined : handleLostPointerCapture}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-label={label}
        aria-disabled={disabled}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(x)}
        aria-valuetext={`x ${Math.round(x)}, y ${Math.round(y)}`}
        onKeyDown={disabled ? undefined : handleKeyDown}
      />

      {/* Halo ring: hover/drag visual feedback, SVG attributes only */}
      <motion.circle
        cx={x}
        cy={y}
        r={POINT_RADIUS}
        fill={color}
        fillOpacity={0}
        stroke={color}
        strokeOpacity={0}
        strokeWidth={0}
        pointerEvents="none"
        aria-hidden="true"
        initial={false}
        animate={{
          r: haloR,
          fillOpacity: isHovered && !isDragging ? 0.15 : 0,
          strokeOpacity: isDragging ? 1 : 0,
          strokeWidth: isDragging ? 0.5 : 0,
        }}
        transition={transition}
      />

      {/* Point marker: transforms on <g> wrapper, SVG attrs on shape */}
      {isSquare ? (
        <motion.g animate={{ scale: pointScale }} transition={transition} style={{ transformOrigin: `${x}px ${y}px` }}>
          <motion.rect
            x={x - POINT_RADIUS}
            y={y - POINT_RADIUS}
            width={POINT_RADIUS * 2}
            height={POINT_RADIUS * 2}
            fill={pointFill}
            className={cn(inverted ? "drop-shadow-xs/100" : "drop-shadow-xs/20")}
            stroke={pointStroke}
            strokeWidth={0.5}
            rx={0}
            pointerEvents="none"
            aria-hidden="true"
            initial={false}
            animate={{ rx: isDragging || isHovered ? 10 : 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
        </motion.g>
      ) : (
        <motion.circle
          cx={x}
          cy={y}
          r={POINT_RADIUS}
          fill={pointFill}
          className="drop-shadow-xs/20"
          stroke={pointStroke}
          strokeWidth={0.5}
          pointerEvents="none"
          aria-hidden="true"
          initial={false}
          animate={{ r: pointR }}
          transition={transition}
        />
      )}
    </g>
  );
}

function getAxisTransform(value: number, max: number, axis: "x" | "y") {
  if (value === 0) return "translate(0, 0)";
  if (value === max) return axis === "x" ? "translate(-100%, 0)" : "translate(0, -100%)";
  return axis === "x" ? "translate(-50%, 0)" : "translate(0, -50%)";
}

type AxisLabelsProps = {
  ticks: number[];
  axis: "x" | "y";
  max?: number;
  className?: string;
};

export function AxisLabels({ ticks, axis, max = 100, className }: AxisLabelsProps) {
  if (axis === "x") {
    return (
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 tabular-nums", className)}>
        {ticks.map((tick) => (
          <span
            key={`x-${tick}`}
            className="absolute"
            style={{
              left: `${(tick / max) * 100}%`,
              transform: getAxisTransform(tick, max, "x"),
            }}
          >
            {tick}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("pointer-events-none absolute top-0 bottom-0 w-6 tabular-nums", className)}>
      {ticks.map((tick) => (
        <span
          key={`y-${tick}`}
          className="absolute right-0 text-right"
          style={{
            top: `${(tick / max) * 100}%`,
            transform: getAxisTransform(tick, max, "y"),
          }}
        >
          {tick}
        </span>
      ))}
    </div>
  );
}
