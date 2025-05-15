
import { useState, useEffect } from 'react';
import { Message } from '../types';
import { getWelcomeMessage } from '../responseGenerator';

interface UseMessageManagementProps {
  currentJourney?: any;
  updateLastActivity: () => void;
  setWaitingForResponse: (waiting: boolean) => void;
  lastUserMessage?: string | null;
  onUpdateLastMessage?: (message: string) => void;
}

export const useMessageManagement = ({
  currentJourney,
  updateLastActivity,
  setWaitingForResponse,
  lastUserMessage,
  onUpdateLastMessage
}: UseMessageManagementProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState<boolean>(false);

  // Initialize with welcome message when hook mounts
  useEffect(() => {
    if (!initialMessageSent) {
      const initialMessage: Message = {
        id: '1',
        content: getWelcomeMessage(currentJourney),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages([initialMessage]);
      setWaitingForResponse(true);
      setInitialMessageSent(true);
      updateLastActivity();
    }
  }, [currentJourney, initialMessageSent, setWaitingForResponse, updateLastActivity]);

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
