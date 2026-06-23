import { Demo } from "@/components/demo";
import {
  DepartureMonoSymbolDemo,
  DepartureMonoTextDemo,
  MorphablePixelIconScrollDemo,
  PixelAnimationOptionsDemo,
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
import type * as React from "react";

export const metadata: Metadata = {
  title: "28-pixel Icons",
  description: "Creating animated 11x11 pixel icons with Figma + Codex",
};

type PixelIconComponent = React.ComponentType<React.ComponentProps<"svg">>;

type PixelIconItem = {
  Icon: PixelIconComponent;
  name: string;
};

type PixelIconGroup = {
  title: string;
  caption: string;
  icons: PixelIconItem[];
};

const ICON_GROUPS: PixelIconGroup[] = [
  {
    title: "Playback",
    caption: "Media controls and video surfaces",
    icons: [
      { Icon: PixelIcons.PixelCaptionsIcon, name: "Captions" },
      { Icon: PixelIcons.PixelPauseIcon, name: "Pause" },
      { Icon: PixelIcons.PixelPause2Icon, name: "Pause 2" },
      { Icon: PixelIcons.PixelPauseOutlineRoundedIcon, name: "Pause Rounded" },
      { Icon: PixelIcons.PixelPlayIcon, name: "Play" },
      { Icon: PixelIcons.PixelPlayFilledIcon, name: "Play Filled" },
      { Icon: PixelIcons.PixelPauseOutlineIcon, name: "Pause Outline" },
      { Icon: PixelIcons.PixelPlayOutlineIcon, name: "Play Outline" },
      { Icon: PixelIcons.PixelVolumeIcon, name: "Volume" },
      { Icon: PixelIcons.PixelVolumeMutedIcon, name: "Volume Muted" },
      { Icon: PixelIcons.PixelVideoCameraIcon, name: "Video Camera" },
    ],
  },
  {
    title: "Logos",
    caption: "Tiny product and social marks",
    icons: [
      { Icon: PixelIcons.PixelGithubIcon, name: "GitHub" },
      { Icon: PixelIcons.PixelVercelIcon, name: "Vercel" },
      { Icon: PixelIcons.PixelLinkedinIcon, name: "LinkedIn" },
      { Icon: PixelIcons.PixelGithubOutlineIcon, name: "GitHub Outline" },
      { Icon: PixelIcons.PixelVercelOutlineIcon, name: "Vercel Outline" },
      { Icon: PixelIcons.PixelLinkedinOutlineIcon, name: "LinkedIn Outline" },
    ],
  },
  {
    title: "Documents",
    caption: "Files, notes, and written bits",
    icons: [
      { Icon: PixelIcons.PixelBoldIcon, name: "Bold" },
      { Icon: PixelIcons.PixelBold2Icon, name: "Bold 2" },
      { Icon: PixelIcons.PixelBookIcon, name: "Book" },
      { Icon: PixelIcons.PixelBookOpenIcon, name: "Book Open" },
      { Icon: PixelIcons.PixelClipboardIcon, name: "Clipboard" },
      { Icon: PixelIcons.PixelClipboardCheckIcon, name: "Clipboard Check" },
      { Icon: PixelIcons.PixelEnvelopeIcon, name: "Envelope" },
      { Icon: PixelIcons.PixelFileIcon, name: "File" },
      { Icon: PixelIcons.PixelFileFoldedIcon, name: "File Folded" },
      { Icon: PixelIcons.PixelItalicIcon, name: "Italic" },
      { Icon: PixelIcons.PixelMarkdownIcon, name: "Markdown" },
      { Icon: PixelIcons.PixelMarkdown2Icon, name: "Markdown 2" },
      { Icon: PixelIcons.PixelNewspaperIcon, name: "Newspaper" },
      { Icon: PixelIcons.PixelNoteIcon, name: "Note" },
      { Icon: PixelIcons.PixelNotepadIcon, name: "Notepad" },
      { Icon: PixelIcons.PixelPaperclipIcon, name: "Paperclip" },
      { Icon: PixelIcons.PixelUnderlineIcon, name: "Underline" },
    ],
  },
  {
    title: "Interface",
    caption: "Actions, controls, and app chrome",
    icons: [
      { Icon: PixelIcons.PixelAtSignIcon, name: "At Sign" },
      { Icon: PixelIcons.PixelBigArrowDownIcon, name: "Big Arrow Down" },
      { Icon: PixelIcons.PixelCalendarIcon, name: "Calendar" },
      { Icon: PixelIcons.PixelCalendarDayIcon, name: "Calendar Day" },
      { Icon: PixelIcons.PixelCheckboxIcon, name: "Checkbox" },
      { Icon: PixelIcons.PixelChevronDownIcon, name: "Chevron Down" },
      { Icon: PixelIcons.PixelChevronsIcon, name: "Chevrons" },
      { Icon: PixelIcons.PixelCopyIcon, name: "Copy" },
      { Icon: PixelIcons.PixelDownloadIcon, name: "Download" },
      { Icon: PixelIcons.PixelDownloadWideIcon, name: "Download Wide" },
      { Icon: PixelIcons.PixelDropdownIcon, name: "Dropdown" },
      { Icon: PixelIcons.PixelExternalIcon, name: "External" },
      { Icon: PixelIcons.PixelListIcon, name: "List" },
      { Icon: PixelIcons.PixelLoaderIcon, name: "Loader" },
      { Icon: PixelIcons.PixelMessageIcon, name: "Message" },
      { Icon: PixelIcons.PixelPointerIcon, name: "Pointer" },
      { Icon: PixelIcons.PixelPointer2Icon, name: "Pointer 2" },
      { Icon: PixelIcons.PixelRedoIcon, name: "Redo" },
      { Icon: PixelIcons.PixelShuffleIcon, name: "Shuffle" },
      { Icon: PixelIcons.PixelTilesIcon, name: "Tiles" },
      { Icon: PixelIcons.PixelWindowIcon, name: "Window" },
    ],
  },
  {
    title: "Objects",
    caption: "Devices, rooms, and everyday objects",
    icons: [
      { Icon: PixelIcons.PixelChefHatIcon, name: "Chef Hat" },
      { Icon: PixelIcons.PixelGraduationCapIcon, name: "Graduation Cap" },
      { Icon: PixelIcons.PixelFolderIcon, name: "Folder" },
      { Icon: PixelIcons.PixelFolderOpenIcon, name: "Folder Open" },
      { Icon: PixelIcons.PixelHomeIcon, name: "Home" },
      { Icon: PixelIcons.PixelHouseIcon, name: "House" },
      { Icon: PixelIcons.PixelHouseChimneyIcon, name: "House Chimney" },
      { Icon: PixelIcons.PixelHouseWindowIcon, name: "House Window" },
      { Icon: PixelIcons.PixelComputerOutlineIcon, name: "Computer Outline" },
      { Icon: PixelIcons.PixelComputerRetroIcon, name: "Computer Retro" },
      { Icon: PixelIcons.PixelFinderIcon, name: "Finder" },
      { Icon: PixelIcons.PixelIphoneXIcon, name: "iPhone X" },
      { Icon: PixelIcons.PixelMonitorIcon, name: "Monitor" },
      { Icon: PixelIcons.PixelTvIcon, name: "TV" },
      { Icon: PixelIcons.PixelPresentationIcon, name: "Presentation" },
      { Icon: PixelIcons.PixelWalletIcon, name: "Wallet" },
      { Icon: PixelIcons.PixelBillIcon, name: "Bill" },
      { Icon: PixelIcons.PixelReceiptIcon, name: "Receipt" },
      { Icon: PixelIcons.PixelShovelIcon, name: "Shovel" },
      { Icon: PixelIcons.PixelLightbulbIcon, name: "Lightbulb" },
      { Icon: PixelIcons.PixelMoonIcon, name: "Moon" },
      { Icon: PixelIcons.PixelMoon2Icon, name: "Moon 2" },
      { Icon: PixelIcons.PixelOscarIcon, name: "Oscar" },
      { Icon: PixelIcons.PixelOscar2Icon, name: "Oscar 2" },
      { Icon: PixelIcons.PixelPaletteIcon, name: "Palette" },
    ],
  },
  {
    title: "Symbols",
    caption: "Status, drawing, and expressive marks",
    icons: [
      { Icon: PixelIcons.PixelAutoIcon, name: "Auto" },
      { Icon: PixelIcons.PixelCursor2Icon, name: "Cursor 2" },
      { Icon: PixelIcons.PixelEyeIcon, name: "Eye" },
      { Icon: PixelIcons.PixelEyeClosedIcon, name: "Eye Closed" },
      { Icon: PixelIcons.PixelGradientIcon, name: "Gradient" },
      { Icon: PixelIcons.PixelHelpIcon, name: "Help" },
      { Icon: PixelIcons.PixelHelp2Icon, name: "Help 2" },
      { Icon: PixelIcons.PixelHelp3Icon, name: "Help 3" },
      { Icon: PixelIcons.PixelInfoIcon, name: "Info" },
      { Icon: PixelIcons.PixelInfoCircleLowercaseIcon, name: "Info Circle Lowercase" },
      { Icon: PixelIcons.PixelPenToolIcon, name: "Pen Tool" },
      { Icon: PixelIcons.PixelQuestionCircleIcon, name: "Question Circle" },
      { Icon: PixelIcons.PixelRadioIcon, name: "Radio" },
      { Icon: PixelIcons.PixelScribbleIcon, name: "Scribble" },

      { Icon: PixelIcons.PixelSparklesIcon, name: "Sparkles" },
      { Icon: PixelIcons.PixelStarIcon, name: "Star" },
      { Icon: PixelIcons.PixelStar2Icon, name: "Star 2" },
      { Icon: PixelIcons.PixelStar3Icon, name: "Star 3" },
      { Icon: PixelIcons.PixelStarburstIcon, name: "Starburst" },
      { Icon: PixelIcons.PixelStarburst2Icon, name: "Starburst 2" },
      { Icon: PixelIcons.PixelSunIcon, name: "Sun" },
      { Icon: PixelIcons.PixelSun2Icon, name: "Sun 2" },
      { Icon: PixelIcons.PixelSunSmallIcon, name: "Sun Small" },
      { Icon: PixelIcons.PixelSwirlIcon, name: "Swirl" },
      { Icon: PixelIcons.PixelTargetIcon, name: "Target" },
      { Icon: PixelIcons.PixelUserIcon, name: "User" },
      { Icon: PixelIcons.PixelWarningIcon, name: "Warning" },
      { Icon: PixelIcons.PixelWarningCircleIcon, name: "Warning Circle" },
      { Icon: PixelIcons.PixelYinYangIcon, name: "Yin Yang" },
    ],
  },
];

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

      <section className="prose">
        <h2>All icons</h2>
        {ICON_GROUPS.map((group) => (
          <section key={group.title} className="space-y-3">
            <h3 className="font-pixel text-[11px] uppercase">{group.title}</h3>
            <Demo caption={group.caption} innerClass="p-3">
              <IconGrid icons={group.icons} />
            </Demo>
          </section>
        ))}
      </section>
    </div>
  );
}

function IconGrid({ icons }: { icons: PixelIconItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {icons.map(({ Icon, name }) => (
        <li key={name} className="flex min-w-0 items-center gap-1 text-2xs">
          <span className="grid size-6 shrink-0 place-items-center rounded border text-foreground">
            <Icon className="size-[11px]" aria-hidden />
          </span>
          <span className="min-w-0 truncate text-muted-foreground">{name}</span>
        </li>
      ))}
    </ul>
  );
}
