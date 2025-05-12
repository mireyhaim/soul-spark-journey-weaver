
import { supabase } from "@/integrations/supabase/client";
import { JourneyStat } from "@/types/trackingStats";

export async function fetchJourneyStats(): Promise<JourneyStat[]> {
  // Get detailed journey stats
  const { data: journeys } = await supabase
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
  
  if (!journeys) {
    return [];
  }
  
  return journeys.map(journey => {
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
}
