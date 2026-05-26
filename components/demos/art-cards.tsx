"use client";

import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import * as React from "react";

import { PixelChevronDownIcon } from "@/components/icons-pixel";
import { LinkButton } from "@/components/ui/link-button";
import art2 from "@/public/art/2025_chi.jpeg";
import art1 from "@/public/art/2025_br.jpeg";
import art3 from "@/public/art/2024_otis.jpeg";
import art4 from "@/public/art/2012_man-enhanced.jpeg";
import art5 from "@/public/art/2010_spray-cig.jpeg";
import art6 from "@/public/art/2017_x.jpeg";

const CARD_W = 100;
const CARD_H = 125;
const SPRING = { type: "spring" as const, visualDuration: 0.4, bounce: 0.25 };

type ArtCardProps = {
  src: StaticImageData;
  index: number;
  count: number;
  /** Card center as a percentage of the container's width / height. */
  left: number;
  top: number;
  rotate: number;
  zIndex?: number;
  isHovered: boolean;
};

function ArtCard({ src, index, count, left, top, rotate, zIndex, isHovered }: ArtCardProps) {
  // Evenly distribute cards across 10%–90% of the container on hover.
  const hoverLeft = 10 + (index / (count - 1)) * 80;
  return (
    <motion.div
      className="absolute aspect-square bg-card p-1"
      style={{
        width: CARD_W,
        height: CARD_H,
        borderRadius: "var(--radius-lg)",
        boxShadow: isHovered ? "var(--shadow-border-lg)" : "var(--shadow-border-sm)",
        zIndex,
      }}
      initial={false}
      animate={{
        left: `${isHovered ? hoverLeft : left}%`,
        top: `${isHovered ? 50 : top}%`,
        x: "-50%",
        y: "-50%",
        rotate: isHovered ? 0 : rotate,
      }}
      transition={SPRING}
    >
      <Image src={src} placeholder="blur" sizes="100px" fill alt="" className="inset-1 size-full rounded-[inherit] object-cover" />
    </motion.div>
  );
}

export function ArtCards() {
  const [isHovered, setIsHovered] = React.useState(false);
  const count = 6;
  const cardProps = { count, isHovered };

  return (
    <motion.div
      className="relative isolate flex h-64 w-full overflow-hidden rounded-xl bg-muted sm:-mx-4"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <ArtCard src={art1} index={0} left={18} top={52} rotate={-16} zIndex={2} {...cardProps} />
      <ArtCard src={art2} index={1} left={32} top={46} rotate={4} zIndex={1} {...cardProps} />
      <ArtCard src={art5} index={2} left={44} top={39} rotate={-2} zIndex={6} {...cardProps} />
      <ArtCard src={art3} index={3} left={58} top={47} rotate={7} zIndex={5} {...cardProps} />
      <ArtCard src={art4} index={4} left={74} top={52} rotate={12} zIndex={3} {...cardProps} />
      <ArtCard src={art6} index={5} left={86} top={58} rotate={-9} zIndex={4} {...cardProps} />

      <LinkButton className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2" href="/art" isExternal={false}>
        View all <PixelChevronDownIcon className="-rotate-90" data-icon="inline-end" />
      </LinkButton>
    </motion.div>
  );
}
