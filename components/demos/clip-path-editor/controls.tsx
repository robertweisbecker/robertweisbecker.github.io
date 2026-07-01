"use client";

import { ColorSwatchGroup, type ColorSwatch } from "@/components/color-swatch-group";
import { InfoTip } from "@/components/info-tip";
import { NumberSlider } from "@/components/number-slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleIcon, CollapsiblePanel, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGrid, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipGroup, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { isOneOf } from "@/lib/is-one-of";
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
import { END_POINT_COLOR, START_POINT_COLOR, CONTROL_POINT_COLOR } from "./canvas";
import { cornerPresets, getPresetPointsForMode, pointsEqual } from "./geometry";
import { useClipPathEditor } from "./context";
import { cornerPresetKeys, curveModes, type CornerPresetKey, type Point } from "./types";

const SWATCHES: ColorSwatch[] = [
  { value: "var(--primary)", label: "Primary", color: "var(--primary)" },
  { value: "var(--background)", label: "Background", color: "var(--background)" },
  { value: "var(--card)", label: "Card", color: "var(--card)" },
  { value: "var(--popover)", label: "Popover", color: "var(--popover)" },
  { value: "var(--secondary)", label: "Secondary", color: "var(--secondary)" },
  { value: "var(--muted)", label: "Muted", color: "var(--muted)" },
  { value: "var(--accent)", label: "Accent", color: "var(--accent)" },
  { value: "var(--destructive)", label: "Destructive", color: "var(--destructive)" },
];

const SLIDER_LAYOUT_SPRING = { type: "spring" as const, visualDuration: 0.3, bounce: 0 };
const SLIDER_ENTER_EXIT = { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] };

const presetIcons: Record<CornerPresetKey, React.ReactNode> = {
  "top-left": <IconBoxAlignTopLeftFilled className="size-5" stroke={1.5} />,
  "top-right": <IconBoxAlignTopRightFilled className="size-5" stroke={1.5} />,
  "bottom-left": <IconBoxAlignBottomLeftFilled className="size-5" stroke={1.5} />,
  "bottom-right": <IconBoxAlignBottomRightFilled className="size-5" stroke={1.5} />,
};

function isPresetModified(state: ReturnType<typeof useClipPathEditor>["state"], preset: CornerPresetKey) {
  const presetPoints = getPresetPointsForMode(preset, state.curveMode);
  const isStartMatch = pointsEqual(state.start, presetPoints.start);
  const isEndMatch = pointsEqual(state.end, presetPoints.end);
  const isControl1Match = pointsEqual(state.control1, presetPoints.control1);
  const isControl2Match = pointsEqual(state.control2, presetPoints.control2);

  if (state.curveMode === "line") return !(isStartMatch && isEndMatch);
  if (state.curveMode === "quadratic") return !(isStartMatch && isEndMatch && isControl1Match);
  return !(isStartMatch && isEndMatch && isControl1Match && isControl2Match);
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

export function ClipPathEditorResetButton() {
  const { dispatch } = useClipPathEditor();

  return (
    <Tooltip>
      <TooltipProvider delay={0}>
        <TooltipTrigger
          render={<Button variant="ghost" size="icon-sm" className="hover:[&>svg]:-rotate-90 active:[&>svg]:animate-spin" />}
          onClick={() => dispatch({ type: "reset" })}
        >
          <IconRestore className="rotate-45 transition-[transform,rotate] delay-100 duration-150 ease-in-out" />
        </TooltipTrigger>
        <TooltipContent side="left">Reset</TooltipContent>
      </TooltipProvider>
    </Tooltip>
  );
}

export function ClipPathEditorSnapControl({ className }: { className?: string }) {
  const { state, dispatch } = useClipPathEditor();

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
        checked={state.snapToGrid}
        onCheckedChange={(checked) => dispatch({ type: "set-snap-to-grid", snapToGrid: checked === true })}
      />
    </Field>
  );
}

export function ClipPathEditorSettings({ className }: React.ComponentProps<"div">) {
  const { state, dispatch } = useClipPathEditor();
  const initialPreset: CornerPresetKey = state.cornerPreset === "custom" ? "bottom-left" : state.cornerPreset;
  const [lastSelectedPreset, setLastSelectedPreset] = React.useState<CornerPresetKey>(initialPreset);
  const effectivePreset = state.cornerPreset === "custom" ? lastSelectedPreset : state.cornerPreset;
  const presetModified = isPresetModified(state, effectivePreset);
  const presetValue = state.cornerPreset !== "custom" ? [state.cornerPreset] : presetModified ? [] : [lastSelectedPreset];

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
                  if (!isOneOf(value, cornerPresetKeys)) return;
                  setLastSelectedPreset(value);
                  dispatch({ type: "set-preset", preset: value });
                }}
                size="sm"
                aria-label="Choose origin preset"
                className="h-full min-h-0 w-full flex-1 grid-rows-2 rounded-xl"
              >
                {cornerPresetKeys.map((presetKey) => (
                  <div key={presetKey} className="relative h-full min-h-0">
                    <TooltipTrigger
                      tooltip={cornerPresets[presetKey].label}
                      render={
                        <ToggleGroupItem
                          value={presetKey}
                          aria-label={cornerPresets[presetKey].label}
                          shape="default"
                          className={cn("h-full min-h-0 w-full", presetKey === lastSelectedPreset ? "bg-card/50 dark:bg-popover/50" : "")}
                        />
                      }
                    >
                      {presetIcons[presetKey]}
                    </TooltipTrigger>
                    {presetModified && presetKey === lastSelectedPreset ? (
                      <IconArrowBackUp className="absolute top-1 right-1.5 z-10 size-3 text-foreground/64" strokeWidth={1.5} aria-hidden />
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
                  if (isOneOf(mode, curveModes)) dispatch({ type: "set-curve-mode", mode });
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
                <TooltipTrigger tooltip="Quadratic bezier curve" render={<ToggleGroupItem value="quadratic" />}>
                  <IconVectorSpline />
                </TooltipTrigger>
                <TooltipTrigger tooltip="Cubic bezier curve" render={<ToggleGroupItem value="cubic" />}>
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
  const { state, dispatch } = useClipPathEditor();

  return (
    <Collapsible defaultOpen={false} className={cn("w-full", className)}>
      <Card variant="muted">
        <CardHeader>
          <CardTitle className="w-full">
            <CollapsibleTrigger className="flex w-full items-center justify-between gap-1 text-muted-foreground hover:text-foreground data-panel-open:text-foreground">
              Advanced
              <CollapsibleIcon />
            </CollapsibleTrigger>
          </CardTitle>
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
  const { state, dispatch } = useClipPathEditor();

  return (
    <div className={cn("grid gap-4", className)}>
      <Field className="grid gap-2">
        <FieldLabel className="text-sm">Fill</FieldLabel>
        <ColorSwatchGroup colors={SWATCHES} value={state.color} onValueChange={(color) => dispatch({ type: "set-color", color })} />
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
