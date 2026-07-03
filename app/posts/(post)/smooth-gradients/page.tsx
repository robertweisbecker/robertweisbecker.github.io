import { CodeBlock } from "@/components/code-block";
import { DemoContainer } from "@/components/demo";
import { LinkOut } from "@/components/link-out";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Code } from "@/components/ui/code";
import { Heading } from "@/components/ui/heading";
import { GithubIcon } from "@/components/icons";

const colorGradientCode = `<div class="bg-linear-to-r from-yellow-300 to-pink-500" />
<div class="bg-linear-to-r from-yellow-300 to-pink-500 via-smooth" />
`;

const colorGradientCode2 = `<div class="bg-linear-to-r from-blue-300 from-20% to-green-500 to-80%" />
<div class="bg-linear-to-r from-blue-300 to-green-500 via-smooth" />
`;

const imageOverlayCode = `<div class="bg-[url('https://images.unsplash.com/photo-1654177117778-31d19dba77e6?w=640&q=80')] bg-cover bg-center relative overflow-hidden rounded h-48 w-full">
  <div class="absolute inset-0 bg-linear-to-b from-black/0 to-black" />
  // ...
</div>

<div class="bg-[url('https://images.unsplash.com/photo-1654177117778-31d19dba77e6?w=640&q=80')] bg-cover bg-center relative overflow-hidden rounded h-48 w-full">
  <div class="absolute inset-0 bg-linear-to-b from-black/0 via-smooth to-black" />
  // ...
</div>
`;

const utilityCode = `@layer utilities {
  .via-smooth {
    --tw-gradient-via-stops:
      var(--tw-gradient-position), var(--tw-gradient-from, transparent) var(--tw-gradient-from-position, 0%),
      color-mix(in oklab, var(--tw-gradient-to) 1.3%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.081 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 4.9%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.155 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 10.4%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.225 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 17.5%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.29 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 25.9%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.353 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 35.2%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.412 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 45.0%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.471 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 55.0%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.529 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 64.8%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.588 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 74.1%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.647 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 82.5%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.71 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 89.6%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.775 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 95.1%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.845 + var(--tw-gradient-from-position)),
      color-mix(in oklab, var(--tw-gradient-to) 98.7%, var(--tw-gradient-from, transparent)) calc(calc(var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) * 0.919 + var(--tw-gradient-from-position)),
      var(--tw-gradient-to) var(--tw-gradient-to-position, 100%);
    --tw-gradient-stops: var(--tw-gradient-via-stops);
  }
}`;

function GradientSquare({ label, className, children }: { label: string; className: string; children?: React.ReactNode }) {
  return (
    <div className="grid gap-2 text-center">
      <div className={`relative h-32 w-full overflow-hidden rounded sm:h-48 ${className}`}>{children}</div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function ImageOverlayDemo() {
  return (
    <>
      <GradientSquare
        label="Linear"
        className="bg-[url('https://images.unsplash.com/photo-1611706314453-9e1a6706b1a2?w=640&q=80')] bg-cover bg-center brightness-150 grayscale"
      >
        <div className="absolute inset-0 rounded-[inherit] bg-linear-to-b from-black/0 to-black" />
        <span className="absolute inset-x-1 bottom-2 text-2xs text-white/50">
          Source:{" "}
          <LinkOut
            href="https://unsplash.com/photos/yellow-and-black-sports-car-on-road-FSq5Btb18a4"
            text="Unsplash"
            className="text-white"
          />
        </span>
      </GradientSquare>
      <GradientSquare
        label="Eased (via-smooth)"
        className="bg-[url('https://images.unsplash.com/photo-1611706314453-9e1a6706b1a2?w=640&q=80')] bg-cover bg-center brightness-150 grayscale"
      >
        <div className="via-smooth absolute inset-0 rounded-[inherit] bg-linear-to-b from-black/0 to-black" />
        <span className="absolute inset-x-1 bottom-2 text-2xs text-white/50">
          Source:{" "}
          <LinkOut
            href="https://unsplash.com/photos/yellow-and-black-sports-car-on-road-FSq5Btb18a4"
            text="Unsplash"
            className="text-white"
          />
        </span>
      </GradientSquare>
    </>
  );
}

export default function SmoothGradientsPage() {
  return (
    <div className="prose mx-auto w-full max-w-3xl">
      <p>
        Linear gradients can be finicky and difficult to get right. More often than not, you&apos;ll end up with banding or muddy middles
        where two colors mix. So, here&apos;s a little Tailwind utility to smooth things out.
      </p>
      <p>
        {" "}
        Based on Andreas Larsen&apos;s <LinkOut href="https://larsenwork.com/easing-gradients/" text="Easing Gradients tool" />, the snippet
        below adds a <Code>.via-smooth</Code> class you can use alongside linear gradients for smooth ease-in-out transitions, as an
        alternative to manually fiddling with color stops and positions.
      </p>

      <CodeBlock filename="globals.css" language="css" code={utilityCode} collapsible={true} />

      <Alert variant="neutral">
        <AlertTitle>Update – 4/12/2026</AlertTitle>
        <AlertDescription>
          If you want a full Tailwind plugin with more options, check out{" "}
          <LinkOut
            href="https://easing-gradients.ibelick.com/"
            text="ibelick/easing-gradients"
            icon={<GithubIcon />}
            className="text-foreground"
          />
          .
        </AlertDescription>
      </Alert>

      <Heading level={2}>Examples</Heading>
      <p>
        Linear gradients can have abrupt shifts or muddy middles where the two hues meet. You can see this in the first example below left:
        note how the orange-ish transitional middle occupies the majority of the space relative to the stop colors.
      </p>
      <p>
        On the other hand, the smoothed example on the right packs more color to the center of the gradient. You get more pure color at the
        stops, with a smaller (but not abrupt) transition.
      </p>

      <DemoContainer
        title="Example 1"
        code={{ value: colorGradientCode, language: "html" }}
        centerContent={false}
        innerClass="grid w-full grid-cols-2 gap-4"
      >
        <GradientSquare label="Linear (default)" className="bg-linear-to-b from-yellow-200 to-pink-500" />
        <GradientSquare label="Eased (via-smooth)" className="via-smooth bg-linear-to-b from-yellow-200 to-pink-500" />
      </DemoContainer>

      <p>
        Even if you manipulate the color stops on a basic linear gradient, you can still end up with banding, like in the example below. To
        fix this, you&apos;d likely need to add an intermediate color stop with{" "}
        <Code>
          via-[<var className="italic opacity-72">color</var>]
        </Code>{" "}
        or{" "}
        <Code>
          via-[<var className="italic opacity-72">percentage</var>]
        </Code>{" "}
        to smooth things out. And your mileage may vary depending on the difference in intensity and lightness of the colors.
      </p>
      <DemoContainer
        title="Example 2"
        code={{ value: colorGradientCode2, language: "html" }}
        centerContent={false}
        innerClass="grid w-full grid-cols-2 gap-4"
      >
        <GradientSquare label="Linear (from-20% to-80%)" className="bg-linear-to-b from-blue-300 from-20% to-green-500 to-80%" />
        <GradientSquare label="Eased (via-smooth)" className="via-smooth bg-linear-to-b from-blue-300 to-green-500" />
      </DemoContainer>

      <p>The difference is most apparent when transitioning from transparent to opaque, like with image overlays:</p>

      <DemoContainer
        title="Image overlay"
        code={{ value: imageOverlayCode, language: "html" }}
        centerContent={false}
        innerClass="grid w-full grid-cols-2 gap-4"
      >
        <ImageOverlayDemo />
      </DemoContainer>
      <Heading level={2}>Usage</Heading>
      <p>
        Just drop the snippet into wherever your Tailwind theme is defined, like <Code>globals.css</Code>. The class overrides
        Tailwind&apos;s default linear <Code>--tw-gradient-stops</Code> variable with fifteen intermediate stops that follow an approximate
        ease-in-out curve. If you want a different curve, you can swap the percentages with new ones from{" "}
        <LinkOut href="https://larsenwork.com/easing-gradients/" text="Easing Gradients" />.
      </p>

      <p>
        Since the class only overrides the one variable, it works with different gradient angles and with any <Code>to-*</Code> /{" "}
        <Code>from-*</Code> positions, using a touch of ✨&nbsp;math&nbsp;✨ to scale the curve proportionally within your range.
      </p>

      <Heading level={3}>When to use it</Heading>
      <ul>
        <li>Hero scrims and image overlays that should feather naturally</li>
        <li>
          Any place you&apos;d normally sprinkle manual <Code>via-[color]/[pct]</Code> stops
        </li>
        <li>Accent-to-accent gradients that would otherwise grey out (if using srgb interpolation)</li>
      </ul>
    </div>
  );
}
