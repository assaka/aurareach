import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Edit, 
  Database, 
  Rss, 
  FileText, 
  Code,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Search,
  TrendingUp
} from "lucide-react";

const typeIcons = {
  api: Code,
  rss: Rss,
  csv: FileText,
  json: FileText,
  database: Database,
  google_ads: TrendingUp,
  google_search_console: Search,
};

export default function DataSourceList({ dataSources, onEdit, onToggleStatus, isLoading }) {
  if (isLoading) {
    return (
      <Card className="glass-effect border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600" />
            Data Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-purple-600" />
          Data Sources ({dataSources.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {dataSources.length === 0 ? (
          <div className="text-center py-12">
            <Database className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No data sources configured</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dataSources.map((dataSource) => {
              const TypeIcon = typeIcons[dataSource.type] || Database;
              
              return (
                <div key={dataSource.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors hover-lift">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <TypeIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{dataSource.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{dataSource.type.replace('_', ' ')}</Badge>
                        <Badge className={dataSource.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                          {dataSource.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          {dataSource.refresh_interval}
                        </Badge>
                      </div>
                      {dataSource.url && (
                        <p className="text-sm text-gray-500 mt-1">{dataSource.url}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleStatus(dataSource)}
                      className="gap-1"
                    >
                      {dataSource.is_active ? (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          Disable
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          Enable
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(dataSource)}
                      className="gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}