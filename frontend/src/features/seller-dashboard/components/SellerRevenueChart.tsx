"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { TrendingUp } from "lucide-react"

interface RevenueDataPoint {
  name: string
  revenue: number
  orders?: number
}

interface SellerRevenueChartProps {
  data?: RevenueDataPoint[]
  title?: string
  description?: string
  totalRevenue?: number
  revenueChange?: number
}

const defaultData: RevenueDataPoint[] = [
  { name: "Jan", revenue: 12000, orders: 8 },
  { name: "Feb", revenue: 19000, orders: 12 },
  { name: "Mar", revenue: 15000, orders: 10 },
  { name: "Apr", revenue: 25000, orders: 18 },
  { name: "May", revenue: 32000, orders: 24 },
  { name: "Jun", revenue: 28000, orders: 20 },
]

export function SellerRevenueChart({
  data = defaultData,
  title = "Revenue Overview",
  description = "Monthly revenue performance",
  totalRevenue = 131200,
  revenueChange = 15,
}: SellerRevenueChartProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`
    }
    return `$${value}`
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      {/* Header with summary */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 p-4 dark:from-amber-950/50 dark:to-yellow-950/50">
          <div>
            <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            +{revenueChange}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="sellerRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={formatCurrency}
              dx={-10}
            />
            <Tooltip
              cursor={{ fill: "rgba(245, 158, 11, 0.1)" }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "#f8fafc", fontWeight: 600, marginBottom: 4 }}
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString()}`,
                name === "revenue" ? "Revenue" : "Orders",
              ]}
            />
            <Bar
              dataKey="revenue"
              fill="url(#sellerRevenueGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={60}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === data.length - 1 ? "#10b981" : "url(#sellerRevenueGradient)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-gradient-to-b from-amber-500 to-amber-600" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Monthly Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Current Month</span>
        </div>
      </div>
    </div>
  )
}
