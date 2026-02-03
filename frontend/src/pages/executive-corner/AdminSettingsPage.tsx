import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Settings,
  Shield,
  Bell,
  Globe,
  Save,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"

export default function AdminSettingsPage() {
  const { toast } = useToast()

  // Platform Settings
  const [platformName, setPlatformName] = useState("Ontime Maritime")
  const [supportEmail, setSupportEmail] = useState("support@ontimemaritime.com")
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  // Security Settings
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [enforce2FA, setEnforce2FA] = useState(false)
  const [minPasswordLength, setMinPasswordLength] = useState("8")

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [alertThreshold, setAlertThreshold] = useState("100")

  // API Settings
  const [rateLimit, setRateLimit] = useState("1000")
  const [webhookUrl, setWebhookUrl] = useState("")

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Settings */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Platform Settings
            </CardTitle>
            <CardDescription>General platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable access for non-admin users
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className="text-muted-foreground hover:text-foreground"
              >
                {maintenanceMode ? (
                  <ToggleRight className="h-8 w-8 text-primary" />
                ) : (
                  <ToggleLeft className="h-8 w-8" />
                )}
              </button>
            </div>
            <Button onClick={() => handleSave("Platform")} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Platform Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Authentication and access control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minPassword">Minimum Password Length</Label>
              <Input
                id="minPassword"
                type="number"
                value={minPasswordLength}
                onChange={(e) => setMinPasswordLength(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enforce 2FA</Label>
                <p className="text-sm text-muted-foreground">
                  Require two-factor authentication for all users
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEnforce2FA(!enforce2FA)}
                className="text-muted-foreground hover:text-foreground"
              >
                {enforce2FA ? (
                  <ToggleRight className="h-8 w-8 text-primary" />
                ) : (
                  <ToggleLeft className="h-8 w-8" />
                )}
              </button>
            </div>
            <Button onClick={() => handleSave("Security")} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Email and alert configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send email alerts for important events
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEmailNotifications(!emailNotifications)}
                className="text-muted-foreground hover:text-foreground"
              >
                {emailNotifications ? (
                  <ToggleRight className="h-8 w-8 text-primary" />
                ) : (
                  <ToggleLeft className="h-8 w-8" />
                )}
              </button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alertThreshold">Alert Threshold (events/hour)</Label>
              <Input
                id="alertThreshold"
                type="number"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Trigger alerts when events exceed this threshold
              </p>
            </div>
            <Button onClick={() => handleSave("Notification")} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              API Configuration
            </CardTitle>
            <CardDescription>API rate limits and webhooks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rateLimit">Rate Limit (requests/minute)</Label>
              <Input
                id="rateLimit"
                type="number"
                value={rateLimit}
                onChange={(e) => setRateLimit(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                type="url"
                placeholder="https://your-webhook-endpoint.com/events"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Receive real-time event notifications via webhook
              </p>
            </div>
            <Button onClick={() => handleSave("API")} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save API Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
