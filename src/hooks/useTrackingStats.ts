
import { useQuery } from "@tanstack/react-query";
import { TrackingStats } from "@/types/trackingStats";
import { fetchJourneyProgressDistribution } from "@/utils/journeyProgressUtils";
import { fetchEngagementStats } from "@/utils/engagementUtils";
import { fetchJourneyStats } from "@/utils/journeyStatsUtils";

export { type StageDistribution, type JourneyStat, type EngagementTrendItem, type TrackingStats } from "@/types/trackingStats";

export const useTrackingStats = (): TrackingStats => {
  console.log("useTrackingStats hook called");
  
  // Use individual queries with proper error handling and fallbacks
  const progressQuery = useQuery({
    queryKey: ['journeyProgressDistribution'],
    queryFn: fetchJourneyProgressDistribution,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes to prevent excessive refetching
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false, // Prevent refetching on window focus
    refetchOnMount: false // Only fetch once when component mounts
  });

  const engagementQuery = useQuery({
    queryKey: ['engagementStats'],
    queryFn: fetchEngagementStats,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  const journeyStatsQuery = useQuery({
    queryKey: ['journeyStats'],
    queryFn: fetchJourneyStats,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  // Log query states with safer formatting to avoid console errors
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

  // Always return a valid object with fallback values to prevent rendering errors
  return {
    stageDistribution: progressQuery.data?.stageDistribution || [],
    completionRate: progressQuery.data?.completionRate || 0,
    engagementRate: engagementQuery.data?.engagementRate || 0,
    engagementTrend: engagementQuery.data?.engagementTrend || [],
    journeyStats: journeyStatsQuery.data || [],
    loading: isLoading
  };
};
