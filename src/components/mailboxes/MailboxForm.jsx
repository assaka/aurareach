import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mailbox as MailboxIcon, Save, X, Bot, Mail } from 'lucide-react';

const providers = [
    { id: 'gmail', name: 'Google / Gmail', icon: Mail },
    { id: 'outlook', name: 'Microsoft / Outlook', icon: Mail },
    { id: 'brevo', name: 'Brevo', icon: Mail },
    { id: 'custom_smtp', name: 'Custom SMTP/IMAP', icon: Mail },
];

export default function MailboxForm({ onSubmit, onCancel }) {
    const [selectedProvider, setSelectedProvider] = useState(null);

    const handleConnect = (providerId) => {
        // In a real app, this would trigger an OAuth flow
        console.log(`Connecting to ${providerId}...`);
        // For now, we'll simulate a successful connection
        onSubmit({
            email_address: `connected.${providerId}@example.com`,
            provider: providerId,
            status: 'warming_up'
        });
    };

    return (
        <Card className="glass-effect border-0 hover-lift">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MailboxIcon className="w-5 h-5 text-purple-600" />
                    Connect a New Mailbox
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                    Select your email provider to begin. Connecting your mailbox allows AuraReach to send emails on your behalf and warm up your account to improve deliverability.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {providers.map(provider => (
                        <Button 
                            key={provider.id}
                            variant="outline" 
                            className="p-6 flex flex-col h-auto items-start gap-2 hover-lift"
                            onClick={() => handleConnect(provider.id)}
                        >
                            <provider.icon className="w-6 h-6 text-purple-600"/>
                            <span className="font-semibold text-base">{provider.name}</span>
                            <span className="text-xs text-gray-500 text-left">Connect securely via OAuth or API key.</span>
                        </Button>
                    ))}
                </div>
                 <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}