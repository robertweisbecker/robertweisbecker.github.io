import { DemoContainer } from "@/components/blocks/demo";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { IconAlertCircle, IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Separator } from "@base-ui/react";

/** … in snippets omits body copy and illustrative custom markup only; popover/trigger classNames stay verbatim. */
const demoCode = { language: "tsx" as const, collapsible: true };

const anchoredPopoverCode = `<Button
  popoverTarget="popover-anchor"
  variant="outline"
  className="[anchor-name:--trigger2]"
>
  Open popover
</Button>
<div
  popover="auto"
  id="popover-anchor"
  aria-labelledby="popover-anchor-title"
  aria-describedby="popover-anchor-desc"
  className="[position-anchor]:--trigger2 absolute inset-y-[unset] right-0 bottom-[anchor(top)] z-50 max-w-3xs origin-bottom translate-y-2 transform [justify-self:anchor-center] overflow-hidden rounded-lg bg-[canvas] px-3 py-2 opacity-0 shadow-border-lg transition-[opacity,transform,translate,scale] transition-discrete duration-50 ease-out open:mb-2 open:translate-y-0 open:scale-100 open:opacity-100 starting:open:mb-0 starting:open:translate-y-4 starting:open:scale-90 starting:open:opacity-0"
>
  <h3 id="popover-anchor-title" className="mt-0 mb-1 text-sm font-medium">…</h3>
  <p id="popover-anchor-desc" className="text-sm">…</p>
</div>`;

const toastPopoverCode = `<Button id="popover-toast-trigger" popoverTarget="popover-toast" popoverTargetAction="show">…</Button>
<div
  popover="manual"
  id="popover-toast"
  aria-labelledby="popover-toast-title"
  aria-describedby="popover-toast-desc"
  className={cn(
    "fixed mx-auto grid origin-bottom transform auto-rows-min grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] gap-2 rounded-lg bg-[canvas] p-3 shadow-lg outline outline-current/10 transition-[opacity,transform,translate,scale] transition-discrete duration-200 ease-out dark:-outline-offset-1",
    "inset-x-8 top-auto bottom-8 w-auto max-w-full",
    "md:right-8 md:left-auto md:max-w-96",
    "translate-y-2 scale-100 opacity-0",
    "starting:open:translate-y-1 starting:open:scale-90 starting:open:opacity-0",
    "open:translate-y-0 open:scale-100 open:opacity-100"
  )}
>
  <IconAlertCircle … />
  <h2 className="col-2 row-1 m-0 text-sm font-medium" id="popover-toast-title">…</h2>
  <p id="popover-toast-desc" className="col-2 row-2 text-sm">…</p>
  <Button
    popoverTarget="popover-toast"
    id="popover-toast-close"
    popoverTargetAction="hide"
    className="col-3 row-span-2 row-start-1"
  >
    Close
  </Button>
</div>`;

const backdropPopoverCode = `<Button popoverTarget="popover-backdrop" variant="outline">
  With backdrop
</Button>
<div
  popover="auto"
  id="popover-backdrop"
  aria-labelledby="popover-backdrop-title"
  aria-describedby="popover-backdrop-desc"
  className={cn(
    "fixed inset-y-0 mx-auto my-auto overflow-hidden rounded-lg bg-[canvas] p-4 shadow-2xl outline outline-current/10 sm:w-full sm:max-w-96 dark:-outline-offset-1",
    "not-open:pointer-events-none",
    "transition-all transition-discrete duration-300",
    "origin-top translate-y-10 scale-92 opacity-0",
    "starting:open:translate-y-10 starting:open:scale-92 starting:open:opacity-0",
    "open:translate-y-0 open:scale-100 open:opacity-100",
    "backdrop:bg-transparent backdrop:transition-colors backdrop:duration-300 backdrop:pointer-events-none", 
    "starting:open:backdrop:bg-transparent"
    "open:backdrop:bg-black/15 dark:open:backdrop:bg-black/50",
  )}
>
  <h2 className="mb-3 text-base font-medium text-pretty" id="popover-backdrop-title">…</h2>
  <p id="popover-backdrop-desc">…</p>
</div>`;

const dangerPopoverCode = `<Button
  popoverTarget="popover-backdrop-2"
  id="popover-backdrop-2-trigger"
  popoverTargetAction="show"
>
  Danger ahead
</Button>
<div
  popover="manual"
  id="popover-backdrop-2"
  aria-labelledby="popover-backdrop-2-title"
  aria-describedby="popover-backdrop-2-desc"
  className={cn(
    "fixed inset-y-0 mx-auto mt-auto mb-8 flex w-full max-w-dialog origin-top translate-y-10 scale-98 transform flex-col gap-2 overflow-hidden rounded-2xl bg-error p-6 pt-10 text-center text-foreground opacity-0 shadow-2xl outline outline-destructive transition-[opacity,transform,translate,scale] transition-discrete duration-300 backdrop:bg-border backdrop:transition-colors backdrop:duration-300 open:translate-y-0 open:scale-100 open:opacity-100 open:backdrop:bg-destructive/30 sm:max-w-96 dark:-outline-offset-1 starting:open:translate-y-10 starting:open:scale-92 starting:open:opacity-0 starting:open:backdrop:bg-transparent",
    "items-center not-open:pointer-events-none backdrop:pointer-events-none backdrop:bg-[repeating-linear-gradient(315deg,var(--error)_0,var(--error)_1px,transparent_0,transparent_50%)] backdrop:bg-size-[10px_10px] backdrop:bg-fixed"
  )}
>
  <svg>…</svg>
  <h2 id="popover-backdrop-2-title">…</h2>
  <p id="popover-backdrop-2-desc">…</p>
  <Separator />
  <Button
    popoverTarget="popover-backdrop-2"
    id="popover-backdrop-2-close"
    popoverTargetAction="hide"
  >
    Flee
  </Button>
</div>`;

export default function NativePopoversAnchoringPage() {
  return (
    <div className="mx-auto w-full max-w-xl space-y-8">
      <p>
        Playing with the native <Code>popover</Code> API, plus <Code>anchor</Code> positioning and <Code>starting-style</Code>. Note: iffy
        support on iOS Safari.
      </p>
      <Heading level={2} className="mt-4">
        Anchored popovers
      </Heading>
      <DemoContainer title="Anchored" code={{ ...demoCode, value: anchoredPopoverCode }} centerContent={true}>
        <div className="grid min-h-48 place-items-center">
          <Button popoverTarget="popover-anchor" variant="outline" className="[anchor-name:--trigger2]">
            Open popover
          </Button>
          <div
            popover="auto"
            id="popover-anchor"
            aria-labelledby="popover-anchor-title"
            aria-describedby="popover-anchor-desc"
            className="absolute inset-y-[unset] right-0 bottom-[anchor(top)] z-50 max-w-3xs origin-bottom translate-y-2 transform [justify-self:anchor-center] overflow-hidden rounded-lg bg-[canvas] px-3 py-2 opacity-0 shadow-border-lg transition-all transition-discrete duration-50 ease-out [position-anchor:--trigger2] not-open:pointer-events-none backdrop:pointer-events-none open:mb-2 open:translate-y-0 open:scale-100 open:opacity-100 starting:open:mb-0 starting:open:translate-y-4 starting:open:scale-90 starting:open:opacity-0"
          >
            <h3 id="popover-anchor-title" className="mt-0 mb-1 text-sm font-medium">
              Howdy!
            </h3>
            <p id="popover-anchor-desc" className="text-sm">
              This should be accessible without any additional config
            </p>
          </div>
        </div>
      </DemoContainer>
      <p>
        One thing I noticed: you seem to need <Code>transition-all</Code> on the popover content to get the exit transition working;{" "}
        <Code>transition-[properties]</Code> doesn&apos;t work, at least with Tailwind.
      </p>
      <p>
        Here{"'"}s a toast-y popover. In some countries, that{"'"}s a meal. Regardless, you need to close this one manually rather than by
        clicking outside.
      </p>
      <Heading level={2}>Toast popovers</Heading>
      <DemoContainer title="Manual close" code={{ ...demoCode, value: toastPopoverCode }} centerContent={true}>
        <div className="grid min-h-48 place-items-center">
          <Button
            popoverTarget="popover-toast"
            variant="outline"
            className="relative"
            id="popover-toast-trigger"
            popoverTargetAction="show"
          >
            Notifications{" "}
            <Badge variant="destructive" size="sm" className="absolute top-0 right-0 -m-1.5 min-w-4 rounded-full">
              1
            </Badge>
          </Button>
          <div
            popover="manual"
            id="popover-toast"
            aria-labelledby="popover-toast-title"
            aria-describedby="popover-toast-desc"
            className={cn(
              "fixed mx-auto grid origin-bottom transform auto-rows-min grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] gap-2 rounded-lg bg-[canvas] p-3 shadow-lg outline outline-current/10 transition-[opacity,transform,translate,scale] transition-discrete duration-200 ease-out dark:-outline-offset-1",
              "translate-y-2 scale-100 opacity-0",
              "starting:open:translate-y-1 starting:open:scale-90 starting:open:opacity-0",
              "open:translate-y-0 open:scale-100 open:opacity-100",
              "not-open:pointer-events-none backdrop:pointer-events-none",
              "inset-x-8 top-auto bottom-8 w-auto max-w-full",
              "md:right-8 md:left-auto md:max-w-96"
            )}
          >
            <IconAlertCircle className="col-1 row-1 row-start-1 size-5 fill-error text-destructive" />
            <h2 className="col-2 row-1 m-0 text-sm font-medium" id="popover-toast-title">
              Uh oh — I{"'"}m exposed!
            </h2>
            <p id="popover-toast-desc" className="col-2 row-2 text-sm">
              I{"'"}m set to <Code>popover=&quot;manual&quot;</Code> so only the button in here will close me.
            </p>
            <Button
              popoverTarget="popover-toast"
              variant="outline"
              size="sm"
              id="popover-toast-close"
              popoverTargetAction="hide"
              className="col-3 row-span-2 row-start-1"
            >
              Close
            </Button>
          </div>
        </div>
      </DemoContainer>
      <p>
        The next one has a backdrop just to see how it works. But don{"'"}t be fooled, it{"'"}s not modal, nor does it lock scroll position
        or focus. In reality, you might use a <Code>{"<dialog>"}</Code> here if you{"'"}re going native.
      </p>
      <Heading level={2}>Backdrop</Heading>
      <DemoContainer title="Non-modal" code={{ ...demoCode, value: backdropPopoverCode }} centerContent={true}>
        <div className="grid min-h-48 place-items-center">
          <Button popoverTarget="popover-backdrop" variant="outline" className="relative">
            With backdrop
          </Button>
          <div
            popover="auto"
            id="popover-backdrop"
            aria-labelledby="popover-backdrop-title"
            aria-describedby="popover-backdrop-desc"
            className={cn(
              "fixed inset-y-0 mx-auto my-auto origin-top translate-y-10 scale-92 transform overflow-hidden rounded-lg bg-[canvas] p-4 opacity-0 shadow-2xl outline outline-current/10 transition-all transition-discrete duration-300 not-open:pointer-events-none backdrop:pointer-events-none backdrop:bg-transparent backdrop:transition-colors backdrop:duration-300 open:translate-y-0 open:scale-100 open:opacity-100 open:backdrop:bg-black/15 sm:w-full sm:max-w-96 dark:-outline-offset-1 dark:open:backdrop:bg-black/50 starting:open:translate-y-10 starting:open:scale-92 starting:open:opacity-0 starting:open:backdrop:bg-transparent"
            )}
          >
            <h2 className="mt-0 mb-3 text-base font-medium text-pretty" id="popover-backdrop-title">
              This is a native HTML popover. You can read up on{" "}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-secondary-foreground underline decoration-current/20"
              >
                MDN
                <IconArrowUpRight className="size-4" />
              </a>
              .
            </h2>
            <p id="popover-backdrop-desc">
              Click outside or press <Code>Esc</Code> to dismiss.
            </p>
          </div>
        </div>
      </DemoContainer>
      <p>You can have some fun with the backdrops too. This one also requires an explicit close.</p>

      <DemoContainer title="Manual + backdrop" code={{ ...demoCode, value: dangerPopoverCode }} centerContent={true}>
        <div className="grid min-h-48 place-items-center">
          <Button
            popoverTarget="popover-backdrop-2"
            variant="destructive"
            className="relative"
            id="popover-backdrop-2-trigger"
            popoverTargetAction="show"
          >
            Danger ahead
          </Button>
          <div
            popover="manual"
            id="popover-backdrop-2"
            aria-labelledby="popover-backdrop-2-title"
            aria-describedby="popover-backdrop-2-desc"
            className={cn(
              "fixed inset-y-0 mx-auto mt-auto mb-8 flex w-full max-w-dialog origin-top translate-y-10 scale-98 transform flex-col gap-2 overflow-hidden rounded-2xl bg-error p-6 pt-10 text-center text-foreground opacity-0 shadow-2xl outline outline-destructive transition-[opacity,transform,translate,scale] transition-discrete duration-300 backdrop:bg-border backdrop:transition-colors backdrop:duration-300 open:translate-y-0 open:scale-100 open:opacity-100 open:backdrop:bg-destructive/30 sm:max-w-96 dark:-outline-offset-1 starting:open:translate-y-10 starting:open:scale-92 starting:open:opacity-0 starting:open:backdrop:bg-transparent",
              "items-center not-open:pointer-events-none backdrop:pointer-events-none backdrop:bg-[repeating-linear-gradient(315deg,var(--error)_0,var(--error)_1px,transparent_0,transparent_50%)] backdrop:bg-size-[10px_10px] backdrop:bg-fixed"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              id="Interface-Essential-File-Error--Streamline-Pixel"
              height="32"
              width="32"
              className="mb-2 animate-bounce text-error-foreground"
            >
              <desc>Interface Essential File Error Streamline Icon: https://streamlinehq.com</desc>
              <title>interface-essential-file-error</title>
              <g>
                <path
                  d="M3.05 32h25.9V7.62h-1.52V6.1h-1.52V4.57h-1.53V3.05h-1.52V1.52h-1.53V0H3.05ZM4.57 1.52h15.24v7.62h7.62v21.34H4.57Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="m7.62 19.81 0 1.52 10.67 0 0 3.05 1.52 0 0 -3.05 3.05 0 0 3.05 1.52 0 0 -4.57 -16.76 0z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="m22.86 12.19 -1.53 0 0 1.52 -1.52 0 0 1.53 1.52 0 0 1.52 1.53 0 0 -1.52 1.52 0 0 -1.53 -1.52 0 0 -1.52z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path d="M19.81 24.38h3.05v1.52h-3.05Z" fill="currentColor" strokeWidth="1"></path>
                <path
                  d="m9.14 16.76 1.53 0 0 -1.52 1.52 0 0 -1.53 -1.52 0 0 -1.52 -1.53 0 0 1.52 -1.52 0 0 1.53 1.52 0 0 1.52z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
            <h2 className="m-0 text-2xl font-bold text-inherit" id="popover-backdrop-2-title">
              The Danger Zone
            </h2>
            <p id="popover-backdrop-2-desc">
              A use of the passive voice has occurred. <br /> A backdrop click will do you no good here.
            </p>
            <Separator />
            <Button
              popoverTarget="popover-backdrop-2"
              variant="destructive"
              className="w-full"
              id="popover-backdrop-2-close"
              popoverTargetAction="hide"
            >
              Flee
            </Button>
          </div>
        </div>
      </DemoContainer>
    </div>
  );
}
