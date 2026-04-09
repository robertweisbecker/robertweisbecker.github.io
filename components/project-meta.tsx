"use client";

  import { LinkOut } from "@/components/link-out"
  import { DataList } from "@/components/ui/data-list"
  import type { ProjectFrontmatter } from "@/lib/types"

type Props = Pick<ProjectFrontmatter, "role" | "team" | "date" | "meta">;

export function ProjectMeta({ role, team, date, meta }: Props) {
  const hasContent = role || (team && team.length > 0) || date || (meta && meta.length > 0);

  if (!hasContent) return null;

  return (
    <aside className="not-prose mt-4">
      <DataList.Root orientation="vertical" size="sm">
        {role && (
          <DataList.Item>
            <DataList.Label className="min-w-0 text-xs">Role</DataList.Label>
            <DataList.Value>{role}</DataList.Value>
          </DataList.Item>
        )}
        {team && team.length > 0 && (
          <DataList.Item>
            <DataList.Label className="min-w-0 text-xs">Team</DataList.Label>
            <DataList.Value>
              <ul className="flex flex-col gap-1">
                {team.map((member) => (
                  <li key={member.name ?? member.role} className="w-min-content text-muted-foreground">
                    {member.url ? (
                      <LinkOut href={member.url} text={member.name ?? ""} className="text-foreground" />
                    ) : (
                      <span>{member.name}</span>
                    )}

                    {member.name && member.role && <>, </>}
                    {member.role && <>{member.role}</>}
                  </li>
                ))}
              </ul>
            </DataList.Value>
          </DataList.Item>
        )}
        {date && (
          <DataList.Item>
            <DataList.Label className="min-w-0 text-xs">When</DataList.Label>
            <DataList.Value className="tabular-nums">{date}</DataList.Value>
          </DataList.Item>
        )}
        {meta?.map(({ label, value }) => (
          <DataList.Item key={label}>
            <DataList.Label className="min-w-0">{label}</DataList.Label>
            <DataList.Value>{value}</DataList.Value>
          </DataList.Item>
        ))}
      </DataList.Root>
    </aside>
  );
}
