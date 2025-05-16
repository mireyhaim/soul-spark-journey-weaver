
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { journeys } from '@/data/journeys';
import MessageList from './ai-chat/MessageList';
import MessageInput from './ai-chat/MessageInput';
import { useChatMessages } from './ai-chat/hooks/useChatMessages';
import { useIsMobile } from '@/hooks/use-mobile';
import { getGuideText } from '@/utils/journey-helpers';

interface AIInteractionProps {
  currentDay?: number;
  completed?: boolean;
  onComplete?: () => void;
  isPracticeMode?: boolean;
  lastUserMessage?: string | null;
  onUpdateLastMessage?: (message: string) => void;
  journeyCategory?: string;
  completedDays?: number[];
}

const AIInteraction: React.FC<AIInteractionProps> = ({ 
  currentDay = 1, 
  completed = false, 
  onComplete = () => {}, 
  isPracticeMode = false,
  lastUserMessage = null,
  onUpdateLastMessage,
  journeyCategory,
  completedDays = []
}) => {
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsMobile();
  
  // Get current journey information for contextual responses
  const currentJourney = journeys.find(j => j.id === id);
  const category = journeyCategory || currentJourney?.category;
  const guideText = getGuideText(category);
  
  const {
    input,
    setInput,
    messages,
    isTyping,
    handleSend
  } = useChatMessages({
    currentDay,
    completed,
    onComplete,
    isPracticeMode,
    currentJourney,
    lastUserMessage,
    onUpdateLastMessage,
    completedDays
  });

  if (isMobile) {
    return (
      <div className="flex flex-col h-[calc(100vh-150px)] w-full bg-white">
        <div className="p-4 bg-gradient-to-r from-spirit-50 to-calm-50 flex items-center space-x-3 shadow-sm">
          <Avatar>
            <AvatarFallback className="bg-spirit-100 text-spirit-700">AI</AvatarFallback>
            <AvatarImage src="/placeholder.svg" />
          </Avatar>
          <div>
            <h2 className="text-lg font-medium">{guideText.title}</h2>
            <p className="text-sm text-earth-500">{guideText.description}</p>
          </div>
        </div>
        
        <div className="flex-grow overflow-hidden">
          <MessageList messages={messages} isTyping={isTyping} isMobile={true} />
        </div>
        
        <div className="border-t p-3 bg-white">
          <MessageInput 
            input={input}
            setInput={setInput}
            onSendMessage={handleSend}
          />
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full shadow-lg border-spirit-100">
      <CardHeader className="bg-gradient-to-r from-spirit-50 to-calm-50">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback className="bg-spirit-100 text-spirit-700">AI</AvatarFallback>
            <AvatarImage src="/placeholder.svg" />
          </Avatar>
          <div>
            <CardTitle className="text-lg">{guideText.title}</CardTitle>
            <CardDescription>{guideText.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <MessageList messages={messages} isTyping={isTyping} />
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <MessageInput 
          input={input}
          setInput={setInput}
          onSendMessage={handleSend}
        />
      </CardFooter>
    </Card>
  );
};

export default AIInteraction;
