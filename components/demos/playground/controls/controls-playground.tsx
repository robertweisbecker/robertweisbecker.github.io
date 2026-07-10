"use client";

import { CodeBlock } from "@/components/code-block";
import { DemoContainer } from "@/components/blocks/demo";
import { PlaygroundSection } from "@/components/blocks/playground-section";
import { AnchoredSliderDemo } from "@/components/demos/playground/controls/anchored-slider-demo";
import { SliderDemo } from "@/components/demos/playground/controls/slider-demo";
import { SwitchDemo } from "@/components/demos/playground/controls/switch-demo";
import { TabsVariantsDemo } from "@/components/demos/playground/controls/tabs-variants-demo";
import { ToggleGridDemo } from "@/components/demos/playground/controls/toggle-variants-demo";

export function ControlsPlayground() {
  return (
    <div className="flex w-full flex-col gap-14">
      <PlaygroundSection id="interaction-components" title="Controls">
        <DemoContainer title="Tabs" caption="Elevated, line, and pill variants" variant="muted" className="lg:col-span-full">
          <TabsVariantsDemo />
        </DemoContainer>
        <DemoContainer title="ToggleGrid" variant="muted" centerContent className="lg:col-span-full">
          <ToggleGridDemo />
        </DemoContainer>
        <DemoContainer title="Switch" variant="muted" centerContent className="lg:col-span-full">
          <div className="grid-stack aspect-square w-32">
            <SwitchDemo />
          </div>
        </DemoContainer>
        <DemoContainer
          title="Base UI + CSS-anchored value"
          variant="muted"
          centerContent
          innerClass="min-h-[300px]"
          className="lg:col-span-full"
        >
          <AnchoredSliderDemo />
        </DemoContainer>
        <DemoContainer title="Slider" variant="muted" centerContent className="lg:col-span-full">
          <SliderDemo />
        </DemoContainer>
        <DemoContainer caption="CodeBlock" variant="muted" centerContent className="lg:col-span-full lg:row-span-2">
          <CodeBlock
            code={`export function ButtonDemo() {\n  return <Button variant="elevated">Save</Button>;\n}`}
            language="tsx"
            filename="button-demo.tsx"
          />
        </DemoContainer>
      </PlaygroundSection>
    </div>
  );
}
