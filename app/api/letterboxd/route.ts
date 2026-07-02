import { NextResponse } from "next/server";
import Parser from "rss-parser";

const LETTERBOXD_RSS_URL = "https://letterboxd.com/weisbecker/rss/";
const LETTERBOXD_REVALIDATE_SECONDS = 60 * 60;

const parser = new Parser({
  customFields: {
    item: ["letterboxd:filmTitle", "letterboxd:filmYear", "letterboxd:memberRating", "letterboxd:watchedDate", "letterboxd:rewatch"],
  },
});

function getPosterUrl(description = "") {
  return description.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? "";
}

function parseRating(value: unknown): number | undefined {
  const rating = typeof value === "number" ? value : Number(value);
  return Number.isFinite(rating) ? rating : undefined;
}

function normalizeLetterboxdUrl(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "letterboxd.com") {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
}

function normalizePosterUrl(value: string): string | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "a.ltrbxd.com") {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
}

function formatShortDate(date?: string) {
  if (!date) {
    return undefined;
  }

  const watchedDateParts = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (watchedDateParts) {
    return `${watchedDateParts[2]}/${watchedDateParts[3]}`;
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
  }).format(parsedDate);
}

async function fetchLetterboxdFeed() {
  const response = await fetch(LETTERBOXD_RSS_URL, {
    next: { revalidate: LETTERBOXD_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Letterboxd feed request failed");
  }

  return parser.parseString(await response.text());
}

export async function GET() {
  try {
    const feed = await fetchLetterboxdFeed();
    const films = feed.items
      .filter((item) => item["letterboxd:filmTitle"])
      .map((item) => ({
        title: item["letterboxd:filmTitle"] || item.title || "Untitled",
        year: item["letterboxd:filmYear"],
        rating: parseRating(item["letterboxd:memberRating"]),
        watchedDate: formatShortDate(String(item["letterboxd:watchedDate"])),
        rewatch: item["letterboxd:rewatch"] === "Yes",
        posterUrl: normalizePosterUrl(getPosterUrl(item.content || item.contentSnippet)),
        url: normalizeLetterboxdUrl(item.link),
      }))
      .filter((film) => film.posterUrl);

    return NextResponse.json(
      { films },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${LETTERBOXD_REVALIDATE_SECONDS}, stale-while-revalidate=${LETTERBOXD_REVALIDATE_SECONDS}`,
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Unable to load Letterboxd feed." }, { status: 500 });
  }
}
