import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface RecommendationCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
}

export default function RecommendationCard({ title, description, icon: Icon, color }: RecommendationCardProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-100 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mb-4`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

