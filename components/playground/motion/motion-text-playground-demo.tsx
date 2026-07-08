"use client";

import * as React from "react";
import { MotionText } from "@/components/animation/shared";
import { PixelRedoIcon, PixelShuffleIcon } from "@/components/icons-pixel";
import { CursorBeachballIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Loader } from "@/components/ui/loader";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Code } from "@/components/ui/code";
import { Label } from "@/components/ui/label";

type MotionTextPer = "char" | "word" | "line";
type MotionTextPreset = "fade" | "fade-in-blur" | "slide" | "scale" | "blur-sm";

const MOTION_TEXT_DEFAULTS = {
  per: "word" as MotionTextPer,
  preset: "blur-sm" as MotionTextPreset,
  duration: 560,
  stagger: 36,
  waveDepth: 12,
  loopRunning: true,
};

const MOTION_TEXT_PRESETS: { value: MotionTextPreset; label: string }[] = [
  { value: "fade", label: "Fade" },
  { value: "blur-sm", label: "Blur" },
  { value: "slide", label: "Slide" },
  { value: "fade-in-blur", label: "Fade up blur" },
  { value: "scale", label: "Scale" },
];

const MOTION_TEXT_PER_OPTIONS: { value: MotionTextPer; label: string }[] = [
  { value: "char", label: "Char" },
  { value: "word", label: "Word" },
  { value: "line", label: "Line" },
];

function MotionTextSample({
  label,
  action,
  children,
  contentClassName,
}: {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <div data-slot="motion-text-sample" className="grid min-w-0 justify-items-start gap-3 text-start">
      <Code>{label}</Code>
      <div className={cn("min-w-0 text-lg text-foreground", contentClassName)}>{children}</div>
      {action ? (
        <div data-slot="motion-text-action" className="flex flex-col gap-1">
          {action}
        </div>
      ) : null}
    </div>
  );
}

function MotionTextPerSelect({ value, onValueChange }: { value: MotionTextPer; onValueChange: (value: MotionTextPer) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="motion-text-per" className="text-xs">
        Per:
      </Label>
      <ToggleGroup
        id="motion-text-per"
        value={[value]}
        onValueChange={(groupValue) => {
          const next = groupValue[0] as MotionTextPer | undefined;
          if (next) onValueChange(next);
        }}
        size="sm"
        spacing={1}
        aria-label="Motion text per"
      >
        {MOTION_TEXT_PER_OPTIONS.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

function MotionTextPresetSelect({ value, onValueChange }: { value: MotionTextPreset; onValueChange: (value: MotionTextPreset) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="motion-text-preset" className="text-xs">
        Effect:
      </Label>
      <ToggleGroup
        id="motion-text-preset"
        value={[value]}
        onValueChange={(groupValue) => {
          const next = groupValue[0] as MotionTextPreset | undefined;
          if (next) onValueChange(next);
        }}
        size="sm"
        spacing={1}
        aria-label="Motion text preset"
      >
        {MOTION_TEXT_PRESETS.map((preset) => (
          <ToggleGroupItem key={preset.value} value={preset.value}>
            {preset.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export function MotionTextPlaygroundDemo() {
  const [per, setPer] = React.useState<MotionTextPer>(MOTION_TEXT_DEFAULTS.per);
  const [preset, setPreset] = React.useState<MotionTextPreset>(MOTION_TEXT_DEFAULTS.preset);
  const [loopRunning, setLoopRunning] = React.useState(MOTION_TEXT_DEFAULTS.loopRunning);
  const [morphAlternate, setMorphAlternate] = React.useState(false);
  const [waveDepth, setWaveDepth] = React.useState(MOTION_TEXT_DEFAULTS.waveDepth);
  const [revealKey, setRevealKey] = React.useState(0);
  const [scrambleKey, setScrambleKey] = React.useState(0);

  const replayReveal = React.useCallback(() => setRevealKey((key) => key + 1), []);
  const replayScramble = React.useCallback(() => setScrambleKey((key) => key + 1), []);
  const effectSpeedReveal = 480 / MOTION_TEXT_DEFAULTS.duration;
  const effectSpeedSegment = 40 / MOTION_TEXT_DEFAULTS.stagger;

  return (
    <div className="grid w-full grid-cols-2 gap-6" data-testid="motion-text-playground">
      <MotionTextSample
        label="Entrance"
        action={
          <Button size="sm" variant="outline" type="button" onClick={replayReveal}>
            <PixelRedoIcon scale={1.5} />
            Replay
          </Button>
        }
      >
        <MotionText.Reveal
          key={`reveal-${revealKey}`}
          type="motion"
          per={"characters"}
          duration={MOTION_TEXT_DEFAULTS.duration}
          stagger={MOTION_TEXT_DEFAULTS.stagger}
          className="text-xl font-medium text-balance"
        >
          A little motion can make text feel more expressive.
        </MotionText.Reveal>
      </MotionTextSample>

      <MotionTextSample
        label="TextEffect"
        action={
          <>
            <MotionTextPerSelect value={per} onValueChange={setPer} />
            <MotionTextPresetSelect value={preset} onValueChange={setPreset} />
          </>
        }
      >
        <MotionText.Effect
          key={`effect-${per}-${preset}`}
          per={per}
          preset={preset}
          speedReveal={effectSpeedReveal}
          speedSegment={effectSpeedSegment}
          className="max-w-96 text-lg text-balance"
        >
          {`I have all sorts of options. 
You can fiddle with them below.`}
        </MotionText.Effect>
      </MotionTextSample>

      <MotionTextSample
        label="Loop"
        action={
          <Field orientation="horizontal" className="w-auto items-center gap-2">
            <FieldLabel className="text-xs" htmlFor="motion-text-loop">
              Looping
            </FieldLabel>
            <Switch id="motion-text-loop" checked={loopRunning} onCheckedChange={setLoopRunning} data-testid="motion-text-loop" />
          </Field>
        }
      >
        <p className="transition-width min-w-64 text-left text-2xl font-medium text-muted-foreground/72">
          Should designers{" "}
          <MotionText.Loop trigger={loopRunning} interval={2} className="text-primary">
            {["code", "prompt", "tweet"]}
          </MotionText.Loop>
          ?
        </p>
      </MotionTextSample>

      <MotionTextSample
        label="Scramble"
        action={
          <Button size="sm" variant="outline" type="button" onClick={replayScramble}>
            Decode
          </Button>
        }
      >
        <MotionText.Scramble
          key={`scramble-${scrambleKey}`}
          duration={MOTION_TEXT_DEFAULTS.duration / 1000}
          className="font-mono text-lg tabular-nums"
        >
          Interface signal
        </MotionText.Scramble>
      </MotionTextSample>

      <MotionTextSample
        label="Wave"
        action={
          <Slider
            label="Depth"
            showValue
            value={[waveDepth]}
            min={0}
            max={28}
            step={1}
            onValueChange={(value) => {
              const nextValue = Array.isArray(value) ? value[0] : value;
              setWaveDepth(Math.round(nextValue ?? MOTION_TEXT_DEFAULTS.waveDepth));
            }}
            className="w-72 max-w-full gap-5"
          />
        }
      >
        <MotionText.Wave
          duration={MOTION_TEXT_DEFAULTS.duration / 500}
          zDistance={waveDepth}
          yDistance={Math.round(waveDepth / -4)}
          rotateYDistance={waveDepth}
          className="text-lg text-balance"
        >
          How deep is your love?
        </MotionText.Wave>
      </MotionTextSample>

      <MotionTextSample
        label="Morph"
        action={
          <Button size="sm" variant="outline" type="button" onClick={() => setMorphAlternate((value) => !value)}>
            <PixelShuffleIcon data-icon="inline-start" /> Swap
          </Button>
        }
      >
        <MotionText.Morph>{morphAlternate ? "Motion variants compose cleanly" : "Variant controls compose motion"}</MotionText.Morph>
      </MotionTextSample>

      <MotionTextSample label="Shimmer" contentClassName="w-full">
        <div className="grid justify-items-center gap-3">
          <Marker className="w-auto justify-center text-sm">
            <MarkerIcon>
              <Loader className="text-muted-foreground" />
            </MarkerIcon>
            <MarkerContent className="shimmer shimmer-duration-1400">Generating response&hellip;</MarkerContent>
          </Marker>
          <Marker className="w-auto justify-center text-sm">
            <MarkerIcon className="origin-center drop-shadow-xs drop-shadow-black/50">
              <CursorBeachballIcon className="origin-center animate-spin duration-100" />
            </MarkerIcon>
            <MarkerContent className="shimmer-magenta-400/50 shimmer text-jade-400">Streaming rainbow tokens&hellip;</MarkerContent>
          </Marker>
        </div>
      </MotionTextSample>
    </div>
  );
}
