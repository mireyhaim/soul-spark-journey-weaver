
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

// Generate intimate, personal responses based on user input with mentorship approach
export const generateResponse = ({ userInput, journey, userName }: AIResponseGeneratorProps): string => {
  // Get appropriate personality based on journey category
  const personality = getPersonality(journey?.category);
  
  // Check for inappropriate content first
  if (containsInappropriateContent(userInput)) {
    return personality.boundaries.refusalMessage || "This path calls for topics that nurture your spirit. What else is present for you today?";
  }
  
  const userInputLower = userInput.toLowerCase();
  const personalization = userName ? `${userName}, ` : '';
  
  // Check for emotional keywords - shorter, more personal responses with mentorship tone
  if (userInputLower.includes('anxious') || userInputLower.includes('afraid') || userInputLower.includes('scared')) {
    return `${personalization}the fear you're feeling is a natural part of your growth journey. Your body holds wisdom in this tension. What sensation comes with this anxiety right now?`;
  }
  
  if (userInputLower.includes('stuck') || userInputLower.includes('blocked') || userInputLower.includes('can\'t do')) {
    return `${personalization}resistance often guards our deepest transformations. This place of seeming stuckness holds a gift waiting to be revealed. What lies just beneath this feeling?`;
  }
  
  if (userInputLower.includes('happy') || userInputLower.includes('excited') || userInputLower.includes('good')) {
    return `${personalization}this joy is your birthright, flowing naturally when you align with your essence. Notice how it feels in your body right now, this remembering of who you truly are.`;
  }
  
  // Journey-specific responses - shorter, more personal with mentorship approach
  if (journey) {
    if (journey.category === 'Abundance Manifestation') {
      return `${personalization}abundance already flows within you, waiting to be recognized. Your relationship with receiving shapes everything about your experience. What would change if you truly knew you were worthy of fullness?`;
    }
    
    if (journey.category === 'Personal Development') {
      return `${personalization}every moment of awareness creates new possibility. There's profound wisdom in how you're showing up right now. What part of yourself is ready to be seen and honored?`;
    }
    
    if (journey.category === 'Reality Manifestation') {
      return `${personalization}your consciousness is creating in every moment. The images you hold shape the energy that flows through you. What vision resonates in your body and heart right now?`;
    }
    
    if (journey.category === 'Relationships') {
      return `${personalization}every relationship mirrors something within you, offering a path to deeper self-knowledge. Your heart knows what it needs to feel safe and connected. What truth is asking to be honored in your connections?`;
    }
  }
  
  // Default supportive responses with personality - shorter, more personal, mentorship tone
  const responses = [
    `${personalization}your words carry the seeds of your own transformation. Trust the wisdom that's already emerging from within you.`,
    `${personalization}what you're experiencing matters deeply. This path you're walking is uniquely yours, with every step revealing new truth.`,
    `${personalization}your awareness itself is a powerful force of healing. The questions you're asking are creating new possibilities with each moment.`,
    `${personalization}this journey unfolds at exactly the right pace for your soul's evolution. You're exactly where you need to be right now.`,
    `${personalization}your inner knowing already holds the answers you seek. The stillness between your thoughts reveals a wisdom beyond words.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Generate personalized welcome message based on journey, user name, and current day
export const getWelcomeMessage = (currentJourney?: any, userName?: string): string => {
  const personalization = userName ? `${userName}, welcome. ` : "Welcome. ";
  
  if (!currentJourney) {
    return `${personalization}I'm here to walk alongside you on this journey of growth and transformation. How are you feeling as we begin?`;
  }
  
  // Get personality based on journey category
  const personality = getPersonality(currentJourney.category);
  
  // Journey-specific welcome messages with personality in English - more personal and mentor-like
  const welcomeMessages: Record<string, string> = {
    // Personal Development
    '1': `${personalization}I'm honored to guide you on this journey of self-discovery. Together we'll explore your true nature and purpose. What's stirring within you as we begin?`,
    
    '2': `${personalization}I'm here with you as you develop a deeper relationship with your emotions. This path reveals the wisdom in all that you feel. What brings you to this healing journey?`,
    
    // Abundance journeys
    '10': `${personalization}I'm honored to guide you on this manifestation journey. Together we'll explore how your consciousness creates your reality. What are you longing to manifest in your life right now?`,
    
    '13': `${personalization}I'm here to walk beside you as you open to receiving abundance. Your relationship with receiving is about to transform beautifully. What does abundance mean to you in this moment?`,
    
    // Reality Manifestation journey (id 9)
    '9': `${personalization}I'm here to guide you on your Reality Manifestation journey. We'll explore how your consciousness shapes your experience of reality. What inner knowing drew you to this practice?`,
    
    // Relationships journey (id 16)
    '16': `${personalization}I'm here to support you on your Heal & Attract Love journey. This path will transform how you experience connection and intimacy. What patterns are you noticing in your relationships?`,
    
    // Relationships journey (id 17)
    '17': `${personalization}I'm honored to guide you through Conscious Relationships Mastery. Together we'll explore the art of authentic connection. What qualities do you most value in your relationships?`
  };
  
  return welcomeMessages[currentJourney.id] || 
    `${personalization}I'm here to guide you on your ${currentJourney.title} journey. I'll walk beside you through this ${currentJourney.duration}-day transformation. What brings your heart here today?`;
};
