
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';

// Calculate price based on journey duration
export const getJourneyPrice = (duration: number): number => {
  if (duration <= 7) return 11;
  if (duration <= 14) return 15;
  return 27;
};

export const useJourneyState = (journeyData: any) => {
  const { toast } = useToast();
  const [completed, setCompleted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1); // Always start at day 1 after purchase
  const [savedProgress, setSavedProgress] = useState<number[]>([]); // Days completed
  const [isPurchased, setIsPurchased] = useState(false);
  const [showExplanations, setShowExplanations] = useState(true);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  
  const isMobile = useIsMobile();
  const price = getJourneyPrice(journeyData.duration);
  
  const handleComplete = () => {
    // Add the current day to saved progress if not already saved
    if (!savedProgress.includes(currentDay)) {
      setSavedProgress(prev => [...prev, currentDay]);
    }
    
    setCompleted(true);
    toast("Great job! Your reflections have been saved and you've completed today's practice.");

    if (isMobile) {
      setShowChatOnMobile(false);
    }
  };

  const handleNextDay = () => {
    if (currentDay < journeyData.duration) {
      // Move to the next day
      setCurrentDay(prev => prev + 1);
      setCompleted(false); // Reset completed state for the new day
      
      toast(`You're now on Day ${currentDay + 1} of your journey. Keep up the great work!`);
    }
  };

  const handlePurchase = () => {
    setIsPurchased(true);
    // Hide explanations immediately after purchase
    setShowExplanations(false);
    toast(`Your ${journeyData.title} journey has been purchased for $${price}. Enjoy your spiritual path!`);
  };

  const handleContinueJourney = () => {
    setCompleted(false); // Reset completed state for the current day
    toast(`Day ${currentDay} of your ${journeyData.title} journey is ready for you.`);
    
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

  return {
    currentDay,
    completed,
    isPurchased,
    showExplanations,
    showChatOnMobile,
    price,
    isMobile,
    handleComplete,
    handleNextDay,
    handlePurchase,
    handleContinueJourney,
    handleDismissExplanations,
    toggleMobileChat
  };
};
