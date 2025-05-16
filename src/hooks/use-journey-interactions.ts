
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook to manage journey interactions state
 */
export const useJourneyInteractions = (journeyId: string | undefined) => {
  const { toast } = useToast();
  const [isPurchased, setIsPurchased] = useState(false);
  const [showExplanations, setShowExplanations] = useState(true);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [lastInteraction, setLastInteraction] = useState<Date | null>(null);

  const handlePurchase = async (price: number, journeyTitle: string) => {
    setIsPurchased(true);
    // Hide explanations immediately after purchase
    setShowExplanations(false);
    
    // If user is authenticated, save the purchase and initialize progress
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user && journeyId) {
      // Create payment record
      await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          journey_id: journeyId,
          amount: price,
          status: 'completed'
        });
      
      // Initialize user progress
      await supabase
        .from('user_journey_progress')
        .upsert({
          user_id: user.id,
          journey_id: journeyId,
          current_day: 1,
          started_at: new Date().toISOString(),
          last_interaction_at: new Date().toISOString(),
          completed_days: []
        }, {
          onConflict: 'user_id,journey_id'
        });
    }
    
    toast(`Your ${journeyTitle} journey has been purchased for $${price}. Enjoy your spiritual path!`);
  };

  const handleContinueJourney = (currentDay: number, journeyTitle: string) => {
    toast(`Day ${currentDay} of your ${journeyTitle} journey is ready for you.`);
  };

  const updateLastMessage = async (message: string) => {
    setLastMessage(message);
    setLastInteraction(new Date());
    
    // Update in database if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user && journeyId) {
      await supabase
        .from('user_journey_progress')
        .upsert({
          user_id: user.id,
          journey_id: journeyId,
          last_message: message,
          last_interaction_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,journey_id'
        });
    }
  };

  const handleDismissExplanations = () => {
    setShowExplanations(false);
  };

  // For mobile - toggle between chat view and journey view
  const toggleMobileChat = () => {
    setShowChatOnMobile(!showChatOnMobile);
  };

  // Load user interactions on component mount
  const loadUserInteractions = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user && journeyId) {
      const { data: progressData } = await supabase
        .from('user_journey_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('journey_id', journeyId)
        .single();
      
      const { data: paymentData } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .eq('journey_id', journeyId)
        .single();
      
      if (progressData) {
        setLastMessage(progressData.last_message || null);
        setLastInteraction(progressData.last_interaction_at ? new Date(progressData.last_interaction_at) : null);
        setIsPurchased(true); // If we have progress data, journey is purchased
      }
      
      if (paymentData) {
        setIsPurchased(true);
      }
    }
  };

  return {
    isPurchased,
    showExplanations,
    showChatOnMobile,
    lastMessage,
    lastInteraction,
    handlePurchase,
    handleContinueJourney,
    handleDismissExplanations,
    updateLastMessage,
    toggleMobileChat,
    loadUserInteractions
  };
};
