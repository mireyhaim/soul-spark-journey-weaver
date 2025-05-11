
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { journeys } from '@/data/journeys';

// Generate journey-specific feelings for each journey with a more empathetic, personal tone
export const getJourneyExplanations = (journey: any) => {
  // Get journey by ID for specific content
  const journeyId = journey.id;
  
  // Journey-specific explanations
  const journeySpecificExplanations: Record<string, { before: string, after: string }> = {
    '1': {
      before: "Have you been feeling like you're just going through the motions lately? Like there's something more meaningful waiting for you, but you can't quite figure out what it is? I understand that sense of disconnection from your own purpose—that feeling that your true self is buried under layers of expectations and routines.",
      after: "By the end of this self-discovery journey, you'll have a clearer understanding of your core values, natural talents, and the unique contribution you're meant to make. You'll find yourself making decisions with more confidence, pursuing goals that truly resonate with you, and experiencing a renewed sense of purpose and direction in your daily life."
    },
    '2': {
      before: "Those moments when your emotions seem to take over—when you react in ways you later regret, or when you feel overwhelmed by what others are feeling... I know how frustrating and isolating that can be. When you struggle to communicate your needs or truly understand those around you, relationships become needlessly complicated.",
      after: "As you complete this emotional intelligence journey, you'll notice a remarkable shift in how you navigate your inner world and your relationships. You'll respond thoughtfully rather than react impulsively, communicate your feelings with clarity, and connect with others on a deeper, more authentic level. This emotional wisdom will serve you in every area of your life, from your closest relationships to professional interactions."
    },
    // Add all other journeys with specific explanations
    '13': {
      before: "I see the subtle tightness you feel when thinking about abundance—that unconscious belief that there's never quite enough to go around. Those moments of anxiety when checking your accounts, the small voice that whispers you don't deserve prosperity, the pattern of giving generously but struggling to receive. This relationship with abundance can be exhausting to maintain.",
      after: "The freedom you'll experience through this abundance meditation journey is profound. That constant background worry about resources will be replaced by a genuine trust in life's natural flow. You'll catch yourself easily receiving what once felt uncomfortable to accept. Opportunities that were always present but invisible to you will suddenly appear obvious. This isn't just about attracting more—it's about becoming a natural conduit for abundance in all its forms."
    },
    // Default fallback for any journey without specific content
  };
  
  // Return journey-specific content or fall back to category-based content
  return journeySpecificExplanations[journeyId] || {
    before: "I see the uncertainty you're feeling right now—wondering if this journey is right for you, if it will really make a difference. Those questions about whether this investment of your time and energy will be worth it. It's natural to feel that hesitation when standing at the threshold of something new.",
    after: "The transformation that awaits you through this journey is real. The tools you'll gain, the insights you'll uncover, the shifts in perspective—they'll stay with you long after you complete these days. This isn't just another thing to check off your list; it's an experience that will integrate into how you move through the world, bringing more clarity, peace and purpose to your everyday life."
  };
};

interface JourneyExplanationsProps {
  journey: any;
  showExplanations: boolean;
  onDismiss: () => void;
}

const JourneyExplanations: React.FC<JourneyExplanationsProps> = ({ journey, showExplanations, onDismiss }) => {
  if (!showExplanations) return null;
  
  const journeyExplanations = getJourneyExplanations(journey);
  
  return (
    <Card className="mb-6 border-spirit-200 bg-spirit-50/50">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium text-spirit-800 mb-2">Before Your Journey</h3>
            <p className="text-earth-700">{journeyExplanations.before}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-green-700 mb-2">After Your Journey</h3>
            <p className="text-earth-700">{journeyExplanations.after}</p>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onDismiss}
              className="text-earth-600"
            >
              Continue to Journey
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JourneyExplanations;
