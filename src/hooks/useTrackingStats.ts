
import { useState, useEffect } from "react";
import { TrackingStats } from "@/types/trackingStats";
import { fetchJourneyProgressDistribution } from "@/utils/journeyProgressUtils";
import { fetchEngagementStats } from "@/utils/engagementUtils";
import { fetchJourneyStats } from "@/utils/journeyStatsUtils";

export { type StageDistribution, type JourneyStat, type EngagementTrendItem, type TrackingStats } from "@/types/trackingStats";

export const useTrackingStats = (): TrackingStats => {
  const [stageDistribution, setStageDistribution] = useState([]);
  const [completionRate, setCompletionRate] = useState(0);
  const [engagementRate, setEngagementRate] = useState(0);
  const [engagementTrend, setEngagementTrend] = useState([]);
  const [journeyStats, setJourneyStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingStats = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel for better performance
        const [
          progressDistribution,
          engagementData,
          journeyStatsData
        ] = await Promise.all([
          fetchJourneyProgressDistribution(),
          fetchEngagementStats(),
          fetchJourneyStats()
        ]);
        
        // Update state with fetched data
        setStageDistribution(progressDistribution.stageDistribution);
        setCompletionRate(progressDistribution.completionRate);
        setEngagementRate(engagementData.engagementRate);
        setEngagementTrend(engagementData.engagementTrend);
        setJourneyStats(journeyStatsData);
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
