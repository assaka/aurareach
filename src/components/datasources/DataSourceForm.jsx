
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, Save, X, UploadCloud, FileCheck, Loader2, Info } from "lucide-react"; // Added Info icon
import { ExtractDataFromUploadedFile, UploadFile } from "@/api/integrations";

export default function DataSourceForm({ dataSource, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: dataSource?.name || "",
    type: dataSource?.type || "csv",
    url: dataSource?.url || "",
    api_key: dataSource?.api_key || "",
    oauth_token: dataSource?.oauth_token || "", // New oauth_token field
    refresh_interval: dataSource?.refresh_interval || "manual",
    is_active: dataSource?.is_active !== undefined ? dataSource.is_active : true,
    data: dataSource?.data || null,
    schema: dataSource?.schema || [],
    record_count: dataSource?.record_count || 0,
  });

  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleFileProcess = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    
    setIsProcessing(true);
    setError(null);

    try {
        const { file_url } = await UploadFile({ file });
        
        const schema_inference_result = await ExtractDataFromUploadedFile({
            file_url,
            json_schema: {
                type: "object",
                properties: {
                    inferred_schema: {
                        type: "object",
                        properties: {
                            properties: {
                                type: "object"
                            }
                        }
                    }
                }
            }
        });

        if (schema_inference_result.status !== 'success') {
            throw new Error(schema_inference_result.details || "Failed to infer schema from CSV.");
        }
        
        const inferred_schema = schema_inference_result.output.inferred_schema;
        const extraction_schema = {
            type: "object",
            properties: {
                items: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: inferred_schema.properties,
                    }
                }
            }
        };

        const result = await ExtractDataFromUploadedFile({
            file_url,
            json_schema: extraction_schema
        });

        if (result.status === 'success' && result.output.items) {
            const data = result.output.items;
            const schema = data.length > 0 ? Object.keys(data[0]) : [];
            setFormData(prev => ({ 
                ...prev, 
                data: JSON.stringify(data), 
                schema: schema,
                record_count: data.length
            }));
        } else {
            throw new Error(result.details || "Failed to extract data from file.");
        }
        
    } catch (err) {
      setError(err.message);
      setFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOAuthConnect = (type) => {
    if (type === 'google_search_console') {
      alert('Google Search Console OAuth integration requires backend functions to be enabled. Please enable backend functions in your workspace settings, then contact support to configure OAuth.');
    } else if (type === 'semrush') {
      alert('Semrush integration requires an API key. Please enter your Semrush API key in the API Key field.');
    }
  };

  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case 'google_search_console':
        return (
          <div className="space-y-3">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Google Search Console requires OAuth authentication. This integration needs backend functions to be enabled.
              </AlertDescription>
            </Alert>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOAuthConnect('google_search_console')}
              className="w-full"
            >
              Connect Google Search Console
            </Button>
          </div>
        );
      
      case 'semrush':
        return (
          <div className="space-y-3">
            <Label htmlFor="api_key">Semrush API Key *</Label>
            <Input
              id="api_key"
              type="password"
              value={formData.api_key}
              onChange={(e) => setFormData({...formData, api_key: e.target.value})}
              placeholder="Enter your Semrush API key"
              required
            />
            <p className="text-sm text-gray-500">
              Get your API key from your Semrush account settings
            </p>
          </div>
        );
      
      case 'csv':
        return (
          <div className="space-y-3">
            <Label>Upload CSV File</Label>
            <div className="flex items-center gap-4">
                <Input
                    id="csv-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".csv"
                />
                <Label htmlFor="csv-upload" className="flex-shrink-0">
                    <Button type="button" variant="outline" asChild>
                        <span className="gap-2 cursor-pointer flex items-center">
                            <UploadCloud className="w-4 h-4" />
                            Choose File
                        </span>
                    </Button>
                </Label>
                {file ? (
                    <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                        <FileCheck className="w-4 h-4"/>
                        {file.name}
                    </p>
                ) : (
                    <p className="text-sm text-gray-500">No file selected.</p>
                )}
              </div>
              {file && !formData.data && (
                <Button type="button" onClick={handleFileProcess} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : 'Process File'}
                </Button>
              )}
          </div>
        );
      
      case 'api':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="url">API URL *</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                placeholder="https://api.example.com/data"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api_key">API Key</Label>
              <Input
                id="api_key"
                type="password"
                value={formData.api_key}
                onChange={(e) => setFormData({...formData, api_key: e.target.value})}
                placeholder="Optional API key"
              />
            </div>
          </div>
        );

      case 'rss':
      case 'json': // Assuming these might also need a URL field
        return (
          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              placeholder={`Enter ${formData.type.toUpperCase()} URL`}
              required
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ...dataToSubmit } = formData;
    onSubmit(dataToSubmit);
  };

  return (
    <Card className="glass-effect border-0 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-purple-600" />
          {dataSource ? 'Edit Data Source' : 'Add New Data Source'}
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
                placeholder="e.g., US Cities Data"
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
                  <SelectItem value="csv">CSV Upload</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="rss">RSS Feed</SelectItem>
                  <SelectItem value="json">JSON file</SelectItem>
                  <SelectItem value="google_search_console">Google Search Console</SelectItem> {/* New Item */}
                  <SelectItem value="semrush">Semrush</SelectItem> {/* New Item */}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {renderTypeSpecificFields()}

          {error && <p className="text-sm text-red-600">{error}</p>} {/* Error message moved here to be visible regardless of type */}
          {formData.type === 'csv' && formData.data && ( // Only show file processed alert for CSV type
             <Alert>
                <AlertTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-green-600"/>
                    File Processed Successfully
                </AlertTitle>
                <AlertDescription>
                    Found {formData.record_count} records. Columns: {formData.schema.join(', ')}.
                </AlertDescription>
             </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="refresh_interval">Refresh Interval</Label>
              <Select value={formData.refresh_interval} onValueChange={(value) => setFormData({...formData, refresh_interval: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {dataSource ? 'Update' : 'Create'} Data Source
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
