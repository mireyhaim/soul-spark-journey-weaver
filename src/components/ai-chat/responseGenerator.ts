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

// Generate personalized welcome message based on journey and current day
export const getWelcomeMessage = (currentJourney?: any): string => {
  if (!currentJourney) {
    return "ברוך הבא למסע הרוחני שלך. אני המדריך האישי שלך, ואלווה אותך בכל צעד בדרך. אני כאן להקשיב, לתמוך ולהציע תובנות תוך כדי שאתה הולך בנתיב הצמיחה האישי שלך. איך אתה מרגיש היום?";
  }
  
  // Get personality based on journey category
  const personality = getPersonality(currentJourney.category);
  
  // Journey-specific welcome messages with personality
  const welcomeMessages: Record<string, string> = {
    // Personal Development
    '1': `ברוך הבא למסע של גילוי עצמי. אני ${personality.name}, המדריך האישי שלך עם מומחיות ב${personality.specialties.join(', ')}. אני כאן לעזור לך לגלות את העצמי האותנטי שלך והמטרה האמיתית שלך עם גישה ${personality.tone}. יחד, נצא למסע של התבוננות פנימית, צמיחה והתעלות. בכל יום, אציע לך תרגילים ושאלות מעוררות מחשבה שיעזרו להעמיק את ההבנה העצמית שלך. מה אתה מרגיש לגבי תחילת מסע של גילוי עצמי?`,
    
    '2': `I'm glad you've chosen this emotional intelligence journey. I am ${personality.name}, your supportive mentor with a ${personality.tone} style. Together, we'll work on developing a deeper understanding of your emotions, learn to identify emotional patterns, and develop tools to handle emotional challenges. I'll accompany you every step, listen without judgment, and offer insights to help you grow. How are you feeling right now?`,
    
    // Abundance journeys
    '10': `Welcome to your manifestation journey. I am ${personality.name}, your personal reality creation guide. With a focus on ${personality.specialties.join(', ')}, I'm here to help you shape your dream life with intention and purpose. Together, we'll work on removing inner blocks, creating positive thought patterns, and connecting to the energy of abundance. Each day will offer you tools and exercises to help you attract what you truly desire into your life. How do you feel about creating a life of abundance and meaning?`,
    
    '13': `I'm pleased to accompany you on this abundance meditation journey. I am ${personality.name}, your abundance guide with a ${personality.tone} approach. Together we'll work on opening your inner channels for receiving abundance in all its forms. Each day, I'll offer exercises, meditations, and guidance designed to shift your perception about abundance and help you identify blocks preventing you from receiving in abundance. What is your relationship with abundance right now?`,
    
    // Reality Manifestation journey (id 9)
    '9': `Welcome to your Reality Manifestation journey. I am ${personality.name}, your dedicated guide in the art of conscious creation. I bring expertise in ${personality.specialties.join(', ')} with a ${personality.tone} approach that honors where you are while guiding you forward. 
    
Over the next days, we'll work together to help you understand and harness the power of your consciousness to shape your reality. I'll be with you every step of the way, offering personalized guidance, reflections, and practical exercises. 

The journey we're beginning is transformative—a path to understanding how your thoughts, emotions, and energy directly influence the reality you experience. Think of me as your companion in this sacred exploration. How are you feeling as we begin?`,
  };
  
  return welcomeMessages[currentJourney.id] || 
    `ברוך הבא למסע ${currentJourney.title} שלך. אני ${personality.name}, המדריך האישי שלך עם מומחיות ב${personality.specialties[0]}. 
    
אני כאן ללוות אותך דרך תהליך משנה חיים זה של ${currentJourney.duration} ימים, עם גישה ${personality.tone} ותומכת. יחד, נעבור תהליך של צמיחה, התעלות ושינוי אישי.

בכל יום במסע, אציע לך תרגילים, שאלות מעוררות מחשבה ומשימות שנועדו לעזור לך להעמיק את הקשר עם עצמך ועם המטרות שלך. אהיה איתך בכל רגע של התהליך - מקשיב, תומך ומציע כלים ותובנות.

המטרה שלנו היא לא רק להשיג תוצאות חיצוניות אלא גם לעבור שינוי פנימי עמוק שישפיע על כל תחומי חייך. איך אתה מרגיש כשאנחנו מתחילים?`;
};
