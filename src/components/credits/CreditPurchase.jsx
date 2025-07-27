import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  X, 
  Crown, 
  Zap, 
  Star,
  Check
} from "lucide-react";

const creditPackages = [
  {
    name: "Starter Pack",
    amount: 10,
    price: 9.99,
    popular: false,
    features: ["10 Blog Posts", "Basic Analytics", "Email Support"]
  },
  {
    name: "Professional",
    amount: 50,
    price: 39.99,
    popular: true,
    features: ["50 Blog Posts", "Video Content", "Advanced Analytics", "Priority Support"]
  },
  {
    name: "Enterprise",
    amount: 200,
    price: 149.99,
    popular: false,
    features: ["200 Blog Posts", "Video Content", "Document Generation", "Custom Templates", "Dedicated Support"]
  }
];

export default function CreditPurchase({ onPurchase, onCancel }) {
  return (
    <Card className="glass-effect border-0 hover-lift">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-purple-600" />
          Purchase Credits
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {creditPackages.map((pkg, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-lg border-2 transition-all hover-lift ${
                pkg.popular 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-4">
                <div className="flex items-center justify-center mb-2">
                  {pkg.name === "Enterprise" ? (
                    <Crown className="w-8 h-8 text-amber-500" />
                  ) : (
                    <Zap className="w-8 h-8 text-purple-500" />
                  )}
                </div>
                <h3 className="font-bold text-lg">{pkg.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${pkg.price}</span>
                  <p className="text-sm text-gray-600">{pkg.amount} credits</p>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onPurchase(pkg)}
                className={`w-full ${
                  pkg.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                }`}
              >
                Purchase {pkg.amount} Credits
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}