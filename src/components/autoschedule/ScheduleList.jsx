import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { 
  Edit, 
  Play, 
  Pause, 
  Clock,
  Calendar,
  Target,
  MapPin
} from "lucide-react";

const frequencyLabels = {
  daily: "Daily",
  weekly: "Weekly", 
  "bi-weekly": "Bi-weekly",
  monthly: "Monthly"
};

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ScheduleList({ 
  schedules, 
  keywords, 
  destinations, 
  dataSources, 
  onEdit, 
  onToggleStatus, 
  isLoading 
}) {
  const getKeywordNames = (keywordIds) => {
    return keywordIds
      .map(id => keywords.find(k => k.id === id)?.keyword)
      .filter(Boolean);
  };

  const getDestinationName = (destinationId) => {
    return destinations.find(d => d.id === destinationId)?.name || "None";
  };

  if (isLoading) {
    return (
      <Card className="glass-effect border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Schedules
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
          <Clock className="w-5 h-5 text-purple-600" />
          Auto-Generation Schedules ({schedules.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {schedules.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No schedules created yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {schedules.map((schedule) => {
              const keywordNames = getKeywordNames(schedule.keyword_ids || []);
              const creditCost = 1 + (schedule.include_video ? 1 : 0) + (schedule.include_document ? 1 : 0);
              
              return (
                <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors hover-lift">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      schedule.is_active 
                        ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                        : 'bg-gray-400'
                    }`}>
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{schedule.name}</h3>
                        <Badge className={schedule.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                          {schedule.is_active ? 'Active' : 'Paused'}
                        </Badge>
                        <Badge variant="outline">
                          {creditCost} credit{creditCost > 1 ? 's' : ''} per run
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {frequencyLabels[schedule.frequency]}
                            {schedule.frequency !== 'daily' && schedule.day_of_week !== undefined && 
                              ` on ${dayLabels[schedule.day_of_week]}`
                            }
                            {schedule.time_of_day && ` at ${schedule.time_of_day}`}
                          </span>
                        </div>
                        {schedule.destination_id && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{getDestinationName(schedule.destination_id)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          <span>{keywordNames.length} keyword{keywordNames.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      {schedule.next_run && schedule.is_active && (
                        <p className="text-sm text-purple-600 mt-1">
                          Next run: {format(new Date(schedule.next_run), "MMM d, yyyy 'at' HH:mm")}
                        </p>
                      )}
                      {keywordNames.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Target keywords:</p>
                          <div className="flex flex-wrap gap-1">
                            {keywordNames.slice(0, 3).map((keyword, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                            {keywordNames.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{keywordNames.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleStatus(schedule)}
                      className="gap-1"
                    >
                      {schedule.is_active ? (
                        <>
                          <Pause className="w-4 h-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(schedule)}
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