
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { journeys } from '@/data/journeys';
import JourneyHeader from './journey/JourneyHeader';
import JourneyProgress from './journey/JourneyProgress';
import DailyPractice from './journey/DailyPractice';
import JourneyTimeline from './journey/JourneyTimeline';
import JourneyInsights from './journey/JourneyInsights';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Calculate price based on journey duration
const getJourneyPrice = (duration: number): number => {
  if (duration <= 7) return 11;
  if (duration <= 14) return 15;
  return 27;
};

// Generate pre and post journey feelings based on journey category
const getJourneyExplanations = (journey: any) => {
  const category = journey.category;
  
  const explanations = {
    'Personal Development': {
      before: "Before starting this journey, you might feel stuck in patterns that limit your growth. You may experience self-doubt, uncertainty about your path, or a sense that you're not living up to your potential.",
      after: "After completing this journey, you'll feel a renewed sense of clarity and purpose. You'll have practical tools to overcome limiting beliefs, enhanced self-awareness, and greater confidence in your ability to create positive change in your life."
    },
    'Spirituality': {
      before: "Before beginning this spiritual journey, you might feel disconnected from your deeper self, experiencing a sense of emptiness or lack of meaning. Daily stress may overwhelm your sense of peace and connection.",
      after: "After this journey, you'll experience a profound sense of inner peace and spiritual connection. Your daily practices will help you maintain centeredness even during challenging times, and you'll approach life with greater presence and awareness."
    },
    'Consciousness': {
      before: "Before expanding your consciousness, you may feel limited by your current perceptions and thought patterns. There might be a sense that there's more to reality than what you're experiencing.",
      after: "After this journey, you'll perceive reality with greater depth and dimension. Your awareness will be expanded, allowing you to access deeper insights and operate from a more awakened state of consciousness in your daily life."
    },
    'Reality Manifestation': {
      before: "Before mastering manifestation, you might feel that life happens to you rather than through you. You may experience frustration when your desires don't materialize or uncertainty about how to create what you want.",
      after: "After this journey, you'll understand the principles of conscious creation and feel empowered to manifest your desires. You'll have practical techniques to align your energy with your intentions and create your reality with greater confidence."
    },
    'Abundance Manifestation': {
      before: "Before embracing abundance, you might experience scarcity mindsets, worry about resources, or blocks in receiving. There may be unconscious limiting beliefs affecting your relationship with prosperity.",
      after: "After this journey, you'll embody an abundance consciousness that attracts prosperity into all areas of your life. You'll have released limiting beliefs about money and worthiness, opening the flow of abundance naturally and effortlessly."
    }
  };
  
  // Return default explanations if category doesn't match
  return explanations[category as keyof typeof explanations] || {
    before: "Before starting this journey, you may feel uncertain about what lies ahead and how this practice will impact your life.",
    after: "After completing this journey, you'll have gained valuable insights, practical tools, and a transformed perspective that will enhance your daily life and wellbeing."
  };
};

const UserJourney: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [completed, setCompleted] = useState(false);
  const [savedProgress, setSavedProgress] = useState<number[]>([1, 2, 3, 4]); // Days completed
  const [isPurchased, setIsPurchased] = useState(false);
  const [showExplanations, setShowExplanations] = useState(true);
  
  // Find the selected journey
  const journey = journeys.find(j => j.id === id) || {
    id: '13',
    title: 'Abundance Meditation',
    description: 'Open yourself to receive abundance in all areas of your life through mindfulness and gratitude.',
    teacher: 'Sarah Jenkins',
    duration: 14,
    category: 'Abundance Manifestation',
    image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  };
  
  // Get journey explanations
  const journeyExplanations = getJourneyExplanations(journey);
  
  // Current day of the journey (this would normally be calculated from user data)
  const currentDay: number = 5;
  const price = getJourneyPrice(journey.duration);
  
  const handleComplete = () => {
    // Add the current day to saved progress if not already saved
    if (!savedProgress.includes(currentDay)) {
      setSavedProgress(prev => [...prev, currentDay]);
    }
    
    setCompleted(true);
    toast({
      title: "Practice completed!",
      description: "Great job! Your reflections have been saved and you've completed today's practice.",
    });
  };

  const handlePurchase = () => {
    setIsPurchased(true);
    toast({
      title: "Journey purchased!",
      description: `Your ${journey.title} journey has been purchased for $${price}. Enjoy your spiritual path!`,
    });
  };

  const handleDismissExplanations = () => {
    setShowExplanations(false);
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          {/* Journey header with title, description and actions */}
          <JourneyHeader journey={journey} />
          
          {/* Pre and Post Journey Explanations */}
          {showExplanations && (
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
                      onClick={handleDismissExplanations}
                      className="text-earth-600"
                    >
                      Continue to Journey
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            {/* Progress information */}
            <JourneyProgress currentDay={currentDay} duration={journey.duration} />
            
            {/* Purchase button */}
            {!isPurchased && (
              <div className="w-full md:w-auto">
                <Button 
                  onClick={handlePurchase} 
                  className="w-full bg-green-600 hover:bg-green-700 gap-2"
                >
                  <ShoppingCart size={16} />
                  <span>Purchase for ${price}</span>
                </Button>
              </div>
            )}
          </div>
          
          {/* Daily practice card */}
          {isPurchased ? (
            <DailyPractice 
              currentDay={currentDay} 
              completed={completed}
              onComplete={handleComplete}
            />
          ) : (
            <div className="bg-white p-8 rounded-lg border shadow-sm mb-6 text-center">
              <h2 className="text-2xl font-semibold mb-4">Purchase This Journey</h2>
              <p className="text-earth-600 mb-6">
                Get full access to this {journey.duration}-day journey for just ${price}.
              </p>
              <Button 
                onClick={handlePurchase} 
                className="bg-green-600 hover:bg-green-700 gap-2"
              >
                <ShoppingCart size={16} />
                <span>Purchase Now</span>
              </Button>
            </div>
          )}
          
          {isPurchased && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Journey Timeline */}
              <JourneyTimeline currentDay={currentDay} />
              
              {/* AI Insights */}
              <JourneyInsights />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserJourney;
