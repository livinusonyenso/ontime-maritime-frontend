import { SidebarNavItem } from "./SidebarNavItem"
import type { NavItem } from "../navigation.config"

interface SidebarNavProps {
  items: NavItem[]
  onItemClick?: () => void
}

export function SidebarNav({ items, onItemClick }: SidebarNavProps) {
  return (
    <nav className="grid gap-1 px-4 text-sm font-medium">
      {items.map((item) => (
        <SidebarNavItem key={item.href} item={item} onClick={onItemClick} />
      ))}
    </nav>
  )
}
