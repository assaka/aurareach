

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  Key, 
  MapPin, 
  Database, 
  Wand2, 
  CreditCard,
  TrendingUp,
  Sparkles,
  Menu,
  X,
  Calendar,
  FileText, // Added FileText for Posts
  Copy, // Added Copy for Templates
  Send, // Added Send for Campaigns
  Users, // Added Users for Leads
  MessageSquare, // New icon for Inbox
  Rocket, // New icon for Outreach
  Mailbox // New icon for Mailboxes
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: LayoutDashboard },
  { title: "Outreach", url: createPageUrl("Outreach"), icon: Rocket }, // New Item
  { title: "Inbox", url: createPageUrl("Inbox"), icon: MessageSquare }, // New Item
  { title: "Leads", url: createPageUrl("Leads"), icon: Users },
  { title: "Campaigns", url: createPageUrl("Campaigns"), icon: Send },
  { title: "Mailboxes", url: createPageUrl("Mailboxes"), icon: Mailbox }, // New Item
  { title: "Posts", url: createPageUrl("Posts"), icon: FileText },
  { title: "Keywords", url: createPageUrl("Keywords"), icon: Key },
  { title: "Keyword Research", url: createPageUrl("KeywordOverview"), icon: TrendingUp },
  { title: "Data Sources", url: createPageUrl("DataSources"), icon: Database },
  { title: "Destinations", url: createPageUrl("Destinations"), icon: MapPin },
  { title: "Auto-Schedule", url: createPageUrl("AutoSchedule"), icon: Calendar },
  { title: "Analytics", url: createPageUrl("Analytics"), icon: TrendingUp },
  { title: "Credits", url: createPageUrl("Credits"), icon: CreditCard },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActivePage = (url) => location.pathname === url;

  // Check if user is on landing page
  const isLandingPage = currentPageName === 'Landing';
  
  // If on landing page, don't show the sidebar layout
  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <style>
        {`
          :root {
            --primary-gradient: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%);
            --secondary-gradient: linear-gradient(135deg, #10B981 0%, #059669 100%);
            --accent-gradient: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
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
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          .premium-glow {
            box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);
          }
        `}
      </style>

      {/* Mobile Header */}
      <header className="lg:hidden glass-effect border-b sticky top-0 z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AuraReach
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover:bg-purple-50"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-effect border-b px-4 py-3 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover-lift ${
                isActivePage(item.url)
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'hover:bg-purple-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 glass-effect border-r min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center premium-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  AuraReach
                </h1>
                <p className="text-xs text-gray-500">Sales & SEO Platform</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover-lift ${
                    isActivePage(item.url)
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Credits</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-purple-700">5</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Free Weekly
                </Badge>
              </div>
              <Link to={createPageUrl("Credits")}>
                <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Buy Credits
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

