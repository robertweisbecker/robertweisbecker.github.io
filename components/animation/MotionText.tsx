"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  type AnimatePresenceProps,
  type Transition,
  type Variants,
} from "motion/react";
import * as React from "react";

type TextElement = keyof React.JSX.IntrinsicElements;
type TextPer = "char" | "word" | "line";
type TextPreset = "blur-sm" | "fade-in-blur" | "scale" | "fade" | "slide";

const wordSegmenter = new Intl.Segmenter(undefined, { granularity: "word" });
const charSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const defaultScrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getText(children: React.ReactNode) {
  return typeof children === "string" ? children : children?.toString() || "";
}

function splitText(text: string, per: TextPer) {
  if (per === "line") return text.split(/(\n)/);
  if (per === "word") return [...wordSegmenter.segment(text)].map((segment) => segment.segment);
  return [...charSegmenter.segment(text)].map((segment) => segment.segment);
}

function getReadableSegment(segment: string) {
  return segment === " " ? "\u00a0" : segment;
}

function isWhitespaceSegment(segment: string) {
  return segment.trim() === "";
}

function getSegmentWrapClassName(per: TextPer, segment: string) {
  return per === "word" && !isWhitespaceSegment(segment) ? "whitespace-nowrap" : undefined;
}

function renderTextSegments(
  text: string,
  per: TextPer,
  renderSegment: (segment: string, index: number, className?: string) => React.ReactNode
) {
  if (per !== "char") {
    return splitText(text, per).map((segment, index) =>
      renderSegment(getReadableSegment(segment), index, getSegmentWrapClassName(per, segment))
    );
  }

  let index = 0;

  return [...wordSegmenter.segment(text)].map((wordSegment, groupIndex) => {
    const children = [...charSegmenter.segment(wordSegment.segment)].map((segment) =>
      renderSegment(getReadableSegment(segment.segment), index++)
    );

    if (isWhitespaceSegment(wordSegment.segment)) {
      return <React.Fragment key={`space-${groupIndex}`}>{children}</React.Fragment>;
    }

    return (
      <span className="inline-block whitespace-nowrap" key={`${wordSegment.segment}-${groupIndex}`}>
        {children}
      </span>
    );
  });
}

function getPresetVariants(preset: TextPreset): Variants {
  const visible = { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 };

  if (preset === "blur-sm") return { hidden: { opacity: 0, filter: "blur(4px)" }, visible };
  if (preset === "fade-in-blur") return { hidden: { opacity: 0, filter: "blur(8px)", y: 8 }, visible };
  if (preset === "scale") return { hidden: { opacity: 0, scale: 0.86 }, visible };
  if (preset === "slide") return { hidden: { opacity: 0, y: 12 }, visible };
  return { hidden: { opacity: 0 }, visible };
}

function createContainerTransition({
  delay = 0,
  segmentCount,
  speedSegment = 1,
  transition,
}: {
  delay?: number;
  segmentCount: number;
  speedSegment?: number;
  transition?: Transition;
}): Transition {
  const staggerChildren = Math.max(0.01, 0.04 / speedSegment);

  return {
    delayChildren: delay,
    staggerChildren: segmentCount > 1 ? staggerChildren : 0,
    ...transition,
  };
}

type SegmentTextProps = {
  text: string;
  per: TextPer;
  segmentWrapperClassName?: string;
  children: (segment: string, index: number, className?: string) => React.ReactNode;
};

function SegmentedText({ text, per, segmentWrapperClassName, children }: SegmentTextProps) {
  return (
    <>
      <span aria-hidden className={segmentWrapperClassName}>
        {renderTextSegments(text, per, (segment, index, className) => (
          <React.Fragment key={`${segment}-${index}`}>{children(segment, index, className)}</React.Fragment>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}

export type MotionTextRevealProps = {
  children: React.ReactNode;
  as?: TextElement;
  className?: string;
  style?: React.CSSProperties;
  type?: "css" | "motion";
  per?: TextPer | "characters" | "words" | "lines";
  duration?: number;
  stagger?: number;
  once?: boolean;
  debug?: boolean;
  segmentClassName?: string;
  segmentWrapperClassName?: string;
};

export function MotionTextReveal({
  children,
  as = "h1",
  className,
  style,
  type = "css",
  per = "char",
  duration = 500,
  stagger = 30,
  once = false,
  debug = false,
  segmentClassName,
  segmentWrapperClassName,
}: MotionTextRevealProps) {
  const id = React.useId();
  const [reset, setReset] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();
  const text = getText(children);
  const Component = as;
  const normalizedPer: TextPer = per === "characters" ? "char" : per === "words" ? "word" : per === "lines" ? "line" : per;

  if (type === "motion") {
    const itemTransition: Transition = { duration: Math.max(0.01, duration / 1000), ease: [0.22, 1, 0.36, 1] };

    return (
      <div className="group/textReveal relative overflow-visible" id={id}>
        <Component className={cn("whitespace-pre-wrap", className)} key={reset} style={style}>
          <span aria-hidden className={segmentWrapperClassName}>
            <motion.span
              className="contents"
              initial={shouldReduceMotion ? "visible" : "hidden"}
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: shouldReduceMotion
                    ? { staggerChildren: 0 }
                    : { staggerChildren: stagger / 1000, delayChildren: once ? 0 : 0 },
                },
              }}
            >
              {renderTextSegments(text, normalizedPer, (segment, index, wrapClassName) => (
                <motion.span
                  className={cn("inline-block", wrapClassName, segmentClassName)}
                  key={`${segment}-${index}`}
                  variants={{
                    hidden: { opacity: 0, filter: "blur(8px)", y: "-10%" },
                    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
                  }}
                  transition={itemTransition}
                >
                  {segment}
                </motion.span>
              ))}
            </motion.span>
          </span>
          <span className="sr-only">{text}</span>
        </Component>
        {debug && (
          <Button
            onClick={() => setReset((value) => value + 1)}
            className="ease absolute top-1.5 right-0 m-1 translate-y-1 font-pixel text-[11px] opacity-0 transition-[opacity,translate] duration-100 group-hover/textReveal:translate-y-0 group-hover/textReveal:opacity-100"
            size="icon-xs"
            variant="ghost"
            type="button"
          >
            {"\u23ce"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group/textReveal relative overflow-visible transition-[opacity,transform]",
        once ? "animate-text-reveal-initial" : "animate-text-reveal"
      )}
      id={id}
    >
      <Component
        className={cn("whitespace-pre-wrap", className)}
        key={reset}
        style={{ "--duration": `${duration}ms`, "--stagger": `${stagger}ms`, ...style } as React.CSSProperties}
      >
        <SegmentedText text={text} per={normalizedPer} segmentWrapperClassName={segmentWrapperClassName}>
          {(segment, index, wrapClassName) => (
            <span
              className={cn("character inline-block", wrapClassName, segmentClassName)}
              style={{ "--index": index } as React.CSSProperties}
            >
              {segment}
            </span>
          )}
        </SegmentedText>
      </Component>
      {debug && (
        <Button
          onClick={() => setReset((value) => value + 1)}
          className="ease absolute top-1.5 right-0 m-1 translate-y-1 font-pixel text-[11px] opacity-0 transition-[opacity,translate] duration-100 group-hover/textReveal:translate-y-0 group-hover/textReveal:opacity-100"
          size="icon-xs"
          variant="ghost"
          type="button"
        >
          {"\u23ce"}
        </Button>
      )}
    </div>
  );
}

export type MotionTextEffectProps = {
  children: string;
  per?: TextPer;
  as?: TextElement;
  variants?: { container?: Variants; item?: Variants };
  className?: string;
  preset?: TextPreset;
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  segmentWrapperClassName?: string;
  segmentClassName?: string;
  style?: React.CSSProperties;
  containerTransition?: Transition;
  segmentTransition?: Transition;
  speedReveal?: number;
  speedSegment?: number;
};

export function MotionTextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset = "fade",
  delay = 0,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  segmentClassName,
  style,
  containerTransition,
  segmentTransition,
  speedReveal = 1,
  speedSegment = 1,
}: MotionTextEffectProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = as;
  const segments = splitText(children, per);
  const itemVariants = variants?.item ?? getPresetVariants(preset);
  const containerVariants = variants?.container ?? { hidden: {}, visible: {} };
  const resolvedSegmentTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: Math.max(0.01, 0.48 / speedReveal), ease: [0.22, 1, 0.36, 1], ...segmentTransition };
  const resolvedContainerTransition = shouldReduceMotion
    ? { staggerChildren: 0 }
    : createContainerTransition({ delay, segmentCount: segments.length, speedSegment, transition: containerTransition });

  React.useEffect(() => {
    if (!trigger) return;

    onAnimationStart?.();

    const staggerSeconds = shouldReduceMotion ? 0 : Math.max(0.01, 0.04 / speedSegment) * Math.max(0, segments.length - 1);
    const durationSeconds = shouldReduceMotion ? 0 : Math.max(0.01, 0.48 / speedReveal);
    const timeout = window.setTimeout(() => onAnimationComplete?.(), (delay + staggerSeconds + durationSeconds) * 1000);

    return () => window.clearTimeout(timeout);
  }, [children, delay, onAnimationComplete, onAnimationStart, segments.length, shouldReduceMotion, speedReveal, speedSegment, trigger]);

  return (
    <Component className={cn("whitespace-pre-wrap", className)} style={style}>
      <span aria-hidden className={segmentWrapperClassName}>
        <motion.span
          className="contents"
          initial={trigger ? "hidden" : "visible"}
          animate={trigger ? "visible" : "hidden"}
          variants={containerVariants}
          transition={resolvedContainerTransition}
        >
          {renderTextSegments(children, per, (segment, index, wrapClassName) => (
            <motion.span
              className={cn("inline-block will-change-transform", wrapClassName, segmentClassName)}
              key={`${segment}-${index}`}
              variants={itemVariants}
              transition={resolvedSegmentTransition}
            >
              {segment}
            </motion.span>
          ))}
        </motion.span>
      </span>
      <span className="sr-only">{children}</span>
    </Component>
  );
}

export type MotionTextLoopProps = {
  children: React.ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
  trigger?: boolean;
  mode?: AnimatePresenceProps["mode"];
};

export function MotionTextLoop({
  children,
  className,
  interval = 2,
  transition = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 },
  variants = {
    initial: { opacity: 0, y: 10, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -10, filter: "blur(4px)" },
  },
  onIndexChange,
  trigger = true,
  mode = "popLayout",
}: MotionTextLoopProps) {
  const items = React.Children.toArray(children);
  const [index, setIndex] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!trigger || items.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, interval * 1000);

    return () => window.clearInterval(timer);
  }, [interval, items.length, onIndexChange, trigger]);

  if (items.length === 0) return null;

  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      <AnimatePresence mode={mode} initial={false}>
        <motion.span
          className="col-start-1 row-start-1 inline-block whitespace-nowrap"
          key={index}
          initial={shouldReduceMotion ? false : "initial"}
          animate="animate"
          exit={shouldReduceMotion ? undefined : "exit"}
          variants={variants}
          transition={shouldReduceMotion ? { duration: 0 } : transition}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export type MotionTextScrambleProps = {
  children: string;
  as?: TextElement;
  duration?: number;
  speed?: number;
  characterSet?: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: boolean;
  onScrambleComplete?: () => void;
};

export function MotionTextScramble({
  children,
  as = "p",
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultScrambleCharacters,
  className,
  style,
  trigger,
  onScrambleComplete,
}: MotionTextScrambleProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = as;
  const [displayText, setDisplayText] = React.useState(children);

  React.useEffect(() => {
    if (trigger === false || shouldReduceMotion) {
      setDisplayText(children);
      return;
    }

    const chars = splitText(children, "char");
    const totalFrames = Math.max(1, Math.ceil(duration / speed));
    let frame = 0;

    const timer = window.setInterval(() => {
      frame += 1;

      const progress = Math.min(1, frame / totalFrames);
      const resolvedCount = Math.floor(progress * chars.length);

      setDisplayText(
        chars
          .map((char, index) => {
            if (char.trim() === "") return char;
            if (index < resolvedCount) return char;
            return characterSet[Math.floor(Math.random() * characterSet.length)] ?? char;
          })
          .join("")
      );

      if (progress >= 1) {
        window.clearInterval(timer);
        setDisplayText(children);
        onScrambleComplete?.();
      }
    }, speed * 1000);

    return () => window.clearInterval(timer);
  }, [characterSet, children, duration, onScrambleComplete, shouldReduceMotion, speed, trigger]);

  return (
    <Component className={className} style={style}>
      <span aria-hidden>{displayText}</span>
      <span className="sr-only">{children}</span>
    </Component>
  );
}

export type MotionTextWaveProps = {
  children: string;
  as?: TextElement;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  zDistance?: number;
  xDistance?: number;
  yDistance?: number;
  spread?: number;
  scaleDistance?: number;
  rotateYDistance?: number;
  transition?: Transition;
  segmentClassName?: string;
};

export function MotionTextWave({
  children,
  as = "p",
  className,
  style,
  duration = 1,
  zDistance = 10,
  xDistance = 2,
  yDistance = -2,
  spread = 1,
  scaleDistance = 1.1,
  rotateYDistance = 10,
  transition,
  segmentClassName,
}: MotionTextWaveProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = as;
  const chars = splitText(children, "char");

  return (
    <Component className={cn("whitespace-pre-wrap", className)} style={{ perspective: 240, ...style }}>
      <span aria-hidden>
        {chars.map((char, index) => (
          <motion.span
            className={cn("inline-block transform-3d", segmentClassName)}
            key={`${char}-${index}`}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: [0.68, 1, 0.68],
                    x: [0, xDistance, 0],
                    y: [0, yDistance, 0],
                    z: [0, zDistance, 0],
                    scale: [1, scaleDistance, 1],
                    rotateY: [0, rotateYDistance, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: index * 0.045 * spread,
                    ...transition,
                  }
            }
          >
            {getReadableSegment(char)}
          </motion.span>
        ))}
      </span>
      <span className="sr-only">{children}</span>
    </Component>
  );
}

export type MotionTextMorphProps = {
  children: string;
  as?: TextElement;
  className?: string;
  style?: React.CSSProperties;
};

export function MotionTextMorph({ children, as = "p", className, style }: MotionTextMorphProps) {
  const id = React.useId();
  const shouldReduceMotion = useReducedMotion();
  const Component = as;
  const occurrenceMap = new Map<string, number>();
  const chars = splitText(children, "char");

  return (
    <LayoutGroup id={id}>
      <Component className={cn("inline-flex flex-wrap whitespace-pre-wrap", className)} style={style} aria-label={children}>
        <AnimatePresence mode="popLayout" initial={false}>
          {chars.map((char, index) => {
            const occurrence = occurrenceMap.get(char) ?? 0;
            occurrenceMap.set(char, occurrence + 1);
            const readableChar = getReadableSegment(char);

            return (
              <motion.span
                aria-hidden
                className="inline-block"
                key={`${children}-${char}-${index}`}
                layout={!shouldReduceMotion}
                layoutId={`${char}-${occurrence}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
              >
                {readableChar}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </Component>
    </LayoutGroup>
  );
}

export function TextReveal(props: MotionTextRevealProps) {
  return <MotionTextReveal {...props} />;
}

export const MotionText = {
  Reveal: MotionTextReveal,
  Effect: MotionTextEffect,
  Loop: MotionTextLoop,
  Scramble: MotionTextScramble,
  Wave: MotionTextWave,
  Morph: MotionTextMorph,
};
