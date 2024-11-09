"use client";

import { ConvexClientProvider } from "./components/convex-provider";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </ConvexClientProvider>
  );
}
