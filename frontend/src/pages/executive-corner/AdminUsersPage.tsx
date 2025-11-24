
import { useEffect, useState } from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Search, Filter, UserPlus, MoreVertical, Mail, Shield } from "lucide-react"

const dummyUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@globalfreight.com",
    role: "user",
    status: "active",
    joined: "2024-01-10",
    shipments: 12,
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@pacificship.com",
    role: "user",
    status: "active",
    joined: "2024-01-15",
    shipments: 8,
  },
  {
    id: "3",
    name: "Ahmed Osman",
    email: "ahmed@lagostrade.com",
    role: "admin",
    status: "active",
    joined: "2023-12-20",
    shipments: 25,
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "maria@euroship.com",
    role: "user",
    status: "inactive",
    joined: "2024-01-20",
    shipments: 3,
  },
  {
    id: "5",
    name: "David Lee",
    email: "david@asiacargo.com",
    role: "user",
    status: "active",
    joined: "2024-01-25",
    shipments: 15,
  },
]

export default function AdminUsersPage() {
  const { user, isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      // router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const filteredUsers = dummyUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-muted-foreground mt-1">Manage platform users and permissions</p>
              </div>
              <Button size="lg">
                <UserPlus className="mr-2 h-5 w-5" />
                Add User
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-5 w-5" />
              Filter
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12">
          <Card className="glass">
            <CardHeader>
              <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredUsers.map((usr) => (
                  <div
                    key={usr.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {usr.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{usr.name}</p>
                          {usr.role === "admin" && (
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className={
                              usr.status === "active"
                                ? "bg-green-500/10 text-green-500 border-green-500/30"
                                : "bg-slate-500/10 text-slate-500 border-slate-500/30"
                            }
                          >
                            {usr.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {usr.email}
                          </p>
                          <span className="text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">{usr.shipments} shipments</p>
                          <span className="text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Joined {usr.joined}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
