import { Card } from "@/components/ui/card";
import { Users2, BarChart2, Award, Globe2 } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: Users2,
      value: "50K+",
      label: "Active Users",
    },
    {
      icon: BarChart2,
      value: "89%",
      label: "Growth Rate",
    },
    {
      icon: Award,
      value: "200+",
      label: "Expert Articles",
    },
    {
      icon: Globe2,
      value: "24/7",
      label: "Global Support",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <Icon className="w-8 h-8 mx-auto mb-4 text-accent" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}