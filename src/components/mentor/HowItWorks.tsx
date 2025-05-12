
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface HowItWorksProps {
  onApplyClick: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onApplyClick }) => {
  return (
    <div className="bg-spirit-50 p-8 rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center">How It Works</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-spirit-600 rounded-full p-1 text-white mt-1">
            <Check className="h-4 w-4" />
          </div>
          <p className="text-lg">You share your expertise and content with us</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-spirit-600 rounded-full p-1 text-white mt-1">
            <Check className="h-4 w-4" />
          </div>
          <p className="text-lg">Our AI transforms it into structured development processes</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-spirit-600 rounded-full p-1 text-white mt-1">
            <Check className="h-4 w-4" />
          </div>
          <p className="text-lg">We publish and promote your GIG on our platform</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-spirit-600 rounded-full p-1 text-white mt-1">
            <Check className="h-4 w-4" />
          </div>
          <p className="text-lg">You earn income from each purchase of your process</p>
        </div>
      </div>
      
      <div className="text-center mt-10">
        <Button 
          size="lg" 
          className="bg-spirit-600 hover:bg-spirit-700 text-xl py-6 px-10"
          onClick={onApplyClick}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default HowItWorks;
