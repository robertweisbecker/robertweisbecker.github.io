import { NextResponse } from "next/server";
import Parser from "rss-parser";

const LETTERBOXD_RSS_URL = "https://letterboxd.com/weisbecker/rss/";

const parser = new Parser({
  customFields: {
    item: ["letterboxd:filmTitle", "letterboxd:filmYear", "letterboxd:memberRating", "letterboxd:watchedDate", "letterboxd:rewatch"],
  },
});

const MAX_LISTS = 3;
const MAX_LIST_FILMS = 5;

function getPosterUrl(description = "") {
  return description.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? "";
}

function decodeText(text = "") {
  return text
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&ndash;", "–")
    .replaceAll("&mdash;", "—")
    .replaceAll("&amp;", "&");
}

function getListFilms(description = "") {
  return [...description.matchAll(/<li>\s*<a href="(https:\/\/letterboxd\.com\/film\/[^"]+)">([^<]+)<\/a>/g)].map((match) => ({
    url: match[1],
    title: decodeText(match[2]),
  }));
}

function getListFilmCount(description = "", previewCount = 0) {
  const plusMore = Number(description.match(/\.\.\.plus\s+(\d+)\s+more/)?.[1] ?? 0);
  return previewCount + plusMore;
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

export async function GET() {
  try {
    const feed = await parser.parseURL(LETTERBOXD_RSS_URL);
    const films = feed.items
      .filter((item) => item["letterboxd:filmTitle"])
      .map((item) => ({
        title: item["letterboxd:filmTitle"] || item.title || "Untitled",
        year: item["letterboxd:filmYear"],
        rating: item["letterboxd:memberRating"],
        watchedDate: formatShortDate(String(item["letterboxd:watchedDate"])),
        rewatch: item["letterboxd:rewatch"] === "Yes",
        posterUrl: getPosterUrl(item.content || item.contentSnippet),
        url: item.link,
      }))
      .filter((film) => film.posterUrl);

    const listItems = feed.items.filter((item) => String(item.guid || "").startsWith("letterboxd-list-")).slice(0, MAX_LISTS);
    const lists = listItems.map((item) => {
      const description = item.content || item.contentSnippet || "";
      const listFilms = getListFilms(description);

      return {
        title: item.title || "Untitled list",
        url: item.link,
        updatedDate: formatShortDate(item.pubDate),
        filmCount: getListFilmCount(description, listFilms.length),
        previewFilms: listFilms.slice(0, MAX_LIST_FILMS),
      };
    });

    return NextResponse.json({ films, lists });
  } catch {
    return NextResponse.json({ error: "Unable to load Letterboxd feed." }, { status: 500 });
  }
}
