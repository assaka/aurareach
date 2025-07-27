import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wand2, 
  Key, 
  MapPin, 
  Database,
  Zap,
  ArrowRight
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Generate Content",
      description: "Create SEO-optimized posts",
      icon: Wand2,
      href: createPageUrl("ContentStudio"),
      color: "from-purple-500 to-blue-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Add Keywords",
      description: "Target new search terms",
      icon: Key,
      href: createPageUrl("Keywords"),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Setup Destinations",
      description: "Configure publishing targets",
      icon: MapPin,
      href: createPageUrl("Destinations"),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Connect Data Sources",
      description: "Import external data",
      icon: Database,
      href: createPageUrl("DataSources"),
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <Card className="glass-effect border-0 hover-lift">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Link key={index} to={action.href}>
              <div className={`p-4 rounded-lg border hover:border-purple-200 transition-all hover-lift ${action.bgColor}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900">{action.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                <div className="flex items-center text-sm font-medium text-purple-600">
                  Get started
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}