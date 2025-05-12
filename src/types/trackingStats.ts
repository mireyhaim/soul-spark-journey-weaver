
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
