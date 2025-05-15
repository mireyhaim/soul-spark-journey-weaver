
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from "@/integrations/supabase/client";

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
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [lastInteraction, setLastInteraction] = useState<Date | null>(null);
  
  const isMobile = useIsMobile();
  const price = getJourneyPrice(journeyData.duration);
  
  const handleComplete = async () => {
    // Add the current day to saved progress if not already saved
    if (!savedProgress.includes(currentDay)) {
      setSavedProgress(prev => [...prev, currentDay]);
      
      // Update progress in the database if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && journeyData.id) {
        // Update user journey progress
        await supabase
          .from('user_journey_progress')
          .upsert({
            user_id: user.id,
            journey_id: journeyData.id,
            completed_days: [...savedProgress, currentDay],
            current_day: currentDay,
            last_interaction_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,journey_id'
          });
      }
    }
    
    setCompleted(true);
    toast("Great job! Your reflections have been saved and you've completed today's practice.");

    if (isMobile) {
      setShowChatOnMobile(false);
    }
  };

  const handleNextDay = async () => {
    if (currentDay < journeyData.duration) {
      const nextDay = currentDay + 1;
      // Move to the next day
      setCurrentDay(nextDay);
      setCompleted(false); // Reset completed state for the new day
      
      // Update in database if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && journeyData.id) {
        await supabase
          .from('user_journey_progress')
          .upsert({
            user_id: user.id,
            journey_id: journeyData.id,
            current_day: nextDay,
            last_interaction_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,journey_id'
          });
      }
      
      toast(`You're now on Day ${nextDay} of your journey. Keep up the great work!`);
    }
  };

  const handlePurchase = async () => {
    setIsPurchased(true);
    // Hide explanations immediately after purchase
    setShowExplanations(false);
    
    // If user is authenticated, save the purchase and initialize progress
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user && journeyData.id) {
      // Create payment record
      await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          journey_id: journeyData.id,
          amount: price,
          status: 'completed'
        });
      
      // Initialize user progress
      await supabase
        .from('user_journey_progress')
        .upsert({
          user_id: user.id,
          journey_id: journeyData.id,
          current_day: 1,
          started_at: new Date().toISOString(),
          last_interaction_at: new Date().toISOString(),
          completed_days: []
        }, {
          onConflict: 'user_id,journey_id'
        });
    }
    
    toast(`Your ${journeyData.title} journey has been purchased for $${price}. Enjoy your spiritual path!`);
  };

  const handleContinueJourney = () => {
    setCompleted(false); // Reset completed state for the current day
    toast(`Day ${currentDay} of your ${journeyData.title} journey is ready for you.`);
    
    if (isMobile) {
      setShowChatOnMobile(true);
    }
  };

  const updateLastMessage = async (message: string) => {
    setLastMessage(message);
    setLastInteraction(new Date());
    
    // Update in database if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user && journeyData.id) {
      await supabase
        .from('user_journey_progress')
        .upsert({
          user_id: user.id,
          journey_id: journeyData.id,
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

  // Load user progress on component mount if authenticated
  useEffect(() => {
    const loadUserProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && journeyData.id) {
        const { data: progressData } = await supabase
          .from('user_journey_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('journey_id', journeyData.id)
          .single();
        
        if (progressData) {
          setCurrentDay(progressData.current_day || 1);
          setSavedProgress(progressData.completed_days || []);
          setLastMessage(progressData.last_message || null);
          setLastInteraction(progressData.last_interaction_at ? new Date(progressData.last_interaction_at) : null);
          setIsPurchased(true); // If we have progress data, journey is purchased
          setCompleted(progressData.completed_days?.includes(progressData.current_day) || false);
        }
      }
    };
    
    loadUserProgress();
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
    handleComplete,
    handleNextDay,
    handlePurchase,
    handleContinueJourney,
    handleDismissExplanations,
    updateLastMessage,
    toggleMobileChat
  };
};
