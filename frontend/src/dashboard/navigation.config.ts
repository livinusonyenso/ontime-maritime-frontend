import {
  LayoutDashboard,
  Ship,
  Gavel,
  FileText,
  Package,
  Settings,
  Bell,
  User,
  CreditCard,
  Store,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface NavigationConfig {
  buyer: NavItem[];
  seller: NavItem[];
  admin: NavItem[];
  executive: NavItem[];
}

export const navigationConfig: NavigationConfig = {
  buyer: [
    { href: "/dashboard/buyer", label: "Market", icon: Store },
    {
      href: "/dashboard/buyer/overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    { href: "/dashboard/buyer/ebol", label: "e-BOL", icon: FileText },
    { href: "/dashboard/buyer/arbitration", label: "Arbitration", icon: Gavel },
    {
      href: "/dashboard/buyer/security-hotline",
      label: "Security Hotline",
      icon: Bell,
    },
    { href: "/dashboard/buyer/tracking", label: "Tracking", icon: Ship },
    { href: "/dashboard/buyer/auctions", label: "Auctions", icon: Gavel },
    { href: "/dashboard/buyer/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/buyer/insurance", label: "Insurance", icon: Package },
    { href: "/dashboard/buyer/payments", label: "Payments", icon: CreditCard },
  ],
  seller: [
    { href: "/dashboard/seller", label: "Market", icon: Store },
    {
      href: "/dashboard/seller/overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    { href: "/dashboard/seller/listings", label: "Listings", icon: Package },
    { href: "/dashboard/seller/sales", label: "Sales", icon: CreditCard },
    { href: "/dashboard/seller/ebol", label: "e-BOL", icon: FileText },
    {
      href: "/dashboard/seller/arbitration",
      label: "Arbitration",
      icon: Gavel,
    },
    {
      href: "/dashboard/seller/security-hotline",
      label: "Security Hotline",
      icon: Bell,
    },
    { href: "/dashboard/seller/tracking", label: "Tracking", icon: Ship },
    { href: "/dashboard/seller/auctions", label: "Auctions", icon: Gavel },
    { href: "/dashboard/seller/insurance", label: "Insurance", icon: Package },

    { href: "/dashboard/seller/documents", label: "Documents", icon: FileText },
  ],
  admin: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: User },
    { href: "/admin/auctions", label: "Auctions", icon: Gavel },
    { href: "/admin/documents", label: "Documents", icon: FileText },
  ],
  executive: [
    { href: "/dashboard/executive", label: "Overview", icon: LayoutDashboard },
  ],
};
