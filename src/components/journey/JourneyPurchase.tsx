
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, ListChecks } from 'lucide-react';

interface JourneyPurchaseProps {
  price: number;
  journeyTitle: string;
  duration: number;
  isPurchased: boolean;
  onPurchase: () => void;
}

const JourneyPurchase: React.FC<JourneyPurchaseProps> = ({
  price,
  journeyTitle,
  duration,
  isPurchased,
  onPurchase
}) => {
  if (isPurchased) {
    return null;
  }
  
  return (
    <div className="bg-white p-8 rounded-lg border shadow-sm mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Purchase This Journey</h2>
      <p className="text-earth-600 mb-6 text-center">
        Get full access to this {duration}-day journey for just ${price}.
      </p>
      
      <div className="bg-spirit-50 p-4 rounded-md mb-6">
        <h3 className="font-medium text-spirit-700 flex items-center gap-2 mb-3">
          <ListChecks size={18} />
          <span>What You'll Experience in This Journey:</span>
        </h3>
        <ul className="text-earth-700 space-y-2 ml-2">
          <li className="flex items-start gap-2">
            <span className="text-spirit-600 font-bold mt-1">•</span>
            <span>Daily guided practices designed specifically for your personal growth</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-spirit-600 font-bold mt-1">•</span>
            <span>Deep emotional healing and releasing of limiting beliefs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-spirit-600 font-bold mt-1">•</span>
            <span>Progressive techniques that build on each day's insights</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-spirit-600 font-bold mt-1">•</span>
            <span>Personalized guidance adapting to your unique spiritual path</span>
          </li>
        </ul>
      </div>

      <div className="text-center">
        <Button 
          onClick={onPurchase} 
          className="bg-green-600 hover:bg-green-700 gap-2"
        >
          <ShoppingCart size={16} />
          <span>Purchase Now</span>
        </Button>
      </div>
    </div>
  );
};

export default JourneyPurchase;
