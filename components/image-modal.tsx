"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Dialog as DialogBase } from "@base-ui/react/dialog";
import { Popover } from "@base-ui/react/popover";
import { Xmark } from "@gravity-ui/icons";
import { IconArrowsDiagonal } from "@tabler/icons-react";
import { AnimatePresence, HTMLMotionProps, LayoutGroup, motion } from "motion/react";
import * as React from "react";
import { createPortal } from "react-dom";

import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
  DialogPopup,
} from "@/components/ui/dialog";
import { Image } from "@/components/image";
const SPRING = { type: "spring" as const, damping: 28, stiffness: 220 };

interface ImageModalProps {
  src: string;
  src2?: string;
  caption?: string;
  portrait?: boolean;
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
      <Xmark className="size-4" />
      <span className="max-w-0 translate-x-2 overflow-hidden text-right opacity-0 transition-all duration-300 ease-out group-hover/close:max-w-[6ch] group-hover/close:translate-x-0 group-hover/close:opacity-100">
        Close
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Shared modal image with skeleton
// ---------------------------------------------------------------------------
function ModalImage({ src, alt, imgAspect }: { src: string; alt: string; imgAspect?: string }) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <>
      {!loaded && imgAspect && <Skeleton className="inset-2 h-100 rounded-[20px]" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
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

export function ImageModal({ src, caption }: ImageModalProps) {
  return (
    <Dialog>
      <figure className="group/figure my-0! block">
        <div className="relative">
          <Image src={src} alt={caption ?? ""} className="w-full" />
          <DialogTrigger
            aria-label="View fullscreen image"
            className="absolute inset-e-2 bottom-2"
            render={<Button variant="overlay" size="icon-sm" rounded />}
          >
            <IconArrowsDiagonal />
          </DialogTrigger>
        </div>
        <figcaption className="max-w-prose text-pretty md:px-4">{caption}</figcaption>
      </figure>
      <DialogPortal>
        <DialogOverlay />
        <DialogBase.Viewport
          className={cn(
            "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain outline-none",
            "pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]",
            "px-0 sm:px-4 sm:pt-6 sm:pb-10 lg:py-10"
          )}
        >
          <DialogPopup
            className={cn(
              "relative mx-auto my-0 w-full max-w-none overflow-hidden rounded-none p-0 shadow-none outline-none sm:rounded-2xl sm:shadow-border-xl",
              "sm:my-18 sm:w-[min(var(--container-7xl),calc(100vw-2rem))]"
            )}
          >
            <DialogBase.Title className="sr-only">{caption || "Image"}</DialogBase.Title>
            <img src={src} alt={caption ?? ""} className="block h-auto w-full max-w-none object-contain" />
          </DialogPopup>
        </DialogBase.Viewport>
      </DialogPortal>
    </Dialog>
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
                src={src}
                alt={caption ?? ""}
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
                <img
                  src={src}
                  alt=""
                  style={{
                    aspectRatio: imgAspect,
                    borderRadius: 8,
                    display: "block",
                    width: "100%",
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
                    <Xmark />
                  </DialogBase.Close>
                  <motion.img
                    layoutId={layoutId}
                    // transition={{ layout: SPRING }}
                    src={src2 ?? src}
                    alt={caption ?? ""}
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
            <img
              src={src}
              alt={caption ?? ""}
              onLoad={handleImgLoad}
              style={{
                aspectRatio: imgAspect,
                borderRadius: 8,
                display: "block",
                width: "100%",
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
                    alt={caption ?? ""}
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

export function ImageModalPopover2({ src, src2, caption }: ImageModalProps) {
  const [open, setOpen] = React.useState(false);
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
            src={src}
            alt={caption ?? ""}
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
                        src={src}
                        alt={caption ?? ""}
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

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    overlayRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
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
          <img
            src={src}
            alt={caption ?? ""}
            onLoad={handleImgLoad}
            style={{
              aspectRatio: imgAspect,
              borderRadius: 8,
              display: "block",
              width: "100%",
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

                <motion.div
                  className="relative w-full max-w-none sm:w-[min(var(--container-7xl),calc(100vw-2rem))]"
                  layout
                >
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
                    <ModalImage src={src2 ?? src} alt={caption ?? ""} imgAspect={imgAspect} />
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
