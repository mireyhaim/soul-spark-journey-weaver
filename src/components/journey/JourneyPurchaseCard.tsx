
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

interface JourneyPurchaseCardProps {
  price: number;
  duration: number;
  onPurchase: () => void;
}

const JourneyPurchaseCard: React.FC<JourneyPurchaseCardProps> = ({ 
  price, 
  duration, 
  onPurchase 
}) => {
  return (
    <Card className="w-full md:w-[260px] shadow-sm border-spirit-200">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <p className="text-2xl font-medium text-earth-900 mb-2">${price}</p>
          <p className="text-sm text-earth-600">One-time payment</p>
        </div>
        
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 mb-4"
          onClick={onPurchase}
        >
          Purchase Journey
        </Button>
        
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2 text-earth-700">
            <Check size={16} className="text-green-600" />
            <span>Full {duration}-day journey</span>
          </li>
          <li className="flex items-center gap-2 text-earth-700">
            <Check size={16} className="text-green-600" />
            <span>AI spiritual guide chat</span>
          </li>
          <li className="flex items-center gap-2 text-earth-700">
            <Check size={16} className="text-green-600" />
            <span>Daily practices & reflections</span>
          </li>
          <li className="flex items-center gap-2 text-earth-700">
            <Check size={16} className="text-green-600" />
            <span>Progress tracking</span>
          </li>
          <li className="flex items-center gap-2 text-earth-700">
            <Check size={16} className="text-green-600" />
            <span>Lifetime access</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default JourneyPurchaseCard;
