interface SectionHeaderProps {
  title: string
  description: string
  className?: string
}

export function SectionHeader({ title, description, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{title}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
    </div>
  )
}
