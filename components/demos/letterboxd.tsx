"use client";

import { IconEyeCheck } from "@tabler/icons-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import { Item, ItemContent, ItemTitle, ItemDescription, ItemHeader, ItemFooter } from "../ui/item";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Vignette } from "../vignette";
import { LinkButton } from "../ui/link-button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";

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

const MIN_LOADING_VISIBLE_MS = 400;
const CONTENT_REVEAL_DELAY_MS = 160;
const MAX_POSTER_SETTLE_WAIT_MS = 800;

export function Letterboxd({ maxFilms = 4 }) {
  const [films, setFilms] = useState<Film[]>([]);
  const [lists, setLists] = useState<FilmList[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [loadedPosters, setLoadedPosters] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const loadStartedAt = useRef(0);

  useEffect(() => {
    let ignore = false;

    async function loadFilms() {
      loadStartedAt.current = performance.now();
      setLoading(true);
      setContentVisible(false);
      setLoadedPosters(0);
      setError(null);

      try {
        const response = await fetch("/api/letterboxd");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load Letterboxd feed.");
        }

        if (!ignore) {
          setFilms(data.films.slice(0, maxFilms));
          setLists(data.lists);
        }
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : "Unable to load Letterboxd feed.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadFilms();

    return () => {
      ignore = true;
    };
  }, [maxFilms, retryCount]);

  useEffect(() => {
    if (loading || error || contentVisible || films.length === 0) {
      return;
    }

    const elapsed = performance.now() - loadStartedAt.current;
    const minimumLoadingDelay = Math.max(0, MIN_LOADING_VISIBLE_MS - elapsed);
    const posterSettleDelay = loadedPosters >= films.length ? CONTENT_REVEAL_DELAY_MS : MAX_POSTER_SETTLE_WAIT_MS;
    const delay = Math.max(minimumLoadingDelay, posterSettleDelay);
    const timer = window.setTimeout(() => setContentVisible(true), delay);

    return () => window.clearTimeout(timer);
  }, [contentVisible, error, films.length, loadedPosters, loading]);

  function handlePosterSettled() {
    setLoadedPosters((count) => Math.min(count + 1, films.length));
  }

  function retryFetch() {
    setRetryCount((count) => count + 1);
  }

  return (
    <div className="flex flex-col gap-2">
      {/* <div className="flex justify-between gap-2">
        <p className="font-pixel text-[11px]! text-muted-foreground/50">Recently watched</p>
        <LinkButton href="https://letterboxd.com/weisbecker/" variant="ghost" size="xs">
          <LetterboxdLogo data-icon="inline-start" />
          View on Letterboxd
        </LinkButton>
      </div> */}

      <div className="relative">
        {!contentVisible && !error ? <LetterboxdSkeleton maxFilms={maxFilms} /> : null}
        {!loading && error ? (
          <div className="grid gap-2 rounded-xl bg-muted/40 p-3 text-sm text-muted-foreground">
            <p>{error}</p>
            <Button variant="elevated" size="sm" className="w-fit" onClick={retryFetch}>
              Retry
            </Button>
          </div>
        ) : null}
        {!loading && !error ? (
          <div
            aria-hidden={!contentVisible}
            inert={!contentVisible}
            className={contentVisible ? "animate-stagger-enter [--delay:45ms]" : "pointer-events-none absolute inset-0 opacity-0"}
          >
            <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:grid-cols-4">
              {films.map((film, index) => (
                <FilmCard key={film.url ?? index} film={film} index={index} onPosterSettled={handlePosterSettled} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FilmCard({ film, index, onPosterSettled }: { film: Film; index: number; onPosterSettled: () => void }) {
  return (
    <Item
      size="xs"
      variant="muted"
      className="relative isolate m-0 animate-stagger-enter rounded-lg"
      style={
        {
          "--index": index,
          "--stagger": "var(--index)",
          //   opacity: `calc(1 - ${index} * 0.1)`,
          zIndex: 10 - index,
        } as CSSProperties
      }
    >
      <div className="mask-b absolute -inset-px -z-1 grid-stack justify-center overflow-clip rounded-lg mask-b-from-40%">
        <style>
          {`
          @keyframes poster-anim {
            0% { transform: rotate(0); opacity: .3; }
            50% { opacity: 0.7; }
            100% { transform: rotate(240deg); opacity: .5; }
          }
        `}
        </style>
        <div
          className="aspect-square h-full bg-cover opacity-60 mix-blend-difference blur-2xl dark:opacity-30"
          style={{
            backgroundImage: `url(${film.posterUrl})`,
            animation: "poster-anim 7s linear infinite forwards alternate",
          }}
        />
      </div>
      <ItemHeader className="">
        <Vignette.Root transitionLength={16} inset={8} className="h-auto w-full shadow-border-md" radius="var(--radius-md)">
          <Vignette.Image
            src={film.posterUrl}
            alt={film.title}
            width={150}
            height={255}
            sizes="150px"
            loading="eager"
            className="object-cover"
            onLoad={onPosterSettled}
            onError={onPosterSettled}
          />
        </Vignette.Root>
      </ItemHeader>
      <ItemContent className="">
        <ItemTitle className="line-clamp-1">
          {film.title}{" "}
          {film.rewatch && (
            <TooltipProvider delay={0}>
              <Tooltip>
                <TooltipTrigger>
                  <IconEyeCheck className="align-start inline size-[1em]" title="Rewatch" />
                </TooltipTrigger>
                <TooltipContent>Rewatch</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </ItemTitle>
        <ItemFooter className="items-baseline justify-between">
          <ItemDescription className="font-pixel text-[11px]! text-muted-foreground">
            {film.rating ? (
              <span>{"★".repeat(Math.floor(film.rating)) + (film.rating % 1 ? "½" : "")}</span>
            ) : (
              <span className="text-muted-foreground/60">TBD</span>
            )}
          </ItemDescription>
          {film.watchedDate ? <ItemDescription className="text-2xs text-muted-foreground/60">{film.watchedDate}</ItemDescription> : null}
        </ItemFooter>
      </ItemContent>
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
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Array.from({ length: maxFilms }).map((_, index) => (
          <div key={index} className="grid gap-2 rounded-xl bg-muted/40 p-1.5">
            <Skeleton className="aspect-10/17 w-full rounded-md" />
            <div className="grid gap-1">
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LetterboxdLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" version="1.1" className="opacity-100!">
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
