export type ProjectFrontmatter = {
  title: string;
  subtitle?: string;
  role?: string;
  date?: string;
  team?: { name?: string; role?: string; url?: string }[];
  meta?: { label: string; value: string }[];
};

export type TocItem = { id: string; text: string; depth: number };
