
import { useTrackingStats } from "@/hooks/useTrackingStats";
import { StageDistributionChart } from "@/components/admin/tracking/StageDistributionChart";
import { CompletionRateCard } from "@/components/admin/tracking/CompletionRateCard";
import { EngagementRateCard } from "@/components/admin/tracking/EngagementRateCard";
import { JourneyProgressTable } from "@/components/admin/tracking/JourneyProgressTable";

const TrackingPage = () => {
  const { 
    stageDistribution, 
    completionRate, 
    engagementRate, 
    engagementTrend, 
    journeyStats, 
    loading 
  } = useTrackingStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StageDistributionChart data={stageDistribution} loading={loading} />
        
        <CompletionRateCard completionRate={completionRate} loading={loading} />
        
        <EngagementRateCard 
          engagementRate={engagementRate} 
          engagementTrend={engagementTrend} 
          loading={loading} 
        />
      </div>
      
      <JourneyProgressTable journeyStats={journeyStats} loading={loading} />
    </div>
  );
};

export default TrackingPage;
