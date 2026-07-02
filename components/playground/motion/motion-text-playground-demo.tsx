"use client";

import * as React from "react";
import { MotionText } from "@/components/animation/shared";
import * as PixelIcons from "@/components/icons-pixel";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

type MotionTextPer = "char" | "word" | "line";
type MotionTextPreset = "fade" | "fade-in-blur" | "slide" | "scale" | "blur-sm";

const MOTION_TEXT_DEFAULTS = {
  per: "word" as MotionTextPer,
  preset: "fade-in-blur" as MotionTextPreset,
  duration: 560,
  stagger: 36,
  waveDepth: 12,
  loopRunning: true,
};

const MOTION_TEXT_PRESETS: { value: MotionTextPreset; label: string }[] = [
  { value: "fade", label: "Fade" },
  { value: "fade-in-blur", label: "Blur +" },
  { value: "slide", label: "Slide" },
  { value: "scale", label: "Scale" },
  { value: "blur-sm", label: "Blur" },
];

function MotionTextSample({ label, action, children }: { label: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid min-w-0 gap-1.5">
      <div className="flex min-h-button-xs items-center justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {action}
      </div>
      <div className="min-w-0 text-sm leading-6 text-foreground">{children}</div>
    </div>
  );
}

function MotionTextPresetSelect({ value, onValueChange }: { value: MotionTextPreset; onValueChange: (value: MotionTextPreset) => void }) {
  const selectedLabel = MOTION_TEXT_PRESETS.find((preset) => preset.value === value)?.label;

  return (
    <Select value={value} onValueChange={(nextValue) => onValueChange(nextValue as MotionTextPreset)}>
      <SelectTrigger size="sm" aria-label="Text effect preset" className="min-w-28">
        <SelectValue>{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {MOTION_TEXT_PRESETS.map((preset) => (
          <SelectItem key={preset.value} value={preset.value}>
            {preset.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function MotionTextPlaygroundDemo() {
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
    <div className="grid w-full gap-5 sm:grid-cols-2" data-testid="motion-text-playground">
      <MotionTextSample
        label="Entrance"
        action={
          <Button size="xs" variant="ghost" type="button" onClick={replayReveal}>
            Replay
            <PixelIcons.PixelRedoIcon data-icon="inline-end" />
          </Button>
        }
      >
        <MotionText.Reveal
          key={`reveal-${revealKey}`}
          type="motion"
          per={MOTION_TEXT_DEFAULTS.per}
          duration={MOTION_TEXT_DEFAULTS.duration}
          stagger={MOTION_TEXT_DEFAULTS.stagger}
          className="text-sm leading-6 text-balance"
        >
          Motion text makes expressive systems feel reusable.
        </MotionText.Reveal>
      </MotionTextSample>

      <MotionTextSample label="TextEffect" action={<MotionTextPresetSelect value={preset} onValueChange={setPreset} />}>
        <MotionText.Effect
          key={`effect-${preset}`}
          per={MOTION_TEXT_DEFAULTS.per}
          preset={preset}
          speedReveal={effectSpeedReveal}
          speedSegment={effectSpeedSegment}
          className="text-sm leading-6 text-balance"
        >
          Presets live beside the text effect.
        </MotionText.Effect>
      </MotionTextSample>

      <MotionTextSample
        label="Loop"
        action={
          <Field orientation="horizontal" className="w-auto items-center gap-2">
            <FieldLabel className="text-xs" htmlFor="motion-text-loop">
              Play
            </FieldLabel>
            <Switch id="motion-text-loop" checked={loopRunning} onCheckedChange={setLoopRunning} data-testid="motion-text-loop" />
          </Field>
        }
      >
        <p className="text-muted-foreground">
          Feels{" "}
          <MotionText.Loop trigger={loopRunning} interval={1.2} className="text-primary">
            {["snappy", "calm", "clear"]}
          </MotionText.Loop>
        </p>
      </MotionTextSample>

      <MotionTextSample
        label="Scramble"
        action={
          <Button size="xs" variant="ghost" type="button" onClick={replayScramble}>
            Replay
            <PixelIcons.PixelRedoIcon data-icon="inline-end" />
          </Button>
        }
      >
        <MotionText.Scramble
          key={`scramble-${scrambleKey}`}
          duration={MOTION_TEXT_DEFAULTS.duration / 1000}
          className="font-mono text-sm leading-6"
        >
          Interface signal
        </MotionText.Scramble>
      </MotionTextSample>

      <MotionTextSample label="Wave">
        <div className="grid gap-2">
          <MotionText.Wave
            duration={MOTION_TEXT_DEFAULTS.duration / 1000}
            zDistance={waveDepth}
            yDistance={Math.round(waveDepth / -4)}
            rotateYDistance={waveDepth}
            className="text-sm leading-6 text-balance"
          >
            Waves keep their own rhythm
          </MotionText.Wave>
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
            className="max-w-xs"
          />
        </div>
      </MotionTextSample>

      <MotionTextSample
        label="Morph"
        action={
          <Button size="xs" variant="ghost" type="button" onClick={() => setMorphAlternate((value) => !value)}>
            Swap
          </Button>
        }
      >
        <MotionText.Morph className="text-sm leading-6">
          {morphAlternate ? "Motion variants compose cleanly" : "Variant controls compose motion"}
        </MotionText.Morph>
      </MotionTextSample>

      <MotionTextSample label="Shimmer">
        <p className="shimmer text-sm leading-6 text-muted-foreground shimmer-color-primary/70 shimmer-duration-1400">
          Generating response&hellip;
        </p>
      </MotionTextSample>
    </div>
  );
}
