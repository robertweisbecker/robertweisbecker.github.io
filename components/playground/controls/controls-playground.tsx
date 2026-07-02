"use client";

import { CodeBlock } from "@/components/code-block";
import { DemoContainer } from "@/components/demo";
import { PlaygroundSection } from "@/components/playground/playground-section";
import { AnchoredSliderDemo } from "@/components/playground/controls/anchored-slider-demo";
import { SliderDemo } from "@/components/playground/controls/slider-demo";
import { SwitchDemo } from "@/components/playground/controls/switch-demo";
import { TabsVariantsDemo } from "@/components/playground/controls/tabs-variants-demo";
import { ToggleVariantsDemo } from "@/components/playground/controls/toggle-variants-demo";

export function ControlsPlayground() {
  return (
    <div className="flex w-full flex-col gap-14">
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
    </div>
  );
}
