import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { 
  FileText, 
  Video, 
  Download, 
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye
} from "lucide-react";

import ContentPreviewModal from "./ContentPreviewModal";

const statusConfig = {
  draft: { color: "bg-gray-100 text-gray-700", icon: Clock },
  generating: { color: "bg-blue-100 text-blue-700", icon: Loader2 },
  ready: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  published: { color: "bg-purple-100 text-purple-700", icon: CheckCircle2 },
  failed: { color: "bg-red-100 text-red-700", icon: AlertCircle }
};

export default function GenerationHistory({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleViewContent = (post) => {
    setSelectedPost(post);
    setShowPreview(true);
  };

  return (
    <>
      <Card className="glass-effect border-0 hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Generation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No content generated yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => {
                const StatusIcon = statusConfig[post.status]?.icon || Clock;
                
                return (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge className={`${statusConfig[post.status]?.color} border-0`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {post.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {format(new Date(post.created_date), "MMM d, yyyy")}
                          </span>
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
                        onClick={() => handleViewContent(post)}
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

      {showPreview && selectedPost && (
        <ContentPreviewModal
          post={selectedPost}
          onClose={() => {
            setShowPreview(false);
            setSelectedPost(null);
          }}
        />
      )}
    </>
  );
}