"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowSvg } from "../icons";

const PreviewCardGroupContext = React.createContext<{
  handle: PreviewCardPrimitive.Handle<React.ReactNode>;
} | null>(null);

const GROUP_EASING = "var(--ease-out-quint)";
const GROUP_DURATION = "350ms";
const GROUP_TRANSLATE = "30%";
// const GROUP_TRANSLATE_Y = "translate-y-[10%]";

export type PreviewCardGroupProps = {
  handle?: PreviewCardPrimitive.Handle<React.ReactNode>;
  actionsRef?: PreviewCardPrimitive.Root.Props["actionsRef"];
  defaultOpen?: PreviewCardPrimitive.Root.Props["defaultOpen"];
  side?: PreviewCardPrimitive.Positioner.Props["side"];
  sideOffset?: PreviewCardPrimitive.Positioner.Props["sideOffset"];
  align?: PreviewCardPrimitive.Positioner.Props["align"];
  alignOffset?: PreviewCardPrimitive.Positioner.Props["alignOffset"];
  anchor?: PreviewCardPrimitive.Positioner.Props["anchor"];
  portalContainer?: PreviewCardPrimitive.Portal.Props["container"];
  popupClassName?: string;
  positionerClassName?: string;
  viewportClassName?: string;
  children: React.ReactNode;
  arrow?: boolean;
};

export const PreviewCard: typeof PreviewCardPrimitive.Root = PreviewCardPrimitive.Root;

export function PreviewCardTrigger({
  preview,
  handle: handleProp,
  payload: payloadProp,
  ...props
}: PreviewCardPrimitive.Trigger.Props<React.ReactNode> & {
  /** Preview content shown when inside a PreviewCardGroup. */
  preview?: React.ReactNode;
}): React.ReactElement {
  const groupContext = React.useContext(PreviewCardGroupContext);
  const handle = handleProp ?? groupContext?.handle;
  const payload = payloadProp ?? (groupContext ? preview : undefined);

  return <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" handle={handle} payload={payload} {...props} />;
}

export function PreviewCardGroup({
  children,
  popupClassName,
  positionerClassName,
  viewportClassName,
  side,
  sideOffset = 4,
  portalContainer,
  align = "center",
  alignOffset = 0,
  arrow,
  defaultOpen,
  anchor,
  handle: handleProp,
  actionsRef,
}: PreviewCardGroupProps) {
  const internalHandle = React.useMemo(() => PreviewCardPrimitive.createHandle<React.ReactNode>(), []);
  const handle = handleProp ?? internalHandle;

  return (
    <PreviewCardGroupContext.Provider value={{ handle }}>
      {children}
      <PreviewCardPrimitive.Root
        handle={handle}
        actionsRef={actionsRef}
        defaultOpen={defaultOpen}
        onOpenChange={(open, details) => {
          if (!open && details.reason === "trigger-focus") {
            details.cancel();
          }
        }}
      >
        {({ payload }) => (
          <PreviewCardPrimitive.Portal container={portalContainer}>
            <PreviewCardPrimitive.Positioner
              anchor={anchor}
              align={align}
              alignOffset={alignOffset}
              side={side}
              sideOffset={sideOffset}
              className={cn(
                "isolate z-50 max-w-(--available-width)",
                "transition-[top,left,right,bottom,transform]",
                "duration-(--group-duration)",
                "ease-(--group-easing)",

                positionerClassName
              )}
              style={
                {
                  "--group-translate": GROUP_TRANSLATE,
                  "--group-duration": GROUP_DURATION,
                  "--group-easing": GROUP_EASING,
                } as React.CSSProperties
              }
            >
              <PreviewCardPrimitive.Popup
                data-slot="preview-card-group-popup"
                className={cn(
                  "relative box-border origin-(--transform-origin)",
                  "h-(--popup-height,auto) w-(--popup-width,auto)",
                  "ui-popup bg-card text-sm",
                  "transition-[width,height,opacity,scale]",
                  "duration-(--group-duration)",
                  "ease-(--group-easing)",
                  "data-starting-style:scale-90 data-starting-style:opacity-0",
                  "data-ending-style:scale-90 data-ending-style:opacity-0",
                  popupClassName
                )}
                style={
                  {
                    "--group-translate": GROUP_TRANSLATE,
                    "--group-duration": GROUP_DURATION,
                    "--group-easing": GROUP_EASING,
                  } as React.CSSProperties
                }
              >
                <PreviewCardPrimitive.Viewport
                  data-slot="preview-card-group-viewport"
                  className={cn(
                    "relative h-full w-full overflow-clip",
                    // Base styles for both incoming (current) and outgoing (previous) content
                    "**:data-current:w-[var(--popup-width,auto)] **:data-current:translate-x-0 **:data-current:opacity-100 **:data-current:transition-[translate,opacity] **:data-current:duration-[var(--group-duration),175ms] **:data-current:ease-(--group-easing)",
                    "**:data-previous:w-[var(--popup-width,auto)] **:data-previous:translate-x-0 **:data-previous:opacity-100 **:data-previous:transition-[translate,opacity] **:data-previous:duration-[var(--group-duration),175ms] **:data-previous:ease-(--group-easing)",
                    // Direction-aware enter offsets for the incoming content
                    "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-(--group-translate) data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0",
                    "data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-(--group-translate) data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0",
                    "data-[activation-direction~='up']:[&_[data-current][data-starting-style]]:-translate-y-(--group-translate) data-[activation-direction~='up']:[&_[data-current][data-starting-style]]:opacity-0",
                    "data-[activation-direction~='down']:[&_[data-current][data-starting-style]]:translate-y-(--group-translate) data-[activation-direction~='down']:[&_[data-current][data-starting-style]]:opacity-0",
                    // Direction-aware exit offsets for the outgoing content
                    "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-(--group-translate) data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0",
                    "data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-(--group-translate) data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0",
                    "data-[activation-direction~='up']:[&_[data-previous][data-ending-style]]:translate-y-(--group-translate) data-[activation-direction~='up']:[&_[data-previous][data-ending-style]]:opacity-0",
                    "data-[activation-direction~='down']:[&_[data-previous][data-ending-style]]:-translate-y-(--group-translate) data-[activation-direction~='down']:[&_[data-previous][data-ending-style]]:opacity-0",
                    // Skip transitions when Base UI signals an instant change
                    // "data-instant:**:data-current:transition-none data-instant:**:data-previous:transition-none",
                    viewportClassName
                  )}
                >
                  {payload}
                </PreviewCardPrimitive.Viewport>
                {arrow && (
                  <PreviewCardPrimitive.Arrow
                    data-slot="preview-card-group-arrow"
                    className="flex data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180"
                  >
                    <ArrowSvg />
                  </PreviewCardPrimitive.Arrow>
                )}
              </PreviewCardPrimitive.Popup>
            </PreviewCardPrimitive.Positioner>
          </PreviewCardPrimitive.Portal>
        )}
      </PreviewCardPrimitive.Root>
    </PreviewCardGroupContext.Provider>
  );
}

/**
 * Standalone popup for a one-off PreviewCard.Root (no shared group/handle).
 * Use this when the trigger and content live next to each other.
 */
export function PreviewCardPopup({
  className,
  children,
  align = "center",
  side,
  sideOffset = 8,
  anchor,
  portalProps,
  ...props
}: PreviewCardPrimitive.Popup.Props & {
  align?: PreviewCardPrimitive.Positioner.Props["align"];
  side?: PreviewCardPrimitive.Positioner.Props["side"];
  sideOffset?: PreviewCardPrimitive.Positioner.Props["sideOffset"];
  anchor?: PreviewCardPrimitive.Positioner.Props["anchor"];
  portalProps?: PreviewCardPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <PreviewCardPrimitive.Portal {...portalProps}>
      <PreviewCardPrimitive.Positioner
        align={align}
        side={side}
        anchor={anchor}
        className="z-50"
        data-slot="preview-card-positioner"
        sideOffset={sideOffset}
      >
        <PreviewCardPrimitive.Popup
          className={cn(
            "relative flex w-64 origin-(--transform-origin) ui-popup rounded-lg p-1 text-sm transition-[scale,opacity] duration-150 before:pointer-events-none data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
            className
          )}
          data-slot="preview-card-content"
          {...props}
        >
          {children}
          <PreviewCardPrimitive.Arrow
            className={
              "flex data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180"
            }
          >
            <ArrowSvg />
          </PreviewCardPrimitive.Arrow>
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export {
  PreviewCardPrimitive,
  PreviewCard as HoverCard,
  PreviewCardTrigger as HoverCardTrigger,
  PreviewCardPopup as HoverCardContent,
};
