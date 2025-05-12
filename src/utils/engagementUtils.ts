
import { supabase } from "@/integrations/supabase/client";
import { EngagementTrendItem } from "@/types/trackingStats";

export async function fetchEngagementStats(): Promise<{
  engagementRate: number;
  engagementTrend: EngagementTrendItem[];
}> {
  // Execute both queries in parallel
  const [interactionsResult, activeUsersResult] = await Promise.all([
    supabase.from('ai_interactions').select('user_id, created_at'),
    supabase.from('user_journey_progress').select('user_id')
  ]);
  
  if (interactionsResult.error) {
    console.error("Error fetching AI interactions:", interactionsResult.error);
    throw new Error(interactionsResult.error.message);
  }
  
  if (activeUsersResult.error) {
    console.error("Error fetching active users:", activeUsersResult.error);
    throw new Error(activeUsersResult.error.message);
  }
  
  const aiInteractions = interactionsResult.data || [];
  const activeUsers = activeUsersResult.data || [];
  
  if (!activeUsers.length) {
    return {
      engagementRate: 0,
      engagementTrend: []
    };
  }
  
  // Use Maps for faster unique user counting
  const uniqueInteractingUsersMap = new Map();
  aiInteractions.forEach(i => uniqueInteractingUsersMap.set(i.user_id, true));
  
  const totalActiveUsersMap = new Map();
  activeUsers.forEach(u => totalActiveUsersMap.set(u.user_id, true));
  
  const uniqueInteractingUsers = uniqueInteractingUsersMap.size;
  const totalActiveUsers = totalActiveUsersMap.size;
  
  const engagementRate = totalActiveUsers > 0 ? (uniqueInteractingUsers / totalActiveUsers * 100) : 0;
  
  // Calculate engagement trend (last 7 days)
  const engagementTrend = calculateEngagementTrend(aiInteractions, totalActiveUsers);
  
  return {
    engagementRate,
    engagementTrend
  };
}

function calculateEngagementTrend(
  aiInteractions: Array<{ user_id: string; created_at: string }>,
  totalActiveUsers: number
): EngagementTrendItem[] {
  const now = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();
  
  return last7Days.map(day => {
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
}
