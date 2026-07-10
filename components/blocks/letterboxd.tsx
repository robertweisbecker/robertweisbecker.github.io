"use client";

import { IconEyeCheck } from "@tabler/icons-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Preserved for the commented Letterboxd header treatment below.
import { LetterboxdLogo } from "@/components/icons";
import { Item, ItemContent, ItemTitle, ItemDescription, ItemHeader, ItemFooter } from "../ui/item";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Vignette } from "../vignette";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";

type Film = {
  title: string;
  watchedDate?: string;
  posterUrl: string;
  rewatch?: boolean;
  url?: string;
  rating?: number;
};

const MIN_LOADING_VISIBLE_MS = 400;
const CONTENT_REVEAL_DELAY_MS = 160;
const MAX_POSTER_SETTLE_WAIT_MS = 800;

export function Letterboxd({ maxFilms = 4 }) {
  const [films, setFilms] = useState<Film[]>([]);
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
      <ItemHeader>
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
      <ItemContent>
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
