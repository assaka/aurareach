import React, { useState, useEffect } from "react";
import { Post, Keyword } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  Users,
  Clock
} from "lucide-react";

import PerformanceChart from "../components/analytics/PerformanceChart";
import KeywordRankings from "../components/analytics/KeywordRankings";
import ContentMetrics from "../components/analytics/ContentMetrics";

export default function Analytics() {
  const [posts, setPosts] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalEngagement: 0,
    avgReadTime: 0,
    bounceRate: 0,
    topPerformingPosts: [],
    keywordRankings: [],
    monthlyStats: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [postData, keywordData] = await Promise.all([
        Post.list('-created_date'),
        Keyword.list()
      ]);
      
      setPosts(postData);
      setKeywords(keywordData);
      
      // Mock analytics data
      const mockAnalytics = {
        totalViews: 45632,
        totalEngagement: 3421,
        avgReadTime: 3.4,
        bounceRate: 42.3,
        topPerformingPosts: postData.slice(0, 5).map(post => ({
          ...post,
          views: Math.floor(Math.random() * 10000) + 1000,
          engagement: Math.floor(Math.random() * 500) + 50,
          clicks: Math.floor(Math.random() * 1000) + 100
        })),
        keywordRankings: keywordData.slice(0, 10).map(keyword => ({
          ...keyword,
          current_rank: Math.floor(Math.random() * 20) + 1,
          previous_rank: Math.floor(Math.random() * 30) + 1,
          change: Math.floor(Math.random() * 20) - 10
        })),
        monthlyStats: [
          { month: 'Jan', posts: 8, views: 12000, engagement: 890 },
          { month: 'Feb', posts: 12, views: 18000, engagement: 1340 },
          { month: 'Mar', posts: 15, views: 22000, engagement: 1650 },
          { month: 'Apr', posts: 18, views: 28000, engagement: 2100 },
          { month: 'May', posts: 22, views: 35000, engagement: 2800 },
          { month: 'Jun', posts: 25, views: 42000, engagement: 3200 }
        ]
      };
      
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Track your content performance and SEO rankings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-effect border-0 hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Eye className="w-4 h-4" />
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {analytics.totalViews.toLocaleString()}
            </div>
            <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Users className="w-4 h-4" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {analytics.totalEngagement.toLocaleString()}
            </div>
            <p className="text-sm text-green-600 mt-1">+8.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Clock className="w-4 h-4" />
              Avg. Read Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {analytics.avgReadTime}m
            </div>
            <p className="text-sm text-green-600 mt-1">+0.3m from last month</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Activity className="w-4 h-4" />
              Bounce Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {analytics.bounceRate}%
            </div>
            <p className="text-sm text-red-600 mt-1">+2.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <PerformanceChart data={analytics.monthlyStats} isLoading={isLoading} />
        <KeywordRankings keywords={analytics.keywordRankings} isLoading={isLoading} />
      </div>

      <ContentMetrics posts={analytics.topPerformingPosts} isLoading={isLoading} />
    </div>
  );
}