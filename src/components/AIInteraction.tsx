
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { journeys } from '@/data/journeys';
import MessageList from './ai-chat/MessageList';
import MessageInput from './ai-chat/MessageInput';
import { useChatMessages } from './ai-chat/hooks/useChatMessages';

interface AIInteractionProps {
  currentDay?: number;
  completed?: boolean;
  onComplete?: () => void;
  isPracticeMode?: boolean;
}

const AIInteraction: React.FC<AIInteractionProps> = ({ 
  currentDay = 1, 
  completed = false, 
  onComplete = () => {}, 
  isPracticeMode = false 
}) => {
  const { id } = useParams<{ id: string }>();
  
  // Get current journey information for contextual responses
  const currentJourney = journeys.find(j => j.id === id);
  
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
    currentJourney
  });

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg border-spirit-100">
      <CardHeader className="bg-gradient-to-r from-spirit-50 to-calm-50">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback className="bg-spirit-100 text-spirit-700">AI</AvatarFallback>
            <AvatarImage src="/placeholder.svg" />
          </Avatar>
          <div>
            <CardTitle className="text-lg">Spirit Guide</CardTitle>
            <CardDescription>Your personal growth companion</CardDescription>
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
