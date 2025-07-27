import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { 
  History, 
  Plus, 
  Gift, 
  RefreshCw,
  CreditCard,
  CheckCircle2,
  Circle
} from "lucide-react";

const typeConfig = {
  purchase: { color: "bg-blue-100 text-blue-700", icon: CreditCard },
  weekly_free: { color: "bg-green-100 text-green-700", icon: Gift },
  bonus: { color: "bg-purple-100 text-purple-700", icon: Plus },
  refund: { color: "bg-orange-100 text-orange-700", icon: RefreshCw }
};

export default function CreditHistory({ credits, isLoading }) {
  const sortedCredits = [...credits].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

  return (
    <Card className="glass-effect border-0 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5 text-purple-600" />
          Credit History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
          </div>
        ) : credits.length === 0 ? (
          <div className="text-center py-8">
            <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No credit history yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedCredits.map((credit) => {
              const TypeIcon = typeConfig[credit.type]?.icon || CreditCard;
              
              return (
                <div key={credit.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${typeConfig[credit.type]?.color}`}>
                      <TypeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {credit.description || `${credit.type} credits`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(credit.created_date), "MMM d, yyyy 'at' HH:mm")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${typeConfig[credit.type]?.color} border-0`}>
                      +{credit.amount}
                    </Badge>
                    {credit.used ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}