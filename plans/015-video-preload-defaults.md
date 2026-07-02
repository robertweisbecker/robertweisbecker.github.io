# Plan 015: Stop project videos from eagerly buffering offscreen

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- components/video.tsx`
> If the file changed since this plan was written, compare the "Current
> state" excerpt against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `9ed1acd`, 2026-07-02

## Why this matters

The shared `<Video>` component hardcodes `autoPlay` and `preload="auto"`, so
every video on a page starts downloading and playing at mount — including
below-the-fold ones. Project pages embed several: `everfi-engage.mdx` has
four `<Video>` blocks and its asset directory is ~49 MB on disk;
`npr-maps.mdx` sits on a ~65 MB directory. That download burst competes with
LCP and burns mobile data for content the visitor may never scroll to. The
fix: keep the ambient-autoplay design, but gate playback on viewport
visibility (the repo's carousel already does exactly this) and default
`preload` to `metadata`.

## Current state

- `components/video.tsx` — client component wrapping `media-chrome`'s
  `MediaController`; exported `Video` is registered for all MDX pages in
  `mdx-components.tsx:68`. Props interface at lines 20–24 extends
  `React.VideoHTMLAttributes<HTMLVideoElement>`; `{...props}` is spread
  AFTER the hardcoded attributes, so explicit per-use props already win.

```tsx
// components/video.tsx:173-186
<video
  suppressHydrationWarning={true}
  width="100%"
  // height="auto"
  slot="media"
  playsInline
  autoPlay
  muted={!unmuted}
  preload="auto"
  src={src}
  {...props}
>
  {children}
</video>
```

- Call sites (all pass through MDX or playground; none currently pass
  `autoPlay`/`preload` explicitly, so all get the defaults):
  - `content/projects/everfi-engage.mdx:45-55` — four videos.
  - `content/projects/npr-maps.mdx:68,75` — two videos.
  - `content/projects/conversational-immigration-forms.mdx:65-142` — six.
  - `components/playground/frames/frames-playground.tsx:34-37` — already
    passes `preload="metadata"` explicitly (line 37); unaffected.
  - `app/private/qa/component-demos.tsx:958` — dev-only.
- In-view gating precedent to copy:

```tsx
// components/ui/carousel.tsx:14,85-86 — the repo's existing pattern
import { useIntersectionObserver } from "@uidotdev/usehooks";
const [intersectionRef, entry] = useIntersectionObserver({ threshold: 0.3 });
const isInView = entry?.isIntersecting ?? false;
```

- AGENTS.md preference: "A hooks library is installed at
  @uidotdev/usehooks … prefer this for browser subscription state."

## Commands you will need

| Purpose    | Command         | Expected on success |
| ---------- | --------------- | ------------------- |
| Install    | `npm install`   | exit 0              |
| All checks | `npm run check` | exit 0              |
| Prod build | `npm run build` | exit 0              |
| Dev server | `npm run dev`   | serves on :3000     |

## Scope

**In scope** (the only files you should modify):

- `components/video.tsx`
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- The MDX files — no call-site changes; the new defaults must preserve the
  visible behavior (video plays when you can see it).
- `components/playground/frames/frames-playground.tsx` — already correct.
- media-chrome control bar, morph icons, styling.
- Compressing/transcoding the media assets themselves (separate question,
  recorded in the index).

## Git workflow

- Branch: `cursor/015-video-preload` from `master`.
- One commit, e.g. "Gate video autoplay on viewport visibility".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add in-view playback gating to `Video`

In `components/video.tsx`, inside the `Video` component:

1. Import `useIntersectionObserver` from `@uidotdev/usehooks`.
2. Add a `ref` for the `<video>` element (`React.useRef<HTMLVideoElement>(null)`)
   and attach it to the `<video>`.
3. Observe visibility: `const [intersectionRef, entry] = useIntersectionObserver({ threshold: 0.3 });`
   Attach `intersectionRef` to the outer wrapper element the component
   renders (the `MediaController`'s wrapping element or a wrapper `div` —
   match the existing DOM; do not restructure the media-chrome slots).
4. Replace the hardcoded `autoPlay` attribute with an effect:

```tsx
const isInView = entry?.isIntersecting ?? false;

React.useEffect(() => {
  const video = videoRef.current;
  if (!video) return;
  if (isInView) {
    video.play().catch(() => {});
  } else if (!video.paused) {
    video.pause();
  }
}, [isInView]);
```

5. Change `preload="auto"` to `preload="metadata"`.
6. Keep `{...props}` spread last so a caller can still force
   `autoPlay`/`preload="auto"` explicitly. If `props.autoPlay` is passed,
   skip the effect's pause branch for that instance (simplest: bail out of
   the effect when `props.autoPlay` is true — but note MDX callers don't use
   camelCase props today, so this is just an escape hatch).

Respect reduced motion: wrap the `video.play()` call with a
`window.matchMedia("(prefers-reduced-motion: reduce)").matches` check — do
not auto-play for reduced-motion users (they keep the play button).

**Verify**: `npm run check` → exit 0.

### Step 2: Browser QA

With `npm run dev` running, open `http://localhost:3000/everfi-engage` in
Chrome with the Network panel open (Disable cache):

1. On load, no `.mp4`/`.mov` transfers beyond metadata-range requests
   (small, typically <1 MB total) — previously all four videos buffered.
2. Scroll to the first video → it starts playing when ~30% visible.
3. Scroll past it → it pauses; scroll back → resumes.
4. The manual play button and control bar still work (media-chrome
   controls unaffected).
5. DevTools → Rendering → emulate `prefers-reduced-motion: reduce`, reload:
   videos do not auto-play; clicking play works.

**Verify**: all five behaviors, no console errors. Repeat a quick smoke on
`/npr-maps` and `/conversational-immigration-forms`.

### Step 3: Build

**Verify**: `npm run build` → exit 0.

## Test plan

No unit test runner by policy. The Step 2 network/scroll matrix is the test;
the reduced-motion case and the control-bar interoperability are the named
regressions to check.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `rg -n 'preload="auto"' components/video.tsx` → no matches
- [ ] `rg -n "useIntersectionObserver" components/video.tsx` → 1 match
- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0
- [ ] Browser QA matrix (Step 2) passes on `/everfi-engage`
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- media-chrome's `MediaController` interferes with programmatic
  `video.play()`/`pause()` (e.g. its state machine fights the effect) after
  one reasonable fix attempt — report the observed behavior.
- Attaching the intersection ref requires restructuring the media-chrome
  slot markup.
- The excerpt no longer matches (drift).

## Maintenance notes

- If a future hero video must buffer eagerly, pass `preload="auto"`
  and `autoPlay` at the call site — the `{...props}` spread wins.
- If [plan 006](./006-view-transitions.md) (view transitions) lands, entering a page via transition still
  mounts videos normally; no interaction expected.
- Reviewer: scrutinize the pause branch (must not pause user-initiated
  playback the moment the user scrolls slightly — threshold 0.3 with the
  wrapper element keeps this reasonable; if it feels aggressive, only
  auto-pause videos that were auto-played, tracked via a ref).
