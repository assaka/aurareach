import React, { useState, useEffect } from "react";
import { DataSource } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Search,
  Database,
  Rss,
  FileText,
  Code
} from "lucide-react";

import DataSourceForm from "../components/datasources/DataSourceForm";
import DataSourceList from "../components/datasources/DataSourceList";

export default function DataSources() {
  const [dataSources, setDataSources] = useState([]);
  const [filteredDataSources, setFilteredDataSources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDataSource, setEditingDataSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDataSources();
  }, []);

  useEffect(() => {
    filterDataSources();
  }, [dataSources, searchTerm]);

  const loadDataSources = async () => {
    try {
      const data = await DataSource.list('-created_date');
      setDataSources(data);
    } catch (error) {
      console.error('Failed to load data sources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterDataSources = () => {
    let filtered = dataSources;

    if (searchTerm) {
      filtered = filtered.filter(ds => 
        ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ds.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDataSources(filtered);
  };

  const handleSubmit = async (dataSourceData) => {
    try {
      if (editingDataSource) {
        await DataSource.update(editingDataSource.id, dataSourceData);
      } else {
        await DataSource.create(dataSourceData);
      }
      setShowForm(false);
      setEditingDataSource(null);
      loadDataSources();
    } catch (error) {
      console.error('Failed to save data source:', error);
    }
  };

  const handleEdit = (dataSource) => {
    setEditingDataSource(dataSource);
    setShowForm(true);
  };

  const handleToggleStatus = async (dataSource) => {
    try {
      await DataSource.update(dataSource.id, { is_active: !dataSource.is_active });
      loadDataSources();
    } catch (error) {
      console.error('Failed to toggle data source status:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Data Sources
          </h1>
          <p className="text-gray-600 mt-1">
            Connect external data feeds for content generation
          </p>
        </div>
        
        <Button 
          onClick={() => setShowForm(true)}
          className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift"
        >
          <Plus className="w-4 h-4" />
          Add Data Source
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search data sources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {showForm && (
        <DataSourceForm
          dataSource={editingDataSource}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingDataSource(null);
          }}
        />
      )}

      <DataSourceList
        dataSources={filteredDataSources}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
        isLoading={isLoading}
      />
    </div>
  );
}