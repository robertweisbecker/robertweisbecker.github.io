# Plan 003: Cache and normalize the Letterboxd API route

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat f87f0ad..HEAD -- app/api/letterboxd/route.ts components/demos/letterboxd.tsx next.config.ts` If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it
> as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: `plans/001-add-verification-baseline.md`
- **Category**: performance / correctness
- **Completed at**: branch `cursor/execute-plans-003-004-5d22`, 2026-07-01

## Why this matters

The homepage renders a client Letterboxd widget that calls `/api/letterboxd`. The route currently asks `rss-parser` to fetch the remote RSS URL directly on every GET and returns values parsed from RSS HTML without central URL validation or numeric normalization. Caching and normalizing this boundary
will reduce external latency/rate risk and make the widget's film data contract match the component types.

## Current state

- The homepage includes the widget near the bottom of `app/page.tsx`.

```tsx
// app/page.tsx:369-380
<section>
  {" "}
  <p className="mb-5 text-sm text-muted-foreground">And, since you made it this far, here&apos;s what I&apos;ve been watching:</p>
  <Letterboxd maxFilms={4} />
</section>
```

- The client component fetches the route, uses `data.films`, and expects `rating?: number`.

```ts
// components/demos/letterboxd.tsx:13-20
type Film = {
  title: string;
  watchedDate?: string;
  posterUrl: string;
  rewatch?: boolean;
  url?: string;
  rating?: number;
};
```

```ts
// components/demos/letterboxd.tsx:45-55
const response = await fetch("/api/letterboxd");
const data = await response.json();

if (!response.ok) {
  throw new Error(data.error || "Unable to load Letterboxd feed.");
}

if (!ignore) {
  setFilms(data.films.slice(0, maxFilms));
}
```

- The route fetches through `parser.parseURL`, pulls poster URLs from HTML with a regex, and returns RSS rating values as-is.

```ts
// app/api/letterboxd/route.ts:15-17
function getPosterUrl(description = "") {
  return description.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? "";
}
```

```ts
// app/api/letterboxd/route.ts:61-75
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
```

- `next.config.ts` allows optimized remote images from Letterboxd's image host.

```ts
// next.config.ts:4-11
images: {
  remotePatterns: [
    { protocol: "https", hostname: "avatars.githubusercontent.com" },
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "a.ltrbxd.com" },
    { protocol: "https", hostname: "avatar.vercel.sh" },
    { protocol: "https", hostname: "s3-figma-hubfile-images-production.figma.com" },
  ],
},
```

Repo conventions to preserve:

- Keep this as a route handler in `app/api/letterboxd/route.ts`.
- Keep error responses generic; do not expose upstream parser errors to clients.
- Keep the client component's loading/retry behavior intact.

## Commands you will need

| Purpose   | Command             | Expected on success |
| --------- | ------------------- | ------------------- |
| Install   | `npm install`       | exit 0              |
| Typecheck | `npm run typecheck` | exit 0              |
| Check     | `npm run check`     | exit 0              |
| Lint      | `npm run lint`      | exit 0              |
| Build     | `npm run build`     | exit 0              |

## Scope

**In scope**:

- `app/api/letterboxd/route.ts`
- `components/demos/letterboxd.tsx` only if the response type needs to be exported/shared or the client needs defensive validation

**Out of scope**:

- Changing the visual design of the Letterboxd widget.
- Adding authentication.
- Adding a database or persistent KV cache.
- Changing `next.config.ts` remote image hosts unless a new validated host is intentionally required.

## Git workflow

- Branch: `codex/003-cache-normalize-letterboxd-api`
- Commit message: `Cache Letterboxd feed response`
- Do not push unless the operator asks.

## Steps

### Step 1: Replace parser-owned fetching with Next-aware fetch

In `app/api/letterboxd/route.ts`, add a revalidation constant:

```ts
const LETTERBOXD_REVALIDATE_SECONDS = 60 * 60;
```

Replace:

```ts
const feed = await parser.parseURL(LETTERBOXD_RSS_URL);
```

with a route-local helper that uses `fetch`:

```ts
async function fetchLetterboxdFeed() {
  const response = await fetch(LETTERBOXD_RSS_URL, {
    next: { revalidate: LETTERBOXD_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Letterboxd feed request failed");
  }

  return parser.parseString(await response.text());
}
```

Then call `await fetchLetterboxdFeed()` from `GET`.

**Verify**: `npm run typecheck` -> exit 0.

### Step 2: Normalize rating and URLs at the API boundary

Add helpers in `app/api/letterboxd/route.ts`:

- `parseRating(value: unknown): number | undefined` returns a finite number or `undefined`.
- `normalizeLetterboxdUrl(value: unknown): string | undefined` accepts only `https://letterboxd.com/...`.
- `normalizePosterUrl(value: string): string | undefined` accepts only `https://a.ltrbxd.com/...`.

Update film mapping so:

- `rating` is `parseRating(item["letterboxd:memberRating"])`.
- `posterUrl` is normalized from `getPosterUrl(...)`.
- `url` is normalized with `normalizeLetterboxdUrl(item.link)`.
- Films without a normalized `posterUrl` are filtered out.

The client no longer renders `lists`, but the route still returns them. Either normalize list URLs and preview film URLs too, or remove `lists` from the response entirely if no current caller consumes it. If removing `lists`, update tests to assert the new response shape and keep the client
unchanged.

**Verify**: `npm run typecheck` -> exit 0.

### Step 3: Make cache behavior explicit in the response

When returning the successful JSON response, include a cache header aligned with the revalidation interval:

```ts
return NextResponse.json(
  { films, lists },
  {
    headers: {
      "Cache-Control": `public, s-maxage=${LETTERBOXD_REVALIDATE_SECONDS}, stale-while-revalidate=${LETTERBOXD_REVALIDATE_SECONDS}`,
    },
  }
);
```

If Step 2 removes unused lists from the route response, use `{ films }` instead of `{ films, lists }` in the same response shape.

Keep the error response generic:

```ts
return NextResponse.json({ error: "Unable to load Letterboxd feed." }, { status: 500 });
```

**Verify**: `npm run lint` -> exit 0.

### Step 4: Add a no-network smoke check note

Do not add a test runner just for this route. Instead, keep the parsing helpers small and inspectable, and document the intended manual smoke check in the PR description:

1. Start the app with `npm run dev`.
2. Open `/api/letterboxd`.
3. Confirm the JSON has a `films` array, film `rating` values are numbers when present, poster URLs start with `https://a.ltrbxd.com/`, and the response includes the intended cache header in production or preview.

If the implementation extracts helpers that become non-trivial, note that future work may add targeted tests after the repo intentionally adopts a test runner.

**Verify**: `npm run typecheck` -> exit 0.

### Step 5: Run full verification

Run:

```sh
npm run typecheck
npm run check
npm run lint
npm run format:check
npm run build
```

Expected: all exit 0.

## Test Plan

- No new tests by default.
- Manual route smoke check during local dev/preview as described in Step 4.
- Full verification commands from Step 5.

## Done Criteria

- [ ] `parser.parseURL(...)` is no longer used in `app/api/letterboxd/route.ts`.
- [ ] The RSS fetch uses `fetch(LETTERBOXD_RSS_URL, { next: { revalidate: LETTERBOXD_REVALIDATE_SECONDS } })`.
- [ ] Successful JSON responses include an explicit shared cache header.
- [ ] Film `rating` is numeric or omitted, matching `components/demos/letterboxd.tsx`.
- [ ] Poster URLs are restricted to `https://a.ltrbxd.com/...`.
- [ ] Letterboxd item/list URLs are restricted to `https://letterboxd.com/...`, or unused lists are removed from the response.
- [ ] PR description or handoff notes include the no-network/manual smoke check from Step 4.
- [ ] `npm run typecheck`, `npm run check`, `npm run lint`, `npm run format:check`, and `npm run build` exit 0.
- [ ] No files outside the in-scope list are modified.
- [ ] `plans/README.md` status row for Plan 003 is updated.

## STOP Conditions

Stop and report if:

- Next 16 rejects `fetch(..., { next: { revalidate } })` in this route handler.
- `rss-parser` cannot parse a string response in the installed version.
- Letterboxd's current poster host is not `a.ltrbxd.com` and changing `next.config.ts` would be required.
- The route cannot be manually smoke-tested without adding new infrastructure.
- The client widget needs a visual redesign to handle the normalized response.

## Maintenance Notes

If the Letterboxd widget becomes more prominent, consider moving the response shape into a shared type and adding a lightweight UI test for the error/retry state. Keep network tests out of the default suite unless they are explicitly quarantined.
