
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import JourneyQuestionnaire from './JourneyQuestionnaire';

const QuestionnaireSection: React.FC = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="mb-10 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold">Not Sure Where to Begin?</h2>
          <p className="text-lg text-earth-700 mx-auto max-w-2xl">
            Take our quick questionnaire to discover the perfect spiritual journey for your unique needs and aspirations.
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
