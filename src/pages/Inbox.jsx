import React, { useState, useEffect } from "react";
import { Conversation } from "@/api/entities";
import { Lead } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import LeadProfileSidebar from "../components/inbox/LeadProfileSidebar"; // New component

export default function Inbox() {
  const [conversations, setConversations] = useState([]);
  const [leads, setLeads] = useState({});
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedConversation && leads[selectedConversation.lead_id]) {
        setSelectedLead(leads[selectedConversation.lead_id]);
    } else {
        setSelectedLead(null);
    }
  }, [selectedConversation, leads]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [convos, leadData] = await Promise.all([
        Conversation.list('-last_message_at'),
        Lead.list()
      ]);
      const leadsMap = leadData.reduce((acc, lead) => {
        acc[lead.id] = lead;
        return acc;
      }, {});
      setConversations(convos);
      setLeads(leadsMap);
      if (convos.length > 0) {
        setSelectedConversation(convos[0]);
      }
    } catch (error) {
      console.error("Failed to load inbox data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendMessage = async () => {
      // This would call a backend function e.g., sendLinkedInMessage(leadId, message)
      console.log(`Sending message to ${selectedConversation.lead_id}: ${message}`);
      setMessage("");
  };

  const handleLeadUpdate = async (updatedLead) => {
      try {
          await Lead.update(updatedLead.id, updatedLead);
          setLeads(prev => ({...prev, [updatedLead.id]: updatedLead}));
      } catch (error) {
          console.error("Failed to update lead:", error);
      }
  };

  return (
    <div className="h-screen-minus-header flex bg-white">
      {/* Conversation List */}
      <div className="w-1/3 border-r h-full overflow-y-auto flex flex-col">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <h1 className="text-xl font-bold">Inbox</h1>
        </div>
        <div className="flex-1">
            {isLoading ? <p className="p-4">Loading...</p> : conversations.map(convo => {
            const lead = leads[convo.lead_id];
            return (
            <div 
                key={convo.id} 
                className={`p-4 cursor-pointer border-b ${selectedConversation?.id === convo.id ? 'bg-purple-50' : 'hover:bg-gray-50'}`}
                onClick={() => setSelectedConversation(convo)}
            >
                <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarFallback>{lead?.contact_name?.charAt(0) || 'L'}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between">
                        <p className="font-semibold truncate">{lead?.contact_name || 'Unknown Lead'}</p>
                        <p className="text-xs text-gray-500 whitespace-nowrap">{formatDistanceToNow(new Date(convo.last_message_at), { addSuffix: true })}</p>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{convo.last_message_preview}</p>
                </div>
                </div>
            </div>
            )})}
        </div>
      </div>

      {/* Message View */}
      <div className="w-1/2 h-full flex flex-col">
        {selectedConversation && leads[selectedConversation.lead_id] ? (
          <>
            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-semibold text-lg">{leads[selectedConversation.lead_id].contact_name}</h2>
              <p className="text-sm text-gray-500">{leads[selectedConversation.lead_id].company_name}</p>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
              {selectedConversation.messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-white border'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-white">
              <div className="relative">
                <Textarea 
                    placeholder="Type your message..." 
                    className="pr-20"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2" onClick={handleSendMessage}><Send className="w-4 h-4"/></Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
            <MessageSquare className="w-16 h-16 mb-4 text-gray-300"/>
            <p>Select a conversation to view messages.</p>
          </div>
        )}
      </div>

      {/* Lead Profile Sidebar */}
      <div className="w-1/3 border-l h-full overflow-y-auto">
        {selectedLead ? (
            <LeadProfileSidebar lead={selectedLead} onUpdate={handleLeadUpdate} />
        ) : (
            <div className="p-6 text-center text-gray-500">
                <p>Select a conversation to see lead details.</p>
            </div>
        )}
      </div>
    </div>
  );
}