
import React from 'react';
import AIInteraction from '../AIInteraction';

interface JourneyInsightsProps {
  currentDay: number;
  completed: boolean;
  onComplete: () => void;
}

const JourneyInsights: React.FC<JourneyInsightsProps> = ({ 
  currentDay,
  completed,
  onComplete
}) => {
  return (
    <div>
      <AIInteraction 
        currentDay={currentDay}
        completed={completed}
        onComplete={onComplete}
        isPracticeMode={true}
      />
    </div>
  );
};

export default JourneyInsights;
