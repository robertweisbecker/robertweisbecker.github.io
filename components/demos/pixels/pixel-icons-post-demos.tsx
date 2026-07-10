"use client";

import { CodeBlock } from "@/components/code-block";
import * as PixelIcons from "@/components/icons/pixel";
import { PixelMorph, type PixelMorphAnimation } from "@/components/pixel-morph";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { IconMoon, IconPlayerPlayFilled, IconSun } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

const iconComponents = PixelIcons as Record<PixelIcons.MorphablePixelIconName, React.ComponentType<React.ComponentProps<"svg">>>;

const collator = new Intl.Collator("en", { sensitivity: "base" });
const sortedMorphableIconNames = [...PixelIcons.morphablePixelIconNames].sort((a, b) =>
  collator.compare(formatIconName(a), formatIconName(b))
);

const inspectedIcons: PixelIcons.MorphablePixelIconName[] = [
  "PixelPenToolIcon",
  "PixelClipboardCheckIcon",
  "PixelFolderIcon",
  "PixelSunSmallIcon",
  "PixelMoon2Icon",
];

const animationOptions: {
  animation: PixelMorphAnimation;
  label: string;
  description: string;
}[] = [
  {
    animation: "linear",
    label: "Linear",
    description: "Every pixel travels at the same pace. It is the plainest version, which makes the rearrangement easy to inspect.",
  },
  {
    animation: "ease",
    label: "Ease",
    description: "A softer UI-style movement. Pixels ease into place instead of landing with a completely mechanical rhythm.",
  },
  {
    animation: "spring",
    label: "Spring",
    description: "A snappier state-change feel. Springs are not duration based, so this one stays a little more eager than the others.",
  },
];

function formatIconName(name: string) {
  return name
    .replace(/^Pixel/, "")
    .replace(/Icon$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
}

function replay(setActive: React.Dispatch<React.SetStateAction<boolean>>) {
  setActive(false);
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => setActive(true));
  });
}

export function DepartureMonoSymbolDemo() {
  const glyphs = [
    "❰",
    "❮",
    "❬",
    "‹",
    "<",
    "×",
    "❱",
    "❯",
    "❭",
    "↖",
    "←",
    "↑",
    "→",
    ">",
    "›",
    "↓",
    "↗",
    "↘",
    "↙",
    "↕",
    "↰",
    "↱",
    "↲",
    "↳",
    "↴",
    "↵",
    "★",
    "☆",
    "♥",
    "♦",
    "✦",
    "✧",
    "√",
  ];

  return (
    <div className="mx-auto grid grid-cols-8 place-content-center gap-1 font-pixel text-2xs">
      {glyphs.map((glyph) => (
        <span
          key={glyph}
          className="grid aspect-square size-8 place-items-center rounded border font-pixel text-[22px]/none text-foreground"
          aria-label={`Departure Mono ${glyph}`}
        >
          {glyph}
        </span>
      ))}
    </div>
  );
}

export function DepartureMonoTextDemo() {
  const sizes = [
    { label: "11px", textClassName: "text-[11px]/none" },
    { label: "16.5px", textClassName: "text-[16.5px]/none" },
    { label: "22px", textClassName: "text-[22px]/none" },
  ];

  return (
    <div className="space-y-5 text-center">
      {sizes.map((size) => (
        <div key={size.label} className={cn("flex items-center gap-2 font-pixel text-foreground", size.textClassName)}>
          <span>★ {size.label}</span>
          <span className="text-muted-foreground">icon beside text</span>
        </div>
      ))}
    </div>
  );
}

export function TablerRotationIdeaDemo() {
  const [dark, setDark] = React.useState(false);
  const Icon = dark ? IconMoon : IconSun;

  return (
    <div className="grid place-items-center gap-2">
      <Button type="button" size="icon-lg" onClick={() => setDark((value) => !value)} aria-label="Toggle icon">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ rotate: dark ? 45 : -90, scale: 0.82, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: dark ? 90 : -90, scale: dark ? 0.5 : 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="grid place-items-center"
          >
            <Icon aria-hidden />
          </motion.span>
        </AnimatePresence>
      </Button>
      <p className="text-center text-xs text-muted-foreground">Tabler + Motion</p>
    </div>
  );
}

export function PixelSunMoonMorphDemo() {
  const [active, setActive] = React.useState(false);

  return (
    <div className="grid grid-cols-2 gap-3">
      <TablerRotationIdeaDemo />

      <div className="grid place-items-center gap-2">
        <Button type="button" size="icon-lg" onClick={() => setActive((value) => !value)} aria-label="Toggle pixel sun and moon">
          <PixelMorph
            from="PixelSunSmallIcon"
            to="PixelMoon2Icon"
            active={active}
            animation="ease"
            strategy="radial"
            duration={0.25}
            stagger={0.01}
            scale={1.5}
          />
        </Button>
        <p className="text-center text-xs text-muted-foreground">Pixels</p>
      </div>
    </div>
  );
}

export function MorphablePixelIconScrollDemo() {
  return (
    <div className="grid grid-cols-8 gap-1 sm:grid-cols-12 md:grid-cols-16">
      {sortedMorphableIconNames.map((name) => {
        const Icon = iconComponents[name];

        return (
          <div key={name} title={formatIconName(name)} className="grid aspect-square place-items-center rounded-md border text-foreground">
            <Icon className="size-[16.5px]" aria-hidden />
          </div>
        );
      })}
    </div>
  );
}

export function PixelIconDataInspectorDemo() {
  const [selectedIcon, setSelectedIcon] = React.useState<PixelIcons.MorphablePixelIconName>("PixelPenToolIcon");
  const data = PixelIcons.pixelIconData[selectedIcon];
  const code = `createPixelIcon(\n  "${selectedIcon}",\n  ${data.width},\n  ${data.height},\n  "${data.data}")`;

  return (
    <div className="grid grid-cols-[auto_1fr] gap-2">
      <ToggleGroup
        value={[selectedIcon]}
        onValueChange={(next) => {
          const nextValue = Array.isArray(next) ? next[0] : next;
          if (nextValue) {
            setSelectedIcon(nextValue as PixelIcons.MorphablePixelIconName);
          }
        }}
        spacing={0.25}
        orientation="vertical"
        variant="elevated"
        aria-label="Choose pixel icon data"
        className="p-px"
      >
        {inspectedIcons.map((name) => {
          const OptionIcon = iconComponents[name];

          return (
            <ToggleGroupItem key={name} value={name} aria-label={formatIconName(name)} className="justify-start">
              <OptionIcon data-icon="inline-start" className="size-[16.5px]" aria-hidden />
              <span className="truncate whitespace-nowrap">{formatIconName(name)}</span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      <CodeBlock code={code} language="tsx" filename={`${selectedIcon}.tsx`} className="min-w-0" />
    </div>
  );
}

export function PixelAnimationOptionsDemo() {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {animationOptions.map((option) => (
        <AnimationOptionCard {...option} key={option.animation} />
      ))}
    </div>
  );
}

function AnimationOptionCard({ animation, label, description }: { animation: PixelMorphAnimation; label: string; description: string }) {
  const [active, setActive] = React.useState(false);

  return (
    <Card variant="muted" size="sm">
      <CardContent className="grid gap-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="font-medium text-foreground">{label}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <Button type="button" size="icon-sm" variant="ghost" onClick={() => replay(setActive)} aria-label={`Play ${label}`}>
            <IconPlayerPlayFilled />
          </Button>
        </div>
        <div className="grid h-20 place-items-center rounded-lg bg-background text-foreground shadow-border-xs">
          <PixelMorph
            from="PixelCopyIcon"
            to="PixelClipboardCheckIcon"
            active={active}
            animation={animation}
            strategy="nearest"
            duration={0.8}
            stagger={0.02}
            scale={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
