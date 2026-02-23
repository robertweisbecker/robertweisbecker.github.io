export type ProjectFrontmatter = {
	title: string;
	subtitle?: string;
	role?: string;
	date?: string;
	team?: { name?: string; role?: string; url?: string }[];
};
