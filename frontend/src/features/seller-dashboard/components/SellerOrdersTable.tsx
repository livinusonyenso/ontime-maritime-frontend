"use client"

import { cn } from "@/lib/utils"
import { Package, Clock, Truck, CheckCircle, ChevronRight, MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Order {
  id: string
  item: string
  buyer: string
  date: string
  amount: string
  status: "Processing" | "Shipped" | "Delivered" | "Pending"
}

interface SellerOrdersTableProps {
  orders?: Order[]
  maxOrders?: number
  showViewAll?: boolean
}

const statusConfig = {
  Pending: {
    icon: Clock,
    bg: "bg-slate-100 dark:bg-slate-800",
    color: "text-slate-600 dark:text-slate-400",
  },
  Processing: {
    icon: Package,
    bg: "bg-amber-100 dark:bg-amber-900/30",
    color: "text-amber-700 dark:text-amber-400",
  },
  Shipped: {
    icon: Truck,
    bg: "bg-blue-100 dark:bg-blue-900/30",
    color: "text-blue-700 dark:text-blue-400",
  },
  Delivered: {
    icon: CheckCircle,
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    color: "text-emerald-700 dark:text-emerald-400",
  },
}

const defaultOrders: Order[] = [
  {
    id: "#ORD-7782",
    item: "Marine Engine Parts",
    buyer: "Atlantic Shipping Co.",
    date: "Today, 10:23 AM",
    amount: "$4,200",
    status: "Processing",
  },
  {
    id: "#ORD-7781",
    item: "Navigation System Pro",
    buyer: "Nordic Maritime Ltd.",
    date: "Yesterday, 4:15 PM",
    amount: "$12,500",
    status: "Shipped",
  },
  {
    id: "#ORD-7780",
    item: "Safety Equipment Kit",
    buyer: "Gulf Transport Inc.",
    date: "Dec 2, 2024",
    amount: "$1,800",
    status: "Delivered",
  },
  {
    id: "#ORD-7779",
    item: "Cargo Containers (x2)",
    buyer: "Pacific Traders",
    date: "Dec 1, 2024",
    amount: "$8,400",
    status: "Delivered",
  },
  {
    id: "#ORD-7778",
    item: "Crane Parts Bundle",
    buyer: "Harbor Solutions",
    date: "Nov 30, 2024",
    amount: "$3,200",
    status: "Pending",
  },
]

export function SellerOrdersTable({
  orders = defaultOrders,
  maxOrders = 5,
  showViewAll = true,
}: SellerOrdersTableProps) {
  const displayedOrders = orders.slice(0, maxOrders)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Orders</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Latest transactions from your listings
          </p>
        </div>
        {showViewAll && (
          <Link
            to="/dashboard/seller/sales"
            className="group flex items-center gap-1 text-sm font-medium text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
          >
            View All Sales
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Item
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 md:table-cell">
                Buyer
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:table-cell">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Amount
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {displayedOrders.map((order) => {
              const config = statusConfig[order.status]
              const StatusIcon = config.icon

              return (
                <tr
                  key={order.id}
                  className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {order.item}
                    </p>
                  </td>
                  <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400 md:table-cell">
                    {order.buyer}
                  </td>
                  <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400 sm:table-cell">
                    {order.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold text-slate-900 dark:text-white">
                    {order.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                        config.bg,
                        config.color
                      )}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {order.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Contact Buyer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {displayedOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="h-12 w-12 text-slate-300 dark:text-slate-600" />
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">No orders yet</p>
        </div>
      )}
    </div>
  )
}
