import { TreeIconFile } from "@/components/icons-tree";
import { FoldedCardDemo } from "@/components/demos/folded-card-demo";
import { PlaygroundRouteNav } from "@/components/blocks/playground-route-nav";

export default function PlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 md:gap-16">
      <h1 className="w-full text-h1">Playground</h1>
      <FoldedCardDemo />

      <div className="group/tab-bar flex h-12 w-full items-center justify-center bg-[#070707]">
        <div className="group relative isolate flex h-7 max-w-[200px] items-center overflow-hidden rounded-md bg-transparent text-xs font-medium text-zinc-400 transition-colors squircle group-hover/tab-bar:bg-neutral-900/30 group-hover/tab-bar:hover:bg-neutral-800/60 group-hover/tab-bar:hover:text-zinc-200">
          <button
            type="button"
            title="untitled"
            className="relative z-0 flex h-full min-w-0 flex-1 items-center gap-1.5 rounded-md pr-3 pl-2 text-left"
          >
            <TreeIconFile className="h-4 w-4 shrink-0 text-white/40" />
            <span className="block truncate">untitled</span>
          </button>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-linear-to-l from-neutral-900 via-neutral-900 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          />

          <button
            type="button"
            title="Close tab"
            aria-label="Close untitled"
            className="absolute top-1/2 right-1 z-20 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm bg-neutral-800 text-neutral-500 opacity-0 transition-opacity squircle group-hover:opacity-100 hover:text-zinc-100 focus:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentcolor"
              viewBox="0 0 16 16"
              width={16}
              height={16}
              className="pi h-3 w-3"
              aria-hidden="true"
            >
              <path d="M3.22 3.22a.75.75 0 0 1 1.06 0L8 6.94l3.72-3.72a.75.75 0 1 1 1.06 1.06L9.06 8l3.72 3.72a.75.75 0 1 1-1.06 1.06L8 9.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06L6.94 8 3.22 4.28a.75.75 0 0 1 0-1.06" />
            </svg>
          </button>
        </div>
      </div>

      <PlaygroundRouteNav size="md" />
    </div>
  );
}
