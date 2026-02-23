interface Stat {
	label: string;
	value: string;
	change: string;
	down?: boolean;
}

interface StatsProps {
	data: Stat[];
}

export function Stats({ data }: StatsProps) {
	return (
		<div className="not-prose grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{data.map((stat) => (
				<div key={stat.label}>
					<p className="text-xs text-muted-foreground">{stat.label}</p>
					<p className="text-3xl font-light">{stat.value}</p>
					<p className="font-mono text-xs text-muted-foreground">
						<span className="text-green-500">
							{stat.down ? "↓" : "↑"}
						</span>{" "}
						{stat.change}
					</p>
				</div>
			))}
		</div>
	);
}
