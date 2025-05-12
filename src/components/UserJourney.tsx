
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { journeys } from '@/data/journeys';
import JourneyHeader from './journey/JourneyHeader';
import JourneyProgress from './journey/JourneyProgress';
import DailyPractice from './journey/DailyPractice';
import JourneyTimeline from './journey/JourneyTimeline';
import JourneyInsights from './journey/JourneyInsights';
import JourneyExplanations from './journey/JourneyExplanations';
import JourneyPurchase from './journey/JourneyPurchase';

// Calculate price based on journey duration
const getJourneyPrice = (duration: number): number => {
  if (duration <= 7) return 11;
  if (duration <= 14) return 15;
  return 27;
};

const UserJourney: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [completed, setCompleted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1); // Always start at day 1 after purchase
  const [savedProgress, setSavedProgress] = useState<number[]>([]); // Days completed
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
  
  const price = getJourneyPrice(journey.duration);
  
  const handleComplete = () => {
    // Add the current day to saved progress if not already saved
    if (!savedProgress.includes(currentDay)) {
      setSavedProgress(prev => [...prev, currentDay]);
      // Advance to the next day when current day is completed
      setCurrentDay(prev => Math.min(prev + 1, journey.duration));
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

  const handleContinueJourney = () => {
    setCompleted(false); // Reset completed state for the new day
    // No need to increment the day here, we do that when the day is completed
    toast({
      title: "Continue your journey",
      description: `Day ${currentDay} of your ${journey.title} journey is ready for you.`,
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
          <JourneyExplanations 
            journey={journey}
            showExplanations={showExplanations}
            onDismiss={handleDismissExplanations}
          />
          
          {/* Only show progress info and content if journey is purchased */}
          {isPurchased ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                {/* Progress information */}
                <JourneyProgress 
                  currentDay={currentDay} 
                  duration={journey.duration}
                  onContinue={handleContinueJourney}
                />
              </div>
              <DailyPractice 
                currentDay={currentDay} 
                completed={completed}
                onComplete={handleComplete}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Journey Timeline */}
                <JourneyTimeline currentDay={currentDay} />
                
                {/* AI Insights */}
                <JourneyInsights />
              </div>
            </>
          ) : (
            <JourneyPurchase 
              price={price}
              journeyTitle={journey.title}
              duration={journey.duration}
              isPurchased={isPurchased}
              onPurchase={handlePurchase}
              category={journey.category}
              journeyId={journey.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserJourney;
