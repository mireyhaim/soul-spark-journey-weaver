
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

// Generate supportive, empathetic responses based on user input and journey context
export const generateResponse = ({ userInput, journey }: AIResponseGeneratorProps): string => {
  // Get appropriate personality based on journey category
  const personality = getPersonality(journey?.category);
  
  // Check for inappropriate content first
  if (containsInappropriateContent(userInput)) {
    return personality.boundaries.refusalMessage || "I'm sorry, but I don't engage with questions or discussions about inappropriate topics like sex, drugs, or violence. I'm here to support your spiritual journey and personal growth. If you'd like to discuss something else related to your journey, I'd be happy to help.";
  }
  
  const userInputLower = userInput.toLowerCase();
  
  // Check for emotional keywords
  if (userInputLower.includes('anxious') || userInputLower.includes('afraid') || userInputLower.includes('scared')) {
    return `I hear that you're feeling some anxiety, and that's completely understandable. These journeys can bring up deep emotions. Remember to breathe deeply and know that I'm right here with you through this process. As ${personality.name}, I specialize in ${personality.specialties[0]} and can guide you through this. Would you like to try a quick grounding exercise together?`;
  }
  
  if (userInputLower.includes('stuck') || userInputLower.includes('blocked') || userInputLower.includes('can\'t do')) {
    return `I understand feeling stuck can be frustrating. Let's acknowledge that blockage with compassion rather than judgment. Sometimes our greatest insights come when we gently work through resistance. In my experience as ${personality.name}, focusing on ${personality.specialties[1]} can help here. What specifically feels most challenging right now?`;
  }
  
  if (userInputLower.includes('happy') || userInputLower.includes('excited') || userInputLower.includes('good')) {
    return `I'm so glad to hear you're feeling positive! That energy is beautiful and will help propel you forward in this journey. Let's build on that feeling. As someone who focuses on ${personality.specialties[0]}, I'd love to hear what aspect of today's practice resonated most deeply with you?`;
  }
  
  // Journey-specific responses
  if (journey) {
    if (journey.category === 'Abundance Manifestation') {
      return `I sense you're navigating your relationship with abundance. As ${personality.name}, I've guided many through this path. Remember that you are worthy of receiving fully, just as you are worthy of giving. Our practice is about expanding your capacity to welcome prosperity in all its forms. Would you like to explore what abundance truly means to you?`;
    }
    
    if (journey.category === 'Personal Development') {
      return `Your self-awareness is truly inspiring. This journey is about meeting yourself with curiosity and compassion, and I can already sense your commitment to growth. As ${personality.name}, I specialize in ${personality.specialties.join(', ')}. What parts of yourself are you most excited to discover or strengthen through this process?`;
    }
    
    if (journey.category === 'Reality Manifestation') {
      return `Your creative power is immense. As ${personality.name}, I've seen how ${personality.specialties[1]} can transform reality. As we continue this manifestation work, remember that clarity of intention combined with aligned emotion creates powerful results. I'm curious - when you visualize your desired reality, what details become most vivid to you?`;
    }
  }
  
  // Default supportive responses with personality
  const responses = [
    `Thank you for sharing that with me. Your openness creates space for real transformation. As ${personality.name}, I'm here to support your ${personality.specialties[0]} journey. What support would be most helpful for you right now in your practice?`,
    `I appreciate your reflection. There's such wisdom in what you're expressing. With my focus on ${personality.specialties[1]}, I can see how this insight connects to your growth. How might we deepen this understanding in today's practice?`,
    `I'm here with you every step of this journey. Your commitment to your growth is beautiful to witness. As ${personality.name}, I bring a ${personality.tone} approach to our work together. How are you honoring yourself through this process?`,
    `What you're experiencing is an important part of your path. Sometimes the most challenging moments lead to the most profound breakthroughs. With my background in ${personality.specialties[2] || personality.specialties[0]}, I'd like to explore how I can best support you right now.`,
    `I hear you completely. Your awareness is the fertile ground from which transformation grows. In my experience as ${personality.name}, this kind of reflection often leads to significant growth. What aspect of today's practice would you like to explore more deeply?`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Generate personalized welcome message based on journey
export const getWelcomeMessage = (currentJourney?: any): string => {
  if (!currentJourney) {
    return "Welcome to your spiritual journey. I'm your personal guide, here to support you every step of the way. How are you feeling today?";
  }
  
  // Get personality based on journey category
  const personality = getPersonality(currentJourney.category);
  
  // Journey-specific welcome messages with personality
  const welcomeMessages: Record<string, string> = {
    // Personal Development
    '1': `Welcome to your self-discovery journey. I'm ${personality.name}, your personal guide with expertise in ${personality.specialties.join(', ')}. I'm here to help you uncover your authentic self and true purpose with a ${personality.tone} approach. How are you feeling about beginning this journey of self-exploration?`,
    
    '2': `I'm so glad you've chosen this emotional intelligence path. I'm ${personality.name}, your supportive AI mentor with a ${personality.tone} style. I'll be with you as you develop a deeper understanding of your emotions. How are you feeling right now?`,
    
    // Abundance journeys
    '10': `Welcome to your manifestation journey. I'm ${personality.name}, your personal reality creation guide. With my focus on ${personality.specialties.join(', ')}, I'm here to help you shape your dream life with intention and purpose. How are you feeling about manifesting your desires?`,
    
    '13': `I'm delighted to join you on this abundance meditation journey. I'm ${personality.name}, your abundance guide with a ${personality.tone} approach. I'll support you in opening to receive prosperity in all forms. What's your relationship with abundance like right now?`,
  };
  
  return welcomeMessages[currentJourney.id] || 
    `Welcome to your ${currentJourney.title} journey. I'm ${personality.name}, your personal guide with expertise in ${personality.specialties[0]}. I'll be supporting you through each step of this ${currentJourney.duration}-day process with a ${personality.tone} approach. How are you feeling as we begin?`;
};
