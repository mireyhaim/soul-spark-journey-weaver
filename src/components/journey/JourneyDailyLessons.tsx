
import React from 'react';
import { BookOpen } from 'lucide-react';

interface JourneyDailyLessonsProps {
  journeyId: string;
  category?: string;
}

// Helper function to get journey-specific lesson content
const getJourneyLessons = (journeyId: string, category: string | undefined): string[] => {
  // Journey specific content mapping by ID
  const journeyLessons: Record<string, string[]> = {
    // Personal Development journeys
    '1': [
      'Understanding Your Core Values',
      'Identifying Your Strengths',
      'Confronting Limiting Beliefs',
      'Creating Your Personal Mission Statement',
      'Setting Aligned Goals',
      'Building Daily Self-Discovery Practices'
    ],
    '2': [
      'Emotion Awareness & Recognition',
      'Understanding Emotional Triggers',
      'Building Self-Regulation Skills',
      'Developing Empathy',
      'Active Listening Techniques',
      'Conflict Resolution Skills'
    ],
    '3': [
      'Overcoming Procrastination',
      'Building Focus & Concentration',
      'Creating Effective Routines',
      'Time Management Mastery',
      'Energy Management Techniques',
      'Sustaining Long-Term Productivity'
    ],
    // Spirituality journeys
    '4': [
      'Quieting the Mind',
      'Accessing Inner Guidance',
      'Developing Intuition',
      'Higher Self Connection',
      'Living from Spiritual Guidance',
      'Integrating Spiritual Insights'
    ],
    // Abundance journeys
    '13': [
      'Releasing Scarcity Mindset',
      'Gratitude Practice Development',
      'Abundance Visualization Techniques',
      'Energetic Money Blocks Clearing',
      'Receptivity Practice',
      'Creating Abundance Rituals'
    ],
    '14': [
      'Money Story Awareness',
      'Healing Financial Wounds',
      'Prosperity Consciousness Building',
      'Strategic Abundance Planning',
      'Wealth Action Implementation',
      'Maintaining Abundance Mindset'
    ],
    // Add more journey-specific lessons as needed
  };
  
  // Return journey-specific lessons if available, otherwise use category-based lessons
  if (journeyLessons[journeyId] && journeyLessons[journeyId].length > 0) {
    return journeyLessons[journeyId];
  }
  
  // Fall back to category-based lessons
  switch (category) {
    case 'Personal Development':
      return [
        'Understanding Your Authentic Self',
        'Identifying Core Values & Strengths',
        'Releasing Limiting Beliefs',
        'Creating Purpose-Driven Goals',
        'Building Confidence & Self-Esteem',
        'Daily Personal Growth Practices'
      ];
    case 'Spirituality':
      return [
        'Connecting to Higher Consciousness',
        'Developing Meditation Practice',
        'Opening Spiritual Channels',
        'Energy Center Balancing',
        'Intuitive Development',
        'Spiritual Integration Techniques'
      ];
    case 'Consciousness':
      return [
        'Awareness Expansion Practices',
        'Transcending Thought Limitations',
        'Consciousness States Exploration',
        'Present Moment Awareness',
        'Observing Without Judgment',
        'Integrating Expanded Awareness'
      ];
    case 'Reality Manifestation':
      return [
        'Understanding Manifestation Laws',
        'Clearing Manifestation Blocks',
        'Developing Clear Intentions',
        'Energetic Alignment Techniques',
        'Inspired Action Implementation',
        'Manifestation Integration Practices'
      ];
    case 'Abundance Manifestation':
      return [
        'Abundance Mindset Foundations',
        'Releasing Money Blocks',
        'Developing Prosperity Consciousness',
        'Abundance Visualization Techniques',
        'Gratitude & Receiving Practices',
        'Financial Energy Alignment'
      ];
    case 'Relationships':
      return [
        'Relationship Pattern Awareness',
        'Healing Attachment Wounds',
        'Communication Enhancement',
        'Boundary Setting Practice',
        'Deepening Authentic Connection',
        'Long-Term Relationship Maintenance'
      ];
    case 'Career Development':
      return [
        'Authentic Purpose Discovery',
        'Professional Strengths Assessment',
        'Aligned Career Planning',
        'Personal Brand Development',
        'Strategic Growth Planning',
        'Work-Life Integration'
      ];
    case 'Emotional Healing':
      return [
        'Emotional Awareness Building',
        'Processing Core Wounds',
        'Inner Child Healing Techniques',
        'Shadow Integration Work',
        'Emotional Release Practices',
        'Creating New Emotional Patterns'
      ];
    case 'Feminine Power':
      return [
        'Feminine Energy Connection',
        'Intuitive Wisdom Development',
        'Cyclical Awareness Practice',
        'Receptivity & Surrender Training',
        'Embodied Feminine Power',
        'Integrating Feminine & Masculine'
      ];
    case 'Energy & Healing':
      return [
        'Energy Body Awareness',
        'Personal Energy Clearing',
        'Energy Center Balancing',
        'Energy Protection Techniques',
        'Self-Healing Practices',
        'Energy Integration & Maintenance'
      ];
    case 'Productivity':
      return [
        'Focus & Concentration Building',
        'Effective Planning Systems',
        'Time & Energy Management',
        'Flow State Techniques',
        'Overcoming Procrastination',
        'Sustainable Productivity Habits'
      ];
    default:
      return [
        'Daily Reflection Practice',
        'Inner Awareness Building',
        'Practical Application Techniques',
        'Integration Exercises',
        'Transformation Implementation',
        'Long-Term Growth Strategies'
      ];
  }
};

const JourneyDailyLessons: React.FC<JourneyDailyLessonsProps> = ({ 
  journeyId, 
  category 
}) => {
  const lessons = getJourneyLessons(journeyId, category);
  
  // Show a maximum of 5 lessons in the preview
  const previewLessons = lessons.slice(0, 5);
  
  return (
    <div className="bg-earth-50 p-4 rounded-md mb-6">
      <h3 className="font-medium text-earth-800 flex items-center gap-2 mb-3">
        <BookOpen size={18} />
        <span>Daily Lessons Preview:</span>
      </h3>
      <ul className="text-earth-700 space-y-2 ml-2">
        {previewLessons.map((lesson, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-earth-900 font-bold">Day {index + 1}:</span>
            <span>{lesson}</span>
          </li>
        ))}
        {lessons.length > 5 && (
          <li className="text-earth-500 italic text-sm mt-2">
            ...and more lessons throughout the journey
          </li>
        )}
      </ul>
    </div>
  );
};

export default JourneyDailyLessons;
