
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import JourneyInsights from './JourneyInsights';

interface MobileChatViewProps {
  currentDay: number;
  completed: boolean;
  onComplete: () => void;
  onBack: () => void;
  lastUserMessage?: string | null;
  onUpdateLastMessage?: (message: string) => void;
  journeyCategory?: string;
  completedDays?: number[];
}

const MobileChatView: React.FC<MobileChatViewProps> = ({ 
  currentDay, 
  completed, 
  onComplete,
  onBack,
  lastUserMessage,
  onUpdateLastMessage,
  journeyCategory,
  completedDays = []
}) => {
  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 left-0 z-20 p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-white/80 backdrop-blur-sm rounded-full shadow-md"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <JourneyInsights
        currentDay={currentDay}
        completed={completed}
        onComplete={onComplete}
        lastUserMessage={lastUserMessage}
        onUpdateLastMessage={onUpdateLastMessage}
        journeyCategory={journeyCategory}
        completedDays={completedDays}
      />
    </div>
  );
};

export default MobileChatView;
