
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIInteraction: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome to your spiritual journey. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

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
      const responses = [
        "I sense that you're feeling reflective today. Let's explore that feeling deeper.",
        "Thank you for sharing. What specific aspect of this would you like to focus on in today's practice?",
        "That's important to acknowledge. Perhaps we could work on a mindfulness exercise related to this?",
        "I'm here to support your journey. Would you like to try a guided meditation to help with this?",
        "Your awareness is the first step toward growth. Let's build on that together."
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
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
            placeholder="Type your message..."
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
