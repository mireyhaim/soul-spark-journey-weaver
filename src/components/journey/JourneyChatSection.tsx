
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import JourneyInsights from './JourneyInsights';
import { getGuideText } from '@/utils/journey-helpers';

interface JourneyChatSectionProps {
  currentDay: number;
  completed: boolean;
  onComplete: () => void;
  isMobile: boolean;
  onToggleChat?: () => void;
  lastUserMessage?: string | null;
  onUpdateLastMessage?: (message: string) => void;
  journeyCategory?: string;
}

const JourneyChatSection: React.FC<JourneyChatSectionProps> = ({ 
  currentDay, 
  completed, 
  onComplete,
  isMobile,
  onToggleChat,
  lastUserMessage,
  onUpdateLastMessage,
  journeyCategory
}) => {
  const guideText = getGuideText(journeyCategory);
  
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-sans font-semibold">{guideText.title}</h2>
          {isMobile && (
            <Button 
              variant="outline" 
              onClick={onToggleChat}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Open Chat
            </Button>
          )}
        </div>
        
        {!isMobile && (
          <JourneyInsights 
            currentDay={currentDay} 
            completed={completed} 
            onComplete={onComplete}
            lastUserMessage={lastUserMessage}
            onUpdateLastMessage={onUpdateLastMessage}
            journeyCategory={journeyCategory}
          />
        )}
      </div>
    </div>
  );
};

export default JourneyChatSection;
