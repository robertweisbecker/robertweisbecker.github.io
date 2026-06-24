import { Demo } from "@/components/demo";
import {
  DepartureMonoSymbolDemo,
  DepartureMonoTextDemo,
  MorphablePixelIconScrollDemo,
  PixelIconDataInspectorDemo,
  PixelSunMoonMorphDemo,
  TablerRotationIdeaDemo,
} from "@/components/demos/pixel-icons-post-demos";
import { PixelIconMorphToggles } from "@/components/demos/pixel-icon-morph-toggles";
import { PixelIconMorphVisualizer } from "@/components/demos/pixel-icon-morph-visualizer";
import * as PixelIcons from "@/components/icons-pixel";
import { LinkOut } from "@/components/link-out";
import { Code } from "@/components/ui/code";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "28-pixel Icons",
  description: "Creating animated 11x11 pixel icons with Figma + Codex",
};

export default function PixelIconsPage() {
  return (
    <div className="w-full space-y-10">
      <div className="prose">
        <p>A collection of icons formed by animating 28 pixels around an 11x11 grid</p>

        <h2>The need for icons</h2>
        <p>
          The nice pixel typeface you may notice around here is <LinkOut href="https://departuremono.com/" text="Departure Mono" />,
          designed by <LinkOut href="https://helenazhang.com/" text="Helena Zhang" />. I first saw it used on{" "}
          <LinkOut href="https://www.makingsoftware.com" text="Making Software" /> by{" "}
          <LinkOut href="https://alcohollick.com/" text="Dan Hollick" />. The font has lots of non-text characters built-in, especially some
          great ones for box drawings and ASCII art.
        </p>

        <Demo caption="Just look at this progress bar!">
          <div className="mx-auto max-w-3xs text-center">
            <span className="inline border border-current font-pixel text-2xs">████████▒▒▒▒▒░░░░░░░░░░░</span>
          </div>
        </Demo>

        <p>
          I'm using Departure sparingly, and not every page here needs it, but I wanted to thread the pixel motif into a few other places.
          At first glance, it seemed like we had all the bases covered, and I could replace my Tabler icons with Departure Mono symbols.
        </p>
        <Demo caption="A few Departure Mono symbols">
          <DepartureMonoSymbolDemo />
        </Demo>
        <p>
          One issue: all the chevrons are horizontal. At first, I just rotated a single <span className="font-pixel text-2xs">{">"}</span>{" "}
          character for collapsibles, dropdowns, and pagination, but then I wanted an up-down chevron for my Select component. And a pause
          icon. Do I stack two chevrons and rotate them separate directions? Should I use a sideways equal sign for my pause icon?
        </p>
        <p>
          Yes to both. Then I hated looking at the code, so I hopped into Figma and made some SVGs to fill in the gaps. That begged another
          question: what if I want something a little more expressive or specific?
        </p>

        <h2>Pixel perfect?</h2>
        <p>
          Departure is drawn at an albeit irregular size of 11 pixels, but it scales relatively well. Since characters are pixel-perfect at
          font-size multiples of 11px, you can use a half-step at 16.5px to make each "pixel" land on a pixel edge on at least one side.
          This equates to an icon with a 1.5px stroke (like Lucide) and remains decently crisp. Given these constraints, you end up with 11,
          16.5, and 22px size options, which can be used as replacements for common SVG sizes like 12, 16, 20, or 24px.
        </p>
        <p>
          For monospacing, the em box of a given character is 8×14, with ascenders or descenders exceeding the 11px bounding box. This is
          fine, and never really came up.
        </p>

        <Demo caption="A few Departure Mono text sizes">
          <DepartureMonoTextDemo />
        </Demo>
      </div>

      <section className="prose prose-sm max-w-none">
        <h2>Custom Icons</h2>
        <p>I landed on 2 categories of icons: </p>
        <ol>
          <li>
            Symbolic icons for UI affordances, filling in any gaps in Departure Mono. These can use any number of pixels, typically 16 or
            fewer, and can have open terminals or shapes.
          </li>
          <li>
            Pictorial icons that always use <mark data-hue="blue">28 pixels</mark>. These all have closed shapes for consistency and can
            animate from one to another.
          </li>
        </ol>

        <Demo centerContent className="not-prose" title="UI icons">
          <div className="flex flex-wrap gap-4">
            <span className="flex flex-col items-center gap-2">
              <PixelIcons.PixelChevronDownIcon className="size-[22px] shrink-0" /> <Code variant="plain">ChevronDown</Code>
            </span>
            <span className="flex flex-col items-center gap-2">
              <PixelIcons.PixelChevronsIcon className="size-[22px] shrink-0" /> <Code variant="plain">Chevrons</Code>
            </span>
            <span className="flex flex-col items-center gap-2">
              <PixelIcons.PixelLoaderIcon className="size-[22px] shrink-0" /> <Code variant="plain">Loader</Code>
            </span>
            <span className="flex flex-col items-center gap-2">
              <PixelIcons.PixelShuffleIcon className="size-[22px] shrink-0" /> <Code variant="plain">Shuffle</Code>
            </span>
            <span className="flex flex-col items-center gap-2">
              <PixelIcons.PixelRedoIcon className="size-[22px] shrink-0" /> <Code variant="plain">Redo</Code>
            </span>
          </div>
        </Demo>
        <Demo title="A sample of the morphing icons" innerClass="p-3">
          <PixelIconMorphToggles />
        </Demo>
        <h2>Why 28 pixels?</h2>
        <p>
          The 28-pixel constraint started with the light/dark mode toggle. My first idea was simple and commonplace enough: a sun icon
          rotates into a moon icon and call it a day. With a regular SVG, this works just fine.
        </p>
        <p>We can rig this up with Tabler and Motion:</p>
        <Demo caption="The original idea works naturally with path-based SVGs." centerContent innerClass="p-4">
          <TablerRotationIdeaDemo />
        </Demo>
      </section>

      <section className="prose">
        <p>
          But how might one accomplish this with pixels? They don't rotate. Elements painted with pixels can <em>appear</em> to rotate, but
          really it's just other pixels along its path lighting up. Pixels are discrete and don't maintain the kind of illusory continuity
          you'd get from a rotated path, so having a little rectangle spin into place breaks the metaphor.{" "}
        </p>
        <p>
          The two states needed to use <mark>the same number of pixels</mark>, and the pixels ought to <mark>reshuffle</mark> rather than
          rotate.
        </p>
        <p>
          <small className="leading-none text-muted-foreground">
            Nor do pixels slide diagonally, but we're suspending disbelief on that count. I could have each pixel animate using{" "}
            <LinkOut
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timing-function#stepsinteger_step-position"
              text="steps"
            />{" "}
            or <LinkOut href="https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/calcMode#discrete" text="SMIL" />, but
            then the animation would be way too slow and jerky.
          </small>
        </p>
        <p>
          So, why 28 pixels? That's just how many pixels it took for the sun to look right, and it's the first one I made. That's all. This
          could work with any number of pixels, and you don't even need a constant number; you could have unused pixels dissolve if you
          wanted. Speaking of which: the moon only needed 24, so it earned a little star. Good job, buddy.
        </p>
        <p className="text-pretty">
          In reality, each "pixel" is a <Code variant="inline-component">rect</Code> element with a width and height of 1px. Motion animates
          each's <Code variant="inline">x</Code> and <Code variant="inline">y</Code> properties to move it to its new position.
        </p>{" "}
        <p>
          It's self-evident that the path-based approach is smoother, but that's not the point.
          <mark>We don't want these to look polished, the icons are inherently raw and imperfect.</mark> We can add a hint of gracefulness
          to their rearranging, but that's more a byproduct of easing.
        </p>
      </section>

      <Demo caption="Rotating paths vs. rearranging pixels" centerContent innerClass="min-h-3xs">
        <PixelSunMoonMorphDemo />
      </Demo>

      <div className="prose prose-sm max-w-none">
        <h2>Going overboard</h2>
        <p>
          Then I saw <LinkOut href="https://benji.org/morphing-icons-with-claude" text="this post" /> from Benji Taylor about morphing icons
          with Claude, in which he's animating three-line SVGs. That got me wondering how many more icons I could squeeze out of 28 pixels.
          Turns out quite a few.
        </p>

        <Demo caption="The current 28-rect morphable set." innerClass="p-3">
          <MorphablePixelIconScrollDemo />
        </Demo>

        <p>
          There are a lot of duplicates and variants in here. It's mostly different attempts at getting the shapes right, and looping back
          to see which ones animate well. One day I&apos;ll clean them up, but we're experimenting here, folks.
        </p>
      </div>

      <div className="prose prose-sm max-w-none">
        <h2>Codex to the rescue</h2>
        <p>
          I made the icons in Figma, then had Codex use the Figma MCP to grab the rectangle coordinates and turn them into a tiny{" "}
          <Code variant="inline">createPixelIcon</Code> helper. Each icon is just a compact coordinate string that gets rendered as{" "}
          <Code variant="inline">&lt;rect&gt;</Code> elements inside an SVG wrapper.
        </p>
      </div>

      <Demo caption="Click an icon to inspect the coordinate string behind it." innerClass="p-3">
        <PixelIconDataInspectorDemo />
      </Demo>

      <div className="prose prose-sm max-w-none">
        <p>
          From there, the visualizer became the useful part. It lets me try different ways of pairing pixels between two icons, then test
          whether the transition feels like a clean rearrangement or like someone shook the icon in a box.
        </p>
      </div>

      <PixelIconMorphVisualizer />
    </div>
  );
}
