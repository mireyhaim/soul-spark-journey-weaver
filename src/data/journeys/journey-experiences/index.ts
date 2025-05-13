
import { JourneyExperience } from './types';
import { personalDevelopmentExperiences } from './personal-development-experiences';
import { abundanceExperiences } from './abundance-experiences';
import { careerExperiences } from './career-experiences';
import { relationshipsExperiences } from './relationships-experiences';
import { femininePowerExperiences } from './feminine-power-experiences';
import { getDefaultExperiences } from './default-category-experiences';

// Combined journey experiences
export const journeyExperiences = {
  ...personalDevelopmentExperiences,
  ...abundanceExperiences,
  ...careerExperiences,
  ...relationshipsExperiences,
  ...femininePowerExperiences,
  // Add more category imports as needed
};

// Function to get experiences for a journey by ID or category
export const getJourneyExperiences = (journeyId: string, category: string | undefined, duration: number): JourneyExperience[] => {
  // Return journey-specific experiences if available
  if (journeyExperiences[journeyId] && journeyExperiences[journeyId].length > 0) {
    return journeyExperiences[journeyId];
  }
  
  // Fall back to default category-based experiences
  return getDefaultExperiences(category, duration);
};

// Export all helper functions and types
export { getDefaultExperiences };
export type { JourneyExperience };
