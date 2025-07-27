import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Key, 
  Play, 
  Pause, 
  TrendingUp
} from "lucide-react";

export default function KeywordStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="glass-effect border-0 hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Key className="w-4 h-4" />
            Total Keywords
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-0 hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Play className="w-4 h-4" />
            Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-0 hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Pause className="w-4 h-4" />
            Paused
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-600">{stats.paused}</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-0 hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <TrendingUp className="w-4 h-4" />
            Total Volume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {stats.totalVolume.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}