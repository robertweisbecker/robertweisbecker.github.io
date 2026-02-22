import { Article } from "@/components/article";
import { ImageToggle } from "@/components/image-toggle";
import { LayoutGrid } from "@/components/layout-grid";
import { LinkOut } from "@/components/link-out";
import { Heading } from "@/components/ui/heading";

export default function NPRMaps() {
  return (
    <Article pageKey="npr-maps">
      <ImageToggle
        before="/assets/npr/map-before.png"
        after="/assets/npr/map-after.png"
      />

      <div className="flex flex-col gap-8">
        <Heading>Background</Heading>
        <p>
          As NPR&apos;s in-house technology research &amp; development center,
          NPR Labs provides a variety of tools to assist public broadcasters
          nationwide, including the Mapping and Population System (MAPS), a web
          app that displays reception coverage maps for all public radio and
          television stations in the US.
        </p>
        <p>
          NPR affiliates nationwide — member station managers, underwriters,
          engineers — use MAPS to inform decision-making around station planning
          efforts, such as improving reception or adding new services. First
          released in 2011, it remained largely unchanged since.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Goals</Heading>
        <p>
          During my internship in the spring of 2017, I worked as part of a
          small team to build a new version of the tool from the ground up.
        </p>
        <p>
          Our main goals for this redesign effort were to overhaul the interface
          for better usability and increase performance. We decided to use Vue
          and Mapbox, which provided additional customizability and performance
          in rendering the map view.
        </p>
        <ul className="list-disc space-y-4 ps-5">
          <li>
            <b>Revamp the interface:</b> modernize look &amp; feel and align it
            with the larger NPR brand
          </li>
          <li>
            <b>Enhance utility:</b> Find opportunities to improve usability and
            provide more information about stations
          </li>
          <li>
            <b>Strengthen reliability:</b> Refresh data sources and optimize
            performance
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Component-ization</Heading>
        <p>
          At the time, NPR&apos;s mobile apps used a variation of Material
          Design. Since we were using Vue, we imported components from{" "}
          <LinkOut
            href="https://www.creative-tim.com/vuematerial/"
            text="Vue Material"
          />{" "}
          and tailored them to our needs — re-theming them to match NPR&apos;s
          apps and composing them to create more complex application-specific
          components.
        </p>
        <img src="/assets/npr/map-ui.png" alt="MAPS user interface" />

        <Heading level={3}>Station Cards</Heading>
        <p>
          Initially, stations were listed in the sidebar with only their
          callsigns as identifiers.
        </p>
        <p>
          We expanded these list items into cards that included each
          station&apos;s callsign, location, and logo, along with labeled
          controls to differentiate between coverages and contour toggles.
        </p>
        <div className="overflow-hidden rounded-xl bg-muted p-2 shadow-inner lg:p-4">
          <img
            src="/assets/npr/map-sidebar.png"
            alt="Station sidebar cards"
            className="mx-auto max-w-[280px] shadow-2xl"
          />
        </div>

        <Heading level={3}>Station Detail</Heading>
        <p>
          To accommodate the need for more in-depth station information, we added
          a detail view in the sidebar when users clicked on a station.
          Demographic information, previously located in a modal, was moved into
          the station detail view to provide access without navigating away from
          the map.
        </p>
        <div className="overflow-hidden rounded-xl bg-muted p-2 shadow-inner lg:p-4">
          <img src="/assets/npr/map-detail.png" alt="Station detail view" />
        </div>

        <Heading level={3}>Navigation &amp; Controls</Heading>
        <p>
          MAPS features a search bar allowing users to search for stations by
          callsign, address, or location. This moved into a main navbar element
          that emphasized the search field, while secondary settings and filters
          became dropdowns.
        </p>

        <Heading level={4}>Filtering</Heading>
        <p>
          Stations displaying active contours or coverages were previously only
          discoverable via their active button state in the sidebar list. If an
          active station didn&apos;t appear in a user&apos;s search results,
          there was no way to quickly reference the active station apart from
          locating it on the map.
        </p>
        <p>
          To solve this, a bar displaying active stations was overlaid on the top
          edge of the map, with chips representing each station. Clicking a
          station chip would navigate to the station and open its details in the
          sidebar.
        </p>
        <div className="overflow-hidden rounded-xl bg-muted p-2 shadow-inner lg:p-4">
          <video width="100%" height="auto" controls playsInline>
            <source
              src="/assets/npr/maps-desktop-settings-720.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <LayoutGrid variant="twoUp">
          <div className="flex flex-col gap-5">
            <Heading>Responsiveness</Heading>
            <p>
              Perhaps the most significant change was the newly-responsive
              design. On a phone, there simply isn&apos;t enough real estate to
              pan around a map and see detailed information, so we decided that
              modality was the best course of action.
            </p>
            <p>
              List and map views collapse atop one another on small devices, and
              the search bar remains persistent for discoverability. Users can
              easily toggle between list and map views by tapping an icon button
              in the nav.
            </p>
            <p>
              Rather than creating a new component, we were able to repurpose our
              new station card component, restyling them as drawers in map mode,
              to let users access station information without having to toggle
              views.
            </p>
          </div>
          <video
            className="mx-auto max-w-72 rounded-[36px] shadow-lg"
            width="100%"
            height="auto"
            controls
            playsInline
          >
            <source src="/assets/npr/maps-mobile-1.mov" />
          </video>
        </LayoutGrid>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Conclusion</Heading>
        <p>
          With this redesign effort, we managed to tackle many of the problems we
          were tasked with addressing. In updating the tech stack, we managed to
          improve performance and reduce the friction of loading large amounts of
          data.
        </p>
        <p>
          The creation of responsive components allowed users to access station
          information and engage with the map, while also allowing us to
          introduce elements of NPR&apos;s brand that had evolved in the years
          since the tool&apos;s inception.
        </p>
        <p>
          It also added some degree of future-proofing: by nature, components
          will always be more scalable and maintainable than ad-hoc features.
          Meanwhile, surfacing more detailed information in the sidebar offers
          essential information at a glance, simplifying the decision-making
          process for station planning efforts, and ultimately, better serving
          public broadcasters across the United States.
        </p>
      </div>
    </Article>
  );
}
