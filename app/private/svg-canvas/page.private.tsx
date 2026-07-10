"use client";

import * as React from "react";
import Link from "next/link";

import { Section } from "@/components/blocks/section";
import { ColorDiagrams } from "@/components/demos/color-diagrams";
import { AxisLabels, ControlTether, DraggablePoint, SvgGrid } from "@/components/svg-canvas";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

const CHART_CONTENT = "bg-transparent p-0 inset-shadow-none";

const INTERVAL_PRESETS = {
  quarters: [0, 25, 50, 75, 100],
  tenths: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  halves: [0, 50, 100],
  edges: [0, 100],
} as const;

type IntervalPreset = keyof typeof INTERVAL_PRESETS;

const COLOR_PRESETS = {
  default: undefined,
  muted: "var(--muted-foreground)",
  border: "var(--border)",
  ring: "var(--ring)",
  pink: "var(--color-pink-400)",
} as const;

type ColorPreset = keyof typeof COLOR_PRESETS;

function intervalsFromPreset(preset: IntervalPreset) {
  return [...INTERVAL_PRESETS[preset]];
}

function colorFromPreset(preset: ColorPreset) {
  return COLOR_PRESETS[preset];
}

function CanvasFrame({ children, className, padLabels = true }: { children: React.ReactNode; className?: string; padLabels?: boolean }) {
  return (
    <div className={cn("isolate w-full max-w-sm font-mono text-[10px]/none font-normal", padLabels && "ps-6", className)}>
      <div className="relative mx-auto block aspect-square w-full">
        <div className={cn("absolute right-0 bottom-0 left-0", padLabels ? "top-6" : "top-0")}>{children}</div>
      </div>
    </div>
  );
}

function SvgShell({
  children,
  svgRef,
  ariaLabel,
}: {
  children: React.ReactNode;
  svgRef?: React.RefObject<SVGSVGElement | null>;
  ariaLabel: string;
}) {
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      className="block size-full overflow-visible"
      style={{ touchAction: "none" }}
      role="img"
      aria-label={ariaLabel}
    >
      {children}
    </svg>
  );
}

/** Shared interval + color controls for SvgGrid demos */
function SvgGridPropControls({
  idPrefix,
  intervalPreset,
  onIntervalPresetChange,
  lineColor,
  onLineColorChange,
  labelColor,
  onLabelColorChange,
  showLineColor = true,
  showLabelColor = true,
}: {
  idPrefix: string;
  intervalPreset: IntervalPreset;
  onIntervalPresetChange: (value: IntervalPreset) => void;
  lineColor?: ColorPreset;
  onLineColorChange?: (value: ColorPreset) => void;
  labelColor?: ColorPreset;
  onLabelColorChange?: (value: ColorPreset) => void;
  showLineColor?: boolean;
  showLabelColor?: boolean;
}) {
  return (
    <FieldGroup className="gap-4 sm:flex-row sm:flex-wrap sm:items-end">
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-intervals`}>intervals</FieldLabel>
        <Select value={intervalPreset} onValueChange={(value) => value && onIntervalPresetChange(value as IntervalPreset)}>
          <SelectTrigger id={`${idPrefix}-intervals`} className="w-auto min-w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="quarters">0 / 25 / 50 / 75 / 100</SelectItem>
              <SelectItem value="tenths">every 10</SelectItem>
              <SelectItem value="halves">0 / 50 / 100</SelectItem>
              <SelectItem value="edges">0 / 100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      {showLineColor && lineColor != null && onLineColorChange ? (
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-line-color`}>lineColor</FieldLabel>
          <Select value={lineColor} onValueChange={(value) => value && onLineColorChange(value as ColorPreset)}>
            <SelectTrigger id={`${idPrefix}-line-color`} className="w-auto min-w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="default">default mix</SelectItem>
                <SelectItem value="muted">muted</SelectItem>
                <SelectItem value="border">border</SelectItem>
                <SelectItem value="ring">ring</SelectItem>
                <SelectItem value="pink">pink-400</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      ) : null}

      {showLabelColor && labelColor != null && onLabelColorChange ? (
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-label-color`}>labelColor</FieldLabel>
          <Select value={labelColor} onValueChange={(value) => value && onLabelColorChange(value as ColorPreset)}>
            <SelectTrigger id={`${idPrefix}-label-color`} className="w-auto min-w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="default">default muted</SelectItem>
                <SelectItem value="muted">muted</SelectItem>
                <SelectItem value="border">border</SelectItem>
                <SelectItem value="ring">ring</SelectItem>
                <SelectItem value="pink">pink-400</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      ) : null}
    </FieldGroup>
  );
}

/** SvgGrid — lines only */
function SvgGridLinesDemo() {
  const [intervalPreset, setIntervalPreset] = React.useState<IntervalPreset>("quarters");
  const [lineColor, setLineColor] = React.useState<ColorPreset>("default");
  const intervals = intervalsFromPreset(intervalPreset);

  return (
    <div className="flex w-full flex-col gap-4">
      <SvgGridPropControls
        idPrefix="grid-lines"
        intervalPreset={intervalPreset}
        onIntervalPresetChange={setIntervalPreset}
        lineColor={lineColor}
        onLineColorChange={setLineColor}
        showLabelColor={false}
      />
      <CanvasFrame padLabels={false}>
        <SvgShell ariaLabel="SvgGrid lines only">
          <SvgGrid intervals={intervals} showGrid showDots={false} showLabels={false} lineColor={colorFromPreset(lineColor)} />
        </SvgShell>
      </CanvasFrame>
      <p className="font-mono text-2xs text-muted-foreground">intervals=[{intervals.join(", ")}]</p>
    </div>
  );
}

/** SvgGrid — dots only */
function SvgGridDotsDemo() {
  const [intervalPreset, setIntervalPreset] = React.useState<IntervalPreset>("quarters");
  const [dotColor, setDotColor] = React.useState<ColorPreset>("default");
  const intervals = intervalsFromPreset(intervalPreset);

  return (
    <div className="flex w-full flex-col gap-4">
      <FieldGroup className="gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <Field>
          <FieldLabel htmlFor="grid-dots-intervals">intervals</FieldLabel>
          <Select value={intervalPreset} onValueChange={(value) => value && setIntervalPreset(value as IntervalPreset)}>
            <SelectTrigger id="grid-dots-intervals" className="w-auto min-w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="quarters">0 / 25 / 50 / 75 / 100</SelectItem>
                <SelectItem value="tenths">every 10</SelectItem>
                <SelectItem value="halves">0 / 50 / 100</SelectItem>
                <SelectItem value="edges">0 / 100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="grid-dots-color">dotColor</FieldLabel>
          <Select value={dotColor} onValueChange={(value) => value && setDotColor(value as ColorPreset)}>
            <SelectTrigger id="grid-dots-color" className="w-auto min-w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="default">default mix</SelectItem>
                <SelectItem value="muted">muted</SelectItem>
                <SelectItem value="border">border</SelectItem>
                <SelectItem value="ring">ring</SelectItem>
                <SelectItem value="pink">pink-400</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
      <CanvasFrame padLabels={false}>
        <SvgShell ariaLabel="SvgGrid dots only">
          <SvgGrid intervals={intervals} showGrid={false} showDots showLabels={false} dotColor={colorFromPreset(dotColor)} />
        </SvgShell>
      </CanvasFrame>
      <p className="font-mono text-2xs text-muted-foreground">
        Dot density is derived from intervals (5 midpoints per segment) — not a separate prop.
      </p>
    </div>
  );
}

/** SvgGrid — SVG tick labels only */
function SvgGridLabelsDemo() {
  const [intervalPreset, setIntervalPreset] = React.useState<IntervalPreset>("quarters");
  const [labelColor, setLabelColor] = React.useState<ColorPreset>("default");
  const intervals = intervalsFromPreset(intervalPreset);

  return (
    <div className="flex w-full flex-col gap-4">
      <SvgGridPropControls
        idPrefix="grid-labels"
        intervalPreset={intervalPreset}
        onIntervalPresetChange={setIntervalPreset}
        labelColor={labelColor}
        onLabelColorChange={setLabelColor}
        showLineColor={false}
      />
      <CanvasFrame>
        <SvgShell ariaLabel="SvgGrid labels only">
          <SvgGrid intervals={intervals} showGrid={false} showDots={false} showLabels labelColor={colorFromPreset(labelColor)} />
        </SvgShell>
      </CanvasFrame>
      <p className="font-mono text-2xs text-muted-foreground">
        Label text is the interval number — no format prop. fontSize is fixed at 2.5.
      </p>
    </div>
  );
}

/** SvgGrid — full composition of its own layers */
function SvgGridFullDemo() {
  const [showGrid, setShowGrid] = React.useState(true);
  const [showDots, setShowDots] = React.useState(true);
  const [showLabels, setShowLabels] = React.useState(true);
  const [intervalPreset, setIntervalPreset] = React.useState<IntervalPreset>("quarters");
  const [lineColor, setLineColor] = React.useState<ColorPreset>("default");
  const [labelColor, setLabelColor] = React.useState<ColorPreset>("default");
  const intervals = intervalsFromPreset(intervalPreset);

  return (
    <div className="flex w-full flex-col gap-4">
      <FieldGroup className="gap-4 sm:flex-row sm:flex-wrap">
        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={showGrid} onCheckedChange={setShowGrid} id="grid-full-lines" />
          <FieldLabel htmlFor="grid-full-lines">showGrid</FieldLabel>
        </Field>
        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={showDots} onCheckedChange={setShowDots} id="grid-full-dots" />
          <FieldLabel htmlFor="grid-full-dots">showDots</FieldLabel>
        </Field>
        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={showLabels} onCheckedChange={setShowLabels} id="grid-full-labels" />
          <FieldLabel htmlFor="grid-full-labels">showLabels</FieldLabel>
        </Field>
      </FieldGroup>
      <SvgGridPropControls
        idPrefix="grid-full"
        intervalPreset={intervalPreset}
        onIntervalPresetChange={setIntervalPreset}
        lineColor={lineColor}
        onLineColorChange={setLineColor}
        labelColor={labelColor}
        onLabelColorChange={setLabelColor}
      />
      <CanvasFrame>
        <SvgShell ariaLabel="SvgGrid with toggles">
          <SvgGrid
            intervals={intervals}
            showGrid={showGrid}
            showDots={showDots}
            showLabels={showLabels}
            lineColor={colorFromPreset(lineColor)}
            labelColor={colorFromPreset(labelColor)}
          />
        </SvgShell>
      </CanvasFrame>
    </div>
  );
}

/** ControlTether alone */
function ControlTetherDemo() {
  return (
    <CanvasFrame padLabels={false}>
      <SvgShell ariaLabel="ControlTether dashed guide lines">
        <ControlTether fromPoint={{ x: 20, y: 70 }} toPoint={{ x: 50, y: 20 }} />
        <ControlTether fromPoint={{ x: 50, y: 20 }} toPoint={{ x: 80, y: 70 }} />
        <circle cx={20} cy={70} r={1.5} fill="var(--color-success-primary)" />
        <circle cx={50} cy={20} r={1.5} fill="var(--color-info-primary)" />
        <circle cx={80} cy={70} r={1.5} fill="var(--color-destructive)" />
      </SvgShell>
    </CanvasFrame>
  );
}

/** DraggablePoint alone — shapes, inverted, snap, disabled */
function DraggablePointDemo() {
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [point, setPoint] = React.useState<Point>({ x: 50, y: 50 });
  const [shape, setShape] = React.useState<"circle" | "square">("circle");
  const [inverted, setInverted] = React.useState(false);
  const [snapToGrid, setSnapToGrid] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <FieldGroup className="gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <FieldSet>
          <FieldLegend variant="label">shape</FieldLegend>
          <ToggleGroup
            value={[shape]}
            onValueChange={(value) => {
              const next = value[0] as "circle" | "square" | undefined;
              if (next) setShape(next);
            }}
          >
            <ToggleGroupItem value="circle">circle</ToggleGroupItem>
            <ToggleGroupItem value="square">square</ToggleGroupItem>
          </ToggleGroup>
        </FieldSet>
        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={inverted} onCheckedChange={setInverted} id="point-inverted" />
          <FieldLabel htmlFor="point-inverted">inverted</FieldLabel>
        </Field>
        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={snapToGrid} onCheckedChange={setSnapToGrid} id="point-snap" />
          <FieldLabel htmlFor="point-snap">snapStep 5</FieldLabel>
        </Field>
        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={disabled} onCheckedChange={setDisabled} id="point-disabled" />
          <FieldLabel htmlFor="point-disabled">disabled</FieldLabel>
        </Field>
      </FieldGroup>
      <CanvasFrame padLabels={false}>
        <SvgShell svgRef={svgRef} ariaLabel="Single DraggablePoint">
          <DraggablePoint
            svgRef={svgRef}
            label="Demo point"
            x={point.x}
            y={point.y}
            color="var(--ring)"
            shape={shape}
            inverted={inverted}
            snapStep={snapToGrid ? 5 : undefined}
            disabled={disabled}
            onPositionChange={setPoint}
          />
        </SvgShell>
      </CanvasFrame>
      <p className="font-mono text-2xs text-muted-foreground tabular-nums">
        ({Math.round(point.x)}, {Math.round(point.y)}) — drag or arrow keys
      </p>
    </div>
  );
}

/** AxisLabels — HTML overlay (not the SVG tick labels inside SvgGrid) */
function AxisLabelsDemo() {
  const [intervalPreset, setIntervalPreset] = React.useState<IntervalPreset>("quarters");
  const [axis, setAxis] = React.useState<"both" | "x" | "y">("both");
  const ticks = intervalsFromPreset(intervalPreset);

  return (
    <div className="flex w-full flex-col gap-4">
      <FieldGroup className="gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <Field>
          <FieldLabel htmlFor="axis-labels-ticks">ticks</FieldLabel>
          <Select value={intervalPreset} onValueChange={(value) => value && setIntervalPreset(value as IntervalPreset)}>
            <SelectTrigger id="axis-labels-ticks" className="w-auto min-w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="quarters">0 / 25 / 50 / 75 / 100</SelectItem>
                <SelectItem value="tenths">every 10</SelectItem>
                <SelectItem value="halves">0 / 50 / 100</SelectItem>
                <SelectItem value="edges">0 / 100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <FieldSet>
          <FieldLegend variant="label">axis</FieldLegend>
          <ToggleGroup
            value={[axis]}
            onValueChange={(value) => {
              const next = value[0] as "both" | "x" | "y" | undefined;
              if (next) setAxis(next);
            }}
          >
            <ToggleGroupItem value="both">both</ToggleGroupItem>
            <ToggleGroupItem value="x">x</ToggleGroupItem>
            <ToggleGroupItem value="y">y</ToggleGroupItem>
          </ToggleGroup>
        </FieldSet>
      </FieldGroup>
      <div className="relative w-full max-w-sm">
        <div className="relative ms-8 mt-6 aspect-square w-[calc(100%-2rem)] border border-dashed border-border">
          {(axis === "both" || axis === "x") && <AxisLabels ticks={ticks} axis="x" className="-top-5 text-2xs text-muted-foreground" />}
          {(axis === "both" || axis === "y") && <AxisLabels ticks={ticks} axis="y" className="-left-8 text-2xs text-muted-foreground" />}
          <div className="flex size-full items-center justify-center font-mono text-2xs text-muted-foreground">plot area</div>
        </div>
      </div>
      <p className="font-mono text-2xs text-muted-foreground">
        Props: ticks, axis, max (default 100). Label content is the tick number — no format prop.
      </p>
    </div>
  );
}

/** Combined sandbox — all primitives together */
function SvgCanvasSandbox() {
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [showGrid, setShowGrid] = React.useState(true);
  const [showDots, setShowDots] = React.useState(true);
  const [showLabels, setShowLabels] = React.useState(true);
  const [snapToGrid, setSnapToGrid] = React.useState(false);
  const [pointShape, setPointShape] = React.useState<"circle" | "square">("circle");
  const [intervalPreset, setIntervalPreset] = React.useState<IntervalPreset>("quarters");
  const [lineColor, setLineColor] = React.useState<ColorPreset>("default");
  const [labelColor, setLabelColor] = React.useState<ColorPreset>("default");
  const [start, setStart] = React.useState<Point>({ x: 20, y: 70 });
  const [control, setControl] = React.useState<Point>({ x: 50, y: 15 });
  const [end, setEnd] = React.useState<Point>({ x: 80, y: 70 });

  const intervals = intervalsFromPreset(intervalPreset);
  const snapStep = snapToGrid ? 5 : undefined;
  const pathD = `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;

  return (
    <div className="flex w-full flex-col gap-6">
      <FieldGroup className="gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <FieldSet>
          <FieldLegend variant="label">Point shape</FieldLegend>
          <ToggleGroup
            value={[pointShape]}
            onValueChange={(value) => {
              const next = value[0] as "circle" | "square" | undefined;
              if (next) setPointShape(next);
            }}
          >
            <ToggleGroupItem value="circle">circle</ToggleGroupItem>
            <ToggleGroupItem value="square">square</ToggleGroupItem>
          </ToggleGroup>
        </FieldSet>

        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={showGrid} onCheckedChange={setShowGrid} id="sandbox-grid" />
          <FieldLabel htmlFor="sandbox-grid">showGrid</FieldLabel>
        </Field>
        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={showDots} onCheckedChange={setShowDots} id="sandbox-dots" />
          <FieldLabel htmlFor="sandbox-dots">showDots</FieldLabel>
        </Field>
        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={showLabels} onCheckedChange={setShowLabels} id="sandbox-labels" />
          <FieldLabel htmlFor="sandbox-labels">showLabels</FieldLabel>
        </Field>
        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={snapToGrid} onCheckedChange={setSnapToGrid} id="sandbox-snap" />
          <FieldLabel htmlFor="sandbox-snap">snapStep 5</FieldLabel>
        </Field>
      </FieldGroup>

      <SvgGridPropControls
        idPrefix="sandbox"
        intervalPreset={intervalPreset}
        onIntervalPresetChange={setIntervalPreset}
        lineColor={lineColor}
        onLineColorChange={setLineColor}
        labelColor={labelColor}
        onLabelColorChange={setLabelColor}
      />

      <CanvasFrame>
        <SvgShell svgRef={svgRef} ariaLabel="Combined SVG canvas sandbox">
          <SvgGrid
            intervals={intervals}
            showGrid={showGrid}
            showDots={showDots}
            showLabels={showLabels}
            lineColor={colorFromPreset(lineColor)}
            labelColor={colorFromPreset(labelColor)}
          />
          <path d={pathD} className="fill-transparent stroke-border" strokeWidth={0.5} strokeLinecap="round" />
          <ControlTether fromPoint={start} toPoint={control} />
          <ControlTether fromPoint={control} toPoint={end} />
          <DraggablePoint
            svgRef={svgRef}
            label="Start point"
            x={start.x}
            y={start.y}
            color="var(--color-success-primary)"
            shape={pointShape}
            snapStep={snapStep}
            onPositionChange={setStart}
          />
          <DraggablePoint
            svgRef={svgRef}
            label="Control point"
            x={control.x}
            y={control.y}
            color="var(--color-info-primary)"
            inverted
            shape={pointShape}
            snapStep={snapStep}
            onPositionChange={setControl}
          />
          <DraggablePoint
            svgRef={svgRef}
            label="End point"
            x={end.x}
            y={end.y}
            color="var(--color-destructive)"
            shape={pointShape}
            snapStep={snapStep}
            onPositionChange={setEnd}
          />
        </SvgShell>
      </CanvasFrame>

      <p className="font-mono text-2xs text-muted-foreground tabular-nums">
        start ({Math.round(start.x)}, {Math.round(start.y)}) · control ({Math.round(control.x)}, {Math.round(control.y)}) · end (
        {Math.round(end.x)}, {Math.round(end.y)})
      </p>
    </div>
  );
}

const PAGE_LINKS = [
  { href: "#svg-grid-lines", label: "SvgGrid · lines" },
  { href: "#svg-grid-dots", label: "SvgGrid · dots" },
  { href: "#svg-grid-labels", label: "SvgGrid · labels" },
  { href: "#svg-grid-full", label: "SvgGrid · toggles" },
  { href: "#control-tether", label: "ControlTether" },
  { href: "#draggable-point", label: "DraggablePoint" },
  { href: "#axis-labels", label: "AxisLabels" },
  { href: "#combined", label: "Combined" },
  { href: "#luminance", label: "Luminance chart" },
  { href: "#chroma", label: "Chroma chart" },
] as const;

export default function SvgCanvasPrivatePage() {
  return (
    <div className="mx-auto grid w-full max-w-4xl gap-10 px-4 py-8">
      <header className="grid gap-2">
        <p className="font-pixel text-[11px] text-muted-foreground">private/svg-canvas</p>
        <Heading level={1}>SVG Canvas & color charts</Heading>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Isolated demos for every export in <code className="text-foreground">components/svg-canvas.tsx</code>, plus both{" "}
          <code className="text-foreground">ColorDiagrams</code> chart types. Back to{" "}
          <Link className="text-primary underline-offset-4 hover:underline" href="/private">
            /private
          </Link>
          .
        </p>
        <nav className="flex flex-wrap gap-x-3 gap-y-1 pt-1 font-mono text-2xs text-muted-foreground">
          {PAGE_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-primary underline-offset-4 hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <Section title="SvgGrid · lines" id="svg-grid-lines" description="showGrid only — intervals and lineColor are real SvgGrid props.">
        <SvgGridLinesDemo />
      </Section>

      <Section
        title="SvgGrid · dots"
        id="svg-grid-dots"
        description="showDots only — intervals drive major ticks and derived mid-segment dots; dotColor is a prop."
      >
        <SvgGridDotsDemo />
      </Section>

      <Section
        title="SvgGrid · labels"
        id="svg-grid-labels"
        description="showLabels only — intervals and labelColor. Label text is the tick number (no format prop)."
      >
        <SvgGridLabelsDemo />
      </Section>

      <Section
        title="SvgGrid · layer toggles"
        id="svg-grid-full"
        description="showGrid / showDots / showLabels plus intervals, lineColor, and labelColor."
      >
        <SvgGridFullDemo />
      </Section>

      <Section
        title="ControlTether"
        id="control-tether"
        description="Dashed guide line between two points. Static markers shown for context only."
      >
        <ControlTetherDemo />
      </Section>

      <Section
        title="DraggablePoint"
        id="draggable-point"
        description="Single handle — shape, inverted fill, snapStep, and disabled. Drag or use arrow keys."
      >
        <DraggablePointDemo />
      </Section>

      <Section
        title="AxisLabels"
        id="axis-labels"
        description="HTML overlay ticks — ticks and axis are props; max defaults to 100. Separate from SvgGrid’s SVG labels."
      >
        <AxisLabelsDemo />
      </Section>

      <Section
        title="Combined sandbox"
        id="combined"
        description="Full composition with the same SvgGrid controls (intervals, colors, layer toggles) plus DraggablePoint options."
      >
        <SvgCanvasSandbox />
      </Section>

      <Section
        title="ColorDiagrams · luminance"
        id="luminance"
        description='type="luminance" — average lightness (L%) by palette step. One of two ColorDiagrams variants.'
        contentClassName={CHART_CONTENT}
      >
        <ColorDiagrams type="luminance" caption="Average luminance by step" className="w-full" />
      </Section>

      <Section
        title="ColorDiagrams · chroma"
        id="chroma"
        description='type="chroma" — average OKLCH chroma by palette step. The other ColorDiagrams variant.'
        contentClassName={CHART_CONTENT}
      >
        <ColorDiagrams type="chroma" caption="Average chroma by step" className="w-full" />
      </Section>
    </div>
  );
}
