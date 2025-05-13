import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { journeys } from '@/data/journeys';
import { Avatar } from "@/components/ui/avatar";
import { JourneyExplanation } from '../ai-chat/types';

// Generate journey-specific feelings for each journey with a more empathetic, personal tone
export const getJourneyExplanations = (journey: any): JourneyExplanation => {
  // Get journey by ID for specific content
  const journeyId = journey.id;
  
  // Journey-specific explanations with more personal, flowing conversation style
  const journeySpecificExplanations: Record<string, JourneyExplanation> = {
    '1': {
      before: "Hello, I'm your spiritual guide for this journey. I sense you're at a crossroads right now... that feeling when you're going through the motions, wondering if there's something more meaningful waiting for you. I've guided many through exactly this stage. That disconnection from purpose can feel so heavy, as if your true self is buried beneath expectations and routines that no longer truly fit you.",
      after: "The clarity that will come to you through this journey... it's metamorphic. You'll begin to identify your core values and natural talents with greater clarity. I've seen it happen—decisions become easier, goals feel aligned with who you truly are, and that sense of direction? It returns, but stronger than before. It's not just about finding purpose—it's about reconnecting with the purpose that's been within you all along."
    },
    '2': {
      before: "Hello, I'm your spiritual guide for this journey. I notice your emotions sometimes take the wheel... those moments when reactions come before thought, when feelings are intense yet difficult to name. It's frustrating, isn't it? When your heart and mind feel disconnected, relationships become unnecessarily complicated. I'm here because I've guided countless others through these very emotional labyrinths.",
      after: "The shift that's about to happen feels like finally having emotional radar—seeing storms before they hit, understanding currents beneath the surface. You'll find yourself responding instead of automatically reacting, communicating emotions accurately, and connecting authentically with others. I've watched this emotional wisdom bloom in many—it touches everything from your closest relationships to fleeting encounters with strangers. Your emotional landscape is about to become far richer."
    },
    '3': {
      before: "Hello, I'm your spiritual guide for this journey. I see the unfinished projects waiting for you... the ideas that light you up initially but somehow fade away. That feeling when time seems to evaporate before your important work gets done. The frustration of knowing what you're capable of, yet watching deadlines approach too quickly. I understand this dance with procrastination so well.",
      after: "The transformation in your relationship with time and action... it's amazing to witness. Flow states will become more frequent, your energy aligned with your intentions. I've guided many through this shift—when tasks that once felt heavy begin to feel lighter, when momentum builds naturally upon itself. It's not about pushing harder; it's about discovering how your unique mind works best and creating conditions for your natural productivity to flourish."
    },
    '4': {
      before: "Hello, I'm your spiritual guide for this journey. I sense your longing for connection beyond the everyday world... that feeling there's wisdom within you that rarely speaks. When the noise of life drowns out your inner knowing, and spiritual practices feel meaningful yet somehow separate from daily life. I've walked with many who've felt that same disconnection from the sacred.",
      after: "The integration that occurs is beautiful—when guidance no longer feels external but naturally rises from within. You'll notice increasing synchronicity, deepening meditation, and spiritual insights flowing naturally into practical decisions. I've witnessed this awakening countless times—the moment someone realizes their higher self was always present, just waiting for space to be heard clearly. This connection becomes your foundation, not separate from life but the very ground you walk upon."
    },
    '5': {
      before: "Hello, I'm your spiritual guide for this journey. I feel the energy centers within you seeking alignment... those moments when emotions seem stuck in your body, when certain situations trigger the same responses again and again. The subtle feeling that your life force isn't flowing as freely as it could. I've guided many through those very energy imbalances you're experiencing now.",
      after: "The harmony forming in your energy system is profound—like instruments in an orchestra finding their perfect resonance together. You'll notice physical tension melting away, emotions processing more smoothly, and an intuitive sense of when something needs attention before it becomes problematic. I've witnessed this balance transform people's lived experience—colors appear brighter, connections feel deeper, and that constant background noise of imbalance finally quiets, revealing a natural state of wellbeing that was always there."
    },
    '6': {
      before: "Hello, I'm your spiritual guide for this journey. I recognize the search for deeper peace within you... those flashes of profound presence that come but don't stay. The knowing that meditation holds something essential, yet finding consistent practice challenging. That feeling of being a beginner even after years of sitting. I've supported countless seekers through these very waters you're navigating now.",
      after: "The anchoring of these sacred practices into your being happens so beautifully... like water gradually shaping stone. You'll find meditation becomes less something you do and more something you are. I've watched this integration unfold for so many—when the boundaries between formal practice and everyday life begin to dissolve, when presence becomes your natural state rather than a destination. These ancient techniques don't just change your meditation; they change how you move through the world."
    },
    '7': {
      before: "Hello, I'm your spiritual guide for this journey. I can feel your consciousness stretching against its current boundaries... that sense there's more to reality than you've been taught to see. Those moments when conventional thinking feels too small, too limiting for what you're experiencing. The curiosity about what lies beyond your current perspective. I've guided many through that very expansion of awareness you're beginning to explore.",
      after: "The expansion occurring in your consciousness is remarkable—like watching someone step from a small room into a vast open space. You'll notice possibilities that were always there but previously invisible to you. I've witnessed this awakening change people's entire reality—when the world becomes less rigid and more magical, when coincidences grow, when you begin to perceive the patterns connecting everything. It's not just thinking differently; it's experiencing reality through an entirely new lens that reveals the extraordinary within the ordinary."
    },
    '13': {
      before: "Hello, I'm your spiritual guide for this journey. I notice that subtle tension when you think about abundance... the quiet belief that there's never enough for everyone. I see those moments of anxiety checking accounts, that voice whispering you're not worthy of prosperity, the pattern of giving but struggling to receive. This relationship with abundance can feel so heavy to carry day after day.",
      after: "The freedom revealed through this journey feels like watching chains dissolve. Background worry about resources is replaced with genuine trust in life's flow. I've witnessed this transformation countless times—when someone begins to easily receive what once felt uncomfortable, when opportunities that were always present suddenly become visible. It's not just about attracting more—it's about becoming a natural channel for abundance in all its forms, flowing both to you and through you with graceful ease."
    },
    // Default fallback remains the same but with more conversational tone
  };
  
  // Return journey-specific content or fall back to category-based content
  return journeySpecificExplanations[journeyId] || {
    before: "Hello, I'm your spiritual guide for this journey. I can sense your hesitation right now—wondering if this journey is truly right for you, if it will really make a difference in your life. These questions about whether investing your time and energy here will be worthwhile... I understand that uncertainty when standing on the threshold of something new.",
    after: "The transformation waiting for you through this journey is real and lasting. I've guided many others through this very process—watching as these tools and insights integrate deeply into their everyday lives. This isn't just another item on your to-do list; it's an experience that will gently reshape how you move through the world, bringing the clarity, peace and purpose you've been seeking into your everyday moments."
  };
};

interface JourneyExplanationsProps {
  journey: any;
  showExplanations: boolean;
  onDismiss: () => void;
}

const JourneyExplanations: React.FC<JourneyExplanationsProps> = ({ 
  journey, 
  showExplanations, 
  onDismiss 
}) => {
  // If explanations should not be shown, return null (not rendering anything)
  if (!showExplanations) return null;
  
  const journeyExplanations = getJourneyExplanations(journey);
  
  return (
    <Card className="mb-6 border-spirit-200 bg-spirit-50/50">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-10 w-10 border-2 border-spirit-200">
              <div className="bg-spirit-100 text-spirit-700 font-medium h-full w-full flex items-center justify-center">AI</div>
            </Avatar>
            
            <div className="space-y-4 flex-1">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-earth-100">
                <p className="text-earth-700 italic">{journeyExplanations.before}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-calm-100">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JourneyExplanations;
