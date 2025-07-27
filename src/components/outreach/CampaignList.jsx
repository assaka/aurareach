import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, Edit, Play, Pause } from 'lucide-react';

const CampaignList = ({ campaigns, onEdit, isLoading }) => {
  return (
    <Card className="glass-effect border-0">
      <CardContent className="pt-6">
        {isLoading ? <p>Loading campaigns...</p> : campaigns.length === 0 ? (
          <div className="text-center py-12">
            <Rocket className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No outreach campaigns created yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="p-4 border rounded-lg hover:bg-gray-50/50 hover-lift">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <Badge variant="outline" className="capitalize">{campaign.platform}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">{campaign.status === 'active' ? <Pause size={16}/> : <Play size={16}/>}</Button>
                        <Button variant="outline" size="sm" onClick={() => onEdit(campaign)}><Edit size={16}/></Button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                    <div>
                        <p className="text-sm text-gray-500">Leads</p>
                        <p className="font-bold text-xl">{campaign.leads?.length || 0}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Connected</p>
                        <p className="font-bold text-xl">{campaign.analytics?.connected || 0}%</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Replied</p>
                        <p className="font-bold text-xl">{campaign.analytics?.replied || 0}%</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignList;