"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ShipmentDataPoint {
  name: string
  shipments: number
  delivered?: number
}

interface BuyerShipmentChartProps {
  data: ShipmentDataPoint[]
  title?: string
  description?: string
}

const defaultData: ShipmentDataPoint[] = [
  { name: "Jan", shipments: 4, delivered: 3 },
  { name: "Feb", shipments: 3, delivered: 3 },
  { name: "Mar", shipments: 2, delivered: 2 },
  { name: "Apr", shipments: 6, delivered: 5 },
  { name: "May", shipments: 8, delivered: 7 },
  { name: "Jun", shipments: 5, delivered: 4 },
]

export function BuyerShipmentChart({
  data = defaultData,
  title = "Shipment Activity",
  description = "Monthly shipment volume over the last 6 months",
}: BuyerShipmentChartProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-cyan-500" />
            <span className="text-xs text-slate-500 dark:text-slate-400">Total</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500 dark:text-slate-400">Delivered</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="buyerShipmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="buyerDeliveredGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              }}
              labelStyle={{ color: "#f8fafc", fontWeight: 600, marginBottom: 4 }}
              itemStyle={{ color: "#94a3b8", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="shipments"
              stroke="#06b6d4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#buyerShipmentGradient)"
              name="Total Shipments"
            />
            <Area
              type="monotone"
              dataKey="delivered"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#buyerDeliveredGradient)"
              name="Delivered"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
