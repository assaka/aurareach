import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  TrendingUp
} from "lucide-react";

export default function CompetitorAnalysis({ data }) {
  if (!data) return null;

  return (
    <Card className="glass-effect border-0 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          Competition Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.average_cpc && (
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Average CPC</span>
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              ${data.average_cpc.toFixed(2)}
            </Badge>
          </div>
        )}

        {data.top_competitors && data.top_competitors.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              Top Competitors
            </h4>
            <div className="space-y-2">
              {data.top_competitors.map((competitor, index) => (
                <div key={index} className="p-2 border rounded-lg text-sm">
                  {competitor}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.market_insights && (
          <div>
            <h4 className="font-medium mb-2">Market Insights</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.market_insights}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}