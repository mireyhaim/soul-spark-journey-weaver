
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Generate pre and post journey feelings based on journey category with a more empathetic, personal tone
export const getJourneyExplanations = (journey: any) => {
  const category = journey.category;
  
  const explanations = {
    'Personal Development': {
      before: "Hey, I see you. Those moments when you feel stuck in the same patterns day after day... I've been there too. That nagging self-doubt that whispers you're not good enough, the uncertainty about where you're headed, the feeling that your true potential is locked away somewhere you can't reach. It's exhausting carrying that weight around, isn't it?",
      after: "Friend, the change I've seen in people who complete this journey is remarkable. That clarity you've been searching for? It's coming. Those limiting beliefs that have been holding you back will start to loosen their grip. You'll catch yourself standing taller, speaking with more confidence, and making decisions from a place of inner wisdom rather than fear. This isn't just about feeling better—it's about becoming the person you're truly meant to be."
    },
    'Spirituality': {
      before: "I understand that emptiness you sometimes feel in the quiet moments—when the notifications stop and you're left with yourself. That disconnection from something deeper, that sense that there must be more to life than just getting through each day. The world moves so fast, doesn't it? And sometimes it feels like you're just being carried along by the current, your spirit longing for something real to anchor to.",
      after: "The peace you'll find through this journey isn't fleeting—it's a foundation you can return to again and again. When life gets chaotic (and we both know it will), you'll have practices that bring you back to center. You'll notice yourself responding rather than reacting, finding meaning in everyday moments, and feeling a connection that extends beyond what words can describe. This journey isn't about escaping life—it's about experiencing it more fully, with your spirit awakened."
    },
    'Consciousness': {
      before: "Let me ask you something—have you ever felt like there's an invisible ceiling to your awareness? Like you're seeing the world through a narrow window when there's actually a vast landscape beyond? Those moments when you sense there's something more to understand about yourself, about reality, but you can't quite grasp it? It can be frustrating when your mind keeps cycling through the same thoughts, the same limitations.",
      after: "The expansion that happens during this journey is like finally opening doors you didn't even know existed within you. You'll start noticing patterns you were blind to before. Your perspective will shift in ways that make challenges look different—smaller in some ways, more meaningful in others. The mental barriers that once seemed solid begin to dissolve. This isn't just about thinking differently—it's about experiencing reality with new eyes and finding freedom in that expanded awareness."
    },
    'Reality Manifestation': {
      before: "I know that feeling—when life seems to be happening TO you instead of THROUGH you. Those moments of frustration when you wonder why things aren't working out, why the same patterns keep repeating, why your deepest desires remain just out of reach. It can leave you feeling powerless, can't it? Like you're watching your life unfold rather than creating it intentionally.",
      after: "The shift that happens when you truly understand manifestation principles is profound. That sense of being at the mercy of circumstances? It transforms into a quiet confidence in your creative power. You'll notice synchronicities appearing more frequently, opportunities aligning with your intentions, and a new relationship with possibility itself. This journey isn't about wishful thinking—it's about mastering the art of conscious creation and stepping fully into your role as the author of your experience."
    },
    'Abundance Manifestation': {
      before: "Let's be honest about the weight you've been carrying around money and resources. Those worries that wake you up at night, the tension in your body when you check your accounts, the subtle belief that there's never quite enough. I recognize that sense of unworthiness that shows up when you try to receive—the voice that whispers you don't deserve abundance or that wanting more is somehow wrong.",
      after: "The freedom that comes with shifting your relationship to abundance changes everything. Those anxious thoughts about money? They'll be replaced by a genuine trust in the flow of resources. You'll notice yourself receiving with grace, giving with joy, and recognizing opportunities that were invisible to you before. This journey isn't just about attracting more—it's about healing your relationship with abundance at the deepest level so that prosperity becomes your natural state rather than a constant struggle."
    }
  };
  
  // Return default explanations if category doesn't match
  return explanations[category as keyof typeof explanations] || {
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
