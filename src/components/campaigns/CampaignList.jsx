import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { 
  Send,
  Edit,
  Trash2,
  BarChart3,
  DollarSign,
  MousePointerClick,
  Target
} from "lucide-react";

const statusColors = {
  draft: "bg-gray-100 text-gray-700 border-gray-200",
  active: "bg-green-100 text-green-700 border-green-200",
  paused: "bg-yellow-100 text-yellow-700 border-yellow-200",
  completed: "bg-purple-100 text-purple-700 border-purple-200"
};

const sourceColors = {
    "Google Ads": "bg-blue-100 text-blue-700",
    "Facebook Ads": "bg-indigo-100 text-indigo-700",
    "LinkedIn Ads": "bg-sky-100 text-sky-700",
    "Twitter Ads": "bg-gray-200 text-gray-800",
    "Other": "bg-gray-100 text-gray-700"
};

export default function CampaignList({ campaigns, onEdit, onDelete, isLoading }) {
  
  const calculateMetrics = (campaign) => {
    const ctr = campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) : 0;
    const cpc = campaign.clicks > 0 ? (campaign.spend / campaign.clicks).toFixed(2) : 0;
    const budgetUsage = campaign.budget > 0 ? ((campaign.spend / campaign.budget) * 100).toFixed(0) : 0;
    return { ctr, cpc, budgetUsage };
  };

  if (isLoading) {
    return (
      <Card className="glass-effect border-0">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-0">
      <CardContent className="pt-6">
        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <Send className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No ad campaigns found. Add your first one to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => {
              const { ctr, cpc, budgetUsage } = calculateMetrics(campaign);
              return (
              <div key={campaign.id} className="p-4 border rounded-lg hover:bg-gray-50/50 transition-colors hover-lift">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{campaign.name}</h3>
                      <Badge className={`${statusColors[campaign.status]} border`}>{campaign.status}</Badge>
                      <Badge className={sourceColors[campaign.source]}>{campaign.source}</Badge>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-4">
                        {campaign.start_date && format(new Date(campaign.start_date), "MMM d, yyyy")}
                        {campaign.end_date && ` - ${format(new Date(campaign.end_date), "MMM d, yyyy")}`}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm items-center">
                            <span>Budget Usage</span>
                            <span className="font-mono">${campaign.spend.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                        </div>
                        <Progress value={budgetUsage} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-auto">
                    <Button variant="outline" size="sm" onClick={() => onEdit(campaign)} className="gap-1">
                      <Edit className="w-3 h-3" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(campaign.id)} className="gap-1">
                      <Trash2 className="w-3 h-3" /> Delete
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 mt-4 border-t">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Clicks</p>
                        <p className="font-bold text-lg">{campaign.clicks.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Conversions</p>
                        <p className="font-bold text-lg">{campaign.conversions.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Avg. CPC</p>
                        <p className="font-bold text-lg">${cpc}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">CTR</p>
                        <p className="font-bold text-lg">{ctr}%</p>
                    </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </CardContent>
    </Card>
  );
}