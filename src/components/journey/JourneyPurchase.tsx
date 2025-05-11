
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, ListChecks } from 'lucide-react';

interface JourneyPurchaseProps {
  price: number;
  journeyTitle: string;
  duration: number;
  isPurchased: boolean;
  onPurchase: () => void;
  category?: string;
}

// Helper function to get journey-specific experience content
const getJourneyExperienceContent = (category: string | undefined) => {
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
  category
}) => {
  if (isPurchased) {
    return null;
  }
  
  const experienceContent = getJourneyExperienceContent(category);
  
  return (
    <div className="bg-white p-8 rounded-lg border shadow-sm mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Purchase This Journey</h2>
      <p className="text-earth-600 mb-6 text-center">
        Get full access to <span className="font-medium">{journeyTitle}</span> for just ${price}.
      </p>
      
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
