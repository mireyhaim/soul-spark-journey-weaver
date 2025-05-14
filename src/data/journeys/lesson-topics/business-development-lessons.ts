
import { JourneyLessonTopicsMap, LessonTopic } from './types';

// Inner CEO Activation
const innerCEOLessons: LessonTopic[] = [
  { day: 1, title: 'Leadership Identity & Vision' },
  { day: 2, title: 'Identifying Limiting Leadership Beliefs' },
  { day: 3, title: 'Developing Unshakable Self-Trust' },
  { day: 4, title: 'Decision-Making from Alignment' },
  { day: 5, title: 'Navigating Business Uncertainty' },
  { day: 6, title: 'Creating Empowered Boundaries' },
  { day: 7, title: 'Cultivating Strategic Mindset' },
  { day: 8, title: 'Leading Through Challenges' },
  { day: 9, title: 'Stepping Into CEO Energy' },
  { day: 10, title: 'Balanced Leadership Practices' },
  { day: 11, title: 'Authentic Communication as Leader' },
  { day: 12, title: 'Creating Leadership Systems' },
  { day: 13, title: 'Leading with Purpose & Vision' },
  { day: 14, title: 'Embodying Your CEO Identity' }
];

// Abundance & Business Flow
const abundanceBusinessLessons: LessonTopic[] = [
  { day: 1, title: 'Identifying Your Scarcity Patterns' },
  { day: 2, title: 'Releasing Money Blocks' },
  { day: 3, title: 'Energetic Business Alignment' },
  { day: 4, title: 'Wealth Consciousness Activation' },
  { day: 5, title: 'Receiving Mode Practices' },
  { day: 6, title: 'Upgrading Your Value System' },
  { day: 7, title: 'Pricing with Confidence' },
  { day: 8, title: 'Creating Abundance Rituals' },
  { day: 9, title: 'Business Flow State Practices' },
  { day: 10, title: 'Manifestation Through Action' },
  { day: 11, title: 'Expanding Your Capacity to Receive' },
  { day: 12, title: 'Aligning with Ideal Clients' },
  { day: 13, title: 'Success Mindset Integration' },
  { day: 14, title: 'Creating Opportunity Awareness' },
  { day: 15, title: 'Gratitude as Business Strategy' },
  { day: 16, title: 'Embodying Abundant Leadership' },
  { day: 17, title: 'Maintaining High Frequency' },
  { day: 18, title: 'Inspired Action Framework' },
  { day: 19, title: 'Liberating Financial Beliefs' },
  { day: 20, title: 'Magnetic Wealth Attraction' },
  { day: 21, title: 'Living Your Abundant Business Vision' }
];

// Confident Visibility Journey
const visibilityJourneyLessons: LessonTopic[] = [
  { day: 1, title: 'Understanding Visibility Fears' },
  { day: 2, title: 'Your Authentic Voice & Message' },
  { day: 3, title: 'Releasing Judgment & Criticism' },
  { day: 4, title: 'Embodying Your Brand Energy' },
  { day: 5, title: 'Content Creation from Alignment' },
  { day: 6, title: 'Showing Up with Confidence' },
  { day: 7, title: 'Speaking Your Truth Boldly' },
  { day: 8, title: 'Connecting Authentically Online' },
  { day: 9, title: 'Expanding Your Comfort Zone' },
  { day: 10, title: 'Magnetic Presence Mastery' }
];

// Map journey IDs to their lesson topics
export const businessDevelopmentLessonTopics: JourneyLessonTopicsMap = {
  '30': innerCEOLessons,
  '31': abundanceBusinessLessons,
  '32': visibilityJourneyLessons
};
