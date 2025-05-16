
import { useState, useEffect } from 'react';
import { Message } from '../types';
import { getWelcomeMessage } from '../responseGenerator';

interface UseMessageManagementProps {
  currentJourney?: any;
  currentDay?: number;
  updateLastActivity: () => void;
  setWaitingForResponse: (waiting: boolean) => void;
  lastUserMessage?: string | null;
  onUpdateLastMessage?: (message: string) => void;
  userName?: string;
}

export const useMessageManagement = ({
  currentJourney,
  currentDay = 1,
  updateLastActivity,
  setWaitingForResponse,
  lastUserMessage,
  onUpdateLastMessage,
  userName = ''
}: UseMessageManagementProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState<boolean>(false);

  // Initialize with welcome message when hook mounts or when current day changes
  useEffect(() => {
    if (!initialMessageSent) {
      // If we have a last message from the user, customize the welcome to maintain continuity
      let welcomeContent = getWelcomeMessage(currentJourney, userName);
      
      if (lastUserMessage) {
        welcomeContent = `${userName ? `${userName}, ` : ''}hello again! I'm glad to see you back for Day ${currentDay} of your journey. 
        
Last time we spoke, you shared: "${lastUserMessage}".

Let's continue from there. I'm here to support you with today's practice.`;
      } else {
        welcomeContent = `Welcome to Day ${currentDay} of your journey! ${welcomeContent}`;
      }
      
      const initialMessage: Message = {
        id: '1',
        content: welcomeContent,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages([initialMessage]);
      setWaitingForResponse(true);
      setInitialMessageSent(true);
      updateLastActivity();
    }
  }, [currentJourney, currentDay, initialMessageSent, setWaitingForResponse, updateLastActivity, lastUserMessage, userName]);

  // Add a user message to the conversation
  const addUserMessage = (content: string): void => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Save last message for continuity if needed
    if (onUpdateLastMessage) {
      onUpdateLastMessage(content);
    }
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setWaitingForResponse(false);
    updateLastActivity();
  };

  // Add an AI message to the conversation
  const addAIMessage = (content: string): void => {
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content,
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
    setWaitingForResponse(true);
    updateLastActivity();
  };

  // Set typing indicator
  const startTyping = () => setIsTyping(true);
  const stopTyping = () => setIsTyping(false);

  return {
    messages,
    setMessages,
    input,
    setInput,
    isTyping,
    addUserMessage,
    addAIMessage,
    startTyping,
    stopTyping
  };
};
