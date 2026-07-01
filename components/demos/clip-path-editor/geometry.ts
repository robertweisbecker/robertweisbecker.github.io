import type { ClipPathEditorState, CornerPresetKey, CurveMode, Point } from "./types";

type CornerPreset = {
  start: Point;
  end: Point;
  control1: Point;
  label: string;
};

export const cornerPresets: Record<CornerPresetKey, CornerPreset> = {
  "top-left": {
    start: { x: 0, y: 0 },
    end: { x: 100, y: 100 },
    control1: { x: 100, y: 0 },
    label: "Top left",
  },
  "top-right": {
    start: { x: 100, y: 0 },
    end: { x: 0, y: 100 },
    control1: { x: 0, y: 0 },
    label: "Top right",
  },
  "bottom-left": {
    start: { x: 0, y: 100 },
    end: { x: 100, y: 0 },
    control1: { x: 100, y: 100 },
    label: "Bottom left",
  },
  "bottom-right": {
    start: { x: 100, y: 100 },
    end: { x: 0, y: 0 },
    control1: { x: 0, y: 100 },
    label: "Bottom right",
  },
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100) / 100}%`;
}

export function formatPoint(point: Point) {
  return `${formatPercent(point.x)} ${formatPercent(point.y)}`;
}

export function pointsEqual(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y;
}

export function getPresetPointsForMode(presetKey: CornerPresetKey, mode: CurveMode) {
  const preset = cornerPresets[presetKey];

  if (mode === "cubic") {
    const isBottomPreset = presetKey.startsWith("bottom");
    return {
      start: preset.start,
      end: preset.end,
      control1: isBottomPreset ? { x: 50, y: preset.start.y } : { x: preset.start.x, y: 50 },
      control2: isBottomPreset ? { x: 50, y: preset.end.y } : { x: preset.end.x, y: 50 },
    };
  }

  return {
    start: preset.start,
    end: preset.end,
    control1: preset.control1,
    control2: preset.control1,
  };
}

export function getPathD(state: ClipPathEditorState) {
  switch (state.curveMode) {
    case "line":
      return `M ${state.start.x} ${state.start.y} L ${state.end.x} ${state.end.y}`;
    case "quadratic":
      return `M ${state.start.x} ${state.start.y} Q ${state.control1.x} ${state.control1.y} ${state.end.x} ${state.end.y}`;
    case "cubic":
      return `M ${state.start.x} ${state.start.y} C ${state.control1.x} ${state.control1.y} ${state.control2.x} ${state.control2.y} ${state.end.x} ${state.end.y}`;
  }
}

export function getFillPathD(state: ClipPathEditorState) {
  const close = `L ${state.end.x} ${state.start.y} L ${state.start.x} ${state.start.y} Z`;

  switch (state.curveMode) {
    case "line":
      return `M ${state.start.x} ${state.start.y} L ${state.end.x} ${state.end.y} ${close}`;
    case "quadratic":
      return `M ${state.start.x} ${state.start.y} Q ${state.control1.x} ${state.control1.y} ${state.end.x} ${state.end.y} ${close}`;
    case "cubic":
      return `M ${state.start.x} ${state.start.y} C ${state.control1.x} ${state.control1.y} ${state.control2.x} ${state.control2.y} ${state.end.x} ${state.end.y} ${close}`;
  }
}

export function getClipPathValue(state: ClipPathEditorState) {
  const close = `vline to ${formatPercent(state.start.y)},hline to ${formatPercent(state.start.x)}`;

  switch (state.curveMode) {
    case "line":
      return `shape(from ${formatPoint(state.start)},line to ${formatPoint(state.end)},${close})`;
    case "quadratic":
      return `shape(from ${formatPoint(state.start)},curve to ${formatPoint(state.end)} with ${formatPoint(state.control1)},${close})`;
    case "cubic":
      return `shape(from ${formatPoint(state.start)},curve to ${formatPoint(state.end)} with ${formatPoint(state.control1)}/${formatPoint(state.control2)},${close})`;
  }
}

export function getTailwindBackgroundClass(color: string) {
  const tokenMatch = color.match(/^var\(--([a-z0-9-]+)\)$/i);
  if (tokenMatch?.[1]) return `bg-${tokenMatch[1]}`;

  const normalized = color.trim().replace(/\s+/g, "_");
  return `bg-[${normalized}]`;
}

export function getTailwindSizeClass(sizeInPx: number) {
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
