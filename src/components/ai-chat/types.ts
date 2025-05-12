
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface AIResponseGeneratorProps {
  userInput: string;
  journey?: any;
}
