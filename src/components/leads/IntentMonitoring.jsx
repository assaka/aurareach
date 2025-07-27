import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Plus, Search, Loader2, Twitter, Activity } from "lucide-react";
import { intentMonitoring } from "@/api/functions";

export default function IntentMonitoring() {
  const [keywords, setKeywords] = useState(["SEO services", "content marketing"]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const addKeyword = () => {
    if (currentKeyword && !keywords.includes(currentKeyword)) {
      setKeywords([...keywords, currentKeyword]);
      setCurrentKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter(k => k !== keywordToRemove));
  };

  const handleMonitoring = async () => {
    setIsMonitoring(true);
    setAnalysisResult(null);
    try {
      const { data } = await intentMonitoring({ keywords, companies: [] }); // Companies can be added for more specific searches
      if(data.success) {
        setAnalysisResult(data);
      } else {
        throw new Error(data.error || 'Failed to monitor intent.');
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsMonitoring(false);
    }
  };

  return (
    <Card className="glass-effect border-0 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-600" />
          Social Intent Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Keywords to Monitor</label>
          <div className="flex gap-2">
            <Input
              value={currentKeyword}
              onChange={(e) => setCurrentKeyword(e.target.value)}
              placeholder="e.g., 'looking for agency'"
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
            />
            <Button type="button" onClick={addKeyword} size="sm"><Plus className="w-4 h-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.map(kw => (
              <Badge key={kw} variant="secondary" className="gap-1">
                {kw}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeKeyword(kw)} />
              </Badge>
            ))}
          </div>
        </div>
        <Button onClick={handleMonitoring} disabled={isMonitoring} className="w-full gap-2">
          {isMonitoring ? <Loader2 className="w-4 h-4 animate-spin"/> : <Search className="w-4 h-4"/>}
          {isMonitoring ? 'Scanning Social Feeds...' : 'Scan for Intent Signals'}
        </Button>
        {analysisResult && (
            <div className="space-y-3 pt-4">
                <Alert>
                    <Twitter className="h-4 w-4" />
                    <AlertDescription>
                        Found {analysisResult.summary.total_signals} potential signals, with {analysisResult.summary.high_intent_signals} showing strong buying intent.
                    </AlertDescription>
                </Alert>
                <div className="max-h-60 overflow-y-auto space-y-2">
                    {analysisResult.intent_analysis.map(item => item.qualified_signals.map((signal, index) => (
                        <div key={`${item.keyword}-${index}`} className="p-3 border rounded-lg text-sm">
                            <p className="font-semibold text-gray-800">"{signal.text}"</p>
                            <div className="flex justify-between items-center mt-2">
                                <Badge variant="outline">{item.keyword}</Badge>
                                <Badge className="bg-green-100 text-green-700">Intent Score: {signal.intent_score}</Badge>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}