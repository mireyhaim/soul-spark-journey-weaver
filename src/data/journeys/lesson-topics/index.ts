
// This file exports all lesson topics from the module
import { LessonTopic } from './types';
import { abundanceManifestationLessonTopics } from './abundance-manifestation-lessons';
import { businessDevelopmentLessonTopics } from './business-development-lessons';
import { careerDevelopmentLessonTopics } from './career-development-lessons';
import { consciousnessLessonTopics } from './consciousness-lessons';
import { emotionalHealingLessonTopics } from './emotional-healing-lessons';
import { energyHealingLessonTopics } from './energy-healing-lessons';
import { femininePowerLessonTopics } from './feminine-power-lessons';
import { personalDevelopmentLessonTopics } from './personal-development-lessons';
import { productivityLessonTopics } from './productivity-lessons';
import { realityManifestationLessonTopics } from './reality-manifestation-lessons';
import { relationshipsLessonTopics } from './relationships-lessons';
import { spiritualityLessonTopics } from './spirituality-lessons';
import { personalDevelopmentLessonTopics as defaultCategoryLessonTopics } from './default-category-lessons';

// Main function to get lesson topics based on journey ID and category
export const getJourneyLessonTopics = (journeyId: string, category?: string, duration = 7): LessonTopic[] => {
  // Map the category to the appropriate function
  switch (category?.toLowerCase()) {
    case 'abundance manifestation':
      return abundanceManifestationLessonTopics[journeyId] || [];
    case 'business development':
      return businessDevelopmentLessonTopics[journeyId] || [];
    case 'career development':
      return careerDevelopmentLessonTopics[journeyId] || [];
    case 'consciousness':
      return consciousnessLessonTopics[journeyId] || [];
    case 'emotional healing':
      return emotionalHealingLessonTopics[journeyId] || [];
    case 'energy healing':
      return energyHealingLessonTopics[journeyId] || [];
    case 'feminine power':
      return femininePowerLessonTopics[journeyId] || [];
    case 'personal development':
      return personalDevelopmentLessonTopics[journeyId] || [];
    case 'productivity':
      return productivityLessonTopics[journeyId] || [];
    case 'reality manifestation':
      return realityManifestationLessonTopics[journeyId] || [];
    case 'relationships':
      return relationshipsLessonTopics[journeyId] || [];
    case 'spirituality':
      return spiritualityLessonTopics[journeyId] || [];
    default:
      return defaultCategoryLessonTopics[journeyId] || [];
  }
};

// Re-export types
export * from './types';
