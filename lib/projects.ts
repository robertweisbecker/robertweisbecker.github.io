import fs from "fs";
import path from "path";

const projectsDir = path.join(process.cwd(), "content", "projects");

export function getProjectSlugs(): string[] {
	return fs
		.readdirSync(projectsDir)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => path.basename(file, ".mdx"));
}
