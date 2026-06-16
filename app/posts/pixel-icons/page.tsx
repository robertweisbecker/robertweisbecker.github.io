import { Demo } from "@/components/demo";
import { PixelIconMorphToggles } from "@/components/demos/pixel-icon-morph-toggles";
import { PixelIconMorphVisualizer } from "@/components/demos/pixel-icon-morph-visualizer";
import * as PixelIcons from "@/components/icons-pixel";
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
      { Icon: PixelIcons.PixelPauseOutlineIcon, name: "Pause Outline" },
      { Icon: PixelIcons.PixelPauseOutlineRoundedIcon, name: "Pause Rounded" },
      { Icon: PixelIcons.PixelPlayIcon, name: "Play" },
      { Icon: PixelIcons.PixelPlayFilledIcon, name: "Play Filled" },
      { Icon: PixelIcons.PixelPlayOutlineIcon, name: "Play Outline" },
      { Icon: PixelIcons.PixelVideoCameraIcon, name: "Video Camera" },
      { Icon: PixelIcons.PixelVolumeIcon, name: "Volume" },
      { Icon: PixelIcons.PixelVolumeMutedIcon, name: "Volume Muted" },
    ],
  },
  {
    title: "Logos",
    caption: "Tiny product and social marks",
    icons: [
      { Icon: PixelIcons.PixelGithubIcon, name: "GitHub" },
      { Icon: PixelIcons.PixelGithubOutlineIcon, name: "GitHub Outline" },
      { Icon: PixelIcons.PixelLinkedinIcon, name: "LinkedIn" },
      { Icon: PixelIcons.PixelLinkedinOutlineIcon, name: "LinkedIn Outline" },
      { Icon: PixelIcons.PixelVercelIcon, name: "Vercel" },
      { Icon: PixelIcons.PixelVercelOutlineIcon, name: "Vercel Outline" },
    ],
  },
  {
    title: "Documents",
    caption: "Files, notes, and written bits",
    icons: [
      { Icon: PixelIcons.PixelBillIcon, name: "Bill" },
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
      { Icon: PixelIcons.PixelReceiptIcon, name: "Receipt" },
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
    title: "Places",
    caption: "Devices, rooms, and everyday objects",
    icons: [
      { Icon: PixelIcons.PixelChefHatIcon, name: "Chef Hat" },
      { Icon: PixelIcons.PixelComputerOutlineIcon, name: "Computer Outline" },
      { Icon: PixelIcons.PixelComputerRetroIcon, name: "Computer Retro" },
      { Icon: PixelIcons.PixelFinderIcon, name: "Finder" },
      { Icon: PixelIcons.PixelFolderIcon, name: "Folder" },
      { Icon: PixelIcons.PixelFolderOpenIcon, name: "Folder Open" },
      { Icon: PixelIcons.PixelHomeIcon, name: "Home" },
      { Icon: PixelIcons.PixelHouseIcon, name: "House" },
      { Icon: PixelIcons.PixelHouseChimneyIcon, name: "House Chimney" },
      { Icon: PixelIcons.PixelHouseWindowIcon, name: "House Window" },
      { Icon: PixelIcons.PixelIphoneXIcon, name: "iPhone X" },
      { Icon: PixelIcons.PixelMonitorIcon, name: "Monitor" },
      { Icon: PixelIcons.PixelPresentationIcon, name: "Presentation" },
      { Icon: PixelIcons.PixelTvIcon, name: "TV" },
      { Icon: PixelIcons.PixelWalletIcon, name: "Wallet" },
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
      { Icon: PixelIcons.PixelGraduationCapIcon, name: "Graduation Cap" },
      { Icon: PixelIcons.PixelHelpIcon, name: "Help" },
      { Icon: PixelIcons.PixelHelp2Icon, name: "Help 2" },
      { Icon: PixelIcons.PixelHelp3Icon, name: "Help 3" },
      { Icon: PixelIcons.PixelInfoIcon, name: "Info" },
      { Icon: PixelIcons.PixelInfoCircleLowercaseIcon, name: "Info Circle Lowercase" },
      { Icon: PixelIcons.PixelLightbulbIcon, name: "Lightbulb" },
      { Icon: PixelIcons.PixelMoonIcon, name: "Moon" },
      { Icon: PixelIcons.PixelMoon2Icon, name: "Moon 2" },
      { Icon: PixelIcons.PixelOscarIcon, name: "Oscar" },
      { Icon: PixelIcons.PixelOscar2Icon, name: "Oscar 2" },
      { Icon: PixelIcons.PixelPaletteIcon, name: "Palette" },
      { Icon: PixelIcons.PixelPenToolIcon, name: "Pen Tool" },
      { Icon: PixelIcons.PixelQuestionCircleIcon, name: "Question Circle" },
      { Icon: PixelIcons.PixelRadioIcon, name: "Radio" },
      { Icon: PixelIcons.PixelScribbleIcon, name: "Scribble" },
      { Icon: PixelIcons.PixelShovelIcon, name: "Shovel" },
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
      <section className="space-y-3">
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <ul>
            <li>
              <strong>Build a sequence. </strong>
              Select any of the morphable 28-rect icons to add them to the sequence. The numbered badges show the order, and the dots below
              the preview let you jump to a specific step.
            </li>
            <li>
              <strong>Choose an animation. </strong>
              <strong>Linear</strong> moves each pixel at a constant rate, <strong>Ease</strong> gives the transition a softer UI feel, and{" "}
              <strong>Spring</strong> adds a snappier state-change response.
            </li>
            <li>
              <strong>Set the strategy. </strong>
              <strong>Nearest</strong> pairs pixels by shortest travel distance, <strong>Reading</strong> follows top-to-bottom ordering,{" "}
              <strong>Radial</strong> sorts around the icon center, <strong>Scatter</strong> spreads pixels outward before resolving, and{" "}
              <strong>Compress</strong> pulls them inward first.
            </li>
            <li>
              <strong>Adjust the speed. </strong>
              The control uses playback-style labels: <strong>1x</strong> is the default 200ms transition, <strong>0.5x</strong> slows it to
              400ms, and <strong>0.25x</strong> stretches it to 800ms.
            </li>
          </ul>
        </div>

        <h2 className="font-pixel text-[11px] uppercase">Morphs</h2>
        <PixelIconMorphVisualizer />
      </section>

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
