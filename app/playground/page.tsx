"use client";
import { TreeIconFile } from "@/components/icons-tree";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { ColorSwatchGroup } from "@/components/color-swatch-group";
import { MotionText, TextReveal } from "@/components/animation/shared";
import { PixelDino } from "@/components/animation/pixel-dino";
import { CodeBlock } from "@/components/code-block";
import { DemoContainer } from "@/components/demo";
import { DeviceFrame } from "@/components/device-frame";
import { Favicon, GithubIcon, VercelIcon } from "@/components/icons";
import * as PixelIcons from "@/components/icons-pixel";
import { ImageToggle } from "@/components/image-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { ChromeTabs } from "@/components/chrome-tabs";
import { EmojiFeedbackDemo } from "@/components/demos/emoji-feedback";
import { CardFan } from "@/components/demos/card-fan";
import { PixelMorphToggles } from "@/components/demos/pixel-morph-toggles";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { CopyButton } from "@/components/ui/copy-button";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import * as React from "react";
import { Field, FieldLabel, FieldDescription, FieldContent, FieldTitle } from "@/components/ui/field";
import { SiteSearch } from "@/components/site-search";
import { LinkOut } from "@/components/link-out";
import {
  IconArrowDown,
  IconArrowDownLeft,
  IconArrowDownRight,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowUpLeft,
  IconArrowUpRight,
  IconPoint,
  IconTrash,
  IconTrashFilled,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatePresence, motion, useMotionValue, useMotionTemplate, useTransform, useSpring } from "motion/react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { Slider as BaseSlider } from "@base-ui/react";
import { MorphIcon } from "@/components/morph-icon";
import { Toggle } from "@/components/ui/toggle";
import { ColorCode } from "@/components/ui/color-code";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselItem, CarouselToolbar, CarouselViewport } from "@/components/ui/carousel";
import { PreviewCardGroup, PreviewCardTrigger } from "@/components/ui/preview-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipGroup, TooltipTrigger } from "@/components/ui/tooltip";
import { ToggleGrid, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Video } from "@/components/video";
import luminance from "@/public/assets/oklch/luminance.png";
import luminanceBw from "@/public/assets/oklch/luminance-bw.png";
import { LinkButton } from "@/components/ui/link-button";
import { DvdAnimationDemo, DvdAnimationRoot, DvdAnimationStage } from "@/components/animation/dvd-animation";
import { BubbleDemo } from "@/components/demos/chat-demo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CAROUSEL_SLIDES = [
  { src: "/assets/oklch/status-error.png", alt: "OKLCH status error palette" },
  { src: "/assets/oklch/status-warning.png", alt: "OKLCH status warning palette" },
  { src: "/assets/oklch/status-info.png", alt: "OKLCH status info palette" },
  { src: "/assets/oklch/status-success.png", alt: "OKLCH status success palette" },
  { src: "/assets/oklch/status-highlight.png", alt: "OKLCH status highlight palette" },
];

type MotionTextPer = "char" | "word" | "line";
type MotionTextPreset = "fade" | "fade-in-blur" | "slide" | "scale" | "blur-sm";

const MOTION_TEXT_DEFAULTS = {
  per: "word" as MotionTextPer,
  preset: "fade-in-blur" as MotionTextPreset,
  duration: 560,
  stagger: 36,
  waveDepth: 12,
  loopRunning: true,
};

const MOTION_TEXT_PRESETS: { value: MotionTextPreset; label: string }[] = [
  { value: "fade", label: "Fade" },
  { value: "fade-in-blur", label: "Blur +" },
  { value: "slide", label: "Slide" },
  { value: "scale", label: "Scale" },
  { value: "blur-sm", label: "Blur" },
];

const CHROME_TAB_DVD_COLORS = ["currentColor"];

export default function PlaygroundPage() {
  const [morphIcon, setMorphIcon] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
      <h1 className="w-full text-h1">Playground</h1>
      <FoldedCardDemo />

      <div className="group/tab-bar flex h-12 w-full items-center justify-center bg-[#070707]">
        <div className="group squircle relative isolate flex h-7 max-w-[200px] items-center overflow-hidden rounded-md bg-transparent text-xs font-medium text-zinc-400 transition-colors group-hover/tab-bar:bg-neutral-900/30 group-hover/tab-bar:hover:bg-neutral-800/60 group-hover/tab-bar:hover:text-zinc-200">
          <button
            type="button"
            title="untitled"
            className="relative z-0 flex h-full min-w-0 flex-1 items-center gap-1.5 rounded-md pr-3 pl-2 text-left"
          >
            <TreeIconFile className="h-4 w-4 shrink-0 text-white/40" />
            <span className="block truncate">untitled</span>
          </button>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-linear-to-l from-neutral-900 via-neutral-900 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          />

          <button
            type="button"
            title="Close tab"
            aria-label="Close untitled"
            className="squircle absolute top-1/2 right-1 z-20 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm bg-neutral-800 text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-zinc-100 focus:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentcolor"
              viewBox="0 0 16 16"
              width={16}
              height={16}
              className="pi h-3 w-3"
              aria-hidden="true"
            >
              <path d="M3.22 3.22a.75.75 0 0 1 1.06 0L8 6.94l3.72-3.72a.75.75 0 1 1 1.06 1.06L9.06 8l3.72 3.72a.75.75 0 1 1-1.06 1.06L8 9.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06L6.94 8 3.22 4.28a.75.75 0 0 1 0-1.06" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-14">
        <PlaygroundSection id="motion-systems" title="Motion">
          <DemoContainer title="Motion cards" className="lg:col-span-8" innerClass="min-h-[400px]">
            <CardFan />
          </DemoContainer>
          <DemoContainer
            title="TextReveal"
            centerContent
            variant="muted"
            className="lg:col-span-4"
            innerClass="min-h-60"
            controls={
              <Button size="xs" variant="ghost" onClick={() => setResetKey((key) => key + 1)}>
                Replay
                <PixelIcons.PixelRedoIcon data-icon="inline-end" />
              </Button>
            }
          >
            <TextReveal
              key={resetKey}
              className="overflow-visible text-center text-2xl font-semibold tracking-tight text-balance"
              duration={600}
              stagger={22}
            >
              Interfaces should feel alive, but never impatient.
            </TextReveal>
          </DemoContainer>
          <DemoContainer
            title="MotionText"
            caption="Inline playback controls"
            className="lg:col-span-8 lg:row-span-2"
            innerClass="min-h-[420px]"
          >
            <MotionTextPlaygroundDemo />
          </DemoContainer>
          <DemoContainer title="Skeleton" centerContent className="lg:col-span-4">
            <SkeletonDemo />
          </DemoContainer>
          <DemoContainer
            title="Emoji Feedback"
            description="A remix of Vercel's Feedback component"
            controls={<LinkOut href="https://vercel.com/geist/feedback" text="View original" />}
            className="lg:col-span-8"
            innerClass="min-h-72"
          >
            <EmojiFeedbackDemo />
          </DemoContainer>
          <DemoContainer title="Motion chart" description="Hover to animate" centerContent className="lg:col-span-4">
            <ChartDemo />
          </DemoContainer>
          <DemoContainer title="ColorCode" description="Click to copy" centerContent className="lg:col-span-3">
            <ColorCode value="#0b0b0b" />
          </DemoContainer>
          <DemoContainer title="ColorSwatchGroup" centerContent className="lg:col-span-5">
            <ColorSwatchGroupDemo />
          </DemoContainer>
          <DemoContainer title="Animated icon buttons" centerContent className="lg:col-span-6">
            <div className="grid grid-cols-3 grid-rows-2 place-items-center gap-2 text-center text-xs">
              <Toggle pressed={morphIcon} onPressedChange={() => setMorphIcon((prev) => !prev)} variant="outline" className="w-button">
                <MorphIcon from="filter" to="chevronRight" active={morphIcon} />
              </Toggle>
              <p className="row-2">Line morph</p>
              <ModeToggle size="icon" variant="outline" />
              <p className="row-2">Mode toggle: pixel morph</p>
              <CopyButton value="Hello, world!" size="icon" variant="outline" />
              <p className="row-2">Icon swap, stroke anim, inline toast</p>
            </div>
          </DemoContainer>
        </PlaygroundSection>

        <PlaygroundSection id="pixel-demos" title="Pixels">
          <DemoContainer title="DVD Loader" className="lg:col-span-5">
            <DvdAnimationDemo className="dark bg-background" />
          </DemoContainer>
          <DemoContainer title="Dino Animation" caption="SVG animation, so no cacti" centerContent className="lg:col-span-3">
            <PixelDino />
          </DemoContainer>
          <DemoContainer title="Pixel morph toggles" centerContent className="lg:col-span-4">
            <PixelMorphToggles />
          </DemoContainer>
        </PlaygroundSection>

        <PlaygroundSection id="interaction-components" title="Controls">
          <DemoContainer title="Tabs" caption="Elevated, line, and pill variants" className="lg:col-span-full">
            <TabsVariantsDemo />
          </DemoContainer>
          <DemoContainer title="ToggleGrid" centerContent className="lg:col-span-4">
            <ToggleVariantsDemo />
          </DemoContainer>
          <DemoContainer title="Switch" centerContent className="lg:col-span-4">
            <div className="grid-stack aspect-square w-32">
              <SwitchDemo />
            </div>
          </DemoContainer>
          <DemoContainer title="Base UI + CSS-anchored value" centerContent innerClass="min-h-[280px]" className="lg:col-span-4">
            <AnchoredSliderDemo />
          </DemoContainer>
          <DemoContainer title="Slider" centerContent className="lg:col-span-4">
            <SliderDemo />
          </DemoContainer>
          <DemoContainer caption="CodeBlock" centerContent className="lg:col-span-4 lg:row-span-2">
            <CodeBlock
              code={`export function ButtonDemo() {\n  return <Button variant="elevated">Save</Button>;\n}`}
              language="tsx"
              filename="button-demo.tsx"
            />
          </DemoContainer>
        </PlaygroundSection>

        <PlaygroundSection id="media-comparison" title="Frames">
          <DemoContainer caption="CarouselToolbar" centerContent className="lg:col-span-3">
            <CarouselDemo />
          </DemoContainer>
          <DemoContainer title="ImageToggle" caption="Select a variant" centerContent className="lg:col-span-5">
            <ImageToggleDemo />
          </DemoContainer>
          <DemoContainer
            title="Video Player"
            caption={
              <>
                Built with <LinkOut href="https://www.media-chrome.org/" text="media-chrome" /> + Base UI Toolbar
              </>
            }
            centerContent
            className="lg:col-span-full"
          >
            <Video
              src="/assets/shine/unused/shine-military-dataviz.mov"
              autoPlay={false}
              preload="metadata"
              className="my-0 w-full max-w-4xl"
            />
          </DemoContainer>
        </PlaygroundSection>

        <PlaygroundSection id="buttons" title="Buttons">
          <DemoContainer caption="Loading button" centerContent className="lg:col-span-4">
            <Button
              rounded
              loading={isLoading}
              onClick={() => {
                setLoading(true);
                window.setTimeout(() => setLoading(false), 2000);
              }}
            >
              Confirm
            </Button>
          </DemoContainer>
          <DemoContainer caption="Hover effects" centerContent className="lg:col-span-8">
            <AnimatedButtonDemo />
          </DemoContainer>
          <DemoContainer caption="Metallic button" centerContent className="lg:col-span-4">
            <CobotButtonDemo />
          </DemoContainer>
          <DemoContainer caption="iOS 27 icon" centerContent className="lg:col-span-3" innerClass="bg-card dark">
            <MacAppIconDemo />
          </DemoContainer>
          <DemoContainer caption="Glass button" centerContent className="[var(--bg:var(--primary))] lg:col-span-3">
            <GlassButtonDemo />
            <Button variant="glass">Glass</Button>
          </DemoContainer>
          <DemoContainer caption="Delete button" centerContent className="lg:col-span-2">
            <DeleteButtonDemo />
          </DemoContainer>
        </PlaygroundSection>

        <PlaygroundSection id="visual-details" title="Verisimilitude">
          <DemoContainer
            caption={"CSS shape + masking for cutouts"}
            title="Chrome Tabs"
            className="lg:col-span-6 lg:row-span-2"
            centerContent
            controls={
              <LinkButton variant="ghost" size="xs" href="/posts/clip-path-curve">
                Clip-path playground
                <IconArrowUpRight data-icon="inline-end" />
              </LinkButton>
            }
          >
            <ChromeTabsDemo />
          </DemoContainer>
          <DemoContainer title="Site search" caption="A Raycast-style command palette" centerContent className="lg:col-span-6">
            <SiteSearch className="w-full max-w-xs" variant="input" />
          </DemoContainer>
          <DemoContainer title="Grouped Popups" centerContent className="lg:col-span-6" innerClass="min-h-60">
            <GroupedPopupsDemo />
          </DemoContainer>
          <DemoContainer title="Keys" centerContent className="lg:col-span-3" innerClass="flex flex-col gap-2">
            <Kbd variant="elevated">⌘/</Kbd>
            <Kbd>⌘I</Kbd>
            <KbdGroup>
              <Kbd variant="big">⌘</Kbd>
              <Kbd variant="big">K</Kbd>
            </KbdGroup>
          </DemoContainer>
          <DemoContainer
            title="DeviceFrame · Phone"
            overflowBehavior="resize"
            centerContent
            className="lg:col-span-5 lg:row-span-2"
            caption="A remix of Geist's Phone component. Responds to color mode and uses your device's clock and battery level (except on iOS)."
          >
            <DeviceFrame.Phone island toolbar address="bob.fyi" gutter className="max-w-xs">
              <BubbleDemo />
            </DeviceFrame.Phone>
          </DemoContainer>
          <DemoContainer title="DeviceFrame · Browser" variant="outline" className="lg:col-span-7" centerContent overflowBehavior="resize">
            <DeviceFrame.Browser address="bob.fyi">
              <BrowserFramePreview />
            </DeviceFrame.Browser>
          </DemoContainer>
          <DemoContainer
            title="Custom mark styles"
            description="with CSS corner-shape"
            className="lg:col-span-full"
            innerClass="grid divide-y text-sm/6 text-muted-foreground sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            <div className="space-y-2 p-4 sm:ps-0">
              <p>
                The default mark styling is{" "}
                <mark className="bg-blend-none m-0 rounded-none bg-[mark] bg-none p-0 text-[markText] shadow-none text-shadow-none">
                  dated
                </mark>
                . Let&apos;s make the shape a bit more <mark>realistic</mark> with <Code variant="inline">corner-shape</Code>.
              </p>

              <p>
                Then slap a <Code variant="plain">data-hue</Code> attribute on it for some classic highligter colors, like{" "}
                <mark data-hue="yellow">yellow</mark> or <mark data-hue="pink">pink</mark> or <mark data-hue="lime">lime</mark> or{" "}
                <mark data-hue="magenta">magenta</mark> or <mark data-hue="cyan">cyan</mark>.
              </p>
            </div>
            <div className="space-y-4 p-4">
              <p>
                The highlight shape also plays nice with long strings.{" "}
                <mark data-hue="indigo">
                  It&apos;s got{" "}
                  <Code variant="plain" className="inline wrap-anywhere">
                    box-decoration-break: clone
                  </Code>{" "}
                  applied to make the shape span line breaks.
                </mark>{" "}
                Notice how the nested <Code variant="inline-component">code</Code>&nbsp;inherited a little treatment too? I think
                that&apos;s a nice touch.
              </p>
            </div>
            <div className="space-y-4 p-4 sm:pe-0">
              <strong>Custom overrides</strong>
              <p>
                Don&apos;t like the default values? Override with classes, like this{" "}
                <mark className="text-foreground [--mark-bg:var(--color-gold-200)]">classic highlighter</mark> look.
              </p>
            </div>
          </DemoContainer>
        </PlaygroundSection>
      </div>
    </div>
  );
}

function PlaygroundSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="grid w-full scroll-mt-24 gap-4">
      <h2 className="border-b border-border pb-2 font-sans text-base font-[550] tracking-tight text-foreground">{title}</h2>
      <div className="grid gap-4 lg:grid-cols-12">{children}</div>
    </section>
  );
}

const DEMO_SWATCHES = [
  { value: "var(--color-red-500)", label: "Red", color: "var(--color-red-500)" },
  { value: "var(--color-yellow-300)", label: "Yellow", color: "var(--color-yellow-300)" },
  { value: "var(--color-green-500)", label: "Green", color: "var(--color-green-500)" },
  { value: "var(--color-blue-500)", label: "Blue", color: "var(--color-blue-500)" },
  { value: "var(--color-pink-500)", label: "Pink", color: "var(--color-pink-500)" },
];

function ColorSwatchGroupDemo() {
  const [color, setColor] = React.useState("var(--color-blue-500)");

  return (
    <div className="flex flex-col justify-start gap-3">
      <ColorSwatchGroup colors={DEMO_SWATCHES} value={color} onValueChange={setColor} />
      <p className="w-[320px] max-w-full text-xs text-muted-foreground">
        Selected: <ColorCode value={color} />
      </p>
    </div>
  );
}

function ChartDemo() {
  const SPRING = {
    damping: 18,
  };

  const SLOW_SPRING = {
    damping: 40,
  };
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = React.useState(false);

  // svg uses spring
  const clipPathSpring = useSpring(0, isHovering ? SPRING : SLOW_SPRING);
  const clipPath = useMotionTemplate`inset(0px ${clipPathSpring}% 0px 0px)`;

  // text uses raw val so it doesn't overshoot 100
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

function SwitchDemo() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Field orientation="horizontal" className="flex w-auto items-center gap-3">
      <FieldLabel>
        <Switch checked={checked} onCheckedChange={setChecked} />
        <FieldContent orientation="horizontal">
          <FieldTitle>Switch</FieldTitle>
          <FieldDescription>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={checked ? "onText" : "offText"}
                className="inline-block min-w-20"
                initial={{ opacity: 0, filter: "blur(2px)", x: checked ? "-25%" : "25%" }}
                animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)", x: checked ? "-25%" : "25%" }}
                transition={{ duration: 0.2 }}
                style={{ color: checked ? "var(--foreground)" : "var(--muted-foreground)" }}
              >
                {checked ? "On" : "Off"}
              </motion.span>
            </AnimatePresence>
          </FieldDescription>
        </FieldContent>
      </FieldLabel>
    </Field>
  );
}

function AnimatedButtonDemo() {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-2 [--button-x:--spacing(3)] [--button-y:--spacing(2)]",
        "[&_button]:inline-flex [&_button]:h-button [&_button]:items-center [&_button]:justify-center [&_button]:overflow-hidden [&_button]:rounded-lg [&_button]:bg-muted [&_button]:px-(--button-x) [&_button]:py-(--button-y) [&_button]:text-[13px] [&_button]:font-[550] [&_button]:tracking-[-.02em] [&_button]:hover:bg-accent [&_button]:hover:text-accent-foreground"
      )}
    >
      <span />
      <button className="group relative justify-self-center duration-300 select-none">
        <span className="translate-y-0 blur-none transition-all group-hover:pointer-events-none group-hover:-translate-y-(--button-y) group-hover:opacity-0">
          Hover up
        </span>
        <span className="group-hover:blur-0 pointer-events-none absolute translate-y-(--button-y) opacity-0 blur-xs transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none">
          Hovered! &uarr;
        </span>
      </button>
      <span />
      <button className="group relative duration-300 select-none">
        <span className="transition-all group-hover:pointer-events-none group-hover:-translate-x-(--button-x) group-hover:opacity-0 group-hover:blur-[1px]">
          Hover left
        </span>
        <span className="group-hover:blur-0 pointer-events-none absolute translate-x-(--button-x) opacity-0 blur-[1px] transition-all group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-hover:blur-none">
          Hovered! &larr;
        </span>
      </button>
      <button className="group relative duration-300 select-none">
        <span className="invisible grid-stack" aria-hidden="true">
          <span>Short text</span>
          <span>Some longer text</span>
        </span>
        <span className="absolute transition-all group-hover:pointer-events-none group-hover:translate-y-(--button-y) group-hover:opacity-0 group-hover:blur-[1px]">
          Short text
        </span>
        <span className="group-hover:blur-0 pointer-events-none absolute -translate-y-(--button-y) opacity-0 blur-[1px] transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none">
          Some longer text
        </span>
      </button>
      <button className="group relative duration-300 select-none">
        <span className="transition-all group-hover:pointer-events-none group-hover:translate-x-(--button-x) group-hover:opacity-0 group-hover:blur-[1px]">
          Hover right
        </span>
        <span className="group-hover:blur-0 pointer-events-none absolute -translate-x-(--button-x) opacity-0 blur-[1px] transition-all group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-hover:blur-none">
          &rarr; Hovered!
        </span>
      </button>
      <span />
      <button className="group relative justify-self-center duration-300 select-none">
        <span className="transition-all group-hover:pointer-events-none group-hover:translate-y-(--button-y) group-hover:opacity-0 group-hover:blur-[1px]">
          Hover down
        </span>
        <span className="group-hover:blur-0 pointer-events-none absolute -translate-y-(--button-y) opacity-0 blur-[1px] transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none">
          Hovered! &darr;
        </span>
      </button>
    </div>
  );
}

function SliderDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Slider defaultValue={[40]} />
      <Slider defaultValue={[20, 70]} />
    </div>
  );
}

function MotionTextSample({ label, action, children }: { label: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid min-w-0 gap-1.5">
      <div className="flex min-h-button-xs items-center justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {action}
      </div>
      <div className="min-w-0 text-sm leading-6 text-foreground">{children}</div>
    </div>
  );
}

function MotionTextPresetSelect({ value, onValueChange }: { value: MotionTextPreset; onValueChange: (value: MotionTextPreset) => void }) {
  const selectedLabel = MOTION_TEXT_PRESETS.find((preset) => preset.value === value)?.label;

  return (
    <Select value={value} onValueChange={(nextValue) => onValueChange(nextValue as MotionTextPreset)}>
      <SelectTrigger size="sm" aria-label="Text effect preset" className="min-w-28">
        <SelectValue>{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {MOTION_TEXT_PRESETS.map((preset) => (
          <SelectItem key={preset.value} value={preset.value}>
            {preset.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MotionTextPlaygroundDemo() {
  const [preset, setPreset] = React.useState<MotionTextPreset>(MOTION_TEXT_DEFAULTS.preset);
  const [loopRunning, setLoopRunning] = React.useState(MOTION_TEXT_DEFAULTS.loopRunning);
  const [morphAlternate, setMorphAlternate] = React.useState(false);
  const [waveDepth, setWaveDepth] = React.useState(MOTION_TEXT_DEFAULTS.waveDepth);
  const [revealKey, setRevealKey] = React.useState(0);
  const [scrambleKey, setScrambleKey] = React.useState(0);

  const replayReveal = React.useCallback(() => setRevealKey((key) => key + 1), []);
  const replayScramble = React.useCallback(() => setScrambleKey((key) => key + 1), []);
  const effectSpeedReveal = 480 / MOTION_TEXT_DEFAULTS.duration;
  const effectSpeedSegment = 40 / MOTION_TEXT_DEFAULTS.stagger;

  return (
    <div className="grid w-full gap-5 sm:grid-cols-2" data-testid="motion-text-playground">
      <MotionTextSample
        label="Entrance"
        action={
          <Button size="xs" variant="ghost" type="button" onClick={replayReveal}>
            Replay
            <PixelIcons.PixelRedoIcon data-icon="inline-end" />
          </Button>
        }
      >
        <MotionText.Reveal
          key={`reveal-${revealKey}`}
          type="motion"
          per={MOTION_TEXT_DEFAULTS.per}
          duration={MOTION_TEXT_DEFAULTS.duration}
          stagger={MOTION_TEXT_DEFAULTS.stagger}
          className="text-sm leading-6 text-balance"
        >
          Motion text makes expressive systems feel reusable.
        </MotionText.Reveal>
      </MotionTextSample>

      <MotionTextSample label="TextEffect" action={<MotionTextPresetSelect value={preset} onValueChange={setPreset} />}>
        <MotionText.Effect
          key={`effect-${preset}`}
          per={MOTION_TEXT_DEFAULTS.per}
          preset={preset}
          speedReveal={effectSpeedReveal}
          speedSegment={effectSpeedSegment}
          className="text-sm leading-6 text-balance"
        >
          Presets live beside the text effect.
        </MotionText.Effect>
      </MotionTextSample>

      <MotionTextSample
        label="Loop"
        action={
          <Field orientation="horizontal" className="w-auto items-center gap-2">
            <FieldLabel className="text-xs" htmlFor="motion-text-loop">
              Play
            </FieldLabel>
            <Switch id="motion-text-loop" checked={loopRunning} onCheckedChange={setLoopRunning} data-testid="motion-text-loop" />
          </Field>
        }
      >
        <p className="text-muted-foreground">
          Feels{" "}
          <MotionText.Loop trigger={loopRunning} interval={1.2} className="text-primary">
            {["snappy", "calm", "clear"]}
          </MotionText.Loop>
        </p>
      </MotionTextSample>

      <MotionTextSample
        label="Scramble"
        action={
          <Button size="xs" variant="ghost" type="button" onClick={replayScramble}>
            Replay
            <PixelIcons.PixelRedoIcon data-icon="inline-end" />
          </Button>
        }
      >
        <MotionText.Scramble
          key={`scramble-${scrambleKey}`}
          duration={MOTION_TEXT_DEFAULTS.duration / 1000}
          className="font-mono text-sm leading-6"
        >
          Interface signal
        </MotionText.Scramble>
      </MotionTextSample>

      <MotionTextSample label="Wave">
        <div className="grid gap-2">
          <MotionText.Wave
            duration={MOTION_TEXT_DEFAULTS.duration / 1000}
            zDistance={waveDepth}
            yDistance={Math.round(waveDepth / -4)}
            rotateYDistance={waveDepth}
            className="text-sm leading-6 text-balance"
          >
            Waves keep their own rhythm
          </MotionText.Wave>
          <Slider
            label="Depth"
            showValue
            value={[waveDepth]}
            min={0}
            max={28}
            step={1}
            onValueChange={(value) => {
              const nextValue = Array.isArray(value) ? value[0] : value;
              setWaveDepth(Math.round(nextValue ?? MOTION_TEXT_DEFAULTS.waveDepth));
            }}
            className="max-w-xs"
          />
        </div>
      </MotionTextSample>

      <MotionTextSample
        label="Morph"
        action={
          <Button size="xs" variant="ghost" type="button" onClick={() => setMorphAlternate((value) => !value)}>
            Swap
          </Button>
        }
      >
        <MotionText.Morph className="text-sm leading-6">
          {morphAlternate ? "Motion variants compose cleanly" : "Variant controls compose motion"}
        </MotionText.Morph>
      </MotionTextSample>

      <MotionTextSample label="Shimmer">
        <p className="shimmer text-sm leading-6 text-muted-foreground shimmer-color-primary/70 shimmer-duration-1400">
          Generating response&hellip;
        </p>
      </MotionTextSample>
    </div>
  );
}

function GroupedPopupsDemo() {
  const links = [
    {
      title: "Website",
      url: "https://bob.fyi",
      description: "Portfolio, writing, experiments, and component playgrounds.",
      avatar: (
        <Avatar>
          <AvatarImage src="https://github.com/robertweisbecker.png" alt="Bob Weisbecker" />
        </Avatar>
      ),
    },
    {
      title: "Vercel",
      url: "https://vercel.com",
      description: "Frontend cloud platform for shipping web applications.",
      avatar: <VercelIcon className="size-4" aria-hidden="true" />,
    },
    {
      title: "GitHub",
      url: "https://github.com/robertweisbecker",
      description: "Code hosting, projects, and public repositories.",
      avatar: <GithubIcon className="size-4" aria-hidden="true" />,
    },
  ];

  return (
    <p className="max-w-md text-sm leading-7 text-muted-foreground">
      Inline references can carry previews without leaving paragraph flow. Open{" "}
      <PreviewCardGroup>
        {links.map((link, index) => (
          <React.Fragment key={link.url}>
            <PreviewCardTrigger
              preview={<GroupedLinkPreview {...link} />}
              render={<a href={link.url} target="_blank" rel="noreferrer" className="link font-medium" />}
            >
              {link.title}
            </PreviewCardTrigger>
            {index < links.length - 1 ? <span>, </span> : null}
          </React.Fragment>
        ))}
      </PreviewCardGroup>{" "}
      for quick context before committing to a new tab.
    </p>
  );
}

function GroupedLinkPreview({
  title,
  url,
  description,
  avatar,
}: {
  title: string;
  url: string;
  description: string;
  avatar: React.ReactNode;
}) {
  return (
    <div className="w-xs p-3">
      <div className="flex items-center gap-3">
        {avatar}

        <div className="min-w-0">
          <p className="font-medium text-card-foreground">{title}</p>
        </div>
      </div>
      <p className="my-3 text-sm">{description}</p>
      <LinkOut href={url} text={url} className="text-xs text-muted-foreground" />
    </div>
  );
}

function CarouselDemo() {
  return (
    <Carousel autoplay={{ delay: 3000, defaultInteraction: false }} fade className="w-full max-w-xl">
      <CarouselViewport>
        {CAROUSEL_SLIDES.map((slide) => (
          <CarouselItem key={slide.src}>
            <div
              className="aspect-video overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat ring-1 ring-border/50 ring-inset"
              style={{ backgroundImage: `url('${slide.src}')` }}
              role="img"
              aria-label={slide.alt}
            />
          </CarouselItem>
        ))}
      </CarouselViewport>
      <CarouselToolbar />
    </Carousel>
  );
}

type ImageToggleMode = "tabs" | "slider" | "comparison";

const IMAGE_TOGGLE_MODES: { value: ImageToggleMode; label: string }[] = [
  { value: "tabs", label: "Tabs" },
  { value: "slider", label: "Slider" },
  { value: "comparison", label: "Comparison" },
];

function ImageToggleDemo() {
  const [mode, setMode] = React.useState<ImageToggleMode>("tabs");
  const selectedLabel = IMAGE_TOGGLE_MODES.find((option) => option.value === mode)?.label;

  return (
    <div className="grid w-full gap-3">
      <Select value={mode} onValueChange={(nextMode) => setMode(nextMode as ImageToggleMode)}>
        <SelectTrigger size="sm" aria-label="Image toggle variant" className="justify-self-end">
          <SelectValue>{selectedLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {IMAGE_TOGGLE_MODES.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ImageToggle mode={mode === "tabs" ? undefined : mode} before={luminance} after={luminanceBw} tab1="Color" tab2="Grayscale" />
    </div>
  );
}

function BrowserFramePreview() {
  return (
    <div className="min-h-44 bg-background p-4 text-sm">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2 font-medium">
            <Favicon className="size-4" />
            Studio
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Skeleton className="h-2.5 w-12" />
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-2.5 w-10" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_0.72fr]">
          <div className="space-y-3 rounded-lg border border-border/60 bg-card p-3">
            <Skeleton className="h-3 w-3/5" />
            <Skeleton className="h-2.5 w-full" />
            <Skeleton className="h-2.5 w-5/6" />
            <div className="grid grid-cols-3 gap-2 pt-2">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-lg border border-border/60 bg-card p-3">
              <Skeleton className="mb-3 h-2.5 w-20" />
              <div className="space-y-2">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-4/5" />
                <Skeleton className="h-2 w-2/3" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabsVariantsDemo() {
  const panelClass = "min-h-40 px-3 text-sm text-muted-foreground grid place-items-center bg-background rounded-lg";
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Tabs defaultValue="default" className="w-full">
        <TabsList>
          <TabsTrigger value="default">Account</TabsTrigger>
          <TabsTrigger value="details">Profile</TabsTrigger>
          <TabsTrigger value="settings">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="default" className={panelClass}>
          Default tabs use an elevated indicator.
        </TabsContent>
        <TabsContent value="details" className={panelClass}>
          Animation handled by CSS transitions.
        </TabsContent>
        <TabsContent value="settings" className={panelClass}>
          Built on Base UI.
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="line" className="w-full">
        <TabsList variant="line">
          <TabsTrigger value="line">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
        </TabsList>
        <TabsContent className={panelClass} value="line">
          Line tabs keep the navigation lightweight.
        </TabsContent>
        <TabsContent className={panelClass} value="reports">
          Reports content.
        </TabsContent>
        <TabsContent className={panelClass} value="exports">
          Exports content.
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="pill" className="w-full">
        <TabsList variant="pill">
          <TabsTrigger value="pill">Posts</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>
        <TabsContent value="pill" className={panelClass}>
          Pill tabs work well for nested or inline contexts.
        </TabsContent>
        <TabsContent value="drafts" className={panelClass}>
          Drafts content.
        </TabsContent>
        <TabsContent value="archive" className={panelClass}>
          Archive content.
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ToggleVariantsDemo() {
  const corners = [
    { value: "up-left", label: "Top-left", icon: <IconArrowUpLeft /> },
    { value: "up", label: "Top", icon: <IconArrowUp /> },
    { value: "up-right", label: "Top-right", icon: <IconArrowUpRight /> },
    { value: "left", label: "Left", icon: <IconArrowLeft /> },
    { value: "center", label: "Center", icon: <IconPoint /> },
    { value: "right", label: "Right", icon: <IconArrowRight /> },
    { value: "down-left", label: "Bottom-left", icon: <IconArrowDownLeft /> },
    { value: "down", label: "Bottom", icon: <IconArrowDown /> },
    { value: "down-right", label: "Bottom-right", icon: <IconArrowDownRight /> },
  ];

  return (
    <div className="flex items-center justify-center">
      <TooltipGroup side="top" sideOffset={8} delay={100} closeDelay={0}>
        <ToggleGrid variant="elevated" columns={3} defaultValue={["center"]} className="w-40">
          {corners.map((corner) => (
            <TooltipTrigger
              key={corner.value}
              tooltip={corner.label}
              render={<ToggleGroupItem value={corner.value} aria-label={corner.label} />}
            >
              {corner.icon}
            </TooltipTrigger>
          ))}
        </ToggleGrid>
      </TooltipGroup>
    </div>
  );
}

function SkeletonDemo() {
  const [replayKey, setReplayKey] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setLoaded(true), 4000);
    return () => window.clearTimeout(timeout);
  }, [replayKey]);

  const replay = React.useCallback(() => {
    setLoaded(false);
    setReplayKey((key) => key + 1);
  }, []);

  return (
    <div className="grid w-full max-w-sm gap-3" data-testid="skeleton-demo" data-loaded={loaded}>
      <div className="order-last flex justify-center">
        <Button variant="outline" rounded onClick={replay} data-testid="skeleton-replay">
          Reload
          <PixelIcons.PixelRedoIcon data-icon="inline-end" />
        </Button>
      </div>

      <div
        className={cn(
          "squircle relative min-h-[13.5rem] overflow-hidden rounded-2xl border",
          "ring-4 transition-[opacity,border-color] duration-500 ease-out",
          loaded ? "pointer-events-none border-success-primary bg-card ring-success-primary/20" : "border-dashed bg-card/50 ring-border/20"
        )}
        aria-live="polite"
        data-testid="skeleton-frame"
      >
        <div
          aria-hidden={loaded}
          data-testid="skeleton-loading"
          className={cn(
            "absolute inset-0 grid gap-4 p-4",
            "[transition:inherit]",
            loaded ? "pointer-events-none opacity-0" : "border-dashed opacity-100"
          )}
        >
          <div className="flex items-center gap-4">
            <Skeleton className="size-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-44 max-w-full" />
            </div>
          </div>
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>

        <div
          aria-hidden={!loaded}
          data-testid="skeleton-content"
          className={cn(
            "absolute inset-0 grid gap-4 p-4 transition-opacity duration-500 ease-out",
            loaded ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div className="flex items-center gap-4">
            <Avatar className="size-10 rounded-md">
              <AvatarImage src="/assets/unused/bob.png" alt="Robert Weisbecker" />
              <AvatarFallback>RW</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Bob Weisbecker</p>
              <Marker className="text-xs">
                <MarkerContent>San Diego, CA</MarkerContent>
              </Marker>
            </div>
          </div>
          <div className="grid h-28 rounded-xl p-0">
            <div>
              <p className="mt-1 line-clamp-5 text-sm text-muted-foreground">
                Ipsum officia sit eu velit irure ullamco magna qui occaecat id. Incididunt proident exercitation culpa dolore officia sunt
                aliquip minim anim aliqua non quis Lorem irure esse. Occaecat dolore irure dolor elit aliqua ea duis aliquip irure officia
                enim deserunt adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnchoredSliderDemo() {
  return (
    <BaseSlider.Root defaultValue={25} thumbAlignment="edge-client-only" className="flex w-56 items-center gap-3 py-4">
      <BaseSlider.Label className="text-sm font-[450]">Label</BaseSlider.Label>
      <BaseSlider.Control className="flex w-56 touch-none items-center select-none">
        <BaseSlider.Track className="squircle h-button-xs w-full cursor-ew-resize overflow-hidden rounded-sm bg-border transition-transform duration-200 ease-out select-none data-dragging:scale-102 data-dragging:cursor-ew-resize">
          <BaseSlider.Indicator className="squircle rounded-s-sm bg-primary select-none" />
          <BaseSlider.Thumb
            aria-label="Volume"
            className={cn(
              "squircle relative flex h-full rounded-e-sm bg-primary p-1",
              "has-focus-visible:*:outline-2 has-focus-visible:*:outline-ring"
            )}
            style={{ anchorName: "--thumb" }}
          >
            <div className="pointer-events-none h-full w-0.5 origin-right rounded-xs bg-white shadow-border-xs transition-transform duration-100 ease-out-quad in-data-dragging:scale-110" />
          </BaseSlider.Thumb>
        </BaseSlider.Track>
      </BaseSlider.Control>
      <BaseSlider.Value className="absolute bottom-[calc(anchor(top)+4px)] left-[anchor(center)] -translate-x-1/2 rounded-sm bg-popover px-1 py-px text-2xs text-popover-foreground tabular-nums shadow-border-sm [position-anchor:--thumb]" />
    </BaseSlider.Root>
  );
}

function ChromeTabsDemo() {
  return (
    <ChromeTabs defaultValue="preview" className="max-w-md border border-border/50 dark:bg-black">
      <ChromeTabs.List>
        <ChromeTabs.Tab value="preview" className="w-fit">
          <Avatar className="-ms-1.5 size-4.5">
            <AvatarImage src="https://github.com/robertweisbecker.png" alt="bob's avatar" />
            <AvatarFallback>BW</AvatarFallback>
          </Avatar>
          bob.fyi
        </ChromeTabs.Tab>
        <ChromeTabs.Tab value="code" className="w-fit">
          <GithubIcon className="-ms-1 size-4" />
          Github
        </ChromeTabs.Tab>
        <ChromeTabs.Tab value="output" className="w-fit" flush={false}>
          <VercelIcon className="-ms-1 size-4" />
          Vercel
        </ChromeTabs.Tab>
      </ChromeTabs.List>
      <ChromeTabDvdPanel value="preview" label="bob.fyi" icon={Favicon} className="border bg-accent text-muted-foreground" />
      <ChromeTabDvdPanel
        value="code"
        label="Github"
        icon={GithubIcon}
        className="border-violet-400 bg-violet-25 text-violet-500 dark:border-violet-600 dark:bg-violet-950 dark:text-violet-400"
      />
      <ChromeTabDvdPanel value="output" label="Vercel" icon={VercelIcon} className="border-white bg-black text-white" />
    </ChromeTabs>
  );
}

function ChromeTabDvdPanel({
  value,
  label,
  icon: Icon,
  className,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className: string;
}) {
  return (
    <ChromeTabs.Panel value={value} className="overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        className={cn("mx-auto h-36 w-72 overflow-hidden border border-dashed", className)}
      >
        <DvdAnimationRoot
          duration={42}
          width={288}
          height={144}
          logoScale={0.22}
          logoAspectRatio={1}
          colors={CHROME_TAB_DVD_COLORS}
          className="size-full"
        >
          <DvdAnimationStage logoViewBox="0 0 16 16" aria-label={`${label} bouncing icon`}>
            <Icon width="100%" height="100%" />
          </DvdAnimationStage>
        </DvdAnimationRoot>
      </motion.div>
    </ChromeTabs.Panel>
  );
}

function CobotButtonDemo() {
  return (
    <button
      className={cn(
        "relative isolate m-10 inline-flex h-button-lg items-center rounded-full px-8 pb-0.5 font-medium text-white transition-[scale] duration-100 ease-out",
        "[--highlight-color:var(--hue-300)]",
        "border-[0.5px] border-muted-foreground",
        "ring-[0.5px] ring-black/20",
        "inset-shadow-sm inset-shadow-neutral-300/50",
        "bg-linear-to-b from-white from-5% via-neutral-900 via-67% to-(--highlight-color) bg-center",
        "shadow-md text-shadow-[0px_1px_0px_hsl(0_0_100%/30%),0px_.25px_hsl(0_0_0_/_100%),0_0_1px_hsl(0_0_0_/_80%),0_.5px_.5px_hsl(0_0_100%_/_50%)]",
        "before:absolute before:inset-0.5 before:-z-1 before:rounded-full before:bg-(--highlight-color) before:bg-radial-[at_25%_-25%] before:from-neutral-300/80 before:via-neutral-400 before:to-neutral-600 before:bg-size-[200%_100%] before:shadow-lg before:shadow-(color:--highlight-color)/30 before:transition-all before:duration-100 before:ease-out",
        "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--highlight-color)",
        "active:translate-y-px active:scale-97 active:before:inset-[1.5px] active:before:blur-[.5px]"
      )}
    >
      Agent
    </button>
  );
}

function FoldedCardDemo() {
  return (
    <Card
      variant="plain"
      size="sm"
      className={cn(
        "ease squircle z-2 max-w-3xs overflow-visible rounded-md border bg-[color-mix(in_srgb,var(--background),var(--card))] bg-clip-padding drop-shadow-[0_1px,-1px_2px] drop-shadow-black/4 transition-all duration-180 hover:drop-shadow-[0_1px,-1px_3px_2px] hover:drop-shadow-black/8",
        "rounded-se-[26px] hover:rounded-se-[36px]",
        "hover:before:size-[42px] hover:before:border-input",
        "after:drop-shadow-black/32 hover:after:translate-x-0 hover:after:translate-y-0 hover:after:rounded-bl-[8px] hover:after:drop-shadow-md",

        "[mask-image-radial-gradient(white,black)] transition-180ms decoration-none relative z-2 m-0 block h-full w-full overflow-hidden border border-transparent bg-size-[100%_100%] p-[20px_16px_18px] inset-shadow-[0_0_0_1px_var(--border)] [border-image:initial]",
        "before:absolute before:top-0 before:right-0 before:z-3 before:size-7.5 before:translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-background before:shadow-[-1px_1px] before:shadow-[color-mix(in_srgb,var(--border)_75%,var(--background))] before:transition-[inherit]",

        "after:linear after:absolute after:top-0 after:right-0 after:z-2 after:size-7 after:translate-x-2 after:-translate-y-2 after:rounded-bl-[6px] after:bg-[color-mix(in_srgb,var(--border)_50%,var(--card))] after:shadow-[-.5px_.5px_0_.5px_var(--border)] after:transition-all after:duration-180"
      )}
    >
      <CardContent>
        <CardTitle>Card Title</CardTitle>
        <p>Card content goes here. You can put any content inside.</p>
      </CardContent>
    </Card>
  );
}

function GlassButtonDemo() {
  return (
    <div className="relative">
      <div
        data-slot="glass"
        className="size-button rounded-full"
        style={{
          background: "rgba(248, 240, 248, 0.1)",
          backgroundImage:
            "linear-gradient(0deg, rgba(248, 248, 248, 0.2), rgba(248, 248, 248, 0.2)), linear-gradient(0deg, rgba(68, 68, 68, 0.6), rgba(68, 68, 68, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), rgba(0, 0, 0, 0.25)",
          backgroundBlendMode: "luminosity, plus-lighter, normal, normal",
          boxShadow:
            "1.25px 0px 0px -0.75px rgba(0, 0, 0, 0.2), -1.25px 0px 0px -0.75px rgba(0, 0, 0, 0.2), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.14), 0px 12px 3px -4px color-mix(in srgb, var(--card) 50%, transparent), 0px 9px 6px -2px rgba(0, 0, 0, 0.1), inset 0px -1px 0px -0.5px rgba(255, 255, 255, 0.4), inset 0px 1px 0px -0.5px rgba(255, 255, 255, 0.4), inset 0px 1px 1px rgba(255, 255, 255, 0.2), inset 0px -1px 1px rgba(255, 255, 255, 0.2), inset 0px 6px 6px 4px rgba(0, 0, 0, 0.07)",
          backdropFilter: "blur(1.5px) saturate(1.5) brightness(1.1)",
        }}
      />
      <div
        data-slot="reflection"
        style={{
          position: "absolute",
          inset: 2,
          filter: "blur(2px)",
          borderRadius: "100%",
          borderTop: "1px solid color-mix(var(--bg) 90%,canvastext)",
          mixBlendMode: "hard-light",
        }}
      />
      <div
        style={{
          position: "absolute",
          fontSize: "1rem",
          inset: 0,
          textAlign: "center",
          height: "100%",
          display: "grid",
          placeItems: "center center",
          color: "color-mix(in srgb, contrast-color(var(--bg)) 80%, contrast-color(canvas))",
          opacity: "0.75",
          mixBlendMode: "plus-darker",
        }}
      >
        ❖
      </div>
    </div>
  );
}

function MacAppIconDemo() {
  return (
    <div className="squircle relative isolate flex size-24 items-center justify-center rounded-2xl bg-linear-to-b from-[#1F1E1E] to-[#0E0E0E] shadow-[inset_0px_-0.125px_0.6875px_-0.6875px_var(--color-white-alpha-400),_inset_0px_4px_0.33px_-3.75px_var(--color-white-alpha-400),_inset_0px_22px_5.5px_-17.5px_var(--color-white-alpha-200),_inset_-0.33px_-1.375px_0.6875px_-0.33px_var(--color-white-alpha-200),_inset_0.33px_1.3617px_0.6875px_-0.33px_var(--color-white-alpha-200),_inset_0px_0px_0.6875px_0.6875px_var(--border)] ring-[0.5px] ring-black/50 drop-shadow-lg drop-shadow-black/20">
      <div className="aspect-square size-14 bg-conic/decreasing from-(--color-red-300) via-(--color-lime-200) to-(--color-red-300) mask-[url(#mask-0)]" />
      <svg width={0} height={0} xmlns="http://www.w3.org/2000/svg" id="icon-0" className="absolute">
        <defs>
          <mask id="mask-0" maskContentUnits="objectBoundingBox">
            <path
              transform="scale(0.0666667)"
              fill="white"
              d="M9.84277 1.5C11.1153 1.5 11.7514 2.12445 11.7514 3.37352L11.7524 4.49789C13.7463 5.06059 15 6.67718 15 8.89037C15 11.6709 13.0314 13.5 10.1047 13.5H7.57481C5.3404 13.5 3.67027 12.4392 3.00082 10.7053L1.90865 10.7045C0.628807 10.7045 0 10.0874 0 8.83829V3.37352C0 2.12445 0.628807 1.5 1.90865 1.5H9.84277ZM7.57481 5.35134C5.29948 5.35134 3.75751 6.78616 3.75751 8.89037C3.75751 11.0019 5.29948 12.4294 7.57481 12.4294H10.1047C12.3727 12.4294 13.9222 11.0019 13.9222 8.89037C13.9222 6.78616 12.3727 5.35134 10.1047 5.35134H7.57481ZM10.2412 5.58564L10.3143 5.58918C11.2724 5.75272 11.7514 6.31779 11.7514 7.44792V8.82337C11.7514 10.1245 11.1153 10.7045 9.82039 10.7045H5.93565C5.49401 10.7045 5.33689 10.9498 5.4491 11.3067C5.51655 11.5149 5.35927 11.5669 5.19463 11.4331C5.00746 11.2621 4.65565 10.8904 4.65565 10.3773C4.65565 10.0056 4.95519 9.63389 5.56882 9.63389H9.8279C10.3667 9.63389 10.6661 9.34382 10.6661 8.77875V7.25469C10.6661 6.6004 10.5988 6.10217 10.1797 5.85687C10.0332 5.77755 10.0643 5.59838 10.2412 5.58564ZM1.92367 2.57806C1.38469 2.57806 1.07795 2.86052 1.07795 3.42559V8.77875C1.07795 9.34382 1.38469 9.63389 1.92367 9.63389L2.72886 9.63389C2.69635 9.39458 2.67971 9.14651 2.67971 8.89037C2.67971 6.11709 4.64078 4.28058 7.57481 4.28058H10.1047C10.2964 4.28058 10.484 4.28846 10.6672 4.30396L10.6661 3.42559C10.6661 2.86052 10.3592 2.57806 9.8279 2.57806H1.92367Z"
            />
          </mask>
        </defs>
      </svg>
    </div>
  );
}

function DeleteButtonDemo() {
  return (
    <button className="group relative flex h-button items-center gap-2 rounded-full bg-muted px-4 text-sm font-medium text-foreground outline -outline-offset-1 outline-border/50 transition-all duration-200 ease-out-quad select-none hover:bg-error hover:text-error-foreground active:scale-96">
      <div
        className="absolute inset-0 flex h-button items-center gap-2 rounded-[inherit] bg-destructive px-4 text-white transition-[clip-path,background,color] duration-300 ease-out [clip-path:inset(0_100%_0_0)] group-active:duration-2000 group-active:ease-out-quad group-active:[clip-path:inset(0_0_0_0)]"
        data-slot="inner"
      >
        <IconTrashFilled className="-ms-1 size-4 shrink-0" />
        Hold to delete
      </div>
      <IconTrash className="-ms-1 size-4 shrink-0" />
      Hold to delete
    </button>
  );
}

{
  /* <div>
          <h2>Icon Animations</h2>
          <p>
            I made these pixel sun and moon icons with the intention of animating between, but that doesn't make any sense. Pixels don't
            rotate*. I unflattened the paths and had the individual <Code variant="plain">rect</Code> elements animate between x/y
            positions.
          </p>
          <small className="text-right text-muted-foreground/50">Nor do they slide, but we're suspending disbelief on that count.</small>
          <p>
            This meant they both had to have the same number of <Code variant="plain">rect</Code> elements: 28 seemed to be the sweet spot.
            That's why the moon has a little star. Originally, the nearest neighbors animated toward each other, which made some parts of
            the icon resolve faster than others. You'd have some just hanging out doing nothing while the others were sprinting, so it felt
            odd. I tossed out Claude&apos;s little function and blindly chose pairs. There's something charming about the hand-crafted
            things.
          </p>

          <p>
            Then I saw <LinkOut href="https://benji.org/morphing-icons-with-claude" text="Benji's post" /> on morphing 3-line icons from one
            state to another, so I took a crack at that too. Much simpler than 28-rects.
          </p>
        </div> */
}
