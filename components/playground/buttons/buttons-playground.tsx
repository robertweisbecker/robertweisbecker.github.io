"use client";

import * as React from "react";
import { DemoContainer } from "@/components/demo";
import { Button } from "@/components/ui/button";
import { PlaygroundSection } from "@/components/playground/playground-section";
import { AnimatedButtonDemo } from "@/components/playground/controls/animated-button-demo";
import { CobotButtonDemo } from "@/components/playground/controls/cobot-button-demo";
import { DeleteButtonDemo } from "@/components/playground/controls/delete-button-demo";
import { GlassButtonDemo } from "@/components/playground/controls/glass-button-demo";
import { MacAppIconDemo } from "@/components/playground/controls/mac-app-icon-demo";

export function ButtonsPlayground() {
  const [isLoading, setLoading] = React.useState(false);

  return (
    <div className="flex w-full flex-col gap-14">
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
