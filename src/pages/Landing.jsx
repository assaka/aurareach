import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles,
  ArrowRight,
  Check,
  Users,
  Target,
  MessageSquare,
  TrendingUp,
  Zap,
  Crown,
  Globe,
  BarChart3,
  Rocket,
  Mail,
  Calendar,
  Database,
  Key,
  Eye,
  Play,
  Star,
  Shield,
  Brain,
  Layers,
  ExternalLink
} from "lucide-react";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await User.login();
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };

  const platformComparisons = {
    apollo: {
      name: "Apollo.io",
      logo: "🚀",
      color: "from-blue-500 to-cyan-500",
      description: "B2B Database & Sales Intelligence",
      features: [
        { name: "275M+ Contact Database", status: "replaced", replacement: "Proprietary B2B Database" },
        { name: "Email Finder & Verification", status: "replaced", replacement: "Waterfall Email Enrichment" },
        { name: "Company Insights", status: "enhanced", replacement: "AI-Powered Company Analysis" },
        { name: "Sales Sequences", status: "enhanced", replacement: "Multi-Channel Outreach Campaigns" },
        { name: "CRM Integration", status: "replaced", replacement: "Built-in Lead Management" },
        { name: "Analytics Dashboard", status: "enhanced", replacement: "Unified Sales & Marketing Analytics" }
      ]
    },
    smartlead: {
      name: "SmartLead",
      logo: "🎯",
      color: "from-purple-500 to-pink-500",
      description: "AI Sales Engagement Platform",
      features: [
        { name: "AI Personalization", status: "enhanced", replacement: "GPT-4 Powered Message Generation" },
        { name: "Multi-Channel Sequences", status: "enhanced", replacement: "LinkedIn + Email + SMS Automation" },
        { name: "Lead Scoring", status: "enhanced", replacement: "Intent-Based Scoring System" },
        { name: "CRM Pipeline", status: "enhanced", replacement: "Visual Sales Pipeline Management" },
        { name: "Email Templates", status: "enhanced", replacement: "Dynamic AI-Generated Templates" },
        { name: "Performance Tracking", status: "enhanced", replacement: "Real-time Campaign Analytics" }
      ]
    },
    instantly: {
      name: "Instantly.ai",
      logo: "⚡",
      color: "from-orange-500 to-red-500",
      description: "Email Outreach & Deliverability",
      features: [
        { name: "Unlimited Email Accounts", status: "enhanced", replacement: "Unlimited Mailbox Management" },
        { name: "Email Warm-up", status: "enhanced", replacement: "Automated Reputation Building" },
        { name: "Deliverability Optimization", status: "enhanced", replacement: "AI-Powered Send Optimization" },
        { name: "Campaign Analytics", status: "enhanced", replacement: "Advanced Email Performance Metrics" },
        { name: "A/B Testing", status: "enhanced", replacement: "AI-Optimized Message Variations" },
        { name: "Inbox Management", status: "enhanced", replacement: "Unified Multi-Channel Inbox" }
      ]
    },
    clay: {
      name: "Clay.io",
      logo: "🏺",
      color: "from-green-500 to-emerald-500",
      description: "Data Enrichment & Automation",
      features: [
        { name: "Waterfall Enrichment", status: "enhanced", replacement: "Multi-Source Data Aggregation" },
        { name: "AI Data Processing", status: "enhanced", replacement: "GPT-4 Data Analysis & Cleaning" },
        { name: "Custom Integrations", status: "enhanced", replacement: "Unlimited API Connections" },
        { name: "Data Validation", status: "enhanced", replacement: "Real-time Data Verification" },
        { name: "Workflow Automation", status: "enhanced", replacement: "End-to-End Sales Automation" },
        { name: "Personalization at Scale", status: "enhanced", replacement: "AI-Powered Mass Personalization" }
      ]
    },
    leadjourney: {
      name: "LeadJourney",
      logo: "🛤️",
      color: "from-indigo-500 to-purple-500",
      description: "Lead Discovery & Intent Data",
      features: [
        { name: "B2B Lead Database", status: "replaced", replacement: "Open-Source Lead Mining" },
        { name: "Technology Tracking", status: "enhanced", replacement: "Real-time Tech Stack Detection" },
        { name: "Intent Monitoring", status: "enhanced", replacement: "Social Media Intent Signals" },
        { name: "Company Filtering", status: "enhanced", replacement: "AI-Powered Lead Qualification" },
        { name: "Contact Discovery", status: "enhanced", replacement: "Multi-Source Contact Finding" },
        { name: "Data Export", status: "enhanced", replacement: "Direct CRM Integration" }
      ]
    }
  };

  const uniqueFeatures = [
    {
      icon: TrendingUp,
      title: "SEO Content Automation",
      description: "Generate unlimited SEO-optimized blog posts, videos, and documents automatically",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: Eye,
      title: "Social Intent Monitoring",
      description: "Track buying signals across Twitter, LinkedIn, and other social platforms in real-time",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "GPT-4 generates hyper-personalized messages based on lead profiles and company data",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Layers,
      title: "Multi-Channel Orchestration",
      description: "Coordinate LinkedIn, email, SMS, and content marketing from a single dashboard",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP Marketing at TechFlow",
      content: "AuraReach replaced our entire sales stack. We went from 5 different tools to 1 unified platform.",
      rating: 5,
      savings: "$2,400/month"
    },
    {
      name: "Michael Rodriguez",
      role: "Founder at DataViz Corp",
      content: "The LinkedIn automation alone pays for the entire platform. 10x ROI in the first month.",
      rating: 5,
      savings: "$1,800/month"
    },
    {
      name: "Emily Johnson",
      role: "Growth Manager at CloudSync",
      content: "Finally, a platform that combines lead gen, outreach, and content marketing. Game changer.",
      rating: 5,
      savings: "$3,200/month"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <style>
        {`
          .hero-gradient {
            background: linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #10B981 100%);
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
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .platform-card {
            transition: all 0.3s ease;
          }
          
          .platform-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">AuraReach</h1>
              <p className="text-xs text-gray-500">All-in-One Sales & SEO Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to={createPageUrl("Features")}>
              <Button variant="ghost">Features</Button>
            </Link>
            <Button 
              onClick={handleGoogleLogin} 
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isLoading ? 'Signing In...' : 'Start Free'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
            🚀 Replace 5+ Sales Tools with 1 Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">AuraReach</span>
            <br />
            <span className="text-gray-800">Replaces Everything</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stop paying for Apollo, SmartLead, Instantly, Clay, and LeadJourney separately. 
            Get all their best features in one unified platform, plus exclusive AI-powered automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
            >
              {isLoading ? 'Starting...' : 'Start Free Trial'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link to={createPageUrl("Features")}>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                See All Features
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-16">
            <p className="text-sm text-gray-500 mb-4">
              Trusted by 10,000+ sales teams to replace their entire stack
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              <span className="text-2xl">🚀 Apollo</span>
              <span className="text-2xl">🎯 SmartLead</span>
              <span className="text-2xl">⚡ Instantly</span>
              <span className="text-2xl">🏺 Clay</span>
              <span className="text-2xl">🛤️ LeadJourney</span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Comparison Section */}
      <section className="px-6 py-16 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">One Platform</span> to Rule Them All
            </h2>
            <p className="text-xl text-gray-600">
              See how AuraReach replaces and enhances features from every major sales platform
            </p>
          </div>
          
          <Tabs defaultValue="apollo" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              {Object.entries(platformComparisons).map(([key, platform]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  <span className="text-lg">{platform.logo}</span>
                  <span className="hidden sm:inline">{platform.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(platformComparisons).map(([key, platform]) => (
              <TabsContent key={key} value={key}>
                <Card className="glass-effect border-0">
                  <CardHeader className="text-center pb-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className={`text-4xl p-4 rounded-2xl bg-gradient-to-r ${platform.color} text-white`}>
                        {platform.logo}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{platform.name}</CardTitle>
                        <p className="text-gray-600">{platform.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {platform.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              feature.status === 'enhanced' 
                                ? 'bg-green-100' 
                                : feature.status === 'replaced' 
                                  ? 'bg-blue-100' 
                                  : 'bg-gray-100'
                            }`}>
                              {feature.status === 'enhanced' ? (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                              ) : feature.status === 'replaced' ? (
                                <Zap className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Check className="w-4 h-4 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{feature.name}</p>
                              <p className="text-sm text-gray-600">{feature.replacement}</p>
                            </div>
                          </div>
                          <Badge className={
                            feature.status === 'enhanced' 
                              ? 'bg-green-100 text-green-700' 
                              : feature.status === 'replaced' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-gray-100 text-gray-700'
                          }>
                            {feature.status === 'enhanced' ? '🚀 Enhanced' : 
                             feature.status === 'replaced' ? '🔄 Replaced' : '✅ Included'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Unique Features Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Plus <span className="gradient-text">Exclusive Features</span> You Won't Find Anywhere Else
            </h2>
            <p className="text-xl text-gray-600">
              Why settle for copies when you can get innovations?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {uniqueFeatures.map((feature, index) => (
              <Card key={index} className="glass-effect border-0 hover-lift platform-card">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Savings Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Stop Overpaying for Multiple Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Traditional Stack Cost</h3>
              <div className="space-y-3">
                <div className="flex justify-between bg-white/20 p-3 rounded">
                  <span>Apollo.io Professional</span>
                  <span>$149/mo</span>
                </div>
                <div className="flex justify-between bg-white/20 p-3 rounded">
                  <span>SmartLead Unlimited</span>
                  <span>$94/mo</span>
                </div>
                <div className="flex justify-between bg-white/20 p-3 rounded">
                  <span>Instantly.ai Scale</span>
                  <span>$77/mo</span>
                </div>
                <div className="flex justify-between bg-white/20 p-3 rounded">
                  <span>Clay Starter</span>
                  <span>$149/mo</span>
                </div>
                <div className="flex justify-between bg-white/20 p-3 rounded">
                  <span>LeadJourney Pro</span>
                  <span>$97/mo</span>
                </div>
                <div className="flex justify-between bg-white/30 p-4 rounded font-bold text-lg border-t-2 border-white">
                  <span>Total Monthly Cost</span>
                  <span>$566/mo</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">AuraReach All-in-One</h3>
              <div className="bg-white/20 p-8 rounded-xl">
                <div className="text-6xl font-bold mb-4">$97</div>
                <div className="text-xl mb-4">per month</div>
                <div className="text-lg mb-6">Everything included</div>
                <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                  Save $469/month
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Button 
              size="lg" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-12 py-4"
            >
              Start Saving Today
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">10,000+</span> Teams Made the Switch
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-effect border-0 hover-lift">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      Saves {testimonial.savings}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Replace Everything</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 10,000+ sales teams who consolidated their entire tech stack into AuraReach
          </p>
          
          <Button 
            size="lg" 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-xl px-12 py-4 mb-6"
          >
            {isLoading ? 'Starting Your Free Trial...' : 'Start Free Trial'}
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
          
          <p className="text-sm text-gray-500">
            ✅ 14-day free trial • ✅ No credit card required • ✅ Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}