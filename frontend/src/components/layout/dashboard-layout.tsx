"use client"

import { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Ship,
  Gavel,
  FileText,
  Package,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  User,
  CreditCard,
} from "lucide-react"

interface DashboardLayoutProps {
  role: "buyer" | "seller" | "admin" | "executive"
}

export function DashboardLayout({ role }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navItems = {
    buyer: [
      { href: "/dashboard/buyer", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/buyer/tracking", label: "Tracking", icon: Ship },
      { href: "/dashboard/buyer/auctions", label: "Auctions", icon: Gavel },
      { href: "/dashboard/buyer/documents", label: "Documents", icon: FileText },
      { href: "/dashboard/buyer/insurance", label: "Insurance", icon: Package },
      { href: "/dashboard/buyer/payments", label: "Payments", icon: CreditCard },
    ],
    seller: [
      { href: "/dashboard/seller", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/seller/listings", label: "Listings", icon: Package },
      { href: "/dashboard/seller/sales", label: "Sales", icon: CreditCard },
      { href: "/dashboard/seller/tracking", label: "Tracking", icon: Ship },
      { href: "/dashboard/seller/auctions", label: "Auctions", icon: Gavel },
      { href: "/dashboard/seller/documents", label: "Documents", icon: FileText },
    ],
    admin: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/users", label: "Users", icon: User },
      { href: "/admin/auctions", label: "Auctions", icon: Gavel },
      { href: "/admin/documents", label: "Documents", icon: FileText },
    ],
    executive: [{ href: "/dashboard/executive", label: "Overview", icon: LayoutDashboard }],
  }

  const items = navItems[role] || []

  return (
    <div className="flex min-h-screen bg-muted/10">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
        <div className="flex h-16 items-center px-6 border-b">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="bg-primary p-1.5 rounded-md">
              <Ship className="h-5 w-5 text-primary-foreground" />
            </div>
            ONTIME
          </Link>
        </div>
        <ScrollArea className="flex-1 py-6">
          <nav className="grid gap-1 px-4 text-sm font-medium">
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground">
            <User className="h-4 w-4" />
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-foreground">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="truncate w-32">{user?.email}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-16 items-center px-6 border-b">
                <Link to="/" className="flex items-center gap-2 font-bold text-lg">
                  <div className="bg-primary p-1.5 rounded-md">
                    <Ship className="h-5 w-5 text-primary-foreground" />
                  </div>
                  ONTIME
                </Link>
              </div>
              <ScrollArea className="flex-1 py-6">
                <nav className="grid gap-1 px-4 text-sm font-medium">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                        location.pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8 sm:w-2/3 lg:w-1/3 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600" />
            </Button>
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt={user?.first_name} />
                    <AvatarFallback>
                      {user?.first_name?.[0]}
                      {user?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
