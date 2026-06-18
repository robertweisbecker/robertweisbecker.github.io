"use client";

import {
  IconMoodAngry,
  IconMoodAngryFilled,
  IconMoodEmpty,
  IconMoodEmptyFilled,
  IconMoodHappy,
  IconMoodHappyFilled,
  IconMoodSad,
  IconMoodSadFilled,
  IconMoodSmile,
  IconMoodSmileFilled,
  IconX,
} from "@tabler/icons-react";
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
    IconFilled: IconMoodAngryFilled,
    hue: "red",
  },
  {
    value: "2",
    label: "No",
    Icon: IconMoodSad,
    IconFilled: IconMoodSadFilled,
    hue: "orange",
  },
  {
    value: "3",
    label: "Somewhat",
    Icon: IconMoodEmpty,
    IconFilled: IconMoodEmptyFilled,
    hue: "gold",
  },
  {
    value: "4",
    label: "Yes",
    Icon: IconMoodSmile,
    IconFilled: IconMoodSmileFilled,
    hue: "yellow",
  },
  {
    value: "5",
    label: "Extremely",
    Icon: IconMoodHappy,
    IconFilled: IconMoodHappyFilled,
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
    width: isOpen ? "var(--feedback-expanded-width)" : collapsedWidth,
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
        className={cn(
          "m-auto max-w-[calc(100vw-2rem)] overflow-hidden bg-popover p-0 shadow-border-sm [--feedback-expanded-width:var(--container-3xs)] sm:[--feedback-expanded-width:var(--container-md)]",
          isOpen ? "rounded-md" : "rounded-full"
        )}
        animate={containerAnimation}
      >
        <LayoutGroup>
          <div ref={innerRef}>
            <motion.div layout={shouldReduceMotion ? false : "position"} className="relative mx-auto flex items-center justify-center p-1">
              <div ref={rowRef} className="flex w-fit min-w-max items-center justify-center gap-1.5 sm:gap-3">
                <span className="ps-2 text-sm font-medium whitespace-nowrap text-foreground sm:ps-3">
                  <span className="sm:hidden">Helpful?</span>
                  <span className="hidden sm:inline">Was this helpful?</span>
                </span>
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
                    {RATINGS.map(({ value, label, Icon, IconFilled, hue }) => (
                      <TooltipTrigger
                        key={value}
                        tooltip={label}
                        render={
                          <ToggleGroupItem
                            data-hue={hue}
                            value={value}
                            aria-label={label}
                            className={cn(
                              "isolate size-button-sm rounded-full data-pressed:bg-transparent! data-pressed:text-(--hue-500) dark:data-pressed:text-(--hue-300) data-pressed:[&_svg]:scale-120"
                            )}
                          />
                        }
                      >
                        {value === rating ? (
                          <motion.div
                            key={`emoji-feedback-indicator-${value}`}
                            layoutId="emoji-feedback-indicator"
                            className="absolute inset-0 -z-1 rounded-[inherit] bg-(--hue-100) dark:bg-(--hue-700)"
                            transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
                          />
                        ) : null}

                        <AnimatePresence mode="popLayout">
                          {value === rating ? (
                            <>
                              <motion.div
                                layoutId={`emoji-feedback-icon-${value}`}
                                initial={{ scale: 1 }}
                                animate={{ scale: 1.05 }}
                                transition={{ type: "spring", duration: 0.15, delay: 0.05, bounce: 0.5 }}
                              >
                                <IconFilled className="size-4 text-(--hue-500) dark:text-(--hue-300)" />
                              </motion.div>
                            </>
                          ) : (
                            <motion.div layoutId={`emoji-feedback-icon-${value}`}>
                              <Icon className="size-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                  className="absolute inset-e-2 top-2 max-sm:hidden"
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
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 2, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -5, filter: "blur(4px)" }}
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
