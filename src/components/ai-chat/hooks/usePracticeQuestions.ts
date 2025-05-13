
import { useState, useEffect } from 'react';
import { Message } from '../types';
import { getDailyQuestions } from '../practiceQuestions';

interface UsePracticeQuestionsProps {
  isPracticeMode: boolean;
  currentDay: number;
  completed: boolean;
  onComplete: () => void;
  addAIMessage: (content: string) => void;
  updateLastActivity: () => void;
  setWaitingForResponse: (waiting: boolean) => void;
}

export const usePracticeQuestions = ({
  isPracticeMode,
  currentDay,
  completed,
  onComplete,
  addAIMessage,
  updateLastActivity,
  setWaitingForResponse
}: UsePracticeQuestionsProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [practiceComplete, setPracticeComplete] = useState<boolean>(completed);
  const [firstQuestionSent, setFirstQuestionSent] = useState<boolean>(false);
  const [hasGreetedUser, setHasGreetedUser] = useState<boolean>(false);
  const [conversationStarted, setConversationStarted] = useState<boolean>(false);
  const [questionsAsked, setQuestionsAsked] = useState<Set<number>>(new Set());

  // Handle first user message - respond and flag that we've greeted
  const handleFirstUserMessage = async (
    generateAIResponse: (userInput: string, questionIndex?: number) => Promise<string>, 
    userInput: string
  ) => {
    // Generate AI response to the user's first message
    const aiResponse = await generateAIResponse(userInput);
    addAIMessage(aiResponse);
    
    setHasGreetedUser(true);
    setWaitingForResponse(true);
    updateLastActivity();
    return true;
  };

  // Handle second user message and send first practice question
  const handleSecondUserMessage = async (
    generateAIResponse: (userInput: string, questionIndex?: number) => Promise<string>, 
    userInput: string,
    setMessages: (updater: (prev: Message[]) => Message[]) => void
  ) => {
    // First respond to the user's message
    const aiResponse = await generateAIResponse(userInput);
    addAIMessage(aiResponse);
    
    // After a short delay, send the first practice question
    setTimeout(() => {
      if (questionsAsked.has(0)) {
        return;
      }

      const dailyQuestions = getDailyQuestions(currentDay);
      const firstQuestion: Message = {
        id: (Date.now() + 2).toString(),
        content: `It's Day ${currentDay} of your journey. ${dailyQuestions[0].question}`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, firstQuestion]);
      setFirstQuestionSent(true);
      setQuestionsAsked(prev => new Set(prev).add(0));
      setWaitingForResponse(true);
      updateLastActivity();
    }, 1500);
    
    return true;
  };

  // Handle responses to practice questions
  const handlePracticeQuestionResponse = async (
    generateAIResponse: (userInput: string, questionIndex?: number) => Promise<string>, 
    userInput: string,
    setMessages: (updater: (prev: Message[]) => Message[]) => void
  ) => {
    // Generate AI response to the user's answer
    const aiResponse = await generateAIResponse(userInput, currentQuestionIndex);
    
    // Respond to the user's answer
    addAIMessage(aiResponse);
    setQuestionAnswered(true);
    
    // After a short delay, check if there are more questions
    setTimeout(() => {
      const dailyQuestions = getDailyQuestions(currentDay);
      
      if (currentQuestionIndex < dailyQuestions.length - 1) {
        // Send the next question
        const nextQuestionIndex = currentQuestionIndex + 1;
        
        // Skip if this question was already asked
        if (questionsAsked.has(nextQuestionIndex)) {
          return;
        }

        setCurrentQuestionIndex(nextQuestionIndex);
        setQuestionAnswered(false);
        
        const nextQuestion: Message = {
          id: (Date.now() + 2).toString(),
          content: dailyQuestions[nextQuestionIndex].question,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, nextQuestion]);
        setQuestionsAsked(prev => new Set(prev).add(nextQuestionIndex));
        setWaitingForResponse(true);
        updateLastActivity();
      } else {
        // This was the last question, send completion message
        const completionMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: "You've completed today's practice! Your reflections have been saved. Feel free to continue our conversation about your journey.",
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, completionMessage]);
        setPracticeComplete(true);
        onComplete(); // Notify parent component that practice is complete
        setWaitingForResponse(true);
        updateLastActivity();
      }
    }, 1500);
    
    return true;
  };

  // Reset conversation state for a new day
  const resetConversation = () => {
    setCurrentQuestionIndex(0);
    setQuestionAnswered(false);
    setFirstQuestionSent(false);
    setHasGreetedUser(false);
    setConversationStarted(false);
    setQuestionsAsked(new Set());
  };

  // Effect to update practice complete state when completed prop changes
  useEffect(() => {
    setPracticeComplete(completed);
  }, [completed]);

  return {
    currentQuestionIndex,
    questionAnswered,
    practiceComplete,
    firstQuestionSent,
    hasGreetedUser,
    conversationStarted,
    setConversationStarted,
    handleFirstUserMessage,
    handleSecondUserMessage,
    handlePracticeQuestionResponse,
    resetConversation
  };
};
