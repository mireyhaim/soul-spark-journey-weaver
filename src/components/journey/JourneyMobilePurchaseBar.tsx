
import React from 'react';
import { Button } from "@/components/ui/button";

interface JourneyMobilePurchaseBarProps {
  price: number;
  duration: number;
  onPurchase: () => void;
}

const JourneyMobilePurchaseBar: React.FC<JourneyMobilePurchaseBarProps> = ({ 
  price, 
  duration, 
  onPurchase 
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-spirit-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl font-medium">${price}</span>
        <span className="text-earth-600">{duration} days</span>
      </div>
      <Button 
        className="w-full bg-green-600 hover:bg-green-700"
        onClick={onPurchase}
      >
        Purchase Journey
      </Button>
    </div>
  );
};

export default JourneyMobilePurchaseBar;
