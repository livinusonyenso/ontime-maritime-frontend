import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import type { NavItem } from "../navigation.config"

interface SidebarNavItemProps {
  item: NavItem
  onClick?: () => void
}

export function SidebarNavItem({ item, onClick }: SidebarNavItemProps) {
  const location = useLocation()
  const isActive = location.pathname === item.href

  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Link>
  )
}
