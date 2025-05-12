
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EngagementTrendItem } from "@/hooks/useTrackingStats";

type EngagementRateCardProps = {
  engagementRate: number;
  engagementTrend: EngagementTrendItem[];
  loading: boolean;
};

export const EngagementRateCard = ({ engagementRate, engagementTrend, loading }: EngagementRateCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">AI Engagement Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center pt-4">
          {loading ? "..." : `${engagementRate.toFixed(1)}%`}
        </div>
        <div className="text-sm text-muted-foreground text-center mt-4">
          Percentage of users who interact with the AI assistant
        </div>
        {!loading && engagementTrend.length > 0 && (
          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, "Engagement Rate"]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString();
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
