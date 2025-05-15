
import React from 'react';
import AIInteraction from '../AIInteraction';
import { useIsMobile } from '@/hooks/use-mobile';

interface JourneyInsightsProps {
  currentDay: number;
  completed: boolean;
  onComplete: () => void;
  lastUserMessage?: string | null;
  onUpdateLastMessage?: (message: string) => void;
}

const JourneyInsights: React.FC<JourneyInsightsProps> = ({ 
  currentDay,
  completed,
  onComplete,
  lastUserMessage,
  onUpdateLastMessage
}) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    // In mobile view, AIInteraction component will take full screen
    return (
      <div className="fixed inset-0 bg-white z-10">
        <AIInteraction 
          currentDay={currentDay}
          completed={completed}
          onComplete={onComplete}
          isPracticeMode={true}
          lastUserMessage={lastUserMessage}
          onUpdateLastMessage={onUpdateLastMessage}
        />
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <AIInteraction 
        currentDay={currentDay}
        completed={completed}
        onComplete={onComplete}
        isPracticeMode={true}
        lastUserMessage={lastUserMessage}
        onUpdateLastMessage={onUpdateLastMessage}
      />
    </div>
  );
};

export default JourneyInsights;
