import React, { useState, useEffect } from "react";
import { AutoSchedule, Keyword, Destination, DataSource } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { 
  Plus,
  Clock,
  Play,
  Pause,
  Calendar
} from "lucide-react";

import ScheduleForm from "../components/autoschedule/ScheduleForm";
import ScheduleList from "../components/autoschedule/ScheduleList";
import ScheduleStats from "../components/autoschedule/ScheduleStats";

export default function AutoSchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [scheduleData, keywordData, destinationData, dataSourceData] = await Promise.all([
        AutoSchedule.list('-created_date'),
        Keyword.filter({ status: 'active' }),
        Destination.filter({ is_active: true }),
        DataSource.filter({ is_active: true })
      ]);
      
      setSchedules(scheduleData);
      setKeywords(keywordData);
      setDestinations(destinationData);
      setDataSources(dataSourceData);
    } catch (error) {
      console.error('Failed to load auto-schedule data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (scheduleData) => {
    try {
      if (editingSchedule) {
        await AutoSchedule.update(editingSchedule.id, scheduleData);
      } else {
        await AutoSchedule.create(scheduleData);
      }
      setShowForm(false);
      setEditingSchedule(null);
      loadData();
    } catch (error) {
      console.error('Failed to save schedule:', error);
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const handleToggleStatus = async (schedule) => {
    try {
      await AutoSchedule.update(schedule.id, { is_active: !schedule.is_active });
      loadData();
    } catch (error) {
      console.error('Failed to toggle schedule status:', error);
    }
  };

  const stats = {
    total: schedules.length,
    active: schedules.filter(s => s.is_active).length,
    paused: schedules.filter(s => !s.is_active).length,
    nextExecution: schedules
      .filter(s => s.is_active && s.next_run)
      .sort((a, b) => new Date(a.next_run) - new Date(b.next_run))[0]
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Auto-Generation Scheduler
          </h1>
          <p className="text-gray-600 mt-1">
            Automate your content generation with smart scheduling
          </p>
        </div>
        
        <Button 
          onClick={() => setShowForm(true)}
          className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift"
        >
          <Plus className="w-4 h-4" />
          Create Schedule
        </Button>
      </div>

      <ScheduleStats stats={stats} />

      {showForm && (
        <ScheduleForm
          schedule={editingSchedule}
          keywords={keywords}
          destinations={destinations}
          dataSources={dataSources}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingSchedule(null);
          }}
        />
      )}

      <ScheduleList
        schedules={schedules}
        keywords={keywords}
        destinations={destinations}
        dataSources={dataSources}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
        isLoading={isLoading}
      />
    </div>
  );
}