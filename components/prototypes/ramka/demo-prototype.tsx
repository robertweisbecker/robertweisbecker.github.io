"use client";

import * as React from "react";
import * as Lightbox from "@ramka/react/lightbox";
import { IconArrowsMaximize, IconX } from "@tabler/icons-react";
import { ClipPathEditorCanvas } from "@/components/demos/clip-path-editor/canvas";
import { ClipPathEditorProvider, useClipPathEditor } from "@/components/demos/clip-path-editor/context";
import { ClipPathEditorAdvanced, ClipPathEditorSettings, ClipPathEditorStyle } from "@/components/demos/clip-path-editor/controls";
import { getFillPathD, getPathD } from "@/components/demos/clip-path-editor/geometry";
import { ControlTether, SvgGrid } from "@/components/svg-canvas";
import { ClipPathEditorOutput } from "@/components/demos/clip-path-editor/output";
import { Button } from "@/components/ui/button";

// A non-interactive snapshot keeps both morph surfaces populated without ever
// attaching the provider's shared SVG ref to two canvases at once.
function CanvasSnapshot() {
  const { state } = useClipPathEditor();
  const points = [
    state.start,
    ...(state.curveMode === "line" ? [] : [state.control1]),
    ...(state.curveMode === "cubic" ? [state.control2] : []),
    state.end,
  ];
  return (
    <div aria-hidden className="isolate w-full ps-6 font-mono text-[10px]/none font-normal">
      <div className="relative mx-auto block aspect-square w-full">
        <div className="absolute top-6 right-0 bottom-0 left-0">
          <svg viewBox="0 0 100 100" className="block size-full overflow-visible">
            <SvgGrid intervals={[0, 25, 50, 75, 100]} showGrid showDots />
            <path d={getFillPathD(state)} fill={state.color} strokeWidth={0.5} />
            <path d={getPathD(state)} className="fill-transparent stroke-border" strokeWidth={0.5} strokeLinecap="round" />
            {state.curveMode !== "line" && (
              <>
                <ControlTether fromPoint={state.start} toPoint={state.control1} />
                <ControlTether fromPoint={state.curveMode === "cubic" ? state.control2 : state.control1} toPoint={state.end} />
              </>
            )}
            {points.map((point, index) => (
              <circle key={index} cx={point.x} cy={point.y} r="1.5" className="fill-background stroke-foreground" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

function ResetButton() {
  const { dispatch } = useClipPathEditor();
  return (
    <Button variant="outline" className="min-h-11" onClick={() => dispatch({ type: "reset" })}>
      Reset
    </Button>
  );
}

// The trigger is a button beside the interactive canvas, but the whole surface
// is the useful visual origin for the transition.
function MorphSource({ target, morphRef }: { target: HTMLDivElement | null; morphRef: (node: HTMLElement | null) => void }) {
  React.useLayoutEffect(() => {
    morphRef(target);
    return () => morphRef(null);
  }, [target, morphRef]);
  return null;
}

export function DemoPrototype() {
  const [open, setOpen] = React.useState(false);
  // A state-backed callback ref registers after this later sibling mounts.
  // Reading a ref once in the trigger child's layout effect can see null and
  // silently leave Ramka morphing the Expand button instead of the canvas.
  const [surface, setSurface] = React.useState<HTMLDivElement | null>(null);

  return (
    <ClipPathEditorProvider>
      <Lightbox.Root open={open} onOpenChange={setOpen} count={1} awaitImageDecode={false}>
        <article className="mx-auto grid w-full max-w-3xl gap-6">
          <div className="grid gap-3">
            <p className="text-sm font-medium text-muted-foreground">Interactive notes / CSS</p>
            <h2 className="text-3xl font-semibold tracking-tight">Drawing curves with clip-path</h2>
            <p className="max-w-2xl text-muted-foreground">
              The CSS <code>shape()</code> function makes it possible to describe curves that scale with their container. Drag the points
              below to explore a curve, then copy the result for your own interface.
            </p>
          </div>
          <section aria-label="Clip-path curve playground" className="overflow-hidden rounded-2xl border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
              <div>
                <h3 className="font-semibold">Curve playground</h3>
                <p className="text-sm text-muted-foreground">Drag the handles to shape the curve.</p>
              </div>
              <Lightbox.Trigger index={0} render={<Button variant="outline" className="min-h-11" />}>
                {({ morphRef }) => (
                  <>
                    <MorphSource target={surface} morphRef={morphRef} />
                    <IconArrowsMaximize aria-hidden /> Expand editor
                  </>
                )}
              </Lightbox.Trigger>
            </div>
            <div className="grid gap-5 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:p-6">
              <div ref={setSurface} className="aspect-square self-start rounded-xl bg-muted/50 p-4">
                {open ? <CanvasSnapshot /> : <ClipPathEditorCanvas />}
              </div>
              <div className="grid min-h-36 content-start gap-4">
                <h4 className="text-sm font-semibold">Customize</h4>
                {!open && <ClipPathEditorSettings />}
                <p className="text-sm text-muted-foreground">Expand for a larger canvas, precise coordinates, and code output.</p>
              </div>
            </div>
          </section>
          <p className="text-muted-foreground">
            Try changing the origin and curve type to create rounded cutouts, tabs, or decorative edges. The resulting shape scales with its
            bounding box.
          </p>
        </article>
        <Lightbox.Portal className="relative z-100">
          <Lightbox.Backdrop className="fixed inset-0 bg-black/60 transition-opacity duration-(--lightbox-vt-duration) motion-reduce:transition-none data-closed:opacity-0" />
          <Lightbox.Content
            aria-label="Expanded clip-path curve editor"
            pullToClose={false}
            className="fixed inset-0 flex flex-col overflow-hidden bg-background text-foreground"
          >
            <header className="flex shrink-0 items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
              <div>
                <h2 className="font-semibold">Curve playground</h2>
                <p className="text-sm text-muted-foreground">Drag the handles or adjust the controls.</p>
              </div>
              <Lightbox.Close render={<Button variant="outline" className="min-h-11" />}>
                <IconX aria-hidden /> Close
              </Lightbox.Close>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:overflow-hidden">
              <Lightbox.Stage className="flex min-h-0 items-center justify-center p-5 sm:p-8 lg:overflow-y-auto">
                {({ morphRef }) => (
                  <div ref={morphRef} className="aspect-square w-full max-w-xl rounded-xl bg-muted/50 p-4">
                    <Lightbox.Item index={0} aria-label="1 of 1: Interactive curve canvas">
                      {open ? <ClipPathEditorCanvas /> : <CanvasSnapshot />}
                    </Lightbox.Item>
                  </div>
                )}
              </Lightbox.Stage>
              <aside
                aria-label="Curve controls"
                className="grid content-start gap-5 border-t p-5 lg:overflow-y-auto lg:border-t-0 lg:border-l"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">Customize</h3>
                  <ResetButton />
                </div>
                <ClipPathEditorSettings />
                <ClipPathEditorAdvanced />
                <div className="grid gap-3">
                  <h3 className="font-semibold">Style</h3>
                  <ClipPathEditorStyle />
                </div>
                <div className="grid min-w-0 gap-3">
                  <h3 className="font-semibold">Output</h3>
                  <ClipPathEditorOutput />
                </div>
              </aside>
            </div>
          </Lightbox.Content>
        </Lightbox.Portal>
      </Lightbox.Root>
    </ClipPathEditorProvider>
  );
}
