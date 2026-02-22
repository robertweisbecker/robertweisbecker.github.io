import { pageData } from "@/lib/data/pages";
import { LinkOut } from "@/components/link-out";
import { Heading } from "@/components/ui/heading";

type PageData = {
  title: string;
  description?: string;
  subtitle?: string;
  role?: string;
  team?: { name?: string; role?: string; url?: string }[];
  date?: string;
  imageUrl?: string;
};

const typedPageData: Record<string, PageData> = pageData;

export function PageHeader({ pageKey }: { pageKey: string }) {
  const page = typedPageData[pageKey];

  if (!page) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Page data not found for key: {pageKey}
      </div>
    );
  }

  return (
    <div className="mb-10 grid items-baseline gap-8 md:grid-cols-2 md:gap-12">
      <div>
        <Heading level={1}>
          {page.title}{" "}
        </Heading>
        <span className="inline text-lg text-muted-foreground">
          {page.subtitle}
        </span>
      </div>
      <aside className="mt-5 flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Role
          </p>
          <p className="text-sm">{page.role}</p>
        </div>
        {page.team && page.team.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Team
            </p>
            <ul className="mt-1 space-y-1">
              {page.team.map((member) => (
                <li
                  key={member.name ?? member.role}
                  className="flex flex-wrap items-center gap-1 text-sm"
                >
                  {member.url ? (
                    <LinkOut href={member.url} text={member.name ?? ""} />
                  ) : (
                    <span className="font-semibold">{member.name}</span>
                  )}
                  {member.role && (
                    <span className="text-muted-foreground">{member.role}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {page.date && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              When
            </p>
            <p className="text-sm font-mono">{page.date}</p>
          </div>
        )}
      </aside>
    </div>
  );
}
