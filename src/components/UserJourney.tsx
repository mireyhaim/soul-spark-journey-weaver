
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { journeys } from '@/data/journeys';
import JourneyHeader from './journey/JourneyHeader';
import JourneyProgress from './journey/JourneyProgress';
import DailyPractice from './journey/DailyPractice';
import JourneyTimeline from './journey/JourneyTimeline';
import JourneyInsights from './journey/JourneyInsights';
import JourneyExplanations from './journey/JourneyExplanations';
import JourneyPurchase from './journey/JourneyPurchase';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

// Calculate price based on journey duration
const getJourneyPrice = (duration: number): number => {
  if (duration <= 7) return 11;
  if (duration <= 14) return 15;
  return 27;
};

const UserJourney: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1); // Always start at day 1 after purchase
  const [savedProgress, setSavedProgress] = useState<number[]>([]); // Days completed
  const [isPurchased, setIsPurchased] = useState(false);
  const [showExplanations, setShowExplanations] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Find the selected journey with error handling
  const journey = React.useMemo(() => {
    try {
      if (!id) {
        throw new Error("Journey ID is missing");
      }
      
      const foundJourney = journeys.find(j => j.id === id);
      if (!foundJourney) {
        throw new Error(`Journey with ID ${id} not found`);
      }
      
      return foundJourney;
    } catch (err: any) {
      setError(err.message);
      return {
        id: '0',
        title: 'Journey Not Found',
        description: 'We could not find the journey you were looking for.',
        teacher: 'Unknown',
        duration: 0,
        category: 'Not Available',
        image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      };
    }
  }, [id]);
  
  // Simulate loading to avoid blank screens
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  const price = getJourneyPrice(journey.duration);
  
  const handleComplete = () => {
    try {
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
    } catch (err: any) {
      console.error("Error completing practice:", err);
      toast({
        title: "Error",
        description: "There was a problem completing your practice. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePurchase = () => {
    try {
      setIsPurchased(true);
      toast({
        title: "Journey purchased!",
        description: `Your ${journey.title} journey has been purchased for $${price}. Enjoy your spiritual path!`,
      });
    } catch (err: any) {
      console.error("Error purchasing journey:", err);
      toast({
        title: "Purchase Error",
        description: "There was a problem with your purchase. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleContinueJourney = () => {
    try {
      setCompleted(false); // Reset completed state for the new day
      toast({
        title: "Continue your journey",
        description: `Day ${currentDay} of your ${journey.title} journey is ready for you.`,
      });
    } catch (err: any) {
      console.error("Error continuing journey:", err);
      toast({
        title: "Error",
        description: "There was a problem continuing your journey. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDismissExplanations = () => {
    setShowExplanations(false);
  };
  
  const handleGoBack = () => {
    navigate('/journeys');
  };
  
  // Show error state
  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6">
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Journey not found</AlertTitle>
          <AlertDescription>
            {error}
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={handleGoBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Journeys
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col gap-4 w-full max-w-3xl">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-16 bg-slate-200 rounded w-full"></div>
          <div className="h-32 bg-slate-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

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
                <JourneyTimeline 
                  currentDay={currentDay} 
                  savedProgress={savedProgress}
                />
                
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
