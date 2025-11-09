import { Card } from "@/components/ui/card";
import { Users2, BarChart2, Award, Globe2 } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: Users2,
      value: "500+",
      label: "Happy Clients",
    },
    {
      icon: BarChart2,
      value: "1M+",
      label: "Services Delivered",
    },
    {
      icon: Award,
      value: "99.9%",
      label: "Quality Rate",
    },
    {
      icon: Globe2,
      value: "24/7",
      label: "Customer Support",
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-accent" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}