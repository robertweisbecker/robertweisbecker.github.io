# Plan 008: Remove the dead Universal Analytics gtag script

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- app/layout.tsx`
> If the file changed since this plan was written, compare the "Current
> state" excerpt against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf / security
- **Planned at**: commit `9ed1acd`, 2026-07-02

## Why this matters

The root layout loads `gtag.js` from googletagmanager.com configured with a
Universal Analytics property ID (`UA-…` format). Google shut down Universal
Analytics in July 2023 — UA properties stopped processing data entirely — so
this script collects nothing. Meanwhile it costs a third-party script fetch +
inline init on every page load and keeps googletagmanager.com as a trusted
script origin (supply-chain surface) for zero benefit. The site already has
working analytics via `@vercel/analytics` (rendered in the same layout).
Removing the dead tag is a pure win.

## Current state

- `app/layout.tsx` — root layout. Loads the gtag script and inline init in
  `<head>` (lines 65–68) via `next/script`, imported at line 2. Vercel
  Analytics and Speed Insights are rendered at lines 86–87.

Excerpt as of `9ed1acd`:

```tsx
// app/layout.tsx:64-69
<head>
  <Script src="https://www.googletagmanager.com/gtag/js?id=UA-100486484-1" strategy="afterInteractive" />
  <Script id="gtag-init" strategy="afterInteractive">
    {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','UA-100486484-1',{send_page_view:false});`}
  </Script>
</head>
```

```tsx
// app/layout.tsx:86-87
<Analytics />
<SpeedInsights />
```

Note: the init already sets `send_page_view: false`, and no other code in the
repo calls `gtag(` or reads `dataLayer` (verify in Step 1) — so nothing
depends on this script.

## Commands you will need

| Purpose    | Command         | Expected on success |
| ---------- | --------------- | ------------------- |
| Install    | `npm install`   | exit 0              |
| All checks | `npm run check` | exit 0              |
| Prod build | `npm run build` | exit 0              |

## Scope

**In scope** (the only files you should modify):

- `app/layout.tsx`
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- `<Analytics />` / `<SpeedInsights />` — the working analytics; keep them.
- Adding a CSP or other security headers — separate concern, rejected as a
  standalone finding for this static site.
- Any other content of `app/layout.tsx` (fonts, metadata, viewport, theme
  provider, skip link).

## Git workflow

- Branch: `cursor/008-remove-dead-gtag` from `master`.
- One commit, e.g. "Remove dead Universal Analytics gtag script".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Confirm nothing else references gtag

```bash
rg -n "gtag|dataLayer|googletagmanager" --glob '!plans/**' --glob '!node_modules/**'
```

Expected: matches only in `app/layout.tsx`. If any other source file matches,
STOP and report.

**Verify**: command output shows `app/layout.tsx` matches only.

### Step 2: Remove the script tags

In `app/layout.tsx`:

1. Delete the two `<Script>` elements (lines 65–68). If the `<head>` element
   becomes empty, delete the `<head>` wrapper too (Next injects its own head
   content; an empty literal `<head>` is unnecessary).
2. Remove the now-unused `import Script from "next/script";` (line 2).

**Verify**: `npm run check` → exit 0 (this also catches the unused import if
you forget it).

### Step 3: Build and confirm removal

**Verify**: `npm run build` → exit 0. Then
`rg -rn "googletagmanager" .next/ | head -5` → no matches in server-rendered
output (it's acceptable if this grep is empty or the `.next` structure makes
it noisy — the authoritative check is Step 1's source grep).

## Test plan

No unit test runner by policy. Verification is the source grep, `npm run
check`, and `npm run build`. Optional browser QA: `npm run dev`, load `/`,
confirm the Network panel shows no request to `googletagmanager.com` and no
console errors.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `rg -n "gtag|googletagmanager" app/ components/ lib/` returns no matches
- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Step 1 finds `gtag(`/`dataLayer` references outside `app/layout.tsx` —
  something depends on the script and the plan's "nothing depends on this"
  assumption is false.
- The maintainer's intent turns out to be migrating to GA4 rather than
  removal (only if the operator says so) — this plan removes, it does not
  migrate.

## Maintenance notes

- If Google Analytics is ever wanted again, add GA4 (`G-…` ID) via
  `@next/third-parties/google` rather than hand-rolled `<Script>` tags.
- Reviewer: confirm the diff touches only the two `<Script>` blocks, the
  `Script` import, and (possibly) an empty `<head>` wrapper.
