# React Doctor Latest Run

- Checked commit: `61bf9081a243`
- Checked at: 2026-07-02T20:36:12-0700
- Command: `env PATH=/Users/robertweisbecker/.nvm/versions/node/v24.9.0/bin:/usr/bin:/bin:/usr/sbin:/sbin npm_config_cache=/private/tmp/codex-npm-cache /Users/robertweisbecker/.nvm/versions/node/v24.9.0/bin/npx react-doctor@latest --verbose`
- Exit code: 0
- Score: 58/100
- Total diagnostics: 480
- Error count: 0
- Warning count: 480
- Share: https://react.doctor/share?p=bob-fyi&s=58&w=480&f=96

## Next Actionable Items

No major issues found. Top 10 warning rule groups by violation count:

1. `react-doctor/only-export-components` — Maintainability — 152 warnings
   Docs: https://react.doctor/docs/rules/react-doctor/only-export-components
   Objective: move non-component exports out of component files so Fast Refresh can preserve state.
   Representative links: [components/animation/MotionText.tsx:616](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/MotionText.tsx:616), [components/animation/dot-matrix.tsx:152](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/dot-matrix.tsx:152), [components/animation/dot-matrix.tsx:245](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/dot-matrix.tsx:245)
   Remaining instances not listed: 149

2. `react-doctor/no-multi-comp` — Maintainability — 13 warnings
   Docs: https://react.doctor/docs/rules/react-doctor/no-multi-comp
   Objective: split multi-component files where secondary components make the module harder to review and change.
   Representative links: [components/chrome-tabs.tsx:20](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/chrome-tabs.tsx:20), [components/chrome-tabs.tsx:28](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/chrome-tabs.tsx:28), [components/chrome-tabs.tsx:50](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/chrome-tabs.tsx:50)
   Remaining instances not listed: 10

3. `react-doctor/no-array-index-as-key` — Bugs — 8 warnings
   Docs: https://react.doctor/docs/rules/react-doctor/no-array-index-as-key
   Objective: replace index keys with stable semantic ids where list reordering or filtering could misbind state.
   Representative links: [components/animation/MotionText.tsx:189](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/MotionText.tsx:189), [components/animation/MotionText.tsx:335](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/MotionText.tsx:335), [components/animation/MotionText.tsx:401](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/MotionText.tsx:401)
   Remaining instances not listed: 5

4. `react-doctor/js-combine-iterations` — Performance — 6 warnings
   Docs: https://react.doctor/docs/rules/react-doctor/js-combine-iterations
   Objective: collapse chained array iteration passes into one pass where the code stays readable.
   Representative links: [app/api/letterboxd/route.ts:92](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/api/letterboxd/route.ts:92), [app/private/testing/direction-e/page.private.tsx:718](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/private/testing/direction-e/page.private.tsx:718), [components/header/menu-data.ts:18](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/header/menu-data.ts:18)
   Remaining instances not listed: 3

5. `react-doctor/no-event-handler` — Bugs — 5 warnings
   Docs: https://react.doctor/docs/rules/react-doctor/no-event-handler
   Objective: move event-triggered side effects out of `useEffect` and back into the originating event path.
   Representative links: [components/ui/carousel.tsx:73](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/ui/carousel.tsx:73), [components/ui/carousel.tsx:74](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/ui/carousel.tsx:74), [components/ui/carousel.tsx:87](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/ui/carousel.tsx:87)
   Remaining instances not listed: 2

6. `react-doctor/exhaustive-deps` — Bugs — 4 warnings
   Docs: https://react.doctor/docs/rules/react-doctor/exhaustive-deps
   Objective: audit each effect callback and either stabilize recreated values or intentionally revise the dependency model.
   Representative links: [app/private/testing/direction-e/page.private.tsx:187](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/private/testing/direction-e/page.private.tsx:187), [components/animation/dvd-animation.tsx:413](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/dvd-animation.tsx:413), [components/animation/pixel-dino.tsx:34](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/pixel-dino.tsx:34)
   Remaining instances not listed: 1

7. `react-doctor/control-has-associated-label` — Accessibility — 4 warnings
   Docs: https://react.doctor/docs/rules/react-doctor/control-has-associated-label
   Objective: ensure each interactive control has visible text or an accessible label readable by screen readers.
   Representative links: [app/about/page.tsx:57](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/about/page.tsx:57), [app/about/page.tsx:62](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/about/page.tsx:62), [app/about/page.tsx:71](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/about/page.tsx:71)
   Remaining instances not listed: 1

8. `react-doctor/anchor-has-content` — Accessibility — 4 warnings
   Docs: https://react.doctor/docs/rules/react-doctor/anchor-has-content
   Objective: add readable text or accessible labeling to anchors that currently announce nothing.
   Representative links: [app/about/page.tsx:57](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/about/page.tsx:57), [app/about/page.tsx:62](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/about/page.tsx:62), [app/about/page.tsx:71](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/about/page.tsx:71)
   Remaining instances not listed: 1

9. `react-doctor/no-dynamic-import-path` — Performance — 4 warnings
   Docs: https://react.doctor/docs/rules/react-doctor/no-dynamic-import-path
   Objective: replace dynamic import path interpolation with static import strings so bundling can split correctly.
   Representative links: [app/[slug]/layout.tsx:14](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/[slug]/layout.tsx:14), [app/[slug]/opengraph-image.tsx:16](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/[slug]/opengraph-image.tsx:16), [app/[slug]/page.tsx:12](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/[slug]/page.tsx:12)
   Remaining instances not listed: 1

10. `react-doctor/no-giant-component` — Maintainability — 4 warnings
    Docs: https://react.doctor/docs/rules/react-doctor/no-giant-component
    Objective: split oversized page components into smaller sections with clearer ownership boundaries.
    Representative links: [app/page.tsx:71](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/page.tsx:71), [app/posts/tab-indicator/page.tsx:293](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/posts/tab-indicator/page.tsx:293), [app/private/qa/component-demos.tsx:326](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/private/qa/component-demos.tsx:326)
    Remaining instances not listed: 1

## stdout

```text
React Doctor v0.6.1

See /private/tmp/react-doctor.stdout for the full captured terminal output from this run.
```

## stderr

```text

```
