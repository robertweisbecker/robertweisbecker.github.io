"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";

const COLOR_CHART_LINE_PATH =
  "M1 136L50.463 122.769L99.927 102.132L149.382 77.621L198.846 47.444L248.309 24L297.772 27.874L347.228 40.706L396.691 56.232L446.154 66.966L495.618 87.913L545.073 106.02L594.537 116.271L644 123.465";
const COLOR_CHART_AREA_PATH = `${COLOR_CHART_LINE_PATH}L644 188H1V136Z`;

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
      className="relative flex aspect-video w-full min-w-0 flex-col items-end rounded bg-card bg-dotted bg-cover outline -outline-offset-1 outline-(--separator-color) [--separator-color:var(--info-primary)]/10 md:aspect-3/1"
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
        className="absolute top-5 right-full w-fit min-w-[calc(4ch+1.5rem)] rounded-full bg-info-primary px-3 py-1 text-center font-pixel text-[16.5px] text-white transition-[left] duration-100 ease-linear"
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
        <motion.path fill="url(#paint0_linear_540_31)" d={COLOR_CHART_AREA_PATH}></motion.path>
        <path stroke="var(--info-primary)" strokeWidth="2" d={COLOR_CHART_LINE_PATH}></path>
        <defs>
          <linearGradient id="paint0_linear_540_31" x1="322.5" x2="322.5" y1="1" y2="188" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--info-primary)" stopOpacity=".4"></stop>
            <stop offset="1" stopColor="var(--info)" stopOpacity=".1"></stop>
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
