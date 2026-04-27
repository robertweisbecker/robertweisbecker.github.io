import * as React from "react";

import { cn } from "@/lib/utils";

type DataListOrientation = "horizontal" | "vertical";
type DataListSize = "sm" | "md" | "lg";

interface DataListContextValue {
  orientation: DataListOrientation;
  size: DataListSize;
}

const DataListContext = React.createContext<DataListContextValue>({
  orientation: "horizontal",
  size: "md",
});

interface DataListRootProps extends Omit<React.ComponentProps<"dl">, "size"> {
  orientation?: DataListOrientation;
  size?: DataListSize;
}

function DataListRoot({ orientation = "horizontal", size = "md", className, ...props }: DataListRootProps) {
  return (
    <DataListContext.Provider value={{ orientation, size }}>
      <dl
        data-slot="data-list-root"
        data-orientation={orientation}
        className={cn(
          "text-start wrap-anywhere",
          // Orientation
          orientation === "horizontal" && "grid grid-cols-[auto_1fr]",
          orientation === "vertical" && "flex flex-col",
          // Size
          size === "sm" && "gap-3 text-sm",
          size === "md" && "gap-4 text-sm",
          size === "lg" && "gap-5 text-base",
          // Trim: in horizontal mode, values pull in ±0.25em from neighboring rows
          // for optical baseline alignment. First and last items are exempt so values
          // don't bleed outside the container.
          "[&[data-orientation=horizontal]>[data-slot=data-list-item]>[data-slot=data-list-value]]:-mt-[0.25em]",
          "[&[data-orientation=horizontal]>[data-slot=data-list-item]>[data-slot=data-list-value]]:-mb-[0.25em]",
          "[&[data-orientation=horizontal]>[data-slot=data-list-item]:first-child>[data-slot=data-list-value]]:mt-0",
          "[&[data-orientation=horizontal]>[data-slot=data-list-item]:last-child>[data-slot=data-list-value]]:mb-0",
          className
        )}
        {...props}
      />
    </DataListContext.Provider>
  );
}

function DataListItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = React.useContext(DataListContext);
  return (
    <div
      data-slot="data-list-item"
      className={cn(
        orientation === "horizontal" && "col-span-2 grid grid-cols-subgrid items-baseline",
        orientation === "vertical" && "flex flex-col gap-[.25em]",
        className
      )}
      {...props}
    />
  );
}

function DataListLabel({ className, ...props }: React.ComponentProps<"dt">) {
  const { orientation, size } = React.useContext(DataListContext);
  return (
    <dt
      data-slot="data-list-label"
      className={cn(
        "flex min-w-0 text-muted-foreground/80",
        orientation === "horizontal" && size === "sm" ? "min-w-[12ch]" : "min-w-[20ch]",
        orientation === "vertical" && "min-w-0",
        className
      )}
      {...props}
    />
  );
}

function DataListValue({ className, ...props }: React.ComponentProps<"dd">) {
  return <dd data-slot="data-list-value" className={cn("flex min-w-0", className)} {...props} />;
}

const DataList = {
  Root: DataListRoot,
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue,
};

export { DataList, DataListItem, DataListLabel, DataListRoot, DataListValue, type DataListRootProps };
