import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { 
  FileText, 
  Calendar, 
  Tag, 
  Copy, 
  ExternalLink,
  Video,
  Download,
  CheckCircle2,
  Clock,
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

export default function ContentPreviewModal({ post, onClose }) {
  const StatusIcon = statusConfig[post.status]?.icon || Clock;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(post.content);
    // You could add a toast notification here
    alert('Content copied to clipboard!');
  };

  // Format content for better readability
  const formatContent = (content) => {
    if (!content) return "No content available";
    
    // Split by paragraphs and add proper spacing
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Check if it's a header (starts with #)
      if (paragraph.startsWith('#')) {
        const level = paragraph.match(/^#+/)[0].length;
        const text = paragraph.replace(/^#+\s*/, '');
        const className = level === 1 ? 'text-2xl font-bold mt-6 mb-4' :
                         level === 2 ? 'text-xl font-bold mt-5 mb-3' :
                         'text-lg font-semibold mt-4 mb-2';
        return (
          <h1 key={index} className={className}>
            {text}
          </h1>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold mb-2">
                {post.title}
              </DialogTitle>
              <DialogDescription className="text-base">
                Generated content preview
              </DialogDescription>
            </div>
            <Badge className={`${statusConfig[post.status]?.color} border-0 flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" />
              {post.status}
            </Badge>
          </div>
        </DialogHeader>

        <Separator />

        {/* Post Metadata */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Created:</span>
              <span className="font-medium">
                {format(new Date(post.created_date), "MMM d, yyyy 'at' HH:mm")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Keyword:</span>
              <span className="font-medium">{post.keyword}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Credits Used:</span>
              <span className="font-medium">{post.credits_used}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Content */}
        <ScrollArea className="flex-1 px-6 py-4" style={{ maxHeight: '60vh' }}>
          <div className="prose prose-sm max-w-none">
            {formatContent(post.content)}
          </div>
          
          {!post.content && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No content available for this post</p>
            </div>
          )}
        </ScrollArea>

        <Separator />

        {/* Actions */}
        <div className="p-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {post.video_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={post.video_url} target="_blank" rel="noopener noreferrer">
                    <Video className="w-4 h-4 mr-2" />
                    View Video
                  </a>
                </Button>
              )}
              {post.document_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={post.document_url} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download Document
                  </a>
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={copyToClipboard}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Content
              </Button>
              <Button onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}