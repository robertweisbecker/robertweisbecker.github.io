"use client";

import * as React from "react";
import * as Lightbox from "@ramka/react/lightbox";
import Image from "next/image";

import { LinkButton } from "@/components/ui/link-button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { homeArtwork } from "./home-data";
import { MediaGallery } from "./media-gallery";
import pile from "./home-prototype.module.css";
import desk from "./artwork-preview.module.css";
import { useStableMorph } from "./use-stable-morph";

export function ArtworkPreview() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [surface, setSurface] = React.useState("desk");
  const isDesk = surface === "desk";
  const morph = useStableMorph();

  return (
    <Lightbox.Root
      value={value}
      onValueChange={setValue}
      open={open}
      onOpenChange={setOpen}
      morphTo="active"
      onOpenChangeComplete={morph.complete}
      scrollTriggerIntoView={[
        { type: "onChange", behavior: "instant" },
        { type: "onOpenComplete", behavior: "instant" },
      ]}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 id="ramka-home-art" className="font-pixel text-[11px] uppercase">
          IV. Art
        </h2>
        <ToggleGroup
          aria-label="Compare artwork treatments"
          variant="elevated"
          size="sm"
          value={[surface]}
          onValueChange={(values) => {
            if (values[0] === "pile" || values[0] === "desk") setSurface(values[0]);
          }}
        >
          <ToggleGroupItem value="pile">Photo pile</ToggleGroupItem>
          <ToggleGroupItem value="desk">Studio desk</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className={isDesk ? desk.desk : pile.artPile} data-open={open || undefined} onClickCapture={morph.capture}>
        {isDesk && (
          <div className={desk.objects} aria-hidden="true">
            <span className={desk.spareSheet} />
            <span className={desk.colorStudy}>
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className={desk.coffeeRing} />
            <span className={desk.pencil} />
            <span className={desk.charcoal} />
            <span className={desk.deskNote}>works in progress</span>
          </div>
        )}
        {homeArtwork.map((art, index) => (
          <Lightbox.Trigger
            key={art.id}
            index={index}
            data-morph-card
            aria-label={`View ${art.title}`}
            className={isDesk ? desk.artwork : pile.artCard}
            data-material={isDesk ? ["paper", "paper", "canvas", "paper", "sketch", "canvas"][index] : undefined}
            data-landscape={isDesk && index === 1 ? "" : undefined}
            style={
              {
                "--art-x": `${(isDesk ? [20, 50, 79, 23, 51, 79] : [19, 48, 77, 25, 53, 80])[index]}%`,
                "--art-y": `${(isDesk ? [29, 27, 34, 68, 66, 72] : [31, 27, 34, 68, 66, 72])[index]}%`,
                "--art-rotation": `${(isDesk ? [-12, 9, -8, 13, -7, 12] : [-13, 7, -8, 11, -6, 14])[index]}deg`,
                "--layer": art.layer,
              } as React.CSSProperties
            }
          >
            {({ imageRef, morphRef }) => (
              <>
                <Image
                  ref={(node) => {
                    imageRef(node);
                    morphRef(node);
                  }}
                  src={art.image}
                  alt={art.alt}
                  placeholder="blur"
                  sizes="(max-width: 720px) 30vw, 210px"
                  className={isDesk ? desk.picture : "size-full rounded-[inherit] object-cover"}
                  draggable={false}
                />
                {isDesk && (
                  <>
                    <span className={desk.grain} aria-hidden="true" />
                    <span className={desk.signature} aria-hidden="true">
                      {art.title}
                      <span>{art.description.split(", ")[1]}</span>
                    </span>
                  </>
                )}
              </>
            )}
          </Lightbox.Trigger>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {isDesk ? "A little beautiful disorder. Pick something up." : "A few things made away from the screen. And on it."}
        </p>
        <LinkButton href="/art" variant="link" className="shrink-0">
          All artwork <span aria-hidden>↗</span>
        </LinkButton>
      </div>
      <MediaGallery
        items={homeArtwork}
        label="Selected artwork"
        activeIndex={value}
        footer={
          <LinkButton href="/art" variant="link" size="sm" className="mt-2">
            View all artwork <span aria-hidden>→</span>
          </LinkButton>
        }
      />
    </Lightbox.Root>
  );
}
