
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Keyword, Post, Credit, Destination, DataSource, User } from "@/api/entities"; // Added User
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  FileText, 
  Key, 
  MapPin, 
  Database,
  Plus,
  Sparkles,
  Calendar,
  Activity
} from "lucide-react";

import StatsOverview from "../components/dashboard/StatsOverview";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import UpgradePrompt from "../components/dashboard/UpgradePrompt";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalKeywords: 0,
    totalDestinations: 0,
    totalDataSources: 0,
    availableCredits: 0,
    weeklyPostsUsed: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated, if not redirect to landing
    const checkAuth = async () => {
      try {
        await User.me();
        loadDashboardData();
      } catch (error) {
        // User not authenticated, redirect to landing
        window.location.href = '/Landing';
      }
    };
    
    checkAuth();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [posts, keywords, destinations, dataSources, credits] = await Promise.all([
        Post.list('-created_date', 10),
        Keyword.list(),
        Destination.list(),
        DataSource.list(),
        Credit.list()
      ]);

      const totalCredits = credits
        .filter(c => !c.used)
        .reduce((sum, c) => sum + c.amount, 0);

      const thisWeekPosts = posts.filter(post => {
        const postDate = new Date(post.created_date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return postDate >= weekAgo;
      });

      setStats({
        totalPosts: posts.length,
        totalKeywords: keywords.length,
        totalDestinations: destinations.length,
        totalDataSources: dataSources.length,
        availableCredits: totalCredits,
        weeklyPostsUsed: thisWeekPosts.length
      });

      setRecentPosts(posts.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Welcome back!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your programmatic SEO overview
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link to={createPageUrl("Keywords")}>
            <Button variant="outline" className="gap-2 hover-lift">
              <Key className="w-4 h-4" />
              Add Keywords
            </Button>
          </Link>
          <Link to={createPageUrl("ContentStudio")}>
            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift">
              <Sparkles className="w-4 h-4" />
              Generate Content
            </Button>
          </Link>
        </div>
      </div>

      <StatsOverview stats={stats} isLoading={isLoading} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentActivity posts={recentPosts} isLoading={isLoading} />
          <QuickActions />
        </div>
        
        <div className="space-y-6">
          <UpgradePrompt 
            weeklyPostsUsed={stats.weeklyPostsUsed}
            availableCredits={stats.availableCredits}
          />
          
          <Card className="glass-effect border-0 hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-purple-600" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Posts Generated</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {stats.weeklyPostsUsed}/1
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Credits Used</span>
                <span className="font-semibold">{stats.weeklyPostsUsed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Available Credits</span>
                <span className="font-semibold text-green-600">{stats.availableCredits}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
