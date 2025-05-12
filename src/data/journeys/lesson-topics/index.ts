
import { LessonTopic } from './types';
import { spiritualityLessonTopics } from './spirituality-lessons';
import { personalDevelopmentLessonTopics } from './personal-development-lessons';
import { abundanceManifestationLessonTopics } from './abundance-manifestation-lessons';
import { getCategoryLessonTopics } from './default-category-lessons';

// Combine all journey lesson topics
export const journeyLessonTopics = {
  ...spiritualityLessonTopics,
  ...personalDevelopmentLessonTopics,
  ...abundanceManifestationLessonTopics,
  // Add more category imports as needed
};

// Function to get lesson topics for a journey by ID or category
export const getJourneyLessonTopics = (journeyId: string, category: string | undefined, duration: number): LessonTopic[] => {
  // Return journey-specific lesson topics if available
  if (journeyLessonTopics[journeyId] && journeyLessonTopics[journeyId].length > 0) {
    return journeyLessonTopics[journeyId];
  }
  
  // Fall back to category-based lesson topics
  return getCategoryLessonTopics(category, duration);
};

// Export all helper functions
export { getCategoryLessonTopics };
export type { LessonTopic };
