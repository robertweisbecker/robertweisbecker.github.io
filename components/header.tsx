import { HomeLink } from "@/components/header/home-link";
import { toHeaderMenuProjects } from "@/components/header/menu-data";
import { NavLinks } from "@/components/header/nav-links";
import { ThemeActions } from "@/components/header/theme-actions";
import { WorkMenu } from "@/components/header/work-menu";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function Header() {
  const menuProjects = toHeaderMenuProjects(projects);

  return (
    <nav className={cn("sticky top-0 isolate z-50 bg-linear-to-b from-[canvas]")}>
      <div className="mx-auto flex h-12 max-w-7xl items-center gap-1 py-2 max-sm:px-2">
        <HomeLink />
        <div className="me-auto" />
        <WorkMenu projects={menuProjects} />
        <NavLinks />
        <ThemeActions />
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 isolate -z-1 h-20 transform-gpu",
          "via-smooth overflow-hidden bg-linear-to-b from-background from-25% to-background/0"
        )}
      >
        <div className="absolute inset-0 mask-b-from-black mask-b-from-10% mask-b-to-black/0 backdrop-blur-xs" />
        <div className="absolute inset-0 mask-b-from-black mask-b-from-25% mask-b-to-black/0 backdrop-blur-md" />
      </div>
    </nav>
  );
}
