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
      { Icon: PixelIcons.PixelBookIcon, name: "Book" },
      { Icon: PixelIcons.PixelBookOpenIcon, name: "Book Open" },
      { Icon: PixelIcons.PixelClipboardIcon, name: "Clipboard" },
      { Icon: PixelIcons.PixelClipboardCheckIcon, name: "Clipboard Check" },
      { Icon: PixelIcons.PixelEnvelopeIcon, name: "Envelope" },
      { Icon: PixelIcons.PixelFileIcon, name: "File" },
      { Icon: PixelIcons.PixelFileFoldedIcon, name: "File Folded" },
      { Icon: PixelIcons.PixelMarkdownIcon, name: "Markdown" },
      { Icon: PixelIcons.PixelMarkdown2Icon, name: "Markdown 2" },
      { Icon: PixelIcons.PixelNewspaperIcon, name: "Newspaper" },
      { Icon: PixelIcons.PixelNoteIcon, name: "Note" },
      { Icon: PixelIcons.PixelNotepadIcon, name: "Notepad" },
      { Icon: PixelIcons.PixelPaperclipIcon, name: "Paperclip" },
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
        <p>
          The nice pixel typeface you may notice around here is <LinkOut href="https://departuremono.com/" text="Departure Mono" />,
          designed by <LinkOut href="https://helenazhang.com/" text="Helena Zhang" />. I first saw it used on{" "}
          <LinkOut href="https://www.makingsoftware.com" text="Making Software" /> by{" "}
          <LinkOut href="https://alcohollick.com/" text="Dan Hollick" />. The font has lots of non-text characters built-in, especially some
          great ones for box drawings and ASCII art.
        </p>

        <p>Just look at this progress bar!</p>
        <div className="mx-auto max-w-3xs">
          <span className="inline border border-current font-pixel text-2xs">████████▒▒▒▒▒░░░░░░░░░░░</span>
        </div>

        <Demo caption="A few Departure Mono symbols">
          <DepartureMonoSymbolDemo />
        </Demo>

        <p>
          Departure is drawn on an 11x11 pixel grid, so characters are pixel-perfect at multiples of 11px. If you want to fudge it a little
          bigger to 16.5px, one side of a stroke will land on a pixel edge, so it remains decently crisp when using characters as
          replacements for 12-, 16-, 20-, or 24px SVGs.
        </p>

        <Demo caption="A few Departure Mono text sizes">
          <DepartureMonoTextDemo />
        </Demo>
      </div>

      <div className="prose prose-sm max-w-none">
        <p>
          I'm using Departure sparingly, and not every page here needs it, but I wanted to thread the pixel motif into a few other places.
          You saw all those chevrons above, we could use that for dropdowns perhaps.
        </p>
        <p>
          The 28-pixel constraint started with the light/dark mode toggle. My first idea was simple and commonplace enough: a sun icon
          rotates into a moon icon and call it a day. With a regular SVG, this works just fine.
        </p>
      </div>

      <Demo caption="The original idea works naturally with outline icons." centerContent innerClass="p-4">
        <TablerRotationIdeaDemo />
      </Demo>

      <section className="prose">
        <p>
          But pixels don't rotate. Elements painted with pixels can <em>appear</em> to rotate, but really it's just other pixels along its
          path lighting up; there's no continuity, so having a little rectangle spin into place breaks the metaphor. The two states needed
          to use the same number of pixels, and they ought to reshuffle rather than rotate.
        </p>
        <p>
          <small className="leading-snug text-muted-foreground">
            Nor do they slide diagonally, but we're suspending disbelief on that count. I could have each pixel animate using{" "}
            <LinkOut
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timing-function#stepsinteger_step-position"
              text="steps"
            />{" "}
            or <LinkOut href="https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/calcMode#discrete" text="SMIL" />, but
            then the animation would be way too slow.
          </small>
        </p>
        <h2>Why 28 pixels?</h2>
        <p>
          That's just how many pixels it took for the sun to look right. That's literally it. The moon only needed 24, so it earned a little
          star.
        </p>
      </section>

      <Demo
        caption="The sun and moon share a 28-rect budget, so the pixels rearrange instead of rotating."
        centerContent
        innerClass="min-h-3xs"
      >
        <PixelSunMoonMorphDemo />
      </Demo>

      <div className="prose prose-sm max-w-none">
        <p>
          Then I saw <LinkOut href="https://benji.org/morphing-icons-with-claude" text="Benji's post" /> about morphing icons with Claude.
          He uses three-line SVGs, which got me wondering how many more icons I could squeeze out of that same 28-pixel budget. Turns out:
          quite a few.
        </p>
        <p>
          There are a lot of duplicates and variants in here. They are mostly different attempts at getting the silhouette to feel right.
          One day I&apos;ll clean them up, but I kind of like showing the messy middle. It makes the process more honest.
        </p>
      </div>

      <Demo caption="The current 28-rect morphable set." innerClass="p-3">
        <MorphablePixelIconScrollDemo />
      </Demo>

      <div className="prose prose-sm max-w-none">
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
        <p>The animation controls are deliberately small:</p>
        <ul>
          <li>
            <strong>Linear</strong> moves each rectangle at a constant rate.
          </li>
          <li>
            <strong>Ease</strong> uses a softer timing curve for a more familiar UI feel.
          </li>
          <li>
            <strong>Spring</strong> is snappier and better for quick state changes, though it is less useful for slow inspection.
          </li>
        </ul>
      </div>

      <Demo caption="Slow-motion samples of the animation options." innerClass="p-3">
        <PixelAnimationOptionsDemo />
      </Demo>

      <h2 className="font-pixel text-[11px] uppercase">Morphs</h2>
      <PixelIconMorphVisualizer />

      <section className="prose space-y-3">
        <h2 className="">Stateful Morphs</h2>
        <Demo caption="Single-button toggles powered by PixelIconMorph." innerClass="p-3">
          <PixelIconMorphToggles />
        </Demo>
      </section>
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
        <li key={name} className="flex min-w-0 items-center gap-2 rounded-md bg-background px-2.5 py-2 text-xs shadow-border-xs">
          <span className="grid size-7 shrink-0 place-items-center rounded bg-muted text-foreground">
            <Icon className="size-[18px]" aria-hidden />
          </span>
          <span className="min-w-0 truncate text-muted-foreground">{name}</span>
        </li>
      ))}
    </ul>
  );
}
