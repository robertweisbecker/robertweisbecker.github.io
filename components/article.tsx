import { BackButton } from "@/components/back-button";
import { PageHeader } from "@/components/page-header";

interface ArticleProps {
  children: React.ReactNode;
  pageKey: string;
}

export function Article({ children, pageKey }: ArticleProps) {
  return (
    <div className="flex max-w-4xl flex-col items-start gap-10">
      <div className="h-4" />
      <BackButton />
      <PageHeader pageKey={pageKey} />
      <div className="flex max-w-2xl flex-col gap-12 [&_h2]:w-full [&_h3]:w-full">
        {children}
      </div>
      <div className="h-4" />
    </div>
  );
}
