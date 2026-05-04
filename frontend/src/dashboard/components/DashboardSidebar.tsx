import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarHeader } from "./SidebarHeader"
import { SidebarNav } from "./SidebarNav"
import { SidebarFooter } from "./SidebarFooter"
import type { NavItem } from "../navigation.config"

interface DashboardSidebarProps {
  items: NavItem[]
  onItemClick?: () => void
}

export function DashboardSidebar({ items, onItemClick }: DashboardSidebarProps) {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
      <SidebarHeader />
      <ScrollArea className="flex-1 py-6">
        <SidebarNav items={items} onItemClick={onItemClick} />
      </ScrollArea>
      <SidebarFooter />
    </aside>
  )
}
