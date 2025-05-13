
import { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import { getWelcomeMessage } from '../responseGenerator';
import { getDailyQuestions } from '../practiceQuestions';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from '@/hooks/use-toast';

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
  const [userLanguage, setUserLanguage] = useState<string>('en'); // Default to English
  const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());
  const [initialMessageSent, setInitialMessageSent] = useState<boolean>(false);
  const [firstQuestionSent, setFirstQuestionSent] = useState<boolean>(false);
  const [conversationStarted, setConversationStarted] = useState<boolean>(false);
  const [hasGreetedUser, setHasGreetedUser] = useState<boolean>(false);
  
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const supabase = useSupabaseClient();
  const userResponses: string[] = [];

  // Initialize with welcome message when component mounts - but only the welcome message
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      content: getWelcomeMessage(currentJourney),
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    setWaitingForResponse(true); // Set waiting for response after welcome message
    setInitialMessageSent(true);
    updateLastActivity();
    
    // Setup inactivity checker when component mounts
    startInactivityTimer();
    
    // Cleanup inactivity timer when component unmounts
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [currentDay, isPracticeMode, completed, currentJourney]);

  // Update last activity time
  const updateLastActivity = () => {
    setLastActivityTime(Date.now());
  };
  
  // Start or reset the inactivity timer
  const startInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    inactivityTimerRef.current = setTimeout(checkUserInactivity, 30000); // Check every 30 seconds
  };
  
  // Check if user has been inactive and is expected to respond
  const checkUserInactivity = () => {
    const currentTime = Date.now();
    const inactiveTime = currentTime - lastActivityTime;
    
    // If waiting for response and inactive for more than 45 seconds, send a follow-up message
    if (waitingForResponse && inactiveTime > 45000) {
      sendFollowUpMessage();
    }
    
    // Restart the timer
    startInactivityTimer();
  };
  
  // Send a follow-up message if the user is inactive
  const sendFollowUpMessage = async () => {
    // Only send follow-up if we're still waiting for a response
    if (!waitingForResponse) return;
    
    let followUpContent = "";
    
    // Choose the appropriate language for the follow-up based on detected user language
    if (userLanguage === 'he') {
      followUpContent = "אתה עדיין שם? אשמח לשמוע את התשובה שלך כשתהיה מוכן.";
    } else if (userLanguage === 'ar') {
      followUpContent = "هل أنت ما زلت هنا؟ أتطلع إلى سماع إجابتك عندما تكون مستعدًا.";
    } else if (userLanguage === 'ru') {
      followUpContent = "Вы все еще здесь? Я буду рад услышать ваш ответ, когда вы будете готовы.";
    } else if (userLanguage === 'es') {
      followUpContent = "¿Sigues ahí? Espero escuchar tu respuesta cuando estés listo.";
    } else if (userLanguage === 'fr') {
      followUpContent = "Es-tu toujours là ? J'attends ta réponse quand tu seras prêt.";
    } else {
      followUpContent = "Are you still there? I'm looking forward to hearing your answer when you're ready.";
    }
    
    const followUpMessage: Message = {
      id: Date.now().toString(),
      content: followUpContent,
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, followUpMessage]);
    updateLastActivity(); // Update activity time after sending follow-up
  };

  // Enhanced language detection function
  const detectLanguage = (text: string): string => {
    // Detect various languages by their unicode character ranges
    
    // Hebrew
    if (/[\u0590-\u05FF]/.test(text)) {
      return 'he';
    }
    
    // Arabic
    if (/[\u0600-\u06FF]/.test(text)) {
      return 'ar';
    }
    
    // Russian/Cyrillic
    if (/[\u0400-\u04FF]/.test(text)) {
      return 'ru';
    }
    
    // Spanish/Portuguese likely indicators (not perfect but a simple heuristic)
    if (/[áéíóúñ¿¡]/.test(text.toLowerCase())) {
      return 'es';
    }
    
    // French likely indicators
    if (/[àâçéèêëîïôùûüÿœ]/.test(text.toLowerCase())) {
      return 'fr';
    }
    
    // Chinese characters
    if (/[\u4E00-\u9FFF]/.test(text)) {
      return 'zh';
    }
    
    // Japanese characters (Hiragana and Katakana)
    if (/[\u3040-\u30FF]/.test(text)) {
      return 'ja';
    }
    
    // Korean characters
    if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(text)) {
      return 'ko';
    }
    
    // Thai characters
    if (/[\u0E00-\u0E7F]/.test(text)) {
      return 'th';
    }
    
    // Default to English for Latin script or when language can't be confidently determined
    return 'en';
  };

  // Generate responses to practice question answers
  const generateAIResponse = async (userInput: string, questionIndex: number = -1): Promise<string> => {
    try {
      // For very short responses, prompt for more detail
      if (userInput.length < 5) {
        return "I'd love to hear more about that. Could you please elaborate a bit?";
      }
      
      // Detect language from user input
      const detectedLanguage = detectLanguage(userInput);
      if (detectedLanguage !== userLanguage) {
        setUserLanguage(detectedLanguage);
      }
      
      // Store user response for context
      userResponses.push(userInput);
      
      // If we're in the practice flow, create a prompt specific to the question
      let contextPrompt = '';
      if (questionIndex >= 0) {
        const dailyQuestions = getDailyQuestions(currentDay);
        contextPrompt = `The user is answering this question: "${dailyQuestions[questionIndex].question}". Their answer is: "${userInput}". Provide a supportive, empathetic response that acknowledges their reflection and gently guides them deeper.`;
      } else {
        // General conversation
        contextPrompt = `The user said: "${userInput}". Provide a supportive, empathetic response related to their spiritual journey.`;
      }
      
      const { data, error } = await supabase.functions.invoke('generate-ai-response', {
        body: {
          prompt: contextPrompt,
          journeyCategory: currentJourney?.category || 'Spiritual Growth',
          journeyName: currentJourney?.title || 'Personal Development',
          currentDay: currentDay,
          userContext: userResponses.slice(-3).join('\n'),
          userLanguage: detectedLanguage // Pass detected language to function
        }
      });
      
      if (error) {
        console.error('Error calling AI function:', error);
        return "I'm reflecting on what you shared. While I process that, would you like to tell me more about your experience?";
      }
      
      return data.message;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "Thank you for sharing. I'm here to support you on this journey. Would you like to explore this topic further?";
    }
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
    setWaitingForResponse(false); // User has responded
    updateLastActivity();
    
    // Set conversation as started after first user message
    if (!conversationStarted) {
      setConversationStarted(true);
    }
    
    // Handle practice mode questions logic
    if (isPracticeMode && !practiceComplete) {
      setIsTyping(true);
      
      setTimeout(async () => {
        const dailyQuestions = getDailyQuestions(currentDay);
        
        // First user message - respond and handle greeting
        if (conversationStarted && !hasGreetedUser) {
          // Generate AI response to the user's first message
          const aiResponse = await generateAIResponse(input);
          
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: aiResponse,
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, responseMessage]);
          setHasGreetedUser(true);
          setWaitingForResponse(true);
          updateLastActivity();
          setIsTyping(false);
          return;
        }
        
        // Second user message - now we can send the first practice question
        if (hasGreetedUser && !firstQuestionSent) {
          // First respond to the user's message
          const aiResponse = await generateAIResponse(input);
          
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: aiResponse,
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, responseMessage]);
          
          // After a short delay, send the first practice question
          setTimeout(() => {
            const firstQuestion: Message = {
              id: (Date.now() + 2).toString(),
              content: `It's Day ${currentDay} of your journey. ${dailyQuestions[0].question}`,
              sender: 'ai',
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, firstQuestion]);
            setFirstQuestionSent(true);
            setWaitingForResponse(true);
            updateLastActivity();
          }, 1500);
          
          setIsTyping(false);
          return;
        }
        
        // Handle responses to practice questions
        if (firstQuestionSent) {
          // Generate AI response to the user's answer
          const aiResponse = await generateAIResponse(input, currentQuestionIndex);
          
          // Respond to the user's answer
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: aiResponse,
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, responseMessage]);
          setQuestionAnswered(true);
          
          // After a short delay, check if there are more questions
          setTimeout(() => {
            if (currentQuestionIndex < dailyQuestions.length - 1) {
              // Send the next question
              const nextQuestionIndex = currentQuestionIndex + 1;
              setCurrentQuestionIndex(nextQuestionIndex);
              setQuestionAnswered(false);
              
              const nextQuestion: Message = {
                id: (Date.now() + 2).toString(),
                content: dailyQuestions[nextQuestionIndex].question,
                sender: 'ai',
                timestamp: new Date()
              };
              
              setMessages(prev => [...prev, nextQuestion]);
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
          
          setIsTyping(false);
          return;
        }
        
        // General conversation after practice is completed
        const aiResponse = await generateAIResponse(input);
          
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        setWaitingForResponse(true);
        updateLastActivity();
      }, 1500);
    } else {
      // Normal chat mode
      setIsTyping(true);
      setTimeout(async () => {
        const aiResponse = await generateAIResponse(input);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        setWaitingForResponse(true); // Waiting for response after AI message
        updateLastActivity();
      }, 1500);
    }
  };

  // Update lastActivityTime whenever there's user interaction
  useEffect(() => {
    if (input) {
      updateLastActivity();
    }
  }, [input]);

  return {
    input,
    setInput,
    messages,
    isTyping,
    handleSend
  };
};
