# Plan 007: Fix broken `/projects/*` links in the theming post

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- app/posts/theming/page.tsx lib/data/projects.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `9ed1acd`, 2026-07-02

## Why this matters

The published post at `/posts/theming` links to `/projects/oklch` and
`/projects/unified-design-language`. Neither route exists — project pages in
this repo are served at the top level via the `app/[slug]` catch-all (e.g.
`/oklch-colors`, `/unified-design-language`), and there is no `/projects/*`
prefix anywhere. Every visitor who clicks these links from a live post gets a 404. The fix is two href corrections plus a sweep to confirm no other internal
link points at a nonexistent route.

## Current state

- `app/posts/theming/page.tsx` — the theming post; contains the two broken
  links (lines 109 and 113).
- `lib/data/projects.ts` — the project registry; each entry's `path` is the
  real route. Relevant paths: `/oklch-colors` (line 9, `published: true`),
  `/oklch-colors-part-ii` (line 22, `published: false`), and
  `/unified-design-language` (line 35, `published: true`).
- `lib/data/posts.ts` — post registry; post paths are `/posts/<id>`.

Excerpt as of `9ed1acd`:

```tsx
// app/posts/theming/page.tsx:107-116
<p>
  A working demo of the theming described in my{" "}
  <Link href="/projects/oklch" className="link">
    writeup
  </Link>{" "}
  of the okLCH color system I created for the{" "}
  <Link href="/projects/unified-design-language" className="link">
    Unified Design Language
  </Link>{" "}
  project. ...
```

The "writeup" is the OKLCH color-system project whose live route is
`/oklch-colors` (do NOT use `/oklch-colors-part-ii` — it is unpublished).
The second link's target is `/unified-design-language`.

## Commands you will need

| Purpose    | Command         | Expected on success |
| ---------- | --------------- | ------------------- |
| Install    | `npm install`   | exit 0              |
| All checks | `npm run check` | exit 0              |
| Prod build | `npm run build` | exit 0              |
| Dev server | `npm run dev`   | serves on :3000     |

## Scope

**In scope** (the only files you should modify):

- `app/posts/theming/page.tsx`
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- `lib/data/projects.ts` / `lib/data/posts.ts` — the registries are correct;
  do not "fix" them to match the broken links.
- Adding redirects in `next.config.ts` — these URLs were never valid, so
  there is nothing to redirect.

## Git workflow

- Branch: `cursor/007-fix-broken-project-links` from `master`.
- One commit, imperative message (match `git log` style), e.g.
  "Fix broken project links in theming post".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Correct the two hrefs

In `app/posts/theming/page.tsx`, change:

- `href="/projects/oklch"` → `href="/oklch-colors"`
- `href="/projects/unified-design-language"` → `href="/unified-design-language"`

**Verify**: `rg -n '"/projects/' app/ components/ content/` → no matches.

### Step 2: Sweep for other dead internal links

Extract all internal link targets and compare them against real routes:

```bash
rg -o 'href="(/[^"#]*)' -r '$1' --no-filename app/ components/ content/ | sort -u
```

For each path in the output, confirm it is one of: a `staticRoutes` entry or
generated entry in `app/sitemap.ts`, a `path` in `lib/data/posts.ts` or
`lib/data/projects.ts`, a route directory under `app/` (including
`/playground/*` children and `/art`), a `/private/**` route (dev-only, fine),
a hash-only anchor on `/` (e.g. `/#about`), or a file that exists under
`public/` (e.g. `/BOB.md`). Fix any additional dead links found the same way
as Step 1 — but only if the correct target is unambiguous; otherwise list
them in your report instead of guessing.

**Verify**: `npm run check` → exit 0.

### Step 3: Confirm in the browser

Run `npm run dev`, open `http://localhost:3000/posts/theming`, click both
corrected links; each loads a project page (no 404).

**Verify**: `npm run build` → exit 0, static generation completes.

## Test plan

No unit test runner exists in this repo by policy (see `plans/README.md`
dependency notes). Verification is the Step 2 sweep, `npm run check`,
`npm run build`, and the manual click-through in Step 3.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `rg -n '"/projects/' app/ components/ content/` returns no matches
- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The excerpts above don't match the live code (drift).
- Step 2 finds a dead link whose correct target you cannot determine from
  `lib/data/projects.ts` / `lib/data/posts.ts` — report it, don't guess.
- Fixing a link appears to require creating a new route or redirect.

## Maintenance notes

- Internal links in hand-written TSX posts are unchecked strings; the
  registries in `lib/data/` are the source of truth for real paths. A future
  improvement (not this plan) could link posts to projects via registry
  lookups instead of string literals.
- Reviewer: confirm the "writeup" link points at `/oklch-colors` and not the
  unpublished `/oklch-colors-part-ii`.
