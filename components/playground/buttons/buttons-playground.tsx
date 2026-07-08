"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionTemplate } from "motion/react";
import { DemoContainer } from "@/components/demo";
import { Button } from "@/components/ui/button";
import { PlaygroundSection } from "@/components/blocks/playground-section";
import { AnimatedButtonDemo } from "@/components/playground/controls/animated-button-demo";
import { CobotButtonDemo } from "@/components/playground/controls/cobot-button-demo";
import { DeleteButtonDemo } from "@/components/playground/controls/delete-button-demo";
import { MacAppIconDemo } from "@/components/playground/controls/mac-app-icon-demo";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { IconSearch } from "@tabler/icons-react";
import { CheckIcon } from "@/components/icons";

const buttonCopy = {
  idle: "Submit",
  loading: (
    <span className="flex shimmer items-center gap-2">
      <Loader /> Submitting…
    </span>
  ),
  success: (
    <span className="flex items-center gap-1.5">
      <CheckIcon className="size-3.5 **:animate-svg-draw **:[path-length:100] **:[stroke-dasharray:100_100] **:[stroke-dashoffset:100]" />
      Done!
    </span>
  ),
};

const variants = {
  hidden: { opacity: 0, translateY: "50%", blur: "2px" },
  hiddenUp: { opacity: 0, translateY: "-50%", blur: "2px" },
  idle: { opacity: 0, translateY: "-100%" },
  visible: { opacity: 1, translateY: "0%", blur: 0 },
};

export function ButtonsPlayground() {
  const [buttonState, setButtonState] = React.useState("idle");
  const [isLoading, setLoading] = React.useState(false);
  // const bg = useMotionTemplate`linear-gradient(to right, var(--button-bg), var(--button-bg-2))`;
  return (
    <div className="flex w-full flex-col gap-14">
      <PlaygroundSection id="buttons" title="Buttons">
        <DemoContainer
          caption="Loading button"
          variant="muted"
          centerContent
          className="lg:col-span-full"
          innerClass="space-y-4 text-xs text-muted-foreground text-start"
        >
          <div>
            <p className="mb-2">Default loading state with spinner</p>
            <Button
              variant="default"
              loading={isLoading}
              onClick={() => {
                setLoading(true);
                window.setTimeout(() => {
                  setLoading(false);
                }, 1750);
              }}
            >
              Submit
            </Button>
          </div>
          <div>
            <p className="mb-2">Custom loading state with confirmation</p>
            <Button
              variant="default"
              className={cn("w-3xs overflow-hidden")}
              onClick={() => {
                setButtonState("loading");
                window.setTimeout(() => {
                  setButtonState("success");
                }, 1750);
                window.setTimeout(() => {
                  setButtonState("idle");
                }, 3500);
              }}
            >
              {/* <motion.div
                className="absolute inset-0 bg-success-primary opacity-0 mix-blend-overlay transition-opacity duration-150"
                style={{
                  opacity: buttonState === "success" ? 1 : 0,
                }}
              /> */}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  initial={{ opacity: 0, y: buttonState === "idle" ? 25 : -25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: buttonState === "success" ? -25 : 25 }}
                  key={buttonState}
                >
                  {buttonCopy[buttonState as keyof typeof buttonCopy]}
                </motion.span>
              </AnimatePresence>
            </Button>
          </div>
        </DemoContainer>
        <DemoContainer caption="Hover effects" variant="muted" centerContent className="lg:col-span-full">
          <AnimatedButtonDemo />
        </DemoContainer>
        <DemoContainer caption="Metal button" variant="muted" centerContent className="lg:col-span-6">
          <CobotButtonDemo />
        </DemoContainer>
        <DemoContainer caption="Glass button" variant="muted" centerContent className="lg:col-span-6" innerClass="space-y-4 ">
          <Button variant="glass" rounded size="lg">
            Glass
          </Button>
          <InputGroup className="bg-glass max-w-3xs rounded-full border-0! outline-none!">
            <InputGroupAddon data-align="inline-start">
              <IconSearch />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search…" type="text" />
          </InputGroup>
        </DemoContainer>
        <DemoContainer caption="iOS 27 icon" variant="muted" centerContent className="lg:col-span-full" innerClass="bg-card dark">
          <MacAppIconDemo />
        </DemoContainer>
        <DemoContainer caption="Delete button" variant="muted" centerContent className="lg:col-span-full">
          <DeleteButtonDemo />
        </DemoContainer>
      </PlaygroundSection>
    </div>
  );
}
