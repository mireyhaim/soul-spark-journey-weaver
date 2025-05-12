
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { journeys } from '@/data/journeys';
import { Message } from './ai-chat/types';
import { generateResponse, getWelcomeMessage } from './ai-chat/responseGenerator';
import MessageList from './ai-chat/MessageList';
import MessageInput from './ai-chat/MessageInput';
import PracticeQuestions from './ai-chat/PracticeQuestions';

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
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userReflections, setUserReflections] = useState<{[key: string]: string}>({
    gratitude: "",
    challenges: "",
    abundance: ""
  });
  
  // Get current journey information for contextual responses
  const currentJourney = journeys.find(j => j.id === id);
  
  // Initialize with welcome message when component mounts
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      content: getWelcomeMessage(currentJourney),
      sender: 'ai',
      timestamp: new Date()
    };
    
    // Add practice instructions if in practice mode
    if (isPracticeMode && !completed) {
      const practiceMessage: Message = {
        id: '2',
        content: `It's Day ${currentDay} of your journey. Please complete today's practice questions below.`,
        sender: 'ai',
        timestamp: new Date(Date.now() + 100) // slight delay
      };
      setMessages([initialMessage, practiceMessage]);
    } else {
      setMessages([initialMessage]);
    }
  }, [id, currentDay, isPracticeMode, completed]); // Reset messages when key props change

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse({ userInput: input, journey: currentJourney }),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleReflectionChange = (key: string, value: string) => {
    setUserReflections(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCompletePractice = () => {
    // Add reflection summary message
    const reflectionMessage: Message = {
      id: Date.now().toString(),
      content: "I've completed today's practice questions.",
      sender: 'user',
      timestamp: new Date()
    };
    
    const aiResponseMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "Great job completing today's practice! Your reflections have been saved. Feel free to ask me any questions about your journey.",
      sender: 'ai',
      timestamp: new Date(Date.now() + 1000)
    };
    
    setMessages(prev => [...prev, reflectionMessage, aiResponseMessage]);
    
    // Call the parent component's onComplete handler
    onComplete();
  };

  // Get daily practice questions based on current day
  const getDailyQuestions = () => {
    switch(currentDay) {
      case 1:
        return [
          { question: "What specific form of abundance are you seeking to manifest?", fieldKey: "gratitude" },
          { question: "Why is this important to you on a soul level?", fieldKey: "challenges" },
          { question: "How will you feel when this abundance manifests in your life?", fieldKey: "abundance" }
        ];
      case 2:
        return [
          { question: "What beliefs about money or abundance did you learn growing up?", fieldKey: "gratitude" },
          { question: "What fears come up when you think about having more abundance?", fieldKey: "challenges" },
          { question: "What new belief would better serve your abundance journey?", fieldKey: "abundance" }
        ];
      case 3:
        return [
          { question: "Write a letter to release a limiting belief about abundance:", fieldKey: "gratitude" },
          { question: "What emotions arise as you release this belief?", fieldKey: "challenges" },
          { question: "Create an affirmation to replace this limiting belief:", fieldKey: "abundance" }
        ];
      case 4:
        return [
          { question: "Describe what you saw during your abundance meditation:", fieldKey: "gratitude" },
          { question: "What emotions did you experience?", fieldKey: "challenges" },
          { question: "How can you bring this feeling into your daily life?", fieldKey: "abundance" }
        ];
      case 5:
      default:
        return [
          { question: "What three things are you most grateful for today?", fieldKey: "gratitude" },
          { question: "How has gratitude helped you overcome challenges?", fieldKey: "challenges" },
          { question: "Where do you see abundance already present in your life?", fieldKey: "abundance" }
        ];
    }
  };

  const dailyQuestions = getDailyQuestions();

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
        
        {isPracticeMode && (
          <div className="px-4 pt-2 pb-4">
            <PracticeQuestions
              currentDay={currentDay}
              questions={dailyQuestions}
              userReflections={userReflections}
              onReflectionChange={handleReflectionChange}
              onComplete={handleCompletePractice}
              isComplete={completed}
            />
          </div>
        )}
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
