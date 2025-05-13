
import { JourneyExperienceContent, JourneyExperienceMap } from './types';

// Get default experiences content by category
export const getCategoryExperienceContent = (category: string | undefined): JourneyExperienceContent => {
  switch (category) {
    case 'Personal Development':
      return {
        title: "Transform Your Inner Potential",
        experiences: [
          "Daily self-discovery exercises to uncover your authentic self",
          "Tools to break through limiting beliefs and self-doubt",
          "Guided practices for building lasting confidence and self-esteem",
          "Personalized growth path aligned with your unique strengths"
        ]
      };
    case 'Spirituality':
      return {
        title: "Deepen Your Spiritual Connection",
        experiences: [
          "Sacred meditation practices to connect with your higher self",
          "Energy clearing techniques to remove spiritual blockages",
          "Intuitive development exercises to strengthen your inner guidance",
          "Sacred rituals to create deeper meaning in your daily life"
        ]
      };
    case 'Consciousness':
      return {
        title: "Expand Your Awareness",
        experiences: [
          "Advanced consciousness practices to transcend limiting thought patterns",
          "Mind-expanding exercises to access higher states of awareness",
          "Perception-shifting techniques to see reality with new clarity",
          "Integration tools to bring expanded consciousness into daily life"
        ]
      };
    case 'Reality Manifestation':
      return {
        title: "Create Your Desired Reality",
        experiences: [
          "Powerful manifestation techniques aligned with universal laws",
          "Visualization practices to strengthen your creative abilities",
          "Energy alignment methods to remove manifestation blocks",
          "Daily reality creation rituals to accelerate your results"
        ]
      };
    case 'Abundance Manifestation':
      return {
        title: "Open to Receiving Abundance",
        experiences: [
          "Abundance mindset practices to release scarcity thinking",
          "Energy clearing exercises to heal your relationship with receiving",
          "Powerful techniques to align with the natural flow of prosperity",
          "Daily rituals to magnetize opportunities and resources to you"
        ]
      };
    case 'Relationships':
      return {
        title: "Transform Your Relationships",
        experiences: [
          "Communication techniques for authentic connection and understanding",
          "Healing practices for past relationship wounds and patterns",
          "Tools for setting healthy boundaries while maintaining connection",
          "Daily practices to cultivate deeper intimacy and trust"
        ]
      };
    case 'Career Development':
      return {
        title: "Discover Your Professional Path",
        experiences: [
          "Self-discovery exercises to align your work with your authentic self",
          "Practical tools for creating an authentic personal brand",
          "Strategies to overcome professional blocks and fears",
          "Daily practices for success mindset and professional fulfillment"
        ]
      };
    case 'Emotional Healing':
      return {
        title: "Heal Your Emotional Patterns",
        experiences: [
          "Gentle techniques to access and release stored emotional wounds",
          "Inner child healing practices for core emotional healing",
          "Tools to identify and transform self-sabotaging patterns",
          "Daily emotional integration practices for lasting transformation"
        ]
      };
    case 'Feminine Power':
      return {
        title: "Awaken Your Feminine Wisdom",
        experiences: [
          "Sacred womb connection practices for accessing feminine power",
          "Intuition strengthening exercises for clearer inner guidance",
          "Balance techniques for integrating gentle strength and power",
          "Rituals to honor your feminine cycles and natural rhythms"
        ]
      };
    case 'Energy & Healing':
      return {
        title: "Activate Your Energy Healing",
        experiences: [
          "Daily energy clearing practices for maintaining your energetic field",
          "Shadow work techniques to integrate disowned aspects of self",
          "Consciousness expansion exercises for spiritual awakening",
          "Intuitive development practices to strengthen your natural abilities"
        ]
      };
    case 'Productivity':
      return {
        title: "Master Your Focus and Flow",
        experiences: [
          "Practical time management tools designed for your unique needs",
          "Focus-enhancing practices to deepen your concentration abilities",
          "Self-motivation techniques that don't rely on willpower alone",
          "Daily rituals to maintain consistent energy and productivity"
        ]
      };
    default:
      return {
        title: "What You'll Experience in This Journey",
        experiences: [
          "Daily guided practices designed specifically for your personal growth",
          "Deep emotional healing and releasing of limiting beliefs",
          "Progressive techniques that build on each day's insights",
          "Personalized guidance adapting to your unique spiritual path"
        ]
      };
  }
};

// Function to get default experiences based on category and duration
export const getDefaultExperiences = (category: string | undefined, duration: number): JourneyExperienceContent => {
  return getCategoryExperienceContent(category);
};
