# Plan 021: Decide and implement playground index View Transitions

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- components/view-transitions.tsx styles/view-transitions.css styles/globals.css lib/data/playground.ts components/playground/playground-routes.ts components/playground/playground-route-nav.tsx app/playground/page.tsx app/playground/layout.tsx app/playground components/playground components/back-button.tsx components/ui/link-button.tsx app/private/qa/component-demos.tsx app/private/qa/page.private.tsx AGENTS.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. This plan is intentionally blocked
> until the maintainer picks a playground index direction.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: [006](./006-view-transitions.md), [014](./014-discovery-gaps.md)
- **Category**: direction (feature / motion design)
- **Planned at**: commit `9ed1acd`, 2026-07-02
- **Split from**: [`plans/006-view-transitions.md`](./006-view-transitions.md) — playground index/card-grid
  work was separated because the maintainer is undecided on the index
  direction.

## Why this matters

The core View Transition foundation should not force a playground index
redesign. The playground hub is a public surface, not a private QA page, and
its current direction is still unsettled: it may stay as a compact route nav,
become a richer card-grid directory, or keep the current demos with a small
discovery layer added around them. This plan isolates that decision so Plan
[006](./006-view-transitions.md) can land the reusable transition primitives without also locking the
playground composition.

## Direction gate

Before editing code, record one explicit maintainer choice in your task notes
or in this plan's README status row:

- `nav-only` — preserve the current playground index structure and route nav;
  add only low-risk directional page transitions for playground navigation.
  This is the recommended direction while the index remains undecided.
- `card-grid` — build a first-class playground directory with route cards and
  source/destination title morphs. This is a visual redesign and should only
  proceed after the maintainer chooses it.
- `hybrid` — keep the current index demos, then add a compact route preview
  layer below or beside them. This has the highest overlap risk with future
  index direction work.

Do not silently choose `card-grid` or `hybrid`. If no direction is recorded,
stop before code changes.

## Current state

- [`plans/006-view-transitions.md`](./006-view-transitions.md) owns the core View Transition primitives:
  `styles/view-transitions.css`, `components/view-transitions.tsx`, route slot
  fade/rise, frozen site chrome, and project/post title morphs.
- [`plans/014-discovery-gaps.md`](./014-discovery-gaps.md) owns the canonical playground route registry
  for sitemap/search. Its local reconcile note says the dirty worktree already
  has partial route-nav work in `components/playground/playground-routes.ts`
  and `components/playground/playground-route-nav.tsx`, but sitemap/search
  still need the canonical `lib/data/playground.ts` source of truth.
- In the current dirty worktree, `app/playground/page.tsx` renders the
  playground index content plus `<PlaygroundRouteNav size="md" />`.
- In the current dirty worktree, `app/playground/layout.tsx` renders
  `<PlaygroundRouteNav hideOnRoot ... />` for child pages.
- In the current dirty worktree, `components/playground/playground-routes.ts`
  exports `PLAYGROUND_ROUTES` with live route entries for Motion, Pixels,
  Components, Buttons, and Verisimilitude. Older route names may still exist
  as redirects. Use the canonical registry from [Plan 014](./014-discovery-gaps.md) after it lands rather
  than hardcoding either list in this plan.
- The playground child pages are content-heavy demo pages. They do not yet
  expose a stable route-level title target solely for shared-element morphing.
  Do not add duplicate visible headings just to make a morph possible.

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

## Scope

**In scope** (the only files you should modify or create):

- `components/view-transitions.tsx` (extend helpers for playground only after
  [Plan 006](./006-view-transitions.md) exists)
- `styles/view-transitions.css` (directional playground transition classes only
  if [Plan 006](./006-view-transitions.md) does not already provide them)
- `lib/data/playground.ts` (consume only; [Plan 014](./014-discovery-gaps.md) owns creation)
- `components/playground/playground-routes.ts` (only to re-export or remove a
  duplicate route array after [Plan 014](./014-discovery-gaps.md))
- `components/playground/playground-route-nav.tsx`
- `components/playground/playground-card.tsx` (create only for `card-grid` or
  `hybrid`)
- `components/playground/playground-card-grid.tsx` (create only for
  `card-grid` or `hybrid`)
- `app/playground/page.tsx`
- `app/playground/layout.tsx`
- the six or current `app/playground/*/page.tsx` child pages only if the
  selected direction needs a route-level title target
- `components/back-button.tsx` and `components/ui/link-button.tsx` only if
  directional transition props cannot otherwise be forwarded
- `app/private/qa/component-demos.tsx` and `app/private/qa/page.private.tsx`
  only if this plan creates a reusable playground card component
- `AGENTS.md`
- `plans/README.md`

**Out of scope** (do NOT touch, even though they look related):

- Core project/post View Transition work — [Plan 006](./006-view-transitions.md) owns it.
- Sitemap/search indexing and the canonical route registry — [Plan 014](./014-discovery-gaps.md) owns it.
- Playground route content, demo behavior, or demo grouping unrelated to the
  selected index direction.
- `/private/**` pages except for the required QA example when a new reusable
  component is created.
- MDX content bodies and project/post navigation.

## Git workflow

- Branch: `cursor/021-playground-view-transitions` from `master`.
- Commit per logical phase: direction record, transition plumbing, chosen index
  implementation, QA/docs.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Confirm dependencies and direction

Confirm [`plans/006-view-transitions.md`](./006-view-transitions.md) is DONE and the core helper module
exists. Confirm [`plans/014-discovery-gaps.md`](./014-discovery-gaps.md) is DONE or that
`lib/data/playground.ts` is already the single source of playground routes.

Then confirm a maintainer-selected direction from the Direction gate:
`nav-only`, `card-grid`, or `hybrid`.

**Verify**:

- `rg -n "components/view-transitions|view-transitions.css" app components styles plans/README.md`
  shows [Plan 006](./006-view-transitions.md) landed.
- `rg -n "export const playgroundRoutes|export .*playgroundRoutes" lib/data components/playground`
  shows one canonical source or a clean re-export.
- The selected direction is recorded before code changes.

### Step 2: Reuse the canonical playground registry

Import route data from `@/lib/data/playground` wherever the index or route nav
needs it. If `components/playground/playground-routes.ts` still exists, make it
a thin re-export or delete it after updating imports. Do not keep both
`PLAYGROUND_ROUTES` and `playgroundRoutes` as independent arrays.

If the dirty worktree's redirect routes remain, do not index them as separate
cards. The card/nav surface should reflect the canonical current routes only.

**Verify**:

`rg -n "PLAYGROUND_ROUTES|/playground/motion-systems" app/ components/ lib/data/playground.ts`
matches only the canonical route entries or a thin compatibility re-export.

### Step 3: Extend shared View Transition helpers for playground

In `components/view-transitions.tsx`, extend
`pageTitleTransitionName()` only if the chosen direction uses shared-element
title morphing. The helper may accept `"playground"` after this plan:

```ts
pageTitleTransitionName(kind: "project" | "post" | "playground", slug: string)
```

If the chosen direction is `nav-only`, avoid adding title morph names until
there is a stable source/destination title pair. Use directional page
transitions instead.

In `styles/view-transitions.css`, add directional classes only if absent from
[Plan 006](./006-view-transitions.md):

- `vt-nav-forward` — child page enters from the trailing inline direction.
- `vt-nav-back` — index page or back navigation enters from the leading inline
  direction.
- Reduced motion must disable both classes.

**Verify**: `npm run typecheck` -> exit 0.

### Step 4: Implement the selected index direction

For `nav-only`:

1. Keep `app/playground/page.tsx` visually stable.
2. Update `PlaygroundRouteNav` links to pass the directional View Transition
   type or class supported by the final React/Next API from [Plan 006](./006-view-transitions.md).
3. Apply forward transitions from index/nav links to child pages and back
   transitions from child layout/back links to the index.
4. Do not add card-grid components, route previews, or duplicate headings.

For `card-grid`:

1. Create `components/playground/playground-card.tsx` and
   `components/playground/playground-card-grid.tsx`.
2. Render cards from `playgroundRoutes`; each card owns its own transition
   source. Use `TitleMorph` only when the child page has a matching visible
   destination title.
3. If a child page needs a route-level title target, add a small shared wrapper
   rather than copy-pasting headings into every child page. Do not duplicate a
   visible title if the first section already serves that role.
4. Add a QA example for the reusable card/grid component and a QA TOC entry if
   not already covered.

For `hybrid`:

1. Preserve the current index demos and ordering.
2. Add only the smallest route preview layer needed for discovery.
3. Follow the `card-grid` component/QA rules for any new reusable card.

**Verify**: `npm run lint` -> exit 0.

### Step 5: Wire child-page navigation without broad demo churn

If directional back navigation needs changes to `components/back-button.tsx` or
`components/ui/link-button.tsx`, add the smallest prop pass-through needed and
update existing call sites only where they opt into View Transitions.

Do not convert all playground pages to a new layout abstraction unless the
chosen direction requires a route-level title target. If you do create a
`PlaygroundPage` wrapper, migrate all current playground child pages in one
consistent pass and keep demo content unchanged.

**Verify**: `npm run check` -> exit 0.

### Step 6: Update docs and status

Update `AGENTS.md` with the selected playground index direction and the route
registry ownership rule if it is not already present. Update this row in
`plans/README.md` with the selected direction and status.

If you created a reusable card/grid component, confirm the private QA example
and TOC/sidebar entry exist per repo guidance.

**Verify**: `npm run format:check` -> exit 0.

### Step 7: Browser QA

Run `npm run dev` and check in Chrome or another View Transitions-capable
browser:

1. `/playground` loads without layout shift or duplicate route headings.
2. Navigating from `/playground` to every canonical child route uses the chosen
   transition and lands at the right URL.
3. Navigating back to `/playground` uses the back/index transition.
4. Browser back/forward controls remain coherent.
5. Reduced-motion OS/browser setting removes transition motion.
6. If card/grid UI was added, hover/focus states are keyboard-visible and text
   fits at mobile and desktop widths.
7. `/private/qa` still renders if this plan added a QA example.

Finally run `npm run build`.

## Test plan

No unit test runner by policy. Gates: `npm run check`,
`npm run format:check`, `npm run build`, plus the browser QA list above.

## Done criteria

Machine-checkable where possible. ALL must hold:

- [ ] [Plan 006](./006-view-transitions.md) is DONE or its helper/CSS outputs exist exactly as required
- [ ] [Plan 014](./014-discovery-gaps.md) is DONE or `lib/data/playground.ts` is already the canonical route source
- [ ] A selected direction (`nav-only`, `card-grid`, or `hybrid`) is recorded
- [ ] No duplicate playground route arrays remain
- [ ] The implementation includes only the selected direction; abandoned
      options are not half-added
- [ ] `npm run check`, `npm run format:check`, and `npm run build` exit 0
- [ ] Browser QA passes for `/playground` and every canonical child route
- [ ] `AGENTS.md` records any new durable convention
- [ ] `plans/README.md` status row is updated

## STOP conditions

Stop and report back (do not improvise) if:

- No playground index direction is recorded before implementation.
- [Plan 006](./006-view-transitions.md) has not landed and the core View Transition helper/CSS shape is
  still unstable.
- [Plan 014](./014-discovery-gaps.md) has not landed and the playground route registry is still duplicated
  or conflicting.
- The chosen direction requires redesigning playground demo content rather than
  only index/nav composition.
- Browser support or React/Next View Transition APIs differ enough that
  directional link props cannot be implemented without a broader routing
  abstraction.

## Maintenance notes

- This plan is intentionally the only place that owns playground index View
  Transition direction. Keep [Plan 006](./006-view-transitions.md) core-only.
- Prefer `nav-only` until the maintainer explicitly chooses a more visual
  playground hub.
- New playground child routes should update the canonical registry from Plan
  [014](./014-discovery-gaps.md); this plan should consume that data only.
- If `card-grid` or `hybrid` lands, future visual QA should treat
  `/playground` as a public route, not a private prototype surface.
