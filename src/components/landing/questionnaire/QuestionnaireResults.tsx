
import React from 'react';
import { Button } from "@/components/ui/button";
import ProcessCard, { ProcessCardProps } from '@/components/ProcessCard';

interface QuestionnaireResultsProps {
  results: ProcessCardProps[];
  onClose: () => void;
  onTakeAgain: () => void;
}

const QuestionnaireResults: React.FC<QuestionnaireResultsProps> = ({ 
  results, 
  onClose,
  onTakeAgain 
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-xl font-medium text-center mb-6">Your Recommended Journeys</h3>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((journey) => (
            <ProcessCard key={journey.id} {...journey} />
          ))}
        </div>
      ) : (
        <p className="text-center text-earth-600">No matching journeys found. Please try different preferences.</p>
      )}
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={onTakeAgain}
        >
          Take Again
        </Button>
        <Button 
          variant="ghost" 
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default QuestionnaireResults;
