import React, { useState, useEffect } from "react";
import { OutreachCampaign } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Plus, Rocket } from "lucide-react";

import CampaignBuilder from "../components/outreach/CampaignBuilder";
import CampaignList from "../components/outreach/CampaignList";

export default function Outreach() {
  const [campaigns, setCampaigns] = useState([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    setIsLoading(true);
    try {
      const data = await OutreachCampaign.list('-created_date');
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to load outreach campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (campaignData) => {
    try {
      if (editingCampaign) {
        await OutreachCampaign.update(editingCampaign.id, campaignData);
      } else {
        await OutreachCampaign.create(campaignData);
      }
      setShowBuilder(false);
      setEditingCampaign(null);
      loadCampaigns();
    } catch (error) {
      console.error('Failed to save outreach campaign:', error);
    }
  };

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    setShowBuilder(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Outreach Campaigns
          </h1>
          <p className="text-gray-600 mt-1">
            Automate your LinkedIn outreach with personalized sequences.
          </p>
        </div>
        
        <Button 
          onClick={() => { setEditingCampaign(null); setShowBuilder(true); }}
          className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {showBuilder && (
        <CampaignBuilder
          campaign={editingCampaign}
          onSave={handleSave}
          onCancel={() => setShowBuilder(false)}
        />
      )}

      <CampaignList
        campaigns={campaigns}
        onEdit={handleEdit}
        isLoading={isLoading}
      />
    </div>
  );
}