import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users,
  Building2,
  Mail,
  Linkedin,
  Globe,
  TrendingUp,
  MapPin,
  Star,
  ExternalLink
} from "lucide-react";

const statusColors = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-green-100 text-green-700",
  unqualified: "bg-gray-100 text-gray-700",
  converted: "bg-purple-100 text-purple-700"
};

const getIntentScoreColor = (score) => {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
};

export default function LeadList({ leads, onStatusUpdate, isLoading }) {
  if (isLoading) {
    return (
      <Card className="glass-effect border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Skeleton className="h-5 w-48 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          Leads ({leads.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No leads found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors hover-lift">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{lead.company_name}</h3>
                      {lead.website && (
                        <a 
                          href={lead.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    {lead.contact_name && (
                      <p className="text-sm text-gray-600">
                        {lead.contact_name} • {lead.contact_title}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {lead.intent_score && (
                      <div className="flex items-center gap-1">
                        <Star className={`w-4 h-4 ${getIntentScoreColor(lead.intent_score)}`} />
                        <span className={`text-sm font-medium ${getIntentScoreColor(lead.intent_score)}`}>
                          {lead.intent_score}
                        </span>
                      </div>
                    )}
                    <Badge className={statusColors[lead.status]}>
                      {lead.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                  {lead.industry && (
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lead.industry}</span>
                    </div>
                  )}
                  {lead.company_size && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lead.company_size} employees</span>
                    </div>
                  )}
                  {lead.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lead.location}</span>
                    </div>
                  )}
                  {lead.revenue && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lead.revenue}</span>
                    </div>
                  )}
                </div>

                {lead.tech_stack && lead.tech_stack.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Tech Stack:</p>
                    <div className="flex flex-wrap gap-1">
                      {lead.tech_stack.slice(0, 6).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {lead.tech_stack.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{lead.tech_stack.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {lead.social_intents && lead.social_intents.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Recent Intent Signals:</p>
                    <div className="flex flex-wrap gap-1">
                      {lead.social_intents.slice(0, 3).map((intent, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                          {intent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    {lead.contact_email && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Mail className="w-3 h-3" />
                        Email
                      </Button>
                    )}
                    {lead.contact_linkedin && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Linkedin className="w-3 h-3" />
                        LinkedIn
                      </Button>
                    )}
                  </div>
                  <select
                    value={lead.status}
                    onChange={(e) => onStatusUpdate(lead.id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="unqualified">Unqualified</option>
                    <option value="converted">Converted</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}