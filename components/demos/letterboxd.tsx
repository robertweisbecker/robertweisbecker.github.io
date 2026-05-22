"use client";

import { IconEyeCheck, IconEyeFilled } from "@tabler/icons-react";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import { Item, ItemContent, ItemTitle, ItemDescription, ItemHeader, ItemFooter } from "../ui/item";
import { LinkButton } from "../ui/link-button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Skeleton } from "../ui/skeleton";
import { Vignette } from "../vignette";

type Film = {
  title: string;
  watchedDate?: string;
  posterUrl: string;
  rewatch?: boolean;
  url?: string;
  rating?: number;
};

type FilmList = {
  title: string;
  url?: string;
  updatedDate?: string;
  filmCount?: number;
  previewFilms: {
    url: string;
    title: string;
  }[];
};

export function Letterboxd({ maxFilms = 4 }) {
  const [films, setFilms] = useState<Film[]>([]);
  const [lists, setLists] = useState<FilmList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFilms() {
      try {
        const response = await fetch("/api/letterboxd");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load Letterboxd feed.");
        }

        setFilms(data.films.slice(0, maxFilms));
        setLists(data.lists);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unable to load Letterboxd feed.");
      } finally {
        setLoading(false);
      }
    }

    loadFilms();
  }, [maxFilms]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <LinkButton href="https://letterboxd.com/weisbecker/" isExternal variant="link" size="sm">
          <LetterboxdLogo data-icon="inline-start" /> @weisbecker
        </LinkButton>
      </div>

      {loading ? (
        <LetterboxdSkeleton maxFilms={maxFilms} />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <Tabs defaultValue="watched" className="gap-3">
          <TabsList variant="pill" className="relative w-full animate-stagger-enter justify-start [--delay:45ms] [--stagger:1]">
            <TabsTrigger value="watched" className="w-fit grow-0">
              Recents
            </TabsTrigger>
            <TabsTrigger value="lists" className="w-fit grow-0">
              Lists
            </TabsTrigger>
            <Badge variant="outline" className="absolute right-0">
              <IconEyeFilled title="Films logged" className="text-info-primary" /> 1,244
            </Badge>
          </TabsList>
          <TabsContent value="watched">
            <div className="grid grid-cols-5 gap-2">
              {films.map((film, index) => (
                <FilmCard key={film.url ?? index} film={film} index={index} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="lists">
            <div className="grid grid-cols-3 gap-2">
              {lists.map((list) => (
                <ListCard key={list.url ?? list.title} list={list} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function FilmCard({ film, index }: { film: Film; index: number }) {
  return (
    <Item
      size="xs"
      variant="muted"
      className="relative m-0 animate-stagger-enter rounded-md"
      style={
        {
          "--index": index,
          "--stagger": "var(--index)",
          //   opacity: `calc(1 - ${index} * 0.1)`,
          zIndex: 10 - index,
        } as CSSProperties
      }
    >
      <div className="mask-b absolute -inset-px -z-1 rounded-md mask-b-from-80%">
        <div
          className="absolute bottom-6 aspect-square w-50 bg-cover opacity-60 mix-blend-multiply blur-xl"
          style={{
            backgroundImage: `url(${film.posterUrl})`,
            animation: "shine-sweep 20s linear infinite alternate-reverse",
            animationDelay: "calc(var(--index) * 100ms)",
          }}
        />
      </div>
      <ItemHeader className="">
        <Vignette.Root
          transitionLength={24}
          inset={8}
          className="-mx-1 -mt-1 shadow-border-md outline -outline-offset-1 outline-white/15"
          radius="var(--radius-md)"
        >
          <Vignette.Image src={film.posterUrl} alt={film.title} width={150} height={255} sizes="150px" className="object-cover" />
        </Vignette.Root>
      </ItemHeader>
      <ItemContent className="mt-2">
        <ItemTitle>{film.title}</ItemTitle>
        {film.rating ? (
          <ItemDescription className="text-sm text-muted-foreground">
            {"★".repeat(Math.floor(film.rating)) + (film.rating % 1 ? "½" : "")}
          </ItemDescription>
        ) : null}
      </ItemContent>
      <ItemFooter>
        <ItemDescription className="font-pixel text-[11px]! text-muted-foreground/60">
          {film.watchedDate}{" "}
          {film.rewatch && (
            <>
              {" "}
              ∙ <IconEyeCheck className="inline-block size-3" />
            </>
          )}
        </ItemDescription>
      </ItemFooter>
    </Item>
  );
}

function ListCard({ list }: { list: FilmList }) {
  return (
    <div className="group/list grid gap-2">
      <div className="flex items-baseline gap-2">
        <a className="leading-none font-medium" href={list.url}>
          {list.title}
        </a>
        {list.filmCount ? <Badge variant="outline">{list.filmCount}</Badge> : null}
      </div>
      <ol className="grid gap-1 text-sm text-muted-foreground">
        {list.previewFilms.map((film, index) => (
          <li key={film.url} className="flex min-w-0 gap-2">
            <span className="font-mono text-xs text-muted-foreground/60">{index + 1}</span>
            <span className="truncate">{film.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function LetterboxdSkeleton({ maxFilms }: { maxFilms: number }) {
  return (
    <div className="grid gap-3">
      <Skeleton className="h-7 w-32 rounded-full" />
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: maxFilms }).map((_, index) => (
          <div key={index} className="grid gap-2 rounded-xl bg-muted/40 p-1.5">
            <Skeleton className="aspect-10/17 w-full rounded-md" />
            <div className="grid gap-1">
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-3 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

function LetterboxdLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" version="1.1">
      <defs>
        <rect id="path-1" x="0" y="0" width="129.847328" height="141.389313" />
        <rect id="path-3" x="0" y="0" width="129.847328" height="141.389313" />
      </defs>
      <g id="letterboxd-decal-dots-pos-rgb" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <circle id="Circle" fill="#202830" cx="250" cy="250" r="250" />
        <g id="dots-neg" transform="translate(61.000000, 180.000000)">
          <g id="Dots">
            <ellipse id="Green" fill="#00E054" cx="189" cy="69.9732824" rx="70.0786517" ry="69.9732824" />
            <g id="Blue" transform="translate(248.152672, 0.000000)">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <g id="Mask" />
              <ellipse fill="#40BCF4" mask="url(#mask-2)" cx="59.7686766" cy="69.9732824" rx="70.0786517" ry="69.9732824" />
            </g>
            <g id="Orange">
              <mask id="mask-4" fill="white">
                <use xlinkHref="#path-3" />
              </mask>
              <g id="Mask" />
              <ellipse fill="#FF8000" mask="url(#mask-4)" cx="70.0786517" cy="69.9732824" rx="70.0786517" ry="69.9732824" />
            </g>
            <path
              d="M129.539326,107.022244 C122.810493,96.2781677 118.921348,83.5792213 118.921348,69.9732824 C118.921348,56.3673435 122.810493,43.6683972 129.539326,32.9243209 C136.268159,43.6683972 140.157303,56.3673435 140.157303,69.9732824 C140.157303,83.5792213 136.268159,96.2781677 129.539326,107.022244 Z"
              id="Overlap"
              fill="#FFFFFF"
            />
            <path
              d="M248.460674,32.9243209 C255.189507,43.6683972 259.078652,56.3673435 259.078652,69.9732824 C259.078652,83.5792213 255.189507,96.2781677 248.460674,107.022244 C241.731841,96.2781677 237.842697,83.5792213 237.842697,69.9732824 C237.842697,56.3673435 241.731841,43.6683972 248.460674,32.9243209 Z"
              id="Overlap"
              fill="#FFFFFF"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
