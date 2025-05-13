import { LessonTopic } from './types';

// Helper function to get category-based generic lesson topics when specific ones aren't available
export const getCategoryLessonTopics = (category: string | undefined, duration: number): LessonTopic[] => {
  if (!category || !duration) return [];
  
  // Generate topics for all days based on category
  const generateFullTopicsList = (baseTopics: string[], duration: number): LessonTopic[] => {
    const result: LessonTopic[] = [];
    
    // If we have enough topics for all days, use them directly
    if (baseTopics.length >= duration) {
      for (let i = 0; i < duration; i++) {
        result.push({
          day: i + 1,
          title: baseTopics[i]
        });
      }
    } else {
      // Otherwise, use what we have and repeat/adapt for remaining days
      const topicsCount = baseTopics.length;
      
      for (let i = 0; i < duration; i++) {
        const topicIndex = i % topicsCount;
        const dayNumber = i + 1;
        let title = baseTopics[topicIndex];
        
        // Add "Advanced" or "Mastery" prefix for repeated topics
        if (i >= topicsCount) {
          const repetition = Math.floor(i / topicsCount);
          if (repetition === 1) {
            title = `Advanced ${title}`;
          } else if (repetition >= 2) {
            title = `Mastery: ${title}`;
          }
        }
        
        result.push({
          day: dayNumber,
          title: title
        });
      }
    }
    
    return result;
  };
  
  // Define base topics for each category
  switch (category) {
    case 'Personal Development': {
      const baseTopics = [
        'Understanding Your Authentic Self',
        'Identifying Core Values & Strengths',
        'Releasing Limiting Beliefs',
        'Creating Purpose-Driven Goals',
        'Building Confidence & Self-Esteem',
        'Developing Growth Mindset',
        'Emotional Intelligence Training',
        'Time Management Mastery',
        'Effective Communication Skills',
        'Mindfulness for Daily Life',
        'Setting Healthy Boundaries',
        'Stress Management Techniques',
        'Building Resilience',
        'Creating Lasting Change',
        'Daily Personal Growth Practices'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    case 'Spirituality': {
      const baseTopics = [
        'Connecting to Higher Consciousness',
        'Developing Meditation Practice',
        'Opening Spiritual Channels',
        'Energy Center Balancing',
        'Intuitive Development',
        'Working with Spirit Guides',
        'Sacred Sound Healing',
        'Astral Projection Techniques',
        'Past Life Regression',
        'Dream Work and Analysis',
        'Soul Purpose Alignment',
        'Angelic Connection Methods',
        'Sacred Geometry Meditation',
        'Kundalini Awakening Safety',
        'Spiritual Integration Techniques'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    case 'Consciousness': {
      const baseTopics = [
        'Awareness Expansion Practices',
        'Transcending Thought Limitations',
        'Consciousness States Exploration',
        'Present Moment Awareness',
        'Observing Without Judgment',
        'Quantum Consciousness Exploration',
        'Higher Dimensional Perception',
        'Beyond Time and Space',
        'Unity Consciousness Experience',
        'Transcending Dualistic Thinking',
        'Consciousness Evolution Steps',
        'Accessing Collective Wisdom',
        'Embodying Higher Awareness',
        'Consciousness and Physical Reality',
        'Integrating Expanded Awareness'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    case 'Reality Manifestation': {
      const baseTopics = [
        'Understanding Manifestation Laws',
        'Clearing Manifestation Blocks',
        'Developing Clear Intentions',
        'Energetic Alignment Techniques',
        'Quantum Field Connection',
        'Vibrational Frequency Raising',
        'Emotional Manifestation Keys',
        'Belief System Reprogramming',
        'Manifesting Through Meditation',
        'Visualization Enhancement',
        'Action Steps Implementation',
        'Manifestation Acceleration',
        'Working With Universal Timing',
        'Maintaining Manifestation Energy',
        'Manifestation Integration Practices'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    case 'Abundance Manifestation': {
      const baseTopics = [
        'Abundance Mindset Foundations',
        'Releasing Money Blocks',
        'Developing Prosperity Consciousness',
        'Abundance Visualization Techniques',
        'Gratitude & Receiving Practices',
        'Wealth Energy Attraction',
        'Financial Freedom Vibration',
        'Money Relationship Healing',
        'Abundance Affirmations Creation',
        'Prosperity Rituals Development',
        'Career Abundance Alignment',
        'Business Success Energy',
        'Debt Release Visualization',
        'Passive Income Manifestation',
        'Financial Energy Alignment'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    case 'Relationships': {
      const baseTopics = [
        'Relationship Pattern Awareness',
        'Healing Attachment Wounds',
        'Communication Enhancement',
        'Boundary Setting Practice',
        'Deepening Authentic Connection',
        'Resolving Conflict Consciously',
        'Cultivating Emotional Intimacy',
        'Trust Building Techniques',
        'Forgiveness and Healing Process',
        'Partnership Vision Creation',
        'Family Relationship Healing',
        'Attracting Healthy Relationships',
        'Self-Love for Better Connections',
        'Relationship Energy Clearing',
        'Long-Term Relationship Maintenance'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    case 'Career Development': {
      const baseTopics = [
        'Authentic Purpose Discovery',
        'Professional Strengths Assessment',
        'Aligned Career Planning',
        'Personal Brand Development',
        'Strategic Growth Planning',
        'Professional Network Building',
        'Leadership Skill Enhancement',
        'Career Confidence Building',
        'Decision Making Excellence',
        'Negotiation Skills Mastery',
        'Work-Life Balance Creation',
        'Productivity System Development',
        'Career Transition Navigation',
        'Entrepreneurial Mindset Building',
        'Work-Life Integration'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    case 'Emotional Healing': {
      const baseTopics = [
        'Emotional Awareness Building',
        'Processing Core Wounds',
        'Inner Child Healing Techniques',
        'Shadow Integration Work',
        'Emotional Release Practices',
        'Transforming Negative Patterns',
        'Trauma Resolution Methods',
        'Self-Compassion Development',
        'Forgiveness Process Work',
        'Emotional Regulation Skills',
        'Grief and Loss Processing',
        'Anxiety Release Techniques',
        'Depression Healing Methods',
        'Anger Management Mastery',
        'Creating New Emotional Patterns'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    case 'Feminine Power': {
      const baseTopics = [
        'Feminine Energy Connection',
        'Intuitive Wisdom Development',
        'Cyclical Awareness Practice',
        'Receptivity & Surrender Training',
        'Embodied Feminine Power',
        'Sacred Feminine Rituals',
        'Womb Wisdom Activation',
        'Divine Feminine Archetypes',
        'Feminine Leadership Embodiment',
        'Sensuality & Pleasure Practices',
        'Feminine Boundary Setting',
        'Inner Goddess Awakening',
        'Feminine Creative Expression',
        'Sacred Relationship Dynamics',
        'Integrating Feminine & Masculine'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    case 'Energy & Healing': {
      const baseTopics = [
        'Energy Body Awareness',
        'Personal Energy Clearing',
        'Energy Center Balancing',
        'Energy Protection Techniques',
        'Self-Healing Practices',
        'Energy Reading Development',
        'Hands-On Healing Methods',
        'Distance Healing Techniques',
        'Sound Healing Applications',
        'Crystal Healing Fundamentals',
        'Reiki Principles Practice',
        'Energy Diagnosis Skills',
        'Past Life Energy Clearing',
        'Soul Fragment Recovery',
        'Energy Integration & Maintenance'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    case 'Productivity': {
      const baseTopics = [
        'Focus & Concentration Building',
        'Effective Planning Systems',
        'Time & Energy Management',
        'Flow State Techniques',
        'Overcoming Procrastination',
        'Goal Setting Mastery',
        'Priority Management Skills',
        'Digital Minimalism Practice',
        'Habit Building Framework',
        'Deep Work Methodology',
        'Energy Management For Productivity',
        'Motivation Maintenance',
        'Decision Fatigue Elimination',
        'High-Performance Routines',
        'Sustainable Productivity Habits'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
    
    default: {
      const baseTopics = [
        'Daily Reflection Practice',
        'Inner Awareness Building',
        'Practical Application Techniques',
        'Integration Exercises',
        'Transformation Implementation',
        'Skill Development Practice',
        'Progress Measurement Methods',
        'Habit Formation Techniques',
        'Personalized Adaptation Skills',
        'Challenge Resolution Approaches',
        'Knowledge Application Methods',
        'Practical Wisdom Development',
        'Experiential Learning Practice',
        'Insight Integration Methods',
        'Long-Term Growth Strategies'
      ];
      return generateFullTopicsList(baseTopics, duration);
    }
  }
};
