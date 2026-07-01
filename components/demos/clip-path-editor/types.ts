export type Point = { x: number; y: number };

export type CurveMode = "line" | "quadratic" | "cubic";

export const curveModes = ["line", "quadratic", "cubic"] as const satisfies readonly CurveMode[];

export type CornerPresetKey = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export const cornerPresetKeys = ["top-left", "top-right", "bottom-left", "bottom-right"] as const satisfies readonly CornerPresetKey[];

export type ClipPathEditorState = {
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

export type ClipPathEditorAction =
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
