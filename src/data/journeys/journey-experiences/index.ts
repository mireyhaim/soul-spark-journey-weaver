
// This file exports all journey experiences from the module
import { JourneyExperience } from './types';
import { getAbundanceExperiences } from './abundance-experiences';
import { getBusinessDevelopmentExperiences } from './business-development-experiences';
import { getCareerExperiences } from './career-experiences';
import { getPersonalDevelopmentExperiences } from './personal-development-experiences';
import { getRelationshipsExperiences } from './relationships-experiences';
import { getFemininePowerExperiences } from './feminine-power-experiences';
import { getDefaultCategoryExperiences } from './default-category-experiences';

// Main function to get journey experiences based on category
export const getJourneyExperiences = (category?: string): JourneyExperience[] => {
  // Map the category to the appropriate function
  switch (category?.toLowerCase()) {
    case 'abundance manifestation':
      return getAbundanceExperiences();
    case 'business development':
      return getBusinessDevelopmentExperiences();
    case 'career development':
      return getCareerExperiences();
    case 'personal development':
      return getPersonalDevelopmentExperiences();
    case 'relationships':
      return getRelationshipsExperiences();
    case 'feminine power':
      return getFemininePowerExperiences();
    default:
      return getDefaultCategoryExperiences();
  }
};

// Re-export types
export * from './types';
