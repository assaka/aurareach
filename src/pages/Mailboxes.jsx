import React, { useState, useEffect } from "react";
import { Mailbox } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Plus, Mailbox as MailboxIcon } from "lucide-react";

import MailboxList from "../components/mailboxes/MailboxList";
import MailboxForm from "../components/mailboxes/MailboxForm";

export default function Mailboxes() {
  const [mailboxes, setMailboxes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMailboxes();
  }, []);

  const loadMailboxes = async () => {
    setIsLoading(true);
    try {
      const data = await Mailbox.list('-created_date');
      setMailboxes(data);
    } catch (error) {
      console.error('Failed to load mailboxes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (mailboxData) => {
    try {
      await Mailbox.create(mailboxData);
      setShowForm(false);
      loadMailboxes();
    } catch (error) {
      console.error('Failed to save mailbox:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Mailbox Manager
          </h1>
          <p className="text-gray-600 mt-1">
            Connect your email accounts and keep them warm for maximum deliverability.
          </p>
        </div>
        
        <Button 
          onClick={() => setShowForm(true)}
          className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift"
        >
          <Plus className="w-4 h-4" />
          Add Mailbox
        </Button>
      </div>

      {showForm && (
        <MailboxForm
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <MailboxList
        mailboxes={mailboxes}
        isLoading={isLoading}
      />
    </div>
  );
}