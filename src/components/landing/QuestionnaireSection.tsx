
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import JourneyQuestionnaire from './JourneyQuestionnaire';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Sparkles } from 'lucide-react';

const QuestionnaireSection: React.FC = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  return (
    <section className="py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <AspectRatio ratio={16/9} className="h-full">
          <img 
            src="/lovable-uploads/4e991fab-78d2-4e10-831e-c373a61d5626.png" 
            alt="Personal development journey" 
            className="w-full h-full object-cover opacity-10"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-spirit-50/95 to-white"></div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-calm-100/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-spirit-100/30 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="mb-12 space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold">Not Sure Where to Begin?</h2>
          <p className="text-lg text-earth-700 mx-auto max-w-2xl">
            Take our quick questionnaire to discover the perfect spiritual journeys for your unique needs and aspirations.
          </p>
        </div>
        
        {!showQuestionnaire ? (
          <Button 
            onClick={() => setShowQuestionnaire(true)} 
            className="bg-spirit-600 hover:bg-spirit-700 text-white text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Sparkles size={18} className="mr-2" />
            Find Your Journey
          </Button>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-xl border border-spirit-100/50 animate-fade-in">
            <JourneyQuestionnaire onClose={() => setShowQuestionnaire(false)} />
          </div>
        )}
      </div>
    </section>
  );
};

export default QuestionnaireSection;
