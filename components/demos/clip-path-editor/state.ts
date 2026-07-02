import { clamp, getPresetPointsForMode } from "./geometry";
import type { ClipPathEditorAction, ClipPathEditorState, CornerPresetKey, Point } from "./types";

export const DEFAULT_CLIP_PATH_EDITOR_STATE: ClipPathEditorState = {
  ...getPresetPointsForMode("bottom-left", "quadratic"),
  curveMode: "quadratic",
  cornerPreset: "bottom-left",
  color: "var(--muted)",
  shapeSize: 8,
  snapToGrid: false,
  isDragging: false,
};

function setPoint(state: ClipPathEditorState, key: "start" | "end" | "control1" | "control2", point: Point) {
  return { ...state, [key]: point, cornerPreset: "custom" as const };
}

function applyPreset(state: ClipPathEditorState, preset: CornerPresetKey, curveMode = state.curveMode): ClipPathEditorState {
  return {
    ...state,
    ...getPresetPointsForMode(preset, curveMode),
    curveMode,
    cornerPreset: preset,
  };
}

export function clipPathEditorReducer(state: ClipPathEditorState, action: ClipPathEditorAction): ClipPathEditorState {
  switch (action.type) {
    case "set-start":
      return setPoint(state, "start", action.point);
    case "set-end":
      return setPoint(state, "end", action.point);
    case "set-control1":
      return setPoint(state, "control1", action.point);
    case "set-control2":
      return setPoint(state, "control2", action.point);
    case "set-curve-mode":
      return state.cornerPreset === "custom" ? { ...state, curveMode: action.mode } : applyPreset(state, state.cornerPreset, action.mode);
    case "set-preset":
      return applyPreset(state, action.preset);
    case "set-color":
      return { ...state, color: action.color };
    case "set-size":
      return { ...state, shapeSize: clamp(action.size, 1, 32) };
    case "set-snap-to-grid":
      return { ...state, snapToGrid: action.snapToGrid };
    case "set-dragging":
      return { ...state, isDragging: action.isDragging };
    case "reset":
      return DEFAULT_CLIP_PATH_EDITOR_STATE;
    default:
      void (action satisfies never);
      return state;
  }
}
