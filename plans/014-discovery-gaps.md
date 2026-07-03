# Plan 014: Close sitemap and search discovery gaps for Art and Playground

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 61bf9081..HEAD -- app/sitemap.ts components/site-search.tsx app/playground/page.tsx app/playground/layout.tsx components/playground/playground-route-nav.tsx components/playground/playground-route-icons.tsx lib/data/playground.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. This plan is DONE; if it is ever
> reopened, use `lib/data/playground.ts` as the only route source.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx / seo
- **Planned at**: commit `9ed1acd`, 2026-07-02
- **Earlier reconcile**: commit `9ed1acd` plus dirty worktree, 2026-07-02 —
  partial playground route navigation existed locally before sitemap/search
  work landed.
- **Reconciled again**: commit `9088a10`, 2026-07-02 — the partial
  playground route navigation is now committed and has five public child
  routes: `/playground/motion`, `/playground/svg`, `/playground/ui`,
  `/playground/buttons`, and `/playground/verisimilitude`.
- **Reconciled after Plan 013**: commit `c883eec`, 2026-07-02 — site search
  now uses a controlled filter `ToggleGroup`; preserve that code while adding
  playground search entries.
- **Reconciled at**: commit `61bf9081`, 2026-07-02 — DONE. The canonical
  playground registry lives at `lib/data/playground.ts` and feeds route nav,
  sitemap entries, site search, the Playground search section/filter, and the
  route icon helper.

## Why this matters

The header nav promotes `/art` and `/playground`, but the sitemap lists only
`/`, `/about`, and `/posts` (plus post/project entries) — so crawlers never
see Art, Playground, or the five playground child routes. The site's command
palette had the same blind spot: it indexed the `/playground` index but none
of its children. The completed fix promotes playground route data into a
canonical registry consumed by the page/nav, the sitemap, and the search
index.

## Current state

Current state as of `61bf9081`: this plan is done.

- `lib/data/playground.ts` exports the canonical `playgroundRoutes` registry:
  `/playground/motion`, `/playground/svg`, `/playground/ui`,
  `/playground/buttons`, and `/playground/verisimilitude`.
- `components/playground/playground-route-nav.tsx` consumes
  `playgroundRoutes`.
- `components/playground/playground-route-icons.tsx` maps the requested Tabler
  icons for the playground pieces.
- `app/sitemap.ts` and `components/site-search.tsx` consume the canonical
  route data instead of a duplicate local route list.
- `/private/**` remains dev-only and should not enter sitemap coverage.

- `app/playground/page.tsx` consumes `PlaygroundRouteNav` and no longer has a
  local route array.
- `components/playground/playground-route-nav.tsx` imports the canonical
  `playgroundRoutes` array and renders route buttons, including through
  `app/playground/layout.tsx`.
- `components/site-search.tsx` includes a Playground filter/section rather
  than pushing every playground route into the top command list section.
- `lib/data/` — existing registries (`posts.ts`, `projects.ts`,
  `resources.ts`) are plain typed const arrays; match that style.
- Note: [`plans/021-playground-index-view-transitions.md`](./021-playground-index-view-transitions.md) depends on this
  registry for playground View Transition work. This plan owns the route data;
  [Plan 021](./021-playground-index-view-transitions.md) consumes it.

## Commands you will need

| Purpose    | Command         | Expected on success |
| ---------- | --------------- | ------------------- |
| Install    | `npm install`   | exit 0              |
| All checks | `npm run check` | exit 0              |
| Prod build | `npm run build` | exit 0              |
| Dev server | `npm run dev`   | serves on :3000     |

## Scope

**In scope** (the only files you should modify or create):

- `lib/data/playground.ts` (canonical route data)
- `components/playground/playground-route-nav.tsx` (consume canonical data)
- `app/playground/page.tsx` (consume the registry; no visual changes)
- `app/playground/layout.tsx` (only to preserve/repoint the existing
  `PlaygroundRouteNav` import if partial route-nav work is present)
- `app/sitemap.ts`
- `components/site-search.tsx` (extend `staticPages` / add a playground group)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- The five public `app/playground/*/page.tsx` child pages.
- `/private/**` routes — dev-only, must NOT enter sitemap or the production
  search index (the `isDev` gating in site-search already handles this).
- `app/about` — whether `/about` stays canonical is a separate, unselected
  finding; leave the sitemap's `/about` entry alone.
- Nav (`components/header/nav-links.tsx`) — already correct.
- Any card-grid/visual redesign of the playground hub ([Plan 021](./021-playground-index-view-transitions.md) territory).

## Git workflow

- Branch: `cursor/014-discovery-gaps` from `master`.
- One commit, e.g. "Index playground and art in sitemap and search".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Extract the playground registry

Use the canonical `lib/data/playground.ts` route registry. If it is missing in
a future drifted checkout, recreate it as:

```ts
export type PlaygroundRoute = {
  slug: string;
  href: string;
  label: string;
};

export const playgroundRoutes: PlaygroundRoute[] = [
  { slug: "motion", href: "/playground/motion", label: "Motion" },
  { slug: "svg", href: "/playground/svg", label: "SVG" },
  { slug: "ui", href: "/playground/ui", label: "UI" },
  { slug: "buttons", href: "/playground/buttons", label: "Buttons" },
  { slug: "verisimilitude", href: "/playground/verisimilitude", label: "Verisimilitude" },
];
```

If it already exists, add any missing fields non-destructively and use its
exported shape. Update `app/playground/page.tsx` and `PlaygroundRouteNav` to
consume the canonical `playgroundRoutes` export. Delete any local
`PLAYGROUND_ROUTES` constant or duplicate array; rendering should stay visually
identical.

**Verify**: `npm run typecheck` → exit 0.
`rg -n "PLAYGROUND_ROUTES" app components lib` → no matches.
`rg -n 'slug: "(motion|svg|ui|buttons|verisimilitude)"' lib/data/playground.ts`
→ 5 matches.
`rg -n 'label: "(Motion|SVG|UI|Buttons|Verisimilitude)"' app components lib --glob '!lib/data/playground.ts'`
→ no matches from duplicate route arrays. Legitimate nav/link `href` strings
outside the registry are acceptable.

### Step 2: Extend the sitemap

In `app/sitemap.ts`:

1. Add `"/art"` and `"/playground"` to `staticRoutes`.
2. Import `playgroundRoutes` from `@/lib/data/playground` and append their
   entries alongside the existing post/project entries:

```ts
const playgroundEntries: MetadataRoute.Sitemap = playgroundRoutes.map((route) => ({
  url: `${SITE_URL}${route.href}`,
  lastModified: new Date(),
}));
```

Include `...playgroundEntries` in the returned array.

**Verify**: `npm run build` → exit 0, then
`rg -c "playground" .next/server/app/sitemap.xml.body 2>/dev/null || true` —
if that build artifact path doesn't exist, verify via dev server instead:
`curl -s localhost:3000/sitemap.xml | rg -c "playground"` → `6` (index + 5
children), and `curl -s localhost:3000/sitemap.xml | rg -c "/art"` → `1`.

### Step 3: Index playground children in search

In `components/site-search.tsx`, import `playgroundRoutes` and generate
entries in the `staticPages` group (or a dedicated "Playground" group —
match the existing `SearchItem`/group shape either way):

```ts
...playgroundRoutes.map((route) => ({
  value: `playground-${route.slug}`,
  label: `Playground: ${route.label}`,
  path: route.href,
  icon: itemIcon(IconMonkeybar),
  group: "Pages",
})),
```

(`IconMonkeybar` is already imported for the Playground index entry.)

**Verify**: `npm run check` → exit 0. In the browser (`npm run dev`, `⌘/`):
typing "buttons" surfaces "Playground: Buttons"; selecting it navigates to
`/playground/buttons`.

### Step 4: Confirm no private leakage

**Verify**: `curl -s localhost:3000/sitemap.xml | rg -c "private"` → `0`
(zero matches; rg exits 1 — that is the pass condition). Production search
gating is unchanged (`isDev` filters, untouched).

## Test plan

No unit test runner by policy. Gates: the sitemap curl counts (Step 2), the
search interaction (Step 3), the private-leakage check (Step 4), plus
`npm run check` and `npm run build`.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `lib/data/playground.ts` exists and is the single source of playground routes
- [ ] `rg -n "PLAYGROUND_ROUTES" app components lib` returns no matches
- [ ] `rg -n 'slug: "(motion|svg|ui|buttons|verisimilitude)"' lib/data/playground.ts` returns 5 matches
- [ ] `rg -n 'label: "(Motion|SVG|UI|Buttons|Verisimilitude)"' app components lib --glob '!lib/data/playground.ts'` returns no matches from duplicate route arrays
- [ ] `curl -s localhost:3000/sitemap.xml | rg -c "playground"` → 6
- [ ] `curl -s localhost:3000/sitemap.xml | rg -c "private"` → 0 matches
- [ ] `npm run check` exits 0 and `npm run build` exits 0
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated (note registry reuse for [Plan 021](./021-playground-index-view-transitions.md))

## STOP conditions

Stop and report back (do not improvise) if:

- `lib/data/playground.ts` exists with a conflicting shape you cannot extend
  non-destructively.
- The sitemap route file structure has changed (e.g. moved to
  `generateSitemaps`) — drift.
- Adding entries to search requires touching the `SearchItem` type in a way
  that affects other groups.

## Maintenance notes

- [Plan 021](./021-playground-index-view-transitions.md) (playground index View Transitions) must consume this registry
  instead of re-hardcoding routes; leave a note in your completion report.
- New playground child routes now require a registry entry to be
  discoverable — consider that the definition of done for future additions
  (worth an AGENTS.md line when [Plan 021](./021-playground-index-view-transitions.md) updates it).
- Reviewer: check the sitemap for accidental `/private/**` entries and that
  the playground page renders identically (registry swap is invisible).
