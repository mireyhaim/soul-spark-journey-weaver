
import { AIResponseGeneratorProps } from './types';
import { getPersonality } from './personalities';

// Check if the user input contains inappropriate content
const containsInappropriateContent = (input: string): boolean => {
  const lowercaseInput = input.toLowerCase();
  
  // List of inappropriate topics to filter
  const inappropriateTopics = [
    // Sex and gender inappropriate terms
    'sex', 'porn', 'nude', 'naked', 'nsfw',
    // Drug related terms
    'drugs', 'cocaine', 'heroin', 'meth', 'marijuana', 'weed',
    // Violence related terms
    'kill', 'murder', 'assault', 'weapon', 'gun', 'violent'
  ];
  
  return inappropriateTopics.some(topic => lowercaseInput.includes(topic));
};

// Generate intimate, personal responses based on user input
export const generateResponse = ({ userInput, journey }: AIResponseGeneratorProps): string => {
  // Get appropriate personality based on journey category
  const personality = getPersonality(journey?.category);
  
  // Check for inappropriate content first
  if (containsInappropriateContent(userInput)) {
    return personality.boundaries.refusalMessage || "This path calls for topics that nurture your spirit. What else is present for you today?";
  }
  
  const userInputLower = userInput.toLowerCase();
  
  // Check for emotional keywords - shorter, more personal responses
  if (userInputLower.includes('anxious') || userInputLower.includes('afraid') || userInputLower.includes('scared')) {
    return `The fear you're feeling is a natural part of growth. Your body holds wisdom in this tension. What sensation comes with this anxiety?`;
  }
  
  if (userInputLower.includes('stuck') || userInputLower.includes('blocked') || userInputLower.includes('can\'t do')) {
    return `Resistance often guards our deepest transformations. This place of stuckness holds a gift waiting to be revealed. What lies just beneath this feeling?`;
  }
  
  if (userInputLower.includes('happy') || userInputLower.includes('excited') || userInputLower.includes('good')) {
    return `This joy is your birthright, flowing naturally when you align with your essence. Notice how it feels in your body, this remembering of who you truly are.`;
  }
  
  // Journey-specific responses - shorter, more personal
  if (journey) {
    if (journey.category === 'Abundance Manifestation') {
      return `Abundance already flows within you, waiting to be recognized. Your relationship with receiving shapes everything about your experience. What would change if you knew you were worthy of fullness?`;
    }
    
    if (journey.category === 'Personal Development') {
      return `Every moment of awareness creates new possibility. There's profound wisdom in how you're showing up right now. What part of yourself is ready to be seen?`;
    }
    
    if (journey.category === 'Reality Manifestation') {
      return `Your consciousness is creating in every moment. The images you hold shape the energy that flows through you. What vision resonates in your body right now?`;
    }
    
    if (journey.category === 'Relationships') {
      return `Every relationship mirrors something within you, offering a path to deeper self-knowledge. Your heart knows what it needs to feel safe and connected. What truth is asking to be honored?`;
    }
  }
  
  // Default supportive responses with personality - shorter, more personal, avoiding coaching tone
  const responses = [
    `Your words carry the seeds of your own transformation. Trust the wisdom that's already emerging from within you.`,
    `What you're experiencing matters deeply. This path you're walking is uniquely yours, with every step revealing new truth.`,
    `Your awareness itself is a powerful force of healing. The questions you're asking are creating new possibilities with each moment.`,
    `This journey unfolds at exactly the right pace for your soul's evolution. You're exactly where you need to be right now.`,
    `Your inner knowing already holds the answers you seek. The stillness between your thoughts reveals a wisdom beyond words.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Generate personalized welcome message based on journey and current day
export const getWelcomeMessage = (currentJourney?: any): string => {
  if (!currentJourney) {
    return "Welcome. I'm here to accompany you on this journey of growth and transformation. How are you feeling as we begin?";
  }
  
  // Get personality based on journey category
  const personality = getPersonality(currentJourney.category);
  
  // Journey-specific welcome messages with personality in English - shorter, more conversational
  const welcomeMessages: Record<string, string> = {
    // Personal Development
    '1': `Welcome to your journey of self-discovery. I'm here to accompany you as you explore your true nature and purpose. What's present for you as we begin?`,
    
    '2': `I'm here with you as you develop a deeper relationship with your emotions. This path reveals the wisdom in all you feel. What brings you to this journey?`,
    
    // Abundance journeys
    '10': `Welcome to your manifestation journey. Together we'll explore how your consciousness creates your reality. What would you like to manifest in your life?`,
    
    '13': `I'm here to accompany you as you open to receiving abundance. Your relationship with receiving is about to transform. What does abundance mean to you right now?`,
    
    // Reality Manifestation journey (id 9)
    '9': `Welcome to your Reality Manifestation journey. We'll explore how your consciousness shapes your experience of reality. What draws you to this practice?`,
    
    // Relationships journey (id 16)
    '16': `Welcome to your Heal & Attract Love journey. This path will transform how you experience connection and intimacy. What patterns are you noticing in your relationships?`,
    
    // Relationships journey (id 17)
    '17': `Welcome to Conscious Relationships Mastery. Together we'll explore the art of authentic connection. What qualities do you value most in relationship?`
  };
  
  return welcomeMessages[currentJourney.id] || 
    `Welcome to your ${currentJourney.title} journey. I'm here to walk beside you through this ${currentJourney.duration}-day transformation. What brings you here today?`;
};
