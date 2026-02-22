import { RiHandHeartLine, RiEyeLine } from "@remixicon/react";
import { Heading } from "@/components/ui/heading";
import { ProjectGrid } from "@/components/project-grid";
import { LinkOut } from "@/components/link-out";

export default function Home() {
  return (
    <div className="mt-10 flex flex-col gap-10">
      <img
        src="/assets/blob.png"
        alt=""
        className="pointer-events-none fixed left-1/2 top-1/2 -z-10 h-[100vmin] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80 sm:left-3/4"
      />

      <div className="h-4" />

      <div className="group flex items-center gap-2">
        <RiHandHeartLine className="size-4 -scale-x-100 rotate-[30deg] text-primary transition-transform duration-500 group-hover:-rotate-[30deg]" />
        <Heading level={6}>Howdy partner</Heading>
      </div>

      <div>
        <p className="text-2xl font-light leading-relaxed text-muted-foreground">
          I&apos;m currently designing design systems
          <br /> &amp; systems for designers at <br />
          <span className="-ms-1">
            <LinkOut
              href="https://www.everfi.com"
              text="EVERFI"
              src="/assets/logos/everfi-icon.png"
              className="font-bold text-foreground"
            />
            <span className="mx-2">+</span>
            <LinkOut
              href="https://www.blackbaud.com"
              text="Blackbaud"
              src="/assets/logos/blackbaud-logo.png"
              className="font-bold text-foreground"
            />
          </span>
        </p>
      </div>

      <div className="h-4" />

      <div className="flex items-center gap-2">
        <RiEyeLine className="size-4 text-primary" />
        <Heading level={6} id="projects">Take a gander</Heading>
      </div>

      <ProjectGrid />

      <div className="h-4" />
    </div>
  );
}
