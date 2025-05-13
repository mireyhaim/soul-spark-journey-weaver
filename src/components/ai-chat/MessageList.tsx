
import React, { useEffect, useRef } from 'react';
import { Message } from './types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  isMobile?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, isMobile = false }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={isMobile ? "h-full overflow-y-auto p-4 pb-6 bg-earth-50" : "h-[400px] overflow-y-auto p-4"}>
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator />}
      
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
