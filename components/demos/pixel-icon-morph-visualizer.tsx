"use client";

import * as PixelIcons from "@/components/icons-pixel";
import { PixelIconMorph, type PixelIconMorphAnimation, type PixelIconMorphStrategy } from "@/components/pixel-icon-morph";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import * as React from "react";

type SpeedScale = "0.25" | "0.5" | "1";

type Option<T extends string> = {
  value: T;
  label: string;
};

const BASE_DURATION = 0.2;
const STAGGER = 0.002;

const DEFAULT_SEQUENCE: PixelIcons.MorphablePixelIconName[] = [
  "PixelCopyIcon",
  "PixelClipboardCheckIcon",
  "PixelDownloadIcon",
  "PixelFolderIcon",
  "PixelFolderOpenIcon",
  "PixelExternalIcon",
];

const STRATEGY_OPTIONS: Option<PixelIconMorphStrategy>[] = [
  { value: "nearest", label: "Nearest" },
  { value: "reading", label: "Reading" },
  { value: "radial", label: "Radial" },
  { value: "scatter", label: "Scatter" },
  { value: "compress", label: "Compress" },
];

const ANIMATION_OPTIONS: Option<PixelIconMorphAnimation>[] = [
  { value: "linear", label: "Linear" },
  { value: "ease", label: "Ease" },
  { value: "spring", label: "Spring" },
];

const SPEED_OPTIONS: Option<SpeedScale>[] = [
  { value: "0.25", label: "0.25x" },
  { value: "0.5", label: "0.5x" },
  { value: "1", label: "1x" },
];

const SPEED_DURATIONS: Record<SpeedScale, number> = {
  "0.25": 0.8,
  "0.5": 0.4,
  "1": BASE_DURATION,
};

const iconComponents = PixelIcons as Record<PixelIcons.MorphablePixelIconName, React.ComponentType<React.ComponentProps<"svg">>>;

function formatIconName(name: string) {
  return name
    .replace(/^Pixel/, "")
    .replace(/Icon$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
}

function getNextIndex(currentIndex: number, length: number) {
  return (currentIndex + 1) % length;
}

function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onValueChange,
}: {
  label: string;
  value: T;
  options: Option<T>[];
  onValueChange: (value: T) => void;
}) {
  return (
    <Field className="gap-1.5">
      <FieldLabel className="text-xs">{label}</FieldLabel>
      <ToggleGroup
        value={[value]}
        onValueChange={(next) => {
          const nextValue = Array.isArray(next) ? next[0] : next;
          if (nextValue) {
            onValueChange(nextValue as T);
          }
        }}
        spacing={0.5}
        size="sm"
        variant="elevated"
        aria-label={label}
        className="w-full flex-wrap"
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value} aria-label={option.label} className="min-h-8 flex-1 px-2">
            <span className="truncate text-xs">{option.label}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Field>
  );
}

function StrategyControl({
  value,
  onValueChange,
}: {
  value: PixelIconMorphStrategy;
  onValueChange: (value: PixelIconMorphStrategy) => void;
}) {
  const selectedOption = STRATEGY_OPTIONS.find((option) => option.value === value);

  return (
    <Field className="gap-1.5">
      <FieldLabel className="text-xs">Strategy</FieldLabel>
      <Select value={value} onValueChange={(nextValue) => onValueChange(nextValue as PixelIconMorphStrategy)}>
        <SelectTrigger className="w-full">
          <SelectValue>{selectedOption?.label ?? value}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {STRATEGY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}

export function PixelIconMorphVisualizer({ className }: { className?: string }) {
  const [sequence, setSequence] = React.useState<PixelIcons.MorphablePixelIconName[]>(DEFAULT_SEQUENCE);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [active, setActive] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [strategy, setStrategy] = React.useState<PixelIconMorphStrategy>("nearest");
  const [animation, setAnimation] = React.useState<PixelIconMorphAnimation>("ease");
  const [speedScale, setSpeedScale] = React.useState<SpeedScale>("1");
  const timerRef = React.useRef<number | null>(null);

  const duration = SPEED_DURATIONS[speedScale] ?? BASE_DURATION;
  const from = sequence[currentIndex];
  const nextIndex = sequence.length > 0 ? getNextIndex(currentIndex, sequence.length) : 0;
  const to = sequence[nextIndex];
  const canPlay = sequence.length >= 2 && Boolean(from && to);
  const CurrentIcon = from ? iconComponents[from] : null;
  const rawTotalDuration = (duration + STAGGER * 27) * 1000 + 80;
  const totalDuration = Number.isFinite(rawTotalDuration) ? Math.max(160, rawTotalDuration) : 320;
  const settingsKey = `${animation}-${strategy}-${speedScale}`;
  const previousSettingsRef = React.useRef(settingsKey);
  const transitionLabel =
    from && to && canPlay
      ? `${formatIconName(from)} -> ${formatIconName(to)}`
      : from
        ? "Add another icon to animate"
        : "Select icons to build a sequence";

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const playTransition = React.useCallback(() => {
    if (isAnimating || !canPlay) {
      return;
    }

    clearTimer();
    setIsAnimating(true);
    setActive(false);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setActive(true));
    });

    const startedAt = window.performance.now();

    const finishTransition = () => {
      const remaining = totalDuration - (window.performance.now() - startedAt);

      if (remaining > 16) {
        timerRef.current = window.setTimeout(finishTransition, remaining);
        return;
      }

      setCurrentIndex((index) => getNextIndex(index, sequence.length));
      setActive(false);
      setIsAnimating(false);
      timerRef.current = null;
    };

    timerRef.current = window.setTimeout(finishTransition, totalDuration);
  }, [canPlay, clearTimer, isAnimating, sequence.length, totalDuration]);

  React.useEffect(() => clearTimer, [clearTimer]);

  React.useEffect(() => {
    if (previousSettingsRef.current === settingsKey) {
      return;
    }

    previousSettingsRef.current = settingsKey;
    playTransition();
  }, [playTransition, settingsKey]);

  function toggleIcon(icon: PixelIcons.MorphablePixelIconName) {
    clearTimer();
    setActive(false);
    setIsAnimating(false);

    setSequence((items) => {
      const existingIndex = items.indexOf(icon);

      if (existingIndex === -1) {
        return [...items, icon];
      }

      const next = items.filter((item) => item !== icon);
      setCurrentIndex((index) => {
        if (next.length === 0) {
          return 0;
        }

        if (existingIndex < index) {
          return index - 1;
        }

        return Math.min(index, next.length - 1);
      });
      return next;
    });
  }

  function clearSequence() {
    clearTimer();
    setSequence([]);
    setCurrentIndex(0);
    setActive(false);
    setIsAnimating(false);
  }

  function jumpToIcon(index: number) {
    clearTimer();
    setCurrentIndex(index);
    setActive(false);
    setIsAnimating(false);
  }

  return (
    <div className={cn("grid items-start gap-2 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)]", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Morph Sequence</CardTitle>
          <CardAction>
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              onClick={playTransition}
              aria-disabled={isAnimating || !canPlay}
              aria-label="Play transition"
              data-testid="pixel-morph-play"
            >
              <IconPlayerPlayFilled />
            </Button>
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={clearSequence}
              disabled={sequence.length === 0}
              data-testid="pixel-morph-clear"
            >
              Clear
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="grid size-button-lg place-items-center">
              <Button
                type="button"
                size="icon-lg"
                variant="ghost"
                rounded
                onClick={playTransition}
                aria-disabled={isAnimating || !canPlay}
                aria-label={canPlay && from && to ? `Play ${formatIconName(from)} to ${formatIconName(to)}` : transitionLabel}
                data-testid="pixel-morph-preview"
              >
                {canPlay && from && to ? (
                  <PixelIconMorph
                    key={`${from}-${to}-${strategy}-${animation}`}
                    from={from}
                    to={to}
                    active={active}
                    strategy={strategy}
                    animation={animation}
                    duration={duration}
                    stagger={STAGGER}
                    className="size-[22px]"
                  />
                ) : CurrentIcon ? (
                  <CurrentIcon className="size-[22px]" aria-hidden />
                ) : (
                  <span className="size-[22px] rounded-md border border-dashed border-muted-foreground/40" aria-hidden />
                )}
              </Button>
            </div>

            {sequence.length > 0 ? (
              <div className="flex items-center gap-1.5" aria-label="Selected icon sequence">
                {sequence.map((icon, index) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => jumpToIcon(index)}
                    aria-label={`Jump to ${formatIconName(icon)}`}
                    aria-current={index === currentIndex ? "step" : undefined}
                    className={cn(
                      "size-2 rounded-full bg-border transition-[scale,background-color]",
                      index === currentIndex && "scale-125 bg-input"
                    )}
                  />
                ))}
              </div>
            ) : null}

            <div className="min-h-5 text-center text-xs font-medium text-foreground">{transitionLabel}</div>
          </div>

          <ScrollArea className="h-72 w-full" scrollbarGutter showScrollbar scrollFade>
            <div className="grid grid-cols-6 gap-0.5 sm:grid-cols-8 lg:grid-cols-10" aria-label="Morphable pixel icons">
              {PixelIcons.morphablePixelIconNames.map((icon) => {
                const Icon = iconComponents[icon];
                const sequenceIndex = sequence.indexOf(icon);
                const isSelected = sequenceIndex !== -1;
                const isCurrent = sequenceIndex === currentIndex;

                return (
                  <Button
                    key={icon}
                    type="button"
                    size="icon-lg"
                    variant={isCurrent ? "default" : isSelected ? "outline" : "ghost"}
                    onClick={() => toggleIcon(icon)}
                    aria-label={`${isSelected ? "Remove" : "Add"} ${formatIconName(icon)}`}
                    aria-pressed={isSelected}
                    className={cn(
                      isSelected &&
                        !isCurrent &&
                        "border-blue-500/70 text-blue-600 shadow-[0_0_0_1px_--alpha(var(--color-blue-500)_/_35%)]",
                      isCurrent && "bg-blue-500 text-white hover:bg-blue-500/90"
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                    {isSelected ? (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute end-1 top-1 grid size-3.5 place-items-center rounded-full text-[8px]/none font-medium",
                          isCurrent ? "bg-white/20 text-white" : "bg-blue-500 text-white"
                        )}
                      >
                        {sequenceIndex + 1}
                      </span>
                    ) : null}
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card variant="muted">
        <CardHeader>
          <CardTitle>Customize</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          <SegmentedControl label="Animation" value={animation} options={ANIMATION_OPTIONS} onValueChange={setAnimation} />
          <StrategyControl value={strategy} onValueChange={setStrategy} />
          <SegmentedControl label="Speed" value={speedScale} options={SPEED_OPTIONS} onValueChange={setSpeedScale} />
        </CardContent>
      </Card>
    </div>
  );
}
