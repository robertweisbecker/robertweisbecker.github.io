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
        <DemoContainer caption="Loading button" variant="muted" centerContent className="lg:col-span-full">
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
        <DemoContainer caption="Hover effects" variant="muted" centerContent className="lg:col-span-full">
          <AnimatedButtonDemo />
        </DemoContainer>
        <DemoContainer caption="Metallic button" variant="muted" centerContent className="lg:col-span-full">
          <CobotButtonDemo />
        </DemoContainer>
        <DemoContainer caption="iOS 27 icon" variant="muted" centerContent className="lg:col-span-full" innerClass="bg-card dark">
          <MacAppIconDemo />
        </DemoContainer>
        <DemoContainer caption="Glass button" variant="muted" centerContent className="[var(--bg:var(--primary))] lg:col-span-full">
          <GlassButtonDemo />
          <Button variant="glass">Glass</Button>
        </DemoContainer>
        <DemoContainer caption="Delete button" variant="muted" centerContent className="lg:col-span-full">
          <DeleteButtonDemo />
        </DemoContainer>
      </PlaygroundSection>
    </div>
  );
}
