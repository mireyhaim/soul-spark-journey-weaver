
import { LessonTopic } from './types';

// Map of journey IDs to their lesson topics
export const journeyLessonTopics: Record<string, LessonTopic[]> = {
  // Spirituality journeys
  '4': [
    { day: 1, title: 'Quieting the Mind' },
    { day: 2, title: 'Accessing Inner Guidance' },
    { day: 3, title: 'Developing Intuition' },
    { day: 4, title: 'Higher Self Connection' },
    { day: 5, title: 'Living from Spiritual Guidance' },
    { day: 6, title: 'Integrating Spiritual Insights' },
    { day: 7, title: 'Daily Connection Practice' },
    { day: 8, title: 'Recognizing Spiritual Signs' },
    { day: 9, title: 'Strengthening Your Inner Voice' },
    { day: 10, title: 'Applying Guidance in Decisions' },
    { day: 11, title: 'Trusting Your Higher Wisdom' },
    { day: 12, title: 'Overcoming Doubt and Fear' },
    { day: 13, title: 'Living in Alignment' },
    { day: 14, title: 'Sustaining the Connection' }
  ],
  '5': [
    { day: 1, title: 'Root Chakra Balancing' },
    { day: 2, title: 'Sacral Chakra Activation' },
    { day: 3, title: 'Solar Plexus Empowerment' },
    { day: 4, title: 'Heart Chakra Opening' },
    { day: 5, title: 'Throat Chakra Expression' },
    { day: 6, title: 'Third Eye Awakening' },
    { day: 7, title: 'Crown Chakra Connection' }
  ],
  '6': [
    { day: 1, title: 'Foundation of Meditation' },
    { day: 2, title: 'Breath Awareness Practice' },
    { day: 3, title: 'Body Scanning Technique' },
    { day: 4, title: 'Heart-Centered Meditation' },
    { day: 5, title: 'Mantra Meditation Method' },
    { day: 6, title: 'Visualization Practice' },
    { day: 7, title: 'Sound and Vibration Work' },
    { day: 8, title: 'Walking Meditation' },
    { day: 9, title: 'Mindful Eating Practice' },
    { day: 10, title: 'Nature Connection Meditation' },
    { day: 11, title: 'Loving-kindness Practice' },
    { day: 12, title: 'Forgiveness Meditation' },
    { day: 13, title: 'Gratitude Meditation' },
    { day: 14, title: 'Self-Compassion Practice' },
    { day: 15, title: 'Energy Awareness Meditation' },
    { day: 16, title: 'Transcending the Ego' },
    { day: 17, title: 'Emptiness Meditation' },
    { day: 18, title: 'Witness Consciousness' },
    { day: 19, title: 'Non-Duality Practice' },
    { day: 20, title: 'Integration into Daily Life' },
    { day: 21, title: 'Creating Your Personal Practice' }
  ],
  // Personal Development journeys
  '1': [
    { day: 1, title: 'Understanding Your Core Values' },
    { day: 2, title: 'Identifying Your Strengths' },
    { day: 3, title: 'Confronting Limiting Beliefs' },
    { day: 4, title: 'Creating Your Personal Mission Statement' },
    { day: 5, title: 'Setting Aligned Goals' },
    { day: 6, title: 'Building Daily Self-Discovery Practices' },
    { day: 7, title: 'Tracking Your Growth Journey' },
    { day: 8, title: 'Embracing Your Authentic Self' },
    { day: 9, title: 'Finding Your Passion Points' },
    { day: 10, title: 'Developing Self-Compassion' },
    { day: 11, title: 'Creating Life Balance' },
    { day: 12, title: 'Building Meaningful Relationships' },
    { day: 13, title: 'Crafting Your Life Vision' },
    { day: 14, title: 'Your Ongoing Self-Discovery Path' }
  ],
  // Abundance Manifestation journeys
  '13': [
    { day: 1, title: 'Releasing Scarcity Mindset' },
    { day: 2, title: 'Gratitude Practice Development' },
    { day: 3, title: 'Abundance Visualization Techniques' },
    { day: 4, title: 'Energetic Money Blocks Clearing' },
    { day: 5, title: 'Receptivity Practice' },
    { day: 6, title: 'Creating Abundance Rituals' },
    { day: 7, title: 'Recognizing Abundance Signs' },
    { day: 8, title: 'Harmony with Giving and Receiving' },
    { day: 9, title: 'Transforming Money Beliefs' },
    { day: 10, title: 'Aligning with Your Worth' },
    { day: 11, title: 'Manifesting Specific Resources' },
    { day: 12, title: 'Expanding Your Capacity to Receive' },
    { day: 13, title: 'Creating Abundance Affirmations' },
    { day: 14, title: 'Living in the Abundance Mindset' }
  ],
  // Add more journey lesson topics as needed...
};

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

// Function to get lesson topics for a journey by ID or category
export const getJourneyLessonTopics = (journeyId: string, category: string | undefined, duration: number): LessonTopic[] => {
  // Return journey-specific lesson topics if available
  if (journeyLessonTopics[journeyId] && journeyLessonTopics[journeyId].length > 0) {
    return journeyLessonTopics[journeyId];
  }
  
  // Fall back to category-based lesson topics
  return getCategoryLessonTopics(category, duration);
};
