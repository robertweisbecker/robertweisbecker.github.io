import { DemoContainer } from "@/components/demo";
import {
  DepartureMonoTextDemo,
  MorphablePixelIconScrollDemo,
  PixelIconDataInspectorDemo,
  PixelSunMoonMorphDemo,
  TablerRotationIdeaDemo,
} from "@/components/demos/pixel-icons-post-demos";
import { PixelIconsPostHero } from "@/components/demos/pixel-icons-post-hero";
import { PixelMorphToggles, PixelIconPasswordToggle } from "@/components/demos/pixel-morph-toggles";
import { PixelMorphVisualizer, PixelMorphVisualizerV2 } from "@/components/demos/pixel-morph-visualizer";
import * as PixelIcons from "@/components/icons-pixel";
import { LinkOut } from "@/components/link-out";
import { Code } from "@/components/ui/code";
import { Heading } from "@/components/ui/heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "28-pixel Icons",
  description: "Creating animated 11x11 pixel icons with Figma + Codex",
};

export default function PixelIconsPage() {
  return (
    <>
      <div className="w-full space-y-10">
        <p className="mx-auto max-w-xl">A collection of icons formed by animating 28 pixels around an 11x11 grid</p>
        <PixelIconsPostHero />
        <div className="prose">
          <Heading level={2}>Departure Mono</Heading>
          <p>
            The nice pixel typeface you may notice around here is <LinkOut href="https://departuremono.com/" text="Departure Mono" />,
            designed by <LinkOut href="https://helenazhang.com/" text="Helena Zhang" />. I first saw it used on{" "}
            <LinkOut href="https://www.makingsoftware.com" text="Making Software" /> by{" "}
            <LinkOut href="https://alcohollick.com/" text="Dan Hollick" />. The font has lots of non-text characters built-in, especially
            some great ones for box drawings and ASCII art.
          </p>

          <DemoContainer caption="Just look at this progress bar!">
            <div className="mx-auto max-w-3xs text-center">
              <span className="inline border border-dotted border-current font-pixel text-2xs text-info-primary">
                <span>████████</span>
                <span>▒▒▒▒▒</span>
                <span>░░░░░░░░░░</span>
              </span>
            </div>
          </DemoContainer>

          <p>
            I&apos;m using Departure sparingly, and not every page here needs it, but I wanted to thread the pixel motif into a few other
            places. At first glance, it seemed like we Departure would let me replace my Tabler icons with symbols.
          </p>
          <DemoContainer caption="A few Departure Mono symbols">
            <div className="text-center font-pixel text-[22px]">
              {"❰ ❮ ❬ < ‹ › > ❭ ❯ ❱"}
              <br />
              ↖ ↗ ↘ ↙ ← ↑ ↓ →<br /> ↕ ↰ ↱ ↲ ↳ ↴
              <br />× ★ ☆ ♥ ♦ ✦ ✧ √
            </div>
          </DemoContainer>
          <p>
            One issue: all the chevrons are horizontal. I don&apos;t want to rotate a single character every time a need a downward-facing
            one. Time to make some custom icons.
          </p>

          <Heading level={2}>Pixel perfect pixel art</Heading>
          <p>
            Departure is drawn at an albeit irregular size of 11 pixels, but it scales relatively well. Since characters are pixel-perfect
            at font-size multiples of 11px, you can use a half-step at 16.5px to make each &quot;pixel&quot; land on a pixel edge on at
            least one side. This equates to an icon with a 1.5px stroke (like Lucide) and remains decently crisp.{" "}
          </p>
          <DemoContainer caption="A few Departure Mono text sizes">
            <DepartureMonoTextDemo />
          </DemoContainer>
          <p>That means we should be able use the trio of 11 / 16.5 / 22px in place of common SVG sizes like 12, 16, 20, and 24px.</p>
          <p>
            For monospacing, the em box of a given character is 8×14, with ascenders or descenders exceeding the 11px bounding box. This
            gives us some wiggle room for a larger 14px set if we need it.
          </p>
        </div>

        <section className="prose prose-sm max-w-none">
          <Heading level={2}>Direction</Heading>
          <p>
            I landed on two sets of icons with different constraints. I&apos;ll explain why in a moment, but for now, let&apos;s take a look
            at each.
          </p>
          <ol>
            <li>
              First are <strong>static</strong> symbolic icons for UI needs, filling in any gaps in Departure Mono. These can use any number
              of pixels, typically 16 or fewer, and can have open terminals or shapes.
            </li>
            <li>
              Next are <strong>animated</strong> pictorial icons that always use <mark>28 pixels</mark>. These all have closed shapes for
              consistency and can animate from one to another.
            </li>
          </ol>

          <DemoContainer centerContent className="not-prose" title="Static icons" innerClass="min-h-[300px]">
            <div className="grid grid-cols-3 items-baseline gap-3 gap-y-5 text-sm font-medium text-muted-foreground **:shrink-0">
              <span className="flex flex-col items-center gap-1">
                <PixelIcons.PixelChevronDownIcon className="size-[33px] shrink-0 text-primary" /> <p>ChevronDown</p>
              </span>
              <span className="flex flex-col items-center gap-1">
                <PixelIcons.PixelChevronsIcon className="size-[33px] shrink-0 text-primary" /> <p>Chevrons</p>
              </span>
              <span className="flex flex-col items-center gap-1">
                <PixelIcons.PixelLoaderIcon className="size-[33px] shrink-0 text-primary" /> <p>Loader</p>
              </span>
              <span className="flex flex-col items-center gap-1">
                <PixelIcons.PixelShuffleIcon className="size-[33px] shrink-0 text-primary" /> <p>Shuffle</p>
              </span>
              <span className="flex flex-col items-center gap-1">
                <PixelIcons.PixelRedoIcon className="size-[33px] shrink-0 text-primary" /> <p>Redo</p>
              </span>
              <span className="flex flex-col items-center gap-1">
                <PixelIcons.PixelFinderIcon className="size-[48px]! shrink-0 text-primary" /> <p>Finder</p>
              </span>
            </div>
          </DemoContainer>
          <DemoContainer title="Animated" description="∙ click each to morph" centerContent innerClass="min-h-[300px]">
            <PixelMorphToggles />
          </DemoContainer>
          <DemoContainer title="Password toggle" description="∙ type or hide your password" centerContent innerClass="min-h-[300px]">
            <PixelIconPasswordToggle />
          </DemoContainer>
          <Heading level={2}>Twenty-eight pixels</Heading>
          <p>
            The 28-pixel constraint started with the light/dark mode toggle. I wanted to do something I&apos;d seen before: a sun icon
            rotates into a moon icon and call it a day. With a regular SVG, this works just fine.
          </p>
          <p>We can rig this up with Tabler and Motion:</p>
          <DemoContainer caption="The original idea works naturally with path-based SVGs." centerContent className="min-h-[400px]">
            <TablerRotationIdeaDemo />
          </DemoContainer>
        </section>

        <section className="prose">
          <p>
            But how might one accomplish this with pixels? They don&apos;t rotate. Elements painted with pixels can <em>appear</em> to
            rotate, but really it&apos;s just other pixels along its path lighting up. Pixels are discrete and don&apos;t maintain the kind
            of illusory continuity you&apos;d get from a rotated path, so having a little rectangle spin into place breaks the
            metaphor.{" "}
          </p>
          <p>
            The two states needed to use <mark>the same number of pixels</mark>, and the pixels ought to <mark>reshuffle</mark> rather than
            rotate.
          </p>
          <p>
            <small className="leading-none text-muted-foreground">
              Nor do pixels slide diagonally, but we&apos;re suspending disbelief on that count. I could have each pixel animate using{" "}
              <LinkOut
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timing-function#stepsinteger_step-position"
                text="steps"
              />{" "}
              or <LinkOut href="https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/calcMode#discrete" text="SMIL" />, but
              then the animation would be way too slow and jerky.
            </small>
          </p>
          <p>
            So, why 28 pixels? That&apos;s just how many pixels it took for the sun{" "}
            <PixelIcons.PixelSunSmallIcon className="inline size-[16.5px] align-text-top text-yellow-400" /> to look right, and it&apos;s
            the first one I made. That&apos;s all. This could work with any number of pixels, and you don&apos;t even need a constant
            number; unused pixels could combine or dissolve. Speaking of which: the moon{" "}
            <PixelIcons.PixelMoon2Icon className="inline size-[16.5px] align-text-top text-purple-400" /> only needed 24, so it earned a
            little star. Good job, buddy.
          </p>
          <p className="text-pretty">
            In reality, each &quot;pixel&quot; is a <Code variant="inline-component">rect</Code> element with a width and height of 1px.
            Motion animates each&apos;s <Code variant="inline">x</Code> and <Code variant="inline">y</Code> properties to move it to its new
            position.
          </p>{" "}
          <DemoContainer caption="Rotating paths vs. rearranging pixels" centerContent className="min-h-[400px]">
            <PixelSunMoonMorphDemo />
          </DemoContainer>
          <p>
            It&apos;s self-evident that the path-based approach is smoother, but that&apos;s not the point:
            <mark>
              they shouldn&apos;t look polished, the icons are intentionally lo-res. They&apos;re inherently rough and imperfect.
            </mark>{" "}
            We can add a hint of gracefulness to their rearranging, but that&apos;s more a byproduct of easing.
          </p>
        </section>

        <div className="prose prose-sm max-w-none">
          <Heading level={2}>Going overboard</Heading>
          <p>
            Then I saw <LinkOut href="https://benji.org/morphing-icons-with-claude" text="this post" /> from Benji Taylor about morphing
            icons with Claude, in which he&apos;s animating between 21 different SVGs made from 3 lines each. That got me wondering how many
            more icons I could squeeze out of 28 pixels.
          </p>
          <p>A lot, it turns out.</p>

          <DemoContainer caption="The current 28-rect morphable set." innerClass="p-3">
            <MorphablePixelIconScrollDemo />
          </DemoContainer>

          <p>
            (Some of these are duplicates or variants of others, mostly different attempts at getting the shapes right. They&apos;re still
            kicking around to test which animate well.)
          </p>
        </div>

        <div className="prose prose-sm max-w-none">
          <Heading level={2}>Codex to the rescue</Heading>
          <p>
            Instead of copy-pasting from Figma and manually converting to JSX, I started off having Codex use the Figma MCP to grab frames
            and populate the SVGs as individual components.
          </p>
          <p>
            {" "}
            It got clever after a few passes and wrote a tiny <Code variant="inline">createPixelIcon</Code> helper function, which instead
            generates icons from the X/Y coordinates of each 1x1 layer per frame. Icons then become a string it parses from Figma, and the
            helper renders <Code variant="inline-component">rect</Code> elements inside a shared SVG wrapper.
          </p>
          <DemoContainer caption="Click an icon to inspect the coordinate string behind it." innerClass="p-1">
            <PixelIconDataInspectorDemo />
          </DemoContainer>
        </div>

        <div className="prose prose-sm max-w-none">
          <Heading level={2}>Morph Visualizer</Heading>
          <p>
            With the second batch of icons created, the next step was to see how they animate. Inspired by Benji&apos;s post, Codex and I
            created a visualizer to experiment further. You can select a sequence of icons to see how pixels match up between states, and
            test different animations, speeds, etc. Give it a spin below.
          </p>
        </div>

        <div className="not-prose grid gap-10">
          <section className="space-y-3">
            <Heading level={3}>V1 — sequence builder</Heading>
            <p className="text-sm text-muted-foreground">
              Build a sequence, jump between steps, and play transitions from the preview or footer.
            </p>
            <PixelMorphVisualizer />
          </section>
          <section className="space-y-3">
            <Heading level={3}>V2 — click to morph</Heading>
            <p className="text-sm text-muted-foreground">
              Start empty, click an icon to preview it, then click another to morph. Click the active icon again to clear.
            </p>
            <PixelMorphVisualizerV2 />
          </section>
        </div>
      </div>
    </>
  );
}
