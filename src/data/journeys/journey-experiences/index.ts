
import { JourneyExperienceContent } from './types';
import { personalDevelopmentExperiences } from './personal-development-experiences';
import { abundanceExperiences } from './abundance-experiences';
import { relationshipsExperiences } from './relationships-experiences';
import { careerExperiences } from './career-experiences';
import { getCategoryExperienceContent } from './default-category-experiences';

// Combine all journey experiences
export const journeySpecificExperiences = {
  ...personalDevelopmentExperiences,
  ...abundanceExperiences,
  ...relationshipsExperiences,
  ...careerExperiences,
  // Add more category imports as needed
};

// Helper function to get journey-specific experience content
export const getJourneyExperienceContent = (journeyId: string, category: string | undefined): JourneyExperienceContent => {
  // Return journey-specific content if available
  if (journeySpecificExperiences[journeyId]) {
    return journeySpecificExperiences[journeyId];
  }
  
  // Fall back to category-based content
  return getCategoryExperienceContent(category);
};

// Re-export types and functions
export type { JourneyExperienceContent };
export { getCategoryExperienceContent };
