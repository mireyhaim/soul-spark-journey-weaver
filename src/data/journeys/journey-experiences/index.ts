
import { JourneyExperienceContent, JourneyExperienceMap } from './types';
import { personalDevelopmentExperiences } from './personal-development-experiences';
import { abundanceExperiences } from './abundance-experiences';
import { careerExperiences } from './career-experiences';
import { relationshipsExperiences } from './relationships-experiences';
import { femininePowerExperiences } from './feminine-power-experiences';
import { businessDevelopmentExperiences } from './business-development-experiences';
import { getCategoryExperienceContent, getDefaultExperiences } from './default-category-experiences';

// Combined journey experiences
export const journeyExperiences: JourneyExperienceMap = {
  ...personalDevelopmentExperiences,
  ...abundanceExperiences,
  ...careerExperiences,
  ...relationshipsExperiences,
  ...femininePowerExperiences,
  ...businessDevelopmentExperiences
  // Add more category imports as needed
};

// Function to get experiences for a journey by ID or category
export const getJourneyExperiences = (journeyId: string, category: string | undefined, duration: number): JourneyExperienceContent => {
  // Return journey-specific experiences if available
  if (journeyExperiences[journeyId]) {
    return journeyExperiences[journeyId];
  }
  
  // Fall back to default category-based experiences
  return getDefaultExperiences(category, duration);
};

// Function to get journey experience content by ID or category
export const getJourneyExperienceContent = (journeyId: string, category?: string): JourneyExperienceContent => {
  // Return journey-specific experience content if available
  if (journeyExperiences[journeyId]) {
    return journeyExperiences[journeyId];
  }
  
  // Fall back to category-based experience content
  return getCategoryExperienceContent(category);
};

// Export all helper functions and types
export { getDefaultExperiences, getCategoryExperienceContent };
export type { JourneyExperienceContent, JourneyExperienceMap };
