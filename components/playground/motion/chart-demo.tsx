"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";

export function ChartDemo() {
  const SPRING = {
    damping: 18,
  };

  const SLOW_SPRING = {
    damping: 40,
  };
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = React.useState(false);

  const clipPathSpring = useSpring(0, isHovering ? SPRING : SLOW_SPRING);
  const clipPath = useMotionTemplate`inset(0px ${clipPathSpring}% 0px 0px)`;

  const clipPathValue = useMotionValue(0);
  const clipPathDisplay = useTransform(clipPathValue, (v: number) => `${100 - Math.round(v)}%`);
  const displayPosition = useMotionTemplate`clamp(5%, calc(100% - ${clipPathSpring}%), calc(95% - 4ch))`;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement> | React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const distanceFromRight = Math.max(rect.right - e.clientX, 0);
    const percentageFromRight = Math.min((distanceFromRight / rect.width) * 100, 100);
    clipPathValue.set(percentageFromRight);
    clipPathSpring.set(percentageFromRight);
  }

  return (
    <div
      className="relative flex aspect-video w-full min-w-0 flex-col items-end rounded outline -outline-offset-1 outline-border"
      onPointerMove={onPointerMove}
      onPointerEnter={() => {
        setIsHovering(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }}
      onPointerLeave={() => {
        setIsHovering(false);
        timeoutRef.current = setTimeout(() => {
          clipPathSpring.set(0);
          clipPathValue.set(0);
        }, 100);
      }}
    >
      <motion.div
        className="absolute top-5 right-full text-center font-pixel text-xs text-muted-foreground transition-[left] duration-100 ease-linear"
        style={{ left: displayPosition }}
        onPointerMove={onPointerMove}
      >
        {clipPathDisplay}
      </motion.div>

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 644 188"
        style={{ clipPath }}
        className="mt-auto w-full"
        onPointerMove={onPointerMove}
      >
        <path
          stroke="var(--success-primary)"
          strokeWidth="2"
          d="M1 118.5s82.308-15.501 113.735-29 74.769-1.713 121.217-12c37.596-8.328 58.517-15.006 93.781-30.5 80.146-35.215 123.213-16 154.141-24.5S635.97.849 644 1.5"
        ></path>
        <motion.path
          fill="url(#paint0_linear_540_31)"
          d="M113.912 89.012C82.437 102.511 1 118.01 1 118.01V188h643V1.023c-8.043-.65-129.399 12.499-160.375 20.998-30.976 8.498-74.11-10.714-154.38 24.496-35.319 15.493-56.272 22.17-93.927 30.497-46.52 10.286-89.93-1.5-121.406 11.998"
        ></motion.path>
        <defs>
          <linearGradient id="paint0_linear_540_31" x1="322.5" x2="322.5" y1="1" y2="188" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--success-primary)" stopOpacity="0.4"></stop>
            <stop offset="1" stopColor="var(--success)" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
