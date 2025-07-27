import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Edit, 
  Play, 
  Pause, 
  TrendingUp, 
  Hash,
  Tag,
  Key
} from "lucide-react";

const difficultyColors = {
  low: "bg-green-100 text-green-700 border-green-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200", 
  high: "bg-red-100 text-red-700 border-red-200"
};

const statusColors = {
  active: "bg-green-100 text-green-700 border-green-200",
  paused: "bg-gray-100 text-gray-700 border-gray-200",
  archived: "bg-red-100 text-red-700 border-red-200"
};

export default function KeywordList({ keywords, onEdit, onStatusToggle, isLoading }) {
  if (isLoading) {
    return (
      <Card className="glass-effect border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-purple-600" />
            Keywords
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5 text-purple-600" />
          Keywords ({keywords.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {keywords.length === 0 ? (
          <div className="text-center py-12">
            <Key className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No keywords found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {keywords.map((keyword) => (
              <div key={keyword.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors hover-lift">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{keyword.keyword}</h3>
                    <Badge className={`${statusColors[keyword.status]} border`}>
                      {keyword.status}
                    </Badge>
                    <Badge className={`${difficultyColors[keyword.difficulty]} border`}>
                      {keyword.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {keyword.search_volume > 0 && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{keyword.search_volume.toLocaleString()} searches/month</span>
                      </div>
                    )}
                    {keyword.category && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{keyword.category}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onStatusToggle(keyword)}
                    className="gap-1"
                  >
                    {keyword.status === 'active' ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Activate
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(keyword)}
                    className="gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}