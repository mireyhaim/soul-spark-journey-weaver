
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface MessageInputProps {
  input: string;
  setInput: (input: string) => void;
  onSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ input, setInput, onSendMessage }) => {
  return (
    <div className="flex w-full items-center space-x-2">
      <Textarea
        placeholder="Share your thoughts or ask for guidance..."
        className="min-h-10 flex-1 resize-none"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
          }
        }}
      />
      <Button 
        size="icon" 
        className="h-10 w-10 rounded-full"
        onClick={onSendMessage}
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
};

export default MessageInput;
