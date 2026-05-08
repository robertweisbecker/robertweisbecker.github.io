"use client";

import { ColorSwatchGroup } from "@/components/color-swatch-group";
import { Demo } from "@/components/demo";
import { DeviceFrame } from "@/components/device-frame";
import { Favicon } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { ChromeTabs } from "@/components/chrome-tabs";
import { Code } from "@/components/ui/code";
import { CopyButton } from "@/components/ui/copy-button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import * as React from "react";
import { Field, FieldLabel, FieldDescription, FieldContent, FieldTitle } from "@/components/ui/field";
import { SiteSearch } from "@/components/site-search";
import { Input } from "@/components/ui/input";
import { LinkOut } from "@/components/link-out";

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
        <FieldContent>
          <FieldTitle>Label</FieldTitle>
          <FieldDescription>{checked ? "On" : "Off"}</FieldDescription>
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
    <ChromeTabs defaultValue="preview">
      <ChromeTabs.List>
        <ChromeTabs.Tab value="preview">Preview</ChromeTabs.Tab>
        <ChromeTabs.Tab value="code">Code</ChromeTabs.Tab>
        <ChromeTabs.Tab value="output">Output</ChromeTabs.Tab>
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

export default function ComponentPlaygroundPage() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-8">
      <div className="prose mx-auto w-full max-w-3xl">
        <p>Interactive demos of some components I thought were fun. Your mileage may vary.</p>

        <h2>Squishy</h2>
        <Demo title="Switch" centerContent>
          <SwitchDemo />
        </Demo>

        <Demo title="Slider" centerContent>
          <SliderDemo />
        </Demo>

        <h2>Curvy</h2>

        <Demo title="Chrome Tabs">
          <ChromeTabsDemo />
        </Demo>

        <h2>Raycast-y</h2>
        <Demo title="Site Search" centerContent>
          <SiteSearch className="w-full max-w-xs" />
        </Demo>

        <h2>Utilities</h2>

        <Demo title="Color swatch group" centerContent>
          <ColorSwatchGroupDemo />
        </Demo>

        <Demo title="Copy button">
          <div className="grid gap-2 md:grid-cols-2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-muted-foreground">Copy &quot;Hello, world!&quot;</span>
              <CopyButton value="Hello, world!" />
            </div>
            <Field className="max-w-3xs">
              <FieldLabel>Paste to test:</FieldLabel>
              <Input />
            </Field>
          </div>
        </Demo>

        <Demo title="Mode toggle" centerContent>
          <ModeToggle />
        </Demo>
        <h2>Devices</h2>
        <p>
          A remix of Geist's <LinkOut href="https://vercel.com/geist/phone" text="Phone" /> component. Responds to color mode and uses your
          device's clock and battery status.
        </p>
        <Demo title="Device frame — phone" overflowBehavior="resize" centerContent>
          <DeviceFrame.Phone island toolbar address="bob.fyi" gutter className="max-w-xs">
            <p className="flex items-center justify-center p-6 text-center text-sm">
              Preview content inside the frame. Use for screenshots, demos, or embedding app mockups.
            </p>
          </DeviceFrame.Phone>
        </Demo>

        <Demo title="Device frame — browser">
          <DeviceFrame.Browser address="bob.fyi">
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              <Favicon className="mr-2 size-4" />
              Browser frame preview
            </div>
          </DeviceFrame.Browser>
        </Demo>
      </div>
    </div>
  );
}
