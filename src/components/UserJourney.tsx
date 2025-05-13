
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { journeys } from '@/data/journeys';
import JourneyHeader from './journey/JourneyHeader';
import JourneyProgress from './journey/JourneyProgress';
import JourneyTimeline from './journey/JourneyTimeline';
import JourneyInsights from './journey/JourneyInsights';
import JourneyExplanations from './journey/JourneyExplanations';
import JourneyPurchase from './journey/JourneyPurchase';
import { useIsMobile } from '@/hooks/use-mobile';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

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
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  
  const isMobile = useIsMobile();
  
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
    }
    
    setCompleted(true);
    toast({
      title: "Practice completed!",
      description: "Great job! Your reflections have been saved and you've completed today's practice.",
    });

    if (isMobile) {
      setShowChatOnMobile(false);
    }
  };

  const handleNextDay = () => {
    if (currentDay < journey.duration) {
      // Move to the next day
      setCurrentDay(prev => prev + 1);
      setCompleted(false); // Reset completed state for the new day
      
      toast({
        title: "Moving to next day",
        description: `You're now on Day ${currentDay + 1} of your journey. Keep up the great work!`,
      });
    }
  };

  const handlePurchase = () => {
    setIsPurchased(true);
    // Hide explanations immediately after purchase
    setShowExplanations(false);
    toast({
      title: "Journey purchased!",
      description: `Your ${journey.title} journey has been purchased for $${price}. Enjoy your spiritual path!`,
    });
  };

  const handleContinueJourney = () => {
    setCompleted(false); // Reset completed state for the current day
    toast({
      title: "Continue your journey",
      description: `Day ${currentDay} of your ${journey.title} journey is ready for you.`,
    });
    
    if (isMobile) {
      setShowChatOnMobile(true);
    }
  };

  const handleDismissExplanations = () => {
    setShowExplanations(false);
  };
  
  // For mobile - toggle between chat view and journey view
  const toggleMobileChat = () => {
    setShowChatOnMobile(!showChatOnMobile);
  };

  // If we're on mobile and showing the chat, only render JourneyInsights
  if (isMobile && showChatOnMobile && isPurchased) {
    return (
      <div className="h-screen w-screen">
        <div className="absolute top-0 left-0 z-20 p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/80 backdrop-blur-sm rounded-full shadow-md"
            onClick={() => setShowChatOnMobile(false)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <JourneyInsights
          currentDay={currentDay}
          completed={completed}
          onComplete={handleComplete}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          {/* Journey header with title, description and actions */}
          <JourneyHeader journey={journey} />
          
          {/* Pre and Post Journey Explanations - only show if not purchased and explanations are enabled */}
          {!isPurchased && (
            <JourneyExplanations 
              journey={journey}
              showExplanations={showExplanations}
              onDismiss={handleDismissExplanations}
            />
          )}
          
          {/* Only show progress info and content if journey is purchased */}
          {isPurchased ? (
            <>
              <div className="mb-6">
                {/* Progress information */}
                <JourneyProgress 
                  currentDay={currentDay} 
                  duration={journey.duration}
                  onContinue={handleContinueJourney}
                  completed={completed}
                  onNext={handleNextDay}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {/* Journey Timeline and AI Chat with Practice Questions */}
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-sans font-semibold">Your Spirit Guide</h2>
                      {isMobile && (
                        <Button 
                          variant="outline" 
                          onClick={toggleMobileChat}
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Open Chat
                        </Button>
                      )}
                    </div>
                    
                    {!isMobile && (
                      <JourneyInsights 
                        currentDay={currentDay} 
                        completed={completed} 
                        onComplete={handleComplete} 
                      />
                    )}
                  </div>
                </div>
                
                {/* Journey Timeline */}
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <JourneyTimeline 
                    currentDay={currentDay} 
                    savedProgress={savedProgress}
                  />
                </div>
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
