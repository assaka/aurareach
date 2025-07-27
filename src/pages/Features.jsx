import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Target,
  Rocket,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Database,
  Users,
  Mail,
  Calendar,
  Key,
  MapPin,
  Zap,
  Brain,
  Eye,
  Layers,
  Shield,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";

export default function Features() {
  const platformDetails = {
    apollo: {
      name: "Apollo.io Features",
      description: "B2B Database & Sales Intelligence Platform",
      originalPrice: "$149/month",
      color: "from-blue-500 to-cyan-500",
      features: [
        {
          original: "275M+ Contact Database",
          replacement: "Proprietary B2B Database with Open-Source Mining",
          description: "Instead of relying on Apollo's paid database, we built our own lead generation system using GitHub API, web scraping, and AI-powered lead discovery. This gives you access to fresh, real-time data without the subscription cost.",
          advantage: "Always fresh data, no monthly limits, continuously growing database"
        },
        {
          original: "Email Finder & Verification",
          replacement: "Waterfall Email Enrichment System",
          description: "Our system uses multiple data sources in sequence (waterfall method) to find and verify email addresses. If one source fails, it automatically tries the next one, ensuring higher success rates.",
          advantage: "Higher accuracy, multiple verification methods, automatic fallback"
        },
        {
          original: "Company Insights & Research",
          replacement: "AI-Powered Company Analysis",
          description: "Using GPT-4, we analyze company profiles, social media presence, recent news, and tech stack to provide deeper insights than traditional databases.",
          advantage: "Real-time insights, sentiment analysis, buying signal detection"
        },
        {
          original: "Sales Sequences & Templates",
          replacement: "Multi-Channel Outreach Campaigns",
          description: "Beyond Apollo's email-only sequences, we support LinkedIn automation, SMS, and email in coordinated campaigns with AI-powered personalization.",
          advantage: "Multiple channels, AI personalization, higher response rates"
        },
        {
          original: "CRM Integration",
          replacement: "Built-in Lead Management System",
          description: "No need for external CRM integration. Our platform includes a full lead management system with pipeline tracking, notes, and activity history.",
          advantage: "No integration needed, unified data, lower complexity"
        }
      ]
    },
    smartlead: {
      name: "SmartLead Features", 
      description: "AI Sales Engagement Platform",
      originalPrice: "$94/month",
      color: "from-purple-500 to-pink-500",
      features: [
        {
          original: "AI Personalization Engine",
          replacement: "GPT-4 Powered Message Generation",
          description: "While SmartLead uses basic AI, we leverage the latest GPT-4 models to generate hyper-personalized messages based on deep analysis of lead profiles, company data, and social signals.",
          advantage: "Latest AI technology, context-aware personalization, higher conversion rates"
        },
        {
          original: "Multi-Channel Sequences",
          replacement: "LinkedIn + Email + SMS Automation",
          description: "SmartLead focuses primarily on email. We orchestrate campaigns across LinkedIn, email, and SMS with intelligent timing and channel selection based on lead preferences.",
          advantage: "True multi-channel approach, intelligent routing, better reach"
        },
        {
          original: "Lead Scoring System",
          replacement: "Intent-Based Scoring with Social Signals",
          description: "Our scoring goes beyond basic demographic data to include social media activity, recent company news, technology changes, and buying signals from multiple sources.",
          advantage: "Real-time intent data, social signal integration, predictive scoring"
        },
        {
          original: "CRM Pipeline Management",
          replacement: "Visual Sales Pipeline with AI Insights",
          description: "Our pipeline includes AI-powered next step recommendations, automated follow-up suggestions, and deal probability scoring based on lead behavior.",
          advantage: "AI-powered insights, automated recommendations, higher close rates"
        },
        {
          original: "Email Template Library",
          replacement: "Dynamic AI-Generated Templates",
          description: "Instead of static templates, our AI generates fresh, contextually relevant messages for each lead based on their specific profile and recent activity.",
          advantage: "Always unique messages, context-aware content, reduced spam detection"
        }
      ]
    },
    instantly: {
      name: "Instantly.ai Features",
      description: "Email Outreach & Deliverability Platform", 
      originalPrice: "$77/month",
      color: "from-orange-500 to-red-500",
      features: [
        {
          original: "Unlimited Email Accounts",
          replacement: "Unlimited Mailbox Management with Advanced Health Monitoring",
          description: "Beyond basic account management, our system includes advanced health scoring, reputation monitoring, and predictive deliverability optimization.",
          advantage: "Advanced health metrics, predictive optimization, proactive issue prevention"
        },
        {
          original: "Email Warm-up Service",
          replacement: "AI-Powered Reputation Building System",
          description: "Our warm-up system uses AI to simulate natural email patterns, adjust sending volumes based on domain reputation, and optimize warm-up strategies for each mailbox.",
          advantage: "AI-optimized patterns, personalized warm-up, faster reputation building"
        },
        {
          original: "Deliverability Optimization",
          replacement: "Real-Time Send Optimization with ML",
          description: "Machine learning algorithms analyze recipient behavior, optimal send times, subject line performance, and content patterns to maximize deliverability.",
          advantage: "ML-powered optimization, real-time adjustments, higher inbox rates"
        },
        {
          original: "Campaign Analytics Dashboard",
          replacement: "Advanced Email Performance Analytics",
          description: "Detailed analytics including heat maps, engagement scoring, reply sentiment analysis, and predictive performance metrics.",
          advantage: "Deeper insights, sentiment analysis, predictive metrics"
        },
        {
          original: "A/B Testing Framework",
          replacement: "AI-Optimized Message Variations",
          description: "AI automatically generates and tests multiple message variations, learning from performance data to continuously improve messaging effectiveness.",
          advantage: "Automated optimization, continuous learning, self-improving campaigns"
        }
      ]
    },
    clay: {
      name: "Clay.io Features",
      description: "Data Enrichment & Workflow Automation",
      originalPrice: "$149/month", 
      color: "from-green-500 to-emerald-500",
      features: [
        {
          original: "Waterfall Enrichment System",
          replacement: "Multi-Source Data Aggregation with AI Processing",
          description: "Our waterfall system combines multiple data sources with AI processing to clean, deduplicate, and enhance data quality automatically.",
          advantage: "AI-enhanced processing, better data quality, automated cleanup"
        },
        {
          original: "AI Data Processing",
          replacement: "GPT-4 Data Analysis & Intelligent Formatting",
          description: "Advanced AI processes raw data to extract insights, standardize formats, and identify patterns that traditional systems miss.",
          advantage: "Latest AI models, insight extraction, pattern recognition"
        },
        {
          original: "Custom API Integrations",
          replacement: "Unlimited API Connections with Auto-Configuration",
          description: "Our system can connect to virtually any API with intelligent auto-configuration and error handling, plus built-in rate limiting and optimization.",
          advantage: "Easier setup, automatic optimization, robust error handling"
        },
        {
          original: "Data Validation & Cleaning",
          replacement: "Real-Time Verification with Confidence Scoring",
          description: "Continuous validation of data points with confidence scores, automatic re-verification, and intelligent flagging of outdated information.",
          advantage: "Real-time validation, confidence metrics, proactive updates"
        },
        {
          original: "Workflow Automation",
          replacement: "End-to-End Sales Process Automation",
          description: "Complete automation from lead discovery through nurturing to conversion, with AI-powered decision making at each step.",
          advantage: "Complete automation, AI decision making, higher efficiency"
        }
      ]
    },
    leadjourney: {
      name: "LeadJourney Features",
      description: "Lead Discovery & Intent Monitoring",
      originalPrice: "$97/month",
      color: "from-indigo-500 to-purple-500", 
      features: [
        {
          original: "B2B Lead Database Access",
          replacement: "Open-Source Lead Mining with Real-Time Discovery",
          description: "Instead of relying on static databases, our system actively mines leads from GitHub, social media, job boards, and other public sources in real-time.",
          advantage: "Always current data, real-time discovery, no database limitations"
        },
        {
          original: "Technology Stack Detection",
          replacement: "Real-Time Tech Stack Analysis with Trend Monitoring",
          description: "Our system not only detects current technology usage but also monitors changes, implementation timelines, and technology adoption trends.",
          advantage: "Change detection, trend analysis, implementation timing"
        },
        {
          original: "Intent Signal Monitoring",
          replacement: "Multi-Platform Social Intent Detection",
          description: "Monitor buying signals across Twitter, LinkedIn, GitHub, Reddit, and other platforms with AI-powered sentiment analysis and urgency detection.",
          advantage: "Multi-platform monitoring, AI sentiment analysis, urgency scoring"
        },
        {
          original: "Company Filtering & Search",
          replacement: "AI-Powered Lead Qualification Engine",
          description: "AI analyzes multiple data points to score and qualify leads automatically, considering factors like growth trajectory, funding status, and hiring patterns.",
          advantage: "AI qualification, multi-factor analysis, predictive scoring"
        },
        {
          original: "Contact Discovery Tools",
          replacement: "Multi-Source Contact Finder with Verification",
          description: "Combines multiple methodologies to find contacts including email pattern matching, social media analysis, and organizational chart mapping.",
          advantage: "Multiple discovery methods, higher success rates, verification included"
        }
      ]
    }
  };

  const uniqueFeatures = [
    {
      icon: TrendingUp,
      title: "SEO Content Automation",
      description: "Generate unlimited SEO-optimized blog posts, videos, and documents based on your keyword research and competitor analysis.",
      details: "This feature is completely unique to AuraReach. While other platforms focus on sales outreach, we also automate your content marketing to drive inbound leads and improve search rankings."
    },
    {
      icon: Eye, 
      title: "Social Intent Monitoring",
      description: "Real-time monitoring of social media platforms for buying signals and competitor mentions with AI-powered sentiment analysis.",
      details: "Most platforms only offer basic intent monitoring. Our system actively scans Twitter, LinkedIn, Reddit, and other platforms for real-time buying signals with advanced sentiment analysis."
    },
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "GPT-4 generates hyper-personalized messages by analyzing lead profiles, company news, social activity, and industry trends.",
      details: "While others use basic templating, our AI creates unique, contextually relevant messages for each prospect based on deep analysis of their digital footprint."
    },
    {
      icon: Layers,
      title: "Multi-Channel Orchestration", 
      description: "Coordinate LinkedIn, email, SMS, and content marketing campaigns from a single unified dashboard with intelligent timing.",
      details: "No other platform truly orchestrates across all channels with intelligent timing and context-aware messaging. We ensure your outreach feels natural and coordinated."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <style>
        {`
          .gradient-text {
            background: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .glass-effect {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .hover-lift {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      {/* Header */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <Link to={createPageUrl("Landing")}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="gradient-text">Complete Feature Breakdown</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              See exactly how AuraReach replaces and enhances every feature from the top sales and marketing platforms, 
              plus exclusive features you won't find anywhere else.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Comparison Tabs */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="apollo" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              {Object.entries(platformDetails).map(([key, platform]) => (
                <TabsTrigger key={key} value={key} className="text-sm">
                  {platform.name.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(platformDetails).map(([key, platform]) => (
              <TabsContent key={key} value={key}>
                <Card className="glass-effect border-0 mb-8">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${platform.color} text-white`}>
                        <Target className="w-8 h-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{platform.name}</CardTitle>
                        <p className="text-gray-600">{platform.description}</p>
                        <Badge className="mt-2 bg-red-100 text-red-700">
                          Original: {platform.originalPrice}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                
                <div className="space-y-6">
                  {platform.features.map((feature, index) => (
                    <Card key={index} className="glass-effect border-0 hover-lift">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {feature.original}
                            </h3>
                            <h4 className="text-lg font-semibold gradient-text mb-3">
                              → {feature.replacement}
                            </h4>
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Enhanced
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{feature.description}</p>
                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                          <p className="text-sm text-green-800">
                            <strong>Key Advantage:</strong> {feature.advantage}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Unique Features Section */}
      <div className="px-6 py-16 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Exclusive Features</span> Not Found Anywhere Else
            </h2>
            <p className="text-xl text-gray-600">
              These innovative features are only available in AuraReach
            </p>
          </div>
          
          <div className="grid gap-8">
            {uniqueFeatures.map((feature, index) => (
              <Card key={index} className="glass-effect border-0 hover-lift">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">
                      <Zap className="w-3 h-3 mr-1" />
                      Exclusive
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <p className="text-sm text-purple-800">{feature.details}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="px-6 py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Total Cost Savings</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/20 border-white/30 text-white">
              <CardHeader>
                <CardTitle>Individual Platform Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$566</div>
                <p className="text-lg">per month for all 5 platforms</p>
                <p className="text-sm opacity-80 mt-2">
                  Apollo + SmartLead + Instantly + Clay + LeadJourney
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/30 border-white/50 text-white transform scale-105">
              <CardHeader>
                <CardTitle>AuraReach All-in-One</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$97</div>
                <p className="text-lg">per month for everything</p>
                <p className="text-sm opacity-80 mt-2">
                  All features + exclusive innovations
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-500/80 border-green-400/50 text-white">
              <CardHeader>
                <CardTitle>Your Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$469</div>
                <p className="text-lg">saved every month</p>
                <p className="text-sm opacity-80 mt-2">
                  83% cost reduction
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12">
            <Link to={createPageUrl("Landing")}>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-12 py-4">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Implementation Details */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Technical <span className="gradient-text">Implementation Details</span>
            </h2>
            <p className="text-xl text-gray-600">
              How we built a superior alternative to each platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-effect border-0">
              <CardHeader>
                <Database className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Data Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Built our own B2B database using open-source APIs, web scraping, and AI processing. 
                  Continuously updated with fresh data from multiple sources.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-effect border-0">
              <CardHeader>
                <Brain className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>AI Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Leverages GPT-4 and other cutting-edge AI models for personalization, 
                  data processing, and campaign optimization.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-effect border-0">
              <CardHeader>
                <Rocket className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Automation Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Multi-channel orchestration system that coordinates LinkedIn, email, 
                  SMS, and content marketing with intelligent timing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}