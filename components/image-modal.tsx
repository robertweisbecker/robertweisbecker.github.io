"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Dialog as DialogBase } from "@base-ui/react/dialog";
import { Drawer as DrawerBase } from "@base-ui/react/drawer";
import { Popover } from "@base-ui/react/popover";
import { IconArrowsDiagonal, IconX } from "@tabler/icons-react";
import { Cambio } from "cambio";
import { AnimatePresence, HTMLMotionProps, LayoutGroup, motion } from "motion/react";
import * as React from "react";
import { createPortal } from "react-dom";

import { imageSrc } from "@/lib/image-src";
import NextImage, { type StaticImageData } from "next/image";

const SPRING = { type: "spring" as const, damping: 28, stiffness: 220 };

export interface ImageModalProps {
  src: StaticImageData;
  src2?: StaticImageData;
  caption?: React.ReactNode;
  portrait?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Shared hook: captures aspect ratio from the thumbnail's onLoad
// ---------------------------------------------------------------------------
function useImageAspect() {
  const [imgAspect, setImgAspect] = React.useState<string | undefined>(undefined);

  const handleImgLoad = React.useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = (e.currentTarget ?? e.target) as HTMLImageElement | undefined;
    if (!img?.naturalWidth || !img.naturalHeight) return;
    const ratio = `${img.naturalWidth} / ${img.naturalHeight}`;
    setImgAspect((prev) => prev ?? ratio);
  }, []);

  return { imgAspect, handleImgLoad } as const;
}

// ---------------------------------------------------------------------------
// Shared close button
// ---------------------------------------------------------------------------
function CloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className="group/close pointer-events-auto absolute -top-10 right-0 z-10 inline-flex cursor-pointer items-center gap-0 rounded-full border border-white/20 bg-black/50 p-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 ease-out hover:gap-1 hover:px-3"
    >
      <IconX className="size-4" />
      <span className="max-w-0 translate-x-2 overflow-hidden text-right opacity-0 transition-all duration-300 ease-out group-hover/close:max-w-[6ch] group-hover/close:translate-x-0 group-hover/close:opacity-100">
        Close
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Shared modal image with skeleton
// ---------------------------------------------------------------------------
function ModalImage({ src, alt, imgAspect }: { src: StaticImageData; alt: string; imgAspect?: string }) {
  const url = imageSrc(src);
  const [loadedImage, setLoadedImage] = React.useState<{ url: string; loaded: boolean }>(() => ({ url, loaded: false }));
  const loaded = loadedImage.url === url && loadedImage.loaded;

  return (
    <>
      {!loaded && imgAspect && <Skeleton className="inset-2 h-100 rounded-[20px]" />}
      <NextImage
        src={src}
        alt={alt}
        placeholder="blur"
        onLoad={() => setLoadedImage({ url, loaded: true })}
        style={{
          aspectRatio: imgAspect,
          borderRadius: 20,
          display: "block",
          width: "100%",
          height: "auto",
          objectFit: "contain",
          objectPosition: "center",
          opacity: loaded ? 1 : 0,
          transition: "opacity 150ms ease-out",
        }}
      />
    </>
  );
}

export function ImageModal({ src, caption, className }: ImageModalProps) {
  const aspectRatio = `${src.width} / ${src.height}`;
  const popupStyle = {
    "--image-ratio": src.width / src.height,
    aspectRatio,
  } as React.CSSProperties & { "--image-ratio": number };

  return (
    <Cambio.Root dismissible>
      <figure
        data-media
        className={cn(
          "group/figure flex w-full flex-col items-center justify-center gap-1.5",
          "max-sm:-mx-4 max-sm:w-[calc(100%+(--spacing(8)))] max-sm:max-w-[unset]",
          className
        )}
      >
        <Cambio.Trigger
          aria-label="View fullscreen image"
          className={cn(
            "group/trigger block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
            "sm:squircle relative bg-card py-1 shadow-border-sm sm:rounded-2xl sm:px-1"
          )}
        >
          <NextImage
            placeholder="blur"
            src={src}
            alt={typeof caption === "string" ? caption : ""}
            sizes="(max-width: 768px) 100vw, 720px"
            className="sm:squircle h-auto w-full outline -outline-offset-1 outline-border/50 sm:rounded-[calc(var(--radius-2xl)-(--spacing(1)))]"
          />
          <span
            aria-hidden
            className={cn(
              buttonVariants({ variant: "overlay", size: "icon-sm", rounded: true }),
              "absolute inset-e-3 bottom-3 cursor-default"
            )}
          >
            <IconArrowsDiagonal />
          </span>
        </Cambio.Trigger>

        {caption && <figcaption className="mx-auto text-center text-xs text-muted-foreground">{caption}</figcaption>}
      </figure>
      <Cambio.Portal
        className={cn(
          "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain outline-none",
          "pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]",
          "px-0 sm:px-4 sm:pt-6 sm:pb-10 lg:py-10"
        )}
      >
        <Cambio.Backdrop className="fixed inset-0 z-100 h-dvh w-dvw bg-black/40" />
        <Cambio.Popup
          className={cn(
            "relative z-100 mx-auto my-0 overflow-hidden rounded-none bg-popover p-0 shadow-none outline-none sm:rounded-3xl sm:shadow-border-xl sm:ring sm:ring-popover",
            // Width is capped by the viewport height via the image ratio so tall
            // images always fit fully on screen instead of being clipped.
            "w-[min(100vw,calc((100dvh-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)-3rem)*var(--image-ratio)))]",
            "sm:my-16 sm:w-[min(var(--container-7xl),calc(100vw-2rem),calc((100dvh-10rem)*var(--image-ratio)))]"
          )}
          style={popupStyle}
        >
          <Cambio.Title className="sr-only">{caption || "Image"}</Cambio.Title>
          <NextImage
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 960px"
            src={src}
            alt={typeof caption === "string" ? caption : ""}
            fill
            className="pointer-events-none object-contain object-center select-none"
            preload
          />
          <Cambio.Close
            aria-label="Close image preview"
            className="absolute inset-e-3 top-3 z-10"
            render={<Button variant="overlay" size="icon-sm" rounded />}
          >
            <IconX />
          </Cambio.Close>
          <div className="absolute top-2 left-1/2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-neutral-400/60 shadow-border-xs ring-[0.5px] inset-shadow-xs inset-ring-[0.5px] ring-black/50 inset-shadow-white/10 inset-ring-white/2 backdrop-blur-md"></div>
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

export function ImageModalDrawer({ src, caption }: ImageModalProps) {
  return (
    <DrawerBase.Provider>
      <div className="relative w-full overflow-hidden rounded-xl shadow-border-sm">
        <DrawerBase.IndentBackground className="absolute inset-0 bg-muted" />
        <DrawerBase.Indent className="relative origin-center [transform:scale(1)_translateY(0)] bg-card p-1 [transition-duration:calc(400ms*var(--indent-transition)),calc(250ms*var(--indent-transition))] will-change-transform [--indent-progress:var(--drawer-swipe-progress)] [--indent-radius:calc(var(--radius-xl)*(1-var(--indent-progress)))] [--indent-transition:calc(1-clamp(0,calc(var(--drawer-swipe-progress)*100000),1))] [transition:transform_0.4s_cubic-bezier(0.32,0.72,0,1),border-radius_0.25s_cubic-bezier(0.32,0.72,0,1)] data-active:[transform:scale(calc(0.98+(0.02*var(--indent-progress))))] data-active:rounded-(--indent-radius)">
          <DrawerBase.Root>
            <DrawerBase.Trigger className="w-full">
              <NextImage
                placeholder="blur"
                src={src}
                alt={typeof caption === "string" ? caption : ""}
                sizes="(max-width: 768px) 100vw, 720px"
                className="sm:squircle h-auto w-full sm:rounded-[calc(var(--radius-xl)---spacing(1))]"
              />
            </DrawerBase.Trigger>
            <DrawerBase.Portal>
              <DrawerBase.Backdrop className="fixed inset-0 min-h-dvh bg-linear-to-b from-background/50 to-background/100 opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-out-quart [--backdrop-opacity:1] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute" />
              <DrawerBase.Viewport className="fixed inset-0 flex items-end justify-center">
                <DrawerBase.Popup className="-mb-[3rem] max-h-[calc(100vh-3rem)] w-full [transform:translateY(var(--drawer-swipe-movement-y))] touch-auto overflow-y-auto overscroll-contain p-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+3rem)] transition-transform duration-[450ms] ease-out-quart outline-none data-ending-style:[transform:translateY(calc(100%-3rem+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:[transform:translateY(calc(100%-3rem+2px))] data-swiping:select-none">
                  <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-input" />
                  <DrawerBase.Close
                    className={cn(buttonVariants({ variant: "ghost", size: "sm", rounded: true }), "absolute top-4 right-4")}
                  >
                    Close
                  </DrawerBase.Close>
                  <DrawerBase.Content className="pointer-events-none mx-auto w-full max-w-7xl overflow-hidden rounded-xl shadow-popover">
                    <DrawerBase.Title className="sr-only">Image Detail</DrawerBase.Title>
                    <NextImage
                      placeholder="blur"
                      src={src}
                      alt={typeof caption === "string" ? caption : ""}
                      sizes="(max-width: 768px) 100vw, 720px"
                      className="pointer-events-none aspect-video h-auto w-full"
                    />
                  </DrawerBase.Content>
                </DrawerBase.Popup>
              </DrawerBase.Viewport>
            </DrawerBase.Portal>
          </DrawerBase.Root>
        </DrawerBase.Indent>
      </div>
    </DrawerBase.Provider>
  );
}

// ===========================================================================
// Prototype A: Dialog + layoutId (improved)
// ===========================================================================
export function ImageModalMotion({ src, src2, caption }: ImageModalProps) {
  const [open, setOpen] = React.useState(false);
  const { imgAspect, handleImgLoad } = useImageAspect();
  const layoutId = React.useId();
  const popupRef = React.useRef<HTMLDivElement>(null);

  return (
    <DialogBase.Root open={open} onOpenChange={setOpen}>
      <figure className="group/figure block [.prose>*+&]:mx-auto [.prose>*+&]:my-6 [.prose>*+&]:max-w-3xl">
        <div className="not-prose relative mb-2">
          {!open ? (
            <motion.div
              className="w-full shadow-border-sm"
              style={{
                aspectRatio: imgAspect,
                borderRadius: 12,
                padding: 4,
                width: "100%",
                background: "var(--card)",
              }}
            >
              <motion.img
                layoutId={layoutId}
                // transition={{ layout: SPRING }}
                src={imageSrc(src)}
                alt={typeof caption === "string" ? caption : ""}
                onLoad={handleImgLoad}
                style={{
                  aspectRatio: imgAspect,
                  borderRadius: 8,
                  display: "block",
                  width: "100%",
                  height: "auto",
                }}
              />
            </motion.div>
          ) : (
            <div aria-hidden style={{ opacity: 0 }}>
              <div style={{ padding: 4, borderRadius: 12 }}>
                <NextImage
                  src={src}
                  alt=""
                  placeholder="blur"
                  style={{
                    aspectRatio: imgAspect,
                    borderRadius: 8,
                    display: "block",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          )}

          <DialogBase.Trigger
            render={
              <motion.button
                layoutId={`${layoutId}-button`}
                className={cn(buttonVariants({ variant: "overlay", size: "icon-sm", rounded: true }))}
                style={{
                  position: "absolute",
                  right: 12,
                  bottom: 12,
                  zIndex: 10,
                }}
              />
            }
            aria-label="View fullscreen image"
          >
            <IconArrowsDiagonal />
          </DialogBase.Trigger>
        </div>

        <AnimatePresence initial={false} mode="sync">
          {open && (
            <DialogBase.Portal keepMounted>
              <DialogBase.Backdrop className="fixed inset-0 z-50 bg-neutral-950/25 backdrop-blur-[2px] dark:bg-neutral-950/50" />
              <DialogBase.Viewport
                className={cn(
                  "fixed inset-0 z-50 flex max-h-none items-start justify-center overflow-y-auto overscroll-contain p-0 sm:p-4",
                  "pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
                )}
              >
                <DialogBase.Popup
                  ref={popupRef}
                  initialFocus={popupRef}
                  className="group/popup relative w-full max-w-none sm:w-[min(var(--container-7xl),calc(100vw-2rem))]"
                >
                  <DialogBase.Title className="sr-only">Image</DialogBase.Title>
                  <DialogBase.Close
                    aria-label="Close"
                    render={
                      <motion.button
                        layoutId={`${layoutId}-button`}
                        className={cn(
                          "group/close pointer-events-auto",
                          buttonVariants({ variant: "overlay", size: "icon-sm", rounded: true })
                        )}
                        style={{
                          position: "absolute",
                          top: -12,
                          right: -12,
                          zIndex: 10,
                        }}
                      />
                    }
                  >
                    <IconX />
                  </DialogBase.Close>
                  <motion.img
                    layoutId={layoutId}
                    // transition={{ layout: SPRING }}
                    src={imageSrc(src2 ?? src)}
                    alt={typeof caption === "string" ? caption : ""}
                    onLoad={handleImgLoad}
                    className="w-full max-w-none min-w-0"
                    style={{
                      borderRadius: 12,
                      aspectRatio: imgAspect,
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      objectPosition: "center",
                      transformOrigin: "center",
                      scale: open ? 1 : 0.5,
                    }}
                  />
                </DialogBase.Popup>
              </DialogBase.Viewport>
            </DialogBase.Portal>
          )}
        </AnimatePresence>

        {caption && <figcaption className="max-w-prose text-pretty md:px-4">{caption}</figcaption>}
      </figure>
    </DialogBase.Root>
  );
}

// ===========================================================================
// Prototype B: Popover + layoutId
// ===========================================================================
export function ImageModalPopover({ src, src2, caption }: ImageModalProps) {
  const [open, setOpen] = React.useState(false);
  const { imgAspect, handleImgLoad } = useImageAspect();
  const layoutId = React.useId();

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <figure className="group/figure block [.prose>*+&]:mx-auto [.prose>*+&]:my-6 [.prose>*+&]:max-w-3xl">
        <div className="not-prose relative mb-2">
          <Popover.Trigger
            nativeButton={false}
            render={
              <motion.div
                layoutId={layoutId}
                transition={{ layout: SPRING }}
                className="cursor-pointer overflow-hidden shadow-border-sm"
                style={{
                  aspectRatio: imgAspect,
                  borderRadius: 12,
                  padding: 4,
                  background: "var(--card)",
                }}
              />
            }
          >
            <NextImage
              src={src}
              alt={typeof caption === "string" ? caption : ""}
              placeholder="blur"
              onLoad={handleImgLoad}
              style={{
                aspectRatio: imgAspect,
                borderRadius: 8,
                display: "block",
                width: "100%",
                height: "auto",
              }}
            />
          </Popover.Trigger>
        </div>

        <AnimatePresence>
          {open && (
            <Popover.Portal keepMounted>
              {/* <Popover.Backdrop
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  />
                }
                // className="fixed inset-0 z-50 bg-neutral-950/25 backdrop-blur-[2px] dark:bg-neutral-950/50"
              /> */}
              <Popover.Positioner
                positionMethod="fixed"
                // side="bottom"
                sideOffset={0}
                className="z-50 overflow-auto"
              >
                <Popover.Popup
                  // className="-translate-y-full"
                  render={
                    <motion.div
                      // layoutId={layoutId}
                      // transition={{ layout: SPRING }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    />
                  }
                >
                  <Popover.Title className="sr-only">Image</Popover.Title>

                  <Popover.Close
                    // render={<CloseButton />}
                    // aria-label="Close"
                    className="pointer-events-auto"
                  >
                    Close
                  </Popover.Close>
                  {/* <motion.div
                    layoutId={layoutId}
                    transition={{ layout: SPRING }}
                    className="relative overflow-hidden shadow-border-2xl"
                    style={{
                      aspectRatio: imgAspect,
                      borderRadius: 24,
                      padding: 8,
                      background: "var(--card)",
                    }}
                  > */}
                  <ModalImage
                    src={src2 ?? src}
                    alt={typeof caption === "string" ? caption : ""}
                    // imgAspect={imgAspect}
                  />
                  {/* </motion.div> */}
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          )}
        </AnimatePresence>

        {caption && <figcaption className="max-w-prose text-pretty md:px-4">{caption}</figcaption>}
      </figure>
    </Popover.Root>
  );
}

export function ImageModalPopover2({ src, caption }: ImageModalProps) {
  const { imgAspect, handleImgLoad } = useImageAspect();
  const layoutId = React.useId();
  const layoutGroupId = React.useId();
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <Popover.Root>
      <LayoutGroup id={layoutGroupId}>
        <motion.div
          ref={ref}
          // layoutId={layoutId}
          // transition={{ layout: SPRING }}
          className="text-center shadow-border-sm"
          style={{
            // aspectRatio: imgAspect,
            borderRadius: 12,
            padding: 4,
            // overflow: "hidden",
            // background: "var(--card)",
          }}
        >
          <motion.img
            layoutId={layoutId}
            // transition={{ layout: SPRING }}
            src={imageSrc(src)}
            alt={typeof caption === "string" ? caption : ""}
            onLoad={handleImgLoad}
            style={{
              // aspectRatio: imgAspect,
              transformOrigin: "center",
              borderRadius: 8,
              display: "block",
              width: "100%",
            }}
          />
          <Popover.Trigger className="mx-auto">Open</Popover.Trigger>
        </motion.div>

        <Popover.Portal container={undefined} keepMounted>
          <Popover.Positioner
            side="bottom"
            // disableAnchorTracking
            positionMethod="fixed"
            align="center"
            sideOffset={({ anchor, positioner }) => {
              return positioner.height * -1 - anchor.height;
            }}
            className="z-100 origin-(--transform-origin)"
          >
            <Popover.Popup
              render={(props, state) => (
                <motion.div
                  transition={{ layout: SPRING }}
                  {...(props as HTMLMotionProps<"div">)}
                  initial={false}
                  animate={{
                    opacity: state.open ? 1 : 0,
                    transformOrigin: "bottom",
                    // scale: state.open ? 1 : 0.8,
                  }}
                >
                  <AnimatePresence>
                    {state.open && (
                      <motion.img
                        layoutId={layoutId}
                        src={imageSrc(src)}
                        alt={typeof caption === "string" ? caption : ""}
                        style={{
                          aspectRatio: imgAspect,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            >
              {/* <motion.img
                  // layoutId={layoutId}
                  // transition={{ layout: SPRING }}
                  src={src}
                  alt={caption ?? ""}
                  style={{
                    aspectRatio: imgAspect,
                    width: "calc(var(--popup-width) - 8px)",
                    borderRadius: 8,
                    display: "block",
                    // width: "100%",
                  }}
                /> */}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </LayoutGroup>
    </Popover.Root>
  );
}

// ===========================================================================
// Prototype C: Pure Motion + portal (control)
// ===========================================================================
export function ImageModalMotion2({ src, src2, caption }: ImageModalProps) {
  const [open, setOpen] = React.useState(false);
  const { imgAspect, handleImgLoad } = useImageAspect();
  const layoutId = React.useId();
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    overlayRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  return (
    <figure className="group/figure block [.prose>*+&]:mx-auto [.prose>*+&]:my-6 [.prose>*+&]:max-w-3xl">
      <div className="not-prose relative mb-2">
        <motion.div
          ref={triggerRef}
          layoutId={layoutId}
          transition={{ layout: SPRING }}
          className="cursor-pointer overflow-hidden shadow-border-sm"
          style={{
            // aspectRatio: imgAspect,
            borderRadius: 12,
            padding: 4,
            background: "var(--card)",
          }}
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          aria-label="View fullscreen image"
        >
          <NextImage
            src={src}
            alt={typeof caption === "string" ? caption : ""}
            placeholder="blur"
            onLoad={handleImgLoad}
            style={{
              aspectRatio: imgAspect,
              borderRadius: 8,
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </motion.div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                ref={overlayRef}
                role="dialog"
                aria-modal="true"
                aria-label="Image"
                tabIndex={-1}
                className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain px-0 py-10 outline-none sm:px-4 xl:py-6"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[2px] dark:bg-neutral-950/50"
                  onClick={() => setOpen(false)}
                />

                <motion.div className="relative w-full max-w-none sm:w-[min(var(--container-7xl),calc(100vw-2rem))]" layout>
                  <CloseButton onClick={() => setOpen(false)} />

                  <motion.div
                    layoutId={layoutId}
                    transition={{ layout: SPRING }}
                    className="relative overflow-hidden shadow-border-2xl"
                    style={{
                      // aspectRatio: imgAspect,
                      borderRadius: 24,
                      padding: 8,
                      background: "var(--card)",
                      maxWidth: "1024px",
                      minHeight: "512px",
                    }}
                  >
                    <ModalImage src={src2 ?? src} alt={typeof caption === "string" ? caption : ""} imgAspect={imgAspect} />
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {caption && <figcaption className="max-w-prose text-pretty md:px-4">{caption}</figcaption>}
    </figure>
  );
}
