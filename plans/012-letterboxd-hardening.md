# Plan 012: Harden the Letterboxd pipeline end to end

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- app/api/letterboxd/route.ts components/demos/letterboxd.tsx`
> If either file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: security / bug
- **Planned at**: commit `9ed1acd`, 2026-07-02

## Why this matters

`/api/letterboxd` backs the homepage film widget by fetching and parsing a
third-party RSS feed. Three gaps: (1) the upstream fetch has no timeout and
the XML parse has no size bound, so a slow or oversized response can exhaust
the serverless budget on cache miss; (2) the client widget trusts the
response shape — a 200 without a `films` array throws, and the star renderer
neither clamps the rating to 0–5 nor computes half-stars robustly (float
`% 1` on e.g. 3.5 is fine, but any float noise like 3.4999999 renders "3½"
for the wrong reason, and out-of-range values repeat "★" arbitrarily);
(3) the API has no output contract, so future render changes silently
inherit unvalidated third-party data. This plan adds bounds, guards, and a
tiny validation layer — no behavior change for well-formed feeds.

## Current state

- `app/api/letterboxd/route.ts` — the only API route in the repo. Pure
  helpers at lines 13–75 (`getPosterUrl`, `parseRating`,
  `normalizeLetterboxdUrl`, `normalizePosterUrl`, `formatShortDate`).
  URL normalizers already allowlist `https:` + `letterboxd.com` /
  `a.ltrbxd.com` hosts — keep that pattern.
- `components/demos/letterboxd.tsx` — client widget on the homepage;
  fetches in a `useEffect` (lines 35–72), renders stars (line 199).

Key excerpts as of `9ed1acd`:

```ts
// app/api/letterboxd/route.ts:77-87 — no timeout, no size cap
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

```ts
// app/api/letterboxd/route.ts:17-20 — accepts any finite number
function parseRating(value: unknown): number | undefined {
  const rating = typeof value === "number" ? value : Number(value);
  return Number.isFinite(rating) ? rating : undefined;
}
```

```tsx
// components/demos/letterboxd.tsx:53-55 — trusts data.films
if (!ignore) {
  setFilms(data.films.slice(0, maxFilms));
}
```

```tsx
// components/demos/letterboxd.tsx:198-200 — unclamped stars, % 1 half-star
{film.rating ? (
  <span>{"★".repeat(Math.floor(film.rating)) + (film.rating % 1 ? "½" : "")}</span>
) : (
```

Conventions to honor:

- Letterboxd member ratings are half-star increments from 0.5 to 5.0.
- Do NOT add zod or any new dependency — hand-rolled narrowing matches this
  repo's style (see the existing normalizers in the same file).
- The route's caching (`next: { revalidate }`, `Cache-Control` header) was
  set by [plan 003](./003-cache-normalize-letterboxd-api.md) and must not change.
- The response shape `{ films: [...] }` and each film's fields
  (`title`, `year`, `rating`, `watchedDate`, `rewatch`, `posterUrl`, `url`)
  must not change — the widget's `Film` type
  (`components/demos/letterboxd.tsx:13-20`) is the consumer contract.

## Commands you will need

| Purpose    | Command         | Expected on success |
| ---------- | --------------- | ------------------- |
| Install    | `npm install`   | exit 0              |
| All checks | `npm run check` | exit 0              |
| Prod build | `npm run build` | exit 0              |
| Dev server | `npm run dev`   | serves on :3000     |

## Scope

**In scope** (the only files you should modify):

- `app/api/letterboxd/route.ts`
- `components/demos/letterboxd.tsx`
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- The caching config (revalidate seconds, Cache-Control header).
- Server-side rendering of the widget (moving the fetch out of the client
  effect) — that is [plan 017](./017-server-client-boundaries.md)'s concern; keep the fetch where it is here.
- The widget's loading/skeleton/retry choreography (lines 74–94).
- `next.config.ts` `images.remotePatterns`.

## Git workflow

- Branch: `cursor/012-letterboxd-hardening` from `master`.
- Two commits: route hardening, then client guards. Imperative messages,
  e.g. "Bound Letterboxd fetch and validate feed output".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Bound the upstream fetch

In `fetchLetterboxdFeed()`:

1. Add a timeout: `signal: AbortSignal.timeout(10_000)` in the fetch options
   (10s; the route 500s cleanly on abort via the existing catch).
2. Cap the body size before parsing: read `await response.text()` into a
   variable and throw if `text.length > 2_000_000` (2 MB of UTF-16 units;
   typical Letterboxd feeds are tens of KB). Message:
   `"Letterboxd feed too large"`.
3. Reject wrong content types: throw unless the `content-type` header
   includes `xml` (Letterboxd serves `application/xml`; be permissive about
   parameters/charset — a simple `.includes("xml")` is right).

**Verify**: `npm run check` → exit 0. With `npm run dev` running,
`curl -s localhost:3000/api/letterboxd | head -c 300` → JSON starting with
`{"films":[{...` (feed loads normally through the new bounds).

### Step 2: Constrain the mapped output

In `GET()`'s mapping (currently lines 92–103):

1. Clamp ratings in `parseRating`: return `undefined` unless the parsed
   number is within 0–5 inclusive; round to the nearest 0.5
   (`Math.round(rating * 2) / 2`) so downstream half-star math is exact.
2. Bound string lengths at the map site: truncate `title` to 200 chars and
   `year` (string field from the feed) to 10 chars via `.slice(0, n)`.
3. Guard the items list: `(feed.items ?? [])` before `.filter` (rss-parser
   types claim `items` is always present; the guard costs nothing and
   protects against parser edge cases).
4. Cap the number of films returned to 24 (`.slice(0, 24)` after the final
   `.filter`) — the widget shows at most a handful; there is no reason to
   ship an unbounded array.

**Verify**: `npm run check` → exit 0. `curl -s localhost:3000/api/letterboxd`
→ every `rating` in the JSON is a multiple of 0.5 between 0.5 and 5.

### Step 3: Guard the client widget

In `components/demos/letterboxd.tsx`:

1. Replace `setFilms(data.films.slice(0, maxFilms))` with an array guard:

```ts
const films = Array.isArray(data?.films) ? data.films : [];
if (!ignore) {
  setFilms(films.slice(0, maxFilms));
}
```

2. Harden the star renderer (line ~199). Target shape:

```tsx
<span>{formatStars(film.rating)}</span>
```

with a module-level helper in the same file:

```ts
function formatStars(rating: number): string {
  const clamped = Math.min(5, Math.max(0, rating));
  const halfSteps = Math.round(clamped * 2);
  return "★".repeat(Math.floor(halfSteps / 2)) + (halfSteps % 2 ? "½" : "");
}
```

Keep the existing `film.rating ? … : <span…>TBD</span>` conditional around it.

**Verify**: `npm run check` → exit 0. In the browser (`npm run dev`, `/`):
the film strip renders with correct star strings (e.g. a 3.5 rating shows
"★★★½").

### Step 4: Full verification

**Verify**: `npm run build` → exit 0. Load `/` from `npm run dev`; widget
renders; DevTools console shows no errors; the Retry path still works (block
the request via DevTools network conditions, reload widget → error card with
Retry button appears).

## Test plan

No unit test runner by policy. Gates: the curl checks in Steps 1–2 (live
feed through the new bounds), typecheck/lint, production build, and the
browser QA in Steps 3–4 including the simulated-failure retry path.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `rg -n "AbortSignal.timeout" app/api/letterboxd/route.ts` → 1 match
- [ ] `rg -n "data.films.slice" components/demos/letterboxd.tsx` → no matches (guarded form present instead)
- [ ] `rg -n '"★".repeat\(Math.floor\(film.rating\)' components/demos/letterboxd.tsx` → no matches
- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0
- [ ] `curl -s localhost:3000/api/letterboxd` (dev server) returns `{"films":[…]}` with all ratings in 0.5-step 0–5 range
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The live feed fails the new content-type or size gate (i.e. Letterboxd
  serves something unexpected) — loosen nothing; report what it actually
  serves.
- The excerpts don't match the live code (drift — e.g. [plan 017](./017-server-client-boundaries.md) already
  moved the fetch server-side).
- You find yourself wanting to change the JSON shape or the caching config.

## Maintenance notes

- If [plan 017](./017-server-client-boundaries.md) later moves the fetch into a server component, the route's
  bounds (Step 1–2) carry over unchanged; only Step 3's client guard becomes
  moot where the data arrives as props.
- If the feed ever legitimately exceeds the 2 MB cap, raise the cap — do not
  remove it.
- Reviewer: confirm no new dependency was added and the response field names
  are unchanged.
