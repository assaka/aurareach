import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  MousePointerClick, 
  Target,
  Eye
} from "lucide-react";

export default function CampaignStats({ stats }) {
  const statCards = [
    { title: "Total Spend", value: `$${stats.totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: DollarSign, color: "from-blue-500 to-blue-600" },
    { title: "Total Clicks", value: stats.totalClicks.toLocaleString(), icon: MousePointerClick, color: "from-green-500 to-green-600" },
    { title: "Total Conversions", value: stats.totalConversions.toLocaleString(), icon: Target, color: "from-purple-500 to-purple-600" },
    { title: "Average CPC", value: `$${stats.avgCpc}`, icon: DollarSign, color: "from-orange-500 to-orange-600" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="glass-effect border-0 hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
              {stat.title}
              <stat.icon className={`w-4 h-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}