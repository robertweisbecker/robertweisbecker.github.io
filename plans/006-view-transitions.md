# Plan 006: Implement core React View Transitions

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- next.config.ts app/layout.tsx app/page.tsx "app/[slug]/layout.tsx" app/posts components/index-list.tsx components/header.tsx components/footer.tsx styles/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. Playground-specific work is now
> intentionally out of scope; see [`plans/021-playground-index-view-transitions.md`](./021-playground-index-view-transitions.md).

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: none (plans [001](./001-add-verification-baseline.md)-[004](./004-refresh-repo-guidance.md) are DONE)
- **Category**: direction (feature / motion design)
- **Planned at**: commit `9ed1acd`, 2026-07-02
- **Reconciled at**: commit `9ed1acd` plus dirty worktree, 2026-07-02 — playground index/card-grid work was split into [Plan 021](./021-playground-index-view-transitions.md) because the index direction is undecided.

## Why this matters

Route changes currently swap content with no visual connection: project and
post list titles match their destination page titles, but nothing communicates
continuity. The repo already enables `experimental.viewTransition` and has
two half-wired attempts that silently do nothing: an invalid list-side
`viewTransitionName` derived from display text, and a destination-side project
title named `"title"` that never matches the list side. This plan lands the
site-wide foundation only: valid title morphs for project/post navigation and
an evergreen page fade with the site chrome anchored. Playground index
composition, card grids, and directional playground slides are deliberately
deferred to [Plan 021](./021-playground-index-view-transitions.md).

## Current state

Relevant files and their roles:

- `next.config.ts` — `experimental.viewTransition: true` is already set.
- `components/index-list.tsx` — shared list for homepage projects and posts;
  currently sets a broken inline `viewTransitionName` from `item.title`.
- `app/[slug]/layout.tsx` — project detail shell; hardcodes
  `viewTransitionName: "title"` on the project `<h1>`, which never matches
  the homepage list side.
- `app/page.tsx` — homepage; maps `posts` into `postItems` for the shared
  `IndexList`.
- `app/posts/page.tsx` — `/posts` index; renders each post `ItemTitle`
  without a transition name.
- `app/posts/layout.tsx` — client layout; renders the post detail `<h1>`
  resolved from `usePathname()`.
- `app/layout.tsx` — root layout; route slot is
  `<div className="root isolate">{children}</div>` inside `<main id="main">`.
- `components/header.tsx`, `components/footer.tsx` — site chrome roots to
  freeze during transitions.
- `styles/globals.css` — CSS entry; imports `./animations.css` and contains a
  stale commented `@view-transition` TODO block.
- `styles/animations.css` — defines `--animate-stagger-enter` and a reduced
  motion rule that does not reach `::view-transition-*` pseudo-elements.
- `components/scroll-reset.tsx` — already resets scroll on pathname change for
  the View Transition scroll-preservation quirk. Do not change it.

Key excerpts to confirm against the live code:

```tsx
// components/index-list.tsx — broken when item.title contains spaces
<ItemTitle style={{ viewTransitionName: item.viewTransitionName ?? item.title }}>{item.title} </ItemTitle>
```

```tsx
// app/[slug]/layout.tsx — destination name never matches the homepage list
<h1 style={{ viewTransitionName: "title" }} className="scroll-mt-16 text-h1 text-balance">
  {fm.title}
</h1>
```

```tsx
// app/layout.tsx — route slot to wrap
<div className="root isolate">{children}</div>
```

```css
/* styles/globals.css — stale block to delete */
/* TODO: figure out why this errors
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
} */
```

Repo conventions to honor:

- New client-only UI starts with `"use client"`; `components/view-transitions.tsx`
  must **not** be client-only because `TitleMorph` is imported from server and
  client components.
- Naming convention introduced by this plan:
  `view-transition-name` = `<kind>-title-<slug>`, currently only
  `project-title-<slug>` and `post-title-<slug>`. Slugs come from route paths
  or registry ids, never display strings. Names must be unique per rendered
  page; the homepage renders both project and post lists, so the distinct
  prefixes are load-bearing.
- Reference animation values: exit 150ms, enter 210ms delayed by exit, move
  400ms; `fade` keyframe = opacity + 3px blur; `.morph` share class = 400ms
  group duration + `via-blur` keyframe at the 30% midpoint; frozen chrome =
  `animation: none; z-index: 100` on the group, `display: none` on old,
  `animation: none` on new.
- Type shim precedent: `types/static-asset-imports.d.ts` ([plan 001](./001-add-verification-baseline.md)). Follow
  that pattern only if React or Next types lag runtime support for
  `ViewTransition` / transition props.
- AGENTS.md Known Bugs: Turbopack + Tailwind v4 stale CSS can persist after
  CSS syntax errors. If View Transition CSS appears stuck in dev, `touch
  styles/globals.css` or run `npm run dev:fresh`; do not remove valid CSS as a
  workaround.

## Commands you will need

| Purpose      | Command                | Expected on success                |
| ------------ | ---------------------- | ---------------------------------- |
| Install      | `npm install`          | exit 0                             |
| Typecheck    | `npm run typecheck`    | exit 0, no errors                  |
| Lint         | `npm run lint`         | exit 0                             |
| Format check | `npm run format:check` | exit 0                             |
| All checks   | `npm run check`        | exit 0                             |
| Prod build   | `npm run build`        | exit 0, static generation completes |
| Dev server   | `npm run dev`          | serves on http://localhost:3000    |

There is no test runner in this repo by policy. Verification is typecheck,
lint, format, build, and manual browser QA.

## Suggested executor toolkit

- Read before starting if available: the Next.js View Transitions guide and
  Vercel's `react-view-transitions-demo` source for CSS timing references.
- Browser QA requires Chrome or another browser with View Transitions API
  support. Firefox/no-support browsers should simply navigate without
  animation.

## Scope

**In scope** (the only files you should modify or create):

- `styles/view-transitions.css` (create)
- `styles/globals.css` (add one `@import`, delete stale commented block)
- `components/view-transitions.tsx` (create)
- `types/react-view-transitions.d.ts` (create only if typecheck requires it)
- `app/layout.tsx`
- `components/header.tsx`
- `components/footer.tsx`
- `components/index-list.tsx`
- `app/page.tsx` (post items mapping only)
- `app/[slug]/layout.tsx`
- `app/posts/page.tsx`
- `app/posts/layout.tsx`
- `AGENTS.md`
- `plans/README.md`

**Out of scope** (do NOT touch, even though they look related):

- `app/playground/**`, `components/playground/**`, and
  `lib/data/playground.ts` — [Plan 021](./021-playground-index-view-transitions.md) owns the playground index/directional
  work after [Plan 014](./014-discovery-gaps.md) settles the registry.
- `components/back-button.tsx` and `components/ui/link-button.tsx` — only
  needed for [Plan 021](./021-playground-index-view-transitions.md) directional playground links.
- `components/scroll-reset.tsx` — already correct.
- `next.config.ts` — the flag is already enabled.
- `components/header/work-menu.tsx`, `components/site-search.tsx` — navigations
  from them get the evergreen fade only.
- `styles/animations.css` — reuse existing utilities as-is.
- Post/project MDX content bodies.

## Git workflow

- Branch: `cursor/006-core-view-transitions` from `master`.
- Commit per logical phase: CSS/helpers, shell/chrome, title morphs, docs.
  Use plain imperative messages matching the repo history, e.g. "Add
  view-transition CSS and helpers".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Create View Transition CSS and wire it into the graph

Create `styles/view-transitions.css` containing, in this order:

1. `:root` tokens: `--vt-exit: 150ms; --vt-enter: 210ms; --vt-move: 400ms;`
2. Keyframes: `vt-fade` (opacity + 3px blur to visible), `vt-rise`
   (small 10px upward settle), and `via-blur` (`30% { filter: blur(3px) }`).
3. `.morph` shared-element class:
   `::view-transition-group(.morph) { animation-duration: var(--vt-move); }`
   and `::view-transition-image-pair(.morph) { animation-name: via-blur; }`.
4. `.vt-page` update class: old = `var(--vt-exit) ease-in vt-fade reverse`;
   new = delayed `vt-fade` plus `vt-rise`.
5. Frozen chrome groups for `site-header` and `site-footer`.
6. Reduced motion rule targeting `::view-transition-old(*)`,
   `::view-transition-new(*)`, and `::view-transition-group(*)`.

In `styles/globals.css`, import it next to `animations.css`:

```css
@import "./view-transitions.css";
```

Import it without a cascade layer. Delete the stale commented `@view-transition`
block.

**Verify**: `npm run build` -> exit 0.
`rg -n "view-transition" styles/globals.css` -> only the new `@import` line.

### Step 2: Create shared helpers and confirm typings

Create `components/view-transitions.tsx` with no `"use client"` directive:

- `import { ViewTransition } from "react";`
- `export function pageTitleTransitionName(kind: "project" | "post", slug: string): string`
  returns `` `${kind}-title-${sanitizedSlug}` ``.
- Sanitization: lowercase, replace any char outside `[a-z0-9-]` with `-`,
  collapse repeated `-`, trim leading/trailing `-`, and prefix with `x-` if
  the result starts with a digit or is empty.
- `export function TitleMorph({ name, children }: { name: string; children: React.ReactNode })`
  returns `<ViewTransition name={name} share="morph" default="none">{children}</ViewTransition>`.

Run typecheck. If it fails only because React/Next types lag runtime support,
add `types/react-view-transitions.d.ts` with minimal augmentation. Do not add
`@ts-ignore` at call sites.

**Verify**: `npm run typecheck` -> exit 0.

### Step 3: Add the evergreen page fade and freeze chrome

1. `app/layout.tsx`: import `ViewTransition` from `react` and wrap the route
   slot:

```tsx
<ViewTransition update="vt-page" default="none">
  <div className="root isolate">{children}</div>
</ViewTransition>
```

2. `components/header.tsx`: add `style={{ viewTransitionName: "site-header" }}`
   to the root `<header>`.
3. `components/footer.tsx`: add `style={{ viewTransitionName: "site-footer" }}`
   to the root `<footer>`.

**Verify**: `npm run check` -> exit 0. With `npm run dev`, navigate `/` to
`/posts` in Chrome: route content fades/rises; header/footer do not flash or
move.

### Step 4: Add title morphs for projects and posts

1. `components/index-list.tsx`: replace the inline
   `viewTransitionName: item.viewTransitionName ?? item.title` style with
   `TitleMorph`. Compute project names from the item path:
   `pageTitleTransitionName("project", item.path.replace(/^\//, ""))`.
   Keep `IndexListItem.viewTransitionName` as a full-name override and update
   its comment to say it must be a valid name produced by
   `pageTitleTransitionName`.
2. `app/page.tsx`: when mapping `posts` to `postItems`, add
   `viewTransitionName: pageTitleTransitionName("post", post.id)`.
3. `app/[slug]/layout.tsx`: remove `style={{ viewTransitionName: "title" }}`
   from the project `<h1>` and wrap it in
   `<TitleMorph name={pageTitleTransitionName("project", slug)}>`.
4. `app/posts/page.tsx`: wrap each post `ItemTitle` in
   `<TitleMorph name={pageTitleTransitionName("post", post.id)}>`.
5. `app/posts/layout.tsx`: wrap the post detail `<h1>` in
   `<TitleMorph name={pageTitleTransitionName("post", post.id)}>` when `post`
   exists; render the plain `<h1>` if `post` is undefined.

**Verify**: `npm run check` -> exit 0.
`rg -n 'viewTransitionName: "title"' app/` -> no matches.
`rg -n "item.viewTransitionName \\?\\? item.title" components/` -> no matches.

### Step 5: Stagger the posts index only

Apply the homepage's existing `animate-stagger-enter` pattern to
`app/posts/page.tsx`:

- heading block: `animate-stagger-enter [--stagger:0]`
- warning alert: `animate-stagger-enter [--stagger:1]`
- `ItemGroup`: `animate-stagger-enter [--stagger:2]`

Do not touch `app/playground/page.tsx`; [Plan 021](./021-playground-index-view-transitions.md) owns its index composition and
stagger behavior.

**Verify**: `npm run check` -> exit 0. Loading `/posts` in Chrome staggers
sections top-to-bottom.

### Step 6: Document the core convention

Update `AGENTS.md` under Learned Workspace Facts with:

- Core View Transition helpers live in `components/view-transitions.tsx`.
- Core `::view-transition-*` rules live in `styles/view-transitions.css`.
- Title names use `<kind>-title-<slug>` via `pageTitleTransitionName`; core
  kinds are `project` and `post`.
- `site-header` and `site-footer` are frozen View Transition groups.
- `components/scroll-reset.tsx` remains required.
- Playground index/card-grid/directional work is intentionally deferred to
  [Plan 021](./021-playground-index-view-transitions.md).

Update `plans/README.md` status/dependency notes as instructed by the
reviewer/operator.

**Verify**: `npm run check` -> exit 0.

### Step 7: Full verification pass

Run the complete checks and browser QA.

**Verify**: `npm run check` -> exit 0.
`npm run build` -> exit 0, static generation completes.

## Test plan

Manual browser QA in Chrome with `npm run dev`:

1. Homepage project item -> project page: title morphs; body fades/rises;
   header/footer remain visually stable.
2. Project page back button -> homepage: title morph reverses.
3. Homepage post item -> post page: title morphs into the posts layout `<h1>`.
4. `/posts` list item -> post page: title morphs into the detail title.
5. Emulate `prefers-reduced-motion: reduce`: transitions should swap
   instantly.
6. Firefox/no-support smoke check: navigation still works with no animation and
   no console errors.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `styles/view-transitions.css` exists and is imported once from
  `styles/globals.css`
- [ ] `components/view-transitions.tsx` exists and exports
  `pageTitleTransitionName` plus `TitleMorph`
- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0
- [ ] `rg -n 'viewTransitionName: "title"' app/` returns no matches
- [ ] `rg -n 'item\.viewTransitionName \?\? item\.title' components/` returns
  no matches
- [ ] `rg -n "@view-transition" styles/globals.css` returns no matches
- [ ] No `app/playground/**`, `components/playground/**`, or
  `lib/data/playground.ts` files are modified by this plan
- [ ] Browser QA flows 1-6 pass
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The drift check shows in-scope files changed and the Current state excerpts
  no longer match.
- `import { ViewTransition } from "react"` fails at runtime in `npm run dev` or
  `npm run build`; do not fall back to a different React API without reporting.
- Title morphs do nothing in Chrome after Steps 3-4 and 15 minutes of debugging
  (first check for duplicate `view-transition-name` console errors).
- A fix appears to require touching `app/playground/**`,
  `components/playground/**`, `components/scroll-reset.tsx`, or `next.config.ts`.
- The Turbopack stale-CSS bug persists after both `touch styles/globals.css`
  and `npm run dev:fresh`.

## Maintenance notes

- [Plan 021](./021-playground-index-view-transitions.md) extends these helpers for playground-specific names and directional
  index/child navigation after the maintainer chooses the playground index
  direction.
- If a post/project detail ever renders on the same page as its list item, the
  shared name will collide; scope names or drop one side.
- Post-to-post pagination may cross-morph adjacent titles because
  `app/posts/layout.tsx` persists; if this reads poorly, key `TitleMorph` by
  pathname or gate it by transition type in a follow-up.
- Reviewer scrutiny: root-layout `ViewTransition update` boundary, valid custom
  ident sanitization, duplicate names on a single page, and reduced-motion CSS.
