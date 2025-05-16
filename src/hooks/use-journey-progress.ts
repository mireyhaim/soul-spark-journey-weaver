
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook to manage journey progress state
 */
export const useJourneyProgress = (journeyId: string | undefined) => {
  const { toast } = useToast();
  const [completed, setCompleted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1); // Always start at day 1 after purchase
  const [savedProgress, setSavedProgress] = useState<number[]>([]); // Days completed
  
  const handleComplete = async () => {
    // Add the current day to saved progress if not already saved
    if (!savedProgress.includes(currentDay)) {
      setSavedProgress(prev => [...prev, currentDay]);
      
      // Update progress in the database if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && journeyId) {
        // Update user journey progress
        await supabase
          .from('user_journey_progress')
          .upsert({
            user_id: user.id,
            journey_id: journeyId,
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
  };

  const handleNextDay = async () => {
    if (currentDay < Infinity) { // מספר הימים הכולל צריך להיות במקום אינסוף
      const nextDay = currentDay + 1;
      // Move to the next day
      setCurrentDay(nextDay);
      setCompleted(false); // Reset completed state for the new day
      
      // Update in database if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && journeyId) {
        await supabase
          .from('user_journey_progress')
          .upsert({
            user_id: user.id,
            journey_id: journeyId,
            current_day: nextDay,
            last_interaction_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,journey_id'
          });
      }
      
      toast(`You're now on Day ${nextDay} of your journey. Keep up the great work!`);
    }
  };

  // Load user progress on component mount if authenticated
  useEffect(() => {
    const loadUserProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && journeyId) {
        const { data: progressData } = await supabase
          .from('user_journey_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('journey_id', journeyId)
          .single();
        
        if (progressData) {
          setCurrentDay(progressData.current_day || 1);
          setSavedProgress(progressData.completed_days || []);
          setCompleted(progressData.completed_days?.includes(progressData.current_day) || false);
        }
      }
    };
    
    loadUserProgress();
  }, [journeyId]);

  return {
    currentDay,
    completed,
    savedProgress,
    handleComplete,
    handleNextDay,
  };
};
