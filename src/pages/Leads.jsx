
import React, { useState, useEffect } from "react";
import { Lead, LeadCampaign } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Search,
  Users,
  Target,
  TrendingUp,
  Filter
} from "lucide-react";

import LeadList from "../components/leads/LeadList";
import LeadFilters from "../components/leads/LeadFilters";
import LeadStats from "../components/leads/LeadStats";
import LeadGenerationModal from "../components/leads/LeadGenerationModal";
import IntentMonitoring from "../components/leads/IntentMonitoring"; // New import

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    industry: "all",
    company_size: "all",
    intent_score: "all"
  });
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, filters]);

  const loadData = async () => {
    try {
      const [leadData, campaignData] = await Promise.all([
        Lead.list('-created_date'),
        LeadCampaign.list('-created_date')
      ]);
      
      setLeads(leadData);
      setCampaigns(campaignData);
    } catch (error) {
      console.error('Failed to load leads data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.industry?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }

    if (filters.industry !== "all") {
      filtered = filtered.filter(lead => lead.industry === filters.industry);
    }

    if (filters.company_size !== "all") {
      filtered = filtered.filter(lead => lead.company_size === filters.company_size);
    }

    if (filters.intent_score !== "all") {
      const scoreRanges = {
        "high": [80, 100],
        "medium": [50, 79],
        "low": [0, 49]
      };
      const [min, max] = scoreRanges[filters.intent_score] || [0, 100];
      filtered = filtered.filter(lead => 
        lead.intent_score >= min && lead.intent_score <= max
      );
    }

    setFilteredLeads(filtered);
  };

  const handleStatusUpdate = async (leadId, newStatus) => {
    try {
      await Lead.update(leadId, { status: newStatus });
      loadData();
    } catch (error) {
      console.error('Failed to update lead status:', error);
    }
  };

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length,
    avgIntentScore: leads.length > 0 
      ? Math.round(leads.reduce((sum, l) => sum + (l.intent_score || 0), 0) / leads.length)
      : 0
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Lead Generation
          </h1>
          <p className="text-gray-600 mt-1">
            Find high-quality leads based on social intents and tech stacks
          </p>
        </div>
        
        <Button 
          onClick={() => setShowGenerationModal(true)}
          className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift"
        >
          <Plus className="w-4 h-4" />
          Generate Leads
        </Button>
      </div>

      <LeadStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search leads by company, contact, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <LeadFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          <LeadList
            leads={filteredLeads}
            onStatusUpdate={handleStatusUpdate}
            isLoading={isLoading}
          />
        </div>

        <div className="lg:col-span-1 space-y-6">
            <IntentMonitoring />
        </div>
      </div>

      {showGenerationModal && (
        <LeadGenerationModal
          onClose={() => setShowGenerationModal(false)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}
