"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue } from "motion/react";
import { useKeyPress } from "@/hooks/use-key-press";
import { useEffect, useRef, useState } from "react";
import { Kbd } from "@/components/ui/kbd";

export function PixelDino({ className, ...props }: React.ComponentProps<"div">) {
  const y = useMotionValue(0);
  const isAirborne = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (isPlaying) {
      svg.unpauseAnimations();
    } else {
      svg.pauseAnimations();
      animate(y, 0, { duration: 0.15 });
      isAirborne.current = false;
    }
  }, [isPlaying, y]);

  const jump = () => {
    if (!isPlaying || isAirborne.current) return;
    isAirborne.current = true;
    setIsPressed(true);
    animate(y, [0, -16, 0], {
      duration: 0.3,
      ease: ["linear", "linear"],
      times: [0, 0.5, 1],
      onComplete: () => {
        isAirborne.current = false;
        setIsPressed(false);
      },
    });
  };

  useKeyPress(" ", jump, { enabled: isPlaying });

  return (
    <div className={cn("relative grid-stack size-[150px] bg-card sm:size-50", className)} {...props}>
      <svg
        ref={svgRef}
        viewBox="0 0 50 50"
        onPointerDown={jump}
        role={isPlaying ? "button" : undefined}
        aria-label={isPlaying ? "Jump" : undefined}
        className={cn("absolute inset-0 size-full touch-manipulation select-none")}
      >
        <g id="dino-bg">
          <rect x="0" y="33" width="200" height="27.5" fill="var(--background)" />
          <line y1="32.5" x2="200" y2="32.5" stroke="var(--muted-foreground)" strokeDasharray="1 5">
            <animate
              attributeName="stroke-dashoffset"
              values="0;200"
              dur="5s"
              calcMode="linear"
              repeatDur="indefinite"
              repeatCount="infinite"
            />
          </line>

          <line y1="33.5" x2="200" y2="33.5" stroke="var(--muted-foreground)" strokeDashoffset="1" strokeDasharray="2 2">
            <animate
              attributeName="stroke-dashoffset"
              values="2;205"
              dur="5s"
              calcMode="linear"
              repeatDur="indefinite"
              repeatCount="infinite"
            />
          </line>
        </g>
        <motion.g style={{ y }} id="dino-body" className="-translate-x-2">
          <path
            d="M32 16H33V23H32V25H29V29H27V31H26V32H25V33H24V35H25V38H21V35H20V38H16V34H15V33H14V32H13V31H12V30H11V22H14V24H15V25H17V24H18V23H20V22H21V16H22V15H32V16Z"
            fill="var(--background)"
          />
          <path
            d="M31 17H32V22H27V23H31V24H26V26H28V28H27V27H26V30H25V31H24V32H23V33H16V32H15V31H14V30H13V29H12V23H13V25H14V26H18V25H19V24H21V23H22V17H23V16H31V17Z"
            fill="var(--primary)"
          />
          <path d="M19 35H18V36H19V37H17V33H20V34H19V35Z" fill="var(--primary)" transform="translate(0 0)">
            <animateTransform
              id="dino-back-leg"
              attributeName="transform"
              type="translate"
              from="0 0"
              to="0 -2"
              dur=".25s"
              calcMode="discrete"
              repeatCount="indefinite"
            />
          </path>
          <path d="M24 37H22V34H21V33H23V36H24V37Z" fill="var(--primary)">
            <animateTransform
              id="dino-front-leg"
              attributeName="transform"
              type="translate"
              from="0 0"
              to="0 -2"
              dur=".25s"
              begin="dino-back-leg.begin + .125s"
              calcMode="discrete"
              repeatCount="indefinite"
            />
          </path>
          <rect x="24" y="18" width="1" height="1" fill="var(--secondary)" id="dino-eye" />
        </motion.g>
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-1 text-center">
        {isPlaying ? (
          <Kbd
            variant="elevated"
            className="font-pixel text-[11px] tracking-widest uppercase transition-none duration-0"
            pressed={isPressed}
          >
            Space
          </Kbd>
        ) : (
          <p className={cn("font-pixel text-[11px] text-muted-foreground")}>You know what to do...</p>
        )}
      </div>

      <Button
        size="xs"
        variant="ghost"
        onClick={() => {
          if (isPlaying) {
            setIsPressed(false);
          }
          setIsPlaying((p) => !p);
        }}
        aria-pressed={isPlaying}
        data-pressed={isPlaying}
        className="absolute inset-e-1 top-1 z-1 font-pixel text-[11px]"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <>
            <span aria-hidden="true" className="relative top-[.5px] -mx-1 rotate-90 text-[16.5px]">
              =
            </span>
            Pause
          </>
        ) : (
          <>
            <span aria-hidden="true">►</span>
            <span aria-hidden="true">Play</span>
          </>
        )}
      </Button>
    </div>
  );
}
