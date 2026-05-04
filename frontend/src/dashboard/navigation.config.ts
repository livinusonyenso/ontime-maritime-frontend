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
  Shield,
  UserCheck,
  ScrollText,
  BarChart3,
  ClipboardCheck,
  Building2,
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
  organization: NavItem[];
}

export const navigationConfig: NavigationConfig = {
  buyer: [
    { href: "/dashboard/buyer",  label: "Overview",  icon: Store },
    {
      href: "/dashboard/buyer/overview",
      label: "Market",
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
    { href: "/dashboard/seller/overview", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/seller/kyc", label: "KYC Verification", icon: UserCheck },
    { href: "/dashboard/seller/listings", label: "Listings", icon: Package },
    { href: "/dashboard/seller/sales", label: "Sales", icon: CreditCard },
    { href: "/dashboard/seller/ebol", label: "e-BOL", icon: FileText },
    { href: "/dashboard/seller/arbitration", label: "Arbitration", icon: Gavel },
    { href: "/dashboard/seller/security-hotline", label: "Security Hotline", icon: Bell },
    { href: "/dashboard/seller/tracking", label: "Tracking", icon: Ship },
    { href: "/dashboard/seller/auctions", label: "Auctions", icon: Gavel },
    { href: "/dashboard/seller/insurance", label: "Insurance", icon: Package },
    { href: "/dashboard/seller/documents", label: "Documents", icon: FileText },
  ],
  admin: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: User },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/auctions", label: "Auctions", icon: Gavel },
    { href: "/admin/documents", label: "Documents", icon: FileText },
    { href: "/admin/insurance", label: "Insurance", icon: Shield },
    { href: "/admin/kyc", label: "KYC", icon: UserCheck },
    { href: "/admin/listings", label: "Listings Approval", icon: ClipboardCheck },
    { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ],
  executive: [
    { href: "/dashboard/executive", label: "Overview", icon: LayoutDashboard },
  ],
  organization: [
    { href: "/dashboard/organization", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/organization/listings", label: "Listings", icon: Package },
    { href: "/dashboard/organization/sales", label: "Sales", icon: CreditCard },
    { href: "/dashboard/organization/ebol", label: "e-BOL", icon: FileText },
    { href: "/dashboard/organization/arbitration", label: "Arbitration", icon: Gavel },
    { href: "/dashboard/organization/security-hotline", label: "Security Hotline", icon: Bell },
    { href: "/dashboard/organization/tracking", label: "Tracking", icon: Ship },
    { href: "/dashboard/organization/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/organization/profile", label: "Company Profile", icon: Building2 },
  ],
};
