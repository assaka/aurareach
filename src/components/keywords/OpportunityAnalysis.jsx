import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Target, 
  TrendingUp, 
  DollarSign,
  Zap
} from "lucide-react";

export default function OpportunityAnalysis({ keywords, isLoading }) {
  const topOpportunities = keywords
    .filter(k => k.opportunity_score && k.opportunity_score > 0)
    .sort((a, b) => (b.opportunity_score || 0) - (a.opportunity_score || 0))
    .slice(0, 5);

  const highValueKeywords = keywords
    .filter(k => k.cpc && k.cpc > 2)
    .sort((a, b) => (b.cpc || 0) - (a.cpc || 0))
    .slice(0, 5);

  return (
    <Card className="glass-effect border-0 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Opportunity Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Opportunities */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Top Opportunities
              </h4>
              {topOpportunities.length === 0 ? (
                <p className="text-gray-500 text-sm">No opportunity scores available</p>
              ) : (
                <div className="space-y-2">
                  {topOpportunities.map((keyword) => (
                    <div key={keyword.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{keyword.keyword}</span>
                        <Badge className="bg-amber-100 text-amber-700">
                          {keyword.opportunity_score}/100
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        {keyword.search_volume && (
                          <span>{keyword.search_volume.toLocaleString()} searches</span>
                        )}
                        {keyword.cpc && (
                          <span>${keyword.cpc.toFixed(2)} CPC</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* High Value Keywords */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                High Value Keywords
              </h4>
              {highValueKeywords.length === 0 ? (
                <p className="text-gray-500 text-sm">No high-value keywords found</p>
              ) : (
                <div className="space-y-2">
                  {highValueKeywords.map((keyword) => (
                    <div key={keyword.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{keyword.keyword}</span>
                        <Badge className="bg-green-100 text-green-700">
                          ${keyword.cpc.toFixed(2)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        {keyword.search_volume && (
                          <span>{keyword.search_volume.toLocaleString()} searches</span>
                        )}
                        {keyword.competition && (
                          <span>{keyword.competition} competition</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}