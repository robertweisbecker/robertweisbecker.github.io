"use client";

import { IconMoodAngry, IconMoodEmpty, IconMoodHappy, IconMoodSad, IconMoodSmile, IconX } from "@tabler/icons-react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useMeasure } from "@uidotdev/usehooks";
import { AnimatePresence, LayoutGroup, motion, MotionConfig, useReducedMotion, type TargetAndTransition } from "motion/react";
import * as React from "react";

import { MarkdownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TooltipGroup, TooltipTrigger } from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const RATINGS = [
  {
    value: "1",
    label: "Not at all",
    Icon: IconMoodAngry,
    hue: "red",
  },
  {
    value: "2",
    label: "No",
    Icon: IconMoodSad,
    hue: "orange",
  },
  {
    value: "3",
    label: "Somewhat",
    Icon: IconMoodEmpty,
    hue: "gold",
  },
  {
    value: "4",
    label: "Yes",
    Icon: IconMoodSmile,
    hue: "yellow",
  },
  {
    value: "5",
    label: "Extremely",
    Icon: IconMoodHappy,
    hue: "green",
  },
];

export function EmojiFeedbackDemo() {
  const [rating, setRating] = React.useState<string | null>(null);
  const feedbackId = React.useId();
  const helperId = React.useId();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const tooltipActionsRef = React.useRef<TooltipPrimitive.Root.Actions | null>(null);
  const [innerRef, { height: innerHeight }] = useMeasure();
  const [rowRef, { width: rowWidth }] = useMeasure();
  const shouldReduceMotion = useReducedMotion();
  const isOpen = rating !== null;
  const collapsedWidth = rowWidth === null ? "auto" : rowWidth + 8;
  const containerAnimation = {
    height: isOpen ? innerHeight : null,
    width: isOpen ? "var(--container-md)" : collapsedWidth,
    borderRadius: isOpen ? "var(--radius-lg)" : "var(--radius-3xl)",
  } as unknown as TargetAndTransition;

  React.useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => {
      textareaRef.current?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  return (
    <MotionConfig transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}>
      <motion.div
        layout={!shouldReduceMotion}
        data-state={isOpen ? "open" : "closed"}
        className={cn("m-auto overflow-hidden bg-popover p-0 shadow-border-sm", isOpen ? "rounded-md" : "rounded-full")}
        animate={containerAnimation}
      >
        <LayoutGroup>
          <div ref={innerRef}>
            <motion.div layout={shouldReduceMotion ? false : "position"} className="relative mx-auto flex items-center justify-center p-1">
              <div ref={rowRef} className="flex w-fit min-w-max items-center justify-center gap-3">
                <span className="ps-3 text-sm font-medium whitespace-nowrap text-foreground">Was this helpful?</span>
                <TooltipGroup side="top" sideOffset={6} delay={100} closeDelay={0} actionsRef={tooltipActionsRef}>
                  <ToggleGroup
                    aria-label="Rate this content"
                    value={rating ? [rating] : []}
                    onValueChange={(value) => {
                      tooltipActionsRef.current?.close();
                      setRating(value[0] ?? null);
                    }}
                    spacing={0.5}
                    size="sm"
                  >
                    {RATINGS.map(({ value, label, Icon, hue }) => (
                      <TooltipTrigger
                        key={value}
                        tooltip={label}
                        render={
                          <ToggleGroupItem
                            data-hue={hue}
                            value={value}
                            aria-label={label}
                            className={cn(
                              "size-button-sm rounded-full data-pressed:bg-(--hue-50) data-pressed:text-(--hue-500) dark:data-pressed:bg-(--hue-800) dark:data-pressed:text-(--hue-300) data-pressed:[&_svg]:scale-120"
                            )}
                          />
                        }
                      >
                        <Icon className="size-4 transition-[fill,color,scale] [&_path]:fill-current/10" />
                      </TooltipTrigger>
                    ))}
                  </ToggleGroup>
                </TooltipGroup>
              </div>

              {isOpen ? (
                <Button
                  type="button"
                  render={
                    <motion.button
                      layout={!shouldReduceMotion}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    />
                  }
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Close feedback form"
                  className="absolute inset-e-2 top-2"
                  onClick={() => setRating(null)}
                >
                  <IconX className="size-4" />
                </Button>
              ) : null}
            </motion.div>

            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="feedback-form"
                  layout={!shouldReduceMotion}
                  className="mx-auto w-full space-y-1 p-2 pt-1"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 1, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
                >
                  <label htmlFor={feedbackId} className="sr-only">
                    Feedback
                  </label>
                  <Textarea
                    ref={textareaRef}
                    id={feedbackId}
                    name="emojiFeedback"
                    aria-describedby={helperId}
                    placeholder="Tell me more..."
                    className="min-h-40 w-full resize-none"
                  />
                  <p id={helperId} className="flex items-center justify-end gap-1 text-2xs text-muted-foreground">
                    <MarkdownIcon className="size-3" />
                    Markdown supported (not really).
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </motion.div>
    </MotionConfig>
  );
}
