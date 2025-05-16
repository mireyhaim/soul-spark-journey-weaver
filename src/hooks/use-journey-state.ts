
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { getJourneyPrice } from "@/utils/journey-pricing";
import { useJourneyProgress } from "@/hooks/use-journey-progress";
import { useJourneyInteractions } from "@/hooks/use-journey-interactions";

export { getJourneyPrice } from "@/utils/journey-pricing";

export const useJourneyState = (journeyData: any) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Calculate price based on journey duration
  const price = getJourneyPrice(journeyData.duration);
  
  // Get journey progress state
  const {
    currentDay,
    completed,
    savedProgress,
    handleComplete: progressHandleComplete,
    handleNextDay
  } = useJourneyProgress(journeyData.id);
  
  // Get journey interactions state
  const {
    isPurchased,
    showExplanations,
    showChatOnMobile,
    lastMessage,
    lastInteraction,
    handlePurchase: interactionsHandlePurchase,
    handleContinueJourney: interactionsHandleContinueJourney,
    handleDismissExplanations,
    updateLastMessage,
    toggleMobileChat,
    loadUserInteractions
  } = useJourneyInteractions(journeyData.id);
  
  // Wrapper for handleComplete to handle mobile view
  const handleComplete = () => {
    progressHandleComplete();
    
    if (isMobile) {
      toggleMobileChat();
    }
  };
  
  // Wrapper for handlePurchase
  const handlePurchase = () => {
    interactionsHandlePurchase(price, journeyData.title);
  };
  
  // Wrapper for handleContinueJourney
  const handleContinueJourney = () => {
    interactionsHandleContinueJourney(currentDay, journeyData.title);
    
    if (isMobile) {
      toggleMobileChat();
    }
  };
  
  // Load user data on component mount
  useEffect(() => {
    loadUserInteractions();
  }, [journeyData.id]);
  
  return {
    currentDay,
    completed,
    isPurchased,
    showExplanations,
    showChatOnMobile,
    price,
    isMobile,
    lastMessage,
    lastInteraction,
    savedProgress,
    handleComplete,
    handleNextDay,
    handlePurchase,
    handleContinueJourney,
    handleDismissExplanations,
    updateLastMessage,
    toggleMobileChat
  };
};
