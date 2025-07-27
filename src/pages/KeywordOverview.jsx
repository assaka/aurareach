
import React, { useState, useEffect } from "react";
import { Keyword } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  TrendingUp,
  DollarSign,
  Target,
  RefreshCw,
  Download
} from "lucide-react";

import KeywordResearch from "../components/keywords/KeywordResearch";
import OpportunityAnalysis from "../components/keywords/OpportunityAnalysis";
import CompetitorAnalysis from "../components/keywords/CompetitorAnalysis";

export default function KeywordOverview() {
  const [keywords, setKeywords] = useState([]);
  const [researchData, setResearchData] = useState(null);
  const [semrushData, setSemrushData] = useState(null);
  const [searchConsoleData, setSearchConsoleData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isResearching, setIsResearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadKeywords();
  }, []);

  const loadKeywords = async () => {
    try {
      const data = await Keyword.list('-opportunity_score', 50);
      setKeywords(data);
    } catch (error) {
      console.error('Failed to load keywords:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const performKeywordResearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsResearching(true);
    try {
      // AI Research
      const aiResponse = await InvokeLLM({
        prompt: `Perform comprehensive keyword research for "${searchTerm}". 
        Analyze search volume, competition, CPC data, and related keywords.
        Include trend analysis and opportunity scoring.
        Focus on SEO and content marketing opportunities.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            main_keyword: {
              type: "object",
              properties: {
                keyword: { type: "string" },
                search_volume: { type: "number" },
                cpc: { type: "number" },
                competition: { type: "string" },
                difficulty: { type: "string" },
                trend: { type: "string" },
                opportunity_score: { type: "number" }
              }
            },
            related_keywords: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  keyword: { type: "string" },
                  search_volume: { type: "number" },
                  cpc: { type: "number" },
                  competition: { type: "string" },
                  difficulty: { type: "string" },
                  opportunity_score: { type: "number" }
                }
              }
            },
            long_tail_keywords: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  keyword: { type: "string" },
                  search_volume: { type: "number" },
                  cpc: { type: "number" },
                  difficulty: { type: "string" }
                }
              }
            },
            competitor_analysis: {
              type: "object",
              properties: {
                top_competitors: { type: "array", items: { type: "string" } },
                average_cpc: { type: "number" },
                market_insights: { type: "string" }
              }
            },
            content_opportunities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  keywords: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      });

      setResearchData(aiResponse);

      // Mock Semrush data (replace with actual API call when backend functions are enabled)
      const mockSemrushData = {
        overview: {
          search_volume: Math.floor(Math.random() * 50000) + 1000,
          cpc: Math.random() * 5 + 0.5,
          kd_score: Math.floor(Math.random() * 100),
          results: Math.floor(Math.random() * 10000000) + 100000
        },
        related_keywords: aiResponse.related_keywords?.slice(0, 5).map(kw => ({
          ...kw,
          source: 'semrush'
        })) || [],
        serp_features: ['Featured Snippet', 'People Also Ask', 'Local Pack', 'Image Pack']
      };

      // Mock Search Console data (replace with actual OAuth integration)
      const mockSearchConsoleData = {
        queries: [
          {
            keyword: searchTerm,
            clicks: Math.floor(Math.random() * 1000) + 10,
            impressions: Math.floor(Math.random() * 10000) + 100,
            ctr: parseFloat((Math.random() * 0.1 + 0.01).toFixed(4)),
            position: Math.floor(Math.random() * 20) + 1
          },
          ...Array(4).fill(0).map((_, i) => ({
            keyword: `${searchTerm} ${['near me', 'best', 'cheap', 'reviews'][i]}`,
            clicks: Math.floor(Math.random() * 500) + 5,
            impressions: Math.floor(Math.random() * 5000) + 50,
            ctr: parseFloat((Math.random() * 0.08 + 0.005).toFixed(4)),
            position: Math.floor(Math.random() * 30) + 5
          }))
        ],
        opportunities: [
          {
            title: "High Impression, Low CTR Keywords",
            description: "These keywords get many impressions but low click-through rates. Consider optimizing titles and meta descriptions.",
            keywords: [`${searchTerm} guide`, `${searchTerm} tips`]
          },
          {
            title: "Page 2 Rankings",
            description: "Keywords ranking on page 2 that could be optimized to reach page 1.",
            keywords: [`best ${searchTerm}`, `${searchTerm} review`]
          }
        ]
      };

      setSemrushData(mockSemrushData);
      setSearchConsoleData(mockSearchConsoleData);

    } catch (error) {
      console.error('Keyword research failed:', error);
      alert('Failed to perform keyword research. Please try again.');
    } finally {
      setIsResearching(false);
    }
  };

  const saveKeyword = async (keywordData) => {
    try {
      await Keyword.create({
        ...keywordData,
        last_updated: new Date().toISOString()
      });
      loadKeywords();
      alert('Keyword saved successfully!');
    } catch (error) {
      console.error('Failed to save keyword:', error);
      alert('Failed to save keyword. Please try again.');
    }
  };

  const exportData = () => {
    if (!researchData && !semrushData && !searchConsoleData) return;
    
    const exportCombinedData = {
      research_date: new Date().toISOString(),
      search_term: searchTerm,
      ai_research: researchData,
      semrush_data: semrushData,
      search_console_data: searchConsoleData,
    };
    
    const blob = new Blob([JSON.stringify(exportCombinedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `keyword-research-${searchTerm}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Keyword Overview & Research
          </h1>
          <p className="text-gray-600 mt-1">
            Discover high-opportunity keywords with CPC data and competition analysis
          </p>
        </div>
      </div>

      {/* Keyword Research Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="glass-effect border-0 rounded-lg p-6 hover-lift">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-600" />
              Keyword Research
            </h2>
            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Enter keyword or topic to research..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performKeywordResearch()}
                className="flex-1"
              />
              <Button
                onClick={performKeywordResearch}
                disabled={isResearching || !searchTerm.trim()}
                className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isResearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Researching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Research
                  </>
                )}
              </Button>
              {(researchData || semrushData || searchConsoleData) && (
                <Button
                  variant="outline"
                  onClick={exportData}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              )}
            </div>

            {researchData && (
              <KeywordResearch 
                data={researchData}
                semrushData={semrushData}
                searchConsoleData={searchConsoleData}
                onSaveKeyword={saveKeyword}
              />
            )}
          </div>
        </div>

        <div className="space-y-6">
          <OpportunityAnalysis keywords={keywords} isLoading={isLoading} />
          {researchData && (
            <CompetitorAnalysis data={researchData.competitor_analysis} />
          )}
        </div>
      </div>
    </div>
  );
}
