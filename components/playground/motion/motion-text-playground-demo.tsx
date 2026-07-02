"use client";

import * as React from "react";
import { MotionText } from "@/components/animation/shared";
import { PixelRedoIcon, PixelShuffleIcon } from "@/components/icons-pixel";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Loader } from "@/components/ui/loader";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type MotionTextPer = "char" | "word" | "line";
type MotionTextPreset = "fade" | "fade-in-blur" | "slide" | "scale" | "blur-sm";

const MOTION_TEXT_DEFAULTS = {
  per: "word" as MotionTextPer,
  preset: "blur" as MotionTextPreset,
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
    <div data-slot="motion-text-sample" className="grid min-w-0 justify-items-center gap-3 text-center">
      <p className="mb-3 font-pixel text-2xs text-muted-foreground uppercase">{label}</p>
      <div className={cn("min-w-0 leading-6 text-foreground", contentClassName)}>{children}</div>
      {action ? (
        <div data-slot="motion-text-action" className="flex min-h-button-sm flex-wrap items-center justify-center gap-2">
          {action}
        </div>
      ) : null}
    </div>
  );
}

function MotionTextSampleSeparator() {
  return <Separator className="bg-border/70" />;
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
    <div className="grid w-full gap-6" data-testid="motion-text-playground">
      <MotionTextSample
        label="Entrance"
        action={
          <Button size="sm" variant="outline" type="button" onClick={replayReveal}>
            <PixelRedoIcon data-icon="inline-start" scale={1.5} />
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
          className="text-h1"
        >
          A little motion can make text more expressive.
        </MotionText.Reveal>
      </MotionTextSample>

      <MotionTextSampleSeparator />

      <MotionTextSample label="TextEffect" action={<MotionTextPresetSelect value={preset} onValueChange={setPreset} />}>
        <MotionText.Effect
          key={`effect-${preset}`}
          per={MOTION_TEXT_DEFAULTS.per}
          preset={preset}
          speedReveal={effectSpeedReveal}
          speedSegment={effectSpeedSegment}
          className="text-lg text-balance"
        >
          I have all sorts of options.
        </MotionText.Effect>
      </MotionTextSample>

      <MotionTextSampleSeparator />

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
        <p className="transition-width min-w-64 text-left text-lg font-medium text-muted-foreground/72">
          Should designers{" "}
          <MotionText.Loop trigger={loopRunning} interval={2} className="text-primary">
            {["code", "prompt", "tweet"]}
          </MotionText.Loop>
          ?
        </p>
      </MotionTextSample>

      <MotionTextSampleSeparator />

      <MotionTextSample
        label="Scramble"
        action={
          <Button size="sm" variant="outline" type="button" onClick={replayScramble}>
            <PixelRedoIcon data-icon="inline-start" />
            Replay
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

      <MotionTextSampleSeparator />

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
            className="w-72 max-w-full"
          />
        }
      >
        <MotionText.Wave
          duration={MOTION_TEXT_DEFAULTS.duration / 1000}
          zDistance={waveDepth}
          yDistance={Math.round(waveDepth / -4)}
          rotateYDistance={waveDepth}
          className="text-sm leading-6 text-balance"
        >
          How deep is your love?
        </MotionText.Wave>
      </MotionTextSample>

      <MotionTextSampleSeparator />

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

      <MotionTextSampleSeparator />

      <MotionTextSample label="Shimmer" contentClassName="w-full">
        <div className="grid justify-items-center gap-3">
          <Marker className="w-auto justify-center text-sm">
            <MarkerIcon>
              <Loader className="text-primary" />
            </MarkerIcon>
            <MarkerContent className="shimmer shimmer-color-foreground shimmer-duration-1400">Generating response&hellip;</MarkerContent>
          </Marker>
          <Marker className="w-auto justify-center text-sm">
            <MarkerIcon>
              <Loader className="text-fuchsia-400" />
            </MarkerIcon>
            <MarkerContent
              className="shimmer shimmer-duration-1200"
              style={
                {
                  "--shimmer-image": "linear-gradient(90deg in oklch longer hue,#fb7185,#facc15,#4ade80,#22d3ee,#a78bfa,#fb7185)",
                } as React.CSSProperties
              }
            >
              Streaming rainbow tokens&hellip;
            </MarkerContent>
          </Marker>
        </div>
      </MotionTextSample>
    </div>
  );
}
