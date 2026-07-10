import { IconTrash, IconTrashFilled } from "@tabler/icons-react";

export function DeleteButtonDemo() {
  return (
    <button className="group relative flex h-button items-center gap-2 rounded-full bg-muted px-4 text-sm font-medium text-foreground outline -outline-offset-1 outline-border/50 transition-all duration-200 ease-out-quad select-none hover:bg-error hover:text-error-foreground active:scale-96">
      <div
        className="absolute inset-0 flex h-button items-center gap-2 rounded-[inherit] bg-destructive px-4 text-white transition-[clip-path,background,color] duration-300 ease-out [clip-path:inset(0_100%_0_0)] group-active:duration-2000 group-active:ease-out-quad group-active:[clip-path:inset(0_0_0_0)]"
        data-slot="inner"
      >
        <IconTrashFilled className="-ms-1 size-4 shrink-0" />
        Hold to delete
      </div>
      <IconTrash className="-ms-1 size-4 shrink-0" />
      Hold to delete
    </button>
  );
}
