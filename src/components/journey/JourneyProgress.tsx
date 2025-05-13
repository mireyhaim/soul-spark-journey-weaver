
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface JourneyProgressProps {
  currentDay: number;
  duration: number;
  completed: boolean;
  onContinue: () => void;
  onNext: () => void;
}

const JourneyProgress: React.FC<JourneyProgressProps> = ({ 
  currentDay, 
  duration, 
  completed, 
  onContinue, 
  onNext 
}) => {
  // Calculate progress percentage
  const progress = Math.round((currentDay / duration) * 100);
  
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm w-full md:w-1/2">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
        <p className="text-earth-600">Day {currentDay} of {duration}</p>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-earth-100 rounded-full mb-6">
        <div 
          className="h-2 bg-spirit-500 rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {completed ? (
        <div className="flex flex-col space-y-3">
          <p className="text-sm text-earth-600">You've completed today's practice! Well done.</p>
          {currentDay < duration && (
            <Button onClick={onNext} className="flex items-center">
              Continue to Day {currentDay + 1}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <Button onClick={onContinue}>Continue Today's Practice</Button>
      )}
    </div>
  );
};

export default JourneyProgress;
