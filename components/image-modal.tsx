"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog } from "@base-ui/react/dialog";
import { Popover } from "@base-ui/react/popover";
import { Xmark } from "@gravity-ui/icons";
import { IconArrowsDiagonal } from "@tabler/icons-react";
import { AnimatePresence, HTMLMotionProps, LayoutGroup, motion } from "motion/react";
import * as React from "react";
import { createPortal } from "react-dom";

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
      {!loaded && imgAspect && <Skeleton className="absolute inset-2 rounded-[20px]" />}
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

// ===========================================================================
// Prototype A: Dialog + layoutId (improved)
// ===========================================================================
export function ImageModal({ src, src2, caption }: ImageModalProps) {
  const [open, setOpen] = React.useState(false);
  const { imgAspect, handleImgLoad } = useImageAspect();
  const layoutId = React.useId();
  const popupRef = React.useRef<HTMLDivElement>(null);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <figure className="group/figure block [.prose>*+&]:mx-auto [.prose>*+&]:my-6 [.prose>*+&]:max-w-3xl">
        <div className="not-prose relative mb-2">
          {!open ? (
            <motion.div
              className="overflow-hidden shadow-border-sm"
              style={{
                aspectRatio: imgAspect,
                borderRadius: 12,
                padding: 4,
                background: "var(--card)",
              }}
            >
              <motion.img
                layoutId={layoutId}
                transition={{ layout: SPRING }}
                src={src}
                alt={caption ?? ""}
                onLoad={handleImgLoad}
                style={{
                  aspectRatio: imgAspect,
                  borderRadius: 8,
                  display: "block",
                  width: "600px",
                  height: "auto",
                }}
              />
            </motion.div>
          ) : (
            <div aria-hidden style={{ visibility: "hidden" }}>
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

          <Dialog.Trigger
            className="absolute right-3 bottom-3 rounded-full opacity-0 transition-opacity duration-100 ease-out group-hover/figure:opacity-100 hover:opacity-100 focus-visible:opacity-100"
            render={<Button variant="overlay" size="icon" />}
            aria-label="View fullscreen image"
          >
            <IconArrowsDiagonal />
          </Dialog.Trigger>
        </div>

        <AnimatePresence>
          {open && (
            <Dialog.Portal keepMounted>
              <Dialog.Backdrop
                // render={
                //   <motion.div
                //     initial={{ opacity: 0 }}
                //     animate={{ opacity: 1 }}
                //     exit={{ opacity: 0 }}
                //     transition={{ duration: 0.3, delay: 0.05 }}
                //   />
                // }
                className="fixed inset-0 z-50 bg-neutral-950/25 backdrop-blur-[2px] dark:bg-neutral-950/50"
              />
              <Dialog.Viewport className="fixed inset-0 z-50 grid max-h-screen place-items-center overflow-auto p-4">
                <Dialog.Popup
                  ref={popupRef}
                  initialFocus={popupRef}
                  className="group/popup relative w-[min(var(--container-7xl),calc(100vw-2rem))]"
                >
                  <Dialog.Title className="sr-only">Image</Dialog.Title>

                  <Dialog.Close
                    aria-label="Close"
                    render={<Button variant="overlay" size="sm" />}
                    className="group/close pointer-events-auto z-10 gap-0 rounded-full p-2 transition-all duration-300 ease-out hover:gap-1 hover:px-3"
                  >
                    <Xmark />
                    <span className="max-w-0 translate-x-2 overflow-hidden text-right opacity-0 transition-all duration-300 ease-out group-hover/close:max-w-[6ch] group-hover/close:translate-x-0 group-hover/close:opacity-100">
                      Close
                    </span>
                  </Dialog.Close>

                  {/* <motion.div
                    layout
                    className="overflow-hidden shadow-border-2xl"
                    style={{
                      aspectRatio: imgAspect,
                      borderRadius: 24,
                      padding: 8,
                      background: "var(--card)",
                    }}
                  > */}
                  <motion.img
                    layoutId={layoutId}
                    transition={{ layout: SPRING }}
                    src={src2 ?? src}
                    alt={caption ?? ""}
                    onLoad={handleImgLoad}
                    className="min-w-full"
                    style={{
                      aspectRatio: imgAspect,
                      minWidth: "100%",
                      height: "auto",
                      objectFit: "contain",
                      objectPosition: "center",
                      transformOrigin: "center",
                      scale: open ? 1 : 0.5,
                    }}
                  />
                  {/* </motion.div> */}
                </Dialog.Popup>
              </Dialog.Viewport>
            </Dialog.Portal>
          )}
        </AnimatePresence>

        {caption && <figcaption className="max-w-prose text-pretty md:px-4">{caption}</figcaption>}
      </figure>
    </Dialog.Root>
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
export function ImageModalMotion({ src, src2, caption }: ImageModalProps) {
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
                className="fixed inset-0 z-50 flex items-center justify-center overflow-auto px-4 py-10 outline-none xl:py-6"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[2px] dark:bg-neutral-950/50"
                  onClick={() => setOpen(false)}
                />

                <motion.div className="relative w-[min(var(--container-7xl),calc(100vw-2rem))]" layout>
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
