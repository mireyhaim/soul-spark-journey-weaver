
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
  let topics: LessonTopic[] = [];
  
  switch (category?.toLowerCase()) {
    case 'abundance manifestation':
      topics = abundanceManifestationLessonTopics[journeyId] || [];
      break;
    case 'business development':
      topics = businessDevelopmentLessonTopics[journeyId] || [];
      break;
    case 'career development':
      topics = careerDevelopmentLessonTopics[journeyId] || [];
      break;
    case 'consciousness':
      topics = consciousnessLessonTopics[journeyId] || [];
      break;
    case 'emotional healing':
      topics = emotionalHealingLessonTopics[journeyId] || [];
      break;
    case 'energy healing':
      topics = energyHealingLessonTopics[journeyId] || [];
      break;
    case 'feminine power':
      topics = femininePowerLessonTopics[journeyId] || [];
      break;
    case 'personal development':
      topics = personalDevelopmentLessonTopics[journeyId] || [];
      break;
    case 'productivity':
      topics = productivityLessonTopics[journeyId] || [];
      break;
    case 'reality manifestation':
      topics = realityManifestationLessonTopics[journeyId] || [];
      break;
    case 'relationships':
      topics = relationshipsLessonTopics[journeyId] || [];
      break;
    case 'spirituality':
      topics = spiritualityLessonTopics[journeyId] || [];
      break;
    default:
      topics = defaultCategoryLessonTopics[journeyId] || [];
      break;
  }
  
  // If no specific lesson topics are found, generate generic ones based on duration
  if (topics.length === 0) {
    return generateGenericLessons(duration);
  }
  
  return topics;
};

// Helper function to generate generic lesson topics based on duration
const generateGenericLessons = (duration: number): LessonTopic[] => {
  const genericTitles = [
    'Introduction & Foundations',
    'Core Principles & Practices',
    'Deepening Understanding',
    'Overcoming Challenges',
    'Building Momentum',
    'Integration & Application',
    'Advanced Techniques',
    'Mastery & Reflection',
    'Personal Adaptation',
    'Future Growth Planning',
    'Expanding Awareness',
    'Practical Implementation',
    'Skill Development',
    'Transformation Practices',
    'Long-term Sustainability',
    'Advanced Concepts',
    'Specialized Techniques',
    'Personal Mastery',
    'Integration into Daily Life',
    'Celebration & Next Steps',
    'Comprehensive Review'
  ];
  
  const genericDescriptions = [
    'Establish a strong foundation of knowledge and set your intentions for the journey ahead.',
    'Learn the essential practices and principles that will guide your transformation.',
    'Expand your understanding and deepen your connection to the core concepts.',
    'Identify and work through common obstacles that may arise on your path.',
    'Build consistent habits and routines that support your ongoing growth.',
    'Apply what you\'ve learned to real-life situations and personal challenges.',
    'Explore more nuanced techniques to enhance your practice and results.',
    'Refine your approach and reflect on your progress and insights.',
    'Customize the practices to align with your unique needs and goals.',
    'Create a sustainable plan for continued growth beyond this journey.',
    'Cultivate a broader perspective and deeper awareness of subtle aspects.',
    'Learn how to implement key concepts in your everyday experiences.',
    'Develop specific skills that enhance your capability and confidence.',
    'Engage in powerful exercises designed to catalyze personal transformation.',
    'Establish systems and practices that ensure ongoing benefits and growth.',
    'Explore sophisticated concepts that deepen your mastery of the subject.',
    'Learn targeted techniques for specific aspects of your development.',
    'Integrate all elements of your learning into a cohesive personal practice.',
    'Seamlessly incorporate your new skills and awareness into daily routines.',
    'Acknowledge your progress and prepare for your next level of growth.',
    'Synthesize all you\'ve learned and clarify your path forward.'
  ];
  
  return Array.from({ length: duration }, (_, i) => ({
    day: i + 1,
    title: genericTitles[i % genericTitles.length],
    description: genericDescriptions[i % genericDescriptions.length]
  }));
};

// Re-export types
export * from './types';
