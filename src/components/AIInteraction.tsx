
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useParams } from 'react-router-dom';
import { journeys } from '@/data/journeys';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIInteraction: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Get current journey information for contextual responses
  const currentJourney = journeys.find(j => j.id === id);
  
  // Initialize with welcome message when component mounts
  React.useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      content: getWelcomeMessage(),
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [id]); // Reset messages when journey changes

  // Generate personalized welcome message based on journey
  const getWelcomeMessage = (): string => {
    if (!currentJourney) {
      return "Welcome to your spiritual journey. I'm your personal guide, here to support you every step of the way. How are you feeling today?";
    }
    
    // Journey-specific welcome messages
    const welcomeMessages: Record<string, string> = {
      // Personal Development
      '1': "Welcome to your self-discovery journey. I'm Maya, your personal guide. I'm here to help you uncover your authentic self and true purpose. How are you feeling about beginning this journey of self-exploration?",
      '2': "I'm so glad you've chosen this emotional intelligence path. I'm Sophia, your supportive AI mentor. I'll be with you as you develop a deeper understanding of your emotions. How are you feeling right now?",
      // Abundance journeys
      '10': "Welcome to your manifestation journey. I'm Luna, your personal reality creation guide. I'm here to help you shape your dream life with intention and purpose. How are you feeling about manifesting your desires?",
      '13': "I'm delighted to join you on this abundance meditation journey. I'm Aria, your abundance guide. I'll support you in opening to receive prosperity in all forms. What's your relationship with abundance like right now?",
      // Default for other journeys
    };
    
    return welcomeMessages[currentJourney.id] || 
      `Welcome to your ${currentJourney.title} journey. I'm your personal guide and I'll be supporting you through each step of this ${currentJourney.duration}-day process. How are you feeling as we begin?`;
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
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input, currentJourney),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Generate supportive, empathetic responses based on user input and journey context
  const generateResponse = (userInput: string, journey?: any): string => {
    const userInputLower = userInput.toLowerCase();
    
    // Check for emotional keywords
    if (userInputLower.includes('anxious') || userInputLower.includes('afraid') || userInputLower.includes('scared')) {
      return "I hear that you're feeling some anxiety, and that's completely understandable. These journeys can bring up deep emotions. Remember to breathe deeply and know that I'm right here with you through this process. Would you like to try a quick grounding exercise together?";
    }
    
    if (userInputLower.includes('stuck') || userInputLower.includes('blocked') || userInputLower.includes('can\'t do')) {
      return "I understand feeling stuck can be frustrating. Let's acknowledge that blockage with compassion rather than judgment. Sometimes our greatest insights come when we gently work through resistance. What specifically feels most challenging right now?";
    }
    
    if (userInputLower.includes('happy') || userInputLower.includes('excited') || userInputLower.includes('good')) {
      return "I'm so glad to hear you're feeling positive! That energy is beautiful and will help propel you forward in this journey. Let's build on that feeling. What aspect of today's practice resonated most deeply with you?";
    }
    
    // Journey-specific responses
    if (journey) {
      if (journey.category === 'Abundance Manifestation') {
        return "I sense you're navigating your relationship with abundance. Remember that you are worthy of receiving fully, just as you are worthy of giving. Our practice is about expanding your capacity to welcome prosperity in all its forms. Would you like to explore what abundance truly means to you?";
      }
      
      if (journey.category === 'Personal Development') {
        return "Your self-awareness is truly inspiring. This journey is about meeting yourself with curiosity and compassion, and I can already sense your commitment to growth. What parts of yourself are you most excited to discover or strengthen through this process?";
      }
      
      if (journey.category === 'Reality Manifestation') {
        return "Your creative power is immense. As we continue this manifestation work, remember that clarity of intention combined with aligned emotion creates powerful results. I'm curious - when you visualize your desired reality, what details become most vivid to you?";
      }
    }
    
    // Default supportive responses
    const responses = [
      "Thank you for sharing that with me. Your openness creates space for real transformation. What support would be most helpful for you right now in your practice?",
      "I appreciate your reflection. There's such wisdom in what you're expressing. How might we deepen this insight in today's practice?",
      "I'm here with you every step of this journey. Your commitment to your growth is beautiful to witness. How are you honoring yourself through this process?",
      "What you're experiencing is an important part of your path. Sometimes the most challenging moments lead to the most profound breakthroughs. How can I best support you right now?",
      "I hear you completely. Your awareness is the fertile ground from which transformation grows. What aspect of today's practice would you like to explore more deeply?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
        <div className="h-[300px] overflow-y-auto p-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user' 
                    ? 'bg-spirit-600 text-white'
                    : 'bg-earth-100 text-earth-800'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-earth-100 text-earth-800 rounded-lg px-4 py-2 max-w-[80%]">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-earth-400 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-earth-400 animate-pulse delay-75"></span>
                  <span className="w-2 h-2 rounded-full bg-earth-400 animate-pulse delay-150"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <div className="flex w-full items-center space-x-2">
          <Textarea
            placeholder="Share your thoughts or ask for guidance..."
            className="min-h-10 flex-1 resize-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button 
            size="icon" 
            className="h-10 w-10 rounded-full"
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIInteraction;
