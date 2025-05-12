
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { journeys } from '@/data/journeys';

// Calculate price based on journey duration
export const getJourneyPrice = (duration: number): number => {
  if (duration <= 7) return 11;
  if (duration <= 14) return 15;
  return 27;
};

export interface JourneyState {
  completed: boolean;
  currentDay: number;
  savedProgress: number[];
  isPurchased: boolean;
  showExplanations: boolean;
  error: string | null;
  isLoading: boolean;
  journey: any;
  price: number;
  handleComplete: () => void;
  handlePurchase: () => void;
  handleContinueJourney: () => void;
  handleDismissExplanations: () => void;
  handleGoBack: () => void;
}

export const useJourneyState = (id: string | undefined): JourneyState => {
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
  const journey = useMemo(() => {
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
  
  // Simulate loading with a timeout
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  });
  
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

  return {
    completed,
    currentDay,
    savedProgress,
    isPurchased,
    showExplanations,
    error,
    isLoading,
    journey,
    price,
    handleComplete,
    handlePurchase,
    handleContinueJourney,
    handleDismissExplanations,
    handleGoBack
  };
};
