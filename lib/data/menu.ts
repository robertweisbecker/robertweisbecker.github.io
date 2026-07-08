export type HeaderMenuProject = {
  id: number;
  title: string;
  nickname: string;
  icon?: string;
  heroImage?: string;
  date: string;
  path: string;
  description: string;
  categories?: string[];
};

type ProjectSource = HeaderMenuProject & {
  published: boolean;
};

export function toHeaderMenuProjects(projects: ProjectSource[]): HeaderMenuProject[] {
  return projects
    .filter((project) => project.published)
    .map(({ id, title, nickname, icon, heroImage, date, path, description, categories }) => ({
      id,
      title,
      nickname,
      icon,
      heroImage,
      date,
      path,
      description,
      categories,
    }));
}
