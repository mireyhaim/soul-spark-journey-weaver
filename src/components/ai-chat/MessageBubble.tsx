
import React from 'react';
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUserMessage = message.sender === 'user';
  
  return (
    <div 
      className={`mb-4 flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUserMessage 
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
  );
};

export default MessageBubble;
