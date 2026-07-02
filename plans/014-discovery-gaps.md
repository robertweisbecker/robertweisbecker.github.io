# Plan 014: Close sitemap and search discovery gaps for Art and Playground

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- app/sitemap.ts components/site-search.tsx app/playground/page.tsx app/playground/layout.tsx components/playground/playground-routes.ts components/playground/playground-route-nav.tsx lib/data/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. In particular: if
> `lib/data/playground.ts` already exists, USE it instead of creating a new
> registry — see Step 1. If
> `components/playground/playground-routes.ts` exists instead, treat it as
> partial local work and migrate/reuse its route array instead of duplicating
> the six route entries.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx / seo
- **Planned at**: commit `9ed1acd`, 2026-07-02
- **Reconciled at**: commit `9ed1acd` plus dirty worktree, 2026-07-02 — partial playground route navigation exists locally; sitemap/search work is still pending.

## Why this matters

The header nav promotes `/art` and `/playground`, but the sitemap lists only
`/`, `/about`, and `/posts` (plus post/project entries) — so crawlers never
see Art, Playground, or the six playground child routes. The site's command
palette has the same blind spot: it indexes the `/playground` index but none
of its children. The playground routes are currently hardcoded in the page
component, so the fix is to extract them into a registry consumed by the
page, the sitemap, and the search index.

## Current state

- `app/sitemap.ts` — sitemap; static routes at line 7:
  `const staticRoutes = ["/", "/about", "/posts"] as const;`
  followed by post entries and published-project entries.
- `app/playground/page.tsx` — hub page. At planning time it hardcoded the
  child routes at lines 5–12:

```tsx
const PLAYGROUND_ROUTES = [
  { href: "/playground/motion-systems", label: "Motion" },
  { href: "/playground/pixel-demos", label: "Pixels" },
  { href: "/playground/interaction-components", label: "Controls" },
  { href: "/playground/media-comparison", label: "Frames" },
  { href: "/playground/buttons", label: "Buttons" },
  { href: "/playground/visual-details", label: "Verisimilitude" },
] as const;
```

Reconcile note, 2026-07-02: the current dirty worktree has already moved this
array into `components/playground/playground-routes.ts` and renders it through
`components/playground/playground-route-nav.tsx`, including `app/playground/layout.tsx`.
That is partial work for this plan, not completion: the route data still needs
a `slug`, should become the sitemap/search source of truth, and must not be
duplicated in a second registry.

- `components/site-search.tsx` — command palette; `staticPages` at
  lines 117–123 lists Home, About, Posts, Art, Playground (index only).
  Search items have the shape
  `{ value, label, path, icon, group, category?, date? }` (see the
  `SearchItem` type near the top of the file and `staticPages` for the
  pattern).
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

- `lib/data/playground.ts` (create — or reuse if it already exists). If the
  dirty-worktree `components/playground/playground-routes.ts` exists, migrate
  that route array into `lib/data/playground.ts` or have it re-export the
  canonical data; do not keep two route arrays.
- `components/playground/playground-routes.ts` and
  `components/playground/playground-route-nav.tsx` (only to migrate/repoint the
  partial route-nav work if present)
- `app/playground/page.tsx` (consume the registry; no visual changes)
- `app/playground/layout.tsx` (only to preserve/repoint the existing
  `PlaygroundRouteNav` import if partial route-nav work is present)
- `app/sitemap.ts`
- `components/site-search.tsx` (extend `staticPages` / add a playground group)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- The six `app/playground/*/page.tsx` child pages.
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

If `components/playground/playground-routes.ts` exists, start there: preserve
the six route labels/hrefs and move the canonical data to
`lib/data/playground.ts` (preferred), then update `PlaygroundRouteNav` to import
from `@/lib/data/playground`. If `lib/data/playground.ts` already exists, reuse
it. If neither file exists, create
`lib/data/playground.ts`:

```ts
export type PlaygroundRoute = {
  slug: string;
  href: string;
  label: string;
};

export const playgroundRoutes: PlaygroundRoute[] = [
  { slug: "motion-systems", href: "/playground/motion-systems", label: "Motion" },
  { slug: "pixel-demos", href: "/playground/pixel-demos", label: "Pixels" },
  { slug: "interaction-components", href: "/playground/interaction-components", label: "Controls" },
  { slug: "media-comparison", href: "/playground/media-comparison", label: "Frames" },
  { slug: "buttons", href: "/playground/buttons", label: "Buttons" },
  { slug: "visual-details", href: "/playground/visual-details", label: "Verisimilitude" },
];
```

If it already exists, add any missing fields non-destructively and use its
exported shape.

Update `app/playground/page.tsx` and any `PlaygroundRouteNav` module to consume
the canonical `playgroundRoutes` export. Delete any local `PLAYGROUND_ROUTES`
constant or duplicate array; rendering should stay visually identical.

**Verify**: `npm run typecheck` → exit 0.
`rg -n "PLAYGROUND_ROUTES|/playground/motion-systems" app/ components/ lib/data/playground.ts` → matches only the canonical `lib/data/playground.ts` route entries (or no `PLAYGROUND_ROUTES` matches if the export was renamed).

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
`curl -s localhost:3000/sitemap.xml | rg -c "playground"` → `7` (index + 6
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
- [ ] `rg -n "PLAYGROUND_ROUTES|/playground/motion-systems" app/ components/ lib/data/playground.ts` matches only the canonical `lib/data/playground.ts` route entries (or no `PLAYGROUND_ROUTES` matches if the export was renamed)
- [ ] `curl -s localhost:3000/sitemap.xml | rg -c "playground"` → 7
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
