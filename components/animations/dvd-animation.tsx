"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PixelPauseOutlineIcon, PixelPlayOutlineIcon } from "@/components/icons-pixel";
import { Kbd } from "@/components/ui/kbd";

const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 1000;

const LOGO_VIEW_BOX_WIDTH = 200;
const LOGO_VIEW_BOX_HEIGHT = 100;

const DEFAULT_LOGO_SCALE = 0.2;
const DEFAULT_LOGO_ASPECT_RATIO = LOGO_VIEW_BOX_WIDTH / LOGO_VIEW_BOX_HEIGHT;

const DEFAULT_DURATION = 90;
const DEFAULT_LOGO_COLORS = ["#0ff", "#ff0", "#0ff", "#f0f", "#0f0"];
const DEFAULT_MINI_BALLOON_COLORS = ["#fafafa", "#e4e4e7", "#d4d4d8", "#a1a1aa"];

// These preserve the original DVD-style motion relationship:
// x repeats 10 times and y repeats 9 times before the full pattern returns.
const HORIZONTAL_CYCLES_PER_PATTERN = 10;
const VERTICAL_CYCLES_PER_PATTERN = 9;

const LOGO_PATH =
  "M99.084 65.39C107.131 65.3494 115.178 65.4619 123.221 65.7289C135.107 66.0372 146.976 66.8155 158.801 68.0599C166.627 68.9178 174.742 70.0746 182.427 71.8705C186.145 72.8312 191.801 74.1564 194.74 76.7533C199.777 81.2027 187.68 84.602 185.161 85.2621C175.228 87.8639 164.92 89.2448 154.729 90.2123C140.328 91.5226 125.88 92.2735 111.421 92.4633C105.321 92.4562 99.2487 92.6145 93.0947 92.5638C77.3484 92.4437 61.6121 91.7219 45.9209 90.3998C34.8937 89.3923 24.5013 88.2255 13.7764 85.4398C-3.47047 80.9608 0.797708 75.5109 14.9815 72.1088C23.759 70.0036 32.6176 68.8092 41.6201 67.9125C56.8273 66.3073 71.9042 65.776 87.1748 65.4467C91.0561 65.3379 95.1933 65.3884 99.084 65.39ZM103.859 75.0424C100.655 74.9586 96.9895 74.7924 93.627 74.9877C88.5458 75.2298 83.1945 75.6098 78.3037 77.0238C76.925 77.4221 75.1479 78.0685 75.0899 79.4388C75.0752 79.7887 75.6227 80.3995 75.9453 80.5707C82.4347 83.8689 95.5224 83.8368 102.513 83.64C105.745 83.488 118.444 82.7677 120.394 80.0433C123.134 76.215 105.81 75.0934 103.859 75.0424ZM176.645 7.27576C182.545 7.27541 188.094 7.11151 193.286 10.434C197.745 13.2871 198.659 18.5996 195.621 22.8617C192.448 27.315 187.027 28.8894 181.935 29.807C185.474 30.5859 189.038 31.307 191.736 33.9183C195.958 38.005 194.19 44.1791 190.398 47.8715C185.552 52.5901 178.394 54.201 171.852 54.6303C169.608 54.7774 167.141 54.6899 164.904 54.6888L155.752 54.6879L133.376 54.6859C133.958 52.3607 134.842 49.7755 135.495 47.4008C137.903 38.6314 140.794 29.8306 143.139 21.0678C148.651 20.9819 154.603 21.0081 160.119 21.0707C159.651 22.8216 159.029 24.7674 158.506 26.5189L165.73 26.5365C170.116 26.5444 175.464 26.9165 178.975 23.764C181.623 21.4487 180.736 18.0769 177.361 17.1361C172.954 15.9076 167.261 16.3407 162.675 16.3402L140.07 16.3441L135.339 16.3539C137.852 20.6701 138.891 24.7998 138.325 29.8099C137.491 37.1954 133.531 44.0429 127.675 48.6215C117.818 56.3286 103.664 58.3543 91.5283 57.0551C84.4247 56.2945 76.279 53.5714 71.7354 47.7963C68.5834 43.7899 67.474 38.7852 68.0889 33.7797C68.9683 26.6198 72.6061 20.7683 78.2139 16.3412C75.5775 16.33 72.941 16.3346 70.3047 16.3549C70.4162 16.7639 70.5076 17.1781 70.5781 17.5961C72.0154 25.981 61.714 29.322 55.2988 30.4037C60.855 31.4221 67.812 33.912 67.7451 40.6439C67.7467 49.2918 56.7614 52.9422 49.7559 54.1137C44.1208 55.0559 37.5534 54.7629 31.7393 54.765L6.7217 54.7513L12.7373 34.0023C13.9707 29.7268 15.3234 25.3374 16.4678 21.0521L33.7735 21.0707C33.3825 22.6484 32.621 24.9204 32.1319 26.5238L39.2403 26.5336C43.5001 26.536 49.3989 26.8222 52.6045 23.6742C56.0937 20.2475 52.7955 17.1379 48.9326 16.6732C44.9797 16.1978 41.2964 16.3595 37.3926 16.3588L17.7686 16.3617C18.5517 13.358 19.5079 10.2792 20.3721 7.2826L130.76 7.28162L165.651 7.27869L176.645 7.27576ZM117.052 20.0316C114.224 17.6659 109.447 16.5295 105.766 16.891C99.9329 17.3887 95.194 19.3209 91.2783 23.8314C86.6961 29.11 84.983 38.7161 90.8906 43.6937C94.0191 46.3297 98.4921 47.0101 102.479 46.7806C107.877 46.3751 112.707 44.318 116.313 40.1664C120.947 34.8285 123.175 25.1542 117.052 20.0316ZM174.1 35.2357C170.799 34.2318 167.175 34.4941 163.759 34.4974L156.112 34.5101C154.975 38.2395 153.885 42.1111 152.715 45.8099L161.242 45.8207C165.07 45.8243 169.799 46.1364 173.335 44.7035C175.191 43.8428 176.857 42.8491 177.625 40.8549C178.727 37.9892 176.659 36.0144 174.1 35.2357ZM47.8535 35.2914C44.3631 34.2274 41.1481 34.4962 37.5528 34.4994L29.7266 34.5101C28.5525 38.262 27.4771 42.0455 26.3242 45.8041L35.0313 45.8197C39.0497 45.825 43.0126 46.1155 46.836 44.723C47.8218 44.2633 48.6019 43.8947 49.4444 43.184C52.6797 40.4541 52.0293 36.5647 47.8535 35.2914Z";

type AnimationTiming = {
  xDuration: number;
  yDuration: number;
  cornerInterval: number;
};

type LogoSize = {
  logoWidth: number;
  logoHeight: number;
};

type MiniBalloon = {
  id: number;
  x: number;
  y: number;
  travelX: number;
  travelY: number;
  rotate: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
};

function getAnimationTiming(duration: number): AnimationTiming {
  return {
    xDuration: duration / HORIZONTAL_CYCLES_PER_PATTERN,
    yDuration: duration / VERTICAL_CYCLES_PER_PATTERN,
    cornerInterval: duration / 2,
  };
}

function getLogoSize({
  width,
  height,
  logoWidth,
  logoHeight,
  logoScale,
  logoAspectRatio,
}: {
  width: number;
  height: number;
  logoWidth?: number;
  logoHeight?: number;
  logoScale: number;
  logoAspectRatio: number;
}): LogoSize {
  if (logoWidth !== undefined && logoHeight !== undefined) {
    return { logoWidth, logoHeight };
  }

  if (logoWidth !== undefined) {
    return {
      logoWidth,
      logoHeight: logoWidth / logoAspectRatio,
    };
  }

  if (logoHeight !== undefined) {
    return {
      logoWidth: logoHeight * logoAspectRatio,
      logoHeight,
    };
  }

  const scaledLogoWidth = Math.min(width, height) * logoScale;

  return {
    logoWidth: scaledLogoWidth,
    logoHeight: scaledLogoWidth / logoAspectRatio,
  };
}

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getColor(colors: string[], index: number) {
  return colors[index % colors.length];
}

function getLoopPosition(elapsed: number, cycleDuration: number, maxPosition: number) {
  const progress = (elapsed % cycleDuration) / cycleDuration;

  if (progress <= 0.5) {
    return progress * 2 * maxPosition;
  }

  return (1 - progress) * 2 * maxPosition;
}

function getLastEventTime(elapsed: number, firstEvent: number, interval: number) {
  if (elapsed < firstEvent) return Number.NEGATIVE_INFINITY;

  return firstEvent + Math.floor((elapsed - firstEvent) / interval) * interval;
}

function getCurrentLogoColor(elapsed: number, xDuration: number, yDuration: number, colors: string[]) {
  const colorEvents = [
    { color: getColor(colors, 1), time: getLastEventTime(elapsed, xDuration, xDuration) },
    { color: getColor(colors, 2), time: getLastEventTime(elapsed, yDuration, yDuration) },
    { color: getColor(colors, 3), time: getLastEventTime(elapsed, xDuration / 2, xDuration) },
    { color: getColor(colors, 4), time: getLastEventTime(elapsed, yDuration / 2, yDuration) },
  ];

  const latestEvent = colorEvents.reduce((latest, event) => (event.time >= latest.time ? event : latest));

  return latestEvent.time === Number.NEGATIVE_INFINITY ? getColor(colors, 0) : latestEvent.color;
}

type DvdAnimationContextValue = {
  colors: string[];
  cornerHits: number;
  height: number;
  isPlaying: boolean;
  logoHeight: number;
  logoRef: React.RefObject<SVGSVGElement | null>;
  logoWidth: number;
  setIsPlaying: (isPlaying: boolean) => void;
  width: number;
};

const DvdAnimationContext = React.createContext<DvdAnimationContextValue | null>(null);

function useDvdAnimationContext(componentName: string) {
  const context = React.useContext(DvdAnimationContext);

  if (!context) {
    throw new Error(`${componentName} must be used inside <DvdAnimationRoot />.`);
  }

  return context;
}

export type DvdAnimationRootProps = React.ComponentProps<"div"> & {
  duration?: number;
  colors?: string[];
  width?: number;
  height?: number;
  logoWidth?: number;
  logoHeight?: number;
  logoScale?: number;
  logoAspectRatio?: number;
  defaultPlaying?: boolean;
  onCornerHit?: (cornerHits: number) => void;
};

export function DvdAnimationRoot({
  duration = DEFAULT_DURATION,
  colors = DEFAULT_LOGO_COLORS,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  logoWidth,
  logoHeight,
  logoScale = DEFAULT_LOGO_SCALE,
  logoAspectRatio = DEFAULT_LOGO_ASPECT_RATIO,
  defaultPlaying = true,
  onCornerHit,
  className,
  children,
  ...props
}: DvdAnimationRootProps) {
  const logoRef = React.useRef<SVGSVGElement | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);
  const elapsedRef = React.useRef(0);
  const previousTimeRef = React.useRef<number | null>(null);
  const lastCornerHitIndexRef = React.useRef(0);
  const [cornerHits, setCornerHits] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(defaultPlaying);

  const { xDuration, yDuration, cornerInterval } = React.useMemo(() => getAnimationTiming(duration), [duration]);

  const resolvedLogoSize = React.useMemo(
    () =>
      getLogoSize({
        width,
        height,
        logoWidth,
        logoHeight,
        logoScale,
        logoAspectRatio,
      }),
    [height, logoAspectRatio, logoHeight, logoScale, logoWidth, width],
  );

  const xMax = Math.max(0, width - resolvedLogoSize.logoWidth);
  const yMax = Math.max(0, height - resolvedLogoSize.logoHeight);

  const animationKey = React.useMemo(
    () =>
      `duration-${duration}-width-${width}-height-${height}-logo-${resolvedLogoSize.logoWidth}x${resolvedLogoSize.logoHeight}-colors-${colors.join("|")}`,
    [colors, duration, height, resolvedLogoSize.logoHeight, resolvedLogoSize.logoWidth, width],
  );

  const handleCornerHit = React.useCallback(() => {
    setCornerHits((currentCornerHits) => {
      const nextCornerHits = currentCornerHits + 1;
      onCornerHit?.(nextCornerHits);
      return nextCornerHits;
    });
  }, [onCornerHit]);

  React.useEffect(() => {
    elapsedRef.current = 0;
    previousTimeRef.current = null;
    lastCornerHitIndexRef.current = 0;

    const logo = logoRef.current;

    if (logo) {
      logo.setAttribute("x", "0");
      logo.setAttribute("y", "0");
      logo.setAttribute("fill", getColor(colors, 0));
    }
  }, [animationKey, colors]);

  React.useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      previousTimeRef.current = null;
      return;
    }

    function animate(currentTime: number) {
      const previousTime = previousTimeRef.current;
      const delta = previousTime === null ? 0 : (currentTime - previousTime) / 1000;

      previousTimeRef.current = currentTime;
      elapsedRef.current += delta;

      const elapsed = elapsedRef.current;
      const logo = logoRef.current;

      if (logo) {
        logo.setAttribute("x", String(getLoopPosition(elapsed, xDuration, xMax)));
        logo.setAttribute("y", String(getLoopPosition(elapsed, yDuration, yMax)));
        logo.setAttribute("fill", getCurrentLogoColor(elapsed, xDuration, yDuration, colors));
      }

      const cornerHitIndex = Math.floor(elapsed / cornerInterval);

      if (cornerHitIndex > lastCornerHitIndexRef.current) {
        lastCornerHitIndexRef.current = cornerHitIndex;
        handleCornerHit();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [colors, cornerInterval, handleCornerHit, isPlaying, xDuration, xMax, yDuration, yMax]);

  const contextValue = React.useMemo<DvdAnimationContextValue>(
    () => ({
      colors,
      cornerHits,
      height,
      isPlaying,
      logoHeight: resolvedLogoSize.logoHeight,
      logoRef,
      logoWidth: resolvedLogoSize.logoWidth,
      setIsPlaying,
      width,
    }),
    [colors, cornerHits, height, isPlaying, resolvedLogoSize.logoHeight, resolvedLogoSize.logoWidth, width],
  );

  return (
    <DvdAnimationContext.Provider value={contextValue}>
      <div className={cn("relative aspect-square w-full overflow-hidden rounded-2xl", className)} {...props}>
        <DvdAnimationStyles />
        {children}
      </div>
    </DvdAnimationContext.Provider>
  );
}

export type DvdAnimationStageProps = React.SVGProps<SVGSVGElement> & {
  backgroundColor?: string;
};

export function DvdAnimationStage({ backgroundColor = "#222", className, ...props }: DvdAnimationStageProps) {
  const { colors, height, logoHeight, logoRef, logoWidth, width } = useDvdAnimationContext("DvdAnimationStage");

  return (
    <svg
      className={cn("block h-full w-full", className)}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Bouncing logo animation"
      {...props}
    >
      <rect width="100%" height="100%" fill={backgroundColor} rx="10" />

      <svg
        ref={logoRef}
        x="0"
        y="0"
        width={logoWidth}
        height={logoHeight}
        viewBox={`0 0 ${LOGO_VIEW_BOX_WIDTH} ${LOGO_VIEW_BOX_HEIGHT}`}
        fill={getColor(colors, 0)}
      >
        <path fill="inherit" d={LOGO_PATH} />
      </svg>
    </svg>
  );
}

export type DvdAnimationControlsProps = React.ComponentProps<"div">;

export function DvdAnimationControls({ className, ...props }: DvdAnimationControlsProps) {
  return (
    <div className={cn("absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2", className)} {...props} />
  );
}

export type DvdAnimationScoreProps = React.ComponentProps<"div"> & {
  label?: string;
  showLabel?: boolean;
  showPop?: boolean;
  showBurst?: boolean;
  burstColors?: string[];
};

export function DvdAnimationScore({
  label = "Corners",
  showLabel = true,
  showPop = true,
  showBurst = true,
  burstColors = DEFAULT_MINI_BALLOON_COLORS,
  className,
  ...props
}: DvdAnimationScoreProps) {
  const { cornerHits } = useDvdAnimationContext("DvdAnimationScore");
  const scoreRef = React.useRef<HTMLDivElement | null>(null);
  const previousCornerHitsRef = React.useRef(cornerHits);
  const [miniBalloons, setMiniBalloons] = React.useState<MiniBalloon[]>([]);
  const [isPulsing, setIsPulsing] = React.useState(false);
  const [scorePopKey, setScorePopKey] = React.useState(0);

  const createMiniBalloonBurst = React.useCallback(() => {
    const scoreBox = scoreRef.current?.getBoundingClientRect();

    if (!scoreBox || scoreBox.width === 0 || scoreBox.height === 0) return;

    const originX = scoreBox.left + scoreBox.width / 2;
    const originY = scoreBox.top + scoreBox.height / 2;

    const newBalloons = Array.from({ length: 16 }, (_, index) => ({
      id: Date.now() + index,
      x: originX,
      y: originY,
      travelX: getRandomNumber(-120, 120),
      travelY: getRandomNumber(80, 180),
      rotate: getRandomNumber(-24, 24),
      size: getRandomNumber(8, 13),
      delay: getRandomNumber(0, 100),
      duration: getRandomNumber(800, 1200),
      color: burstColors[index % burstColors.length],
    }));

    setMiniBalloons((currentBalloons) => [...currentBalloons, ...newBalloons]);

    window.setTimeout(() => {
      const newBalloonIds = new Set(newBalloons.map((balloon) => balloon.id));
      setMiniBalloons((currentBalloons) => currentBalloons.filter((balloon) => !newBalloonIds.has(balloon.id)));
    }, 1600);
  }, [burstColors]);

  React.useEffect(() => {
    if (cornerHits <= previousCornerHitsRef.current) {
      previousCornerHitsRef.current = cornerHits;
      return;
    }

    previousCornerHitsRef.current = cornerHits;
    setScorePopKey((currentKey) => currentKey + 1);
    setIsPulsing(true);

    const timeout = window.setTimeout(() => {
      setIsPulsing(false);
    }, 650);

    if (showBurst) {
      createMiniBalloonBurst();
    }

    return () => window.clearTimeout(timeout);
  }, [cornerHits, createMiniBalloonBurst, showBurst]);

  return (
    <>
      <div ref={scoreRef} className={cn("relative flex flex-col items-center gap-1 text-center", className)} {...props}>
        {showLabel ? (
          <span className="font-pixel text-[11px] uppercase tracking-widest text-white/55">{label}</span>
        ) : null}
        <Kbd
          variant="elevated"
          pressed={isPulsing}
          className="font-pixel text-[11px] tracking-widest uppercase transition-none duration-0 tabular-nums"
        >
          {cornerHits}
        </Kbd>
        {showPop && isPulsing ? (
          <span
            key={scorePopKey}
            className="dvd-score-pop pointer-events-none absolute left-1/2 top-[-8px] font-pixel text-[11px] text-white"
          >
            +1!
          </span>
        ) : null}
      </div>

      <div className="pointer-events-none fixed inset-0 z-[9999]">
        {miniBalloons.map((balloon) => (
          <span
            key={balloon.id}
            className="dvd-mini-balloon pointer-events-none fixed"
            style={
              {
                left: `${balloon.x}px`,
                top: `${balloon.y}px`,
                width: `${balloon.size}px`,
                height: `${balloon.size * 1.25}px`,
                "--travel-x": `${balloon.travelX}px`,
                "--travel-y": `${balloon.travelY}px`,
                "--rotate": `${balloon.rotate}deg`,
                "--duration": `${balloon.duration}ms`,
                "--delay": `${balloon.delay}ms`,
                "--color": balloon.color,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}

export type DvdAnimationPlayButtonProps = React.ComponentProps<typeof Button>;

export function DvdAnimationPlayButton({
  className,
  onClick,
  children,
  size = "xs",
  variant = "ghost",
  ...props
}: DvdAnimationPlayButtonProps) {
  const { isPlaying, setIsPlaying } = useDvdAnimationContext("DvdAnimationPlayButton");

  return (
    <Button
      size={size}
      variant={variant}
      aria-label={isPlaying ? "Pause animation" : "Play animation"}
      aria-pressed={isPlaying}
      data-pressed={isPlaying}
      className={cn("font-pixel text-[11px] text-white hover:bg-white/10 hover:text-white", className)}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setIsPlaying(!isPlaying);
        }
      }}
      {...props}
    >
      {children ??
        (isPlaying ? (
          <>
            <PixelPauseOutlineIcon aria-hidden="true" />
            <span aria-hidden="true">Pause</span>
          </>
        ) : (
          <>
            <PixelPlayOutlineIcon aria-hidden="true" />
            <span aria-hidden="true">Play</span>
          </>
        ))}
    </Button>
  );
}

function DvdAnimationStyles() {
  return (
    <style>{`
      @keyframes dvd-score-pop {
        0% { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.65); }
        20% { opacity: 1; transform: translateX(-50%) translateY(-2px) scale(1.08); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-26px) scale(1); }
      }

      @keyframes dvd-mini-balloon-float {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(0.45) rotate(0deg);
        }
        12% { opacity: 1; }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) translate3d(var(--travel-x), calc(var(--travel-y) * -1), 0) scale(1) rotate(var(--rotate));
        }
      }

      .dvd-score-pop {
        animation: dvd-score-pop 700ms cubic-bezier(.16, 1, .3, 1) forwards;
        text-shadow: 0 2px 8px rgba(0, 0, 0, .65);
      }

      .dvd-mini-balloon {
        animation: dvd-mini-balloon-float var(--duration) cubic-bezier(.16, 1, .3, 1) var(--delay) forwards;
        background: radial-gradient(circle at 35% 28%, rgba(255,255,255,.92) 0 10%, var(--color) 11% 100%);
        border-radius: 999px 999px 900px 900px;
        box-shadow: inset -2px -4px 4px rgba(0,0,0,.2), 0 4px 12px rgba(0,0,0,.28);
      }

      .dvd-mini-balloon::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -4px;
        width: 0;
        height: 0;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-top: 5px solid var(--color);
        transform: translateX(-50%);
      }
    `}</style>
  );
}

export function DvdAnimationDemo({ className }: { className?: string }) {
  return (
    <DvdAnimationRoot duration={60} width={640} height={640} className={cn("w-full", className)}>
      <DvdAnimationStage backgroundColor="#000" />
      <DvdAnimationControls>
        <DvdAnimationScore />
        <DvdAnimationPlayButton />
      </DvdAnimationControls>
    </DvdAnimationRoot>
  );
}
