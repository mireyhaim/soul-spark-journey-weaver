
import { supabase } from "@/integrations/supabase/client";
import { StageDistribution } from "@/types/trackingStats";

type ProgressDistribution = {
  day1To7: number;
  day8To14: number;
  day15To21: number;
  day22Plus: number;
  completed: number;
};

export async function fetchJourneyProgressDistribution(): Promise<{
  stageDistribution: StageDistribution[];
  completionRate: number;
}> {
  // Get journey progress stage distribution
  const { data: userProgress, error } = await supabase
    .from('user_journey_progress')
    .select('current_day, completed_at');
  
  if (error) {
    console.error("Error fetching journey progress distribution:", error);
    throw new Error(error.message);
  }
  
  if (!userProgress || userProgress.length === 0) {
    return {
      stageDistribution: [],
      completionRate: 0
    };
  }
  
  // Calculate stage distribution using more efficient filtering
  const distribution: ProgressDistribution = {
    day1To7: 0,
    day8To14: 0,
    day15To21: 0,
    day22Plus: 0,
    completed: 0
  };
  
  userProgress.forEach(p => {
    if (p.completed_at) distribution.completed++;
    
    const day = p.current_day;
    if (day >= 1 && day <= 7) distribution.day1To7++;
    else if (day >= 8 && day <= 14) distribution.day8To14++;
    else if (day >= 15 && day <= 21) distribution.day15To21++;
    else if (day > 21) distribution.day22Plus++;
  });
  
  const stageDistribution: StageDistribution[] = [
    { name: 'Day 1-7', value: distribution.day1To7 },
    { name: 'Day 8-14', value: distribution.day8To14 },
    { name: 'Day 15-21', value: distribution.day15To21 },
    { name: 'Day 22+', value: distribution.day22Plus },
    { name: 'Completed', value: distribution.completed }
  ];
  
  // Calculate completion rate
  const totalUsers = userProgress.length;
  const completionRate = totalUsers > 0 ? (distribution.completed / totalUsers * 100) : 0;
  
  return {
    stageDistribution,
    completionRate
  };
}
