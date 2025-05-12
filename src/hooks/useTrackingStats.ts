
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type StageDistribution = {
  name: string;
  value: number;
};

export type JourneyStat = {
  id: string;
  title: string;
  totalUsers: number;
  day1: number;
  day7: number;
  day14: number;
  day21: number;
  completed: number;
  completionRate: number;
};

export type EngagementTrendItem = {
  date: string;
  rate: number;
};

export type TrackingStats = {
  stageDistribution: StageDistribution[];
  completionRate: number;
  engagementRate: number;
  engagementTrend: EngagementTrendItem[];
  journeyStats: JourneyStat[];
  loading: boolean;
};

export const useTrackingStats = (): TrackingStats => {
  const [stageDistribution, setStageDistribution] = useState<StageDistribution[]>([]);
  const [completionRate, setCompletionRate] = useState(0);
  const [engagementRate, setEngagementRate] = useState(0);
  const [engagementTrend, setEngagementTrend] = useState<EngagementTrendItem[]>([]);
  const [journeyStats, setJourneyStats] = useState<JourneyStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingStats = async () => {
      setLoading(true);
      try {
        // Get journey progress stage distribution
        const { data: userProgress } = await supabase
          .from('user_journey_progress')
          .select('current_day, completed_at');
        
        if (userProgress) {
          // Calculate stage distribution using more efficient filtering
          const distribution = {
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
          
          setStageDistribution([
            { name: 'Day 1-7', value: distribution.day1To7 },
            { name: 'Day 8-14', value: distribution.day8To14 },
            { name: 'Day 15-21', value: distribution.day15To21 },
            { name: 'Day 22+', value: distribution.day22Plus },
            { name: 'Completed', value: distribution.completed }
          ]);
          
          // Calculate completion rate
          const totalUsers = userProgress.length;
          const completionRate = totalUsers > 0 ? (distribution.completed / totalUsers * 100) : 0;
          setCompletionRate(completionRate);
        }
        
        // Get AI interactions data for engagement rate - with batching
        const interactionsPromise = supabase
          .from('ai_interactions')
          .select('user_id, created_at');
          
        const activeUsersPromise = supabase
          .from('user_journey_progress')
          .select('user_id');
        
        // Execute both queries in parallel
        const [interactionsResult, activeUsersResult] = await Promise.all([
          interactionsPromise, 
          activeUsersResult
        ]);
        
        const aiInteractions = interactionsResult.data || [];
        const activeUsers = activeUsersResult.data || [];
        
        if (aiInteractions && activeUsers) {
          // Use Maps for faster unique user counting
          const uniqueInteractingUsersMap = new Map();
          aiInteractions.forEach(i => uniqueInteractingUsersMap.set(i.user_id, true));
          
          const totalActiveUsersMap = new Map();
          activeUsers.forEach(u => totalActiveUsersMap.set(u.user_id, true));
          
          const uniqueInteractingUsers = uniqueInteractingUsersMap.size;
          const totalActiveUsers = totalActiveUsersMap.size;
          
          const engagementRate = totalActiveUsers > 0 ? (uniqueInteractingUsers / totalActiveUsers * 100) : 0;
          setEngagementRate(engagementRate);
          
          // Calculate engagement trend (last 7 days)
          const now = new Date();
          const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
          }).reverse();
          
          const engagementByDay = last7Days.map(day => {
            const dayStart = new Date(day);
            const dayEnd = new Date(day);
            dayEnd.setHours(23, 59, 59, 999);
            
            const dayInteractions = aiInteractions.filter(
              i => {
                const date = new Date(i.created_at);
                return date >= dayStart && date <= dayEnd;
              }
            );
            
            const uniqueDayUsers = new Set(dayInteractions.map(i => i.user_id)).size;
            const dailyRate = totalActiveUsers > 0 ? (uniqueDayUsers / totalActiveUsers * 100) : 0;
            
            return {
              date: day,
              rate: parseFloat(dailyRate.toFixed(1))
            };
          });
          
          setEngagementTrend(engagementByDay);
        }
        
        // Get detailed journey stats - optimize query
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
        
        if (journeys) {
          const journeyStatsData = journeys.map(journey => {
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
          
          setJourneyStats(journeyStatsData);
        }
      } catch (error) {
        console.error("Error fetching tracking stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingStats();
  }, []);

  return {
    stageDistribution,
    completionRate,
    engagementRate,
    engagementTrend,
    journeyStats,
    loading
  };
};
