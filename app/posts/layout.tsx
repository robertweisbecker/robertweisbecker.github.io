  import { PostPagination } from "./post-pagination"

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PostPagination />
    </>
  );
}
