
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, ListChecks } from 'lucide-react';
import JourneyDailyLessons from './JourneyDailyLessons';

interface JourneyPurchaseProps {
  price: number;
  journeyTitle: string;
  duration: number;
  isPurchased: boolean;
  onPurchase: () => void;
  category?: string;
  journeyId: string;
}

// Helper function to get journey-specific experience content
const getJourneyExperienceContent = (journeyId: string, category: string | undefined) => {
  // Journey specific content mapping by ID
  const journeySpecificContent: Record<string, { title: string, experiences: string[] }> = {
    // Personal Development journeys
    '1': {
      title: "Your Self-Discovery Journey Will Include",
      experiences: [
        "Daily reflective exercises to uncover your authentic values and strengths",
        "Guided visualizations to connect with your deeper purpose",
        "Personalized insight tools that adapt to your unique life experiences",
        "Integration practices to align your daily choices with your true self"
      ]
    },
    '2': {
      title: "Your Emotional Intelligence Growth Will Include",
      experiences: [
        "Emotion awareness techniques to identify feelings before they overwhelm you",
        "Communication frameworks to express your needs with clarity and compassion",
        "Empathy-building practices for deeper connections with others",
        "Real-world application exercises for your most challenging relationships"
      ]
    },
    // Abundance journeys
    '13': {
      title: "Your Abundance Meditation Journey Will Include",
      experiences: [
        "Daily gratitude practices that rewire your relationship with receiving",
        "Specific meditation techniques to clear unconscious money blocks",
        "Visualization exercises to expand your capacity to receive prosperity",
        "Practical abundance rituals to integrate into your everyday life"
      ]
    },
    '14': {
      title: "Your Financial Freedom Path Includes",
      experiences: [
        "Mindset practices to release inherited money beliefs that limit your growth",
        "Daily abundance affirmations tailored to your specific financial goals",
        "Energy alignment exercises to create harmony with wealth and resources",
        "Practical manifestation techniques specifically for financial prosperity"
      ]
    },
    // Relationships journeys
    '16': {
      title: "Your Heal & Attract Love Journey Includes",
      experiences: [
        "Emotional release practices to heal past relationship wounds",
        "Energy clearing techniques to remove blockages to receiving love",
        "Attraction activation meditations to align with healthy partnerships",
        "Daily self-love practices to strengthen your relationship foundation"
      ]
    },
    '17': {
      title: "Your Conscious Relationships Mastery Includes",
      experiences: [
        "Advanced communication techniques for deeper emotional connection",
        "Boundary-setting frameworks that honor both yourself and others",
        "Conflict resolution strategies that strengthen rather than damage bonds",
        "Intimacy practices that create lasting trust and vulnerability"
      ]
    },
    // Career Development journeys
    '18': {
      title: "Your True Calling Journey Includes",
      experiences: [
        "Guided inner explorations to identify your authentic purpose",
        "Skills and passions inventory to align your natural gifts with career paths",
        "Visualization techniques to connect with your future professional self",
        "Practical steps to transition from current work to aligned purpose"
      ]
    },
    // Add more journey-specific content as needed
  };
  
  // Return journey-specific content if available, otherwise use category-based content
  if (journeySpecificContent[journeyId]) {
    return journeySpecificContent[journeyId];
  }
  
  // Fall back to category-based content if journey-specific isn't available
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

const JourneyPurchase: React.FC<JourneyPurchaseProps> = ({
  price,
  journeyTitle,
  duration,
  isPurchased,
  onPurchase,
  category,
  journeyId
}) => {
  // If the journey is purchased, don't show this component at all
  if (isPurchased) {
    return null;
  }
  
  const experienceContent = getJourneyExperienceContent(journeyId, category);
  
  return (
    <div className="bg-white p-8 rounded-lg border shadow-sm mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Purchase This Journey</h2>
      <p className="text-earth-600 mb-6 text-center">
        Get full access to <span className="font-medium">{journeyTitle}</span> for just ${price}.
      </p>
      
      {/* Add the daily lessons preview with duration */}
      <JourneyDailyLessons journeyId={journeyId} category={category} duration={duration} />
      
      <div className="bg-spirit-50 p-4 rounded-md mb-6">
        <h3 className="font-medium text-spirit-700 flex items-center gap-2 mb-3">
          <ListChecks size={18} />
          <span>{experienceContent.title}:</span>
        </h3>
        <ul className="text-earth-700 space-y-2 ml-2">
          {experienceContent.experiences.map((experience, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-spirit-600 font-bold mt-1">•</span>
              <span>{experience}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <Button 
          onClick={onPurchase} 
          className="bg-green-600 hover:bg-green-700 gap-2"
        >
          <ShoppingCart size={16} />
          <span>Purchase Now</span>
        </Button>
      </div>
    </div>
  );
};

export default JourneyPurchase;
