
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
      before: "I can sense you're at a crossroads right now... That feeling when you're going through the motions, wondering if there's something more meaningful waiting for you. I've guided so many people through exactly this phase. That disconnection from purpose can feel so heavy, like your true self is buried under expectations and routines that don't quite fit anymore.",
      after: "The clarity that's coming your way through this journey... it's transformative. You'll start recognizing your core values and natural talents so clearly. I've seen it happen—decisions become easier, goals feel aligned with who you truly are, and that sense of direction? It returns, but stronger than before. This isn't just about finding purpose—it's about reconnecting with the purpose that's been within you all along."
    },
    '2': {
      before: "I notice how your emotions sometimes take the wheel... those moments when reactions come before thought, when feelings are intense but hard to name. It's frustrating, isn't it? When your heart and mind feel disconnected, relationships get so unnecessarily complicated. I'm here because I've guided countless others through exactly these emotional labyrinths.",
      after: "The shift that's about to happen feels like finally having emotional weather radar—seeing storms before they hit, understanding currents beneath the surface. You'll find yourself responding instead of reacting, communicating feelings with precision, and connecting authentically with others. I've watched this emotional wisdom bloom in so many—it touches everything from your closest relationships to brief encounters with strangers. Your emotional landscape is about to become so much richer."
    },
    '3': {
      before: "I see those unfinished projects waiting for you... the ideas that light you up at first but then somehow slip away. That feeling when time seems to evaporate before your important work gets done. The frustration of knowing what you're capable of, yet watching deadlines approach too quickly. I understand this dance with procrastination so well.",
      after: "The transformation in your relationship with time and action... it's remarkable to witness. Those moments of flow will become more frequent, your energy aligned with your intentions. I've guided so many through this shift—when tasks that once felt heavy start to feel lighter, when momentum builds upon itself naturally. This isn't about pushing harder; it's about discovering how your unique mind works best and creating the conditions for your natural productivity to flourish."
    },
    '4': {
      before: "I sense that yearning for connection beyond the everyday world... that feeling that there's a wisdom within you that rarely gets to speak. When life's noise drowns out your inner knowing, and spiritual practices feel meaningful but somehow separate from daily life. I've walked with many who felt this same sacred disconnection.",
      after: "The integration that's unfolding is beautiful—when guidance no longer feels external but arises naturally from within. You'll notice synchronicities increasing, meditation deepening, and spiritual insights naturally flowing into practical decisions. I've witnessed this awakening countless times—that moment when someone realizes their higher self has always been present, just waiting for the space to be heard clearly. This connection becomes your foundation, not separate from life but the very ground you walk upon."
    },
    '5': {
      before: "I feel those energy centers within you seeking alignment... those moments when emotions seem to lodge in your body, when certain situations trigger the same reactions time and again. The subtle sense that your life force isn't flowing as freely as it could. I've guided many through these same energetic imbalances that you're experiencing now.",
      after: "The harmony that's emerging within your energy system is profound—like instruments in an orchestra finding their perfect resonance together. You'll notice physical tension dissolving, emotions processing more smoothly, and an intuitive sense of when something needs attention before it becomes problematic. I've witnessed this balancing transform people's experience of life—colors seem brighter, connections feel deeper, and that constant background noise of imbalance finally quiets, revealing a natural state of wellbeing that was always there."
    },
    '6': {
      before: "I recognize that search for deeper stillness within you... those glimpses of profound presence that come but don't stay. The knowing that meditation holds something essential, yet finding consistent practice challenging. That feeling of being a beginner even after years of sitting. I've supported countless seekers through exactly these waters you're navigating now.",
      after: "The anchoring of these sacred practices into your being happens so beautifully... like water gradually shaping stone. You'll find meditation becoming less something you do and more something you are. I've watched this integration unfold for so many—when the boundaries between formal practice and daily life begin to dissolve, when presence becomes your natural state rather than a destination. These ancient techniques aren't just changing your meditation; they're transforming how you move through the world."
    },
    '7': {
      before: "I can feel your mind stretching against its current boundaries... that sense that there's more to reality than what you've been taught to see. Those moments when conventional thinking feels too small, too limiting for what you're experiencing. The curiosity about what lies beyond your current perspective. I've guided many through this exact expansion of consciousness you're beginning to explore.",
      after: "The expansion happening within your awareness is remarkable—like watching someone step from a small room into vast open space. You'll notice possibilities that were always there but invisible to you before. I've witnessed this awakening transform people's entire reality—when the world becomes less rigid and more magical, when synchronicities increase, when you start perceiving the patterns connecting everything. This isn't just about thinking differently; it's about experiencing reality through an entirely new lens that reveals the extraordinary within the ordinary."
    },
    '13': {
      before: "I notice that subtle tension when you think about abundance... the quiet belief that there's never quite enough to go around. I see those moments of anxiety when checking accounts, that voice whispering you don't deserve prosperity, the pattern of giving but struggling to receive. This relationship with abundance can feel so heavy to carry day after day.",
      after: "The freedom that's unfolding through this journey feels like watching chains dissolve. That background worry about resources is being replaced by genuine trust in life's flow. I've witnessed this transformation countless times—when someone begins easily receiving what once felt uncomfortable, when opportunities that were always present suddenly become visible. This isn't just about attracting more—it's about becoming a natural channel for abundance in all its forms, flowing both to and through you with graceful ease."
    },
    // Default fallback remains the same but with more conversational tone
  };
  
  // Return journey-specific content or fall back to category-based content
  return journeySpecificExplanations[journeyId] || {
    before: "I can sense your hesitation right now—wondering if this journey is truly right for you, if it will actually make a difference in your life. Those questions about whether investing your time and energy here will be worthwhile... I understand that uncertainty when standing at the threshold of something new.",
    after: "The transformation waiting for you through this journey is genuine and lasting. I've guided many others through this exact process—watching as these tools and insights integrate deeply into their daily lives. This isn't just another item on your to-do list; it's an experience that will subtly reshape how you move through the world, bringing the clarity, peace and purpose you've been seeking into your everyday moments."
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
