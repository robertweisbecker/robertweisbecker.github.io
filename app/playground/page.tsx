"use client";
import { ColorSwatchGroup } from "@/components/color-swatch-group";
import { Demo } from "@/components/demo";
import { DeviceFrame } from "@/components/device-frame";
import { Favicon } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { ChromeTabs } from "@/components/chrome-tabs";
import { EmojiFeedbackDemo } from "@/components/demos/emoji-feedback";
import { Code } from "@/components/ui/code";
import { CopyButton } from "@/components/ui/copy-button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import * as React from "react";
import { Field, FieldLabel, FieldDescription, FieldContent, FieldTitle } from "@/components/ui/field";
import { SiteSearch } from "@/components/site-search";
import { LinkOut } from "@/components/link-out";
import { IconTrash, IconTrashFilled } from "@tabler/icons-react";
import { GithubIcon, VercelIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion, useMotionValue, useMotionTemplate, useTransform, useSpring } from "framer-motion";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { Slider as BaseSlider } from "@base-ui/react";
import { MorphIcon } from "@/components/morph-icon";
import { Toggle } from "@/components/ui/toggle";
import { ColorCode } from "@/components/ui/color-code";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function PlaygroundPage() {
  const [morphIcon, setMorphIcon] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  return (
    <div className="mx-auto flex flex-col items-center gap-6">
      <div className="sr-only">
        <h1 className="text-h1">Playground</h1>
      </div>

      <div className="flex w-full flex-col gap-8">
        <div className="grid gap-4 lg:grid-cols-8">
          <Demo caption="<ChromeTabs>" className="lg:col-span-4 lg:row-span-2" centerContent>
            <ChromeTabsDemo />
          </Demo>
          <Demo caption="Motion chart ∙ Hover to animate" centerContent className="lg:col-span-2">
            <ChartDemo />
          </Demo>
          <Demo caption="ColorCode ∙ Click to copy" centerContent className="lg:col-span-2">
            <ColorCode value="#0b0b0b" />
          </Demo>

          <Demo caption="ColorSwatchGroup" centerContent className="lg:col-span-2">
            <ColorSwatchGroupDemo />
          </Demo>

          <Demo caption="Base UI slider with CSS-anchored value" centerContent innerClass="min-h-[280px]" className="lg:col-span-2">
            <AnchoredSliderDemo />
          </Demo>

          <Demo centerContent className="lg:col-span-2">
            <SliderDemo />
          </Demo>

          <Demo centerContent className="lg:col-span-2">
            <div className="grid-stack aspect-square w-32">
              <SwitchDemo />
            </div>
          </Demo>

          <Demo caption="Delete button" centerContent className="lg:col-span-2">
            <DeleteButtonDemo />
          </Demo>

          <Demo caption="Animated button" centerContent className="lg:col-span-2">
            <AnimatedButtonDemo />
          </Demo>
          <Demo caption="Loading button" centerContent className="lg:col-span-2">
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
          </Demo>

          <Demo caption="Icon swap + deduplicated inline toast" centerContent>
            <CopyButton value="Hello, world!" size="icon" variant="ghost" />
          </Demo>

          <Demo caption="Mode toggle + pixel icon rearrange" centerContent>
            <ModeToggle />
          </Demo>

          <Demo caption="Toggle + SVG line morph" centerContent>
            <Toggle pressed={morphIcon} onPressedChange={() => setMorphIcon((prev) => !prev)}>
              <MorphIcon from="filter" to="chevronRight" active={morphIcon} />
            </Toggle>
          </Demo>
          <Demo caption="Remix of Vercel's Emoji Feedback component" className="lg:col-span-full">
            <EmojiFeedbackDemo />
          </Demo>
          <Demo title="Mark" innerClass="space-y-2 text-sm/6 text-muted-foreground">
            <p>
              The default mark styling is{" "}
              <mark className="bg-blend-none m-0 rounded-none bg-[mark] bg-none p-0 text-[markText] shadow-none text-shadow-none">
                dated
              </mark>
              . Let's make the shape a bit more <mark>realistic</mark> with <Code variant="inline">corner-shape</Code>.
            </p>

            <p>
              Then slap a <Code variant="plain">data-hue</Code> attribute on it for some classic highligter colors, like{" "}
              <mark data-hue="yellow">yellow</mark> or <mark data-hue="pink">pink</mark> or <mark data-hue="lime">lime</mark> or{" "}
              <mark data-hue="magenta">magenta</mark> or <mark data-hue="cyan">cyan</mark>.
            </p>
          </Demo>
          <Demo title="Mark II" innerClass="space-y-4 text-sm/6 text-muted-foreground">
            <p>
              The highlight shape also plays nice with long strings.{" "}
              <mark data-hue="indigo">
                It&apos;s got{" "}
                <Code variant="plain" className="inline wrap-anywhere">
                  box-decoration-break: clone
                </Code>{" "}
                applied to make the shape span line breaks.
              </mark>{" "}
              Notice how the nested <Code variant="inline-component">code</Code>&nbsp;inherited a little treatment too? I think that&apos;s
              a nice touch.
            </p>
          </Demo>
          <Demo title="Mark III" innerClass="space-y-4 text-sm/6 text-muted-foreground">
            <strong>Custom overrides</strong>
            <p>
              Don&apos;t like the default values? Override with classes, like this{" "}
              <mark className="text-foreground [--mark-bg:var(--color-gold-200)]">classic highlighter</mark> look.
            </p>
          </Demo>
          <Demo title="Keys" centerContent innerClass="flex flex-col gap-2">
            <Kbd variant="elevated">⌘/</Kbd>
            <Kbd>⌘I</Kbd>
            <KbdGroup className="">
              <Kbd variant="big">⌘</Kbd>
              <Kbd variant="big">K</Kbd>
            </KbdGroup>
          </Demo>
          <Demo title="Site Search" centerContent className="lg:col-span-full">
            <SiteSearch className="w-full max-w-xs" variant="input" />
          </Demo>
          <Demo title="DeviceFrame / Phone" overflowBehavior="resize" centerContent className="lg:col-span-4">
            <DeviceFrame.Phone island toolbar address="bob.fyi" gutter className="max-w-xs">
              <div className="flex items-center justify-center p-6 text-center text-sm">
                <p>
                  A remix of Geist&apos;s <LinkOut href="https://vercel.com/geist/phone" text="Phone" /> component. Responds to color mode
                  and uses your device&apos;s clock and battery level (non-iOS).
                </p>
              </div>
            </DeviceFrame.Phone>
          </Demo>
          <Demo title="DeviceFrame / Browser" variant="outline" className="lg:col-span-4" centerContent overflowBehavior="resize">
            <DeviceFrame.Browser address="bob.fyi">
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                <Favicon className="mr-2 size-4" />
                Browser frame preview
              </div>
            </DeviceFrame.Browser>
          </Demo>
        </div>
      </div>
    </div>
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
      <p className="w-[240px] text-xs text-muted-foreground">
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
      <ChromeTabs.Panel value="preview" className="overflow-hidden p-4">
        <motion.div
          initial={{ y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: 4 }}
          className="grid-stack border border-dashed border-primary bg-secondary p-10 font-pixel text-[11px] text-secondary-foreground uppercase"
        >
          You are here &darr;
        </motion.div>
      </ChromeTabs.Panel>
      <ChromeTabs.Panel value="code" className="overflow-hidden p-4">
        <motion.div
          initial={{ y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: 4 }}
          className="grid-stack border border-dashed border-destructive bg-error p-10 font-pixel text-[11px] text-error-foreground uppercase"
        >
          Down for maintenance
        </motion.div>
      </ChromeTabs.Panel>
      <ChromeTabs.Panel value="output" className="overflow-hidden p-4">
        <motion.div
          initial={{ y: 4 }}
          animate={{ y: 0 }}
          exit={{ y: 4 }}
          className="grid-stack border border-dashed border-info-primary bg-info p-10 text-center font-pixel text-[11px] text-info-foreground uppercase"
        >
          <p>
            Designers should <s>code</s> tweet.
          </p>
        </motion.div>
      </ChromeTabs.Panel>
    </ChromeTabs>
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
