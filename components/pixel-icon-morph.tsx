"use client";

import { type MorphablePixelIconName, type PixelIconPoint, morphablePixelIconNames, pixelIconData } from "@/components/icons-pixel";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Transition } from "motion/react";
import * as React from "react";

export type PixelIconMorphStrategy = "nearest" | "reading" | "radial" | "scatter" | "compress";
export type PixelIconMorphAnimation = "linear" | "ease" | "spring";

export type PixelIconMorphProps = Omit<React.ComponentProps<typeof motion.svg>, "children"> & {
  from: MorphablePixelIconName;
  to: MorphablePixelIconName;
  active?: boolean;
  strategy?: PixelIconMorphStrategy;
  animation?: PixelIconMorphAnimation;
  duration?: number;
  stagger?: number;
};

type IndexedPoint = PixelIconPoint & {
  index: number;
};

type MorphPair = {
  from: IndexedPoint;
  to: IndexedPoint;
};

const ICON_SIZE = 11;
const EXPECTED_POINT_COUNT = 28;

function pointDistance(a: PixelIconPoint, b: PixelIconPoint) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getCentroid(points: PixelIconPoint[]) {
  const total = points.reduce(
    (acc, point) => ({
      x: acc.x + point.x + point.width / 2,
      y: acc.y + point.y + point.height / 2,
    }),
    { x: 0, y: 0 }
  );

  return {
    x: total.x / points.length,
    y: total.y / points.length,
  };
}

function withIndex(points: PixelIconPoint[]): IndexedPoint[] {
  return points.map((point, index) => ({ ...point, index }));
}

function byReadingOrder(a: IndexedPoint, b: IndexedPoint) {
  return a.y - b.y || a.x - b.x || a.index - b.index;
}

function byRadialOrder(points: IndexedPoint[]) {
  const center = getCentroid(points);

  return [...points].sort((a, b) => {
    const angleA = Math.atan2(a.y - center.y, a.x - center.x);
    const angleB = Math.atan2(b.y - center.y, b.x - center.x);
    const radiusA = Math.hypot(a.x - center.x, a.y - center.y);
    const radiusB = Math.hypot(b.x - center.x, b.y - center.y);

    return angleA - angleB || radiusA - radiusB || a.index - b.index;
  });
}

export function getPixelIconMorphPairs(
  from: MorphablePixelIconName,
  to: MorphablePixelIconName,
  strategy: PixelIconMorphStrategy = "nearest"
): MorphPair[] {
  const fromPoints = withIndex(pixelIconData[from].points);
  const toPoints = withIndex(pixelIconData[to].points);

  if (fromPoints.length !== EXPECTED_POINT_COUNT || toPoints.length !== EXPECTED_POINT_COUNT) {
    return [];
  }

  if (strategy === "reading") {
    const source = [...fromPoints].sort(byReadingOrder);
    const target = [...toPoints].sort(byReadingOrder);

    return source.map((point, index) => ({ from: point, to: target[index] }));
  }

  if (strategy === "radial") {
    const source = byRadialOrder(fromPoints);
    const target = byRadialOrder(toPoints);

    return source.map((point, index) => ({ from: point, to: target[index] }));
  }

  const availableTargets = [...toPoints];

  return fromPoints.map((source) => {
    let targetIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let index = 0; index < availableTargets.length; index += 1) {
      const target = availableTargets[index];
      const distance = pointDistance(source, target);

      if (distance < bestDistance || (distance === bestDistance && target.index < availableTargets[targetIndex].index)) {
        targetIndex = index;
        bestDistance = distance;
      }
    }

    const [target] = availableTargets.splice(targetIndex, 1);
    return { from: source, to: target };
  });
}

function getScatterPoint(point: PixelIconPoint) {
  const center = { x: ICON_SIZE / 2, y: ICON_SIZE / 2 };
  const vector = {
    x: point.x - center.x,
    y: point.y - center.y,
  };

  return {
    x: Math.round(center.x + vector.x * 1.35),
    y: Math.round(center.y + vector.y * 1.35),
  };
}

function getCompressPoint() {
  const center = Math.floor(ICON_SIZE / 2);

  return {
    x: center,
    y: center,
  };
}

function getAnimateTarget(
  pair: MorphPair,
  active: boolean,
  strategy: PixelIconMorphStrategy,
  animation: PixelIconMorphAnimation,
  reduceMotion: boolean
) {
  const start = active ? pair.from : pair.to;
  const end = active ? pair.to : pair.from;

  if (reduceMotion || !active) {
    return {
      x: end.x,
      y: end.y,
      opacity: end.opacity,
    };
  }

  if (strategy !== "scatter" && strategy !== "compress") {
    if (animation === "spring") {
      return {
        x: end.x,
        y: end.y,
        opacity: end.opacity,
      };
    }

    return {
      x: [start.x, end.x],
      y: [start.y, end.y],
      opacity: [start.opacity, end.opacity],
    };
  }

  const midpoint = strategy === "scatter" ? getScatterPoint(start) : getCompressPoint();

  return {
    x: [start.x, midpoint.x, end.x],
    y: [start.y, midpoint.y, end.y],
    opacity: [start.opacity, 0.72, end.opacity],
  };
}

function hasMidpointStrategy(strategy: PixelIconMorphStrategy) {
  return strategy === "scatter" || strategy === "compress";
}

function getTransition(
  animation: PixelIconMorphAnimation,
  strategy: PixelIconMorphStrategy,
  duration: number,
  delay: number,
  reduceMotion: boolean
): Transition {
  if (reduceMotion) {
    return { duration: 0 };
  }

  if (animation === "spring" && !hasMidpointStrategy(strategy)) {
    return {
      type: "spring",
      stiffness: 520,
      damping: 36,
      mass: 0.65,
      delay,
    };
  }

  return {
    duration,
    ease: animation === "linear" ? "linear" : [0.2, 0.8, 0.2, 1],
    delay,
  };
}

export function PixelIconMorph({
  from,
  to,
  active = false,
  strategy = "nearest",
  animation = "linear",
  duration = 0.2,
  stagger = 0.002,
  className,
  style,
  "aria-hidden": ariaHidden = true,
  ...props
}: PixelIconMorphProps) {
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = reduceMotion === true;
  const pairs = React.useMemo(() => getPixelIconMorphPairs(from, to, strategy), [from, to, strategy]);

  if (!morphablePixelIconNames.includes(from) || !morphablePixelIconNames.includes(to) || pairs.length !== EXPECTED_POINT_COUNT) {
    return null;
  }

  return (
    <motion.svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`}
      fill="currentColor"
      className={cn("block overflow-visible", className)}
      style={{ imageRendering: "pixelated", ...style }}
      aria-hidden={ariaHidden}
      {...props}
    >
      {pairs.map((pair, index) => (
        <motion.rect
          key={`${pair.from.index}-${pair.to.index}`}
          width={1}
          height={1}
          fill="currentColor"
          initial={false}
          animate={getAnimateTarget(pair, active, strategy, animation, shouldReduceMotion)}
          transition={getTransition(animation, strategy, duration, shouldReduceMotion ? 0 : index * stagger, shouldReduceMotion)}
        />
      ))}
    </motion.svg>
  );
}
