import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Loader2,
  AlertCircle
} from "lucide-react";

export default function PostStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="glass-effect border-0 hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <FileText className="w-4 h-4" />
            Total Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-0 hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <CheckCircle2 className="w-4 h-4" />
            Published
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.published}</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-0 hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Clock className="w-4 h-4" />
            Ready
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.ready}</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-0 hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Loader2 className="w-4 h-4" />
            Generating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{stats.generating}</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-0 hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <AlertCircle className="w-4 h-4" />
            Failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
        </CardContent>
      </Card>
    </div>
  );
}