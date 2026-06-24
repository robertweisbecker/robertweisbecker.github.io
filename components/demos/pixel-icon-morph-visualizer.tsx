"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import * as PixelIcons from "@/components/icons-pixel";
import { NumberSlider } from "@/components/number-slider";
import { PixelIconMorph, type PixelIconMorphAnimation, type PixelIconMorphStrategy } from "@/components/pixel-icon-morph";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGrid, ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import * as React from "react";
import { TooltipGroup, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";

type SpeedScale = "0.25" | "0.5" | "1";

type Option<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

const BASE_DURATION = 0.2;
const DEFAULT_STAGGER_MS = 2;

const DEFAULT_SEQUENCE: PixelIcons.MorphablePixelIconName[] = ["PixelEyeIcon", "PixelEyeClosedIcon"];

const STRATEGY_OPTIONS: Option<PixelIconMorphStrategy>[] = [
  { value: "match", label: "Match", description: "Keep shared pixels pinned, then move the rest nearest" },
  { value: "nearest", label: "Nearest", description: "Move pixels shortest distance" },
  { value: "reading", label: "Reading", description: "Re-paint from top left" },
  { value: "radial", label: "Radial", description: "Reshuffle pixels from center" },
  { value: "scatter", label: "Scatter", description: "Spread pixels, then compress to new position" },
  { value: "compress", label: "Compress", description: "Move pixels to center first, then animate out" },
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
  "0.25": BASE_DURATION * 4,
  "0.5": BASE_DURATION * 2,
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

const iconNameCollator = new Intl.Collator("en", { sensitivity: "base" });
const sortedMorphablePixelIconNames = [...PixelIcons.morphablePixelIconNames].sort((a, b) =>
  iconNameCollator.compare(formatIconName(a), formatIconName(b))
);

function getNextIndex(currentIndex: number, length: number) {
  return (currentIndex + 1) % length;
}

function AnimationControl<T extends string>({
  label,
  type = "toggle",
  orientation,
  value,
  options,
  onValueChange,
}: {
  label: string;
  type?: "toggle" | "select";
  orientation?: "vertical" | "horizontal" | "responsive";
  value: T;
  options: Option<T>[];
  onValueChange: (value: T) => void;
}) {
  // const fieldOrientation = orientation ?? (type === "select" ? "horizontal" : "vertical");

  if (type === "select") {
    return (
      <Field orientation={orientation}>
        <FieldLabel>{label}</FieldLabel>
        <Select value={value} onValueChange={(nextValue) => onValueChange(nextValue as T)}>
          <SelectTrigger className="w-full">
            <SelectValue>{options.find((option) => option.value === value)?.label ?? value}</SelectValue>
          </SelectTrigger>
          <SelectContent className="min-w-64">
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="py-2.5">
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="truncate">{option.label}</span>
                    {option.description ? <span className="text-xs/4 text-muted-foreground">{option.description}</span> : null}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    );
  } else
    return (
      <Field orientation={orientation}>
        <FieldLabel>{label}</FieldLabel>
        <ToggleGroup
          value={[value]}
          onValueChange={(next) => {
            const nextValue = Array.isArray(next) ? next[0] : next;
            if (nextValue) {
              onValueChange(nextValue as T);
            }
          }}
          spacing={0.25}
          size="sm"
          variant="elevated"
          className={cn("flex-wrap", orientation === "horizontal" && "justify-end")}
          aria-label={label}
        >
          {options.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value} aria-label={option.label} className="grow">
              <span className="truncate text-xs">{option.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Field>
    );
}

export function PixelIconMorphVisualizer({ className }: { className?: string }) {
  const [sequence, setSequence] = React.useState<PixelIcons.MorphablePixelIconName[]>(DEFAULT_SEQUENCE);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [active, setActive] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [strategy, setStrategy] = React.useState<PixelIconMorphStrategy>("match");
  const [animation, setAnimation] = React.useState<PixelIconMorphAnimation>("ease");
  const [speedScale, setSpeedScale] = React.useState<SpeedScale>("1");
  const [staggerMs, setStaggerMs] = React.useState(DEFAULT_STAGGER_MS);
  const timerRef = React.useRef<number | null>(null);

  const duration = SPEED_DURATIONS[speedScale] ?? BASE_DURATION;
  const stagger = staggerMs / 1000;
  const from = sequence[currentIndex];
  const nextIndex = sequence.length > 0 ? getNextIndex(currentIndex, sequence.length) : 0;
  const to = sequence[nextIndex];
  const canPlay = sequence.length >= 2 && Boolean(from && to);
  const CurrentIcon = from ? iconComponents[from] : null;
  const rawTotalDuration = (duration + stagger * 27) * 1000 + 80;
  const totalDuration = Number.isFinite(rawTotalDuration) ? Math.max(160, rawTotalDuration) : 320;
  const transitionLabel =
    from && to && canPlay ? (
      <>
        <span className="opacity-100">{formatIconName(from)}</span> &rarr; <span className="opacity-50">{formatIconName(to)}</span>
      </>
    ) : from ? (
      "Add another icon to animate"
    ) : (
      "Select icons to build a sequence"
    );

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const playTransitions = React.useCallback(
    (steps: number, startIndex = currentIndex) => {
      if (isAnimating || !canPlay || steps < 1) {
        return;
      }

      const sequenceLength = sequence.length;
      const resolvedStartIndex = Math.min(startIndex, sequenceLength - 1);

      clearTimer();
      setIsAnimating(true);

      const runStep = (stepIndex: number, fromIndex: number) => {
        setCurrentIndex(fromIndex);
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

          const nextFromIndex = getNextIndex(fromIndex, sequenceLength);

          if (stepIndex + 1 >= steps) {
            setCurrentIndex(nextFromIndex);
            setActive(false);
            setIsAnimating(false);
            timerRef.current = null;
            return;
          }

          setCurrentIndex(nextFromIndex);
          setActive(false);
          window.requestAnimationFrame(() => runStep(stepIndex + 1, nextFromIndex));
        };

        timerRef.current = window.setTimeout(finishTransition, totalDuration);
      };

      runStep(0, resolvedStartIndex);
    },
    [canPlay, clearTimer, currentIndex, isAnimating, sequence.length, totalDuration]
  );

  const advanceSequence = React.useCallback(() => {
    playTransitions(1);
  }, [playTransitions]);

  const playSequence = React.useCallback(() => {
    if (!canPlay) {
      return;
    }

    playTransitions(Math.max(1, sequence.length - 1), 0);
  }, [canPlay, playTransitions, sequence.length]);

  React.useEffect(() => clearTimer, [clearTimer]);

  function updateSequence(nextValue: PixelIcons.MorphablePixelIconName[]) {
    clearTimer();
    setActive(false);
    setIsAnimating(false);

    setSequence((items) => {
      const selected = new Set(nextValue);
      const next = [...items.filter((item) => selected.has(item)), ...nextValue.filter((item) => !items.includes(item))];

      setCurrentIndex((index) => {
        if (next.length === 0) {
          return 0;
        }

        const currentIcon = items[index];
        const nextCurrentIndex = currentIcon ? next.indexOf(currentIcon) : -1;

        if (nextCurrentIndex !== -1) {
          return nextCurrentIndex;
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
          <CardTitle>Preview</CardTitle>
          <CardAction>
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={clearSequence}
              disabled={sequence.length === 0}
              data-testid="pixel-morph-clear"
            >
              Clear selections
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid h-[110px] place-items-center" data-section="preview">
            <Button
              type="button"
              size="icon-lg"
              variant="outline"
              onClick={advanceSequence}
              aria-label={canPlay && from && to ? `Play ${formatIconName(from)} to ${formatIconName(to)}` : undefined}
              data-testid="pixel-morph-preview"
              className="size-[88px]! scale-100!"
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
                  stagger={stagger}
                  className="size-[44px]!"
                />
              ) : CurrentIcon ? (
                <CurrentIcon className="size-[44px]!" aria-hidden />
              ) : (
                <span
                  className="size-[44px]! bg-[repeating-conic-gradient(--alpha(var(--destructive)/10%)_0_25%,_transparent_0_50%)] bg-[length:8px_8px]"
                  aria-hidden
                />
              )}
            </Button>
          </div>
          <div className="mx-auto flex h-button-xs items-center gap-px" aria-label="Selected icon sequence">
            {sequence.length > 0 ? (
              <>
                <TooltipGroup side="bottom">
                  <LayoutGroup>
                    <AnimatePresence>
                      {sequence.map((icon, index) => (
                        <TooltipTrigger
                          key={icon}
                          tooltip={<span className="whitespace-nowrap">{formatIconName(icon)}</span>}
                          render={
                            <Button
                              type="button"
                              variant={"ghost"}
                              size="icon-xs"
                              rounded
                              onClick={() => jumpToIcon(index)}
                              aria-label={`Jump to ${formatIconName(icon)}`}
                              aria-current={index === currentIndex ? "step" : undefined}
                              data-pressed={index === currentIndex}
                            />
                          }
                        >
                          <motion.span animate={{ scale: index === currentIndex ? 1.1 : 1, opacity: index === currentIndex ? 1 : 0.5 }}>
                            <PixelIconMorph from={icon} to={icon} />
                          </motion.span>
                        </TooltipTrigger>
                      ))}
                    </AnimatePresence>
                  </LayoutGroup>
                </TooltipGroup>
              </>
            ) : null}
          </div>
          <div className="min-h-5 text-center font-pixel text-2xs text-foreground">{transitionLabel}</div>

          <ScrollArea className="w-full max-sm:h-64" scrollbarGutter showScrollbar scrollFade innerClass="border-t border-s">
            <ToggleGrid
              columns={12}
              spacing={0}
              multiple
              shape="square"
              value={sequence}
              onValueChange={(next) => updateSequence(next as PixelIcons.MorphablePixelIconName[])}
              aria-label="Morphable pixel icons"
              className="divide-x divide-y *:last:border-e *:last:border-b"
            >
              {sortedMorphablePixelIconNames.map((icon) => {
                const Icon = iconComponents[icon];
                const sequenceIndex = sequence.indexOf(icon);
                const isSelected = sequenceIndex !== -1;

                return (
                  <ToggleGroupItem
                    key={icon}
                    value={icon}
                    // variant={isCurrent ? "outline" : "default"}
                    aria-label={`${isSelected ? "Remove" : "Add"} ${formatIconName(icon)}`}
                    className="group aspect-square h-auto! rounded-none"
                  >
                    <Icon className="size-[16.5px]" aria-hidden />
                    <span className="ease pointer-events-none absolute inset-0 grid-stack overflow-hidden bg-secondary text-center text-[9px]/none text-ellipsis opacity-0 group-hover:opacity-100 group-data-pressed:opacity-0">
                      {formatIconName(icon)}
                    </span>
                    {isSelected ? (
                      <Badge variant="outline" size="sm" aria-hidden className={cn("absolute inset-e-px top-px h-fit")}>
                        <span className="font-pixel text-2xs">{sequenceIndex + 1}</span>
                      </Badge>
                    ) : null}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGrid>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card variant="muted">
        <CardHeader>
          <CardTitle>Customize</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          <AnimationControl label="Animation" value={animation} options={ANIMATION_OPTIONS} onValueChange={setAnimation} />
          <AnimationControl type="select" label="Strategy" value={strategy} options={STRATEGY_OPTIONS} onValueChange={setStrategy} />
          <AnimationControl
            type="toggle"
            // orientation="horizontal"
            label="Speed"
            value={speedScale}
            options={SPEED_OPTIONS}
            onValueChange={setSpeedScale}
          />
          <NumberSlider
            label="Stagger"
            min={0}
            max={10}
            step={1}
            value={staggerMs}
            onValueChange={setStaggerMs}
            unit="ms"
            format={{ maximumFractionDigits: 0 }}
          />
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            type="button"
            size="xs"
            variant="ghost"
            onClick={playSequence}
            focusableWhenDisabled={true}
            disabled={isAnimating || !canPlay}
            aria-disabled={isAnimating || !canPlay}
            aria-label="Play full sequence from beginning"
            data-testid="pixel-morph-play"
          >
            <IconPlayerPlayFilled data-icon="inline-start" />
            Play all
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
