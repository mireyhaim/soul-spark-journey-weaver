
import { useQuery } from "@tanstack/react-query";
import { TrackingStats } from "@/types/trackingStats";
import { fetchJourneyProgressDistribution } from "@/utils/journeyProgressUtils";
import { fetchEngagementStats } from "@/utils/engagementUtils";
import { fetchJourneyStats } from "@/utils/journeyStatsUtils";

export { type StageDistribution, type JourneyStat, type EngagementTrendItem, type TrackingStats } from "@/types/trackingStats";

export const useTrackingStats = (): TrackingStats => {
  // Use individual queries for better granularity in refetching and error handling
  const progressQuery = useQuery({
    queryKey: ['journeyProgressDistribution'],
    queryFn: fetchJourneyProgressDistribution,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const engagementQuery = useQuery({
    queryKey: ['engagementStats'],
    queryFn: fetchEngagementStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const journeyStatsQuery = useQuery({
    queryKey: ['journeyStats'],
    queryFn: fetchJourneyStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Determine overall loading state
  const isLoading = progressQuery.isLoading || 
                   engagementQuery.isLoading || 
                   journeyStatsQuery.isLoading;

  // Error handling
  if (progressQuery.error) {
    console.error("Error fetching progress distribution:", progressQuery.error);
  }
  
  if (engagementQuery.error) {
    console.error("Error fetching engagement stats:", engagementQuery.error);
  }
  
  if (journeyStatsQuery.error) {
    console.error("Error fetching journey stats:", journeyStatsQuery.error);
  }

  return {
    stageDistribution: progressQuery.data?.stageDistribution || [],
    completionRate: progressQuery.data?.completionRate || 0,
    engagementRate: engagementQuery.data?.engagementRate || 0,
    engagementTrend: engagementQuery.data?.engagementTrend || [],
    journeyStats: journeyStatsQuery.data || [],
    loading: isLoading
  };
};
