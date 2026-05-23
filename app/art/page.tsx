import type { Metadata } from "next";

import donuts2009 from "@/public/art/2009_donuts.jpg";
import bike2011 from "@/public/art/2011_bike.jpeg";
import oilWarhol2011 from "@/public/art/2011_oil_warhol.png";
import portraitOne2011 from "@/public/art/2011_portrait-1.jpg";
import portraitTwo2011 from "@/public/art/2011_portrait-2.jpg";
import self2011 from "@/public/art/2011_self.jpeg";
import manEnhanced2012 from "@/public/art/2012_man-enhanced.jpeg";
import manSeated2012 from "@/public/art/2012_man-seated.png";
import sculptureEnhanced2012 from "@/public/art/2012_sculpture-enhanced.jpeg";
import womanPencil2012 from "@/public/art/2012_woman-pencil.png";
import womanSeated2012 from "@/public/art/2012_woman-seated.jpeg";
import self2013 from "@/public/art/2013_self.jpeg";
import bm2014 from "@/public/art/2014_bm.jpeg";
import ad2016 from "@/public/art/2016_ad.jpeg";
import selfEnhanced2016 from "@/public/art/2016_self-enhanced.jpeg";
import x2017 from "@/public/art/2017_x.jpeg";
import self2018 from "@/public/art/2018_self.jpeg";
import cal2020 from "@/public/art/2020_cal.jpeg";
import gr2020 from "@/public/art/2020_gr.jpeg";
import rrp2020 from "@/public/art/2020_rrp.jpeg";
import gb2021 from "@/public/art/2021_gb.jpeg";
import cm2022 from "@/public/art/2022_937.jpeg";
import lola2023 from "@/public/art/2023_lola.jpeg";
import gr2024 from "@/public/art/2024_gr.jpeg";
import m2024 from "@/public/art/2024_m.jpeg";
import otis2024 from "@/public/art/2024_otis.jpeg";
import at2025 from "@/public/art/2025_at.jpeg";
import br2025 from "@/public/art/2025_br.jpeg";
import chi2025 from "@/public/art/2025_chi.jpeg";
import ruth2025 from "@/public/art/2025_ruth.jpeg";
import sprayBasquiat2010 from "@/public/art/2010_spray-basquiat.jpeg";
import sprayCig2010 from "@/public/art/2010_spray-cig.jpeg";

import { Artwork } from "./artwork";
import { LinkOut } from "@/components/link-out";

export const metadata: Metadata = {
  title: "Artwork",
  description: "Mixed media, mixed messages?",
};

export default function ArtPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4">
      {/* <ToggleGroup defaultValue={["people"]} className="md:*:size-20 md:*:h-auto md:*:flex-col" spacing={1}>
        <ToggleGroupItem value="digital">
          <img
            src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-dgzgthbY1fTg7e1ziv14H8ePhGJ73U.png&w=1000&q=75"
            className="-mx-1. size-5 md:size-8"
          />
          Digital
        </ToggleGroupItem>
        <ToggleGroupItem value="pencil">
          <img
            src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-YUEZ0IvV1QebqCy2NeJ36SQME8NGS1.png&w=1000&q=75"
            className="-mx-1 size-5 md:size-8"
          />
          Pencil
        </ToggleGroupItem>
        <ToggleGroupItem value="charcoal">
          <img src="/art/charcoal-icon.png" className="-mx-1 size-5 md:size-8" />
          Charcoal
        </ToggleGroupItem>
        <ToggleGroupItem value="spraypaint">
          <img
            src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-b1arzaCW7ieTpMEVcgUaEsXhFAAgBr.png&w=1000&q=75"
            className="-mx-1 size-5 md:size-8"
          />
          Spraypaint
        </ToggleGroupItem>
        <ToggleGroupItem value="oil">
          <img
            src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-hhVqFu1sg6v1QATWIeell81SyoAVC2.png&w=1000&q=75"
            className="-mx-1 size-5 md:size-8"
          />
          Oil
        </ToggleGroupItem>
      </ToggleGroup> */}
      <div className="grid w-full grid-cols-[auto_1fr] gap-4 sm:gap-12">
        <h1 className="line-b mb-4 self-baseline text-h1">Artwork</h1>
        <p className="mb-4 self-baseline text-sm text-balance text-muted-foreground">
          Recent: iPad Pro with <LinkOut href="https://www.procreate.com" text="Procreate" className="underline-offset-1" />. Earlier:
          pencil, charcoal, oil. 2009—now.
        </p>

        <div className="relative">
          <h2 className="sticky top-20 self-start font-pixel text-2xs uppercase max-sm:-rotate-180 max-sm:[writing-mode:vertical-rl]">
            People
          </h2>
        </div>
        <section className="line-y columns-2 gap-4 md:columns-3">
          <Artwork year={2025} src={br2025} title="Brent and Nellie" medium="digital" loading="eager" />
          <Artwork year={2020} src={gr2020} title="Chita" medium="digital" loading="eager" />
          <Artwork year={2025} src={at2025} title="Ashtyn" medium="digital" loading="eager" />
          <Artwork year={2017} src={x2017} title="Christian" medium="digital" loading="eager" />
          <Artwork year={2024} src={m2024} title="Madelin" medium="digital" loading="eager" />
          <Artwork year={2020} src={rrp2020} title="Mr. P & Callie" medium="digital" loading="eager" />
          <Artwork year={2025} src={ruth2025} title="Ruth" medium="digital" loading="eager" />
          <Artwork year={2016} src={ad2016} title="Adrian" medium="oil" loading="eager" />
          <Artwork year={2021} src={gb2021} title="Jerry & Rhys" medium="digital" loading="eager" />
        </section>

        <div className="relative">
          <h2 className="sticky top-20 self-start font-pixel text-2xs uppercase max-sm:-rotate-180 max-sm:[writing-mode:vertical-rl]">
            Places
          </h2>
        </div>
        <section className="line-y columns-2 gap-4">
          <Artwork year={2025} src={chi2025} title="Harold Washington Library, Chicago" medium="digital" />
          <Artwork year={2022} src={cm2022} title="937 Beach" medium="digital" />
        </section>

        <div className="relative">
          <h2 className="sticky top-20 self-start font-pixel text-2xs uppercase max-sm:-rotate-180 max-sm:[writing-mode:vertical-rl]">
            Pets
          </h2>
        </div>
        <section className="line-y columns-2 gap-4">
          <Artwork year={2024} src={otis2024} title="Otis" medium="digital" />
          <Artwork year={2023} src={lola2023} title="Lola" medium="digital" />
          <Artwork year={2020} src={cal2020} title="Callie" medium="digital" />
          <Artwork year={2024} src={gr2024} title="Gracie" medium="digital" />
        </section>

        <div className="relative">
          <h2 className="sticky top-20 self-start font-pixel text-2xs uppercase max-sm:-rotate-180 max-sm:[writing-mode:vertical-rl]">
            Portraits
          </h2>
        </div>
        <section className="line-y columns-2 gap-4">
          <Artwork year={2018} src={self2018} title="Self" />
          <Artwork year={2016} src={selfEnhanced2016} title="Self" medium="charcoal" />
          <Artwork year={2011} src={self2011} title="Self with fronds" />
          <Artwork year={2013} src={self2013} title="Self from above" medium="oil" />
        </section>

        <div className="relative">
          <h2 className="sticky top-20 self-start font-pixel text-2xs uppercase max-sm:-rotate-180 max-sm:[writing-mode:vertical-rl]">
            Poses
          </h2>
        </div>
        <section className="line-y columns-3 gap-4">
          <Artwork year={2012} src={manSeated2012} medium="charcoal" />
          <Artwork year={2012} src={womanPencil2012} medium="graphite" />
          <Artwork year={2012} src={manEnhanced2012} medium="charcoal" />
          <Artwork year={2012} src={womanSeated2012} medium="charcoal" />
          <Artwork year={2011} src={portraitTwo2011} title="Sam" medium="graphite" />
          <Artwork year={2011} src={portraitOne2011} title="Allan" medium="graphite" />
          <Artwork year={2014} src={bm2014} title="Ben" medium="charcoal" />
        </section>

        <div className="relative">
          <h2 className="sticky top-20 self-start font-pixel text-2xs uppercase max-sm:-rotate-180 max-sm:[writing-mode:vertical-rl]">
            Misc.
          </h2>
        </div>
        <section className="line-y columns-2 gap-4">
          <Artwork year={2012} src={sculptureEnhanced2012} title="UMMA" medium="charcoal" />
          <Artwork year={2011} src={oilWarhol2011} title="Still life" medium="oil" />
          <Artwork year={2011} src={bike2011} title="Bicycle" medium="graphite" />
          <Artwork year={2009} src={donuts2009} medium="oil" />
          <Artwork year={2010} src={sprayBasquiat2010} title="Basquiat" medium="spraypaint" />
          <Artwork year={2011} src={sprayCig2010} title="Blue girl" medium="spraypaint" />
        </section>
      </div>
    </div>
  );
}
