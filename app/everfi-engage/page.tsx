import { Article } from "@/components/article";
import { Heading } from "@/components/ui/heading";
import { LayoutGrid } from "@/components/layout-grid";
import { LinkOut } from "@/components/link-out";

export default function EverfiEngage() {
  return (
    <Article pageKey="engage">
      <img src="/assets/engage/engage-1.png" alt="Engage product overview" />

      <div className="flex flex-col gap-8">
        <Heading>About</Heading>
        <p>
          Engage allows financial institutions to deliver in-person financial
          education to their customers and the community via guided workshop
          events at their branches. The product consists of 13 digital learning
          modules covering personal finance &amp; money management, small
          business operations, and home ownership.
        </p>

        <Heading>Audience</Heading>
        <p>
          Engage workshops are geared toward low- to moderate-income adults,
          families, and small business owners. In order to help these users feel
          at ease with weighty topics, the visual design relied on soft colors
          and springy animation, and content was written in a casual and
          approachable tone.
        </p>
        <div>
          <img src="/assets/engage/bbva-1.png" alt="Engage in-person workshops" />
          <p className="mt-1 text-xs text-muted-foreground">
            Engage in-person workshops
          </p>
        </div>

        <Heading>Component Library</Heading>
        <p>
          Upon joining the project, I had the team migrate existing designs from
          Adobe XD to Sketch, so that we could use it to build a reusable
          component library that would let us rapidly execute and iterate. That
          change in process led to the creation of a template library containing
          40+ unique pages in mobile, tablet, and desktop sizes.
        </p>
        <div>
          <img
            src="/assets/engage/engage-components.png"
            alt="A collection of components recreated in Sketch"
            className="rounded-lg"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            A collection of components recreated in Sketch
          </p>
        </div>
        <div>
          <img
            src="/assets/engage/engage-templates.png"
            alt="Template library"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Template library
          </p>
        </div>

        <Heading>Interactions</Heading>
        <p>
          To prototype new interactions, I learned to use Flinto, Framer, and
          Invision Studio, and freshened up on HTML/CSS to ship code directly to
          developers.
        </p>
        <p>A sampling of these are below:</p>

        <LayoutGrid variant="twoUp">
          <div>
            <div className="overflow-hidden rounded-2xl border-8 border-border">
              <video width="100%" height="auto" controls>
                <source
                  src="/assets/engage/engage-facilitator-script-drawer.mov"
                  type="video/mp4"
                />
              </video>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Workshop facilitators can access their script at any time by
              tapping a persistent tab on the left edge.
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-2xl border-8 border-border">
              <video width="100%" height="auto" controls>
                <source src="/assets/engage/carousel.mov" type="video/mp4" />
              </video>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Carousel component with some light animation to focus
              users&apos; attention
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-2xl border-8 border-border">
              <video width="100%" height="auto" controls>
                <source
                  src="/assets/engage/card-expand.mov"
                  type="video/mp4"
                />
              </video>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Maintaining continuity via animation
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-2xl border-8 border-border">
              <video width="100%" height="auto" controls>
                <source
                  src="/assets/engage/Engage-Circle-Progression.mov"
                  type="video/mp4"
                />
              </video>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Spicing up an ordered list
            </p>
          </div>
        </LayoutGrid>
      </div>

      <p>
        Read more about Engage on{" "}
        <LinkOut
          href="https://everfi-curriculums.s3.amazonaws.com/curriculums/engage-content/develop/index.html#"
          text="everfi.com"
        />
      </p>
    </Article>
  );
}
