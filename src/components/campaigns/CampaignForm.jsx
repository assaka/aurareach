import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Send, Save, X, Calendar as CalendarIcon } from "lucide-react";

export default function CampaignForm({ campaign, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: campaign?.name || "",
    source: campaign?.source || "Google Ads",
    status: campaign?.status || "draft",
    budget: campaign?.budget || 0,
    spend: campaign?.spend || 0,
    clicks: campaign?.clicks || 0,
    conversions: campaign?.conversions || 0,
    start_date: campaign?.start_date ? new Date(campaign.start_date) : null,
    end_date: campaign?.end_date ? new Date(campaign.end_date) : null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (id, date) => {
    setFormData(prev => ({ ...prev, [id]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
        ...formData,
        start_date: formData.start_date ? format(formData.start_date, 'yyyy-MM-dd') : null,
        end_date: formData.end_date ? format(formData.end_date, 'yyyy-MM-dd') : null,
        budget: parseFloat(formData.budget),
        spend: parseFloat(formData.spend),
        clicks: parseInt(formData.clicks),
        conversions: parseInt(formData.conversions)
    };
    onSubmit(submissionData);
  };

  return (
    <Card className="glass-effect border-0 hover-lift mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5 text-purple-600" />
          {campaign ? 'Edit Ad Campaign' : 'Create New Ad Campaign'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input id="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Source *</Label>
              <Select value={formData.source} onValueChange={(value) => handleSelectChange('source', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                  <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
                  <SelectItem value="LinkedIn Ads">LinkedIn Ads</SelectItem>
                  <SelectItem value="Twitter Ads">Twitter Ads</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($) *</Label>
              <Input id="budget" type="number" value={formData.budget} onChange={handleChange} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="space-y-2">
              <Label htmlFor="spend">Spend ($)</Label>
              <Input id="spend" type="number" value={formData.spend} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clicks">Clicks</Label>
              <Input id="clicks" type="number" value={formData.clicks} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conversions">Conversions</Label>
              <Input id="conversions" type="number" value={formData.conversions} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.start_date ? format(formData.start_date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={formData.start_date} onSelect={(date) => handleDateChange('start_date', date)} /></PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
               <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.end_date ? format(formData.end_date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={formData.end_date} onSelect={(date) => handleDateChange('end_date', date)} /></PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}><X className="w-4 h-4 mr-2" />Cancel</Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"><Save className="w-4 h-4 mr-2" />{campaign ? 'Update' : 'Create'} Campaign</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}