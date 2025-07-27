import React, { useState, useEffect } from "react";
import { Credit } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard,
  Plus,
  Crown,
  Zap,
  Gift,
  History,
  Sparkles
} from "lucide-react";

import CreditPurchase from "../components/credits/CreditPurchase";
import CreditHistory from "../components/credits/CreditHistory";

export default function Credits() {
  const [credits, setCredits] = useState([]);
  const [usedCredits, setUsedCredits] = useState([]);
  const [showPurchase, setShowPurchase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCredits();
  }, []);

  const loadCredits = async () => {
    try {
      const [availableCredits, usedCreditsData] = await Promise.all([
        Credit.filter({ used: false }),
        Credit.filter({ used: true })
      ]);
      
      setCredits(availableCredits);
      setUsedCredits(usedCreditsData);
    } catch (error) {
      console.error('Failed to load credits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (creditPackage) => {
    try {
      // Simulate credit purchase
      await Credit.create({
        amount: creditPackage.amount,
        type: 'purchase',
        description: `Purchased ${creditPackage.amount} credits - ${creditPackage.name}`,
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
      });
      
      setShowPurchase(false);
      loadCredits();
      alert('Credits purchased successfully!');
    } catch (error) {
      console.error('Failed to purchase credits:', error);
      alert('Failed to purchase credits. Please try again.');
    }
  };

  const totalCredits = credits.reduce((sum, credit) => sum + credit.amount, 0);
  const totalUsed = usedCredits.reduce((sum, credit) => sum + credit.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Credits
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your content generation credits
          </p>
        </div>
        
        <Button 
          onClick={() => setShowPurchase(true)}
          className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover-lift"
        >
          <Plus className="w-4 h-4" />
          Buy Credits
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect border-0 hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              Available Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{totalCredits}</div>
            <p className="text-sm text-gray-600 mt-1">Ready to use</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              Used Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalUsed}</div>
            <p className="text-sm text-gray-600 mt-1">Total consumed</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 hover-lift premium-glow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Weekly Free
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">1</div>
            <p className="text-sm text-gray-600 mt-1">Resets every week</p>
          </CardContent>
        </Card>
      </div>

      {showPurchase && (
        <CreditPurchase
          onPurchase={handlePurchase}
          onCancel={() => setShowPurchase(false)}
        />
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CreditHistory credits={[...credits, ...usedCredits]} isLoading={isLoading} />
        </div>
        
        <div className="space-y-6">
          <Card className="glass-effect border-0 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                How Credits Work
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">1</div>
                <div>
                  <p className="font-medium">Generate Content</p>
                  <p className="text-sm text-gray-600">1 credit per blog post</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">2</div>
                <div>
                  <p className="font-medium">Add Video</p>
                  <p className="text-sm text-gray-600">+1 credit for video content</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600">3</div>
                <div>
                  <p className="font-medium">Generate Documents</p>
                  <p className="text-sm text-gray-600">+1 credit for PDF documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}