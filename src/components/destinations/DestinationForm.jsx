
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, Save, X, Linkedin, UserCheck, Send } from "lucide-react";

export default function DestinationForm({ destination, user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: destination?.name || "",
    type: destination?.type || "website",
    url: destination?.url || "",
    api_key: destination?.api_key || "",
    settings: destination?.settings || {},
    is_active: destination?.is_active !== undefined ? destination.is_active : true
  });

  const handleConnectLinkedIn = () => {
      window.location.href = "/functions/linkedinAuth/connect";
  };
  
  const handleConnectBrevo = () => {
      window.location.href = "/functions/brevoAuth/connect";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="glass-effect border-0 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-purple-600" />
          {destination ? 'Edit Destination' : 'Add New Destination'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Company Blog"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="social_media">Social Media</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="brevo">Brevo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="url">URL / Endpoint</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                placeholder="https://example.com/api/posts"
                type="url"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api_key">API Key (if applicable)</Label>
              <Input
                id="api_key"
                value={formData.api_key}
                onChange={(e) => setFormData({...formData, api_key: e.target.value})}
                placeholder="Enter API key"
                type="password"
              />
            </div>
             <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>

          {formData.type === 'linkedin' && (
             <div className="md:col-span-2 space-y-3">
                <Label>LinkedIn Connection</Label>
                {user?.linkedin_access_token ? (
                    <Alert className="border-green-300 bg-green-50">
                        <UserCheck className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">LinkedIn Account Connected</AlertTitle>
                        <AlertDescription className="text-green-700">
                            Connected as <span className="font-semibold">{user.linkedin_user_profile?.name || 'user'}</span>. You can now create LinkedIn destinations.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Alert>
                        <Linkedin className="h-4 w-4" />
                        <AlertTitle>Connect to LinkedIn</AlertTitle>
                        <AlertDescription>
                           To publish posts to LinkedIn, you need to connect your account first. This will open a new window to authorize the connection.
                        </AlertDescription>
                        <Button type="button" onClick={handleConnectLinkedIn} className="mt-3 gap-2">
                            <Linkedin className="w-4 h-4" />
                            Connect LinkedIn Account
                        </Button>
                    </Alert>
                )}
             </div>
          )}

          {formData.type === 'brevo' && (
             <div className="md:col-span-2 space-y-3">
                <Label>Brevo Connection</Label>
                {user?.brevo_access_token ? (
                    <Alert className="border-green-300 bg-green-50">
                        <UserCheck className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Brevo Account Connected</AlertTitle>
                        <AlertDescription className="text-green-700">
                            You can now create Brevo destinations to sync contacts.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Alert>
                        <Send className="h-4 w-4" />
                        <AlertTitle>Connect to Brevo</AlertTitle>
                        <AlertDescription>
                           To use Brevo, you need to connect your account first. This will open a new window to authorize the connection.
                        </AlertDescription>
                        <Button type="button" onClick={handleConnectBrevo} className="mt-3 gap-2">
                            <Send className="w-4 h-4" />
                            Connect Brevo Account
                        </Button>
                    </Alert>
                )}
             </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {destination ? 'Update' : 'Create'} Destination
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
