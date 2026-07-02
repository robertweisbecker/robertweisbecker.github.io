# Plan 017: Move the homepage and posts routes onto server-rendered boundaries

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- app/page.tsx app/posts/ components/demos/letterboxd.tsx components/index-list.tsx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. [Plan 006](./006-view-transitions.md) (view transitions) also
> touches `app/page.tsx` and `app/posts/layout.tsx` — if it landed first,
> reconcile carefully and preserve its `ViewTransition`/`TitleMorph`
> wrappers.

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: MED
- **Depends on**: [plans/010-dead-code-sweep.md](./010-dead-code-sweep.md) (moves homepage SVG icons and
  the `AxisCursor` experiment out of `app/page.tsx` first); [plans/009-ci-deploy-gate.md](./009-ci-deploy-gate.md) recommended first as a
  guard rail. Coordinate with [plans/006-view-transitions.md](./006-view-transitions.md) (shared files).
- **Category**: perf
- **Planned at**: commit `9ed1acd`, 2026-07-02

## Why this matters

The site's most-visited routes opt entirely out of server rendering:
`app/page.tsx` (732 lines) is one `"use client"` component, `app/posts/layout.tsx`
is a client layout wrapping every post, and five of the six post pages are
page-level `"use client"`. The static content — bio prose, CV lists, post
bodies, code samples — is shipped as JS and hydrated instead of arriving as
server HTML. Moving the boundaries down to the actual interactive islands
reduces first-load JS on `/` and `/posts/**` and makes the RSC payloads
smaller. Behavior must not change; this is a boundary refactor.

## Current state

**Homepage** — `app/page.tsx:1` is `"use client"`. The ONLY local state in
the entire page is the portrait dino toggle:

```tsx
// app/page.tsx:58-59
export default function Home() {
  const [isDinoVisible, setIsDinoVisible] = React.useState(false);
```

used exclusively inside the portrait block (lines 68–92: `Float` >
`PixelPortrait` + conditional `PixelReveal`/`PixelDino` + toggle `Button` at
lines 83–90). Everything else on the page is static JSX composed of
components that are themselves client components where needed (`Popover`,
`PreviewCard`, `CopyButton`, `InfoTip`, `IndexList`, `ArtCards`,
`Letterboxd`) — rendering client components from a server page is fine as
long as props are serializable. The `postItems` mapping (lines 33–56)
produces JSX icons/badges — serializable RSC output, fine to keep in the
server page.

**Posts layout** — `app/posts/layout.tsx:1` is `"use client"`; it calls
`usePathname()` (line 11) for two things: branch on `/posts` index
(lines 12–21) vs post shell (lines 25–53), and look up the post's
title/date (line 23). The shell renders `PostTableOfContents` and
`PostPagination` (already client components) plus static grid markup.

**Post pages** — page-level `"use client"` at line 1 of:
`app/posts/smooth-gradients/page.tsx`, `app/posts/native-popovers/page.tsx`,
`app/posts/tab-indicator/page.tsx` (632 lines, heavily interactive),
`app/posts/clip-path-curve/page.tsx`, `app/posts/theming/page.tsx`.
`app/posts/pixel-icons/page.tsx` is already a server page — use it as the
exemplar for what a post page should look like.

**Letterboxd** — `components/demos/letterboxd.tsx` fetches `/api/letterboxd`
client-side in an effect. This plan does NOT change it (see Out of scope).

Conventions to honor:

- `IndexList` (`components/index-list.tsx`) has a `defaultItems` fallback
  built from the projects registry; the homepage uses `<IndexList />` bare
  (line 162) and with `items={postItems}` (line 169). Both call styles keep
  working from a server page.
- Repo styling/stagger patterns (`animate-stagger-enter`, `[--stagger:n]`)
  are plain CSS classes — unaffected by the boundary move.
- AGENTS.md: no backwards-compatible shims; move code, don't alias it.

## Commands you will need

| Purpose     | Command                                  | Expected on success                            |
| ----------- | ---------------------------------------- | ---------------------------------------------- |
| Install     | `npm install`                            | exit 0                                         |
| All checks  | `npm run check`                          | exit 0                                         |
| Prod build  | `npm run build`                          | exit 0; note per-route first-load JS           |
| Bundle diff | save `npm run build` output before/after | first-load JS for `/` and `/posts/*` decreases |
| Dev server  | `npm run dev`                            | serves on :3000                                |

## Suggested executor toolkit

- Read the `react-best-practices` / `next-best-practices` skills if
  available in your environment — RSC boundary placement is exactly their
  domain.
- Record the "First Load JS" table from `npm run build` BEFORE starting, for
  the done-criteria comparison.

## Scope

**In scope** (the only files you should modify or create):

- `app/page.tsx`
- `components/home-portrait.tsx` (create — the dino-toggle client island)
- `app/posts/layout.tsx`
- `components/post-header.tsx` (create — pathname-dependent client header,
  or colocate under `app/posts/`)
- `app/posts/{smooth-gradients,native-popovers,clip-path-curve,theming}/page.tsx`
- `app/posts/tab-indicator/page.tsx` (only if the decision rule in Step 4
  says convert; otherwise untouched)
- `components/demos/` (create new demo-island files extracted from post
  pages as needed)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- `components/demos/letterboxd.tsx` and its fetch strategy — the widget's
  skeleton/reveal choreography is deliberate; converting `/` to ISR to
  server-fetch films is a product decision deferred out of this plan.
- `components/icons.tsx` and `components/animation/axis-cursor.tsx` —
  [plan 010](./010-dead-code-sweep.md) owns moving homepage SVGs and
  promoting `AxisCursor`; preserve those imports if it landed first.
- `components/index-list.tsx` — works from server pages as-is; its
  viewTransitionName handling belongs to [plan 006](./006-view-transitions.md).
- `app/posts/pixel-icons/page.tsx` — already a server page (exemplar).
- `app/[slug]/**` (projects) — already server-rendered.
- `app/layout.tsx`, header/footer.
- `mdx-components.tsx` — [plan 018](./018-mdx-registry-splitting.md)'s territory.

## Git workflow

- Branch: `cursor/017-server-client-boundaries` from `master`.
- Commit per phase (homepage; posts layout; each post page or batch),
  imperative messages, e.g. "Convert homepage to a server component".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Record the baseline

Run `npm run build` and save the "First Load JS" figures for `/`, `/posts`,
and each `/posts/*` route (paste them into your working notes and final
report).

**Verify**: build exits 0; figures recorded.

### Step 2: Homepage — extract the portrait island

1. Create `components/home-portrait.tsx` (`"use client"`): move the
   `isDinoVisible` state and the portrait block JSX (`app/page.tsx:68-92` —
   the `div.rounded-md.bg-muted` wrapper containing `Float`,
   `PixelPortrait`, conditional `PixelReveal`+`PixelDino`, and the toggle
   `Button`) into an exported `HomePortrait` component. Move the imports it
   needs (`Float`, `PixelPortrait`, `PixelDino`, `PixelReveal`, `Button`,
   `PixelShuffleIcon`, `React`).
2. In `app/page.tsx`: delete the `"use client"` directive, the
   `isDinoVisible` state, and the moved JSX/imports; render
   `<HomePortrait />` in its place. Keep the
   `/* eslint-disable @next/next/no-img-element */` comment only if the
   `<img>` for resource thumbnails (line ~220) is still present.
3. The `postItems` module-level mapping stays in the page file.

**Verify**: `npm run check` → exit 0. `npm run dev` → homepage renders
identically; portrait hover + dino toggle work; popovers/preview cards open;
Letterboxd widget loads; no hydration warnings in the console.

### Step 3: Posts layout — server shell with a client header

1. Create the client header component (e.g. `app/posts/post-header.tsx`,
   `"use client"`): it calls `usePathname()`, looks up
   `posts.find((p) => p.path === pathname)`, and renders the current
   `PostTopBar` (back button + date, `app/posts/layout.tsx:56-69`) and the
   `<h1>{post?.title}</h1>`. Also have it render the
   `PostTableOfContents` title prop path if simplest — OR pass nothing and
   let the TOC keep deriving its own title (`PostTableOfContents` already
   receives `title={post?.title}`; keep that inside the client header's
   render tree or make the aside part of the client component — choose the
   smallest client subtree that preserves the DOM structure).
2. Rewrite `app/posts/layout.tsx` as a server component: no
   `"use client"`, no `usePathname`. Problem: the current layout branches on
   `pathname === "/posts"` to render a different shell for the index. A
   server layout cannot branch on pathname. Solution — route groups:
   - Create `app/posts/(index)/page.tsx` by MOVING the current
     `app/posts/page.tsx` there, and `app/posts/(index)/layout.tsx`
     containing the index branch markup (the `div.mx-auto.flex.flex-col…`
     wrapper + `PostPagination`, currently lines 14–21).
   - Create `app/posts/(detail)/layout.tsx` with the post-shell markup
     (grid, aside + `PostTableOfContents`, article wrapper, `PostPagination`
     — currently lines 25–53), rendering the client `PostHeader` where the
     top bar + `<h1>` are today. MOVE the six post directories
     (`smooth-gradients`, `native-popovers`, `tab-indicator`,
     `clip-path-curve`, `theming`, `pixel-icons`) into `(detail)/`.
   - Delete the old `app/posts/layout.tsx`.
     Route groups don't change URLs: `/posts` and `/posts/<slug>` stay
     identical.

**Verify**: `npm run check` → exit 0. `npm run build` → exit 0 with the SAME
route list as the baseline (`/posts` + six post routes — group segments must
not appear in URLs). In the browser: `/posts` renders the index with
pagination; a post page renders back-button/date/title/TOC exactly as
before; TOC active-heading tracking still works while scrolling.

### Step 4: Post pages — push `"use client"` into demo islands

For each of `smooth-gradients`, `native-popovers`, `clip-path-curve`,
`theming` (in that order — roughly increasing difficulty):

1. Inventory why the page is client: `rg -n "useState|useEffect|useRef|onClick|onChange|onPointer|usePathname" app/posts/<slug>/page.tsx`.
2. If all hook/handler usage lives in identifiable demo blocks: extract each
   block into a `"use client"` component under `components/demos/`
   (follow the existing naming there, e.g. `clip-path-editor/` pattern —
   `components/demos/<slug>-demos.tsx` or per-demo files), remove the
   page-level directive, and render the islands from the now-server page.
   Static prose, headings, and `CodeBlock` usage stay in the page.
3. If a page is interactive top-to-bottom with no meaningful static shell,
   leave it client and note it in the report (decision rule: convert only
   when the extraction is mechanical; do not rewrite demos to force it).

`tab-indicator` (632 lines, deeply interactive): apply the same decision
rule — expected outcome is "leave client, note it", but check first; if it
has substantial static prose sections, extract just those boundaries.

**Verify** (after each page): `npm run check` → exit 0; the page renders and
every demo on it behaves as before in the browser (`npm run dev`). For
`clip-path-curve` specifically: drag handles, presets, copy-CSS output.
For `theming`: the scoped theme demo controls.

### Step 5: Compare bundles and finish

Run `npm run build`; compare first-load JS for `/`, `/posts`, and each post
route against Step 1's baseline. Every converted route must be equal or
smaller; `/` and converted post routes should show a clear reduction.

**Verify**: `npm run build` → exit 0; table recorded in the final report;
no route regressed.

## Test plan

No unit test runner by policy. The regression surface is visual/behavioral:

1. Homepage: dino toggle, "Bob" popover, "allegedly" preview card, resource
   card hovers, Letterboxd load + retry, stagger-enter animation on load.
2. `/posts`: list renders, pagination present.
3. Each post: back button, date, title, TOC (desktop), pagination,
   every interactive demo on the page.
4. No hydration mismatch warnings in the dev console on any touched route.
5. Build route list unchanged; no `(index)`/`(detail)` segments in URLs.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `head -1 app/page.tsx` is not `"use client"`
- [ ] `rg -l '^"use client"' app/posts/*/page.tsx app/posts/*/*/page.tsx 2>/dev/null` lists at most `tab-indicator` (or fewer, with report noting any page left client and why)
- [ ] `app/posts/layout.tsx` no longer exists; route-group layouts exist and `npm run build` route list matches baseline URLs
- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0; first-load JS for `/` strictly lower than baseline
- [ ] Browser QA list above passes
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- [Plan 006](./006-view-transitions.md) landed first and its `ViewTransition` wrappers in
  `app/page.tsx`/`app/posts/layout.tsx` conflict with the route-group
  restructure — report the collision; do not guess at merged semantics.
- A hydration mismatch appears after a conversion and one focused fix
  attempt doesn't clear it.
- The route-group move changes any URL or drops a route from the build
  output.
- Extracting a demo island requires changing the demo's behavior or props
  API (extraction should be mechanical).
- First-load JS for any converted route INCREASES (boundary placed wrong).

## Maintenance notes

- New homepage sections should default to server JSX; add client islands
  only for state/handlers (follow `HomePortrait`).
- [Plan 018](./018-mdx-registry-splitting.md) (MDX registry splitting) compounds this work — land both before
  re-measuring "site performance" conclusions.
- [Plan 006](./006-view-transitions.md)'s title-morph steps reference `app/posts/layout.tsx` line
  numbers; after this plan, its executor must target the `(detail)` group
  layout instead — leave a note in `plans/README.md` reconcile notes.
- Reviewer: scrutinize the client-component prop surfaces (everything
  crossing the boundary must be serializable — no function props from
  server to client) and the route-group layout nesting.
