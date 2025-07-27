
import React, { useState, useEffect } from "react";
import { Destination } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Search,
  MapPin,
  Globe,
  Rss,
  Mail,
  Code
} from "lucide-react";

import DestinationForm from "../components/destinations/DestinationForm";
import DestinationList from "../components/destinations/DestinationList";
import { User } from "@/api/entities";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadDestinations();
    loadUser();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [destinations, searchTerm]);

  const loadUser = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
    } catch (error) {
      console.error("Failed to load user", error);
    }
  };

  const loadDestinations = async () => {
    try {
      const data = await Destination.list('-created_date');
      setDestinations(data);
    } catch (error) {
      console.error('Failed to load destinations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterDestinations = () => {
    let filtered = destinations;

    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDestinations(filtered);
  };

  const handleSubmit = async (destinationData) => {
    try {
      if (editingDestination) {
        await Destination.update(editingDestination.id, destinationData);
      } else {
        await Destination.create(destinationData);
      }
      setShowForm(false);
      setEditingDestination(null);
      loadDestinations();
    } catch (error) {
      console.error('Failed to save destination:', error);
    }
  };

  const handleEdit = (destination) => {
    setEditingDestination(destination);
    setShowForm(true);
  };

  const handleToggleStatus = async (destination) => {
    try {
      await Destination.update(destination.id, { is_active: !destination.is_active });
      loadDestinations();
    } catch (error) {
      console.error('Failed to toggle destination status:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Destinations
          </h1>
          <p className="text-gray-600 mt-1">
            Configure where your generated content gets published
          </p>
        </div>
        
        <Button 
          onClick={() => setShowForm(true)}
          className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift"
        >
          <Plus className="w-4 h-4" />
          Add Destination
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {showForm && (
        <DestinationForm
          destination={editingDestination}
          user={currentUser}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingDestination(null);
          }}
        />
      )}

      <DestinationList
        destinations={filteredDestinations}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
        isLoading={isLoading}
      />
    </div>
  );
}
