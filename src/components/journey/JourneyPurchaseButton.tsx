
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';

interface JourneyPurchaseButtonProps {
  onPurchase: () => void;
}

const JourneyPurchaseButton: React.FC<JourneyPurchaseButtonProps> = ({
  onPurchase
}) => {
  return (
    <div className="text-center">
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

export default JourneyPurchaseButton;
