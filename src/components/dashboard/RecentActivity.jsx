import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from "lucide-react";

const statusConfig = {
  draft: { color: "bg-gray-100 text-gray-700", icon: Clock },
  generating: { color: "bg-blue-100 text-blue-700", icon: Loader2 },
  ready: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  published: { color: "bg-purple-100 text-purple-700", icon: CheckCircle2 },
  failed: { color: "bg-red-100 text-red-700", icon: AlertCircle }
};

export default function RecentActivity({ posts, isLoading }) {
  return (
    <Card className="glass-effect border-0 hover-lift">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          Recent Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No posts yet. Start by generating your first post!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => {
              const StatusIcon = statusConfig[post.status]?.icon || Clock;
              
              return (
                <div key={post.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(post.created_date), "MMM d, yyyy 'at' HH:mm")}
                    </p>
                  </div>
                  <Badge className={`${statusConfig[post.status]?.color} border-0`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {post.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}