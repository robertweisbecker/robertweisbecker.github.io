import * as React from "react";

export type PixelIconPoint = {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
};

export type PixelIconData = {
  name: string;
  width: number;
  height: number;
  data: string;
  points: PixelIconPoint[];
};

export const pixelIconData: Record<string, PixelIconData> = {};

function parsePixelIconData(data: string): PixelIconPoint[] {
  return (data ? data.split(" ") : []).map((point) => {
    const [x, y, rectWidth = "1", rectHeight = "1", opacity = "1"] = point.split(",");

    return {
      x: Number(x),
      y: Number(y),
      width: Number(rectWidth),
      height: Number(rectHeight),
      opacity: Number(opacity),
    };
  });
}

type GeneratedPixelIconProps = React.ComponentProps<"svg"> & {
  data: string;
  iconHeight: number;
  iconWidth: number;
};

function GeneratedPixelIcon({ data, iconHeight, iconWidth, ...props }: GeneratedPixelIconProps) {
  const points = parsePixelIconData(data);

  return (
    <svg width={iconWidth} height={iconHeight} viewBox={`0 0 ${iconWidth} ${iconHeight}`} fill="currentColor" {...props}>
      {points.map((point, index) => (
        <rect
          key={`${point.x}-${point.y}-${point.width}-${point.height}-${point.opacity}-${index}`}
          x={point.x}
          y={point.y}
          width={point.width}
          height={point.height}
          opacity={point.opacity === 1 ? undefined : point.opacity}
        />
      ))}
    </svg>
  );
}

function createPixelIcon(name: string, width: number, height: number, data: string) {
  pixelIconData[name] = {
    name,
    width,
    height,
    data,
    points: parsePixelIconData(data),
  };

  return function PixelGeneratedIcon(props: React.ComponentProps<"svg">) {
    return <GeneratedPixelIcon iconWidth={width} iconHeight={height} data={data} {...props} />;
  };
}

export function PixelPointerIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor" {...props}>
      <path d="M4 9H5L5 10H3V7H4V9ZM9 9V10H7L7 9H9ZM6 8H7V9H5V7H6V8ZM10 9H9V7L10 7V9ZM3 7H2L2 4H3L3 7ZM9 7H8V6H7V5H9V7ZM10 5H9V4H7V3H10V5ZM4 2L2 2V4H1L1 1L4 1V2ZM7 3L4 3V2L7 2V3Z" />
    </svg>
  );
}

export const PixelScribbleIcon = createPixelIcon(
  "PixelScribbleIcon",
  11,
  11,
  "9,9 8,9 7,8 9,6 8,7 9,5 8,4 7,4 6,5 5,6 5,7 4,8 3,8 2,7 2,6 3,5 4,4 5,3 5,2 4,1 3,1 2,2 1,3"
);

export function PixelFinderIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M9 11H11V12H9V13H13V14H3V13H8V12H5V11H8V10H9V11ZM3 13H2V4H3V13ZM14 13H13V4H14V13ZM5 11H4V10H5V11ZM12 11H11V10H12V11ZM8 10H7V7H8V10ZM6 8H5V6H6V8ZM11 8H10V6H11V8ZM9 7H8V5H9V7ZM13 4H10V5H9V4H3V3H13V4Z" />
    </svg>
  );
}

export function PixelNewsIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M8 2h12v2H8zM6 4h2v16H6zm14 0h2v16h-2zM4 20h16v2H4zm-2-6h2v6H2zm2-2h2v2H4zm6-6h8v4h-8zm0 6h8v2h-8zm0 4h4v2h-4z" />
    </svg>
  );
}

export function PixelChevronsIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M13 20h-2v-2h2v2Zm-2-2H9v-2h2v2Zm4 0h-2v-2h2v2Zm-6-2H7v-2h2v2Zm8-2v2h-2v-2h2Zm-8-4H7V8h2v2Zm8 0h-2V8h2v2Zm-6-2H9V6h2v2Zm4 0h-2V6h2v2Zm-2-2h-2V4h2v2Z" />
    </svg>
  );
}

export function PixelChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M13 16h-2v-2h2v2Zm-2-2H9v-2h2v2Zm4 0h-2v-2h2v2Zm-6-2H7v-2h2v2Zm8 0h-2v-2h2v2ZM7 10H5V8h2v2Zm12 0h-2V8h2v2Z" />
    </svg>
  );
}

export function PixelClipboardIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M18 22H6v-2h12v2ZM6 20H4V6h2v14Zm14 0h-2V6h2v14ZM16 2v2h2v2h-2v2H8V6H6V4h2V2h8Zm-6 2v2h4V4h-4Z" />
    </svg>
  );
}

export function PixelSunIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M13 22h-2v-3h2v3Zm-6-3H5v-2h2v2Zm12 0h-2v-2h2v2Zm-4-2H9v-2h6v2Zm-6-2H7V9h2v6Zm8 0h-2V9h2v6ZM5 13H2v-2h3v2Zm17 0h-3v-2h3v2Zm-7-4H9V7h6v2ZM7 7H5V5h2v2Zm12 0h-2V5h2v2Zm-6-2h-2V2h2v3Z"></path>
    </svg>
  );
}
export const PixelRedoIcon = createPixelIcon("PixelRedoIcon", 11, 11, "8,6 8,5 6,9 5,9 8,7 7,8 4,3 5,3 6,3 7,4 3,3 2,3 4,5 3,2 4,1 3,4");
export const PixelDropdownIcon = createPixelIcon("PixelDropdownIcon", 11, 11, "8,4 5,7 7,5 6,6 4,6 3,5 2,4");
export function PixelMoonIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15 3V4.5H13.5V6H12V7.5H10.5V12H12V13.5H13.5V15H18V13.5H19.5V12H21V15H19.5V18H18V19.5H15V21H9V19.5H6V18H4.5V15H3V9H4.5V6H6V4.5H9V3H15Z"
        fill="currentColor"
      />
    </svg>
  );
}
export const PixelLoaderIcon = createPixelIcon(
  "PixelLoaderIcon",
  11,
  11,
  "5,1 5,2 8,2,1,1,0.885 2,2,1,1,0.125 7,3,1,1,0.885 3,3,1,1,0.125 1,5,1,1,0.25 2,5,1,1,0.25 8,5,1,1,0.75 9,5,1,1,0.75 3,7,1,1,0.375 7,7,1,1,0.625 2,8,1,1,0.375 5,8,1,1,0.5 8,8,1,1,0.625 5,9,1,1,0.5"
);
export const PixelShuffleIcon = createPixelIcon(
  "PixelShuffleIcon",
  11,
  11,
  "10,3 10,5 9,6 7,2 8,2 9,2 6,2 5,2 4,2 3,2 2,2 10,4 4,4 3,1 3,3 4,0 0,5 1,4 0,6 0,7 1,8 2,8 3,8 8,8 7,7 6,6 7,9 6,10 4,8 5,8 6,8 7,8"
);

export const PixelComputerOutlineIcon = createPixelIcon(
  "PixelComputerOutlineIcon",
  11,
  11,
  "3,2 4,2 5,2 6,2 7,2 2,3 8,3 2,4 4,4 5,4 6,4 8,4 2,5 4,5 5,5 6,5 8,5 2,6 8,6 3,7 7,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9"
);
export const PixelSparklesIcon = createPixelIcon(
  "PixelSparklesIcon",
  11,
  11,
  "9,0 5,1 8,1 10,1 4,2 6,2 9,2 4,3 6,3 2,4 3,4 7,4 8,4 1,5 9,5 2,6 3,6 7,6 8,6 4,7 6,7 1,8 4,8 6,8 0,9 2,9 5,9 1,10"
);

export const PixelDownloadIcon = createPixelIcon(
  "PixelDownloadIcon",
  11,
  11,
  "5,1 5,2 5,3 1,4 5,4 9,4 1,5 3,5 5,5 7,5 9,5 1,6 4,6 5,6 6,6 9,6 1,7 5,7 9,7 1,8 9,8 2,9 3,9 4,9 5,9 6,9 7,9 8,9"
);
export const PixelHelpIcon = createPixelIcon(
  "PixelHelpIcon",
  11,
  11,
  "4,0 5,0 6,0 3,1 7,1 2,2 5,2 8,2 1,3 4,3 6,3 9,3 1,4 6,4 9,4 1,5 5,5 9,5 1,6 9,6 2,7 5,7 8,7 3,8 7,8 4,9 5,9 6,9"
);
export const PixelEyeIcon = createPixelIcon(
  "PixelEyeIcon",
  11,
  11,
  "4,2 5,2 6,2 2,3 3,3 7,3 8,3 1,4 5,4 6,4 9,4 0,5 4,5 5,5 6,5 10,5 1,6 4,6 5,6 6,6 9,6 2,7 8,7 3,8 4,8 5,8 6,8 7,8"
);
export const PixelRadioIcon = createPixelIcon(
  "PixelRadioIcon",
  11,
  11,
  "3,2 4,2 5,2 6,2 2,3 7,3 1,4 4,4 5,4 8,4 1,5 3,5 6,5 8,5 1,6 3,6 6,6 8,6 1,7 4,7 5,7 8,7 2,8 7,8 3,9 4,9 5,9 6,9"
);
export const PixelStarIcon = createPixelIcon(
  "PixelStarIcon",
  11,
  11,
  "5,0 4,1 6,1 4,2 6,2 1,3 2,3 3,3 7,3 8,3 9,3 1,4 9,4 2,5 8,5 3,6 7,6 2,7 5,7 8,7 2,8 4,8 6,8 8,8 2,9 3,9 7,9 8,9"
);
export const PixelNewspaperIcon = createPixelIcon(
  "PixelNewspaperIcon",
  11,
  11,
  "4,2 5,2 6,2 7,2 8,2 3,3 8,3 3,4 5,4 6,4 8,4 2,5 3,5 8,5 1,6 3,6 5,6 8,6 1,7 3,7 8,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9"
);
export const PixelVolumeMutedIcon = createPixelIcon(
  "PixelVolumeMutedIcon",
  11,
  11,
  "9,1 5,2 9,2 4,3 5,3 8,3 2,4 3,4 5,4 8,4 10,4 1,5 5,5 7,5 10,5 2,6 3,6 7,6 10,6 4,7 6,7 9,7 9,7 6,8 9,8 5,9 8,9 5,10"
);
export const PixelComputerRetroIcon = createPixelIcon(
  "PixelComputerRetroIcon",
  11,
  11,
  "3,2 4,2 5,2 6,2 7,2 2,3 8,3 2,4 4,4 5,4 6,4 8,4 2,5 4,5 5,5 6,5 8,5 2,6 8,6 2,7 8,7 2,8 6,8 8,8 3,9 4,9 5,9 7,9"
);
export const PixelSwirlIcon = createPixelIcon(
  "PixelSwirlIcon",
  11,
  11,
  "3,2 4,2 5,2 6,2 7,2 2,3 8,3 1,4 4,4 5,4 6,4 1,5 3,5 7,5 1,6 3,6 5,6 8,6 1,7 4,7 5,7 8,7 2,8 7,8 3,9 4,9 5,9 6,9"
);
export const PixelPlayFilledIcon = createPixelIcon(
  "PixelPlayFilledIcon",
  11,
  11,
  "2,3 3,3 2,4 3,4 4,4 5,4 6,4 2,5 3,5 4,5 5,5 6,5 7,5 8,5 2,6 3,6 4,6 5,6 6,6 7,6 8,6 2,7 3,7 4,7 5,7 6,7 2,8 3,8"
);
export const PixelInfoIcon = createPixelIcon(
  "PixelInfoIcon",
  11,
  11,
  "3,1 4,1 5,1 6,1 7,1 2,2 8,2 1,3 5,3 9,3 1,4 9,4 1,5 5,5 9,5 1,6 5,6 9,6 1,7 5,7 9,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9"
);
export const PixelGradientIcon = createPixelIcon(
  "PixelGradientIcon",
  11,
  11,
  "3,2 4,2 5,2 6,2 7,2 2,3 6,3 8,3 2,4 5,4 7,4 8,4 2,5 6,5 8,5 2,6 5,6 7,6 8,6 2,7 4,7 6,7 8,7 3,8 4,8 5,8 6,8 7,8"
);
export const PixelLightbulbIcon = createPixelIcon(
  "PixelLightbulbIcon",
  11,
  11,
  "4,1 5,1 6,1 3,2 7,2 2,3 8,3 2,4 4,4 6,4 8,4 2,5 4,5 5,5 6,5 8,5 2,6 5,6 8,6 3,7 5,7 7,7 4,8 5,8 6,8 4,9 5,9 6,9"
);
export const PixelPauseIcon = createPixelIcon(
  "PixelPauseIcon",
  11,
  11,
  "3,2 4,2 6,2 7,2 3,3 4,3 6,3 7,3 3,4 4,4 6,4 7,4 3,5 4,5 6,5 7,5 3,6 4,6 6,6 7,6 3,7 4,7 6,7 7,7 3,8 4,8 6,8 7,8"
);
export const PixelMarkdownIcon = createPixelIcon(
  "PixelMarkdownIcon",
  11,
  11,
  "0,3 4,3 8,3 0,4 1,4 3,4 4,4 8,4 0,5 2,5 4,5 6,5 8,5 10,5 0,6 2,6 4,6 6,6 7,6 8,6 9,6 10,6 0,7 4,7 7,7 8,7 9,7 8,8"
);
export const PixelMessage2Icon = createPixelIcon(
  "PixelMessage2Icon",
  11,
  11,
  "3,0 4,0 5,0 6,0 7,0 2,1 8,1 1,2 9,2 0,3 10,3 0,4 10,4 0,5 10,5 0,6 10,6 1,7 9,7 2,8 8,8 3,9 4,9 5,9 9,9 6,10 7,10 8,10"
);
export const PixelBigArrowDownIcon = createPixelIcon(
  "PixelBigArrowDownIcon",
  11,
  11,
  "4,0 5,0 6,0 4,1 6,1 4,2 6,2 4,3 6,3 4,4 6,4 1,5 2,5 3,5 4,5 6,5 7,5 8,5 9,5 1,6 9,6 2,7 8,7 3,8 7,8 4,9 6,9 5,10"
);
export const PixelTvIcon = createPixelIcon(
  "PixelTvIcon",
  11,
  11,
  "1,2 2,2 3,2 4,2 5,2 6,2 7,2 8,2 9,2 1,3 9,3 1,4 9,4 1,5 9,5 1,6 9,6 1,7 2,7 3,7 4,7 5,7 6,7 7,7 8,7 9,7 3,8 7,8"
);
export const PixelPaletteIcon = createPixelIcon(
  "PixelPaletteIcon",
  11,
  11,
  "3,1 4,1 5,1 6,1 7,1 2,2 8,2 1,3 6,3 9,3 1,4 4,4 9,4 1,5 9,5 1,6 3,6 7,6 8,6 1,7 6,7 2,8 7,8 3,9 4,9 5,9 6,9 7,9"
);
export const PixelUserIcon = createPixelIcon(
  "PixelUserIcon",
  11,
  11,
  "4,2 5,2 3,3 4,3 5,3 6,3 3,4 4,4 5,4 6,4 4,5 5,5 3,7 4,7 5,7 6,7 2,8 3,8 4,8 5,8 6,8 7,8 2,9 3,9 4,9 5,9 6,9 7,9"
);
export const PixelBillIcon = createPixelIcon(
  "PixelBillIcon",
  11,
  11,
  "6,2 7,2 8,2 9,2 5,3 8,3 9,3 1,4 2,4 3,4 4,4 9,4 1,5 2,5 8,5 9,5 1,6 6,6 7,6 8,6 9,6 1,7 2,7 5,7 1,8 2,8 3,8 4,8"
);
export const PixelPause2Icon = createPixelIcon(
  "PixelPause2Icon",
  11,
  11,
  "2,2 3,2 7,2 8,2 2,3 3,3 7,3 8,3 2,4 3,4 7,4 8,4 2,5 3,5 7,5 8,5 2,6 3,6 7,6 8,6 2,7 3,7 7,7 8,7 2,8 3,8 7,8 8,8"
);
export const PixelMarkdown2Icon = createPixelIcon(
  "PixelMarkdown2Icon",
  11,
  11,
  "0,3 4,3 7,3 8,3 9,3 0,4 1,4 3,4 4,4 7,4 8,4 9,4 0,5 2,5 4,5 6,5 7,5 8,5 9,5 10,5 0,6 4,6 7,6 8,6 9,6 0,7 4,7 8,7"
);
export const PixelHelp2Icon = createPixelIcon(
  "PixelHelp2Icon",
  11,
  11,
  "4,0 5,0 6,0 3,1 4,1 5,1 6,1 7,1 2,2 3,2 7,2 8,2 2,3 3,3 7,3 8,3 7,4 8,4 6,5 7,5 5,6 6,6 4,7 5,7 4,9 5,9 4,10 5,10"
);
export const PixelCheckboxIcon = createPixelIcon(
  "PixelCheckboxIcon",
  11,
  11,
  "2,2 3,2 4,2 5,2 6,2 7,2 1,3 8,3 1,4 8,4 1,5 6,5 8,5 1,6 3,6 5,6 8,6 1,7 4,7 8,7 1,8 8,8 2,9 3,9 4,9 5,9 6,9 7,9"
);
export const PixelPlayOutlineIcon = createPixelIcon(
  "PixelPlayOutlineIcon",
  11,
  11,
  "2,0 3,0 1,1 4,1 5,1 1,2 6,2 7,2 1,3 8,3 9,3 1,4 10,4 1,5 10,5 1,6 10,6 1,7 8,7 9,7 1,8 6,8 7,8 1,9 4,9 5,9 2,10 3,10"
);
export const PixelStarburstIcon = createPixelIcon(
  "PixelStarburstIcon",
  11,
  11,
  "5,0 1,1 5,1 9,1 3,2 4,2 6,2 7,2 2,3 8,3 2,4 8,4 0,5 1,5 9,5 10,5 2,6 8,6 2,7 8,7 3,8 4,8 6,8 7,8 1,9 5,9 9,9 5,10"
);
export const PixelPenToolIcon = createPixelIcon(
  "PixelPenToolIcon",
  11,
  11,
  "1,1 2,1 3,1 4,1 1,2 2,2 5,2 6,2 1,3 3,3 7,3 1,4 4,4 5,4 8,4 2,5 4,5 6,5 8,5 2,6 5,6 9,6 3,7 8,7 4,8 5,8 7,8 6,9"
);
export const PixelPauseOutlineIcon = createPixelIcon(
  "PixelPauseOutlineIcon",
  11,
  11,
  "2,3 3,3 4,3 7,3 8,3 9,3 2,4 4,4 7,4 9,4 2,5 4,5 7,5 9,5 2,6 4,6 7,6 9,6 2,7 4,7 7,7 9,7 2,8 3,8 4,8 7,8 8,8 9,8"
);
export const PixelExternalIcon = createPixelIcon(
  "PixelExternalIcon",
  11,
  11,
  "6,1 7,1 8,1 9,1 2,2 3,2 8,2 9,2 1,3 7,3 9,3 1,4 6,4 9,4 1,5 5,5 1,6 4,6 1,7 8,7 1,8 8,8 2,9 3,9 4,9 5,9 6,9 7,9"
);
export const PixelIphoneXIcon = createPixelIcon(
  "PixelIphoneXIcon",
  11,
  11,
  "3,1 4,1 5,1 6,1 7,1 2,2 4,2 5,2 6,2 8,2 2,3 8,3 2,4 8,4 2,5 8,5 2,6 8,6 2,7 5,7 8,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9"
);
export const PixelListIcon = createPixelIcon(
  "PixelListIcon",
  11,
  11,
  "1,2 3,2 4,2 5,2 6,2 7,2 8,2 9,2 1,4 3,4 4,4 5,4 6,4 7,4 1,6 3,6 4,6 5,6 6,6 7,6 8,6 9,6 1,8 3,8 4,8 5,8 6,8 7,8"
);
export const PixelVolumeIcon = createPixelIcon(
  "PixelVolumeIcon",
  11,
  11,
  "8,1 4,2 9,2 3,3 4,3 6,3 9,3 1,4 2,4 4,4 7,4 10,4 0,5 4,5 7,5 10,5 1,6 2,6 4,6 7,6 10,6 3,7 4,7 6,7 9,7 4,8 9,8 8,9"
);
export const PixelHouseChimneyIcon = createPixelIcon(
  "PixelHouseChimneyIcon",
  11,
  11,
  "7,1 8,2 5,3 7,3 4,4 5,4 6,4 7,4 3,5 4,5 6,5 7,5 2,6 3,6 4,6 5,6 6,6 7,6 8,6 3,7 4,7 5,7 6,7 7,7 3,8 4,8 6,8 7,8"
);
export const PixelSunSmallIcon = createPixelIcon(
  "PixelSunSmallIcon",
  11,
  11,
  "5,0 1,1 5,1 9,1 2,2 8,2 4,3 5,3 6,3 3,4 7,4 0,5 1,5 3,5 7,5 9,5 10,5 3,6 7,6 4,7 5,7 6,7 2,8 8,8 1,9 5,9 9,9 5,10"
);
export const PixelCopyIcon = createPixelIcon(
  "PixelCopyIcon",
  11,
  11,
  "4,2 5,2 6,2 7,2 4,3 8,3 2,4 3,4 4,4 5,4 8,4 2,5 6,5 8,5 2,6 6,6 8,6 2,7 6,7 7,7 8,7 2,8 6,8 2,9 3,9 4,9 5,9 6,9"
);
export const PixelMoon2Icon = createPixelIcon(
  "PixelMoon2Icon",
  11,
  11,
  "8,1 3,2 4,2 5,2 7,2 9,2 2,3 4,3 8,3 1,4 3,4 1,5 3,5 8,5 1,6 4,6 7,6 8,6 1,7 5,7 6,7 8,7 2,8 7,8 3,9 4,9 5,9 6,9"
);
export const PixelPointer2Icon = createPixelIcon(
  "PixelPointer2Icon",
  11,
  11,
  "1,1 2,1 3,1 1,2 4,2 5,2 6,2 1,3 7,3 8,3 2,4 9,4 2,5 7,5 8,5 2,6 8,6 3,7 5,7 9,7 3,8 5,8 6,8 8,8 9,8 4,9 7,9 8,9"
);
export const PixelStarburst2Icon = createPixelIcon(
  "PixelStarburst2Icon",
  11,
  11,
  "5,0 1,1 5,1 9,1 2,2 4,2 6,2 8,2 3,3 7,3 2,4 8,4 0,5 1,5 9,5 10,5 2,6 8,6 3,7 7,7 2,8 4,8 6,8 8,8 1,9 5,9 9,9 5,10"
);
export const PixelTargetIcon = createPixelIcon(
  "PixelTargetIcon",
  11,
  11,
  "5,1 4,2 5,2 6,2 3,3 5,3 7,3 2,4 5,4 8,4 1,5 2,5 3,5 4,5 6,5 7,5 8,5 9,5 2,6 5,6 8,6 3,7 5,7 7,7 4,8 5,8 6,8 5,9"
);
export const PixelHouseWindowIcon = createPixelIcon(
  "PixelHouseWindowIcon",
  11,
  11,
  "5,2 4,3 5,3 6,3 3,4 4,4 5,4 6,4 7,4 2,5 3,5 4,5 6,5 7,5 8,5 3,6 4,6 5,6 6,6 7,6 3,7 4,7 6,7 7,7 3,8 4,8 6,8 7,8"
);
export const PixelAtSignIcon = createPixelIcon(
  "PixelAtSignIcon",
  11,
  11,
  "3,2 4,2 5,2 6,2 7,2 2,3 8,3 2,4 5,4 6,4 8,4 2,5 4,5 6,5 8,5 2,6 4,6 6,6 8,6 2,7 4,7 5,7 7,7 8,7 2,8 3,9 4,9 5,9"
);
export const PixelWarningIcon = createPixelIcon(
  "PixelWarningIcon",
  11,
  11,
  "4,1 5,1 6,1 3,2 7,2 3,3 5,3 7,3 2,4 5,4 8,4 2,5 5,5 8,5 2,6 8,6 1,7 5,7 9,7 1,8 9,8 2,9 3,9 4,9 5,9 6,9 7,9 8,9"
);
export const PixelCommentIcon = createPixelIcon(
  "PixelCommentIcon",
  11,
  11,
  "2,1 3,1 4,1 5,1 6,1 7,1 8,1 1,2 9,2 1,3 9,3 1,4 9,4 1,5 9,5 1,6 9,6 1,7 9,7 2,8 3,8 4,8 5,8 6,8 9,8 7,9 9,9 8,10"
);
export const PixelTilesIcon = createPixelIcon(
  "PixelTilesIcon",
  11,
  11,
  "2,2 3,2 5,2 7,2 8,2 2,3 4,3 6,3 8,3 3,4 5,4 7,4 2,5 4,5 6,5 8,5 3,6 5,6 7,6 2,7 4,7 6,7 8,7 2,8 3,8 5,8 7,8 8,8"
);
export const PixelReceiptIcon = createPixelIcon(
  "PixelReceiptIcon",
  11,
  11,
  "2,2 3,2 4,2 5,2 6,2 7,2 8,2 2,3 8,3 2,4 4,4 5,4 8,4 2,5 8,5 2,6 5,6 6,6 8,6 2,7 8,7 2,8 4,8 6,8 8,8 3,9 5,9 7,9"
);
export const PixelStar2Icon = createPixelIcon(
  "PixelStar2Icon",
  11,
  11,
  "5,1 4,2 6,2 4,3 6,3 1,4 2,4 3,4 7,4 8,4 9,4 1,5 9,5 2,6 8,6 3,7 7,7 2,8 5,8 8,8 2,9 4,9 6,9 8,9 2,10 3,10 7,10 8,10"
);
export const PixelHelp3Icon = createPixelIcon(
  "PixelHelp3Icon",
  11,
  11,
  "3,2 4,2 5,2 6,2 7,2 2,3 8,3 1,4 5,4 9,4 1,5 6,5 9,5 1,6 5,6 9,6 1,7 9,7 1,8 5,8 9,8 2,9 8,9 3,10 4,10 5,10 6,10 7,10"
);
export const PixelPlayIcon = createPixelIcon(
  "PixelPlayIcon",
  11,
  11,
  "3,2 4,2 3,3 4,3 5,3 6,3 3,4 4,4 5,4 6,4 7,4 3,5 4,5 5,5 6,5 7,5 8,5 3,6 4,6 5,6 6,6 7,6 3,7 4,7 5,7 6,7 3,8 4,8"
);
export const PixelMonitorIcon = createPixelIcon(
  "PixelMonitorIcon",
  11,
  11,
  "2,2 3,2 4,2 5,2 6,2 7,2 8,2 2,3 8,3 2,4 8,4 2,5 8,5 2,6 3,6 4,6 5,6 6,6 7,6 8,6 4,7 5,7 6,7 3,8 4,8 5,8 6,8 7,8"
);
export const PixelAutoIcon = createPixelIcon(
  "PixelAutoIcon",
  11,
  11,
  "4,2 5,2 6,2 3,3 7,3 2,4 4,4 5,4 6,4 8,4 2,5 4,5 5,5 6,5 8,5 2,6 8,6 2,7 4,7 5,7 6,7 8,7 2,8 4,8 6,8 8,8 3,9 7,9"
);
export const PixelBookIcon = createPixelIcon(
  "PixelBookIcon",
  11,
  11,
  "3,2 4,2 5,2 6,2 7,2 8,2 2,3 4,3 8,3 2,4 4,4 8,4 2,5 4,5 8,5 2,6 4,6 8,6 2,7 8,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9 8,9"
);
export const PixelHomeIcon = createPixelIcon(
  "PixelHomeIcon",
  11,
  11,
  "5,1 4,2 6,2 3,3 7,3 2,4 8,4 1,5 9,5 0,6 4,6 5,6 6,6 10,6 1,7 4,7 6,7 9,7 1,8 4,8 6,8 9,8 2,9 3,9 4,9 6,9 7,9 8,9"
);
export const PixelHouseIcon = createPixelIcon(
  "PixelHouseIcon",
  11,
  11,
  "5,2 4,3 5,3 6,3 3,4 4,4 5,4 6,4 7,4 2,5 3,5 4,5 5,5 6,5 7,5 8,5 3,6 4,6 6,6 7,6 3,7 4,7 6,7 7,7 3,8 4,8 6,8 7,8"
);
export const PixelPersonIcon = createPixelIcon(
  "PixelPersonIcon",
  11,
  11,
  "4,1 5,1 6,1 4,2 6,2 4,3 5,3 6,3 2,5 3,5 4,5 5,5 6,5 7,5 8,5 4,6 5,6 6,6 4,7 5,7 6,7 4,8 5,8 6,8 4,9 6,9 4,10 6,10"
);
export const PixelSun2Icon = createPixelIcon(
  "PixelSun2Icon",
  11,
  11,
  "5,0 1,1 9,1 2,2 4,2 5,2 6,2 8,2 3,3 7,3 2,4 8,4 0,5 2,5 8,5 10,5 2,6 8,6 3,7 7,7 2,8 4,8 5,8 6,8 8,8 1,9 9,9 5,10"
);
export const PixelWalletIcon = createPixelIcon(
  "PixelWalletIcon",
  11,
  11,
  "2,2 3,2 4,2 5,2 6,2 7,2 1,3 8,3 1,4 8,4 1,5 8,5 1,6 8,6 1,7 3,7 4,7 5,7 6,7 7,7 1,8 8,8 2,9 3,9 4,9 5,9 6,9 7,9"
);
export const PixelCursor2Icon = createPixelIcon(
  "PixelCursor2Icon",
  11,
  11,
  "1,1 2,1 0,2 3,2 4,2 0,3 5,3 6,3 1,4 7,4 8,4 1,5 9,5 2,6 7,6 8,6 2,7 7,7 3,8 5,8 6,8 8,8 3,9 5,9 7,9 9,9 4,10 8,10"
);
export const PixelStar3Icon = createPixelIcon(
  "PixelStar3Icon",
  11,
  11,
  "5,1 4,2 6,2 1,3 2,3 3,3 4,3 6,3 7,3 8,3 9,3 1,4 9,4 2,5 8,5 3,6 7,6 2,7 5,7 8,7 2,8 4,8 6,8 8,8 2,9 3,9 7,9 8,9"
);
export const PixelFolderIcon = createPixelIcon(
  "PixelFolderIcon",
  11,
  11,
  "2,2 3,2 4,2 1,3 5,3 1,4 2,4 3,4 4,4 5,4 6,4 7,4 8,4 1,5 9,5 1,6 9,6 1,7 9,7 1,8 9,8 2,9 3,9 4,9 5,9 6,9 7,9 8,9"
);
export const PixelBookOpenIcon = createPixelIcon(
  "PixelBookOpenIcon",
  11,
  11,
  "1,2 2,2 3,2 4,2 6,2 7,2 8,2 9,2 1,3 5,3 9,3 1,4 5,4 9,4 1,5 5,5 9,5 1,6 9,6 1,7 9,7 2,8 3,8 4,8 6,8 7,8 8,8 5,9"
);
export const PixelNoteIcon = createPixelIcon(
  "PixelNoteIcon",
  11,
  11,
  "2,2 3,2 4,2 5,2 6,2 7,2 8,2 9,2 2,3 9,3 2,4 9,4 2,5 9,5 2,6 7,6 8,6 9,6 2,7 7,7 8,7 2,8 7,8 2,9 3,9 4,9 5,9 6,9"
);
export const PixelYinYangIcon = createPixelIcon(
  "PixelYinYangIcon",
  11,
  11,
  "4,2 5,2 6,2 3,3 6,3 7,3 2,4 4,4 6,4 7,4 8,4 2,5 6,5 7,5 8,5 2,6 4,6 5,6 6,6 7,6 8,6 3,7 4,7 6,7 7,7 4,8 5,8 6,8"
);
export const PixelDownloadWideIcon = createPixelIcon(
  "PixelDownloadWideIcon",
  11,
  11,
  "5,1 5,2 5,3 5,4 0,5 3,5 5,5 7,5 10,5 0,6 4,6 5,6 6,6 10,6 0,7 5,7 10,7 0,8 10,8 1,9 2,9 3,9 4,9 5,9 6,9 7,9 8,9 9,9"
);
export const PixelWarningCircleIcon = createPixelIcon(
  "PixelWarningCircleIcon",
  11,
  11,
  "3,1 4,1 5,1 6,1 7,1 2,2 8,2 1,3 5,3 9,3 1,4 5,4 9,4 1,5 5,5 9,5 1,6 9,6 1,7 5,7 9,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9"
);
export const PixelFolderOpenIcon = createPixelIcon(
  "PixelFolderOpenIcon",
  11,
  11,
  "2,2 3,2 4,2 1,3 5,3 6,3 1,4 7,4 1,5 5,5 6,5 7,5 8,5 1,6 4,6 9,6 1,7 4,7 9,7 1,8 3,8 8,8 2,9 3,9 4,9 5,9 6,9 7,9"
);

export const PixelClipboardCheckIcon = createPixelIcon(
  "PixelClipboardCheckIcon",
  11,
  11,
  "4,1 5,1 3,2 6,2 2,3 4,3 5,3 7,3 1,4 8,4 1,5 6,5 8,5 1,6 3,6 5,6 8,6 1,7 4,7 8,7 1,8 8,8 2,9 3,9 4,9 5,9 6,9 7,9"
);
export const PixelGraduationCapIcon = createPixelIcon(
  "PixelGraduationCapIcon",
  11,
  11,
  "5,1 3,2 4,2 6,2 7,2 1,3 2,3 8,3 9,3 0,4 10,4 1,5 9,5 2,6 3,6 7,6 8,6 2,7 4,7 5,7 6,7 8,7 3,8 7,8 9,8 4,9 5,9 6,9"
);
export const PixelCalendarIcon = createPixelIcon(
  "PixelCalendarIcon",
  11,
  11,
  "3,2 4,2 5,2 6,2 7,2 2,3 8,3 2,4 3,4 4,4 5,4 6,4 7,4 8,4 2,5 8,5 2,6 4,6 5,6 6,6 8,6 2,7 8,7 3,8 4,8 5,8 6,8 7,8"
);
export const PixelCalendarDayIcon = createPixelIcon(
  "PixelCalendarDayIcon",
  11,
  11,
  "4,1 5,1 6,1 3,2 7,2 2,3 5,3 8,3 1,4 9,4 1,5 4,5 5,5 9,5 1,6 5,6 9,6 1,7 5,7 6,7 9,7 2,8 8,8 3,9 7,9 4,10 5,10 6,10"
);
export const PixelCaptionsIcon = createPixelIcon(
  "PixelCaptionsIcon",
  11,
  11,
  "3,1 4,1 5,1 6,1 7,1 8,1 2,2 9,2 2,3 4,3 5,3 6,3 9,3 2,4 9,4 2,5 4,5 5,5 9,5 2,6 9,6 3,7 6,7 7,7 8,7 3,8 5,8 4,9"
);
export const PixelChefHatIcon = createPixelIcon(
  "PixelChefHatIcon",
  11,
  11,
  "3,1 4,1 5,1 6,1 7,1 1,2 2,2 8,2 9,2 0,3 10,3 0,4 10,4 0,5 10,5 1,6 9,6 2,7 4,7 6,7 8,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9"
);
export const PixelEnvelopeIcon = createPixelIcon(
  "PixelEnvelopeIcon",
  11,
  11,
  "3,2 4,2 5,2 6,2 7,2 8,2 2,3 9,3 2,4 3,4 8,4 9,4 2,5 4,5 7,5 9,5 2,6 5,6 6,6 9,6 2,7 9,7 3,8 4,8 5,8 6,8 7,8 8,8"
);
export const PixelEyeClosedIcon = createPixelIcon(
  "PixelEyeClosedIcon",
  11,
  11,
  "0,4 10,4 0,5 10,5 1,6 9,6 1,7 2,7 8,7 9,7 0,8 2,8 3,8 4,8 5,8 6,8 7,8 8,8 10,8 1,9 3,9 5,9 7,9 9,9 2,10 4,10 6,10 8,10"
);
export const PixelFileIcon = createPixelIcon(
  "PixelFileIcon",
  11,
  11,
  "2,2 3,2 4,2 5,2 6,2 7,2 2,3 8,3 2,4 4,4 5,4 6,4 8,4 2,5 8,5 2,6 4,6 8,6 2,7 8,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9 8,9"
);
export const PixelFileFoldedIcon = createPixelIcon(
  "PixelFileFoldedIcon",
  11,
  11,
  "2,2 3,2 4,2 5,2 6,2 2,3 5,3 7,3 2,4 5,4 8,4 2,5 5,5 6,5 7,5 8,5 2,6 8,6 2,7 8,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9 8,9"
);
export const PixelGithubIcon = createPixelIcon(
  "PixelGithubIcon",
  11,
  11,
  "4,2 7,2 4,3 5,3 6,3 7,3 3,4 4,4 5,4 6,4 7,4 8,4 3,5 4,5 5,5 6,5 7,5 8,5 4,6 5,6 6,6 7,6 3,7 5,7 6,7 4,8 5,8 6,8"
);
export const PixelGithubOutlineIcon = createPixelIcon(
  "PixelGithubOutlineIcon",
  11,
  11,
  "3,1 4,1 7,1 8,1 3,2 5,2 6,2 8,2 2,3 9,3 2,4 9,4 2,5 9,5 1,6 3,6 8,6 2,7 4,7 7,7 2,8 3,8 8,8 3,9 4,9 5,9 6,9 7,9"
);
export const PixelInfoCircleLowercaseIcon = createPixelIcon(
  "PixelInfoCircleLowercaseIcon",
  11,
  11,
  "3,1 4,1 5,1 6,1 7,1 2,2 8,2 1,3 9,3 1,4 5,4 9,4 1,5 9,5 1,6 4,6 5,6 9,6 1,7 5,7 9,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9"
);
export const PixelLinkedinIcon = createPixelIcon(
  "PixelLinkedinIcon",
  11,
  11,
  "1,3 2,3 1,4 2,4 4,5 6,5 7,5 8,5 1,6 2,6 4,6 5,6 6,6 7,6 8,6 9,6 1,7 2,7 4,7 5,7 8,7 9,7 1,8 2,8 4,8 5,8 8,8 9,8"
);
export const PixelLinkedinOutlineIcon = createPixelIcon(
  "PixelLinkedinOutlineIcon",
  11,
  11,
  "2,3 3,3 4,3 2,4 4,4 5,4 6,4 7,4 2,5 3,5 4,5 5,5 7,5 8,5 2,6 4,6 8,6 2,7 4,7 6,7 8,7 2,8 3,8 4,8 5,8 6,8 7,8 8,8"
);
export const PixelNotepadIcon = createPixelIcon(
  "PixelNotepadIcon",
  11,
  11,
  "2,2 3,2 4,2 5,2 6,2 7,2 2,3 4,3 8,3 2,4 8,4 2,5 4,5 8,5 2,6 8,6 2,7 4,7 8,7 2,8 8,8 2,9 3,9 4,9 5,9 6,9 7,9 8,9"
);
export const PixelOscarIcon = createPixelIcon(
  "PixelOscarIcon",
  11,
  11,
  "4,0 5,0 6,0 4,1 6,1 5,2 4,3 5,3 6,3 3,4 7,4 3,5 4,5 6,5 7,5 5,6 4,7 6,7 4,8 6,8 4,9 5,9 6,9 3,10 4,10 5,10 6,10 7,10"
);
export const PixelOscar2Icon = createPixelIcon(
  "PixelOscar2Icon",
  11,
  11,
  "5,0 4,1 6,1 5,2 4,3 5,3 6,3 3,4 7,4 3,5 4,5 6,5 7,5 5,6 4,7 6,7 4,8 6,8 3,9 4,9 5,9 6,9 7,9 2,10 4,10 5,10 6,10 8,10"
);
export const PixelPaperclipIcon = createPixelIcon(
  "PixelPaperclipIcon",
  11,
  11,
  "4,1 5,1 6,1 3,2 7,2 2,3 5,3 8,3 2,4 4,4 6,4 8,4 2,5 4,5 6,5 8,5 2,6 4,6 6,6 8,6 4,7 6,7 8,7 4,8 8,8 5,9 6,9 7,9"
);
export const PixelPauseOutlineRoundedIcon = createPixelIcon(
  "PixelPauseOutlineRoundedIcon",
  11,
  11,
  "3,2 7,2 2,3 4,3 6,3 8,3 2,4 4,4 6,4 8,4 2,5 4,5 6,5 8,5 2,6 4,6 6,6 8,6 2,7 4,7 6,7 8,7 2,8 4,8 6,8 8,8 3,9 7,9"
);
export const PixelMessageIcon = createPixelIcon(
  "PixelMessageIcon",
  11,
  11,
  "2,1 3,1 4,1 5,1 6,1 7,1 8,1 1,2 9,2 1,3 9,3 1,4 9,4 1,5 9,5 1,6 9,6 1,7 9,7 2,8 5,8 6,8 7,8 8,8 2,9 4,9 2,10 3,10"
);
export const PixelPresentationIcon = createPixelIcon(
  "PixelPresentationIcon",
  11,
  11,
  "2,1 3,1 4,1 5,1 6,1 7,1 8,1 1,2 9,2 1,3 9,3 1,4 9,4 1,5 9,5 2,6 3,6 4,6 5,6 6,6 7,6 8,6 5,7 4,8 5,8 6,8 3,9 7,9"
);
export const PixelQuestionCircleIcon = createPixelIcon(
  "PixelQuestionCircleIcon",
  11,
  11,
  "3,1 4,1 5,1 6,1 7,1 2,2 8,2 1,3 5,3 9,3 1,4 6,4 9,4 1,5 5,5 9,5 1,6 9,6 1,7 5,7 9,7 2,8 8,8 3,9 4,9 5,9 6,9 7,9"
);
export const PixelShovelIcon = createPixelIcon(
  "PixelShovelIcon",
  11,
  11,
  "3,0 4,0 5,0 6,0 7,0 3,1 7,1 4,2 6,2 5,3 5,4 2,5 3,5 4,5 6,5 7,5 8,5 2,6 8,6 2,7 8,7 3,8 7,8 3,9 7,9 4,10 5,10 6,10"
);
export const PixelVercelIcon = createPixelIcon(
  "PixelVercelIcon",
  11,
  11,
  "5,3 4,4 5,4 6,4 3,5 4,5 5,5 6,5 7,5 3,6 4,6 5,6 6,6 7,6 2,7 3,7 4,7 5,7 6,7 7,7 8,7 2,8 3,8 4,8 5,8 6,8 7,8 8,8"
);
export const PixelVercelOutlineIcon = createPixelIcon(
  "PixelVercelOutlineIcon",
  11,
  11,
  "5,0 4,1 6,1 3,2 7,2 3,3 7,3 2,4 8,4 2,5 8,5 1,6 9,6 1,7 9,7 0,8 10,8 0,9 1,9 2,9 3,9 4,9 5,9 6,9 7,9 8,9 9,9 10,9"
);
export const PixelVideoCameraIcon = createPixelIcon(
  "PixelVideoCameraIcon",
  11,
  11,
  "2,3 3,3 4,3 5,3 6,3 9,3 0,4 1,4 6,4 8,4 9,4 0,5 7,5 9,5 0,6 7,6 9,6 0,7 1,7 6,7 8,7 9,7 2,8 3,8 4,8 5,8 6,8 9,8"
);
export const PixelWindowIcon = createPixelIcon(
  "PixelWindowIcon",
  11,
  11,
  "2,2 3,2 4,2 5,2 6,2 7,2 2,3 4,3 6,3 8,3 2,4 3,4 4,4 5,4 6,4 7,4 8,4 2,5 8,5 2,6 8,6 2,7 8,7 3,8 4,8 5,8 6,8 7,8"
);

export const pixelIconNames = [
  "PixelScribbleIcon",
  "PixelRedoIcon",
  "PixelDropdownIcon",
  "PixelLoaderIcon",
  "PixelShuffleIcon",
  "PixelComputerOutlineIcon",
  "PixelSparklesIcon",
  "PixelDownloadIcon",
  "PixelHelpIcon",
  "PixelEyeIcon",
  "PixelRadioIcon",
  "PixelStarIcon",
  "PixelNewspaperIcon",
  "PixelVolumeMutedIcon",
  "PixelComputerRetroIcon",
  "PixelSwirlIcon",
  "PixelPlayFilledIcon",
  "PixelInfoIcon",
  "PixelGradientIcon",
  "PixelLightbulbIcon",
  "PixelPauseIcon",
  "PixelMarkdownIcon",
  "PixelMessage2Icon",
  "PixelBigArrowDownIcon",
  "PixelTvIcon",
  "PixelPaletteIcon",
  "PixelUserIcon",
  "PixelBillIcon",
  "PixelPause2Icon",
  "PixelMarkdown2Icon",
  "PixelHelp2Icon",
  "PixelCheckboxIcon",
  "PixelPlayOutlineIcon",
  "PixelStarburstIcon",
  "PixelPenToolIcon",
  "PixelPauseOutlineIcon",
  "PixelExternalIcon",
  "PixelIphoneXIcon",
  "PixelListIcon",
  "PixelVolumeIcon",
  "PixelHouseChimneyIcon",
  "PixelSunSmallIcon",
  "PixelCopyIcon",
  "PixelMoon2Icon",
  "PixelPointer2Icon",
  "PixelStarburst2Icon",
  "PixelTargetIcon",
  "PixelHouseWindowIcon",
  "PixelAtSignIcon",
  "PixelWarningIcon",
  "PixelCommentIcon",
  "PixelTilesIcon",
  "PixelReceiptIcon",
  "PixelStar2Icon",
  "PixelHelp3Icon",
  "PixelPlayIcon",
  "PixelMonitorIcon",
  "PixelAutoIcon",
  "PixelBookIcon",
  "PixelHomeIcon",
  "PixelHouseIcon",
  "PixelPersonIcon",
  "PixelSun2Icon",
  "PixelWalletIcon",
  "PixelCursor2Icon",
  "PixelStar3Icon",
  "PixelFolderIcon",
  "PixelBookOpenIcon",
  "PixelNoteIcon",
  "PixelYinYangIcon",
  "PixelDownloadWideIcon",
  "PixelWarningCircleIcon",
  "PixelFolderOpenIcon",
  "PixelClipboardCheckIcon",
  "PixelGraduationCapIcon",
  "PixelCalendarIcon",
  "PixelCalendarDayIcon",
  "PixelCaptionsIcon",
  "PixelChefHatIcon",
  "PixelEnvelopeIcon",
  "PixelEyeClosedIcon",
  "PixelFileIcon",
  "PixelFileFoldedIcon",
  "PixelGithubIcon",
  "PixelGithubOutlineIcon",
  "PixelInfoCircleLowercaseIcon",
  "PixelLinkedinIcon",
  "PixelLinkedinOutlineIcon",
  "PixelNotepadIcon",
  "PixelOscarIcon",
  "PixelOscar2Icon",
  "PixelPaperclipIcon",
  "PixelPauseOutlineRoundedIcon",
  "PixelMessageIcon",
  "PixelPresentationIcon",
  "PixelQuestionCircleIcon",
  "PixelShovelIcon",
  "PixelVercelIcon",
  "PixelVercelOutlineIcon",
  "PixelVideoCameraIcon",
  "PixelWindowIcon",
] as const;

export const morphablePixelIconNames = [
  "PixelComputerOutlineIcon",
  "PixelSparklesIcon",
  "PixelDownloadIcon",
  "PixelHelpIcon",
  "PixelEyeIcon",
  "PixelRadioIcon",
  "PixelStarIcon",
  "PixelNewspaperIcon",
  "PixelVolumeMutedIcon",
  "PixelComputerRetroIcon",
  "PixelSwirlIcon",
  "PixelPlayFilledIcon",
  "PixelInfoIcon",
  "PixelGradientIcon",
  "PixelLightbulbIcon",
  "PixelPauseIcon",
  "PixelMarkdownIcon",
  "PixelMessage2Icon",
  "PixelBigArrowDownIcon",
  "PixelTvIcon",
  "PixelPaletteIcon",
  "PixelUserIcon",
  "PixelBillIcon",
  "PixelPause2Icon",
  "PixelMarkdown2Icon",
  "PixelHelp2Icon",
  "PixelCheckboxIcon",
  "PixelPlayOutlineIcon",
  "PixelStarburstIcon",
  "PixelPenToolIcon",
  "PixelPauseOutlineIcon",
  "PixelExternalIcon",
  "PixelIphoneXIcon",
  "PixelListIcon",
  "PixelVolumeIcon",
  "PixelHouseChimneyIcon",
  "PixelSunSmallIcon",
  "PixelCopyIcon",
  "PixelMoon2Icon",
  "PixelPointer2Icon",
  "PixelStarburst2Icon",
  "PixelTargetIcon",
  "PixelHouseWindowIcon",
  "PixelAtSignIcon",
  "PixelWarningIcon",
  "PixelCommentIcon",
  "PixelTilesIcon",
  "PixelReceiptIcon",
  "PixelStar2Icon",
  "PixelHelp3Icon",
  "PixelPlayIcon",
  "PixelMonitorIcon",
  "PixelAutoIcon",
  "PixelBookIcon",
  "PixelHomeIcon",
  "PixelHouseIcon",
  "PixelPersonIcon",
  "PixelSun2Icon",
  "PixelWalletIcon",
  "PixelCursor2Icon",
  "PixelStar3Icon",
  "PixelFolderIcon",
  "PixelBookOpenIcon",
  "PixelNoteIcon",
  "PixelYinYangIcon",
  "PixelDownloadWideIcon",
  "PixelWarningCircleIcon",
  "PixelFolderOpenIcon",
  "PixelClipboardCheckIcon",
  "PixelGraduationCapIcon",
  "PixelCalendarIcon",
  "PixelCalendarDayIcon",
  "PixelCaptionsIcon",
  "PixelChefHatIcon",
  "PixelEnvelopeIcon",
  "PixelEyeClosedIcon",
  "PixelFileIcon",
  "PixelFileFoldedIcon",
  "PixelGithubIcon",
  "PixelGithubOutlineIcon",
  "PixelInfoCircleLowercaseIcon",
  "PixelLinkedinIcon",
  "PixelLinkedinOutlineIcon",
  "PixelNotepadIcon",
  "PixelOscarIcon",
  "PixelOscar2Icon",
  "PixelPaperclipIcon",
  "PixelPauseOutlineRoundedIcon",
  "PixelMessageIcon",
  "PixelPresentationIcon",
  "PixelQuestionCircleIcon",
  "PixelShovelIcon",
  "PixelVercelIcon",
  "PixelVercelOutlineIcon",
  "PixelVideoCameraIcon",
  "PixelWindowIcon",
] as const;

export type PixelIconName = (typeof pixelIconNames)[number];
export type MorphablePixelIconName = (typeof morphablePixelIconNames)[number];
