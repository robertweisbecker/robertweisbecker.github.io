"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import {
  IconArrowMoveLeft,
  IconArrowMoveRight,
  IconEye,
  IconEyeOff,
  IconLayoutAlignCenter,
  IconLayoutAlignLeft,
  IconLayoutAlignRight,
} from "@tabler/icons-react";
import { useState, type ReactNode } from "react";

import { CodeBlock } from "@/components/code-block";
import { DemoContainer } from "@/components/blocks/demo";
import { InfoIcon } from "@/components/icons";
import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Code } from "@/components/ui/code";
import { DataList } from "@/components/ui/data-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const baseButton =
  "relative inline-flex tabular-nums -mx-px h-button w-fit items-center justify-center rounded-md border border-dashed  px-4 text-sm font-medium text-muted-foreground hover:border-input data-pressed:border-solid data-pressed:border-input data-pressed:bg-muted data-pressed:text-foreground";

const afterTransition =
  "after:pointer-events-none after:transition-[transform,translate,opacity,background-color,width] after:duration-200 after:ease-out";

const numbers = ["1", "2", "3"];
const colorClasses = ["text-red-500!", "text-green-600!", "text-blue-500!"];
const staggerOffsets = [
  "after:top-0 after:mb-5 data-pressed:after:opacity-20",
  "mt-10 after:top-0 data-pressed:after:opacity-20",
  "mt-20 after:top-0 data-pressed:after:opacity-20",
];

const tabTriggerIndicatorClasses = cn(
  "peer relative isolate min-w-0 font-medium text-sm text-muted-foreground",
  "inline-flex min-h-button items-center justify-center rounded-lg px-3 hover:text-accent-foreground data-active:text-foreground",
  afterTransition,
  "after:absolute after:inset-0 after:-z-1 after:origin-right after:translate-x-full after:rounded-[inherit] data-active:after:bg-current/5",
  "data-[active]:after:translate-x-0 peer-data-[active]:after:-translate-x-full after:max-w-full not-data-active:overflow-hidden peer-data-[active]:overflow-visible after:opacity-0 data-active:after:opacity-100"
);

const underlineTabTriggerClasses = cn(
  "peer relative isolate min-w-0 font-medium text-sm",
  "inline-flex min-h-button  items-center justify-center px-3 text-muted-foreground hover:text-foreground data-active:text-foreground",
  afterTransition,
  "after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-right after:translate-x-full after:rounded-full after:bg-primary after:opacity-0 after:w-1/2",
  "data-[active]:after:translate-x-0 data-[active]:after:opacity-100 peer-data-[active]:after:-translate-x-full peer-data-[active]:after:origin-left data-[active]:after:w-full data-[active]:after:origin-right",
  "not-data-active:overflow-hidden peer-data-[active]:after:overflow-visible"
);

const verticalTabTriggerClasses = cn(
  "peer relative isolate min-w-0 font-medium text-sm",
  "inline-flex min-h-button items-center justify-start rounded-lg px-3 hover:text-accent-foreground data-active:text-foreground",
  afterTransition,
  "after:absolute after:inset-0 after:-z-1 after:origin-bottom after:translate-y-full after:rounded-[inherit] data-active:after:bg-current/5",
  "data-[active]:after:translate-y-0 data-[active]:after:opacity-100 peer-data-[active]:after:-translate-y-full peer-data-[active]:after:origin-top",
  "after:opacity-0 not-data-active:overflow-hidden peer-data-[active]:after:overflow-visible"
);

function demoCode(value: string) {
  const collapsible = value.trim().split("\n").length > 8;

  return {
    language: "tsx" as const,
    value,
    collapsible,
    initialHeight: collapsible ? 180 : undefined,
  };
}

const parkedButtonCode = `"after:absolute after:inset-0"
"after:translate-x-full after:origin-right"`;

const activeButtonCode = `"after:transition-[translate,opacity] after:duration-200 after:ease-out"
"after:translate-x-full after:origin-right"
"active:after:translate-x-0"`;

const peerSwapCode = `"peer" // on the previous trigger

"after:translate-x-full after:origin-right"
"peer-data-pressed:after:-translate-x-full"
"peer-data-pressed:after:origin-left"
"data-pressed:after:translate-x-0"`;

const fadeSwapCode = `"after:translate-x-full after:origin-right after:opacity-0"
"after:transition-[translate,opacity] after:duration-200 after:ease-out"
"peer-data-pressed:after:-translate-x-full peer-data-pressed:after:origin-left"
"data-pressed:after:translate-x-0 data-pressed:after:opacity-100"`;

const allTriggersCode = `"peer"
"after:translate-x-full after:origin-right after:opacity-0"
"peer-data-pressed:after:-translate-x-full"
"data-pressed:after:translate-x-0 data-pressed:after:opacity-100"`;

const singleColorCode = `"peer"
"after:bg-current/5 after:opacity-0"
"data-pressed:after:opacity-100"`;

const finalTabsCode = `const tabTriggerClasses = cn(
  "peer relative isolate min-w-0 font-medium text-sm text-muted-foreground",
  "inline-flex min-h-button items-center justify-center rounded-lg px-3 hover:text-accent-foreground data-active:text-foreground",
  "after:pointer-events-none after:transition-[translate,opacity,background-color] after:duration-200 after:ease-out",
  "after:absolute after:inset-0 after:-z-1 after:origin-right after:translate-x-full after:rounded-[inherit] data-active:after:bg-current/5",
  "data-[active]:after:translate-x-0 peer-data-[active]:after:-translate-x-full after:opacity-0 data-active:after:opacity-100",
  "not-data-active:overflow-hidden peer-data-[active]:overflow-visible"
);

<Tabs.Root defaultValue="1" className="w-full rounded-xl border p-1">
  <Tabs.List className="flex overflow-hidden">
    {["1", "2", "3"].map((value) => (
      <Tabs.Tab key={value} value={value} className={tabTriggerClasses}>
        Tab {value}
      </Tabs.Tab>
    ))}
  </Tabs.List>
  <Tabs.Panel value="1">#1</Tabs.Panel>
  <Tabs.Panel value="2">#2</Tabs.Panel>
  <Tabs.Panel value="3">#3</Tabs.Panel>
</Tabs.Root>`;

const underlineTabsCode = `- // after:inset-0 after:bg-current/5
+ after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-primary`;

const verticalTabsCode = `- // after:origin-right after:translate-x-full
- // peer-data-[active]:after:-translate-x-full
- // data-[active]:after:translate-x-0
+ after:origin-bottom after:translate-y-full
+ peer-data-[active]:after:-translate-y-full peer-data-[active]:after:origin-top
+ data-[active]:after:translate-y-0`;

const agentInstructions = `Goal: fake a moving tab indicator without a shared Indicator element.

Use one pseudo-indicator per trigger:
- Put each trigger in a peer chain.
- Make the trigger relative and isolated.
- Draw the indicator with ::after.
- Hide overflow on inactive triggers so parked indicators do not leak.

::after base:
- Position absolute inside the trigger.
- Match the shape you want: inset-0 for a pill, bottom + h-0.5 for an underline, inset-y for vertical pills.
- Set pointer-events none, rounded inherit, opacity 0, and a transform/translate transition.

Horizontal direction:
- Default parked state is translate-x-full with origin-right.
- Active state is translate-x-0 and opacity 100.
- Previous-active handoff uses peer-data-[active]:after:-translate-x-full and origin-left.

Vertical direction:
- Swap x utilities for y utilities.
- Default parked state is translate-y-full with origin-bottom.
- Previous-active handoff uses peer-data-[active]:after:-translate-y-full and origin-top.

Stacking and color:
- Put the indicator behind content with -z-1 and isolate the trigger.
- Keep every trigger's indicator color identical for the single-indicator illusion.
- If the indicator flashes at edges, delay opacity/background-color slightly.`;

function PseudoElementReadout({
  state,
  fields = ["visibility", "location", "origin"],
}: {
  state: {
    visibility: string;
    location: string;
    origin: string;
  };
  fields?: string[];
}) {
  return (
    <DataList.Root
      orientation="horizontal"
      size="sm"
      aria-label={`Pseudo-element ${state.visibility}, ${state.location} its owner, origin ${state.origin}`}
      className="pointer-events-none justify-self-start"
    >
      {fields.includes("visibility") ? (
        <DataList.Item>
          <DataList.Label>Visibility</DataList.Label>
          <DataList.Value>
            <Badge variant="secondary">
              {state.visibility === "visible" ? <IconEye aria-hidden /> : <IconEyeOff aria-hidden />}
              {state.visibility}
            </Badge>
          </DataList.Value>
        </DataList.Item>
      ) : null}
      {fields.includes("location") ? (
        <DataList.Item>
          <DataList.Label>Location</DataList.Label>
          <DataList.Value>
            <Badge variant="secondary">
              {state.location === "before" ? <IconLayoutAlignRight aria-hidden /> : null}
              {state.location === "centered" ? <IconLayoutAlignCenter aria-hidden /> : null}
              {state.location === "after" ? <IconLayoutAlignLeft aria-hidden /> : null}
              {state.location}
            </Badge>
          </DataList.Value>
        </DataList.Item>
      ) : null}
      {fields.includes("origin") ? (
        <DataList.Item>
          <DataList.Label>Origin</DataList.Label>
          <DataList.Value>
            <Badge variant="secondary">
              {state.origin === "left" ? <IconArrowMoveRight aria-hidden /> : <IconArrowMoveLeft aria-hidden />}
              {state.origin}
            </Badge>
          </DataList.Value>
        </DataList.Item>
      ) : null}
    </DataList.Root>
  );
}

function getTargetReadout(
  value: string[],
  defaultState: { visibility: string; location: string; origin: string },
  beforeOrigin = defaultState.origin
) {
  if (value.includes("2")) {
    return { visibility: "visible", location: "centered", origin: "right" };
  }

  if (value.includes("1")) {
    return { ...defaultState, location: "before", origin: beforeOrigin };
  }

  return defaultState;
}

function TraceToggle({ value, color, offset, children }: { value: string; color?: string; offset?: string; children: ReactNode }) {
  return (
    <TogglePrimitive
      value={value}
      className={cn(
        afterTransition,
        baseButton,
        "peer relative",
        color,
        offset,
        "after:pointer-events-none after:absolute after:inset-x-0 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current after:text-current after:opacity-10 after:select-none not-data-pressed:after:-z-1",
        "peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full",
        "data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0"
      )}
    >
      {children}
    </TogglePrimitive>
  );
}

function MatchingToggle({ value, children }: { value: string; children: ReactNode }) {
  return (
    <TogglePrimitive
      value={value}
      className={cn(
        afterTransition,
        baseButton,
        "peer relative border-0 bg-transparent!",
        "after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current/5 after:text-current after:opacity-0 after:select-none not-data-pressed:after:-z-1",
        "peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full",
        "data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0 data-pressed:after:opacity-100"
      )}
    >
      {children}
    </TogglePrimitive>
  );
}

function NumberPanels() {
  return (
    <>
      {numbers.map((value) => (
        <TabsPrimitive.Panel key={value} value={value}>
          <div className="flex size-full items-center justify-center rounded-md bg-muted/50 p-4 text-4xl font-bold text-muted-foreground/50 tabular-nums group-data-[orientation=horizontal]:mt-2">
            #{value}
          </div>
        </TabsPrimitive.Panel>
      ))}
    </>
  );
}

export default function TabIndicatorPostPage() {
  const [activeDemoPressed, setActiveDemoPressed] = useState(false);
  const [peerDemoValue, setPeerDemoValue] = useState<string[]>([]);
  const [fadeDemoValue, setFadeDemoValue] = useState<string[]>(["1"]);
  const [allTriggersValue, setAllTriggersValue] = useState<string[]>(["1"]);

  return (
    <div className="prose mx-auto w-full max-w-3xl">
      <p>
        Inspired by a tweet about Radix UI tabs not supporting a dynamic indicator like Base UI, I had an idea to fake one with Tailwind
        trickery. It mostly works.
      </p>

      <p>Here&apos;s the end result:</p>

      <DemoContainer title="Demo" centerContent innerClass="grid gap-4 w-full">
        <TabsPrimitive.Root defaultValue="1" className="w-full rounded-xl border p-1">
          <TabsPrimitive.List className="flex w-full overflow-hidden">
            {numbers.map((value) => (
              <TabsPrimitive.Tab key={value} value={value} className={tabTriggerIndicatorClasses}>
                Tab {value}
              </TabsPrimitive.Tab>
            ))}
          </TabsPrimitive.List>
          <div className="mt-2 w-full text-center">
            <NumberPanels />
          </div>
        </TabsPrimitive.Root>
      </DemoContainer>

      <p>
        Sure, this is trivial with Motion or Base UI, but if you&apos;re using Radix or have a component library that doesn&apos;t support
        this, you can spruce up your tabs with a little CSS. Here we&apos;re using Tailwind for expediency, but plain old CSS will do the
        trick. No additional JavaScript required.
      </p>
      <p>
        The trick is to animate an <code>::after</code> element on each trigger, then use adjacent sibling selectors to reposition the
        indicators when a given trigger is active.
      </p>
      <p>
        Basically, we want each tab to have its own indicator element. When the tab is active, the indicator lines up with its parent. And
        when a different tab is active, we move the indicator to line up with <em>that</em> tab.
      </p>

      <DemoContainer title="Synchronization" centerContent innerClass="min-h-56">
        <ToggleGroupPrimitive defaultValue={["1"]} className="isolate flex -rotate-15 skew-x-15 justify-center gap-0">
          {numbers.map((value, index) => (
            <TraceToggle key={value} value={value} color={colorClasses[index]} offset={staggerOffsets[index]}>
              Trigger {value}
            </TraceToggle>
          ))}
        </ToggleGroupPrimitive>
      </DemoContainer>
      <p>
        If we sync them up correctly, the active tab&apos;s indicator will move toward the new tab at the same time the new tab&apos;s
        indicator does. When the two indicators meet, we crossfade them, and it looks like as if a single indicator is moving between
        siblings.
      </p>

      <p>Here&apos;s that same example unskewed, so you can see how they overlap when adjacent siblings are selected:</p>
      <DemoContainer title="Handoff" centerContent innerClass="pb-16">
        <ToggleGroupPrimitive defaultValue={["1"]} className="isolate flex justify-center gap-0">
          {numbers.map((value, index) => (
            <TraceToggle key={value} value={value} color={colorClasses[index]} offset="after:top-10 data-pressed:after:opacity-20">
              Trigger {value}
            </TraceToggle>
          ))}
        </ToggleGroupPrimitive>
      </DemoContainer>
      <p>
        Thankfully, Tailwind has an abstraction for this kind of thing: <code>group</code> and <code>peer</code>. We can use these classes
        to make adjacent triggers &quot;hand off&quot; the indicator from one trigger to another by flipping the animation direction based
        on whether the previous trigger is active or not.
      </p>

      <Separator />

      <Heading level={2}>Step-by-step</Heading>
      <p>
        Before we do anything, let&apos;s consider the possible positions for the indicator. We&apos;re trying to animate the indicator in
        from the left when a previous tab is active, and in from the right when a later tab is active. So, we have three possible positions:
      </p>
      <ol className="mb-4">
        <li>Active: lined up with its trigger</li>
        <li>If a previous sibling is active: lined up with trigger&apos;s previous sibling</li>
        <li>If a later sibling is active: lined up with the trigger&apos;s next sibling</li>
      </ol>

      <pre className="overflow-x-auto border bg-transparent font-mono text-[11px] leading-none whitespace-pre text-foreground">
        {`
   ░░2░░ ←----          │     ---→ ▒▒2▒▒ ←----   │         ---→  ░░2░░
                        │                        │                    
   ╔═══╗ ┌ ─ ┐ ┌ ─ ┐    │    ┌ ─ ┐ ╔═══╗ ┌ ─ ┐   │   ┌ ─ ┐ ┌ ─ ┐ ╔═══╗
   ║ 1 ║ | 2 | | 3 |    │    │ 1 │ ║ 2 ║ │ 3 │   │   │ 1 │ │ 2 │ ║ 3 ║
   ╚═══╝ └ ─ ┘ └ ─ ┘    │    └ ─ ┘ ╚═══╝ └ ─ ┘   │   └ ─ ┘ └ ─ ┘ ╚═══╝

   1 active;                  2 active;               3 active;
   indicator 2 moves left     indicator centered      indicator 2 moves right`}
      </pre>

      <p>
        To start off, we&apos;ll create an indicator as a pseudo-element on our trigger, and park it past the right edge of our trigger with{" "}
        <code>translate-x-full</code>. When active, we also want the indicator to slide in from the right, so we set{" "}
        <code>origin-right</code> on its initial state.
      </p>
      <DemoContainer title="Park the pseudo-element" code={demoCode(parkedButtonCode)} centerContent>
        <ButtonPrimitive
          className={`${baseButton} after:absolute after:inset-0 after:grid-stack after:origin-right after:translate-x-full after:rounded-[inherit] after:outline-2 after:outline-offset-1 after:outline-primary`}
        >
          Trigger
        </ButtonPrimitive>
      </DemoContainer>
      <p>
        Next, target the active/pressed state. We&apos;ll snap <code>translateX</code> back to <code className="whitespace-nowrap">0</code>{" "}
        when the trigger is pressed. This moves the indicator atop our trigger on click. Be sure to add some duration and easing to the
        transformation.
      </p>

      <DemoContainer title="Active state snaps into place" code={demoCode(activeButtonCode)} centerContent>
        <div className="grid min-h-40 place-items-center gap-8">
          <ButtonPrimitive
            type="button"
            onPointerDown={() => setActiveDemoPressed(true)}
            onPointerUp={() => setActiveDemoPressed(false)}
            onPointerCancel={() => setActiveDemoPressed(false)}
            onPointerLeave={() => setActiveDemoPressed(false)}
            onKeyDown={(event) => {
              if (event.key === " " || event.key === "Enter") {
                setActiveDemoPressed(true);
              }
            }}
            onKeyUp={() => setActiveDemoPressed(false)}
            className={`${baseButton} after:absolute after:inset-0 after:origin-right after:translate-x-full after:rounded-sm after:outline-2 after:outline-primary/60 ${afterTransition} active:after:translate-x-0`}
          >
            Click and hold
          </ButtonPrimitive>
          <PseudoElementReadout
            state={{
              visibility: "visible",
              location: activeDemoPressed ? "centered" : "after",
              origin: "right",
            }}
            fields={["location"]}
          />
        </div>
      </DemoContainer>

      <Alert variant="info" className="not-prose my-4">
        <InfoIcon data-icon="inline-start" className="size-3" />
        <AlertContent>
          <AlertDescription>
            If the indicator obscures your trigger, give it a negative z-index (i.e., <Code variant="inline">.-z-1</Code>), and throw{" "}
            <Code variant="inline">.isolate</Code> on the parent to create an independent stacking context.
          </AlertDescription>
        </AlertContent>
      </Alert>

      <p>
        It&apos;s important to note that the <code>peer</code>&nbsp;class is only aware of previous siblings. So, we&apos;ll use{" "}
        <code>peer-data-pressed</code> to move the indicator into position whenever any of the triggers to the left are pressed.
      </p>

      <p>
        So, let&apos;s swap its position when a peer is pressed. We also want to change the <code>transform-origin</code> property when we
        swap sides, so that the indicator animates in from the correct side.
      </p>
      <p>
        The two classes we need to add are <code>after:-translate-x-full</code> and <code>after:origin-left</code>, each prefixed with the{" "}
        <code>peer-data-pressed</code> selector.
      </p>
      <DemoContainer title="Peer state changes the parked side" code={demoCode(peerSwapCode)} centerContent innerClass="min-h-40">
        <div className="grid min-h-40 place-items-center gap-8">
          <ToggleGroupPrimitive value={peerDemoValue} onValueChange={setPeerDemoValue}>
            <TogglePrimitive value="1" className={`${baseButton} peer text-red-500!`}>
              Peer
            </TogglePrimitive>
            <TogglePrimitive
              value="2"
              className={`${afterTransition} ${baseButton} peer text-blue-500! after:pointer-events-none after:absolute after:inset-0 after:origin-right after:translate-x-full after:rounded-[inherit] after:outline-2 after:outline-current after:select-none peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:translate-x-0`}
            >
              Trigger
            </TogglePrimitive>
          </ToggleGroupPrimitive>
          <PseudoElementReadout
            state={getTargetReadout(peerDemoValue, { visibility: "visible", location: "after", origin: "right" }, "left")}
            fields={["location", "origin"]}
          />
        </div>
      </DemoContainer>
      <p>Let&apos;s refine this by adding a transition to our indicator, and have it fade in/out as it moves.</p>
      <DemoContainer title="Fade the handoff" code={demoCode(fadeSwapCode)} centerContent innerClass="min-h-40">
        <div className="grid min-h-40 place-items-center gap-8">
          <ToggleGroupPrimitive value={fadeDemoValue} onValueChange={setFadeDemoValue}>
            <TogglePrimitive value="1" className={`${baseButton} peer text-red-500!`}>
              Peer
            </TogglePrimitive>
            <TogglePrimitive
              value="2"
              className={`${afterTransition} ${baseButton} peer text-blue-500! after:pointer-events-none after:absolute after:inset-0 after:origin-right after:translate-x-full after:rounded-[inherit] after:opacity-0 after:outline-2 after:outline-current after:select-none peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
            >
              Trigger
            </TogglePrimitive>
          </ToggleGroupPrimitive>
          <PseudoElementReadout
            state={getTargetReadout(fadeDemoValue, { visibility: "hidden", location: "after", origin: "right" }, "left")}
          />
        </div>
      </DemoContainer>
      <p>
        You may be wondering how we account for cases where subsequent siblings are active if we can&apos;t target them with{" "}
        <code>peer</code>...well, we don&apos;t have to! Since we initially set the indicator&apos;s position to the right of the trigger,
        it just hangs out at the edge of the next sibling when neither of the first two conditions are met.
      </p>
      <p>We can string this together with 3+ triggers, and give each one its own indicator.</p>

      <DemoContainer title="Every trigger owns an indicator" code={demoCode(allTriggersCode)} centerContent innerClass="min-h-44">
        <div className="grid min-h-48 place-items-center gap-10">
          <ToggleGroupPrimitive value={allTriggersValue} onValueChange={setAllTriggersValue}>
            <TogglePrimitive
              value="1"
              className={`${afterTransition} ${baseButton} peer text-red-500! after:pointer-events-none after:absolute after:inset-x-0 after:top-10 after:h-full after:origin-right after:translate-x-full after:rounded-sm after:opacity-0 after:outline-2 after:outline-current after:select-none peer-data-pressed:after:-translate-x-full data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
            >
              Trigger 1
            </TogglePrimitive>
            <TogglePrimitive
              value="2"
              className={`${afterTransition} ${baseButton} peer relative text-green-600! after:pointer-events-none after:absolute after:inset-x-0 after:top-10 after:h-full after:origin-right after:translate-x-full after:rounded-sm after:opacity-0 after:outline-2 after:outline-current after:select-none peer-data-pressed:after:-translate-x-full data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
            >
              Trigger 2
            </TogglePrimitive>
            <TogglePrimitive
              value="3"
              className={`${afterTransition} ${baseButton} peer relative text-blue-500! after:pointer-events-none after:absolute after:inset-x-0 after:top-10 after:h-full after:origin-right after:translate-x-full after:rounded-sm after:opacity-0 after:outline-2 after:outline-current after:select-none peer-data-pressed:after:-translate-x-full data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
            >
              Trigger 3
            </TogglePrimitive>
          </ToggleGroupPrimitive>
          <PseudoElementReadout state={getTargetReadout(allTriggersValue, { visibility: "hidden", location: "after", origin: "right" })} />
        </div>
      </DemoContainer>

      <p>
        Now, all we need to do is give them matching styles and line them up. This should give the illusion of a single indicator in the
        final version.
      </p>
      <DemoContainer title="Single-color illusion" code={demoCode(singleColorCode)} centerContent>
        <ToggleGroupPrimitive defaultValue={["1"]} className="isolate flex justify-center gap-0">
          {numbers.map((value) => (
            <MatchingToggle key={value} value={value}>
              Trigger {value}
            </MatchingToggle>
          ))}
        </ToggleGroupPrimitive>
      </DemoContainer>
      <hr />
      <Heading level={2} className="mt-8">
        Final result
      </Heading>
      <DemoContainer title="Pill tabs" code={demoCode(finalTabsCode)} centerContent innerClass="grid gap-4">
        <TabsPrimitive.Root defaultValue="1" className="grid w-full gap-2 rounded-xl border p-1">
          <TabsPrimitive.List className="flex overflow-hidden">
            {numbers.map((value) => (
              <TabsPrimitive.Tab key={value} value={value} className={tabTriggerIndicatorClasses}>
                Tab {value}
              </TabsPrimitive.Tab>
            ))}
          </TabsPrimitive.List>
          <NumberPanels />
        </TabsPrimitive.Root>
      </DemoContainer>

      <p>For underline tabs, all we need to do is change the height and positioning of the indicators.</p>

      <DemoContainer title="Underline indicator" code={demoCode(underlineTabsCode)} centerContent innerClass="grid gap-4">
        <TabsPrimitive.Root defaultValue="1" className="w-full rounded-xl border">
          <TabsPrimitive.List className="flex overflow-hidden px-1 pt-1 shadow-[inset_0_-1px_var(--border)]">
            {numbers.map((value) => (
              <TabsPrimitive.Tab key={value} value={value} className={underlineTabTriggerClasses}>
                Tab {value}
              </TabsPrimitive.Tab>
            ))}
          </TabsPrimitive.List>
          <div className="p-1 text-center">
            <NumberPanels />
          </div>
        </TabsPrimitive.Root>
      </DemoContainer>

      <p>
        And for vertical tabs, just swap the orientation and translate + origin directions of the indicators from x/left/right to
        y/top/bottom.
      </p>

      <DemoContainer title="Vertical tabs" code={demoCode(verticalTabsCode)} centerContent innerClass="grid gap-4">
        <TabsPrimitive.Root
          defaultValue="1"
          orientation="vertical"
          className="grid w-full grid-cols-[auto_1fr] gap-4 rounded-xl border p-1"
        >
          <TabsPrimitive.List className="flex flex-col gap-0 overflow-hidden">
            {numbers.map((value) => (
              <TabsPrimitive.Tab key={value} value={value} className={verticalTabTriggerClasses}>
                Tab {value}
              </TabsPrimitive.Tab>
            ))}
          </TabsPrimitive.List>
          <div className="grid h-full rounded-md text-center">
            <NumberPanels />
          </div>
        </TabsPrimitive.Root>
      </DemoContainer>

      <Heading level={2}>Gotchas</Heading>
      <p>A few things to watch out for when using this approach:</p>
      <ul>
        <li>
          Tailwind v4 maps <code>translate-*</code> to the translate property, not transform, so target your transitions with{" "}
          <code>transition-[translate]</code>
        </li>
        <li>
          If you have a long tab label followed by a much shorter one, you may see the indicator&apos;s extra width briefly appear as it
          animates across the shorter tab. You can mitigate this by delaying the opacity transition ever-so-slightly.
        </li>
        <li>
          If using a high-contrast color for your indicator, you may more readily see the indicator at the margins as it animates in. Delay
          both the opacity and background-color transitions in this case until it feels right.
        </li>
        <li>If you want to avoid these altogether, just have the tabs stretch to fill the tab list.</li>
      </ul>

      <section className="grid gap-3">
        <Heading level={2}>Agent Instructions</Heading>

        <p>If you&apos;re handing this off to an agent, you can give it the behavioral recipe instead of the full markup:</p>

        <CodeBlock filename="agent-instructions.txt" code={agentInstructions} />
      </section>
    </div>
  );
}
