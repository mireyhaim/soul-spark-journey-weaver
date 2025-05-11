
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';

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
    <div className="bg-white p-8 rounded-lg border shadow-sm mb-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">Purchase This Journey</h2>
      <p className="text-earth-600 mb-6">
        Get full access to this {duration}-day journey for just ${price}.
      </p>
      <Button 
        onClick={onPurchase} 
        className="bg-green-600 hover:bg-green-700 gap-2"
      >
        <ShoppingCart size={16} />
        <span>Purchase Now</span>
      </Button>
    </div>
  );
};

export default JourneyPurchase;
