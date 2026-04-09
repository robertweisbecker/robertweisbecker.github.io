  import { cn } from "@/lib/utils"

interface Stat {
  label: string;
  value: string;
  change: string;
  down?: boolean;
}

interface StatsProps {
  data: Stat[];
  className?: string;
}

export function Stats({ data, className }: StatsProps) {
  return (
    <div
      className={cn(
        "not-prose column-gap-6 row-gap-2 mx-auto grid max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {data.map((stat) => (
        <div key={stat.label}>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          <p className="text-3xl">{stat.value}</p>
          <p className="font-mono text-xs text-muted-foreground">
            <span className={cn(stat.down ? "text-error-foreground" : "text-success-foreground")}>
              {stat.down ? "↓" : "↑"}
            </span>{" "}
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
}
