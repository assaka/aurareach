import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Clock, Save, X } from "lucide-react";

const daysOfWeek = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" }
];

export default function ScheduleForm({ 
  schedule, 
  keywords, 
  destinations, 
  dataSources, 
  onSubmit, 
  onCancel 
}) {
  const [formData, setFormData] = useState({
    name: schedule?.name || "",
    keyword_ids: schedule?.keyword_ids || [],
    destination_id: schedule?.destination_id || "",
    data_source_id: schedule?.data_source_id || "",
    frequency: schedule?.frequency || "weekly",
    day_of_week: schedule?.day_of_week || 1,
    time_of_day: schedule?.time_of_day || "09:00",
    include_video: schedule?.include_video || false,
    include_document: schedule?.include_document || false,
    is_active: schedule?.is_active !== undefined ? schedule.is_active : true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate next run time based on frequency and schedule
    const nextRun = calculateNextRun(formData);
    
    onSubmit({
      ...formData,
      next_run: nextRun
    });
  };

  const calculateNextRun = (data) => {
    const now = new Date();
    const [hours, minutes] = data.time_of_day.split(':').map(Number);
    
    let nextRun = new Date();
    nextRun.setHours(hours, minutes, 0, 0);
    
    switch (data.frequency) {
      case 'daily':
        if (nextRun <= now) {
          nextRun.setDate(nextRun.getDate() + 1);
        }
        break;
      case 'weekly':
        const daysDiff = (data.day_of_week - now.getDay() + 7) % 7;
        nextRun.setDate(now.getDate() + (daysDiff === 0 ? 7 : daysDiff));
        if (daysDiff === 0 && nextRun <= now) {
          nextRun.setDate(nextRun.getDate() + 7);
        }
        break;
      case 'bi-weekly':
        const biWeeklyDiff = (data.day_of_week - now.getDay() + 7) % 7;
        nextRun.setDate(now.getDate() + (biWeeklyDiff === 0 ? 14 : biWeeklyDiff));
        if (biWeeklyDiff === 0 && nextRun <= now) {
          nextRun.setDate(nextRun.getDate() + 14);
        }
        break;
      case 'monthly':
        nextRun.setMonth(nextRun.getMonth() + 1, data.day_of_week + 1);
        if (nextRun <= now) {
          nextRun.setMonth(nextRun.getMonth() + 1);
        }
        break;
    }
    
    return nextRun.toISOString();
  };

  const handleKeywordToggle = (keywordId) => {
    setFormData(prev => ({
      ...prev,
      keyword_ids: prev.keyword_ids.includes(keywordId)
        ? prev.keyword_ids.filter(id => id !== keywordId)
        : [...prev.keyword_ids, keywordId]
    }));
  };

  return (
    <Card className="glass-effect border-0 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          {schedule ? 'Edit Schedule' : 'Create New Schedule'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Schedule Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter schedule name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.frequency !== 'daily' && (
              <div className="space-y-2">
                <Label htmlFor="day_of_week">Day of Week</Label>
                <Select 
                  value={formData.day_of_week.toString()} 
                  onValueChange={(value) => setFormData({...formData, day_of_week: parseInt(value)})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day.value} value={day.value.toString()}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="time_of_day">Time</Label>
              <Input
                id="time_of_day"
                type="time"
                value={formData.time_of_day}
                onChange={(e) => setFormData({...formData, time_of_day: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">Default Destination</Label>
              <Select value={formData.destination_id} onValueChange={(value) => setFormData({...formData, destination_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>None</SelectItem>
                  {destinations.map((destination) => (
                    <SelectItem key={destination.id} value={destination.id}>
                      {destination.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dataSource">Default Data Source</Label>
              <Select value={formData.data_source_id} onValueChange={(value) => setFormData({...formData, data_source_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>None</SelectItem>
                  {dataSources.map((dataSource) => (
                    <SelectItem key={dataSource.id} value={dataSource.id}>
                      {dataSource.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Target Keywords</Label>
            <div className="max-h-48 overflow-y-auto border rounded-lg p-3 space-y-2">
              {keywords.map((keyword) => (
                <div key={keyword.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={keyword.id}
                    checked={formData.keyword_ids.includes(keyword.id)}
                    onCheckedChange={() => handleKeywordToggle(keyword.id)}
                  />
                  <Label htmlFor={keyword.id} className="flex-1 text-sm">
                    {keyword.keyword}
                    {keyword.search_volume && (
                      <span className="text-gray-500 ml-2">
                        ({keyword.search_volume.toLocaleString()} searches/month)
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Content Options</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="include_video"
                  checked={formData.include_video}
                  onCheckedChange={(checked) => setFormData({...formData, include_video: checked})}
                />
                <Label htmlFor="include_video">Include video content (+1 credit per post)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="include_document"
                  checked={formData.include_document}
                  onCheckedChange={(checked) => setFormData({...formData, include_document: checked})}
                />
                <Label htmlFor="include_document">Include downloadable documents (+1 credit per post)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                />
                <Label htmlFor="is_active">Active schedule</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {schedule ? 'Update' : 'Create'} Schedule
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}