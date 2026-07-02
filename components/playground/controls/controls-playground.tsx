"use client";

import * as React from "react";
import { CodeBlock } from "@/components/code-block";
import { DemoContainer } from "@/components/demo";
import { Button } from "@/components/ui/button";
import { PlaygroundSection } from "@/components/playground/playground-section";
import { AnchoredSliderDemo } from "@/components/playground/controls/anchored-slider-demo";
import { AnimatedButtonDemo } from "@/components/playground/controls/animated-button-demo";
import { CobotButtonDemo } from "@/components/playground/controls/cobot-button-demo";
import { DeleteButtonDemo } from "@/components/playground/controls/delete-button-demo";
import { GlassButtonDemo } from "@/components/playground/controls/glass-button-demo";
import { MacAppIconDemo } from "@/components/playground/controls/mac-app-icon-demo";
import { SliderDemo } from "@/components/playground/controls/slider-demo";
import { SwitchDemo } from "@/components/playground/controls/switch-demo";
import { TabsVariantsDemo } from "@/components/playground/controls/tabs-variants-demo";
import { ToggleVariantsDemo } from "@/components/playground/controls/toggle-variants-demo";

export function ControlsPlayground() {
  const [isLoading, setLoading] = React.useState(false);

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
    </div>
  );
}
