
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { journeys } from '@/data/journeys';
import { Message } from './ai-chat/types';
import { generateResponse, getWelcomeMessage } from './ai-chat/responseGenerator';
import MessageList from './ai-chat/MessageList';
import MessageInput from './ai-chat/MessageInput';

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [practiceComplete, setPracticeComplete] = useState<boolean>(completed);
  
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

    // If in practice mode and not completed, send the first question after a short delay
    if (isPracticeMode && !completed) {
      setTimeout(() => {
        const dailyQuestions = getDailyQuestions();
        const firstQuestion: Message = {
          id: '2',
          content: `It's Day ${currentDay} of your journey. ${dailyQuestions[0].question}`,
          sender: 'ai',
          timestamp: new Date(Date.now() + 100)
        };
        setMessages(prev => [...prev, firstQuestion]);
      }, 1000);
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
    
    // Handle practice mode questions logic
    if (isPracticeMode && !practiceComplete) {
      setIsTyping(true);
      setTimeout(() => {
        const dailyQuestions = getDailyQuestions();
        
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

  // Get daily practice questions based on current day
  const getDailyQuestions = () => {
    switch(currentDay) {
      case 1:
        return [
          { question: "What specific form of abundance are you seeking to manifest?", fieldKey: "question1" },
          { question: "Why is this important to you on a soul level?", fieldKey: "question2" },
          { question: "How will you feel when this abundance manifests in your life?", fieldKey: "question3" }
        ];
      case 2:
        return [
          { question: "What beliefs about money or abundance did you learn growing up?", fieldKey: "question1" },
          { question: "What fears come up when you think about having more abundance?", fieldKey: "question2" },
          { question: "What new belief would better serve your abundance journey?", fieldKey: "question3" }
        ];
      case 3:
        return [
          { question: "Write a letter to release a limiting belief about abundance:", fieldKey: "question1" },
          { question: "What emotions arise as you release this belief?", fieldKey: "question2" },
          { question: "Create an affirmation to replace this limiting belief:", fieldKey: "question3" }
        ];
      case 4:
        return [
          { question: "Describe what you saw during your abundance meditation:", fieldKey: "question1" },
          { question: "What emotions did you experience?", fieldKey: "question2" },
          { question: "How can you bring this feeling into your daily life?", fieldKey: "question3" }
        ];
      case 5:
      default:
        return [
          { question: "What three things are you most grateful for today?", fieldKey: "question1" },
          { question: "How has gratitude helped you overcome challenges?", fieldKey: "question2" },
          { question: "Where do you see abundance already present in your life?", fieldKey: "question3" }
        ];
    }
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
