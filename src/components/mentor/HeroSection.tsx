
import React from 'react';
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onApplyClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick }) => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-spirit-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight text-gradient mb-8">
            Share Your Wisdom Through InFlow
          </h1>
          <p className="text-xl text-earth-700 mb-10">
            Join our platform as a mentor and help guide others on their spiritual or personal development journey with your expertise and wisdom.
          </p>
          <Button 
            size="lg" 
            className="bg-spirit-600 hover:bg-spirit-700 text-xl py-6 px-10"
            onClick={onApplyClick}
          >
            Join As Mentor
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
