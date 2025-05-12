
import { supabase } from "@/integrations/supabase/client";
import { JourneyStat } from "@/types/trackingStats";

export async function fetchJourneyStats(): Promise<JourneyStat[]> {
  console.log("Fetching journey stats...");
  
  try {
    // Get detailed journey stats
    const { data: journeys, error } = await supabase
      .from('journeys')
      .select(`
        id,
        title,
        duration,
        user_journey_progress (
          id,
          current_day,
          completed_at
        )
      `)
      .order('title');
    
    if (error) {
      console.error("Error fetching journey stats:", error);
      throw new Error(error.message);
    }
    
    console.log("Journeys data fetched:", journeys);
    
    if (!journeys || journeys.length === 0) {
      console.log("No journey data found");
      return [];
    }
    
    return journeys.map(journey => {
      // Handle case when user_journey_progress is null or undefined
      const progress = journey.user_journey_progress || [];
      
      // Use counters rather than multiple array filters
      let totalUsers = progress.length;
      let completedUsers = 0;
      let day1 = 0;
      let day7 = 0;
      let day14 = 0;
      let day21 = 0;
      
      progress.forEach((p: any) => {
        if (p.completed_at) completedUsers++;
        if (p.current_day === 1) day1++;
        if (p.current_day === 7) day7++;
        if (p.current_day === 14) day14++;
        if (p.current_day === 21) day21++;
      });
      
      const completionRate = totalUsers > 0 ? (completedUsers / totalUsers * 100) : 0;
      
      return {
        id: journey.id,
        title: journey.title,
        totalUsers,
        day1,
        day7,
        day14,
        day21,
        completed: completedUsers,
        completionRate
      };
    });
  } catch (error) {
    console.error("Failed to fetch journey stats:", error);
    // Return empty array instead of throwing to prevent UI breaking
    return [];
  }
}
