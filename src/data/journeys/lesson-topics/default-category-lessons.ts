
import { LessonTopic } from './types';

// Helper function to get category-based generic lesson topics when specific ones aren't available
export const getCategoryLessonTopics = (category: string | undefined, duration: number): LessonTopic[] => {
  if (!category || !duration) return [];
  
  switch (category) {
    case 'Personal Development':
      return [
        { day: 1, title: 'Understanding Your Authentic Self' },
        { day: 2, title: 'Identifying Core Values & Strengths' },
        { day: 3, title: 'Releasing Limiting Beliefs' },
        { day: Math.floor(duration/2), title: 'Creating Purpose-Driven Goals' },
        { day: Math.floor(duration/2) + 1, title: 'Building Confidence & Self-Esteem' },
        { day: duration, title: 'Daily Personal Growth Practices' }
      ];
    case 'Spirituality':
      return [
        { day: 1, title: 'Connecting to Higher Consciousness' },
        { day: 2, title: 'Developing Meditation Practice' },
        { day: 3, title: 'Opening Spiritual Channels' },
        { day: Math.floor(duration/2), title: 'Energy Center Balancing' },
        { day: Math.floor(duration/2) + 1, title: 'Intuitive Development' },
        { day: duration, title: 'Spiritual Integration Techniques' }
      ];
    case 'Consciousness':
      return [
        { day: 1, title: 'Awareness Expansion Practices' },
        { day: 2, title: 'Transcending Thought Limitations' },
        { day: 3, title: 'Consciousness States Exploration' },
        { day: Math.floor(duration/2), title: 'Present Moment Awareness' },
        { day: Math.floor(duration/2) + 1, title: 'Observing Without Judgment' },
        { day: duration, title: 'Integrating Expanded Awareness' }
      ];
    case 'Reality Manifestation':
      return [
        { day: 1, title: 'Understanding Manifestation Laws' },
        { day: 2, title: 'Clearing Manifestation Blocks' },
        { day: 3, title: 'Developing Clear Intentions' },
        { day: Math.floor(duration/2), title: 'Energetic Alignment Techniques' },
        { day: Math.floor(duration/2) + 1, title: 'Inspired Action Implementation' },
        { day: duration, title: 'Manifestation Integration Practices' }
      ];
    case 'Abundance Manifestation':
      return [
        { day: 1, title: 'Abundance Mindset Foundations' },
        { day: 2, title: 'Releasing Money Blocks' },
        { day: 3, title: 'Developing Prosperity Consciousness' },
        { day: Math.floor(duration/2), title: 'Abundance Visualization Techniques' },
        { day: Math.floor(duration/2) + 1, title: 'Gratitude & Receiving Practices' },
        { day: duration, title: 'Financial Energy Alignment' }
      ];
    case 'Relationships':
      return [
        { day: 1, title: 'Relationship Pattern Awareness' },
        { day: 2, title: 'Healing Attachment Wounds' },
        { day: 3, title: 'Communication Enhancement' },
        { day: Math.floor(duration/2), title: 'Boundary Setting Practice' },
        { day: Math.floor(duration/2) + 1, title: 'Deepening Authentic Connection' },
        { day: duration, title: 'Long-Term Relationship Maintenance' }
      ];
    case 'Career Development':
      return [
        { day: 1, title: 'Authentic Purpose Discovery' },
        { day: 2, title: 'Professional Strengths Assessment' },
        { day: 3, title: 'Aligned Career Planning' },
        { day: Math.floor(duration/2), title: 'Personal Brand Development' },
        { day: Math.floor(duration/2) + 1, title: 'Strategic Growth Planning' },
        { day: duration, title: 'Work-Life Integration' }
      ];
    case 'Emotional Healing':
      return [
        { day: 1, title: 'Emotional Awareness Building' },
        { day: 2, title: 'Processing Core Wounds' },
        { day: 3, title: 'Inner Child Healing Techniques' },
        { day: Math.floor(duration/2), title: 'Shadow Integration Work' },
        { day: Math.floor(duration/2) + 1, title: 'Emotional Release Practices' },
        { day: duration, title: 'Creating New Emotional Patterns' }
      ];
    case 'Feminine Power':
      return [
        { day: 1, title: 'Feminine Energy Connection' },
        { day: 2, title: 'Intuitive Wisdom Development' },
        { day: 3, title: 'Cyclical Awareness Practice' },
        { day: Math.floor(duration/2), title: 'Receptivity & Surrender Training' },
        { day: Math.floor(duration/2) + 1, title: 'Embodied Feminine Power' },
        { day: duration, title: 'Integrating Feminine & Masculine' }
      ];
    case 'Energy & Healing':
      return [
        { day: 1, title: 'Energy Body Awareness' },
        { day: 2, title: 'Personal Energy Clearing' },
        { day: 3, title: 'Energy Center Balancing' },
        { day: Math.floor(duration/2), title: 'Energy Protection Techniques' },
        { day: Math.floor(duration/2) + 1, title: 'Self-Healing Practices' },
        { day: duration, title: 'Energy Integration & Maintenance' }
      ];
    case 'Productivity':
      return [
        { day: 1, title: 'Focus & Concentration Building' },
        { day: 2, title: 'Effective Planning Systems' },
        { day: 3, title: 'Time & Energy Management' },
        { day: Math.floor(duration/2), title: 'Flow State Techniques' },
        { day: Math.floor(duration/2) + 1, title: 'Overcoming Procrastination' },
        { day: duration, title: 'Sustainable Productivity Habits' }
      ];
    default:
      return [
        { day: 1, title: 'Daily Reflection Practice' },
        { day: 2, title: 'Inner Awareness Building' },
        { day: 3, title: 'Practical Application Techniques' },
        { day: Math.floor(duration/2), title: 'Integration Exercises' },
        { day: Math.floor(duration/2) + 1, title: 'Transformation Implementation' },
        { day: duration, title: 'Long-Term Growth Strategies' }
      ];
  }
};
