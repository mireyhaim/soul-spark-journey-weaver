
import { useState, useEffect } from 'react';
import { Message } from '../types';
import { generateResponse, getWelcomeMessage } from '../responseGenerator';
import { getDailyQuestions } from '../practiceQuestions';

interface UseChatMessagesProps {
  currentDay: number;
  completed: boolean;
  onComplete: () => void;
  isPracticeMode: boolean;
  currentJourney?: any;
}

export const useChatMessages = ({
  currentDay,
  completed,
  onComplete,
  isPracticeMode,
  currentJourney
}: UseChatMessagesProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [practiceComplete, setPracticeComplete] = useState<boolean>(completed);

  // Initialize with welcome message when component mounts
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      content: getWelcomeMessage(currentJourney),
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);

    // If in practice mode and not completed, send the first question after a short delay
    if (isPracticeMode && !completed) {
      setTimeout(() => {
        const dailyQuestions = getDailyQuestions(currentDay);
        const firstQuestion: Message = {
          id: '2',
          content: `It's Day ${currentDay} of your journey. ${dailyQuestions[0].question}`,
          sender: 'ai',
          timestamp: new Date(Date.now() + 100)
        };
        setMessages(prev => [...prev, firstQuestion]);
      }, 1000);
    }
  }, [currentDay, isPracticeMode, completed, currentJourney]);

  // Generate responses to practice question answers
  const generatePracticeResponse = (userAnswer: string, questionIndex: number): string => {
    // Simple validation - don't accept very short answers
    if (userAnswer.length < 5) {
      return "I'd love to hear more about that. Could you please elaborate a bit?";
    }
    
    const positiveResponses = [
      "Thank you for sharing that insight. I really appreciate your depth of reflection.",
      "That's a thoughtful response. I can see you're engaging deeply with this process.",
      "What a beautiful reflection. Your awareness in this area is growing.",
      "I appreciate your honesty. This kind of reflection is exactly what helps deepen your journey.",
      "That's a powerful insight. Thank you for sharing your truth."
    ];
    
    const encouragementByQuestion = [
      "I see your vision for abundance clearly forming.",
      "Recognizing these beliefs is the first step to transforming them.",
      "Releasing limitations opens space for new possibilities.",
      "Your meditation practice is deepening beautifully.",
      "Gratitude is such a powerful force for manifestation."
    ];
    
    const questionSpecificResponse = questionIndex < encouragementByQuestion.length 
      ? encouragementByQuestion[questionIndex]
      : "Your reflection shows real growth.";
    
    const randomPositive = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    
    return `${randomPositive} ${questionSpecificResponse}`;
  };

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
    
    // Handle practice mode questions logic
    if (isPracticeMode && !practiceComplete) {
      setIsTyping(true);
      setTimeout(() => {
        const dailyQuestions = getDailyQuestions(currentDay);
        
        // If this is a response to a question and not the last question
        if (!questionAnswered) {
          // Respond to the user's answer
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: generatePracticeResponse(input, currentQuestionIndex),
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, responseMessage]);
          setQuestionAnswered(true);
          
          // After a short delay, send the next question if there are more
          setTimeout(() => {
            if (currentQuestionIndex < dailyQuestions.length - 1) {
              const nextQuestionIndex = currentQuestionIndex + 1;
              const nextQuestion: Message = {
                id: (Date.now() + 2).toString(),
                content: dailyQuestions[nextQuestionIndex].question,
                sender: 'ai',
                timestamp: new Date()
              };
              
              setMessages(prev => [...prev, nextQuestion]);
              setCurrentQuestionIndex(nextQuestionIndex);
              setQuestionAnswered(false);
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
            }
          }, 1500);
        } else {
          // If user is continuing conversation after completing practice
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: generateResponse({ userInput: input, journey: currentJourney }),
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
        }
        
        setIsTyping(false);
      }, 1500);
    } else {
      // Normal chat mode
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
    }
  };

  return {
    input,
    setInput,
    messages,
    isTyping,
    handleSend
  };
};
