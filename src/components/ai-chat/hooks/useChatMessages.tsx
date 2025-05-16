
import { useState, useEffect } from 'react';
import { useMessageManagement } from './useMessageManagement';
import { useLanguageDetection } from './useLanguageDetection';
import { useAIResponseGeneration } from './useAIResponseGeneration';
import { useInactivityDetection } from './useInactivityDetection';
import { usePracticeQuestions } from './usePracticeQuestions';
import { Message } from '../types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface UseChatMessagesProps {
  currentDay: number;
  completed: boolean;
  onComplete: () => void;
  isPracticeMode: boolean;
  currentJourney?: any;
  lastUserMessage?: string | null;
  onUpdateLastMessage?: (message: string) => void;
  completedDays?: number[];
}

export const useChatMessages = ({
  currentDay,
  completed,
  onComplete,
  isPracticeMode,
  currentJourney,
  lastUserMessage,
  onUpdateLastMessage,
  completedDays = []
}: UseChatMessagesProps) => {
  // State for tracking waiting for user response
  const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const supabase = useSupabaseClient();

  // Send a follow-up message if the user is inactive
  const sendFollowUpMessage = () => {
    // Only send follow-up if we're still waiting for a response
    if (!waitingForResponse) return;
    
    const followUpContent = languageDetection.getFollowUpMessage(userName);
    
    const followUpMessage: Message = {
      id: Date.now().toString(),
      content: followUpContent,
      sender: 'ai',
      timestamp: new Date()
    };
    
    messageManagement.setMessages(prev => [...prev, followUpMessage]);
    inactivityDetection.updateLastActivity();
  };
  
  // Load user name if available
  useEffect(() => {
    const loadUserName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('name')
          .eq('id', user.id)
          .single();
          
        if (userData?.name) {
          setUserName(userData.name);
        }
      }
    };
    
    loadUserName();
  }, [supabase]);
  
  // Initialize hooks
  const languageDetection = useLanguageDetection();
  
  const inactivityDetection = useInactivityDetection({ 
    waitingForResponse, 
    sendFollowUpMessage 
  });
  
  const messageManagement = useMessageManagement({
    currentJourney,
    currentDay,
    updateLastActivity: inactivityDetection.updateLastActivity,
    setWaitingForResponse,
    lastUserMessage,
    onUpdateLastMessage,
    userName
  });
  
  const aiResponseGeneration = useAIResponseGeneration();
  
  const practiceQuestions = usePracticeQuestions({
    isPracticeMode,
    currentDay,
    completed,
    onComplete,
    addAIMessage: messageManagement.addAIMessage,
    updateLastActivity: inactivityDetection.updateLastActivity,
    setWaitingForResponse
  });

  // Handle sending a message
  const handleSend = () => {
    if (!messageManagement.input.trim()) return;
    
    // Add user message to conversation
    messageManagement.addUserMessage(messageManagement.input);
    
    // Detect language from user input
    const detectedLanguage = languageDetection.updateLanguage(messageManagement.input);
    
    // Set conversation as started after first user message
    if (!practiceQuestions.conversationStarted) {
      practiceQuestions.setConversationStarted(true);
    }
    
    // Handle practice mode questions logic
    if (isPracticeMode && !practiceQuestions.practiceComplete) {
      messageManagement.startTyping();
      
      setTimeout(async () => {
        // First user message - respond and handle greeting
        if (practiceQuestions.conversationStarted && !practiceQuestions.hasGreetedUser) {
          await practiceQuestions.handleFirstUserMessage(
            (input, qIndex) => aiResponseGeneration.generateAIResponse(
              input, 
              qIndex, 
              currentDay, 
              detectedLanguage,
              currentJourney,
              completedDays,
              userName
            ), 
            messageManagement.input
          );
          messageManagement.stopTyping();
          return;
        }
        
        // Second user message - now we can send the first practice question
        if (practiceQuestions.hasGreetedUser && !practiceQuestions.firstQuestionSent) {
          await practiceQuestions.handleSecondUserMessage(
            (input, qIndex) => aiResponseGeneration.generateAIResponse(
              input, 
              qIndex, 
              currentDay, 
              detectedLanguage,
              currentJourney,
              completedDays,
              userName
            ), 
            messageManagement.input,
            messageManagement.setMessages
          );
          messageManagement.stopTyping();
          return;
        }
        
        // Handle responses to practice questions
        if (practiceQuestions.firstQuestionSent) {
          await practiceQuestions.handlePracticeQuestionResponse(
            (input, qIndex) => aiResponseGeneration.generateAIResponse(
              input, 
              qIndex, 
              currentDay, 
              detectedLanguage,
              currentJourney,
              completedDays,
              userName
            ), 
            messageManagement.input,
            messageManagement.setMessages
          );
          messageManagement.stopTyping();
          return;
        }
        
        // General conversation after practice is completed
        const aiResponse = await aiResponseGeneration.generateAIResponse(
          messageManagement.input, 
          -1, 
          currentDay, 
          detectedLanguage,
          currentJourney,
          completedDays,
          userName
        );
          
        messageManagement.addAIMessage(aiResponse);
      }, 1500);
    } else {
      // Normal chat mode
      messageManagement.startTyping();
      setTimeout(async () => {
        const aiResponse = await aiResponseGeneration.generateAIResponse(
          messageManagement.input, 
          -1, 
          currentDay, 
          detectedLanguage,
          currentJourney,
          completedDays,
          userName
        );
        
        messageManagement.addAIMessage(aiResponse);
      }, 1500);
    }
  };

  return {
    input: messageManagement.input,
    setInput: messageManagement.setInput,
    messages: messageManagement.messages,
    isTyping: messageManagement.isTyping,
    handleSend,
    userName
  };
};
