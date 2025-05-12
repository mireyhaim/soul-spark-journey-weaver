
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

export interface JourneyExplanation {
  before: string;
  after: string;
}

export interface AIPersonality {
  name: string;
  tone: string;
  specialties: string[];
  boundaries: {
    refusesTopics: string[];
    refusalMessage: string;
  };
}
