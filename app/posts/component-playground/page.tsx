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
import { Input } from "@/components/ui/input";
import { LinkOut } from "@/components/link-out";
import { IconTrash, IconTrashFilled } from "@tabler/icons-react";
import { GithubIcon, VercelIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

const DEMO_SWATCHES = [
  { value: "var(--color-red-500)", label: "Red", color: "var(--color-red-500)" },
  { value: "var(--color-orange-400)", label: "Orange", color: "var(--color-orange-400)" },
  { value: "var(--color-yellow-300)", label: "Yellow", color: "var(--color-yellow-300)" },
  { value: "var(--color-green-500)", label: "Green", color: "var(--color-green-500)" },
  { value: "var(--color-blue-500)", label: "Blue", color: "var(--color-blue-500)" },
  { value: "var(--color-violet-500)", label: "Violet", color: "var(--color-violet-500)" },
  { value: "var(--color-pink-500)", label: "Pink", color: "var(--color-pink-500)" },
];

function ColorSwatchGroupDemo() {
  const [color, setColor] = React.useState("var(--color-blue-500)");

  return (
    <div className="space-y-3">
      <ColorSwatchGroup colors={DEMO_SWATCHES} value={color} onValueChange={setColor} />
      <p className="text-sm text-muted-foreground">
        Selected:{" "}
        <Code variant="plain" style={{ color }}>
          {color}
        </Code>
      </p>
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
            <AnimatePresence mode="popLayout">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, filter: "blur(1px)", x: checked ? -8 : 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                exit={{ opacity: 0, filter: "blur(1px)", x: checked ? -4 : 4 }}
                transition={{ duration: 0.2 }}
                key={checked ? "onText" : "offText"}
                style={{ color: checked ? "var(--success-foreground)" : "var(--error-foreground)" }}
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

function SliderDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Slider defaultValue={[40]} />
      <Slider defaultValue={[20, 70]} />
    </div>
  );
}

function ChromeTabsDemo() {
  return (
    <ChromeTabs defaultValue="preview" className="border border-border/50 dark:bg-black">
      <ChromeTabs.List>
        <ChromeTabs.Tab value="preview">
          <Avatar className="-mx-1 -ms-1.5 size-4.5 rounded-full">
            <AvatarImage src="https://github.com/robertweisbecker.png" alt="@shadcn" />
            <AvatarFallback>RW</AvatarFallback>
          </Avatar>
          Preview
        </ChromeTabs.Tab>
        <ChromeTabs.Tab value="code">
          <Avatar className="-mx-1 -ms-1.5 size-4.5 rounded-full">
            <GithubIcon className="size-4" />
          </Avatar>
          Code
        </ChromeTabs.Tab>
        <ChromeTabs.Tab value="output">
          <Avatar className="-mx-1 -ms-1.5 size-4.5 rounded-full">
            <VercelIcon className="size-3" />
          </Avatar>
          Deployment
        </ChromeTabs.Tab>
      </ChromeTabs.List>
      <ChromeTabs.Panel value="preview" className="p-4">
        <p className="text-sm text-muted-foreground">This is the preview panel.</p>
      </ChromeTabs.Panel>
      <ChromeTabs.Panel value="code" className="p-4">
        <p className="text-sm text-muted-foreground">This is the code panel.</p>
      </ChromeTabs.Panel>
      <ChromeTabs.Panel value="output" className="p-4">
        <p className="text-sm text-muted-foreground">This is the output panel.</p>
      </ChromeTabs.Panel>
    </ChromeTabs>
  );
}

function DeleteButtonDemo() {
  return (
    <div className="wrapper">
      <button className="group relative flex h-button items-center gap-2 rounded-full bg-muted px-4 text-sm font-medium text-foreground outline -outline-offset-1 outline-border/50 transition-all duration-100 ease-out-quad active:scale-98">
        <div
          className="absolute inset-0 flex h-button items-center gap-2 rounded-[inherit] bg-destructive px-4 text-white transition-[clip-path,background,color] duration-300 ease-out [clip-path:inset(0_100%_0_0)] group-active:duration-2000 group-active:ease-out-quad group-active:[clip-path:inset(0_0_0_0)]"
          data-slot="inner"
        >
          <IconTrashFilled className="-ms-1 size-4" />
          Hold to delete
        </div>
        <IconTrash className="-ms-1 size-4" />
        Hold to delete
      </button>
    </div>
  );
}

export default function ComponentPlaygroundPage() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-8">
      <div className="prose mx-auto w-full max-w-3xl">
        <p>Interactive demos of some components I thought were fun. Your mileage may vary.</p>

        <h2>Inputs</h2>
        <Demo title="Squishy thumbs" innerClass="flex flex-col gap-4">
          <SwitchDemo />
          <Separator />
          <SliderDemo />
        </Demo>

        <Demo title="Color swatches" centerContent>
          <ColorSwatchGroupDemo />
        </Demo>

        <h2>Clip-Path</h2>
        <Demo title="Delete button">
          <DeleteButtonDemo />
        </Demo>

        <Demo title="Chrome Tabs">
          <ChromeTabsDemo />
        </Demo>

        <h2>Motion</h2>
        <Demo title="Emoji feedback">
          <EmojiFeedbackDemo />
        </Demo>

        <Demo title="Mode toggle" centerContent>
          <ModeToggle />
        </Demo>
        <Demo title="Copy button">
          <div className="grid items-center justify-center gap-2 md:grid-cols-2">
            <div className="flex items-center gap-1">
              <span className="font-pixel text-2xs text-foreground">Copy &rarr;</span>
              <CopyButton value="Hello, world!" size="icon" variant="default" />
            </div>
            <Field className="max-w-3xs">
              <Input aria-label="Paste to test" placeholder="Paste here…" className="w-auto" />
            </Field>
          </div>
        </Demo>
        <h2>Site</h2>

        <Demo
          title="Mark"
          caption={
            <>
              A semi-realistic highlighter effect with <Code>corner-shape</Code>.
            </>
          }
          innerClass="space-y-4 text-sm/6 text-muted-foreground"
        >
          <p>
            A gray highlight? <mark>Boring!</mark>
          </p>

          <p>
            No worries, we can slap a <Code variant="plain">data-hue</Code> attribute on it. Let's do some classic highligter colors, like{" "}
            <mark data-hue="yellow">yellow</mark> or <mark data-hue="pink">pink</mark> or <mark data-hue="lime">lime</mark> or{" "}
            <mark data-hue="magenta">magenta</mark> or <mark data-hue="cyan">cyan</mark>.
          </p>

          <p>
            The highlight shape also plays nice with long strings.{" "}
            <mark data-hue="indigo">
              It's got{" "}
              <Code variant="plain" className="inline wrap-anywhere">
                box-decoration-clone
              </Code>{" "}
              applied to make the shape span line breaks.
            </mark>{" "}
            Notice how it also applied to the <Code variant="inline-component">code</Code> element too? I think that's a nice touch. Same
            with changing its background color, which you probably didn't notice.
          </p>
          <strong>Custom overrides</strong>
          <p>
            Don't like the default values? Override with classes, like this{" "}
            <mark className="text-foreground [--mark-bg:var(--color-gold-200)]">classic highlighter</mark> look.
          </p>
        </Demo>

        <Demo title="Site Search" centerContent innerClass="flex flex-col gap-2">
          <SiteSearch className="w-full max-w-xs" variant="input" />
        </Demo>

        <h2>Devices</h2>
        <p>
          A remix of Geist&apos;s <LinkOut href="https://vercel.com/geist/phone" text="Phone" /> component. Responds to color mode and uses
          your device&apos;s clock and battery level (non-iOS).
        </p>
        <Demo title="Device frame — phone" overflowBehavior="resize" centerContent>
          <DeviceFrame.Phone island toolbar address="bob.fyi" gutter className="max-w-xs">
            <p className="flex items-center justify-center p-6 text-center text-sm">
              Preview content inside the frame. Use for screenshots, demos, or embedding app mockups.
            </p>
          </DeviceFrame.Phone>
        </Demo>

        <Demo title="Device frame — browser" variant="outline">
          <DeviceFrame.Browser address="bob.fyi">
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              <Favicon className="mr-2 size-4" />
              Browser frame preview
            </div>
          </DeviceFrame.Browser>
        </Demo>
        <Demo title="Keys" centerContent innerClass="flex flex-col gap-2">
          <Kbd variant="elevated">⌘/</Kbd>
          <Kbd>⌘I</Kbd>
          <KbdGroup className="">
            <Kbd variant="big">⌘</Kbd>
            <Kbd variant="big">K</Kbd>
          </KbdGroup>
        </Demo>
      </div>
    </div>
  );
}
