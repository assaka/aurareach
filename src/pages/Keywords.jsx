import React, { useState, useEffect } from "react";
import { Keyword } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Search,
  Filter,
  Key,
  TrendingUp,
  Pause,
  Play
} from "lucide-react";

import KeywordForm from "../components/keywords/KeywordForm";
import KeywordList from "../components/keywords/KeywordList";
import KeywordStats from "../components/keywords/KeywordStats";

export default function Keywords() {
  const [keywords, setKeywords] = useState([]);
  const [filteredKeywords, setFilteredKeywords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadKeywords();
  }, []);

  useEffect(() => {
    filterKeywords();
  }, [keywords, searchTerm, filterStatus]);

  const loadKeywords = async () => {
    try {
      const data = await Keyword.list('-created_date');
      setKeywords(data);
    } catch (error) {
      console.error('Failed to load keywords:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterKeywords = () => {
    let filtered = keywords;

    if (searchTerm) {
      filtered = filtered.filter(keyword => 
        keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        keyword.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(keyword => keyword.status === filterStatus);
    }

    setFilteredKeywords(filtered);
  };

  const handleSubmit = async (keywordData) => {
    try {
      if (editingKeyword) {
        await Keyword.update(editingKeyword.id, keywordData);
      } else {
        await Keyword.create(keywordData);
      }
      setShowForm(false);
      setEditingKeyword(null);
      loadKeywords();
    } catch (error) {
      console.error('Failed to save keyword:', error);
    }
  };

  const handleEdit = (keyword) => {
    setEditingKeyword(keyword);
    setShowForm(true);
  };

  const handleStatusToggle = async (keyword) => {
    const newStatus = keyword.status === 'active' ? 'paused' : 'active';
    try {
      await Keyword.update(keyword.id, { status: newStatus });
      loadKeywords();
    } catch (error) {
      console.error('Failed to update keyword status:', error);
    }
  };

  const stats = {
    total: keywords.length,
    active: keywords.filter(k => k.status === 'active').length,
    paused: keywords.filter(k => k.status === 'paused').length,
    totalVolume: keywords.reduce((sum, k) => sum + (k.search_volume || 0), 0)
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Keywords
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your target keywords for content generation
          </p>
        </div>
        
        <Button 
          onClick={() => setShowForm(true)}
          className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift"
        >
          <Plus className="w-4 h-4" />
          Add Keyword
        </Button>
      </div>

      <KeywordStats stats={stats} />

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            onClick={() => setFilterStatus("active")}
            size="sm"
            className="gap-1"
          >
            <Play className="w-3 h-3" />
            Active
          </Button>
          <Button
            variant={filterStatus === "paused" ? "default" : "outline"}
            onClick={() => setFilterStatus("paused")}
            size="sm"
            className="gap-1"
          >
            <Pause className="w-3 h-3" />
            Paused
          </Button>
        </div>
      </div>

      {showForm && (
        <KeywordForm
          keyword={editingKeyword}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingKeyword(null);
          }}
        />
      )}

      <KeywordList
        keywords={filteredKeywords}
        onEdit={handleEdit}
        onStatusToggle={handleStatusToggle}
        isLoading={isLoading}
      />
    </div>
  );
}