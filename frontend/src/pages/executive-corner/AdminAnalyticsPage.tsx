import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Users,
  ArrowUpDown,
  TrendingUp,
  Ship,
  BarChart3,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const revenueData = [
  { month: "Jul", revenue: 42000 },
  { month: "Aug", revenue: 53000 },
  { month: "Sep", revenue: 48000 },
  { month: "Oct", revenue: 61000 },
  { month: "Nov", revenue: 55000 },
  { month: "Dec", revenue: 72000 },
  { month: "Jan", revenue: 68000 },
]

const userGrowthData = [
  { month: "Jul", users: 820 },
  { month: "Aug", users: 890 },
  { month: "Sep", users: 940 },
  { month: "Oct", users: 1020 },
  { month: "Nov", users: 1100 },
  { month: "Dec", users: 1180 },
  { month: "Jan", users: 1234 },
]

const topRoutes = [
  { route: "Shanghai - Los Angeles", volume: 342, percentage: 28 },
  { route: "Rotterdam - New York", volume: 287, percentage: 23 },
  { route: "Singapore - Dubai", volume: 234, percentage: 19 },
  { route: "Lagos - Hamburg", volume: 198, percentage: 16 },
  { route: "Mumbai - Sydney", volume: 172, percentage: 14 },
]

const transactionTypes = [
  { name: "Spot", value: 45, color: "hsl(var(--primary))" },
  { name: "Auction", value: 25, color: "hsl(var(--secondary))" },
  { name: "Contract", value: 20, color: "hsl(var(--accent))" },
  { name: "Other", value: 10, color: "hsl(210, 40%, 60%)" },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Platform performance and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Last 7 Days</Button>
          <Button variant="outline">Last 30 Days</Button>
          <Button>Last 6 Months</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold mt-2">$399K</p>
                <p className="text-sm text-green-500 font-semibold mt-1">+23% vs last period</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-3xl font-bold mt-2">1,234</p>
                <p className="text-sm text-green-500 font-semibold mt-1">+12% vs last period</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-3xl font-bold mt-2">3,456</p>
                <p className="text-sm text-green-500 font-semibold mt-1">+18% vs last period</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-xl">
                <ArrowUpDown className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
                <p className="text-3xl font-bold mt-2">15.2%</p>
                <p className="text-sm text-green-500 font-semibold mt-1">+3.1% vs last period</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Over Time */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenue Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" tickFormatter={(v) => `$${v / 1000}K`} />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  formatter={(value: number) => [value.toLocaleString(), "Users"]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Routes */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5" />
              Top Routes by Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRoutes.map((route, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{route.route}</span>
                    <span className="text-muted-foreground">{route.volume} shipments ({route.percentage}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${route.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction Distribution */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              Transaction Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <ResponsiveContainer width="50%" height={250}>
                <PieChart>
                  <Pie
                    data={transactionTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {transactionTypes.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Share"]}
                    contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {transactionTypes.map((type, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{type.name}</p>
                      <p className="text-xs text-muted-foreground">{type.value}% of total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
