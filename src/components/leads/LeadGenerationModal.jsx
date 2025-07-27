
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lead } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { 
  Target, 
  Search, 
  Loader2, 
  Plus,
  X,
  Sparkles
} from "lucide-react";

export default function LeadGenerationModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    target_industry: "",
    company_size: [],
    location: "",
    tech_stack: [],
    keywords: [],
    intent_keywords: []
  });
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [currentTech, setCurrentTech] = useState("");
  const [currentIntentKeyword, setCurrentIntentKeyword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLeads, setGeneratedLeads] = useState([]);

  const addKeyword = () => {
    if (currentKeyword.trim() && !formData.keywords.includes(currentKeyword.trim())) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, currentKeyword.trim()]
      });
      setCurrentKeyword("");
    }
  };

  const addTech = () => {
    if (currentTech.trim() && !formData.tech_stack.includes(currentTech.trim())) {
      setFormData({
        ...formData,
        tech_stack: [...formData.tech_stack, currentTech.trim()]
      });
      setCurrentTech("");
    }
  };

  const addIntentKeyword = () => {
    if (currentIntentKeyword.trim() && !formData.intent_keywords.includes(currentIntentKeyword.trim())) {
      setFormData({
        ...formData,
        intent_keywords: [...formData.intent_keywords, currentIntentKeyword.trim()]
      });
      setCurrentIntentKeyword("");
    }
  };

  const removeItem = (array, item, key) => {
    setFormData({
      ...formData,
      [key]: array.filter(i => i !== item)
    });
  };

  const generateLeads = async () => {
    setIsGenerating(true);
    try {
      // NEW: Prioritize our own open-source data miner
      const openSourceResponse = await fetch('/functions/openSourceLeadData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          criteria: {
            locations: formData.location ? [formData.location] : [],
            company_sizes: formData.company_size,
            industries: formData.target_industry ? [formData.target_industry] : [],
            tech_stack: formData.tech_stack,
            intent_keywords: formData.intent_keywords
          }
        })
      });

      if (openSourceResponse.ok) {
        const openSourceData = await openSourceResponse.json();
        if (openSourceData.success && openSourceData.leads && openSourceData.leads.length > 0) {
          setGeneratedLeads(openSourceData.leads);
          setIsGenerating(false);
          return;
        }
      }

      // Fallback to AI generation if our own database returns no leads
      const prompt = `Generate high-quality B2B leads based on the following criteria:

Industry: ${formData.target_industry || "Any"}
Company Size: ${formData.company_size.join(", ") || "Any"}
Location: ${formData.location || "Any"}
Required Tech Stack: ${formData.tech_stack.join(", ") || "Any"}
Intent Keywords: ${formData.intent_keywords.join(", ") || "General business intent"}

Generate 10 realistic leads with the following information for each:
- Company name
- Website URL
- Industry
- Company size
- Location
- Contact name and title
- Estimated revenue
- Tech stack (array of technologies)
- Social intent signals (recent activities indicating buying intent)
- Intent score (0-100 based on buying signals)

Make sure the leads are realistic and match the criteria provided. Focus on companies that would actually be interested in SEO and content marketing services.`;

      const response = await InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            leads: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  company_name: { type: "string" },
                  website: { type: "string" },
                  industry: { type: "string" },
                  company_size: { type: "string" },
                  location: { type: "string" },
                  contact_name: { type: "string" },
                  contact_title: { type: "string" },
                  revenue: { type: "string" },
                  tech_stack: { type: "array", items: { type: "string" } },
                  social_intents: { type: "array", items: { type: "string" } },
                  intent_score: { type: "number" }
                }
              }
            }
          }
        }
      });

      setGeneratedLeads(response.leads || []);
    } catch (error) {
      console.error('Failed to generate leads:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveLeads = async () => {
    try {
      for (const leadData of generatedLeads) {
        await Lead.create({
          ...leadData,
          status: 'new',
          source: 'AI Generated'
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save leads:', error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Generate Leads
          </DialogTitle>
        </DialogHeader>

        {!generatedLeads.length ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Target Industry</Label>
                <Input
                  value={formData.target_industry}
                  onChange={(e) => setFormData({...formData, target_industry: e.target.value})}
                  placeholder="e.g., SaaS, E-commerce, Healthcare"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., United States, Europe, San Francisco"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Company Size</Label>
              <div className="flex flex-wrap gap-2">
                {["1-10", "11-50", "51-200", "201-1000", "1000+"].map(size => (
                  <Button
                    key={size}
                    variant={formData.company_size.includes(size) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const sizes = formData.company_size.includes(size)
                        ? formData.company_size.filter(s => s !== size)
                        : [...formData.company_size, size];
                      setFormData({...formData, company_size: sizes});
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tech Stack Requirements</Label>
              <div className="flex gap-2">
                <Input
                  value={currentTech}
                  onChange={(e) => setCurrentTech(e.target.value)}
                  placeholder="e.g., React, AWS, Salesforce"
                  onKeyPress={(e) => e.key === 'Enter' && addTech()}
                />
                <Button type="button" onClick={addTech} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tech_stack.map(tech => (
                  <Badge key={tech} variant="secondary" className="gap-1">
                    {tech}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeItem(formData.tech_stack, tech, 'tech_stack')}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Intent Keywords (What they might be searching for)</Label>
              <div className="flex gap-2">
                <Input
                  value={currentIntentKeyword}
                  onChange={(e) => setCurrentIntentKeyword(e.target.value)}
                  placeholder="e.g., CRM software, marketing automation"
                  onKeyPress={(e) => e.key === 'Enter' && addIntentKeyword()}
                />
                <Button type="button" onClick={addIntentKeyword} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.intent_keywords.map(keyword => (
                  <Badge key={keyword} variant="secondary" className="gap-1">
                    {keyword}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeItem(formData.intent_keywords, keyword, 'intent_keywords')}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={generateLeads} disabled={isGenerating} className="gap-2">
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Leads
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertDescription>
                Found {generatedLeads.length} potential leads matching your criteria!
              </AlertDescription>
            </Alert>

            <div className="max-h-96 overflow-y-auto space-y-3">
              {generatedLeads.map((lead, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{lead.company_name}</h3>
                      <p className="text-sm text-gray-600">{lead.contact_name} • {lead.contact_title}</p>
                    </div>
                    <Badge variant="outline">Score: {lead.intent_score}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>Industry: {lead.industry}</div>
                    <div>Size: {lead.company_size}</div>
                    <div>Location: {lead.location}</div>
                    <div>Revenue: {lead.revenue}</div>
                  </div>
                  {lead.tech_stack && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Tech Stack:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {lead.tech_stack.slice(0, 4).map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setGeneratedLeads([])}>
                Generate New
              </Button>
              <Button onClick={saveLeads} className="gap-2">
                <Plus className="w-4 h-4" />
                Save All Leads
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
