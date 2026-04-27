"use client";

import { Theme } from "@/components/theme";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <Theme>{children}</Theme>
    </NextThemesProvider>
  );
}
