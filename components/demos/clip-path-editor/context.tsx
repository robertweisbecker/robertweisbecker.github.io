"use client";

import * as React from "react";
import { clipPathEditorReducer, DEFAULT_CLIP_PATH_EDITOR_STATE } from "./state";
import type { ClipPathEditorAction, ClipPathEditorState } from "./types";

type ClipPathEditorContextValue = {
  state: ClipPathEditorState;
  dispatch: React.Dispatch<ClipPathEditorAction>;
  svgRef: React.RefObject<SVGSVGElement | null>;
};

const ClipPathEditorContext = React.createContext<ClipPathEditorContextValue | null>(null);

export function useClipPathEditor() {
  const context = React.useContext(ClipPathEditorContext);
  if (!context) throw new Error("useClipPathEditor must be used within <ClipPathEditorProvider>.");
  return context;
}

export function ClipPathEditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(clipPathEditorReducer, DEFAULT_CLIP_PATH_EDITOR_STATE);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const value = React.useMemo<ClipPathEditorContextValue>(() => ({ state, dispatch, svgRef }), [state]);

  return <ClipPathEditorContext.Provider value={value}>{children}</ClipPathEditorContext.Provider>;
}
