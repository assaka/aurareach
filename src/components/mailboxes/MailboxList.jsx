import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Mailbox as MailboxIcon, CheckCircle, Clock, AlertTriangle, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const statusConfig = {
    active: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
    warming_up: { color: 'bg-blue-100 text-blue-700', icon: Flame },
    connecting: { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    error: { color: 'bg-red-100 text-red-700', icon: AlertTriangle },
};

export default function MailboxList({ mailboxes, isLoading }) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(3).fill(0).map((_, i) => (
                    <Card key={i} className="glass-effect border-0">
                        <CardHeader>
                            <Skeleton className="h-5 w-40" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-4 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mailboxes.map((mailbox) => {
                const StatusIcon = statusConfig[mailbox.status]?.icon || MailboxIcon;
                return (
                    <Card key={mailbox.id} className="glass-effect border-0 hover-lift">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MailboxIcon className="w-5 h-5 text-purple-600" />
                                    {mailbox.email_address}
                                </CardTitle>
                                <Badge className={statusConfig[mailbox.status]?.color}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {mailbox.status.replace('_', ' ')}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-600">Health Score</span>
                                    <span className="text-sm font-bold text-green-600">{mailbox.analytics?.health_score || 75}%</span>
                                </div>
                                <Progress value={mailbox.analytics?.health_score || 75} className="h-2" />
                            </div>
                            <div className="text-xs text-gray-500 grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                    <span className="font-medium">Sent Today</span>
                                    <span>{mailbox.analytics?.emails_sent_today || 0}/{mailbox.warmup_settings?.emails_per_day || 30}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">Landed in Inbox</span>
                                    <span>{mailbox.analytics?.landed_in_inbox || 0}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">Reply Rate</span>
                                    <span>{mailbox.warmup_settings?.reply_rate || 45}%</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">Saved from Spam</span>
                                    <span>{mailbox.analytics?.saved_from_spam || 0}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}