
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import JourneyQuestionnaire from './JourneyQuestionnaire';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const QuestionnaireSection: React.FC = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <AspectRatio ratio={16/9} className="h-full">
          <img 
            src="/lovable-uploads/4e991fab-78d2-4e10-831e-c373a61d5626.png" 
            alt="Personal development journey" 
            className="w-full h-full object-cover opacity-15"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-purple-50/95"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <div className="mb-10 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold">Not Sure Where to Begin?</h2>
          <p className="text-lg text-earth-700 mx-auto max-w-2xl">
            Take our quick questionnaire to discover the perfect spiritual journeys for your unique needs and aspirations.
          </p>
        </div>
        
        {!showQuestionnaire ? (
          <Button 
            onClick={() => setShowQuestionnaire(true)} 
            className="bg-spirit-600 hover:bg-spirit-700 text-white text-lg py-6 px-8 rounded-lg"
            size="lg"
          >
            Find Your Journey
          </Button>
        ) : (
          <div className="relative pt-4">
            <JourneyQuestionnaire onClose={() => setShowQuestionnaire(false)} />
          </div>
        )}
      </div>
    </section>
  );
};

export default QuestionnaireSection;
