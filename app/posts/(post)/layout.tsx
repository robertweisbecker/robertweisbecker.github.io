import { PostHeader, PostRouteTableOfContents } from "../post-header";
import { PostPagination } from "../post-pagination";

export default function PostDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl gap-8 max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-[14rem_minmax(0,1fr)_14rem]">
      {/* <div
        className="absolute inset-0 -z-1"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 79px, color-mix(in srgb,var(--destructive) 50%, transparent) 79px, color-mix(in srgb, var(--destructive) 50%, transparent) 80px, transparent 80px), linear-gradient(color-mix(in srgb, var(--border) 50%, transparent) .0625rem, transparent .0625rem)",
          backgroundSize: "100% 1.5rem",
        }}
      /> */}
      <aside id="toc" className="not-prose @container-[scroll-state] self-start max-lg:hidden lg:sticky lg:top-32">
        <PostRouteTableOfContents contentId="post-content" />
      </aside>

      <div className="col-start-2 flex min-w-0 flex-col items-center gap-6">
        {/* post title */}
        <PostHeader />
        <article id="post-content" className="w-full min-w-0">
          {children}
        </article>
        <PostPagination />
      </div>

      <div className="max-lg:hidden" aria-hidden />
    </div>
  );
}
