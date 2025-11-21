"use client"

import { Providers as ContextProviders } from "@/components/providers"
import type { ReactNode } from "react"

export function AppProviders({ children }: { children: ReactNode }) {
  return <ContextProviders>{children}</ContextProviders>
}
