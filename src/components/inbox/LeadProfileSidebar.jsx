
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
    User, 
    Building, 
    Briefcase, 
    Mail, 
    Linkedin,
    MapPin,
    Globe,
    Star,
    Edit
} from 'lucide-react';

const statusOptions = ["new", "contacted", "interested", "meeting_booked", "not_interested", "unqualified", "converted"];

export default function LeadProfileSidebar({ lead, onUpdate }) {
    
    const handleStatusChange = (newStatus) => {
        onUpdate({...lead, status: newStatus });
    };

    const handleNotesChange = (e) => {
        // This should probably be debounced in a real app
        onUpdate({...lead, notes: e.target.value });
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'interested':
            case 'meeting_booked':
                return 'bg-green-100 text-green-700';
            case 'converted':
                return 'bg-purple-100 text-purple-700';
            case 'not_interested':
            case 'unqualified':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-blue-100 text-blue-700';
        }
    };
    
    return (
        <div className="p-4 space-y-6">
            <div className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-3">
                    <AvatarFallback className="text-3xl">
                        {lead.contact_name?.charAt(0) || 'L'}
                    </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{lead.contact_name}</h2>
                <p className="text-sm text-gray-500">{lead.contact_title}</p>
                <div className="flex gap-2 mt-2">
                    {lead.contact_email && <Button variant="outline" size="icon" asChild><a href={`mailto:${lead.contact_email}`}><Mail className="w-4 h-4"/></a></Button>}
                    {lead.contact_linkedin && <Button variant="outline" size="icon" asChild><a href={lead.contact_linkedin} target="_blank"><Linkedin className="w-4 h-4"/></a></Button>}
                </div>
            </div>

            <div>
                <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                <Select value={lead.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                        <SelectValue>
                           <Badge className={getStatusColor(lead.status)}>{lead.status.replace('_', ' ')}</Badge>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {statusOptions.map(opt => (
                            <SelectItem key={opt} value={opt}>
                                <Badge className={getStatusColor(opt)}>{opt.replace('_', ' ')}</Badge>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <User className="w-4 h-4" /> About Contact
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400"/> {lead.contact_email || 'N/A'}</p>
                    <p className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-gray-400"/> {lead.contact_linkedin ? 'View Profile' : 'N/A'}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                       <Building className="w-4 h-4" /> About Company
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-gray-400"/> {lead.website || 'N/A'}</p>
                    <p className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-gray-400"/> {lead.industry || 'N/A'}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400"/> {lead.location || 'N/A'}</p>
                    <p className="flex items-center gap-2"><Star className="w-4 h-4 text-gray-400"/> Intent Score: {lead.intent_score || 'N/A'}</p>
                </CardContent>
            </Card>
            
            <div>
                <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
                <Textarea id="notes" placeholder="Add notes about this lead..." defaultValue={lead.notes} onBlur={handleNotesChange} />
            </div>
        </div>
    );
}
