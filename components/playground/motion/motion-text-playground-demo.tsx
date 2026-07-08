"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MotionText } from "@/components/animation/shared";
import { PixelResetSmallIcon, PixelShuffleIcon } from "@/components/icons-pixel";
import { CursorBeachballIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { PixelMorph } from "@/components/pixel-morph";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";

type MotionTextPer = "char" | "word" | "line";
type MotionTextPreset = "fade" | "fade-in-blur" | "slide" | "scale" | "blur-sm";

const MOTION_TEXT_DEFAULTS = {
  per: "word" as MotionTextPer,
  preset: "blur-sm" as MotionTextPreset,
  duration: 560,
  stagger: 36,
  waveDepth: 12,
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

function SampleShell({ children, controls }: { children: React.ReactNode; controls?: React.ReactNode }) {
  return (
    <div data-slot="motion-text-sample" className="w-full min-w-0 space-y-4 text-center">
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center">{children}</div>
      {controls ? (
        <div
          data-slot="motion-text-controls"
          className="flex w-full flex-wrap items-center justify-center gap-4 space-y-2 border-t border-dashed pt-4"
        >
          {controls}
        </div>
      ) : null}
    </div>
  );
}

function PlayPauseButton({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <Button size="sm" rounded variant="ghost" type="button" onClick={onToggle} aria-pressed={playing}>
      <PixelMorph from="PixelPlayIcon" to="PixelPauseIcon" active={playing} data-icon="inline-start" scale={1.5} />
      <MotionText.Morph>{playing ? "Pause" : "Play"}</MotionText.Morph>
    </Button>
  );
}

function MotionTextPerSelect({ value, onValueChange }: { value: MotionTextPer; onValueChange: (value: MotionTextPer) => void }) {
  return (
    <Field>
      <FieldLabel htmlFor="motion-text-per" className="text-xs">
        Split by:
      </FieldLabel>

      <ToggleGroup
        id="motion-text-per"
        value={[value]}
        onValueChange={(groupValue) => {
          const next = groupValue[0] as MotionTextPer | undefined;
          if (next) onValueChange(next);
        }}
        size="xs"
        spacing={1}
        aria-label="Motion text per"
      >
        {MOTION_TEXT_PER_OPTIONS.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Field>
  );
}

function MotionTextPresetSelect({ value, onValueChange }: { value: MotionTextPreset; onValueChange: (value: MotionTextPreset) => void }) {
  return (
    <Field>
      <FieldLabel htmlFor="motion-text-preset" className="text-xs">
        Effects:
      </FieldLabel>
      <ToggleGroup
        id="motion-text-preset"
        value={[value]}
        onValueChange={(groupValue) => {
          const next = groupValue[0] as MotionTextPreset | undefined;
          if (next) onValueChange(next);
        }}
        size="xs"
        spacing={1}
        className="flex-wrap"
      >
        {MOTION_TEXT_PRESETS.map((preset) => (
          <ToggleGroupItem key={preset.value} value={preset.value}>
            {preset.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Field>
  );
}

/** Runs once on mount; replay via button. */
export function MotionTextRevealDemo() {
  const [revealKey, setRevealKey] = React.useState(0);

  return (
    <SampleShell
      controls={
        <Button size="sm" rounded variant="ghost" type="button" onClick={() => setRevealKey((key) => key + 1)}>
          Replay
          <PixelResetSmallIcon scale={1.5} data-icon="inline-end" />
        </Button>
      }
    >
      <MotionText.Reveal
        key={`reveal-${revealKey}`}
        type="motion"
        per="characters"
        duration={MOTION_TEXT_DEFAULTS.duration}
        stagger={MOTION_TEXT_DEFAULTS.stagger}
        className="text-xl font-medium text-balance"
      >
        A little motion can make text feel more expressive.
      </MotionText.Reveal>
    </SampleShell>
  );
}

/** Runs once per configuration; replay via button. */
export function MotionTextEffectDemo() {
  const [per, setPer] = React.useState<MotionTextPer>(MOTION_TEXT_DEFAULTS.per);
  const [preset, setPreset] = React.useState<MotionTextPreset>(MOTION_TEXT_DEFAULTS.preset);
  const [effectKey, setEffectKey] = React.useState(0);
  const effectSpeedReveal = 2;
  const effectSpeedSegment = per === "char" ? 1 : per === "word" ? 0.67 : 0.25;

  return (
    <SampleShell
      controls={
        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          <Button size="sm" rounded variant="ghost" type="button" onClick={() => setEffectKey((key) => key + 1)} className="mx-auto">
            Replay
            <PixelResetSmallIcon scale={1.5} data-icon="inline-end" />
          </Button>
          <FieldGroup className="grid grid-cols-[auto_1fr] place-content-center border-t border-dashed pt-5">
            <MotionTextPerSelect value={per} onValueChange={setPer} />
            <MotionTextPresetSelect value={preset} onValueChange={setPreset} />
          </FieldGroup>
        </div>
      }
    >
      <MotionText.Effect
        key={`effect-${per}-${preset}-${effectKey}`}
        per={per}
        preset={preset}
        speedReveal={effectSpeedReveal}
        speedSegment={effectSpeedSegment}
        className="max-w-96 text-lg text-balance"
      >
        {`I have all sorts of options. 
You can fiddle with them below.`}
      </MotionText.Effect>
    </SampleShell>
  );
}

/** Cycles forever; pause/play via button. */
export function MotionTextLoopDemo() {
  const [playing, setPlaying] = React.useState(true);

  return (
    <SampleShell controls={<PlayPauseButton playing={playing} onToggle={() => setPlaying((value) => !value)} />}>
      <p className="transition-width min-w-64 text-2xl font-medium text-muted-foreground/72">
        Should designers{" "}
        <MotionText.Loop trigger={playing} interval={2} className="text-primary">
          {["code", "prompt", "tweet"]}
        </MotionText.Loop>
        ?
      </p>
    </SampleShell>
  );
}

/** Runs once; replay via button. */
export function MotionTextScrambleDemo() {
  const [scrambleKey, setScrambleKey] = React.useState(0);

  return (
    <SampleShell
      controls={
        <Button size="icon" variant="ghost" type="button" onClick={() => setScrambleKey((key) => key + 1)}>
          <PixelShuffleIcon scale={1.5} />
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
    </SampleShell>
  );
}

/** Waves forever; pause/play via button, depth via slider. */
export function MotionTextWaveDemo() {
  const [playing, setPlaying] = React.useState(true);
  const [waveDepth, setWaveDepth] = React.useState(MOTION_TEXT_DEFAULTS.waveDepth);

  return (
    <SampleShell
      controls={
        <>
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
            className="w-56 max-w-full"
          />
          <PlayPauseButton playing={playing} onToggle={() => setPlaying((value) => !value)} />
        </>
      }
    >
      <MotionText.Wave
        trigger={playing}
        duration={MOTION_TEXT_DEFAULTS.duration / 500}
        zDistance={waveDepth}
        yDistance={Math.round(waveDepth / -4)}
        rotateYDistance={waveDepth}
        className="text-lg text-balance"
      >
        How deep is your love?
      </MotionText.Wave>
    </SampleShell>
  );
}

/** Settles after each swap; re-trigger via button. */
export function MotionTextMorphDemo() {
  const [alternate, setAlternate] = React.useState(false);

  return (
    <SampleShell
      controls={
        <Button size="icon" variant="ghost" type="button" onClick={() => setAlternate((value) => !value)}>
          <PixelShuffleIcon scale={1.5} />
        </Button>
      }
    >
      <MotionText.Morph>
        {alternate ? "The taxation of trade routes to outlying star systems is in dispute." : "Turmoil has engulfed the Galactic Republic."}
      </MotionText.Morph>
    </SampleShell>
  );
}

/** Shimmers forever; pause/play freezes the CSS animations in place. */
export function MotionTextShimmerDemo() {
  const [playing, setPlaying] = React.useState(true);

  return (
    <SampleShell controls={<PlayPauseButton playing={playing} onToggle={() => setPlaying((value) => !value)} />}>
      <div className={cn("grid justify-items-center gap-3", !playing && "**:paused")}>
        <Marker className="w-auto justify-center text-sm">
          <MarkerIcon>
            <Loader className="text-muted-foreground animation-duration-700 motion-reduce:animate-none" />
          </MarkerIcon>
          <MarkerContent className="shimmer shimmer-duration-1400">Generating response&hellip;</MarkerContent>
        </Marker>
        <Marker className="w-auto justify-center text-sm">
          <MarkerIcon className="origin-center drop-shadow-xs drop-shadow-black/50">
            <CursorBeachballIcon className="origin-center animate-spin animation-duration-500 motion-reduce:animate-none" />
          </MarkerIcon>
          <MarkerContent>
            <MotionText.Wave
              trigger={playing ? true : false}

              segmentClassName="shimmer text-info-primary shimmer-color-magenta-400"
            >
              Streaming rainbow tokens&hellip;
            </MotionText.Wave>
          </MarkerContent>
        </Marker>
      </div>
    </SampleShell>
  );
}
