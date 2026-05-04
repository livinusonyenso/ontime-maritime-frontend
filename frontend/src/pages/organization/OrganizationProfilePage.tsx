"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, Globe, MapPin } from "lucide-react"

export default function OrganizationProfilePage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Company Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Your organization's public information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            {user.company_name || "Your Company"}
            {user.is_email_verified && (
              <Badge variant="secondary" className="text-xs ml-2">Verified</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>{user.phone}</span>
          </div>

          {user.business_address && (
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span>{user.business_address}</span>
            </div>
          )}

          {user.website && (
            <div className="flex items-center gap-3 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                {user.website}
              </a>
            </div>
          )}

          {!user.business_address && !user.website && (
            <p className="text-muted-foreground text-sm">
              No additional profile information provided during registration.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
