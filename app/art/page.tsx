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
import lola2023 from "@/public/art/2023_lola.jpeg";
import self2023 from "@/public/art/2023_self.jpeg";
import gr2024 from "@/public/art/2024_gr.jpeg";
import m2024 from "@/public/art/2024_m.jpeg";
import at2025 from "@/public/art/2025_at.jpeg";
import br2025 from "@/public/art/2025_br.jpeg";
import chi2025 from "@/public/art/2025_chi.jpeg";
import ruth2025 from "@/public/art/2025_ruth.jpeg";

import { Artwork } from "./artwork";

export const metadata: Metadata = {
  title: "Artwork",
  description: "Mixed media, mixed messages?",
};

export default function ArtPage() {
  return (
    <div className="container mx-auto max-w-6xl space-y-12">
      <section>
        <h1 className="mb-4 text-h1">Artwork</h1>
        <p className="text-sm text-balance text-muted-foreground">Mixed media / mixed messages</p>
      </section>

      <div className="grid grid-cols-[auto_1fr] gap-12">
        <div className="relative">
          <h2 className="sticky top-20 self-start text-lg font-[550] tracking-[-0.01em]">People</h2>
        </div>
        <section className="columns-2 gap-4 md:columns-3">
          <Artwork year={2025} src={br2025} title="Nellie" medium="digital" />
          <Artwork year={2020} src={gr2020} title="Chita" medium="digital" />
          <Artwork year={2025} src={at2025} title="Ashtyn" medium="digital" />
          <Artwork year={2017} src={x2017} title="Pitango" medium="digital" />
          <Artwork year={2024} src={m2024} title="Madelin" medium="digital" />
          <Artwork year={2020} src={rrp2020} title="Handheld" medium="digital" />
          <Artwork year={2025} src={ruth2025} title="Ruth" medium="digital" />
          <Artwork year={2021} src={gb2021} title="Truck" medium="digital" />

          {/* <Artwork year={2017} src="2017_x2.jpeg" aspectRatio="3/4" /> */}
        </section>

        <div className="relative">
          <h2 className="sticky top-20 self-start text-lg font-[550] tracking-[-0.01em]">Places</h2>
        </div>
        <section className="grid grid-cols-3 gap-4">
          <Artwork year={2025} src={chi2025} title="Library" medium="digital" />
        </section>

        <div className="relative">
          <h2 className="sticky top-20 self-start text-lg font-[550] tracking-[-0.01em]">Pets</h2>
        </div>
        <section className="grid grid-cols-3 gap-4">
          <Artwork year={2024} src={gr2024} title="Gracie" medium="digital" />
          <Artwork year={2023} src={lola2023} title="Lola" medium="digital" />
          <Artwork year={2020} src={cal2020} />
        </section>

        <div className="relative">
          <h2 className="sticky top-20 self-start text-lg font-[550] tracking-[-0.01em]">Portraits</h2>
        </div>
        <section className="columns-3 gap-4">
          <Artwork year={2018} src={self2018} />
          <Artwork year={2016} src={selfEnhanced2016} title="Self" medium="charcoal" />
          <Artwork year={2011} src={self2011} />
          <Artwork year={2013} src={self2013} title="Self from above" medium="oil" />
        </section>

        <div className="relative">
          <h2 className="sticky top-20 self-start text-lg font-[550] tracking-[-0.01em]">Poses</h2>
        </div>
        <section className="grid grid-cols-2 gap-4">
          <Artwork year={2012} src={manSeated2012} medium="charcoal" />
          <Artwork year={2012} src={womanPencil2012} />
          <Artwork year={2012} src={manEnhanced2012} />
          <Artwork year={2012} src={womanSeated2012} />
          <Artwork year={2011} src={portraitTwo2011} title="Sam" medium="graphite" />
          <Artwork year={2011} src={portraitOne2011} title="Allan" medium="graphite" />
          <Artwork year={2014} src={bm2014} title="Ben" medium="charcoal" />
        </section>
        <div className="relative">
          <h2 className="sticky top-20 self-start text-lg font-[550] tracking-[-0.01em]">Paint</h2>
        </div>
        <section className="grid grid-cols-3 gap-4">
          <Artwork year={2016} src={ad2016} title="Adrian" medium="oil" />
        </section>

        <div className="relative">
          <h2 className="sticky top-20 self-start text-lg font-[550] tracking-[-0.01em]">Paraphernalia</h2>
        </div>
        <section className="grid grid-cols-3 gap-4">
          <Artwork year={2012} src={sculptureEnhanced2012} />
          <Artwork year={2011} src={oilWarhol2011} medium="oil" />
          <Artwork year={2011} src={bike2011} medium="graphite" className="col-span-2" />
          <Artwork year={2009} src={donuts2009} medium="oil" />
        </section>
      </div>
    </div>
  );
}
