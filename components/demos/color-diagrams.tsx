import { cn } from "@/lib/utils";

export function ColorDiagrams({
  type = "luminance",
  caption,
  className,
  ...props
}: { type: "luminance" | "chroma"; caption?: React.ReactNode } & React.ComponentProps<"figure">) {
  return (
    <figure className={cn("not-prose flex flex-col gap-4", className)} {...props}>
      {type === "luminance" && <AvgLum />}
      {type === "chroma" && <AvgChroma />}
      {caption && <figcaption className="p-2 text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

function AvgLum() {
  return (
    <section className="card">
      <div className="svg-wrap">
        <svg
          viewBox="0 0 900 420"
          width="100%"
          role="img"
          aria-label="Average lightness by step"
          className="w-full font-pixel"
        >
          {/* <!-- legend --> */}
          <rect x="70" y="2" width="11" height="11" fill="var(--neutral-400)" />
          <text x="88" y="13" fontSize="16.5" fill="var(--foreground)">
            Neutrals
          </text>
          <rect x="200" y="2" width="11" height="11" fill="var(--color-pink-400)" />
          <text x="218" y="13" fontSize="16.5" fill="var(--muted-foreground)">
            Others
          </text>
          {/* <!-- y grid --> */}
          <line x1="70" y1="365.00" x2="880" y2="365.00" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="369.00" textAnchor="end" fontSize="11" fill="var(--muted-foreground)">
            0
          </text>
          <line x1="70" y1="286.25" x2="880" y2="286.25" stroke="var(--border)" strokeWidth="1" />
          <text
            x="60"
            y="290.25"
            textAnchor="middle"
            fontSize="11"
            fill="var(--muted-foreground)"
            transform="rotate(-90 60 290.25)"
          >
            25
          </text>
          <line x1="70" y1="207.50" x2="880" y2="207.50" stroke="var(--border)" strokeWidth="1" />
          <text
            x="60"
            y="211.50"
            textAnchor="middle"
            fontSize="11"
            fill="var(--muted-foreground)"
            transform="rotate(-90 60 211.50)"
          >
            50
          </text>
          <line x1="70" y1="128.75" x2="880" y2="128.75" stroke="var(--border)" strokeWidth="1" />
          <text
            x="60"
            y="132.75"
            textAnchor="middle"
            fontSize="11"
            fill="var(--muted-foreground)"
            transform="rotate(-90 60 132.75)"
          >
            75
          </text>
          <line x1="70" y1="50.00" x2="880" y2="50.00" stroke="var(--border)" strokeWidth="1" />
          <text
            x="60"
            y="54.00"
            textAnchor="end"
            fontSize="11"
            fill="var(--muted-foreground)"
            // transform="rotate(-90 60 54.00)"
          >
            100
          </text>

          {/* <!-- axes --> */}
          <line x1="70" y1="50" x2="70" y2="365" stroke="var(--input)" />
          <line x1="70" y1="365" x2="880" y2="365" stroke="var(--input)" />

          {/* <!-- categorical x ticks, evenly spaced --> */}
          <line x1="70.00" y1="365" x2="70.00" y2="370" stroke="var(--input)" />
          <text x="70.00" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            25
          </text>

          <line x1="132.31" y1="365" x2="132.31" y2="370" stroke="var(--input)" />
          <text x="132.31" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            50
          </text>

          <line x1="194.62" y1="365" x2="194.62" y2="370" stroke="var(--input)" />
          <text x="194.62" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            75
          </text>

          <line x1="256.92" y1="365" x2="256.92" y2="370" stroke="var(--input)" />
          <text x="256.92" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            100
          </text>

          <line x1="319.23" y1="365" x2="319.23" y2="370" stroke="var(--input)" />
          <text x="319.23" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            200
          </text>

          <line x1="381.54" y1="365" x2="381.54" y2="370" stroke="var(--input)" />
          <text x="381.54" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            300
          </text>

          <line x1="443.85" y1="365" x2="443.85" y2="370" stroke="var(--input)" />
          <text x="443.85" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            400
          </text>

          <line x1="506.15" y1="365" x2="506.15" y2="370" stroke="var(--input)" />
          <text x="506.15" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            500
          </text>

          <line x1="568.46" y1="365" x2="568.46" y2="370" stroke="var(--input)" />
          <text x="568.46" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            600
          </text>

          <line x1="630.77" y1="365" x2="630.77" y2="370" stroke="var(--input)" />
          <text x="630.77" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            700
          </text>

          <line x1="693.08" y1="365" x2="693.08" y2="370" stroke="var(--input)" />
          <text x="693.08" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            800
          </text>

          <line x1="755.38" y1="365" x2="755.38" y2="370" stroke="var(--input)" />
          <text x="755.38" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            900
          </text>

          <line x1="817.69" y1="365" x2="817.69" y2="370" stroke="var(--input)" />
          <text x="817.69" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            950
          </text>

          <line x1="880.00" y1="365" x2="880.00" y2="370" stroke="var(--input)" />
          <text x="880.00" y="385" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
            975
          </text>

          <g>
            <polyline
              fill="none"
              stroke="var(--color-pink-400)"
              strokeWidth="2.5"
              points="70.00,54.66 132.31,63.38 256.92,75.77 319.23,92.17 381.54,127.09 443.85,169.68 506.15,201.92 568.46,226.21 630.77,261.58 693.08,281.14 755.38,295.59 817.69,302.44 880.00,310.19"
            />

            <circle cx="70.00" cy="54.66" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="132.31" cy="63.38" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="256.92" cy="75.77" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="319.23" cy="92.17" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="381.54" cy="127.09" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="443.85" cy="169.68" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="506.15" cy="201.92" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="568.46" cy="226.21" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="630.77" cy="261.58" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="693.08" cy="281.14" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="755.38" cy="295.59" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="817.69" cy="302.44" r="3.5" fill="var(--color-pink-400)" />
            <circle cx="880.00" cy="310.19" r="3.5" fill="var(--color-pink-400)" />
          </g>
          <g>
            <polyline
              fill="none"
              stroke="var(--muted-foreground)"
              strokeWidth="2.5"
              points="70.00,51.51 132.31,56.26 194.62,64.55 256.92,70.66 319.23,87.05 381.54,122.74 443.85,178.94 506.15,212.09 568.46,236.88 630.77,285.30 693.08,304.62 755.38,315.37 817.69,322.87 880.00,331.37"
            />
            <circle cx="70.00" cy="51.51" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="132.31" cy="56.26" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="194.62" cy="64.55" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="256.92" cy="70.66" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="319.23" cy="87.05" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="381.54" cy="122.74" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="443.85" cy="178.94" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="506.15" cy="212.09" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="568.46" cy="236.88" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="630.77" cy="285.30" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="693.08" cy="304.62" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="755.38" cy="315.37" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="817.69" cy="322.87" r="3.5" fill="var(--muted-foreground)" />
            <circle cx="880.00" cy="331.37" r="3.5" fill="var(--muted-foreground)" />
          </g>

          <text x="475.00" y="408" textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">
            STEP
          </text>
          <text
            x="18"
            y="207.50"
            transform="rotate(-90 18 207.50)"
            textAnchor="middle"
            fontSize="12"
            fill="var(--muted-foreground)"
          >
            L% [&mu;]
          </text>
        </svg>
      </div>
    </section>
  );
}

function AvgChroma() {
  return (
    <section className="card">
      <div className="svg-wrap">
        <svg
          viewBox="0 0 900 420"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Average chroma by step"
        >
          <text x="70" y="28" fontSize="20" fontWeight="700" fill="var(--neutral-400)">
            Average chroma by step
          </text>

          {/* <!-- y grid --> */}
          <line x1="70" y1="365.00" x2="880" y2="365.00" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="369.00" textAnchor="end" fontSize="11" fill="var(--color-pink-400)">
            0.00
          </text>
          <line x1="70" y1="302.00" x2="880" y2="302.00" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="306.00" textAnchor="end" fontSize="11" fill="var(--color-pink-400)">
            0.05
          </text>
          <line x1="70" y1="239.00" x2="880" y2="239.00" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="243.00" textAnchor="end" fontSize="11" fill="var(--color-pink-400)">
            0.10
          </text>
          <line x1="70" y1="176.00" x2="880" y2="176.00" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="180.00" textAnchor="end" fontSize="11" fill="var(--color-pink-400)">
            0.15
          </text>
          <line x1="70" y1="113.00" x2="880" y2="113.00" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="117.00" textAnchor="end" fontSize="11" fill="var(--color-pink-400)">
            0.20
          </text>
          <line x1="70" y1="50.00" x2="880" y2="50.00" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="54.00" textAnchor="end" fontSize="11" fill="var(--color-pink-400)">
            0.25
          </text>

          {/* <!-- axes --> */}
          <line x1="70" y1="50" x2="70" y2="365" stroke="var(--input)" />
          <line x1="70" y1="365" x2="880" y2="365" stroke="var(--input)" />

          {/* <!-- categorical x ticks, evenly spaced --> */}
          <line x1="70.00" y1="365" x2="70.00" y2="370" stroke="var(--input)" />
          <text x="70.00" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            25
          </text>

          <line x1="132.31" y1="365" x2="132.31" y2="370" stroke="var(--input)" />
          <text x="132.31" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            50
          </text>

          <line x1="194.62" y1="365" x2="194.62" y2="370" stroke="var(--input)" />
          <text x="194.62" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            75
          </text>

          <line x1="256.92" y1="365" x2="256.92" y2="370" stroke="var(--input)" />
          <text x="256.92" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            100
          </text>

          <line x1="319.23" y1="365" x2="319.23" y2="370" stroke="var(--input)" />
          <text x="319.23" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            200
          </text>

          <line x1="381.54" y1="365" x2="381.54" y2="370" stroke="var(--input)" />
          <text x="381.54" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            300
          </text>

          <line x1="443.85" y1="365" x2="443.85" y2="370" stroke="var(--input)" />
          <text x="443.85" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            400
          </text>

          <line x1="506.15" y1="365" x2="506.15" y2="370" stroke="var(--input)" />
          <text x="506.15" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            500
          </text>

          <line x1="568.46" y1="365" x2="568.46" y2="370" stroke="var(--input)" />
          <text x="568.46" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            600
          </text>

          <line x1="630.77" y1="365" x2="630.77" y2="370" stroke="var(--input)" />
          <text x="630.77" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            700
          </text>

          <line x1="693.08" y1="365" x2="693.08" y2="370" stroke="var(--input)" />
          <text x="693.08" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            800
          </text>

          <line x1="755.38" y1="365" x2="755.38" y2="370" stroke="var(--input)" />
          <text x="755.38" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            900
          </text>

          <line x1="817.69" y1="365" x2="817.69" y2="370" stroke="var(--input)" />
          <text x="817.69" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            950
          </text>

          <line x1="880.00" y1="365" x2="880.00" y2="370" stroke="var(--input)" />
          <text x="880.00" y="385" textAnchor="middle" fontSize="11" fill="var(--color-pink-400)">
            975
          </text>

          {/* <!-- spectrum --> */}
          <polyline
            fill="none"
            stroke="var(--color-pink-400)"
            strokeWidth="2.5"
            points="70.00,336.75 132.31,308.61 194.62,264.72 256.92,212.59 319.23,148.41 381.54,98.55 443.85,106.79 506.15,134.08 568.46,167.10 630.77,189.93 693.08,234.48 755.38,272.99 817.69,294.79 880.00,310.09"
          />
          <circle cx="70.00" cy="336.75" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="132.31" cy="308.61" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="194.62" cy="264.72" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="256.92" cy="212.59" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="319.23" cy="148.41" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="381.54" cy="98.55" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="443.85" cy="106.79" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="506.15" cy="134.08" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="568.46" cy="167.10" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="630.77" cy="189.93" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="693.08" cy="234.48" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="755.38" cy="272.99" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="817.69" cy="294.79" r="3.5" fill="var(--color-pink-400)" />
          <circle cx="880.00" cy="310.09" r="3.5" fill="var(--color-pink-400)" />

          {/* <!-- neutral --> */}
          <polyline
            fill="none"
            stroke="var(--neutral-400)"
            strokeWidth="2.5"
            points="70.00,361.08 132.31,355.09 194.62,351.48 256.92,349.47 319.23,337.35 381.54,323.88 443.85,317.71 506.15,310.31 568.46,311.07 630.77,315.52 693.08,326.20 755.38,333.62 817.69,336.62 880.00,336.22"
          />
          <circle cx="70.00" cy="361.08" r="3.5" fill="var(--neutral-400)" />
          <circle cx="132.31" cy="355.09" r="3.5" fill="var(--neutral-400)" />
          <circle cx="194.62" cy="351.48" r="3.5" fill="var(--neutral-400)" />
          <circle cx="256.92" cy="349.47" r="3.5" fill="var(--neutral-400)" />
          <circle cx="319.23" cy="337.35" r="3.5" fill="var(--neutral-400)" />
          <circle cx="381.54" cy="323.88" r="3.5" fill="var(--neutral-400)" />
          <circle cx="443.85" cy="317.71" r="3.5" fill="var(--neutral-400)" />
          <circle cx="506.15" cy="310.31" r="3.5" fill="var(--neutral-400)" />
          <circle cx="568.46" cy="311.07" r="3.5" fill="var(--neutral-400)" />
          <circle cx="630.77" cy="315.52" r="3.5" fill="var(--neutral-400)" />
          <circle cx="693.08" cy="326.20" r="3.5" fill="var(--neutral-400)" />
          <circle cx="755.38" cy="333.62" r="3.5" fill="var(--neutral-400)" />
          <circle cx="817.69" cy="336.62" r="3.5" fill="var(--neutral-400)" />
          <circle cx="880.00" cy="336.22" r="3.5" fill="var(--neutral-400)" />

          {/* <!-- legend --> */}
          <rect x="700" y="24" width="18" height="20" fill="var(--color-pink-400)" />
          <text x="726" y="28" fontSize="12" fill="var(--muted-foreground)">
            Spectrum
          </text>
          <rect x="700" y="44" width="18" height="20" fill="var(--neutral-400)" />
          <text x="726" y="48" fontSize="12" fill="var(--muted-foreground)">
            Neutral
          </text>

          <text x="475.00" y="408" textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">
            Step
          </text>
          <text
            x="18"
            y="207.50"
            transform="rotate(-90 18 207.50)"
            textAnchor="middle"
            fontSize="12"
            fill="var(--muted-foreground)"
          >
            Average OKLCH Chroma
          </text>
        </svg>
      </div>
    </section>
  );
}
