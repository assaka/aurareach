import React, { useState, useEffect } from "react";
import { Campaign } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Search,
  Send,
  BarChart3
} from "lucide-react";

import CampaignForm from "../components/campaigns/CampaignForm";
import CampaignList from "../components/campaigns/CampaignList";
import CampaignStats from "../components/campaigns/CampaignStats";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterCampaigns();
  }, [campaigns, searchTerm]);

  const loadData = async () => {
    try {
      const campaignData = await Campaign.list('-created_date');
      setCampaigns(campaignData);
    } catch (error) {
      console.error('Failed to load campaign data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCampaigns = () => {
    let filtered = campaigns;

    if (searchTerm) {
      filtered = filtered.filter(campaign => 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCampaigns(filtered);
  };

  const handleSubmit = async (campaignData) => {
    try {
      if (editingCampaign) {
        await Campaign.update(editingCampaign.id, campaignData);
      } else {
        await Campaign.create(campaignData);
      }
      setShowForm(false);
      setEditingCampaign(null);
      loadData();
    } catch (error) {
      console.error('Failed to save campaign:', error);
    }
  };

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    setShowForm(true);
  };
  
  const handleDelete = async (campaignId) => {
    try {
        await Campaign.delete(campaignId);
        loadData();
    } catch (error) {
        console.error('Failed to delete campaign:', error);
    }
  };

  const stats = campaigns.reduce((acc, campaign) => {
    acc.totalSpend += campaign.spend || 0;
    acc.totalClicks += campaign.clicks || 0;
    acc.totalConversions += campaign.conversions || 0;
    acc.totalImpressions += campaign.impressions || 0;
    return acc;
  }, { totalSpend: 0, totalClicks: 0, totalConversions: 0, totalImpressions: 0 });
  
  stats.avgCpc = stats.totalClicks > 0 ? (stats.totalSpend / stats.totalClicks).toFixed(2) : '0.00';


  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Ad Campaign Performance
          </h1>
          <p className="text-gray-600 mt-1">
            Track all your advertising campaigns in one place.
          </p>
        </div>
        
        <Button 
          onClick={() => { setEditingCampaign(null); setShowForm(true); }}
          className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift"
        >
          <Plus className="w-4 h-4" />
          Add Campaign
        </Button>
      </div>

      <CampaignStats stats={stats} />

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search campaigns by name or source..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {showForm && (
        <CampaignForm
          campaign={editingCampaign}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingCampaign(null);
          }}
        />
      )}

      <CampaignList
        campaigns={filteredCampaigns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}