"use client";

import { Cambio } from "cambio";
import Image from "next/image";
import { LazyMotion, domMax, m } from "motion/react";

import styles from "./cambio-examples.module.css";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const MotionImage = m.create(Image);

function DemoImage({ layoutProps, className, expanded = false }: { layoutProps?: boolean; className?: string; expanded?: boolean }) {
  return (
    // <LayoutGroup>
    //   <m.div className="size-full rounded-lg bg-card p-1">
    <MotionImage
      // key={`${layoutId}-${expanded ? "expanded" : "collapsed"}`}
      // layoutId={layoutId}
      {...(layoutProps && { layoutAnchor: { x: 0.5, y: 0.5 }, layout: true })}
      src="/art/2017_x.jpeg"
      alt="Sample artwork for shared-layout demo"
      fill
      className={cn("pointer-events-none select-none", className)}
      sizes="(max-width: 768px) 90vw, 60vw"
      priority={false}
      loading="eager"
      style={{ objectFit: expanded ? "scale-down" : "cover" }}
    />
    //   </m.div>
    // </LayoutGroup>
  );
}

export function ExampleBasic() {
  return (
    <LazyMotion features={domMax}>
      <Cambio.Root dismissible>
        <Cambio.Trigger
          className={cn(styles.trigger, "relative w-full")}
          style={{ boxShadow: "var(--shadow-border-xs)", aspectRatio: "16/9", borderRadius: 0 }}
          layout
          // layoutAnchor={{ x: 0.5, y: 0.5 }}
        >
          <DemoImage layoutProps />
        </Cambio.Trigger>
        <Cambio.Portal
          className="overflow-hidden py-12"
          // layoutAnchor={{ x: 0.5, y: 0.5 }}
        >
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup
            className={cn(styles.popup, "max-h-dialog max-w-dialog")}
            style={{ boxShadow: "var(--shadow-border-xl)", aspectRatio: "9/16", borderRadius: 24 }}
          >
            <Cambio.Title render={<m.h1 layout />} className="z-10 w-fit origin-right -rotate-90 font-pixel text-2xs text-white">
              Title
            </Cambio.Title>
            <Cambio.Description render={<m.p layout />} className="absolute z-10 font-pixel text-2xs text-white">
              iPad
            </Cambio.Description>

            <DemoImage layoutProps expanded className="mt-12 -mb-12" />

            <Cambio.Close className="absolute top-2 right-2">
              <IconX className="size-4" />
            </Cambio.Close>
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </LazyMotion>
  );
}

export function ExampleDismissible() {
  return (
    <LazyMotion features={domMax}>
      <Cambio.Root dismissible>
        <Cambio.Trigger className={styles.trigger}>
          <DemoImage />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup className={styles.popup}>
            <DemoImage />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </LazyMotion>
  );
}

export function ExampleDismissibleAdvanced() {
  return (
    <LazyMotion features={domMax}>
      <Cambio.Root dismissible={{ threshold: 80, velocity: 400 }}>
        <Cambio.Trigger className={styles.trigger}>
          <DemoImage />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup className={styles.popup}>
            <DemoImage />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </LazyMotion>
  );
}

export function ExampleReduced() {
  return (
    <LazyMotion features={domMax}>
      <Cambio.Root reduceMotion>
        <Cambio.Trigger className={styles.trigger}>
          <DemoImage />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup className={styles.popup}>
            <DemoImage />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </LazyMotion>
  );
}

export function ExampleBouncy() {
  return (
    <LazyMotion features={domMax}>
      <Cambio.Root motion="bouncy">
        <Cambio.Trigger className={styles.trigger}>
          <DemoImage />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup className={styles.popup}>
            <DemoImage />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </LazyMotion>
  );
}

export function ExampleSnappy() {
  return (
    <LazyMotion features={domMax}>
      <Cambio.Root motion="snappy">
        <Cambio.Trigger className={styles.trigger}>
          <DemoImage />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup className={styles.popup}>
            <DemoImage />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </LazyMotion>
  );
}

export function ExampleSmooth() {
  return (
    <LazyMotion features={domMax}>
      <Cambio.Root motion="smooth">
        <Cambio.Trigger className={styles.trigger}>
          <DemoImage />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup className={styles.popup}>
            <DemoImage />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </LazyMotion>
  );
}

export function ExampleVariants() {
  return (
    <LazyMotion features={domMax}>
      <Cambio.Root motion={{ trigger: "snappy", popup: "bouncy", backdrop: "smooth" }}>
        <Cambio.Trigger className={styles.trigger}>
          <DemoImage />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup className={styles.popup}>
            <DemoImage />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </LazyMotion>
  );
}

export function ExampleOverrides() {
  return (
    <LazyMotion features={domMax}>
      <Cambio.Root motion="smooth">
        <Cambio.Trigger motion="snappy" className={styles.trigger}>
          <DemoImage />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop motion="reduced" className={styles.backdrop} />
          <Cambio.Popup motion="bouncy" className={styles.popup}>
            <DemoImage />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </LazyMotion>
  );
}
