"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "@/components/ui/toaster";

export function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
       <Toaster />
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  );
}
