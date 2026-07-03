# Plan 018: Lazy-load heavy MDX components and split the pixel-icon module

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- mdx-components.tsx components/icons-pixel.tsx components/pixel-morph.tsx components/playground/motion/motion-playground.tsx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: [plans/010-dead-code-sweep.md](./010-dead-code-sweep.md) (fewer icon consumers to
  chase). Recommended after [plans/017-server-client-boundaries.md](./017-server-client-boundaries.md) so bundle
  measurements compose; not logically required.
- **Category**: perf
- **Planned at**: commit `9ed1acd`, 2026-07-02

## Why this matters

Two chunk-level costs hit routes that never use the code:

1. `mdx-components.tsx` statically imports every MDX shortcode, so every
   MDX project page bundles `media-chrome` (`Video`), `cambio`
   (`ImageModal`), `embla-carousel` (`ProjectImageCarousel`), the color
   palette demos, and `DeviceFrame` — whether or not that page uses them.
2. `components/icons-pixel.tsx` (1,090 lines) is a single module holding
   ~100 icon components AND their point-data registry. The global header
   imports a handful of icons plus `PixelMorph` (which imports the data
   registry from the same module), so the entire module lands in the shared
   layout chunk on every route.

Also: `/playground/motion-systems` eagerly imports several demos where the
file already demonstrates the `next/dynamic` pattern for two others.

## Current state

**MDX registry** — `mdx-components.tsx:1-24` statically imports (heavy ones
marked): `ColorPalette/ColorSwatch/ColorRamp` (heavy demo), `DemoContainer`,
`DeviceFrame` (device chrome), `Image`, `ImageModal` (→ `cambio`),
`ImageToggle`, `LayoutGrid`, `LinkOut`, `Mark/MarkNote`,
`ProjectImageCarousel` (→ `embla-carousel` ×3), `Stats`, `Separator`,
`Video` (→ `media-chrome`), `CodeBlock`, `Alert*`, `Badge`, `ColorCode`,
`TextReveal` (→ `motion`). All are registered in `useMDXComponents()`
(lines 45–77). MDX pages that use these are `content/projects/*.mdx`
rendered via `app/[slug]/page.tsx`.

**Pixel icons** — `components/icons-pixel.tsx`:

```tsx
// components/icons-pixel.tsx:20
export const pixelIconData: Record<string, PixelIconData> = {};

// components/icons-pixel.tsx:73-85 — factory registers data at module eval
function createPixelIcon(name: string, width: number, height: number, data: string) {
  pixelIconData[name] = { name, width, height, data, points: parsePixelIconData(data) };
  return function PixelGeneratedIcon(props, scale) { ... };
}
```

~100 `export const PixelXxxIcon = createPixelIcon(...)` calls follow, plus a
few hand-written SVG components (e.g. `PixelFinderIcon` line 101), then
`pixelIconNames` and `morphablePixelIconNames` const arrays (lines ~850–1087)
and derived types (lines 1089–1090).

Global-chunk consumers of this module (verified):

- `components/header/nav-links.tsx:5` — `PixelEyeIcon, PixelNewspaperIcon, PixelPointerIcon, PixelScribbleIcon`
- `components/header/work-menu.tsx:10-11` — those plus `PixelUserIcon`, and `PixelMorph`
- `components/mode-toggle.tsx:3` — `PixelMorph` (morphs `PixelSunSmallIcon` ↔ `PixelMoon2Icon`)
- `components/site-search.tsx` — `PixelFinderIcon`, `PixelNewsIcon`, `PixelScribbleIcon`
- `components/pixel-morph.tsx:3` — `pixelIconData`, `morphablePixelIconNames`, types
- `components/video.tsx:16` — `PixelMorph` (play/pause/volume/fullscreen morphs)
- `app/page.tsx:7` — `PixelMarkdown2Icon, PixelShuffleIcon, PixelExternalIcon, PixelFigmaIcon`
- `components/footer.tsx` / footer internals — check with `rg`

**Playground motion** — `components/playground/motion/motion-playground.tsx`
already lazy-loads `CardFan` and `MotionTextPlaygroundDemo` via
`next/dynamic` (lines 21–31) but eagerly imports `EmojiFeedbackDemo`
(line 7), `import * as PixelIcons` (line 8 — the whole icon module),
`ChartDemo` (17), `ColorSwatchGroupDemo` (18), `SkeletonDemo` (19).

## Commands you will need

| Purpose    | Command         | Expected on success                 |
| ---------- | --------------- | ----------------------------------- |
| Install    | `npm install`   | exit 0                              |
| All checks | `npm run check` | exit 0                              |
| Prod build | `npm run build` | exit 0; record First Load JS deltas |
| Dev server | `npm run dev`   | serves on :3000                     |

## Scope

**In scope** (the only files you should modify or create):

- `mdx-components.tsx`
- `components/pixel-icons/` (create: `core.tsx`, `chrome.tsx`)
- `components/icons-pixel.tsx` (becomes data-heavy remainder that re-exports
  core + chrome for untouched call sites)
- `components/pixel-morph.tsx` (import from core; add missing-data guard)
- `components/header/nav-links.tsx`, `components/header/work-menu.tsx`,
  `components/mode-toggle.tsx`, `components/site-search.tsx`,
  `components/video.tsx`, `components/footer/**` (import-path changes only)
- `components/playground/motion/motion-playground.tsx`
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- The visual output of any icon or MDX component.
- `content/projects/*.mdx` — shortcode names must keep working unchanged.
- `app/page.tsx` icon imports — the homepage route chunk is not the shared
  chunk; converting it buys little (and [plan 017](./017-server-client-boundaries.md) owns that file).
- Post/playground pages that import many pixel icons — they legitimately
  need the full module.
- `components/morph-icon.tsx` (line-segment morph — different system).

## Git workflow

- Branch: `cursor/018-mdx-icon-splitting` from `master`.
- Commit per phase (MDX lazy registry; icon split; playground), imperative
  messages, e.g. "Lazy-load heavy MDX shortcodes".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Baseline

Run `npm run build`; record First Load JS for the shared chunk line, `/`,
two MDX project routes (e.g. `/oklch-colors`, `/forge`), and
`/playground/motion-systems`.

**Verify**: build exits 0; figures recorded.

### Step 2: Lazy-load the heavy MDX shortcodes

In `mdx-components.tsx`, convert ONLY the heavy components to
`next/dynamic` module-level wrappers, keeping the registry keys identical:

- `Video` (pulls `media-chrome`)
- `ImageModal` (pulls `cambio`)
- `ProjectImageCarousel` (pulls `embla-carousel` ×3) — keep the
  `ProjectCarousel` alias pointing at the same wrapper
- `ColorPalette`, `ColorSwatch`, `ColorRamp`
- `DeviceFrame.Phone` (wrap in a dynamic that resolves the `.Phone` member)

Pattern (module scope, NOT inside `useMDXComponents`):

```tsx
import dynamic from "next/dynamic";

const Video = dynamic(() => import("@/components/video").then((m) => ({ default: m.Video })));
const DeviceFramePhone = dynamic(() =>
  import("@/components/device-frame").then((m) => ({ default: m.DeviceFrame.Phone }))
);
```

Leave lightweight primitives (`Image`, `LinkOut`, `Badge`, `Alert*`,
`Separator`, `Mark/MarkNote`, `LayoutGrid`, `Stats`, `CodeBlock`,
`ColorCode`, `DemoContainer`, `TextReveal`, headings/`img`/`a`/`pre`)
eagerly imported — dynamic overhead isn't worth it there.

Do NOT pass `ssr: false` — these must stay server-renderable so MDX pages
keep their static HTML (loading fallbacks would flash otherwise). No
`loading` option: the components resolve at build/stream time.

**Verify**: `npm run check` → exit 0. `npm run dev`: open `/oklch-colors`
(palettes + carousel), `/everfi-engage` (videos), `/forge` (image modals) —
all shortcodes render and function. `npm run build` → exit 0; First Load JS
for an MDX route that uses none of the heavy shortcodes drops vs baseline.

### Step 3: Split the pixel-icon module

Goal: global chrome stops importing the 1,090-line module; all other import
sites keep working without edits.

1. Create `components/pixel-icons/core.tsx`: move (do not copy) from
   `icons-pixel.tsx`: `PixelIconPoint`, `PixelIconData` types,
   `pixelIconData` registry object, `parsePixelIconData`,
   `GeneratedPixelIcon`, `createPixelIcon`, `pixelIconNames`,
   `morphablePixelIconNames`, `PixelIconName`, `MorphablePixelIconName`.
   (The name arrays are plain strings — small; keeping them in core keeps
   the types intact everywhere.) Export everything `icons-pixel.tsx`
   previously exported from this set.
2. Create `components/pixel-icons/chrome.tsx`: move the icon definitions
   used by global chrome (import `createPixelIcon` from `./core`):
   `PixelPointerIcon`, `PixelScribbleIcon`, `PixelNewspaperIcon`,
   `PixelEyeIcon`, `PixelUserIcon`, `PixelSunSmallIcon`, `PixelMoon2Icon`,
   `PixelPlayIcon`, `PixelPauseIcon`, `PixelVolumeIcon`,
   `PixelVolumeMutedIcon`, `PixelArrowsExpandIcon`,
   `PixelArrowsCompressIcon`, `PixelFinderIcon`, `PixelNewsIcon` — plus any
   others surfaced by `rg` over header/footer/mode-toggle/site-search/video
   imports (run the grep; the list above was compiled at `9ed1acd`).
3. Rewrite `components/icons-pixel.tsx` as: `export * from "./pixel-icons/core";
export * from "./pixel-icons/chrome";` followed by all REMAINING icon
   definitions (importing `createPixelIcon` from `./pixel-icons/core`).
   Every existing `@/components/icons-pixel` import site keeps compiling.
4. Update the global-chrome import sites (`nav-links`, `work-menu`,
   `mode-toggle`, `site-search`, `video.tsx`, footer files if any) to import
   icons from `@/components/pixel-icons/chrome` and types from
   `.../core` — NOT from `@/components/icons-pixel`.
5. Update `components/pixel-morph.tsx` to import from
   `@/components/pixel-icons/core`. Add a data guard: if
   `pixelIconData[from]` or `pixelIconData[to]` is missing at render, warn
   once in development (`console.warn`) and render `null` — this is the
   failure mode when a morph references an icon whose defining module
   wasn't loaded; it must fail visibly-soft, not throw.
6. Registry semantics check (load-bearing): `createPixelIcon` registers
   data as a module-evaluation side effect. After the split, a `PixelMorph`
   can only morph icons whose defining module is loaded on that page. All
   chrome morphs (sun/moon, play/pause, volume, fullscreen) live in
   `chrome.tsx` — self-contained. Post/playground morph demos import the
   full `icons-pixel.tsx` — also self-contained. Verify no morph call site
   references an icon outside its loaded set:
   `rg -n 'from="Pixel|to="Pixel' app components` and map each name to its
   defining module.

**Verify**: `npm run check` → exit 0. Browser: header nav icons, work menu,
mode toggle morph (sun↔moon), site search icons, video player control morphs
(on `/everfi-engage`), pixel-morph demos on `/posts/pixel-icons` and
`/playground/pixel-demos` all render and animate. `npm run build` → exit 0;
shared First Load JS drops vs baseline.

### Step 4: Lazy-load the eager playground motion demos

In `components/playground/motion/motion-playground.tsx`, convert
`EmojiFeedbackDemo`, `ChartDemo`, `ColorSwatchGroupDemo`, and `SkeletonDemo`
to `next/dynamic` following the file's existing `CardFan` pattern
(lines 21–23), including `loading` placeholders. Replace
`import * as PixelIcons from "@/components/icons-pixel"` with named imports
of only the icons the file actually uses (`rg -n "PixelIcons\." components/playground/motion/motion-playground.tsx`
to enumerate) — if the usage is a dynamic-by-name showcase over many icons,
move that section into its own dynamically-imported component instead.

**Verify**: `npm run check` → exit 0. `/playground/motion-systems` renders
all sections with brief loading placeholders; `npm run build` → First Load
JS for the route drops vs baseline.

### Step 5: Final measurement

Run `npm run build`; produce the before/after table for shared chunk, `/`,
the two MDX routes, and `/playground/motion-systems`.

**Verify**: build exits 0; no measured route regressed; table in report.

## Test plan

No unit test runner by policy. Behavioral regression list:

1. MDX shortcodes on three project pages (palettes, carousel + fade,
   videos, image modals, device frame) — render and interact.
2. All chrome morphs and icons (header, mode toggle, search, video
   controls).
3. Pixel morph demos (post + playground) across strategies.
4. No `console.warn` from the new PixelMorph guard during normal browsing
   (a warning means a morph name landed outside its loaded module — fix the
   module assignment, don't silence the warning).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `rg -n 'from "@/components/icons-pixel"' components/header components/mode-toggle.tsx components/site-search.tsx components/video.tsx components/footer* components/pixel-morph.tsx` → no matches
- [ ] `rg -n 'import \{ Video \}|import \{ ImageModal \}|import \{ ProjectImageCarousel \}' mdx-components.tsx` → no static matches (dynamic wrappers instead)
- [ ] `rg -n 'import \* as PixelIcons' components/playground/motion/` → no matches
- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0; shared First Load JS and `/playground/motion-systems` both below baseline
- [ ] Behavioral regression list passes
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `next/dynamic` server-rendered wrappers break MDX static generation
  (build errors on `content/projects/*.mdx` pages) after one fix attempt.
- The icon split surfaces a morph call site whose from/to icons live in
  different modules that aren't both loaded — report the pairing; do not
  merge modules to paper over it.
- Shared First Load JS does NOT drop after Step 3 (the hypothesis that
  `icons-pixel` dominates the shared chunk is wrong) — report the numbers;
  do not keep splitting other modules chasing the delta.
- Circular imports appear between `icons-pixel.tsx` and
  `pixel-icons/core.tsx` that re-exports can't resolve cleanly.

## Maintenance notes

- New icons: define chrome-adjacent icons in `pixel-icons/chrome.tsx`,
  everything else in `icons-pixel.tsx`; both register into the same
  runtime registry via `createPixelIcon`.
- New heavy MDX shortcodes (anything pulling a media/animation library)
  should be added via the dynamic-wrapper pattern in `mdx-components.tsx`.
- AGENTS.md references `components/icons-pixel.tsx` as the morphable-icon
  home — update those lines when this lands (Learned Workspace Facts,
  pixel-morph entries).
- Reviewer: check that no icon renders differently (the split moves code
  verbatim), and that `pixel-morph.tsx`'s guard warns instead of throwing.
