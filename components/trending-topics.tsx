import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUpIcon, UsersIcon, BrainIcon, RocketIcon } from "lucide-react"

export function TrendingTopics() {
  const topics = [
    {
      icon: TrendingUpIcon,
      title: "Business Growth",
      description: "Strategies for sustainable business expansion",
      color: "text-blue-500"
    },
    {
      icon: UsersIcon,
      title: "Team Management",
      description: "Leading and developing high-performing teams",
      color: "text-green-500"
    },
    {
      icon: BrainIcon,
      title: "Innovation",
      description: "Latest trends in business innovation",
      color: "text-purple-500"
    },
    {
      icon: RocketIcon,
      title: "Startups",
      description: "Essential guides for startup success",
      color: "text-red-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {topics.map((topic, index) => {
        const Icon = topic.icon
        return (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Icon className={`h-8 w-8 ${topic.color} mb-4`} />
            <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
            <p className="text-muted-foreground mb-4">{topic.description}</p>
            <Button variant="ghost" className="w-full">
              Explore Topic
            </Button>
          </Card>
        )
      })}
    </div>
  )
}