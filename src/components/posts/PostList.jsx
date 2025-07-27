import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { 
  FileText, 
  Eye, 
  Download, 
  Video,
  ExternalLink,
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

export default function PostList({ posts, campaigns, onViewContent, isLoading }) {
  const getCampaignName = (campaignId) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign ? campaign.name : 'Direct Generation';
  };

  if (isLoading) {
    return (
      <Card className="glass-effect border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <Skeleton className="h-5 w-64 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-8 w-16" />
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
          <FileText className="w-5 h-5 text-purple-600" />
          Posts ({posts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No posts found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const StatusIcon = statusConfig[post.status]?.icon || Clock;
              
              return (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors hover-lift">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge className={`${statusConfig[post.status]?.color} border-0`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {post.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {format(new Date(post.created_date), "MMM d, yyyy")}
                        </span>
                        {post.campaign_id && (
                          <Badge variant="outline">
                            {getCampaignName(post.campaign_id)}
                          </Badge>
                        )}
                        {post.video_url && (
                          <Badge variant="outline" className="gap-1">
                            <Video className="w-3 h-3" />
                            Video
                          </Badge>
                        )}
                        {post.document_url && (
                          <Badge variant="outline" className="gap-1">
                            <Download className="w-3 h-3" />
                            Document
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Keyword: {post.keyword}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewContent(post)}
                      className="gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    {post.video_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={post.video_url} target="_blank" rel="noopener noreferrer">
                          <Video className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {post.document_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={post.document_url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4" />
                        </a>
                      </Button>
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