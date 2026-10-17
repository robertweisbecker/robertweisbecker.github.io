import { HeaderHome } from "@/components/blocks/header/header-link";
import { toHeaderMenuProjects } from "@/lib/data/menu";
import { NavLinks } from "@/components/blocks/header/header-group";
import { ThemeActions } from "@/components/blocks/header/header-theme-control";
import { WorkMenu } from "@/components/blocks/header/header-menu";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function Header() {
  const menuProjects = toHeaderMenuProjects(projects);

  return (
    <nav className={cn("sticky top-0 isolate z-50 pt-[env(safe-area-inset-top,0px)]")} style={{ viewTransitionName: "site-header" }}>
      <div className="mx-auto flex h-12 max-w-7xl items-center gap-1 py-2 pr-[max(0.5rem,env(safe-area-inset-right,0px))] pl-[max(0.5rem,env(safe-area-inset-left,0px))] *:z-2">
        <HeaderHome />
        <div className="me-auto" />
        <WorkMenu projects={menuProjects} />
        <NavLinks />
        <ThemeActions />
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-[env(safe-area-inset-top,0px)] isolate -z-1 h-20 transform-gpu",
          "via-smooth overflow-hidden bg-linear-to-b from-background from-25% to-background/0"
        )}
      >
        <div className="absolute inset-0 mask-b-from-black mask-b-from-10% mask-b-to-black/0 backdrop-blur-xs" />
        <div className="absolute inset-0 mask-b-from-black mask-b-from-25% mask-b-to-black/0 backdrop-blur-lg" />
      </div>
      {/* Safari samples fixed edge backgrounds. Keep this above the filtered layers,
          inside the gradient's already-opaque first 20px, and below nav controls. */}
      <div
        aria-hidden="true"
        data-slot="header-chrome-tint"
        className="pointer-events-none fixed inset-x-0 top-0 z-1 h-[calc(0.75rem+env(safe-area-inset-top,0px))] bg-background"
      />
    </nav>
  );
}
