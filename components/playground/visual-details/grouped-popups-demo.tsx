"use client";

import * as React from "react";
import { GithubIcon, VercelIcon } from "@/components/icons";
import { LinkOut } from "@/components/link-out";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { PreviewCardGroup, PreviewCardTrigger } from "@/components/ui/preview-card";

function GroupedLinkPreview({
  title,
  url,
  description,
  avatar,
}: {
  title: string;
  url: string;
  description: string;
  avatar: React.ReactNode;
}) {
  return (
    <div className="w-xs p-3">
      <div className="flex items-center gap-3">
        {avatar}

        <div className="min-w-0">
          <p className="font-medium text-card-foreground">{title}</p>
        </div>
      </div>
      <p className="my-3 text-sm">{description}</p>
      <LinkOut href={url} text={url} className="text-xs text-muted-foreground" />
    </div>
  );
}

export function GroupedPopupsDemo() {
  const links = [
    {
      title: "Website",
      url: "https://bob.fyi",
      description: "Portfolio, writing, experiments, and component playgrounds.",
      avatar: (
        <Avatar>
          <AvatarImage src="https://github.com/robertweisbecker.png" alt="Bob Weisbecker" />
        </Avatar>
      ),
    },
    {
      title: "Vercel",
      url: "https://vercel.com",
      description: "Frontend cloud platform for shipping web applications.",
      avatar: <VercelIcon className="size-4" aria-hidden="true" />,
    },
    {
      title: "GitHub",
      url: "https://github.com/robertweisbecker",
      description: "Code hosting, projects, and public repositories.",
      avatar: <GithubIcon className="size-4" aria-hidden="true" />,
    },
  ];

  return (
    <p className="max-w-md text-sm leading-7 text-muted-foreground">
      Inline references can carry previews without leaving paragraph flow. Open{" "}
      <PreviewCardGroup>
        {links.map((link, index) => (
          <React.Fragment key={link.url}>
            <PreviewCardTrigger
              preview={<GroupedLinkPreview {...link} />}
              render={<a href={link.url} target="_blank" rel="noreferrer" className="link font-medium" />}
            >
              {link.title}
            </PreviewCardTrigger>
            {index < links.length - 1 ? <span>, </span> : null}
          </React.Fragment>
        ))}
      </PreviewCardGroup>{" "}
      for quick context before committing to a new tab.
    </p>
  );
}
