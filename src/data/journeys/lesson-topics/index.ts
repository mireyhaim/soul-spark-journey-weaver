
// This file exports all lesson topics from the module
import { LessonTopic } from './types';
import { getAbundanceManifestationLessons } from './abundance-manifestation-lessons';
import { getBusinessDevelopmentLessons } from './business-development-lessons';
import { getCareerDevelopmentLessons } from './career-development-lessons';
import { getConsciousnessLessons } from './consciousness-lessons';
import { getEmotionalHealingLessons } from './emotional-healing-lessons';
import { getEnergyHealingLessons } from './energy-healing-lessons';
import { getFemininePowerLessons } from './feminine-power-lessons';
import { getPersonalDevelopmentLessons } from './personal-development-lessons';
import { getProductivityLessons } from './productivity-lessons';
import { getRealityManifestationLessons } from './reality-manifestation-lessons';
import { getRelationshipsLessons } from './relationships-lessons';
import { getSpiritualityLessons } from './spirituality-lessons';
import { getDefaultCategoryLessons } from './default-category-lessons';

// Main function to get lesson topics based on journey ID and category
export const getJourneyLessonTopics = (journeyId: string, category?: string, duration = 7): LessonTopic[] => {
  // Map the category to the appropriate function
  switch (category?.toLowerCase()) {
    case 'abundance manifestation':
      return getAbundanceManifestationLessons(journeyId, duration);
    case 'business development':
      return getBusinessDevelopmentLessons(journeyId, duration);
    case 'career development':
      return getCareerDevelopmentLessons(journeyId, duration);
    case 'consciousness':
      return getConsciousnessLessons(journeyId, duration);
    case 'emotional healing':
      return getEmotionalHealingLessons(journeyId, duration);
    case 'energy healing':
      return getEnergyHealingLessons(journeyId, duration);
    case 'feminine power':
      return getFemininePowerLessons(journeyId, duration);
    case 'personal development':
      return getPersonalDevelopmentLessons(journeyId, duration);
    case 'productivity':
      return getProductivityLessons(journeyId, duration);
    case 'reality manifestation':
      return getRealityManifestationLessons(journeyId, duration);
    case 'relationships':
      return getRelationshipsLessons(journeyId, duration);
    case 'spirituality':
      return getSpiritualityLessons(journeyId, duration);
    default:
      return getDefaultCategoryLessons(journeyId, duration);
  }
};

// Re-export types
export * from './types';
