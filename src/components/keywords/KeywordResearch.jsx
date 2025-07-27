import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Target,
  Search,
  Lightbulb,
  ExternalLink,
  Info
} from "lucide-react";

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'low': return 'bg-green-100 text-green-700';
    case 'medium': return 'bg-yellow-100 text-yellow-700';
    case 'high': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getCompetitionColor = (competition) => {
  switch (competition) {
    case 'low': return 'bg-green-100 text-green-700';
    case 'medium': return 'bg-yellow-100 text-yellow-700';
    case 'high': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function KeywordResearch({ data, onSaveKeyword, semrushData, searchConsoleData }) {
  const [activeTab, setActiveTab] = useState("ai-research");

  const KeywordCard = ({ keyword, isMain = false, source = "ai" }) => (
    <div className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${isMain ? 'border-purple-200 bg-purple-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2">
          <h3 className={`font-medium ${isMain ? 'text-purple-900' : 'text-gray-900'}`}>
            {keyword.keyword}
          </h3>
          <Badge variant="outline" className="text-xs">
            {source === "semrush" ? "Semrush" : source === "gsc" ? "GSC" : "AI"}
          </Badge>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onSaveKeyword(keyword)}
          className="gap-1"
        >
          <Plus className="w-3 h-3" />
          Save
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
        <div className="flex items-center gap-1">
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Volume:</span>
          <span className="font-medium">{keyword.search_volume?.toLocaleString() || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">CPC:</span>
          <span className="font-medium">${keyword.cpc?.toFixed(2) || '0.00'}</span>
        </div>
        {keyword.position && (
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Position:</span>
            <span className="font-medium">#{keyword.position}</span>
          </div>
        )}
        {keyword.clicks && (
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Clicks:</span>
            <span className="font-medium">{keyword.clicks}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        {keyword.difficulty && (
          <Badge className={getDifficultyColor(keyword.difficulty)}>
            {keyword.difficulty} difficulty
          </Badge>
        )}
        {keyword.competition && (
          <Badge className={getCompetitionColor(keyword.competition)}>
            {keyword.competition} competition
          </Badge>
        )}
        {keyword.opportunity_score && (
          <Badge variant="outline">
            Score: {keyword.opportunity_score}/100
          </Badge>
        )}
        {keyword.ctr && (
          <Badge variant="outline">
            CTR: {(keyword.ctr * 100).toFixed(1)}%
          </Badge>
        )}
      </div>
      
      {keyword.trend && (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4" />
          <span>Trend: {keyword.trend}</span>
        </div>
      )}
    </div>
  );

  const SemrushContent = () => (
    <div className="space-y-6">
      {!semrushData ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Connect your Semrush account to get professional keyword data including search volume, CPC, competition analysis, and SERP features.
            <Button variant="link" className="p-0 h-auto ml-2" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                Setup Semrush Integration
              </a>
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {semrushData.overview && (
            <Card className="glass-effect border-0">
              <CardHeader>
                <CardTitle className="text-lg">Semrush Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{semrushData.overview.search_volume?.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Search Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${semrushData.overview.cpc?.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Avg CPC</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{semrushData.overview.kd_score}</div>
                    <div className="text-sm text-gray-600">KD Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{semrushData.overview.results?.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Results</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {semrushData.related_keywords && semrushData.related_keywords.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Related Keywords (Semrush)</h3>
              <div className="grid gap-3">
                {semrushData.related_keywords.map((keyword, index) => (
                  <KeywordCard key={index} keyword={keyword} source="semrush" />
                ))}
              </div>
            </div>
          )}

          {semrushData.serp_features && semrushData.serp_features.length > 0 && (
            <Card className="glass-effect border-0">
              <CardHeader>
                <CardTitle className="text-lg">SERP Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {semrushData.serp_features.map((feature, index) => (
                    <Badge key={index} variant="outline">{feature}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );

  const GoogleSearchConsoleContent = () => (
    <div className="space-y-6">
      {!searchConsoleData ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Connect your Google Search Console to see your actual search performance data, including impressions, clicks, CTR, and current rankings.
            <Button variant="link" className="p-0 h-auto ml-2" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                Connect Google Search Console
              </a>
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div>
            <h3 className="text-lg font-semibold mb-3">Your Search Performance</h3>
            <div className="grid gap-3">
              {searchConsoleData.queries.map((query, index) => (
                <KeywordCard key={index} keyword={query} source="gsc" />
              ))}
            </div>
          </div>

          {searchConsoleData.opportunities && searchConsoleData.opportunities.length > 0 && (
            <Card className="glass-effect border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                  Optimization Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchConsoleData.opportunities.map((opportunity, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">{opportunity.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{opportunity.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {opportunity.keywords?.map((keyword, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );

  const AIResearchContent = () => (
    <div className="space-y-6">
      {/* Main Keyword */}
      {data.main_keyword && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Main Keyword Analysis
          </h3>
          <KeywordCard keyword={data.main_keyword} isMain={true} />
        </div>
      )}

      {/* Related Keywords */}
      {data.related_keywords && data.related_keywords.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Related Keywords</h3>
          <div className="grid gap-3">
            {data.related_keywords.map((keyword, index) => (
              <KeywordCard key={index} keyword={keyword} />
            ))}
          </div>
        </div>
      )}

      {/* Long-tail Keywords */}
      {data.long_tail_keywords && data.long_tail_keywords.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Long-tail Opportunities</h3>
          <div className="grid gap-3">
            {data.long_tail_keywords.map((keyword, index) => (
              <KeywordCard key={index} keyword={keyword} />
            ))}
          </div>
        </div>
      )}

      {/* Content Opportunities */}
      {data.content_opportunities && data.content_opportunities.length > 0 && (
        <Card className="glass-effect border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              Content Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.content_opportunities.map((opportunity, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{opportunity.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{opportunity.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.keywords?.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-research">AI Research</TabsTrigger>
          <TabsTrigger value="semrush">Semrush Data</TabsTrigger>
          <TabsTrigger value="search-console">Search Console</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai-research" className="mt-6">
          <AIResearchContent />
        </TabsContent>
        
        <TabsContent value="semrush" className="mt-6">
          <SemrushContent />
        </TabsContent>
        
        <TabsContent value="search-console" className="mt-6">
          <GoogleSearchConsoleContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}