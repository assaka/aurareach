import React, { useState, useEffect } from "react";
import { Post, Campaign, Keyword } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search,
  Filter,
  FileText,
  Eye,
  Download,
  ExternalLink
} from "lucide-react";

import PostList from "../components/posts/PostList";
import PostStats from "../components/posts/PostStats";
import ContentPreviewModal from "../components/content/ContentPreviewModal";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, statusFilter, campaignFilter]);

  const loadData = async () => {
    try {
      const [postData, campaignData] = await Promise.all([
        Post.list('-created_date'),
        Campaign.list()
      ]);
      
      setPosts(postData);
      setCampaigns(campaignData);
    } catch (error) {
      console.error('Failed to load posts data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.keyword?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    if (campaignFilter !== "all") {
      filtered = filtered.filter(post => post.campaign_id === campaignFilter);
    }

    setFilteredPosts(filtered);
  };

  const handleViewContent = (post) => {
    setSelectedPost(post);
    setShowPreview(true);
  };

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    ready: posts.filter(p => p.status === 'ready').length,
    generating: posts.filter(p => p.status === 'generating').length,
    failed: posts.filter(p => p.status === 'failed').length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Generated Posts
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage all your generated content
          </p>
        </div>
      </div>

      <PostStats stats={stats} />

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="generating">Generating</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <PostList
        posts={filteredPosts}
        campaigns={campaigns}
        onViewContent={handleViewContent}
        isLoading={isLoading}
      />

      {showPreview && selectedPost && (
        <ContentPreviewModal
          post={selectedPost}
          onClose={() => {
            setShowPreview(false);
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
}