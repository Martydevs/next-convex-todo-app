"use client";

import { ConvexClientProvider } from "./components/convex-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      {children}
    </ConvexClientProvider>
  )
}