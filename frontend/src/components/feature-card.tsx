import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  image: string
  icon: LucideIcon
  title: string
  description: string
  iconColor?: string
}

export function FeatureCard({
  image,
  icon: Icon,
  title,
  description,
  iconColor = "bg-primary/10 text-primary"
}: FeatureCardProps) {
  return (
    <Card className="glass border-2 hover:border-primary/50 transition-all duration-500 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
        <div className={`absolute bottom-4 left-4 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <CardContent className="p-6 space-y-3">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
