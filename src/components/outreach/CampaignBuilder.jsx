import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GripVertical, Plus, Trash, Wand2, Copy } from 'lucide-react';
import { InvokeLLM } from '@/api/integrations'; // For AI Personalization

const Step = ({ step, index, moveStep, updateStep, removeStep }) => {
    // ... drag and drop logic from previous version
    const [{ isDragging }, drag, preview] = useDrag({
        type: 'step',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'step',
        hover: (item) => {
            if (item.index !== index) {
                moveStep(item.index, index);
                item.index = index;
            }
        },
    });
    
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAIPersonalization = async (variationIndex) => {
        setIsGenerating(true);
        try {
            const prompt = `
                Given the following lead placeholders: {{firstName}}, {{companyName}}, {{title}}, {{industry}}.
                Write a single, compelling, and hyper-personalized opening sentence for a cold email. 
                The sentence should be friendly, professional, and directly reference why you're reaching out based on their potential role or industry.
                Make it sound natural and not like a generic template.
                Example: "Noticed you're leading growth at {{companyName}} and thought your perspective on the latest trends in the {{industry}} space would be fascinating."
            `;
            const result = await InvokeLLM({ prompt });
            const currentVariations = [...step.message_templates];
            currentVariations[variationIndex] = result;
            updateStep(index, { ...step, message_templates: currentVariations });

        } catch (error) {
            console.error("AI Personalization failed:", error);
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleAddVariation = () => {
        const newVariations = [...(step.message_templates || ['']), ''];
        updateStep(index, { ...step, message_templates: newVariations });
    };

    const handleVariationChange = (variationIndex, value) => {
        const newVariations = [...step.message_templates];
        newVariations[variationIndex] = value;
        updateStep(index, { ...step, message_templates: newVariations });
    };

    return (
        <div ref={preview} style={{ opacity: isDragging ? 0.5 : 1 }} className="flex gap-3 items-start">
            <div ref={drop} className="w-full">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                             <div ref={drag} className="cursor-move p-1">
                                <GripVertical className="w-5 h-5 text-gray-400" />
                            </div>
                            <CardTitle className="text-base">Step {index + 1}: {step.type.replace('_', ' ')}</CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeStep(index)}>
                            <Trash className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                        <div className="flex gap-4">
                           {/* ... type and delay inputs from previous version ... */}
                           <div className="space-y-2 flex-1">
                               <Label>Type</Label>
                               <Select value={step.type} onValueChange={(value) => updateStep(index, { ...step, type: value })}>
                                   <SelectTrigger><SelectValue/></SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="connection_request">Connection Request</SelectItem>
                                       <SelectItem value="message">Message / Follow-up</SelectItem>
                                       <SelectItem value="inmail">InMail</SelectItem>
                                       <SelectItem value="profile_view">Profile View</SelectItem>
                                   </SelectContent>
                               </Select>
                           </div>
                           <div className="space-y-2">
                               <Label>Delay (days)</Label>
                               <Input 
                                   type="number" 
                                   value={step.delay_days} 
                                   onChange={(e) => updateStep(index, {...step, delay_days: parseInt(e.target.value)})}
                                   className="w-24"
                               />
                           </div>
                        </div>
                        {step.type !== 'profile_view' && (
                            <div className="space-y-3">
                                <Label>Message Templates (A/B Test)</Label>
                                {(step.message_templates || ['']).map((template, i) => (
                                    <div key={i} className="space-y-2 p-3 border rounded-lg bg-gray-50/50">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-xs text-gray-500">Variation {String.fromCharCode(65 + i)}</Label>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => handleAIPersonalization(i)}
                                                disabled={isGenerating}
                                                className="gap-1 text-purple-600 hover:text-purple-700"
                                            >
                                                <Wand2 className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                                                {isGenerating ? 'Generating...' : 'AI Personalize'}
                                            </Button>
                                        </div>
                                        <Textarea 
                                            placeholder={`e.g., Hi {{firstName}}, noticed you work at {{companyName}}...`}
                                            value={template}
                                            onChange={(e) => handleVariationChange(i, e.target.value)}
                                            rows={4}
                                        />
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" onClick={handleAddVariation} className="gap-1">
                                    <Copy className="w-3 h-3"/> Add A/B Test Variation
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// ... Rest of CampaignBuilder component (including DndProvider wrapper)
// This part remains the same as the previous version. I'll just show the main component export.

export default function CampaignBuilder({ campaign, onSave, onCancel }) {
    const [localCampaign, setLocalCampaign] = useState(campaign || {
        name: '',
        platform: 'linkedin',
        status: 'paused',
        steps: [{ type: 'connection_request', delay_days: 0, message_templates: [''] }]
    });

    const updateStep = (index, updatedStep) => {
        const newSteps = [...localCampaign.steps];
        newSteps[index] = updatedStep;
        setLocalCampaign({ ...localCampaign, steps: newSteps });
    };

    const addStep = () => {
        setLocalCampaign({
            ...localCampaign,
            steps: [...localCampaign.steps, { type: 'message', delay_days: 3, message_templates: [''] }]
        });
    };
    
    const removeStep = (index) => {
        const newSteps = localCampaign.steps.filter((_, i) => i !== index);
        setLocalCampaign({ ...localCampaign, steps: newSteps });
    };

    const moveStep = (fromIndex, toIndex) => {
        const newSteps = [...localCampaign.steps];
        const [movedStep] = newSteps.splice(fromIndex, 1);
        newSteps.splice(toIndex, 0, movedStep);
        setLocalCampaign({ ...localCampaign, steps: newSteps });
    };
    
    // ... JSX for name, platform, buttons, etc. remains the same ...

    return (
        <DndProvider backend={HTML5Backend}>
            <Card className="glass-effect border-0 hover-lift">
                {/* ... CardHeader ... */}
                <CardContent className="p-6 space-y-6">
                    {/* ... name and platform inputs ... */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="campaign-name">Campaign Name</Label>
                            <Input
                                id="campaign-name"
                                placeholder="e.g., Q4 SaaS Outreach"
                                value={localCampaign.name}
                                onChange={(e) => setLocalCampaign({ ...localCampaign, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="platform">Platform</Label>
                            <Select
                                value={localCampaign.platform}
                                onValueChange={(value) => setLocalCampaign({ ...localCampaign, platform: value })}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <Label>Campaign Steps</Label>
                        {localCampaign.steps.map((step, index) => (
                            <Step
                                key={index} // In a real app, use a unique ID
                                index={index}
                                step={step}
                                moveStep={moveStep}
                                updateStep={updateStep}
                                removeStep={removeStep}
                            />
                        ))}
                    </div>

                    <Button variant="outline" onClick={addStep} className="w-full gap-2">
                        <Plus className="w-4 h-4" /> Add Step
                    </Button>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                        <Button onClick={() => onSave(localCampaign)}>Save Campaign</Button>
                    </div>
                </CardContent>
            </Card>
        </DndProvider>
    );
}