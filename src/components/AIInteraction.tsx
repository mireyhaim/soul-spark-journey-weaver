
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { journeys } from '@/data/journeys';
import { Message } from './ai-chat/types';
import { generateResponse, getWelcomeMessage } from './ai-chat/responseGenerator';
import MessageList from './ai-chat/MessageList';
import MessageInput from './ai-chat/MessageInput';

const AIInteraction: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
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
    setMessages([initialMessage]);
  }, [id]); // Reset messages when journey changes

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
