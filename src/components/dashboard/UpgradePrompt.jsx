import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  Sparkles, 
  ArrowRight,
  Gift
} from "lucide-react";

export default function UpgradePrompt({ weeklyPostsUsed, availableCredits }) {
  const freePostsLimit = 1;
  const usagePercent = (weeklyPostsUsed / freePostsLimit) * 100;
  const isLimitReached = weeklyPostsUsed >= freePostsLimit;

  return (
    <Card className="glass-effect border-0 hover-lift premium-glow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Premium Features
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Weekly Free Posts</span>
            <Badge variant={isLimitReached ? "destructive" : "secondary"}>
              {weeklyPostsUsed}/{freePostsLimit}
            </Badge>
          </div>
          <Progress value={usagePercent} className="h-2" />
        </div>

        {isLimitReached && availableCredits === 0 && (
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              You've reached your weekly limit. Buy credits to continue generating content!
            </p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">Unlock Premium</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1 ml-6">
            <li>• Unlimited post generation</li>
            <li>• Video content creation</li>
            <li>• Document generation</li>
            <li>• Advanced analytics</li>
          </ul>
        </div>

        <Link to={createPageUrl("Credits")}>
          <Button className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
            <Gift className="w-4 h-4" />
            Buy Credits
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}