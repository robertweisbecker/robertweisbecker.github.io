"use client";

import { Demo } from "@/components/demo";
import { ChromeTabs } from "@/components/chrome-tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import * as React from "react";
import { Field, FieldLabel, FieldDescription, FieldContent, FieldTitle } from "@/components/ui/field";

function SwitchDemo() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Field orientation="horizontal" className="flex items-center gap-3">
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
      </div>

      <Demo title="Switch" centerContent>
        <SwitchDemo />
      </Demo>

      <Demo title="Slider" centerContent>
        <SliderDemo />
      </Demo>

      <Demo title="Chrome Tabs">
        <ChromeTabsDemo />
      </Demo>
    </div>
  );
}
