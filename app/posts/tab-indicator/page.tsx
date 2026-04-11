"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { CodeBlock } from "@/components/code-block";
import { InfoIcon } from "@/components/icons";
import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { IconArrowRight } from "@tabler/icons-react";

const baseButton =
  "relative px-4 h-button font-medium border bg-background items-center justify-center inline-flex cursor-pointer rounded-md text-sm w-fit hover:bg-accent text-muted-foreground data-pressed:bg-current/2 hover:text-accent-foreground data-pressed:text-foreground";

const afterTransition =
  "after:pointer-events-none after:transition-[transform,translate,opacity,background-color] after:duration-200 after:ease-out after:content-['']";

const tabTriggerIndicatorClasses = [
  "peer relative min-w-0 font-medium text-base",
  "inline-flex min-h-button items-center justify-center hover:text-accent-foreground cursor-pointer px-3 data-active:text-foreground rounded-lg",
  afterTransition,
  "after:absolute after:inset-0 after:origin-right after:translate-x-full data-active:after:bg-accent after:rounded-[inherit]",
  "data-[active]:after:translate-x-0 peer-data-[active]:after:-translate-x-full after:max-w-full not-data-active:overflow-hidden peer-data-[active]:after:overflow-visible after:opacity-0 data-active:after:opacity-100",
].join(" ");

const recipeSnippet = `Tab list: Tab + Panel only (no Indicator).

Tab triggers — peer = previous tab:
after:absolute after:inset-x-0 after:bottom-0 after:h-0.5
after:origin-right after:translate-x-full after:bg-primary
after:transition-[transform,translate] after:duration-200 after:ease-out
data-[active]:after:translate-x-0
peer-data-[active]:after:-translate-x-full

Overlap row (translate-y on ::after):
peer-data-[active]:after:-translate-x-full data-[active]:after:translate-x-0

Button ::after: active:after:translate-x-0
Toggle peer: peer-data-pressed:after:-translate-x-full`;

export default function TabIndicatorPostPage() {
  return (
    <div className="prose mx-auto w-full max-w-2xl">
      <p>
        Inspired by a tweet about Radix UI tabs not supporting a dynamic indicator like Base UI, I had an idea to fake
        one with Tailwind trickery. It mostly works.
      </p>

      <hr />
      <p>Here&apos;s the end result:</p>

      <Card className="w-full">
        <TabsPrimitive.Root defaultValue="1">
          <CardHeader>
            <TabsPrimitive.List className="flex overflow-hidden">
              <TabsPrimitive.Tab value="1" className={tabTriggerIndicatorClasses}>
                Tab 1
              </TabsPrimitive.Tab>
              <TabsPrimitive.Tab value="2" className={tabTriggerIndicatorClasses}>
                Tab 2 with a longer label
              </TabsPrimitive.Tab>
              <TabsPrimitive.Tab value="3" className={tabTriggerIndicatorClasses}>
                Tab 3
              </TabsPrimitive.Tab>
            </TabsPrimitive.List>
          </CardHeader>
          <CardContent className="pt-4 text-center">
            <TabsPrimitive.Panel value="1">
              <div className="rounded-md bg-muted p-4 text-4xl font-bold opacity-50">#1</div>
            </TabsPrimitive.Panel>
            <TabsPrimitive.Panel value="2">
              <div className="rounded-md bg-muted p-4 text-4xl font-bold opacity-50">#2</div>
            </TabsPrimitive.Panel>
            <TabsPrimitive.Panel value="3">
              <div className="rounded-md bg-muted p-4 text-4xl font-bold opacity-50">#3</div>
            </TabsPrimitive.Panel>
          </CardContent>
        </TabsPrimitive.Root>
      </Card>
      <p>
        Sure, this is trivial with Motion and layout animations...and, sure, you soon won&apos;t need this once Base UI
        is stable...but in the meantime, you can spruce up your tabs with a little CSS. Here we&apos;re using Tailwind
        for expediency, but plain old CSS will do the trick. No additional JavaScript required.
      </p>
      <p>
        The trick is to animate an <code>::after</code> element on each trigger, then use adjacent sibling selectors to
        reposition the indicators when a given trigger is active.
      </p>
      <p>
        Thankfully, Tailwind has an abstraction for this kind of thing: <code>group</code> and <code>peer</code>. We can
        use these classes to make adjacent triggers &quot;hand off&quot; the indicator from one trigger to another by
        flipping the animation direction based on whether the previous trigger is active or not.
      </p>

      <Separator />

      <h2>Step-by-step</h2>
      <p>
        Before we do anything, let&apos;s consider the possible positions for the indicator. We&apos;re trying to
        animate the indicator in from the left when a previous tab is active, and in from the right when a later tab is
        active. So, we have three possible positions:
      </p>
      <ol>
        <li>Active: lined up with its trigger</li>
        <li>If a previous sibling is active: lined up with trigger&apos;s previous sibling</li>
        <li>If a later sibling is active: lined up with the trigger&apos;s next sibling</li>
      </ol>

      <div className="not-prose flex flex-col items-center justify-center gap-4 rounded-xl bg-muted/50 p-4">
        <div className="flex items-center gap-1">
          <div className="grid-stack w-20 rounded-md bg-card p-2 text-xs text-muted-foreground/50 shadow-border-xs">
            Indicator
          </div>
          <IconArrowRight className="size-4" />
          <div className="grid-stack w-20 rounded-md bg-muted p-2">Trigger</div>
        </div>
        <div className="flex gap-1">
          <div className="grid-stack w-20 rounded-md bg-card p-2 text-xs text-muted-foreground/50 shadow-border-xs">
            Indicator
          </div>
          <div className="grid-stack w-20 rounded-md bg-muted p-2">Trigger</div>
        </div>
        <div className="flex gap-1">
          <div className="grid-stack w-20 rounded-md bg-card p-2 text-xs text-muted-foreground/50 shadow-border-xs">
            Indicator
          </div>
          <div className="grid-stack w-20 rounded-md bg-muted p-2">Trigger</div>
        </div>
      </div>
      <p>
        Style a pseudo-element as the indicator and park it past the right edge with <code>translate-x-full</code>. Add{" "}
        <code className="whitespace-nowrap">origin-right</code> for later, since we want it to animate in from the right
        when activated.
      </p>
      <Card variant="muted">
        <CardContent>
          <ButtonPrimitive
            className={`${baseButton} w-fit after:absolute after:inset-0 after:grid-stack after:origin-right after:translate-x-full after:rounded-[inherit] after:border after:border-dashed after:bg-info after:text-info-foreground after:content-[':after']`}
          >
            Button
          </ButtonPrimitive>
        </CardContent>
        <CardFooter></CardFooter>

        <Collapsible className="mx-auto w-full">
          <CollapsibleTrigger render={<Button variant="ghost" size="xs" />} className="rounded-b-inherit self-center">
            Show code
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CodeBlock
              language="ts"
              code={`<Button className="relative after:absolute after:inset-0 after:origin-right after:translate-x-full after:rounded-[inherit]">Button</Button>`}
            />
          </CollapsibleContent>
        </Collapsible>
      </Card>
      <p>
        When active, we want the indicator to slide in from the right. So, we set <code>origin-right</code> initially on
        the <code>::after</code>.
      </p>
      <p>
        Next, target the active/pressed state. We&apos;ll snap <code>translateX</code> back to{" "}
        <code className="whitespace-nowrap">0</code> when the trigger is pressed. This moves the indicator atop our
        trigger on click. Be sure to add some duration and easing to the transformation.
      </p>

      <div className="not-prose rounded-xl bg-muted p-4">
        <ButtonPrimitive
          type="button"
          className={`${baseButton} mx-auto after:absolute after:inset-0 after:origin-right after:translate-x-full after:rounded-sm after:outline-2 after:outline-primary/60 ${afterTransition} active:after:translate-x-0`}
        >
          Click and hold
        </ButtonPrimitive>
      </div>

      <Alert variant="info" className="not-prose my-4">
        <InfoIcon data-icon="inline-start" className="size-3" />
        <AlertContent>
          <AlertDescription>
            If the indicator obscures your trigger, give it a negative z-index (i.e., <Code>.-z-1</Code>), and throw{" "}
            <Code>.isolate</Code> on the parent to create an independent stacking context.
          </AlertDescription>
        </AlertContent>
      </Alert>

      <p>
        It&apos;s important to note that the <code>peer</code> class is only aware of previous siblings. So, we&apos;ll
        use <code>peer-data-pressed</code> to move the indicator into position whenever any of the triggers to the left
        are pressed.
      </p>
      <p>
        You may be wondering how we account for cases where subsequent siblings are active if we can&apos;t target them
        with <code>peer</code>...well, we don&apos;t have to! Since we initially set the indicator&apos;s position to
        the right of the trigger, it just hangs out at the edge of the next sibling when neither of the first two
        conditions are met.
      </p>
      <p>
        So, let&apos;s swap its position when a peer is pressed by adding{" "}
        <code>peer-data-pressed:after:-translate-x-full</code>.
      </p>
      <div className="not-prose flex flex-wrap justify-center gap-4 rounded-xl border bg-muted/50 p-4">
        <ToggleGroupPrimitive defaultValue={["1"]}>
          <TogglePrimitive value="1" className={`${baseButton} peer`}>
            Peer
          </TogglePrimitive>
          <TogglePrimitive
            value="2"
            className={`${afterTransition} ${baseButton} relative after:pointer-events-none after:absolute after:inset-0 after:origin-right after:translate-x-full after:rounded-sm after:outline-2 after:outline-primary/60 after:select-none peer-data-pressed:after:-translate-x-full data-pressed:after:translate-x-0`}
          >
            Trigger
          </TogglePrimitive>
        </ToggleGroupPrimitive>
      </div>

      <p>Let&apos;s refine this by adding a transition to our indicator, and have it fade in/out as it moves.</p>
      <div className="not-prose flex flex-wrap justify-center gap-4 rounded-xl border bg-muted/50 p-4">
        <ToggleGroupPrimitive defaultValue={["1"]}>
          <TogglePrimitive value="1" className="peer">
            Peer
          </TogglePrimitive>
          <TogglePrimitive
            value="2"
            className={`${afterTransition} relative after:pointer-events-none after:absolute after:inset-0 after:origin-right after:translate-x-full after:rounded-sm after:opacity-0 after:outline-2 after:outline-primary/60 after:select-none peer-data-pressed:after:-translate-x-full data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
          >
            Trigger
          </TogglePrimitive>
        </ToggleGroupPrimitive>
      </div>

      <p>Now, we&apos;ll string it all together and give each toggle its own indicator. Notice anything? </p>

      <div className="not-prose flex flex-wrap justify-center gap-4 rounded-xl bg-muted p-4 pb-16">
        <ToggleGroupPrimitive defaultValue={["1"]}>
          <TogglePrimitive
            value="1"
            className={`${afterTransition} ${baseButton} after: after:h-fullpointer-events-none relative after:absolute after:inset-x-0 after:top-10 after:h-full after:origin-right after:translate-x-full after:rounded-sm after:opacity-0 after:outline-2 after:outline-primary/60 after:select-none peer-data-pressed:after:-translate-x-full data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
          >
            Trigger 1
          </TogglePrimitive>
          <TogglePrimitive
            value="2"
            className={`${afterTransition} ${baseButton} relative after:pointer-events-none after:absolute after:inset-x-0 after:top-10 after:h-full after:origin-right after:translate-x-full after:rounded-sm after:opacity-0 after:outline-2 after:outline-primary/60 after:select-none peer-data-pressed:after:-translate-x-full data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
          >
            Trigger 2
          </TogglePrimitive>
          <TogglePrimitive
            value="3"
            className={`${afterTransition} ${baseButton} relative after:pointer-events-none after:absolute after:inset-x-0 after:top-10 after:h-full after:origin-right after:translate-x-full after:rounded-sm after:opacity-0 after:outline-2 after:outline-primary/60 after:select-none peer-data-pressed:after:-translate-x-full data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
          >
            Trigger 3
          </TogglePrimitive>
        </ToggleGroupPrimitive>
      </div>

      <p>Two things are wrong here.</p>
      <ol>
        <li>
          When we press a previous toggle, the current indicator slides in from the right like we want. But when we
          press a later one, it&apos;s sliding in from the wrong side.
        </li>
        <li>
          And you&apos;ll also notice that the &quot;old&quot; indicator is animating away from our new trigger when we
          press a previous one.
        </li>
      </ol>

      <p>
        The cause of both issues is the same. We forgot to swap the <code>transform-origin</code> when a peer is
        pressed.
      </p>

      <ToggleGroupPrimitive
        defaultValue={["1"]}
        className={cn(
          "isolate flex -rotate-15 skew-x-15 justify-center gap-0"
          // "isolate flex origin-center rotate-x-55 rotate-y-0 -rotate-z-45 items-center justify-center"
        )}
      >
        <TogglePrimitive
          value="1"
          className={`${afterTransition} ${baseButton} peer relative text-red-500! after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:mb-5 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current after:text-current after:opacity-10 after:select-none not-data-pressed:after:-z-1 peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0 data-pressed:after:opacity-20`}
        >
          Trigger 1
        </TogglePrimitive>
        <TogglePrimitive
          value="2"
          className={`${afterTransition} ${baseButton} peer relative mt-10 text-green-600! after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current after:text-current after:opacity-10 after:select-none not-data-pressed:after:-z-1 peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0 data-pressed:after:opacity-20`}
        >
          Trigger 2
        </TogglePrimitive>
        <TogglePrimitive
          value="3"
          className={`${afterTransition} ${baseButton} peer relative mt-20 text-blue-500! after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current after:text-current after:opacity-10 after:select-none not-data-pressed:after:-z-1 peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0 data-pressed:after:opacity-20`}
        >
          Trigger 3
        </TogglePrimitive>
      </ToggleGroupPrimitive>

      <p>
        Here&apos;s that same example unskewed, so you can see how they overlap when adjacent siblings are selected:
      </p>
      <div className="not-prose rounded-xl bg-muted p-4 pb-14">
        <ToggleGroupPrimitive
          defaultValue={["1"]}
          className={cn(
            "isolate flex justify-center gap-0"
            // "isolate flex origin-center rotate-x-55 rotate-y-0 -rotate-z-45 items-center justify-center"
          )}
        >
          <TogglePrimitive
            value="1"
            className={`${afterTransition} ${baseButton} peer relative border-0 bg-transparent! text-red-500! after:pointer-events-none after:absolute after:inset-x-0 after:top-10 after:mb-5 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current after:text-current after:opacity-10 after:select-none not-data-pressed:after:-z-1 peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0 data-pressed:after:opacity-20`}
          >
            Trigger 1
          </TogglePrimitive>
          <TogglePrimitive
            value="2"
            className={`${afterTransition} ${baseButton} peer relative border-0 bg-transparent! text-green-600! after:pointer-events-none after:absolute after:inset-x-0 after:top-10 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current after:text-current after:opacity-10 after:select-none not-data-pressed:after:-z-1 peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0 data-pressed:after:opacity-20`}
          >
            Trigger 2
          </TogglePrimitive>
          <TogglePrimitive
            value="3"
            className={`${afterTransition} ${baseButton} peer relative border-0 bg-transparent! text-blue-500! after:pointer-events-none after:absolute after:inset-x-0 after:top-10 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current after:text-current after:opacity-10 after:select-none not-data-pressed:after:-z-1 peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0 data-pressed:after:opacity-20`}
          >
            Trigger 3
          </TogglePrimitive>
        </ToggleGroupPrimitive>
      </div>
      <p>
        All we need to is set them to the same color and restore the initial fade when not in view. That should give the
        illusion of a single indicator in the final version.
      </p>
      <div className="not-prose rounded-xl bg-muted p-4">
        <ToggleGroupPrimitive
          defaultValue={["1"]}
          className={cn(
            "isolate flex justify-center gap-0"
            // "isolate flex origin-center rotate-x-55 rotate-y-0 -rotate-z-45 items-center justify-center"
          )}
        >
          <TogglePrimitive
            value="1"
            className={`${afterTransition} ${baseButton} peer relative border-0 bg-transparent! after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:mb-5 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current/5 after:text-current after:opacity-0 after:select-none not-data-pressed:after:-z-1 peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
          >
            Trigger 1
          </TogglePrimitive>
          <TogglePrimitive
            value="2"
            className={`${afterTransition} ${baseButton} peer relative border-0 bg-transparent! after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current/5 after:text-current after:opacity-0 after:select-none not-data-pressed:after:-z-1 peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
          >
            Trigger 2
          </TogglePrimitive>
          <TogglePrimitive
            value="3"
            className={`${afterTransition} ${baseButton} peer relative border-0 bg-transparent! after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-full after:origin-right after:translate-x-full after:rounded-[inherit] after:bg-current/5 after:text-current after:opacity-0 after:select-none not-data-pressed:after:-z-1 peer-data-pressed:after:origin-left peer-data-pressed:after:-translate-x-full data-pressed:after:-z-1 data-pressed:after:origin-left data-pressed:after:translate-x-0 data-pressed:after:opacity-100`}
          >
            Trigger 3
          </TogglePrimitive>
        </ToggleGroupPrimitive>
      </div>
      <h2 className="mt-8">Final result</h2>
      <Card className="w-full">
        <TabsPrimitive.Root defaultValue="1">
          <CardHeader>
            <TabsPrimitive.List className="flex overflow-hidden">
              <TabsPrimitive.Tab value="1" className={tabTriggerIndicatorClasses}>
                Tab 1
              </TabsPrimitive.Tab>
              <TabsPrimitive.Tab value="2" className={tabTriggerIndicatorClasses}>
                Tab 2 with a longer label
              </TabsPrimitive.Tab>
              <TabsPrimitive.Tab value="3" className={tabTriggerIndicatorClasses}>
                Tab 3
              </TabsPrimitive.Tab>
            </TabsPrimitive.List>
          </CardHeader>
          <CardContent className="pt-4 text-center">
            <TabsPrimitive.Panel value="1">
              <div className="rounded-md bg-muted p-4 text-4xl font-bold opacity-50">#1</div>
            </TabsPrimitive.Panel>
            <TabsPrimitive.Panel value="2">
              <div className="rounded-md bg-muted p-4 text-4xl font-bold opacity-50">#2</div>
            </TabsPrimitive.Panel>
            <TabsPrimitive.Panel value="3">
              <div className="rounded-md bg-muted p-4 text-4xl font-bold opacity-50">#3</div>
            </TabsPrimitive.Panel>
          </CardContent>
        </TabsPrimitive.Root>
      </Card>

      <h2>Gotchas</h2>
      <p>A few things to watch out for when using this approach:</p>
      <ul>
        <li>
          Tailwind v4 maps <code>translate-*</code> to the translate property, not transform, so target your transitions
          with <code>transition-[translate]</code>
        </li>
        <li>
          If you have a long tab label followed by a much shorter one, you may see the indicator&apos;s extra width
          briefly appear as it animates across the shorter tab. You can mitigate this by delaying the opacity transition
          ever-so-slightly.
        </li>
        <li>
          If using a high-contrast color for your indicator, you may more readily see the indicator at the margins as it
          animates in. Delay both the opacity and background-color transitions in this case until it feels right.
        </li>
        <li>If you want to avoid these altogether, just have the tabs stretch to fill the tab list.</li>
      </ul>

      <section className="grid gap-3">
        <Heading level={3} className="mt-0!">
          Reference
        </Heading>

        <CodeBlock filename="tailwind-notes.txt" code={recipeSnippet} />
      </section>
    </div>
  );
}
