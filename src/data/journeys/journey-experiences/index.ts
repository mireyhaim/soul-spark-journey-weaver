
// This file exports all journey experiences from the module
import { JourneyExperienceMap, JourneyExperienceContent } from './types';
import { abundanceExperiences } from './abundance-experiences';
import { businessDevelopmentExperiences } from './business-development-experiences';
import { careerExperiences } from './career-experiences';
import { personalDevelopmentExperiences } from './personal-development-experiences';
import { relationshipsExperiences } from './relationships-experiences';
import { femininePowerExperiences } from './feminine-power-experiences';
import { getDefaultExperiences } from './default-category-experiences';

// Function to get journey experience content based on journey ID and category
export const getJourneyExperienceContent = (journeyId: string, category?: string): JourneyExperienceContent => {
  // Map the category to the appropriate experiences map
  let experiencesMap: JourneyExperienceMap;
  
  switch (category?.toLowerCase()) {
    case 'abundance manifestation':
      experiencesMap = abundanceExperiences;
      break;
    case 'business development':
      experiencesMap = businessDevelopmentExperiences;
      break;
    case 'career development':
      experiencesMap = careerExperiences;
      break;
    case 'personal development':
      experiencesMap = personalDevelopmentExperiences;
      break;
    case 'relationships':
      experiencesMap = relationshipsExperiences;
      break;
    case 'feminine power':
      experiencesMap = femininePowerExperiences;
      break;
    default:
      return getDefaultExperiences(category, 7); // Default duration of 7 days
  }
  
  // Return the experience content for the specific journey ID, or a default one if not found
  return experiencesMap[journeyId] || getDefaultExperiences(category, 7);
};

// Re-export types
export * from './types';
