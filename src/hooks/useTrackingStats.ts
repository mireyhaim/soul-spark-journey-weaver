
import { useQuery } from "@tanstack/react-query";
import { TrackingStats } from "@/types/trackingStats";
import { fetchJourneyProgressDistribution } from "@/utils/journeyProgressUtils";
import { fetchEngagementStats } from "@/utils/engagementUtils";
import { fetchJourneyStats } from "@/utils/journeyStatsUtils";

export { type StageDistribution, type JourneyStat, type EngagementTrendItem, type TrackingStats } from "@/types/trackingStats";

export const useTrackingStats = (): TrackingStats => {
  console.log("useTrackingStats hook called");
  
  // Use individual queries for better granularity in refetching and error handling
  const progressQuery = useQuery({
    queryKey: ['journeyProgressDistribution'],
    queryFn: fetchJourneyProgressDistribution,
    retry: 1
  });

  const engagementQuery = useQuery({
    queryKey: ['engagementStats'],
    queryFn: fetchEngagementStats,
    retry: 1
  });

  const journeyStatsQuery = useQuery({
    queryKey: ['journeyStats'],
    queryFn: fetchJourneyStats,
    retry: 1
  });

  // Log query states
  console.log("Progress query status:", progressQuery.status);
  console.log("Engagement query status:", engagementQuery.status);
  console.log("Journey stats query status:", journeyStatsQuery.status);

  // Determine overall loading state
  const isLoading = progressQuery.isLoading || 
                   engagementQuery.isLoading || 
                   journeyStatsQuery.isLoading;

  // Error handling with detailed logging
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
