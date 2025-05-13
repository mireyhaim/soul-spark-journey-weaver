
import { JourneyExperienceContent } from './types';

// Get default experiences content by category
export const getCategoryExperienceContent = (category: string | undefined): JourneyExperienceContent => {
  // Default content for categories that don't have specific experience content
  switch (category) {
    case 'Abundance Manifestation':
      return {
        title: 'Your Abundance Journey Will Include',
        experiences: [
          'Daily abundance affirmations and gratitude practices',
          'Specific manifestation techniques for financial prosperity',
          'Clearing of limiting beliefs around money and wealth',
          'Energy alignment for receiving abundance in all areas'
        ]
      };
      
    case 'Spirituality':
      return {
        title: 'Your Spiritual Journey Will Include',
        experiences: [
          'Daily meditation and mindfulness practices',
          'Connection with your higher self and spiritual guides',
          'Exploration of your soul's purpose and divine gifts',
          'Techniques to raise your vibration and spiritual awareness'
        ]
      };
      
    case 'Personal Development':
      return {
        title: 'Your Personal Development Journey Will Include',
        experiences: [
          'Daily self-reflection and growth exercises',
          'Practices to build self-awareness and emotional intelligence',
          'Techniques to overcome limiting beliefs and patterns',
          'Tools for setting and achieving meaningful goals'
        ]
      };
      
    default:
      return {
        title: 'Your Journey Will Include',
        experiences: [
          'Daily practices to deepen your awareness and growth',
          'Guided reflections to help you process and integrate insights',
          'Practical tools to apply your learning to everyday life',
          'Supportive guidance throughout your transformation'
        ]
      };
  }
};

// Get default experiences based on category and duration
export const getDefaultExperiences = (category: string | undefined, duration: number): JourneyExperienceContent => {
  return getCategoryExperienceContent(category);
};
